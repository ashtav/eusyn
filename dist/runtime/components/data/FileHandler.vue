<template>
    <div @click="onClick" @dragover="onDragged" @dragleave="onDragged" @drop="onDropped">
        <slot />

        <div v-if="!$slots.default">
            <Input :label="config.label" :hint="config.hint ?? 'Please select file'" readonly
                :required="config.required" :suffixs="[{
        text: 'Browse', kbd: true
    }]" v-model="input" />
        </div>

        <input type="file" ref="fileInput" :accept="acceptFile" @change="handeFiles" class="d-none"
            :multiple="multiple" />
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils.js";
export default {
  emits: ["select", "dragged"],
  props: {
    accept: {
      type: Array,
      default: ["image:jpeg,jpg,png"]
      // format can be: ['application:pdf,xlxs', 'audio:wav,mp3', 'text:plain,csv', 'video:mp4', 'image:jpeg,jpg,png']
    },
    multiple: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: {
        maxSize: 3,
        width: [],
        height: [],
        label: null,
        hint: null,
        required: false
      }
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, slots }) {
    const acceptFile = ref("");
    const fileInput = ref(null);
    const input = ref("");
    let dragging = false;
    const reFormat = () => {
      acceptFile.value = props.accept.map((format) => {
        const [type, extensions] = format.split(":");
        return extensions.split(",").map((ext) => `${type}/${ext}`).join(", ");
      }).join(", ");
    };
    const onClick = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const onDragged = (event) => {
      if (!props.draggable || !event.dataTransfer)
        return;
      event.stopPropagation();
      event.preventDefault();
      dragging = event.type === "dragover";
      event.dataTransfer.dropEffect = "copy";
      emit("dragged", { dragover: dragging });
    };
    const onDropped = async (event) => {
      if (!props.draggable || !event.dataTransfer)
        return;
      event.stopPropagation();
      event.preventDefault();
      dragging = false;
      const result = await filterFiles(event.dataTransfer.files);
      emit("dragged", { dragover: dragging, errors: result.errors, files: result.files });
    };
    const megabytesToBytes = (value) => {
      return 1024 * 1024 * value;
    };
    const filterFiles = (files) => {
      return new Promise(async (resolve) => {
        const maxSize = megabytesToBytes(props.config.maxSize ?? 3);
        const width = props.config.width ?? [];
        const height = props.config.height ?? [];
        let errors = [];
        let result = [];
        const promises = Array.from(files).map((file) => {
          return new Promise((resolve2) => {
            let isValid = true;
            if (file.size > maxSize) {
              errors.push({ type: "size", file: file.name, message: `File size must be less than ${utils.formatBytes(maxSize)}. Your file size is ${utils.formatBytes(file.size)}` });
            }
            if (!acceptFile.value.includes(file.type)) {
              errors.push({ type: "format", file: file.name, message: `File type must be ${acceptFile.value}. Your file type is ${file.type}` });
            }
            isValid = file.size <= maxSize && acceptFile.value.includes(file.type);
            const reader = new FileReader();
            reader.onload = (event) => {
              if (file.type.startsWith("image/")) {
                let img = new Image();
                img.src = event.target?.result;
                img.onload = () => {
                  if (width.length != 0) {
                    const min = width[0];
                    const max = width.length > 1 ? width[1] : min;
                    if (img.width < min || img.width > max) {
                      isValid = false;
                      errors.push({
                        type: "dimension",
                        file: file.name,
                        message: `Your image width must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current width is ${img.width}px.`
                      });
                    }
                  }
                  if (height.length != 0) {
                    const min = height[0];
                    const max = height.length > 1 ? height[1] : min;
                    if (img.height < min || img.height > max) {
                      isValid = false;
                      errors.push({
                        type: "dimension",
                        file: file.name,
                        message: `Your image height must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current height is ${img.height}px.`
                      });
                    }
                  }
                  if (isValid) {
                    result.push({
                      data: event.target?.result,
                      name: file.name,
                      type: file.type,
                      size: utils.formatBytes(file.size),
                      dimension: `${img.width} x ${img.height}`
                    });
                  }
                  resolve2();
                };
              } else {
                if (isValid) {
                  result.push({
                    data: event.target?.result,
                    name: file.name,
                    type: file.type,
                    size: utils.formatBytes(file.size)
                  });
                }
                resolve2();
              }
            };
            reader.readAsDataURL(file);
          });
        });
        await Promise.all(promises);
        fileInput.value.value = "";
        resolve({ errors, files: result });
      });
    };
    const handeFiles = async (e) => {
      if (typeof FileReader != "function") {
        emit("select", { errors: [{ message: "Your browser does not support FileReader.", type: "browser" }] });
      } else {
        const files = e.target.files;
        const result = await filterFiles(files);
        emit("select", result);
        if (!slots.default == true) {
          const files2 = result.files;
          if (files2.length != 0) {
            input.value = files2[0].name;
            if (files2.length > 1) {
              input.value = files2[0].name + ` and ${files2.length - 1} other files`;
            }
          }
        }
      }
    };
    onMounted(() => {
      reFormat();
    });
    watch(() => props.accept, (_) => {
      reFormat();
    });
    return { acceptFile, fileInput, input, onClick, handeFiles, onDragged, onDropped };
  }
};
</script>

<style lang="scss" scoped></style>
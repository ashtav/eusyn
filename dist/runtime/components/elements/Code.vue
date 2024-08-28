<template>
    <div class="code">
        <pre><code ref="codeElement" :class="`language-${language}`">{{ code }}</code></pre>

        <div class="description" v-if="description">
            {{ description }}
        </div>

        <div class="copy-code" @click="doCopy">
            <Ti :icon="copied ? 'ti-check' : 'ti-copy'" />
        </div>
    </div>
</template>

<script>
import Prism from "prismjs";
import { defineComponent, onMounted, ref, watch } from "vue";
export default defineComponent({
  props: {
    code: {
      type: String
    },
    description: {
      type: String,
      default: null
    },
    lang: {
      type: String
    }
  },
  setup(props) {
    const codeElement = ref(null);
    const copied = ref(false);
    const code = ref(props.code);
    const language = ref(props.lang ? props.lang : props.code && props.code.charAt(0) == "<" ? "markup" : "js");
    const doCopy = async () => {
      if (copied.value) {
        return;
      }
      try {
        await navigator.clipboard.writeText(props.code);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    const highlighting = () => {
      if (codeElement.value) {
        Prism.manual = true;
        Prism.highlightElement(codeElement.value);
      }
    };
    watch(() => props.code, (_) => {
      highlighting();
    });
    onMounted(() => {
      highlighting();
    });
    return {
      code,
      language,
      codeElement,
      copied,
      doCopy
    };
  }
});
</script>

<style>
.code {
  position: relative;
}
.code .copy-code {
  position: absolute;
  right: 15px;
  top: 12px;
  color: #888;
}
.code .copy-code:hover {
  color: #333;
  cursor: pointer;
}
.code .description {
  border: 1px #e9e9e9 solid;
  padding: 13px 15px;
  border-radius: 0 0 5px 5px;
  position: relative;
  background-color: white;
  top: -2px;
  z-index: -1;
  color: #666;
}

pre {
  background-color: #e9e9e9;
  color: #666;
  padding: 15px !important;
  margin: 0 !important;
  border-radius: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  border: 1px transparent solid;
}
pre.has-desc {
  border-radius: 5px 5px 0 0;
}
pre code {
  padding: 0 !important;
  padding-right: 25px !important;
  margin: 0 !important;
  display: block;
}
pre code .token.cdata,
pre code .token.comment,
pre code .token.doctype,
pre code .token.prolog {
  color: #708090;
}
pre code .token.punctuation {
  color: #999;
}
pre code .token.namespace {
  opacity: 0.7;
}
pre code .token.boolean,
pre code .token.constant,
pre code .token.deleted,
pre code .token.number,
pre code .token.property,
pre code .token.symbol,
pre code .token.tag {
  color: #e76e75;
}
pre code .token.attr-name,
pre code .token.builtin,
pre code .token.char,
pre code .token.inserted,
pre code .token.selector {
  color: #9c3eda;
}
pre code .token.string {
  color: #91b859;
}
pre code .language-css .token.string,
pre code .style .token.string,
pre code .token.entity,
pre code .token.operator,
pre code .token.url {
  color: #9a6e3a;
}
pre code .token.atrule,
pre code .token.attr-value,
pre code .token.keyword {
  color: #91b859;
}
pre code .token.class-name,
pre code .token.function {
  color: #dd4a68;
}
pre code .token.important,
pre code .token.regex,
pre code .token.variable {
  color: #e90;
}
pre code .token.bold,
pre code .token.important {
  font-weight: 700;
}
pre code .token.italic {
  font-style: italic;
}
pre code .token.entity {
  cursor: help;
}

[data-bs-theme=dark] pre,
[data-bs-theme=dark] .description {
  background-color: #182433;
  border-color: #1f2d3d;
  color: #b1b1b1;
}
[data-bs-theme=dark] pre {
  border: 1px #1f2d3d solid;
}
[data-bs-theme=dark] pre code .token.cdata,
[data-bs-theme=dark] pre code .token.comment,
[data-bs-theme=dark] pre code .token.doctype,
[data-bs-theme=dark] pre code .token.prolog {
  color: #708090;
}
[data-bs-theme=dark] pre code .token.punctuation {
  color: #999;
}
[data-bs-theme=dark] pre code .token.namespace {
  opacity: 0.7;
}
[data-bs-theme=dark] pre code .token.boolean,
[data-bs-theme=dark] pre code .token.constant,
[data-bs-theme=dark] pre code .token.deleted,
[data-bs-theme=dark] pre code .token.number,
[data-bs-theme=dark] pre code .token.property,
[data-bs-theme=dark] pre code .token.symbol,
[data-bs-theme=dark] pre code .token.tag {
  color: #e76e75;
}
[data-bs-theme=dark] pre code .token.attr-name,
[data-bs-theme=dark] pre code .token.builtin,
[data-bs-theme=dark] pre code .token.char,
[data-bs-theme=dark] pre code .token.inserted,
[data-bs-theme=dark] pre code .token.selector {
  color: #b486d7;
}
[data-bs-theme=dark] pre code .token.string {
  color: #91b859;
}
[data-bs-theme=dark] pre code .language-css .token.string,
[data-bs-theme=dark] pre code .style .token.string,
[data-bs-theme=dark] pre code .token.entity,
[data-bs-theme=dark] pre code .token.operator,
[data-bs-theme=dark] pre code .token.url {
  color: #9a6e3a;
}
[data-bs-theme=dark] pre code .token.atrule,
[data-bs-theme=dark] pre code .token.attr-value,
[data-bs-theme=dark] pre code .token.keyword {
  color: #b2d484;
}
[data-bs-theme=dark] pre code .token.class-name,
[data-bs-theme=dark] pre code .token.function {
  color: #dd4a68;
}
[data-bs-theme=dark] pre code .token.important,
[data-bs-theme=dark] pre code .token.regex,
[data-bs-theme=dark] pre code .token.variable {
  color: #e90;
}
[data-bs-theme=dark] .copy-code:hover {
  color: #ccc;
}
</style>

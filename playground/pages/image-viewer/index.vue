<template>
  <div class="container">
    <PageHeader title="Image Viewer" />

    <h4 class="mb-0">
      <Ti icon="ti-album" class="me-1" /> Album
    </h4>
    <p class="mb-5">
      {{ images.length }} images found, click one of these images to show image viewer.
    </p>

    <div class="album mb-3">
      <div class="body">
        <img :src="images[0]" alt="" @click="view(0)">
        <div class="small-images">
          <img :src="images[1]" alt="" @click="view(1)">
          <img :src="images[2]" alt="" @click="view(2)">
        </div>
      </div>
    </div>

    <ImageViewer
      v-model="show"
      :images="images"
      :active="image"
      :actions="['download', 'copy']"
      :config="{ max: 250, loop: true }"
    />
  </div>
</template>

<script lang="ts">
export default {
  setup () {
    return {}
  },

  data () {
    return {
      show: false,
      image: '',
      images: [
        'https://i.imgur.com/5fQUPDl.jpg',
        'https://i.pinimg.com/736x/47/d0/78/47d078d78349f94ed6bcba7d8e6a52a3.jpg',
        'https://i.pinimg.com/736x/ce/3d/59/ce3d59b29d80c6fa2f8917d9c573e90e.jpg',
        'https://img.freepik.com/premium-photo/artificial-intelligence-head-portrait-with-intricate-parts-robotical-cyborg-futuristic-design-generative-ai_751108-3169.jpg',
        'https://cms.interiorcompany.com/wp-content/uploads/2024/01/use-a-home-decor-plant-stand.jpg',
        'https://www.enjpg.com/img/2020/plant-aesthetic-1.jpg',
        'https://www.buyourobot.com/wp-content/uploads/edd/2015/09/00472_pilot_thumb.jpg',
        'https://www.thespruce.com/thmb/SnV1FLWFPQcXIlTpqFb7qLvXh94=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240939984_567294274624239_6535843150405942130_n-78f13e590e4d46a0a5e4e5e00dadc237.jpg',
        'https://media.istockphoto.com/id/627373186/photo/abstract-smooth-round-pebbles-sea-texture-background.jpg?s=612x612&w=0&k=20&c=-wU1H9tqb7HQElvrzo1hjeQK1G6rdgbFU6aHQZKuArU=',
        'https://i.pinimg.com/736x/98/96/a2/9896a23312be258e4bb0bc464d47d4d7.jpg'
      ]
    }
  },

  methods: {
    view (index: number) {
      this.image = this.images[index]
      this.show = true
    },

    download (image: string) {
      console.log('downloading... ', image)
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
    display: inline-flex;
    align-items: flex-start;

    img {
        object-fit: cover;

        &:hover {
            cursor: pointer;
            opacity: .7;
        }
    }

    border-radius: 5px;
    border: 1px #ddd solid;
    padding: 3px;
    background: white;

    .body {
        border-radius: 2px;
        overflow: hidden;
        display: inline-flex;
        align-items: flex-start;
    }
}

.album img:first-child {
    width: 200px;
    height: 203px;
}

.album .small-images {
    display: flex;
    flex-direction: column;
    margin-left: 3px;
}

.album .small-images img {
    width: 100px;
    height: 100px;
    margin-bottom: 3px;
}

.album .small-images img:last-child {
    margin-bottom: 0;
    /* Removes the margin from the last small image */
}
</style>
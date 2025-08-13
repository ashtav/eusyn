<template>
  <div>
    <PageHeader title="Image Viewer" />

    <div class="row">
      <div class="col-lg-6">
        <Text icon="album-01" value="Album" strong />
        <p class="mb-5 mt-2 text-secondary">
          {{ images.length }} images are available, click one of these images to show image viewer.
        </p>

        <div class="album mb-3">
          <div class="body">
            <img :src="images[0]" alt="" @click="openViewer(0)" lazy />
            <div class="small-images">
              <img :src="images[1]" alt="" @click="openViewer(1)" lazy />
              <img :src="images[2]" alt="" @click="openViewer(2)" lazy />
            </div>
          </div>
        </div>

        <Code class="mt-2 mb-5" code='<ImageViewer2 ref="viewer" />

// method
openViewer() {
      const viewer = this.$refs.viewer as any
      viewer.open([...images], 5)
}' />
      </div>
    </div>

    <ImageViewer ref="viewer" />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {}
  },

  data() {
    return {
      show: false,
      image: '',
      images: [
        'https://121clicks.com/wp-content/uploads/2024/05/beautiful-macro-photos-01.jpg',
        'https://i.pinimg.com/736x/47/d0/78/47d078d78349f94ed6bcba7d8e6a52a3.jpg',
        'https://i.pinimg.com/736x/ce/3d/59/ce3d59b29d80c6fa2f8917d9c573e90e.jpg',
        'https://media.istockphoto.com/id/175490523/photo/beautiful-nature-big-world-of-small-things.jpg?s=170667a&w=0&k=20&c=semoD1EJTyn_i2f2X89wacSkanVoSVKXv0uEvo0IMhM=',
        'https://i.pinimg.com/736x/b0/b2/68/b0b2685b4dbef14c55f16bd7d77796cf.jpg',
        'https://i.pinimg.com/564x/02/3c/8c/023c8cadd3125fd2f0e7923654515c98.jpg',
        'https://i.pinimg.com/736x/eb/a7/94/eba794c8da1b8e8d392c4455537ed21c.jpg',
        'https://www.thespruce.com/thmb/SnV1FLWFPQcXIlTpqFb7qLvXh94=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240939984_567294274624239_6535843150405942130_n-78f13e590e4d46a0a5e4e5e00dadc237.jpg',
        'https://i.pinimg.com/736x/e7/d7/d1/e7d7d16473040020d33b21f1d1bc7ea8.jpg',
        'https://i.pinimg.com/736x/24/3d/3f/243d3f55a3df0bc4fb2593460a5b41c9.jpg'
      ]
    }
  },

  methods: {
    view(index: number) {
      this.image = this.images[index]
      this.show = true
    },

    download(image: string) {
      console.log('downloading... ', image)
    },

    openViewer(index: number) {
      const viewer = this.$refs.viewer as any
      viewer.open([...this.images, ...this.images, ...this.images], index)
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

.single-image {
  width: 200px;
  height: 203px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid var(--border-color);
}
</style>
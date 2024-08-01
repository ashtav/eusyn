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

        <Image 
        width="400" height="400" :quality=".2"
        class="rounded overflow-hidden"
        src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2017/02/2-pigeons_plaza_hotel.jpg?resize=750%2C500&ssl=1"  />

        <ImageViewer v-model="show" :images="images" :active="image" :actions="['download', 'copy']" :config="{max: 250, loop: true}" />
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
                'https://i.pinimg.com/736x/47/d0/78/47d078d78349f94ed6bcba7d8e6a52a3.jpg',
                'https://www.designingbuildings.co.uk/w/images/6/64/Design2.jpg',
                'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480',
                'https://media.istockphoto.com/id/147694372/photo/badger-dog.jpg?s=612x612&w=0&k=20&c=3iNYkarzevpIJeHcmQAykq0cubiSlL4URl91qIlacxM=',
                'https://freerangestock.com/sample/126213/alone-man-on-mountain.jpg',
                'https://t3.ftcdn.net/jpg/05/68/61/68/360_F_568616868_52KFkgnPBkr51Prkew6cCT4m8oSjinWe.jpg',
                'https://i.pinimg.com/originals/b0/db/57/b0db57a0877a5df988d27331b186373f.jpg',
                'https://i.pinimg.com/736x/98/96/a2/9896a23312be258e4bb0bc464d47d4d7.jpg'
            ],
        }
    },

    methods: {
        view(index: number) {
            this.image = this.images[index]
            this.show = true
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
<template>
    <div>
        <PageHeader title="Carousel" />

        <div class="row">
            <div class="col-lg-6">
                <Carousel :images="images" height="300" class="rounded" :config="{ autoPlay: false }" />
                <Code class="mt-3 mb-1" code='<Carousel :images="images" height="300" />' />

                <ClientOnly>
                    <Code class="mt-3 mb-5" code='<Carousel class="rounded border" :config="{ infinite: false }">
    <template v-slot>
        <li v-for="i in 5" :key="i" class="carousel-slide">
            <div class="custom-slide"> {{ i }} </div>
        </li>
    </template>
</Carousel>' />

                </ClientOnly>
            </div>
            <div class="col-lg-4">
                <Carousel class="rounded border" :config="{ infinite: false, arrows: ['arrow-left', 'arrow-right'] }">
                    <template v-slot>
                        <li v-for="i in 5" :key="i" class="carousel-slide">
                            <div class="custom-slide">
                                {{ i }}
                            </div>
                        </li>
                    </template>
                </Carousel>


            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    setup() {


        return {}
    },

    data() {
        return {
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
    }
}
</script>

<style lang="scss" >
.border {
    border: 1px #2e3f52 solid !important;

    .carousel-button {
        background: rgba(0, 0, 0, 0.0) !important;
    }
}

.custom-slide {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
}
</style>
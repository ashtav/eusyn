<template>
    <Modal id="modal-example" :elevation="false">
        <div class="modal-body">
            <p v-for="i in 15">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium deserunt. Voluptatem
                voluptatibus officiis maxime perspiciatis voluptates a, vel maiores delectus incidunt iure alias aperiam
                non
                id magni, sit perferendis!
            </p>
        </div>
    </Modal>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>
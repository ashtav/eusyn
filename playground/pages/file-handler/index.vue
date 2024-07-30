<template>
    <div class="container">
        <!-- header -->
        <PageHeader title="File Handler" />

        <FileHandler>
            <div class="file-handler">
                <div>
                    <h4 class="mb-0">Select File or Drag Here</h4>
                    <p>You can either click to select a file or simply drag it into this area.</p>
                </div>

            </div>
        </FileHandler>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.file-handler {
    border: 1px #ddd dashed;
    width: 100%;
    height: 250px;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:hover {
        cursor: pointer;

        div {
            opacity: .7;
        }
    }
}
</style>
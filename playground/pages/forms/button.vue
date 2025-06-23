<template>
    <div>
        <PageHeader title="Button" />

        <div class="row">
            <div class="col-lg-6">
                <Row gap="5">
                    <Button label="Text Only" @click="onSubmit" />
                    <Button label="Text Icon" icon="hgi-sent" theme="btn-dark" @click="onSubmit" />
                    <Button icon="hgi-sent" theme="white" @click="onSubmit" />
                    <Button icon="hgi-link-square-01" theme="white" to="https://google.com" />
                </Row>

                <Code class="mt-3" code='onSubmit(action: ButtonAction) {
    action.submit();
}' />

                <Code class="mt-1" code='<Button label="Submit" icon="send" @click="onSubmit" />' />
                <Code class="mt-1 mb-5" code='<Button icon="link" theme="white" to="https://google.com" />' />

                <p>To make the button a submit type, use the <code class="text-cyan">submit</code> attribute. For
                    example:</p>
                <Code class="mt-1 mb-5" code='<form @submit.prevent="onFormSubmit">
    <Button label="Submit" submit />
</form>' />

                <form @submit.prevent="onFormSubmit">
                    <Input hint="This input is required *" required />
                    <Button label="Submit" theme="w-100" submit />
                </form>
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

        }
    },

    methods: {
        onSubmit(action: ButtonAction) {
            action.submit()

            this.$e.overlay('Loading...')

            setTimeout(() => {
                action.abort()
                this.$e.overlay(false)
            }, 1000);
        },

        onFormSubmit() {

        }
    }
}
</script>

<style lang="scss" scoped></style>
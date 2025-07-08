<template>
    <form @submit.prevent="handleSubmit">
        <slot />
    </form>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    inheritAttrs: false,
    emits: ['submit'],
    setup(_, { emit }) {
        const disabled = ref(false)

        const onSubmit = () => {
            emit('submit')
        }

        const enterable = (value: boolean) => {
            disabled.value = value
        }

        const handleSubmit = () => {
            if (disabled.value) return
            onSubmit()
        }

        return {
            disabled,
            onSubmit,
            enterable,
            handleSubmit
        }
    }
}
</script>
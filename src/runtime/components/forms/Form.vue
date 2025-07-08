<template>
    <form @submit.prevent="handleSubmit" :class="{ 'x': debug && disabled }">
        <slot />
    </form>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    inheritAttrs: false,
    emits: ['submit'],
    setup(props, { emit }) {
        const disabled = ref(false)

        const onSubmit = () => {
            emit('submit')
        }

        const enterable = (value: boolean) => {
            disabled.value = value

            if (props.debug) {
                console.log('Form enterable:', value)
            }
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
    },

    props: {
        debug: {
            type: Boolean,
            default: false
        }
    }
}
</script>
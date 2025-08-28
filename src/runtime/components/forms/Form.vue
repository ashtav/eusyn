<template>
    <form @submit.prevent="onSubmit">
        <div v-if="debug" class="p-4">
            <span>Enterable: {{ !disabled }}</span>
        </div>

        <slot />
    </form>
</template>


<script lang="ts">
import { onMounted, ref } from 'vue';
import eventBus from '../../plugins/mitt';

export default {
    inheritAttrs: false,
    emits: ['submit'],
    setup(_, { emit }) {
        const disabled = ref(false)

        const onSubmit = (e: Event) => {
            const submitEvent = e as SubmitEvent
            const submitter = submitEvent.submitter as HTMLElement | null

            if (disabled.value && !submitter) {
                // enter submit (tanpa tombol) → blok
                return
            }

            emit('submit')
        }


        onMounted(() => {
            eventBus.on('__form', (value: any) => disabled.value = value)
        })

        return {
            disabled,
            onSubmit
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
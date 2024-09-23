<template>
    <div class="drop-d x" @click="toggleOptions">
        <span ref="slotRef">
            <slot />
        </span>

        <div class="options" v-if="showOptions" :style="optionsStyle">
            <ul>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

export default {
    setup() {
        const slotRef = ref<HTMLElement | null>(null);
        const showOptions = ref(false);
        const optionsStyle = ref({
            top: '0px',
            left: '0px',
            position: 'fixed' as const,
        });

        const toggleOptions = () => {
            if (!slotRef.value) return;

            const rect = slotRef.value.getBoundingClientRect();

            // Update options position based on slot position
            optionsStyle.value = {
                top: `${rect.bottom}px`,
                left: `${rect.left}px`,
                position: 'fixed',
            };

            console.log(optionsStyle.value)

            showOptions.value = !showOptions.value;
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (slotRef.value && !slotRef.value.contains(event.target as Node)) {
                showOptions.value = false;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            slotRef,
            showOptions,
            optionsStyle,
            toggleOptions,
        };
    }
};
</script>

<style lang="scss" scoped>
.drop-d {
    display: inline;
}

.options {
    background-color: white;
    border: 1px solid #ccc;
    padding: 8px;
    z-index: 100;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding: 4px 8px;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    }
}
</style>

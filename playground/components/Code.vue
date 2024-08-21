<template>
    <div class="code">
        <pre :class="{ 'has-desc': description }">
<code v-html="highlightedCode"></code></pre>
        <div class="description" v-if="description">
            {{ description }}
        </div>

        <div class="copy-code" @click="doCopy">
            <Ti :icon="copied ? 'ti-check' : 'ti-copy'" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: null
        }
    },

    setup(props) {
        const copied = ref(false);

        const escapeHtml = (code: string) => {
            return code
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };

        const highlightCode = (code: string) => {
            if (!code) {
                return '';
            }

            const escapedCode = escapeHtml(code);

            // Contoh highlighting sederhana
            const keywords = /(\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b)/g;
            const highlighted = escapedCode.replace(keywords, '<span class="keyword">$1</span>');
            return highlighted;
        };

        const highlightedCode = computed(() => highlightCode(props.code));

        const doCopy = async () => {
            if (copied.value) {
                return;
            }

            try {
                await navigator.clipboard.writeText(props.code);
                copied.value = true;

                setTimeout(() => {
                    copied.value = false;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        };

        return {
            highlightedCode, copied, doCopy
        };
    },
});
</script>

<style lang="scss" scoped>
.code {
    position: relative;

    .copy-code {
        position: absolute;
        right: 15px;
        top: 12px;
        color: #888;

        &:hover {
            color: #333;
            cursor: pointer;
        }
    }

    .description {
        border: 1px #ddd solid;
        padding: 13px 15px;
        border-radius: 0 0 5px 5px;
        position: relative;
        background-color: white;
        top: -2px;
        z-index: -1;
        color: #666;
    }
}

pre {
    background-color: #ddd;
    color: #666;
    padding: 15px !important;
    margin: 0 !important;
    border-radius: 5px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;

    &.has-desc {
        border-radius: 5px 5px 0 0;
    }

    code {
        padding: 0 !important;
        padding-right: 25px !important;
        margin: 0 !important;
        display: block;
    }
}

[data-bs-theme=dark] {
    pre, .description {
        background-color: #182433;
        border-color: #1f2d3d;
        color: #b1b1b1;
    }

    pre {
        border: 1px #1f2d3d solid;
    }

    .copy-code {
        &:hover {
            color: #ccc;
        }
    }
}
</style>

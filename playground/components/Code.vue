<template>
    <div class="code">
        <pre :class="{ 'has-desc': description }" ref="pre">
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
        },

        lang: {
            type: String,
            default: 'js'
        }
    },

    setup(props) {
        const keywords = [
            "this",
            "const",
            "let",
            "var",
            "function",
            "return",
            "if",
            "else",
            "for",
            "while",
            "switch",
            "case",
            "break",
            "continue"
        ];

        const pre: Ref<HTMLElement | null> = ref(null)
        const copied = ref(false);

        const highlightCode = (code: string) => {
            if (!code) {
                return '';
            }

            const isComponent = code.charAt(0) == '<'


            let highlighted = code
            highlighted = highlighted.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            const jsHighlighted = () => {
                // Highlight strings
                highlighted = highlighted.replace(/(["'`])(?:\\.|(?!\1)[^\\])*?\1/g, `<span class="string">$&</span>`);

                // Highlight numbers, excluding those in strings
                highlighted = highlighted.replace(/(?<!["'`])\b\d+\b(?!["'`])/g, (match) => {
                    // Check if the match is surrounded by '-' indicating it's part of a date
                    if (highlighted.match(/['"][^'"]*[-]\d+[-][^'"]*['"]/)) {
                        return match; // Return match as is if it's part of a date
                    }
                    return `<span class="number">${match}</span>`;
                });

                // Highlight 'this' keyword
                highlighted = highlighted.replace(/\bthis\b/g, `<span class="this-keyword">$&</span>`);

                // Highlight keywords
                keywords.forEach(keyword => {
                    const regex = new RegExp(`(^|\\s|\\()${keyword}($|\\s|\\))`, "g");
                    highlighted = highlighted.replace(regex, `$1<span class="keyword">${keyword}</span>$2`);
                });

                // Highlight function names
                highlighted = highlighted.replace(/(\b\w+)(?=\()/g, `<span class="function-name">$1</span>`);

            }

            if (isComponent) {
                highlighted = code.replace(/(\w+)="([^"]*)"/g, (match, p1, p2) => {
                    return `<span class="attr">${p1}</span>="<span class="string">${p2}</span>"`;
                });


                highlighted = highlighted.replace(/<(\w+)([^>]*)>/, '&lt;<span class="tag-component">$1</span>$2>');

            }

            else {
                jsHighlighted()
            }

            return highlighted
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
            pre, highlightedCode, copied, doCopy
        };
    },
});
</script>

<style lang="scss">
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
        border: 1px #e9e9e9 solid;
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
    background-color: #e9e9e9;
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

        .tag-component {
            color: #4ebc7d;
        }

        .attr {
            color: #69aadb;
        }

        .keyword {
            color: #0077aa;
        }

        .function-name {
            color: #dd4a68;
        }

        .string {
            color: #669900;
        }

        .number {
            color: #a60055;
        }
    }
}

[data-bs-theme=dark] {

    pre,
    .description {
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

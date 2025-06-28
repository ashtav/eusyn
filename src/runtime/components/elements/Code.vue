<template>
    <div class="code">
        <pre><code ref="codeElement" :class="`language-${language}`">{{ code }}</code></pre>

        <div class="description" v-if="description">
            {{ description }}
        </div>

        <div class="copy-code" @click="doCopy">
            <Icon :icon="copied ? iconCheck : iconCopy" />
        </div>
    </div>
</template>

<script lang="ts">
import { useRuntimeConfig } from '#imports';
import Prism from 'prismjs';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        lang: {
            type: String,
            default: '',
        },
    },

    setup(props) {
        const config = useRuntimeConfig();
        const icon = config.public.ui?.icon;
        const isTabler = icon === 'tabler';

        const iconCheck = isTabler ? 'ti-check' : 'hgi-tick-02';
        const iconCopy = isTabler ? 'ti-copy' : 'hgi-copy-02';

        const codeElement = ref<HTMLElement | null>(null);
        const copied = ref(false);

        const language = ref(
            props.lang || (props.code && props.code.charAt(0) === '<' ? 'markup' : 'js')
        );

        const doCopy = async () => {
            if (copied.value) return;

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

        const highlighting = () => {
            setTimeout(() => {
                if (codeElement.value) {
                    Prism.manual = true;
                    Prism.highlightElement(codeElement.value);
                }
            }, 10);
        };

        onMounted(() => {
            highlighting();
        });

        watch(() => props.code, () => {
            highlighting();
        });

        return {
            codeElement,
            language,
            copied,
            doCopy,
            iconCheck,
            iconCopy,
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
        border-radius: 0 0 6px 6px;
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
    border-radius: 6px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    border: 1px transparent solid;

    &.has-desc {
        border-radius: 6px 6px 0 0;
    }

    code {
        padding: 0 !important;
        padding-right: 25px !important;
        margin: 0 !important;
        display: block;

        .token.cdata,
        .token.comment,
        .token.doctype,
        .token.prolog {
            color: #708090
        }

        .token.punctuation {
            color: #999
        }

        .token.namespace {
            opacity: .7
        }

        .token.boolean,
        .token.constant,
        .token.deleted,
        .token.number,
        .token.property,
        .token.symbol,
        .token.tag {
            color: #e76e75
        }

        .token.attr-name,
        .token.builtin,
        .token.char,
        .token.inserted,
        .token.selector {
            color: #9c3eda
        }

        .token.string {
            color: #91b859
        }

        .language-css .token.string,
        .style .token.string,
        .token.entity,
        .token.operator,
        .token.url {
            color: #9a6e3a;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
            color: #91b859
        }

        .token.class-name,
        .token.function {
            color: #dd4a68
        }

        .token.important,
        .token.regex,
        .token.variable {
            color: #e90
        }

        .token.bold,
        .token.important {
            font-weight: 700
        }

        .token.italic {
            font-style: italic
        }

        .token.entity {
            cursor: help
        }

        span {
            &.tag {
                all: unset;
            }
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

        code {

            .token.cdata,
            .token.comment,
            .token.doctype,
            .token.prolog {
                color: #708090
            }

            .token.punctuation {
                color: #999
            }

            .token.namespace {
                opacity: .7
            }

            .token.boolean,
            .token.constant,
            .token.deleted,
            .token.number,
            .token.property,
            .token.symbol,
            .token.tag {
                color: #e76e75
            }

            .token.attr-name,
            .token.builtin,
            .token.char,
            .token.inserted,
            .token.selector {
                color: #b486d7
            }

            .token.string {
                color: #91b859
            }

            .language-css .token.string,
            .style .token.string,
            .token.entity,
            .token.operator,
            .token.url {
                color: #9a6e3a;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword {
                color: #b2d484
            }

            .token.class-name,
            .token.function {
                color: #dd4a68
            }

            .token.important,
            .token.regex,
            .token.variable {
                color: #e90
            }
        }
    }

    .copy-code {
        &:hover {
            color: #ccc;
        }
    }
}
</style>

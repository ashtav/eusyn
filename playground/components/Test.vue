<template>
    <div class="actions">
        <ul>
            <li v-for="(e, i) in actions">
                <span class="action">
                    <Icon :icon="e.icon" v-if="e.icon" />
                    <span v-if="e.label">{{ e.label }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

interface Action {
    label?: string;
    icon?: string;
    action?: () => void;
}

export default {
    setup() {
        return {}
    },

    props: {
        actions: {
            type: Array<Action>,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 2px;

        li {
            display: inline-block;

            span.action {
                cursor: pointer;
                background-color: var(--background-color);
                padding: 10px 13px;
                height: 35px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 10px;
                user-select: none;

                &:hover {
                    opacity: .7;
                }

                &:active {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
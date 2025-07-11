<template>
    <div class="list-group list-group-flush">
        <!-- loading -->
        <ListGroupItem v-if="loading" v-for="_ in utils.randInt(2, 4)">
            <Shimmer :size="[[50, 150]]" />
        </ListGroupItem>

        <!-- data -->
        <template v-else>
            <ListGroupItem v-if="data && data.length == 0" class="text-secondary">
                {{ emptyMessage }}
            </ListGroupItem>

            <slot v-if="data != null" v-for="(e, i) in data" :e="e" :i="i" />
            <slot v-else />
        </template>
    </div>
</template>

<script lang="ts">
import { utils } from '../../plugins/utils';

export default {
    setup() {
        return { utils }
    },

    props: {
        data: {
            type: Array<any>,
            default: null
        },

        loading: {
            type: Boolean,
            default: false
        },

        emptyMessage: {
            type: String,
            default: 'No data found.'
        }
    }
}
</script>

<style lang="scss" scoped></style>
<template>
    <div class="page">
        <div class="page-body">
            <div class="container">
                <PageHeader title="Dropdown" />

                <code>
                    {{ data }}
                </code>

                <div class="py-6">
                    <Row :gap="10">
                        <Dropdown :options="options" :separate="[0, 2]" @select="onSelect">
                            <Button label="More" icon="ti-dots-vertical" iconAlign="end" />
                        </Dropdown>

                        <Dropdown :options="['10', '15', '25', '50', '100']" size="sm" @select="onSelect">
                            <Button label="Entries" icon="ti-chevron-down" theme="btn" iconAlign="end" />
                        </Dropdown>
                    </Row>
                </div>
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
            options: [
                { label: 'Details', icon: 'ti-info-circle' },
                { label: 'Edit', icon: 'ti-pencil' },
                { label: 'Delete', icon: 'ti-trash', danger: true },
                { label: 'Settings', icon: 'ti-settings' },
            ],

            data: <any>{
                options: null,
                entries: null
            }
        }
    },

    methods: {
        onSelect(data: any) {
            if (typeof data === 'string') {
                return this.data.entries = data
            }

            this.data.options = data
        }
    }
}
</script>

<style lang="scss" scoped></style>
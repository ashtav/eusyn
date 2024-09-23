<template>
    <div>
        <PageHeader title="Dropdown" />

        <code>{{ data }}</code>

        <div class="row">
            <div class="col-lg-6">
                <div class="my-3">
                    <Row :gap="10">
                        <Dropdown :options="options" :separate="[0, 2]" @select="onSelect">
                            <Button label="More" icon="ti-dots-vertical" iconAlign="end" />
                        </Dropdown>

                        <Dropdown :options="['10', '15', '25', '50', '100']" size="sm" @select="onSelect">
                            <Button label="Entries" icon="ti-chevron-down" theme="btn" iconAlign="end" />
                        </Dropdown>
                    </Row>
                </div>

                <Code code='<Dropdown :options="options" :separate="[0, 2]" @select="onSelect">
    <Button label="More" icon="ti-dots-vertical" iconAlign="end" />
</Dropdown>' />
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
                { label: 'Details', icon: 'info-circle' },
                { label: 'Edit', icon: 'pencil' },
                { label: 'Delete', icon: 'trash', danger: true },
                { label: 'Settings', icon: 'settings' },
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
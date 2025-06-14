<template>
    <div>
        <PageHeader title="Dropdown" />

        <code>{{ data }}</code>

        <div class="row">
            <div class="col-lg-6">
                <div class="my-3">
                    <Row :gap="10">
                        <Dropdown :options="options" :separate="[0, 2]" @select="onSelect">
                            <Button label="More" iconAlign="end" />
                        </Dropdown>

                        <Dropdown :options="['10', '15', '25', '50', '100']" size="sm" @select="onSelect">
                            <Button label="Entries" icon="hgi-arrow-down-01" theme="btn" iconAlign="end" />
                        </Dropdown>

                        <Dropdown :options="[{ label: 'Details', icon: 'hgi-information-circle' }, 'Edit', 'Delete']"
                            @select="onSelect" :separate="[0]">
                            <Button label="Dropdown Icons" icon="hgi-files-01" theme="btn" />
                        </Dropdown>

                        <Dropdown :options="['Edit', 'Delete']" @select="onSelect" />
                    </Row>
                </div>

                <Code code='<Dropdown :options="options" :separate="[0, 2]" @select="onSelect">
    <Button label="More" icon="hgi-arrow-down-01" iconAlign="end" />
</Dropdown>' />
                <br> <br>
                <h4>With Icons</h4>
                <Code code='<Dropdown :options="[{label: "Details", icon: "hgi-information-circle"},"-", "Edit", "Delete"]" @select="onSelect">
    <Button label="Dropdown Icons" icon="hgi-files-01" theme="btn" />
</Dropdown>' />

<br> <br>
                <h4>Simple</h4>
                <Code code='<Dropdown :options="[]" @select="onSelect" />'/>
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
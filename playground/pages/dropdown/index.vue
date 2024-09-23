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

        <div class="row my-5">
            <div class="col-lg-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod ipsum iusto, praesentium ullam
                veniam hic in voluptatum odio accusantium soluta repellat modi necessitatibus quaerat assumenda
                similique, quasi exercitationem ab.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod ipsum iusto, praesentium ullam
                veniam hic in voluptatum odio accusantium soluta.
            </div>
        </div>

        <div class="row mb-5">
            <div class="col-lg-6">
                <Table :columns="table.columns" :rows="{ data: table.data, options: rowOptions, actions: actions }"
                    maxHeight="240px" />
            </div>
        </div>

        <Dropdown :options="options" :separate="[0, 2]" @select="onSelect" placement="end">
            <Button label="Out of View?" icon="ti-dots-vertical" iconAlign="end" />
        </Dropdown>

        <div class="row mt-5" v-for="i in 5">
            <div class="col-lg-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod ipsum iusto, praesentium ullam
                veniam hic in voluptatum odio accusantium soluta repellat modi necessitatibus quaerat assumenda
                similique, quasi exercitationem ab.
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
            },

            table: {
                columns: [
                    { label: 'Name' },
                ],

                data: [
                    { name: 'Lorem Ipsum' },
                    { name: 'Sit amet' },
                    { name: 'Consectetur' },
                    { name: 'Adipiscing' },
                ]
            }
        }
    },

    methods: {
        onSelect(data: any) {
            if (typeof data === 'string') {
                return this.data.entries = data
            }

            this.data.options = data
        },

        rowOptions(data: any): Array<string> {
            return ['Details', '-', 'Edit', 'Delete']
        },

        actions(option: any, data: any) {

        }
    }
}
</script>

<style lang="scss" scoped></style>
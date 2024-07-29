<template>
    <div class="page">
        <div class="page-body">
            <div class="container">
                <PageHeader title="Product" :actions="[
                    { label: 'Create New', icon: 'ti-plus' }
                ]" />

                <div class="py-6">
                    <div class="row">
                        <div class="col-lg-6">
                            <h2>LazyUI - Table</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit expedita sed
                                cumque harum
                                libero
                                reiciendis? Enim voluptas reprehenderit alias omnis sequi corrupti est, nulla quo ea
                                similique
                                exercitationem
                                voluptates.</p>
                        </div>
                    </div>

                    <Table :columns="table.columns" :rows="table.rows" />
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
            table: {
                columns: [
                    { label: 'Name', sortable: true },
                    { label: 'Price', sortable: true },
                    { label: 'Stock', sortable: true },
                    { label: 'Category' },
                ],

                rows: [
                    {
                        id: 1,
                        name: 'Mocha Float',
                        price: 'IDR 15.500',
                        stock: 241,
                        category: 'Drink'
                    },
                    {
                        id: 2,
                        name: 'Apple Pie',
                        price: 'IDR 18.000',
                        stock: 132,
                        category: 'Fruite'
                    },
                    {
                        id: 3,
                        name: 'Blue Berry',
                        price: 'IDR 11.300',
                        stock: 216,
                        category: 'Fruite'
                    },
                    {
                        id: 4,
                        name: 'Burger Fillet',
                        price: 'IDR 31.800',
                        stock: 98,
                        category: 'Food'
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
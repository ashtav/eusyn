<template>
  <div>
    <PageHeader
      title="Product"
      :actions="[
        { label: 'Create New', icon: 'ti-plus' }
      ]"
    />

    <Table :columns="table.columns" :rows="table.rows" /> <br>
    <Code code='<Table :columns="table.columns" :rows="table.rows" />' />
  </div>
</template>

<script lang="ts">
export default {
  setup () {


    return {}
  },

  data () {
    return {
      table: {
        columns: [
          { label: 'Name', sortable: true },
          { label: 'Price', sortable: true },
          { label: 'Stock', sortable: true },
          { label: 'Category' }
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
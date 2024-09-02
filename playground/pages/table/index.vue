<template>
  <div>
    <PageHeader title="Product" :actions="[
      { label: 'Create New', icon: 'ti-plus' }
    ]" />

    <Table :columns="table.columns" :rows="data" :pagination="{ meta: meta, paginate: onPaginate }"
      :entries="{ entry: onEntry }">

      <template v-slot:actions>
        <div>
          <Button icon="layout" theme="white" />
        </div>
      </template>
    </Table> <br>

    <Spinner v-if="isLoading" />
    <Code code='<Table :columns="table.columns" :rows="table.rows" />' />
  </div>
</template>

<script lang="ts">

export default {
  setup() {
    return {}
  },

  computed: {
    // meta() {
    //   return {
    //     current_page: 1,
    //     last_page: 4,
    //     from: 1,
    //     to: 5,
    //     total: this.table.rows.length
    //   }
    // }
  },

  data() {
    return {
      query: {
        page: 1,
        per_page: 5
      },

      isLoading: true,
      data: [],
      meta: <any>{},

      table: {
        columns: [
          { label: 'Name', sortable: true },
          { label: 'Description', sortable: true },
          { label: 'Price', sortable: true },
          { label: 'Stock', sortable: true },
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
          },
          {
            id: 5,
            name: 'Mocha Float',
            price: 'IDR 21.300',
            stock: 22,
            category: 'Drink'
          }
        ]
      }
    }
  },

  methods: {
    getData() {
      this.isLoading = true
      $fetch('https://api.igsa.pw/api/dummy', { query: this.query }).then((result: any) => {
        this.isLoading = false
        this.data = result.data ?? []
        this.meta = result.meta ?? {}
      })
    },

    onEntry(value: number): any {
      if (this.query.per_page != value) {
        this.query.page = 1
        this.query.per_page = value
        this.getData()
      }
    },

    onPaginate(page: number): any {
      if (this.query.page != page) {
        this.query.page = page
        this.getData()
      }
    }
  },

  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped></style>
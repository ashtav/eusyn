<template>
  <div>
    <PageHeader title="Product" :actions="[
      { label: 'Create New', icon: 'ti-plus' }
    ]" />

    <Table :columns="table.columns" :rows="{data: data, options: options, actions: actions }" :pagination="{ meta: meta, paginate: onPaginate }"
      :entries="{ entry: onEntry }" :loading="isLoading" maxHeight="350px">

      <template v-slot:actions>
        <div>
          <Button icon="layout" theme="white" />
        </div>
      </template>
    </Table> <br>


    <Code
      code='<Table :columns="table.columns" :rows="{ data: data, options: options, actions: actions }" :pagination="{ meta: meta, paginate: onPaginate }" :entries="{ entry: onEntry }" :loading="isLoading" />' />
    <Code class="mt-2" code='// meta
const meta = { "current_page": 1, "from": 1, "to": 5, "total": 30, "last_page": 6, "per_page": 5 }' />

    <Code class="mt-2" code='// onPaginate
onPaginate(page: number): any { }' />
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
    },

    options(data: any): Array<string> {
      return Number(data.stock) < 20 ? ['Details', '-', 'Edit', 'Delete'] : ['Details']
    },

    actions(option: any, data: any) {
      console.log(option, data)
    }
  },

  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped></style>
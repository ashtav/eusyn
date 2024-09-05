<template>
  <div class="card">
    <!-- <div class="card-header">
      <h3 class="card-title">Invoices</h3>
    </div> -->
    <div class="card-body border-bottom py-3">
      <div class="d-flex">

        <!-- entries -->
        <Dropdown :options="entries" size="sm" @select="onEntries">
          <Button :label="`Show: ${entry}`" theme="btn-white py-2" icon="adjustments-alt" />
        </Dropdown>

        <!-- <div class="ms-auto text-secondary">
          Search:
          <div class="ms-2 d-inline-block">
            <input type="text" class="form-control form-control-sm" aria-label="Search invoice">
          </div>
        </div> -->
        <div class="ms-auto text-secondary d-flex align-items-center">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <!-- table content -->
    <div class="table-respons ive">
      <table class="table card-table table-vcenter text-nowrap table-striped">
        <thead>
          <tr>
            <th v-for="item in headers">
              <span :class="{ 'hoverable': item.sortable }" @click="doSortBy(item)">
                {{ item.label }}
                <Ti :icon="item.sort_icon ?? ''" size="xs" v-if="item.sortable" />
              </span>
            </th>
            <th v-if="rowOptions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="_ in $ntx.utils.randInt(1, config.loadingNumber)" v-if="loading">
            <td v-for="_ in [...headers, { label: '' }]">
              <Shimmer :size="[['50%', '100%']]" v-if="_.label != ''" />
            </td>
          </tr>

          <tr v-if="!loading && dataTable.length == 0">
            <td :colspan="[...headers, { label: '' }].length"> {{ config.emptyMessage ?? 'No data found.' }} </td>
          </tr>

          <tr v-for="(item, i) in dataTable" v-if="!loading && dataTable.length != 0">
            <td v-for="(key, j) in keys">
              {{ item[key] }}
            </td>
            <td class="w-1" v-if="rowOptions">
              <Dropdown :options="rowOptions(item) ?? []" @select="(o: any) => rowActions ? rowActions(o, item) : null" placement="end">
                <Button icon="settings" theme="white p-2" />
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <div class="card-footer d-flex align-items-center py-2 border-0"
      v-if="meta && Object.keys(meta).length != 0 && meta.total != 0 && !loading && dataTable.length != 0">
      <p class="m-0 text-secondary d-none d-lg-block"><span>{{ meta.from }}</span> to <span> {{ meta.to }}
        </span> of <span>{{
          meta.total }}</span> entries</p>
      <ul class="pagination m-0 ms-auto">
        <li :class="['page-item me-1', $ntx.utils.on(active <= 1, 'disabled')]">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="onNavigate(active - 1)">
            Prev
          </a>
        </li>
        <li v-for="page in pageNumber()" :class="['page-item', $ntx.utils.on(page == active, 'active')]">
          <a class="page-link" href="javascript:void(0)" @click="onNavigate(page)"> {{ page }} </a>
        </li>
        <li :class="['page-item ms-1', $ntx.utils.on(active >= meta.last_page, 'disabled')]">
          <a class="page-link" href="#" @click="onNavigate(active + 1)">
            Next
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType, Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';

export default {
  props: {
    columns: {
      type: Array as PropType<Array<Column>>,
      default: () => []
    },

    rows: {
      type: Object as PropType<Array<Record<string, any>> | TableRows>,
      default: () => []
    },

    pagination: {
      type: Object as PropType<TablePagination>,
      default: {
        client: false,
        meta: <Meta>{},
        length: 5,
        paginate: (page: number): any => { }
      }
    },

    entries: {
      type: Object as PropType<TableEntries>,
      default: {
        entries: [5, 15, 25, 50, 100],
        entry: (value: number): void => { }
      }
    },

    config: {
      type: Object as PropType<TableConfig>,
      default: {
        emptyMessage: 'No data found.',
        loadingNumber: 3
      }
    },

    loading: {
      type: Boolean,
      default: () => false
    }
  },

  setup(props, { }) {
    let originData = <Array<Record<any, any>>>[]
    const rowOptions: Ref<Function> = ref((data: any): Array<string> => [])
    const rowActions: Ref<Function> = ref((option: any, data: any): void => { })

    const headers: Ref<Array<Record<string, any>>> = ref(props.columns)
    const dataTable: Ref<Record<string, any>> = ref([]);

    const entries: Ref<Array<number>> = ref(props.entries?.entries ?? [5, 15, 25, 50, 100])
    const entry: Ref<any> = ref(entries.value.length == 0 ? '-' : entries.value[0])
    const meta = ref(props.pagination?.meta)

    let sortBy: string = ''
    let sortKey: string | null = null

    // pagination
    let active: Ref<number> = ref(1);

    const toKey = (e: Record<string, any>) => {
      return e.key ? e.key : e.label.toLowerCase().replaceAll(' ', '_')
    }

    const sortByKeyAsc = <T>(arr: T[], key: keyof T): T[] => {
      return arr.sort((a, b) => {
        const valA = typeof a[key] === 'string' && !isNaN(Number(a[key])) ? Number(a[key]) : a[key];
        const valB = typeof b[key] === 'string' && !isNaN(Number(b[key])) ? Number(b[key]) : b[key];

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    };

    const sortByKeyDesc = <T>(arr: T[], key: keyof T): T[] => {
      return arr.sort((a, b) => {
        const valA = typeof a[key] === 'string' && !isNaN(Number(a[key])) ? Number(a[key]) : a[key];
        const valB = typeof b[key] === 'string' && !isNaN(Number(b[key])) ? Number(b[key]) : b[key];

        if (valA < valB) return 1;
        if (valA > valB) return -1;
        return 0;
      });
    };

    // create keys
    const keys = props.columns.map((e: Column) => toKey(e))

    const doSortBy = (data: Record<string, any>) => {
      if (data?.sortable) {
        let key = toKey(data)

        if (sortKey != key) {
          sortBy = ''
        }

        sortKey = key

        // set all headers sort icon to default
        headers.value.forEach((e) => {
          e.sort_icon = 'ti-arrows-sort'
        })

        // find specific header for icon changes
        const i = headers.value.findIndex((e: any) => toKey(e) == key)
        const header = headers.value[i]
        const rows = (Array.isArray(props.rows) ? props.rows : props.rows?.data ?? [])

        if (sortBy == '') {
          dataTable.value = sortByKeyAsc(rows, key)
          sortBy = 'asc'
          header.sort_icon = 'ti-sort-ascending'
        }

        else if (sortBy == 'asc') {
          dataTable.value = sortByKeyDesc(rows, key)
          sortBy = 'desc'
          header.sort_icon = 'ti-sort-descending'
        }

        else {
          dataTable.value = originData
          sortBy = ''
          header.sort_icon = 'ti-arrows-sort'
        }
      }
    }

    const onEntries = (data: any) => {
      active.value = 1
      entry.value = data
      props.entries?.entry(data)
    }

    const pageNumber = (): Array<number> => {
      let limit = meta.value.last_page
      let max = props.pagination.length ?? 5

      const halfMax = Math.floor(max / 2);

      let start = active.value - halfMax;
      let end = active.value + halfMax;

      if (start < 1) {
        start = 1;
        end = Math.min(limit, max);
      }

      if (end > limit) {
        end = limit;
        start = Math.max(1, limit - max + 1);
      }

      const pageNumbers = [];

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    }

    const onNavigate = (page: number) => {
      if (page < 0 || page > meta.value?.last_page) return

      active.value = page
      props.pagination?.paginate(page)
      // emit("paginate", page)
    }

    onMounted(() => {
      // store origin data
      const data = (Array.isArray(props.rows) ? props.rows : props.rows?.data ?? []).map((e: any) => ({ ...e }))

      originData = data
      dataTable.value = data

      if (!Array.isArray(props.rows)) {
        rowOptions.value = props.rows.options ? props.rows.options : (_: any): Array<string> => []
        rowActions.value = props.rows.actions ? props.rows.actions : (_: any, __: any): void => { }
      }

      // set header
      headers.value = props.columns.map((e: Column) => {
        return {
          ...e,
          sort_icon: 'ti-arrows-sort'
        }
      })
    })

    watch(() => props.rows, (data) => {
      const rowsData = (Array.isArray(props.rows) ? props.rows : props.rows?.data ?? []).map((e: any) => ({ ...e }))

      originData = rowsData
      dataTable.value = rowsData

      if (!Array.isArray(props.rows)) {
        rowOptions.value = props.rows.options
        rowActions.value = props.rows.actions
      }
    }, { deep: true })

    watch(() => props.pagination, (data) => {
      meta.value = data.meta
    }, { deep: true })

    return { keys, headers, dataTable, doSortBy, entries, onEntries, meta, entry, active, onNavigate, pageNumber, rowOptions, rowActions }
  }
}
</script>

<style lang="scss" scoped>
.table {
  thead {
    tr th span {
      padding: 8px 0;
      font-weight: bold;
    }

    tr th span.hoverable {
      cursor: pointer;

      &:hover {
        opacity: .6;
      }

      &:active {
        opacity: 1;
      }
    }
  }
}
</style>
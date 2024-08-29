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
      </div>
    </div>

    <!-- table content -->
    <div class="table-responsive">
      <table class="table card-table table-vcenter text-nowrap table-striped">
        <thead>
          <tr>
            <th v-for="item in headers">
              <span :class="{ 'hoverable': item.sortable }" @click="doSortBy(item)">
                {{ item.label }}
                <Ti :icon="item.sort_icon ?? ''" size="xs" v-if="item.sortable" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in dataTable">
            <td v-for="(key, j) in keys">
              {{ item[key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <div class="card-footer d-flex align-items-center py-2 border-0" v-if="meta && meta.total != 0">
      <p class="m-0 text-secondary d-none d-lg-block">Showing <span>{{ meta.from }}</span> to <span> {{ meta.to }}
        </span> of <span>{{
          meta.total }}</span> entries</p>
      <ul class="pagination m-0 ms-auto">
        <li :class="['page-item me-1', $ntx.utils.on(active <= 1, 'disabled')]">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="onNavigate(active - 1)">
            Prev
          </a>
        </li>
        <li v-for="page in pageNumber()" :class="['page-item', $ntx.utils.on(page == meta.current_page, 'active')]">
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
import { onMounted, ref } from 'vue';

interface Column {
  key?: string,
  label: string,
  sortable?: boolean
}

interface TableConfig {
  entries?: Array<number>
}

interface Meta {
  current_page: number,
  last_page: number,
  from: number,
  to: number,
  total: number
}

export default {
  emits: ["update:modelValue", "paginate"],

  props: {
    columns: {
      type: Array<Column>,
      default: []
    },

    rows: {
      type: Array<Record<string, any>>,
      default: []
    },

    meta: {
      type: Object as PropType<Meta>,
    },

    config: {
      type: Object as PropType<TableConfig>,
      default: {
        entries: [5, 15, 25, 50, 100]
      }
    },
  },

  setup(props, { emit }) {
    const originData = props.rows.map((e: any) => ({ ...e }))
    const headers: Ref<Array<Record<string, any>>> = ref(props.columns)
    const dataTable: Ref<Record<string, any>> = ref(props.rows);

    const entries: Ref<Array<number>> = ref(props.config.entries)
    const entry: Ref<any> = ref(props.config.entries.length == 0 ? '-' : props.config.entries[0])

    let sortBy: string = ''
    let sortKey: string | null = null

    // pagination
    let active: Ref<number> = ref(1);

    const toKey = (e: Record<string, any>) => {
      return e.key ? e.key : e.label.toLowerCase().replaceAll(' ', '_')
    }

    const sortByKeyAsc = <T>(arr: T[], key: keyof T): T[] => {
      return arr.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
    };

    const sortByKeyDesc = <T>(arr: T[], key: keyof T): T[] => {
      return arr.sort((a, b) => {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
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

        if (sortBy == '') {
          dataTable.value = sortByKeyAsc(props.rows, key)
          sortBy = 'asc'
          header.sort_icon = 'ti-sort-ascending'
        }

        else if (sortBy == 'asc') {
          dataTable.value = sortByKeyDesc(props.rows, key)
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
      entry.value = data
    }

    const pageNumber = (): Array<number> => {
      let limit = props.meta.last_page
      let max = 5

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
      if (page < 0 || page > props.meta?.last_page) return

      active.value = page
      emit("paginate", page)
      emit("update:modelValue", page);
    }

    onMounted(() => {
      headers.value = props.columns.map((e: Column) => {
        return {
          ...e,
          sort_icon: 'ti-arrows-sort'
        }
      })
    })



    return { keys, headers, dataTable, doSortBy, entries, onEntries, entry, active, onNavigate, pageNumber }
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
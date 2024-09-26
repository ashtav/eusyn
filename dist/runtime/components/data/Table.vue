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
    <div class="custom-table" :style="{ maxHeight }">
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
          <tr v-for="_ in utils.randInt(1, config.loadingNumber)" v-if="loading">
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
              <Dropdown :options="rowOptions(item) ?? []" @select="(o: any) => rowActions ? rowActions(o, item) : null"
                placement="end">
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
        <li :class="['page-item me-1', utils.on(active <= 1, 'disabled')]">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="onNavigate(active - 1)">
            Prev
          </a>
        </li>
        <li v-for="page in pageNumber()" :class="['page-item', utils.on(page == active, 'active')]">
          <a class="page-link" href="javascript:void(0)" @click="onNavigate(page)"> {{ page }} </a>
        </li>
        <li :class="['page-item ms-1', utils.on(active >= meta.last_page, 'disabled')]">
          <a class="page-link" href="#" @click="onNavigate(active + 1)">
            Next
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils.js";
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Object,
      default: () => []
    },
    pagination: {
      type: Object,
      default: {
        client: false,
        meta: {},
        length: 5,
        paginate: (page) => {
        }
      }
    },
    entries: {
      type: Object,
      default: {
        entries: [5, 15, 25, 50, 100],
        entry: (value) => {
        }
      }
    },
    config: {
      type: Object,
      default: {
        emptyMessage: "No data found.",
        loadingNumber: 3
      }
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    maxHeight: {
      type: String
    }
  },
  setup(props, {}) {
    let originData = [];
    const rowOptions = ref((data) => []);
    const rowActions = ref((option, data) => {
    });
    const headers = ref(props.columns);
    const dataTable = ref([]);
    const entries = ref(props.entries?.entries ?? [5, 15, 25, 50, 100]);
    const entry = ref(entries.value.length == 0 ? "-" : entries.value[0]);
    const meta = ref(props.pagination?.meta);
    let sortBy = "";
    let sortKey = null;
    let active = ref(1);
    const toKey = (e) => {
      return e.key ? e.key : e.label.toLowerCase().replaceAll(" ", "_");
    };
    const sortByKeyAsc = (arr, key) => {
      return arr.sort((a, b) => {
        const valA = typeof a[key] === "string" && !isNaN(Number(a[key])) ? Number(a[key]) : a[key];
        const valB = typeof b[key] === "string" && !isNaN(Number(b[key])) ? Number(b[key]) : b[key];
        if (valA < valB)
          return -1;
        if (valA > valB)
          return 1;
        return 0;
      });
    };
    const sortByKeyDesc = (arr, key) => {
      return arr.sort((a, b) => {
        const valA = typeof a[key] === "string" && !isNaN(Number(a[key])) ? Number(a[key]) : a[key];
        const valB = typeof b[key] === "string" && !isNaN(Number(b[key])) ? Number(b[key]) : b[key];
        if (valA < valB)
          return 1;
        if (valA > valB)
          return -1;
        return 0;
      });
    };
    const keys = props.columns.map((e) => toKey(e));
    const doSortBy = (data) => {
      if (data?.sortable) {
        let key = toKey(data);
        if (sortKey != key) {
          sortBy = "";
        }
        sortKey = key;
        headers.value.forEach((e) => {
          e.sort_icon = "ti-arrows-sort";
        });
        const i = headers.value.findIndex((e) => toKey(e) == key);
        const header = headers.value[i];
        const rows = Array.isArray(props.rows) ? props.rows : props.rows?.data ?? [];
        if (sortBy == "") {
          dataTable.value = sortByKeyAsc(rows, key);
          sortBy = "asc";
          header.sort_icon = "ti-sort-ascending";
        } else if (sortBy == "asc") {
          dataTable.value = sortByKeyDesc(rows, key);
          sortBy = "desc";
          header.sort_icon = "ti-sort-descending";
        } else {
          dataTable.value = originData;
          sortBy = "";
          header.sort_icon = "ti-arrows-sort";
        }
      }
    };
    const onEntries = (data) => {
      active.value = 1;
      entry.value = data;
      props.entries?.entry(data);
    };
    const pageNumber = () => {
      let limit = meta.value.last_page;
      let max = props.pagination.length ?? 5;
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
    };
    const onNavigate = (page) => {
      if (page < 0 || page > meta.value?.last_page)
        return;
      active.value = page;
      props.pagination?.paginate(page);
    };
    onMounted(() => {
      const data = (Array.isArray(props.rows) ? props.rows : props.rows?.data ?? []).map((e) => ({ ...e }));
      originData = data;
      dataTable.value = data;
      if (!Array.isArray(props.rows)) {
        rowOptions.value = props.rows.options ? props.rows.options : (_) => [];
        rowActions.value = props.rows.actions ? props.rows.actions : (_, __) => {
        };
      }
      headers.value = props.columns.map((e) => {
        return {
          ...e,
          sort_icon: "ti-arrows-sort"
        };
      });
    });
    watch(() => props.rows, (data) => {
      const rowsData = (Array.isArray(props.rows) ? props.rows : props.rows?.data ?? []).map((e) => ({ ...e }));
      originData = rowsData;
      dataTable.value = rowsData;
      if (!Array.isArray(props.rows)) {
        rowOptions.value = props.rows.options;
        rowActions.value = props.rows.actions;
      }
    }, { deep: true });
    watch(() => props.pagination, (data) => {
      meta.value = data.meta;
    }, { deep: true });
    return { utils, keys, headers, dataTable, doSortBy, entries, onEntries, meta, entry, active, onNavigate, pageNumber, rowOptions, rowActions };
  }
};
</script>

<style scoped>
.custom-table {
  overflow-y: auto;
  scrollbar-width: thin;
}
.custom-table thead th {
  position: sticky;
  z-index: 1;
  top: 0;
}
.custom-table table {
  border-collapse: collapse;
  width: 100%;
}

.table thead tr th span {
  padding: 8px 0;
  font-weight: bold;
}
.table thead tr th span.hoverable {
  cursor: pointer;
}
.table thead tr th span.hoverable:hover {
  opacity: 0.6;
}
.table thead tr th span.hoverable:active {
  opacity: 1;
}
</style>
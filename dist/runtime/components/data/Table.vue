<template>
  <div class="card">
    <!-- <div class="card-header">
      <h3 class="card-title">Invoices</h3>
    </div> -->
    <div class="card-body border-bottom py-3">
      <div class="d-flex">
        <div class="text-secondary">
          Show
          <div class="mx-2 d-inline-block">
            <input type="text" class="form-control form-control-sm" value="8" size="3" aria-label="Invoices count">
          </div>
          entries
        </div>
        <div class="ms-auto text-secondary">
          Search:
          <div class="ms-2 d-inline-block">
            <input type="text" class="form-control form-control-sm" aria-label="Search invoice">
          </div>
        </div>
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
    <div class="card-footer d-flex align-items-center">
      <p class="m-0 text-secondary">Showing <span>1</span> to <span>8</span> of <span>16</span> entries</p>
      <ul class="pagination m-0 ms-auto">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
            <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
            </svg>
            prev
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
        <li class="page-item">
          <a class="page-link" href="#">
            next <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    columns: {
      type: Array,
      default: []
    },
    rows: {
      type: Array,
      default: []
    }
  },
  setup(props, {}) {
    const originData = props.rows.map((e) => ({ ...e }));
    const headers = ref(props.columns);
    const dataTable = ref(props.rows);
    let sortBy = "";
    let sortKey = null;
    const toKey = (e) => {
      return e.key ? e.key : e.label.toLowerCase().replaceAll(" ", "_");
    };
    const sortByKeyAsc = (arr, key) => {
      return arr.sort((a, b) => {
        if (a[key] < b[key])
          return -1;
        if (a[key] > b[key])
          return 1;
        return 0;
      });
    };
    const sortByKeyDesc = (arr, key) => {
      return arr.sort((a, b) => {
        if (a[key] < b[key])
          return 1;
        if (a[key] > b[key])
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
        if (sortBy == "") {
          dataTable.value = sortByKeyAsc(props.rows, key);
          sortBy = "asc";
          header.sort_icon = "ti-sort-ascending";
        } else if (sortBy == "asc") {
          dataTable.value = sortByKeyDesc(props.rows, key);
          sortBy = "desc";
          header.sort_icon = "ti-sort-descending";
        } else {
          dataTable.value = originData;
          sortBy = "";
          header.sort_icon = "ti-arrows-sort";
        }
      }
    };
    onMounted(() => {
      headers.value = props.columns.map((e) => {
        return {
          ...e,
          sort_icon: "ti-arrows-sort"
        };
      });
    });
    return { keys, headers, dataTable, doSortBy };
  }
};
</script>

<style scoped>
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
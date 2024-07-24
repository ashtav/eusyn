<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Invoices</h3>
    </div>
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
    <div class="table-responsive">
      <table class="table card-table table-vcenter text-nowrap datatable">
        <thead>
          <tr>
            <th class="w-1"><input class="form-check-input m-0 align-middle" type="checkbox"
                aria-label="Select all invoices"></th>
            <th class="w-1">No. <!-- Download SVG icon from http://tabler-icons.io/i/chevron-up -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-sm icon-thick">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 15l6 -6l6 6"></path>
              </svg>
            </th>
            <th>Invoice Subject</th>
            <th>Client</th>
            <th>VAT No.</th>
            <th>Created</th>
            <th>Status</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <slot></slot>

          
          
        </tbody>
      </table>
    </div>
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

<script lang="ts">
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>
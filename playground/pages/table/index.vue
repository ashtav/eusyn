<template>
  <div>
    <PageHeader title="Table" />

    <div class="col-12">
      <div class="card">
        <div class="table-respo nsive">
          <table class="table table-vcenter card-table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Role</th>
                <th class="w-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maryjo Lebarree</td>
                <td class="text-secondary text-nowrap">Civil Engineer, Product Management</td>
                <td class="text-secondary">
                  <p class="text-wrap text-break w-50">mlebarree5@unc.edu</p>
                </td>
                <td class="text-secondary">User</td>
                <td>
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Egan Poetz</td>
                <td class="text-secondary">Research Nurse, Engineering</td>
                <td class="text-secondary"><a href="#" class="text-reset">epoetz6@free.fr</a></td>
                <td class="text-secondary">User</td>
                <td>
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Kellie Skingley</td>
                <td class="text-secondary">Teacher, Services</td>
                <td class="text-secondary"><a href="#" class="text-reset">kskingley7@columbia.edu</a></td>
                <td class="text-secondary">User</td>
                <td>
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Christabel Charlwood</td>
                <td class="text-secondary">Tax Accountant, Engineering</td>
                <td class="text-secondary"><a href="#" class="text-reset">ccharlwood8@nifty.com</a></td>
                <td class="text-secondary">Owner</td>
                <td>
                  <a href="#">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Haskel Shelper</td>
                <td class="text-secondary">Staff Scientist, Legal</td>
                <td class="text-secondary"><a href="#" class="text-reset">hshelper9@woothemes.com</a></td>
                <td class="text-secondary">User</td>
                <td>
                  <a href="#">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
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

  computed: {

  },

  data() {
    return {

    }
  },

  methods: {

  },

  mounted() {
  }
}
</script>

<style lang="scss" scoped></style>
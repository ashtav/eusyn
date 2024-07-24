<template>
    <div class="container py-6">
        <div class="row">
            <div class="col-lg-6">
                <h2>LazyUI - Table</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit expedita sed cumque harum
                    libero
                    reiciendis? Enim voluptas reprehenderit alias omnis sequi corrupti est, nulla quo ea similique
                    exercitationem
                    voluptates.</p>
            </div>
        </div>

        <Table>
            <tr>
                <td><input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice"></td>
                <td><span class="text-secondary">001401</span></td>
                <td><a href="invoice.html" class="text-reset" tabindex="-1">Design Works</a></td>
                <td>
                    <span class="flag flag-xs flag-country-us me-2"></span>
                    Carlson Limited
                </td>
                <td>
                    87956621
                </td>
                <td>
                    15 Dec 2017
                </td>
                <td>
                    <span class="badge bg-success me-1"></span> Paid
                </td>
                <td>$887</td>
                <td class="text-end">
                    <span class="dropdown">
                        <button class="btn dropdown-toggle align-text-top" data-bs-boundary="viewport"
                            data-bs-toggle="dropdown">Actions</button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">
                                Action
                            </a>
                            <a class="dropdown-item" href="#">
                                Another action
                            </a>
                        </div>
                    </span>
                </td>
            </tr>
        </Table>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>
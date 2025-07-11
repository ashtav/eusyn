<template>
    <div>
        <PageHeader title="List Group" />

        <div class="row">
            <div class="col-6">
                <Card title="Profile" icon="hgi-user" class="p-0">
                    <ListGroup :data="['name', 'email', 'phone']" v-slot="{ e, i }">
                        <ListGroupItem :label="$e.case.capital(e)" :value="user[e]" />
                    </ListGroup>
                </Card>

                <Code class="mt-3 mb-5" code='<Card title="Profile" icon="hgi-user" class="p-0">
    <ListGroup :data="[]" v-slot="{ e, i }">
        <ListGroupItem :label="e" :value="user[e]"  />
    </ListGroup>
</Card>' />

                <br><br>

                <Card title="Profile Inline" icon="hgi-user" class="p-0">
                    <ListGroup :data="['name', 'email', 'phone']" v-slot="{ e, i }">
                        <ListGroupItem :label="$e.case.capital(e)" :value="user[e]" inline />
                    </ListGroup>
                </Card>

                <Code class="mt-3 mb-5" code='<Card title="Profile" icon="hgi-user" class="p-0">
    <ListGroup :data="[]" v-slot="{ e, i }">
        <ListGroupItem :label="e" :value="user[e]" inline />
    </ListGroup>
</Card>' />

                <br><br>

            </div>

            <div class="col-6">
                <Card title="Loading" icon="hgi-database" class="p-0" :actions="[
                    { icon: 'hgi-refresh', click: onRefresh }
                ]">
                    <ListGroup :loading="isLoading">
                        <ListGroupItem class="text-secondary">
                            Oops, no data available. This is just an example of a loading state using the ListGroup
                            component.
                        </ListGroupItem>
                    </ListGroup>
                </Card>

                <Code class="mt-3 mb-5" code='<ListGroup :loading="isLoading">
    <ListGroupItem class="text-secondary">
        Your text here...
    </ListGroupItem>
</ListGroup>' />

                <br><br>

                <Card title="Thumbnail" icon="hgi-image-01" class="p-0">
                    <ListGroup>
                        <ListGroupItem label="Product Name" value="Mineral Water 150ml" tsize="md"
                            thumbnail="https://img.freepik.com/premium-photo/plant-is-growing-white-wall-is-black-white_1221953-57170.jpg?w=360" />
                    </ListGroup>
                </Card>

                <Code class="mt-3 mb-5" code='<ListGroup>
    <ListGroupItem label="Product Name" value="Mineral Water 150ml" thumbnail="https://..." tsize="md" />
</ListGroup>' />

                <br><br>

                <Card title="Actions" icon="hgi-function-square" class="p-0">
                    <ListGroup :loading="isLoading">
                        <ListGroupItem label="Product Name" value="Mineral Water 150ml" @action="onAction" />
                    </ListGroup>
                </Card>

                <Code class="mt-3 mb-5" code='<ListGroup :loading="isLoading">
    <ListGroupItem label="Product Name" value="Mineral Water 150ml" @action="onAction" hoverAction />
</ListGroup>' />
            </div>

        </div>
    </div>
</template>

<script lang="ts">

export default {
    setup() {
        return {}
    },

    data() {
        return {
            isLoading: true,
            user: <any>{ id: 1, name: 'John Doe', email: 'johndoe@gmail.com', phone: '123-456-7890' },

            products: [
                { id: 1, name: 'Mineral Water 150ml', price: 1.50 },
                { id: 2, name: 'Pizza Margherita', price: 8.50 },
            ]
        }
    },

    methods: {
        onRefresh() {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        },

        onAction(option: any) {
            console.log(option)
        }
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }
}
</script>

<style lang="scss" scoped></style>
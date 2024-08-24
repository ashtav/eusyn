<template>
    <div>
        <PageHeader title="Cards" />

        <ClientOnly>
            <div class="row">
                <div class="col-4">
                    <Card title="Simple Card">
                        <p class="m-0">This is some text within a card body.</p>
                    </Card>

                    <Code class="mt-3 mb-5" code='<Card title="Simple Card">
    <p>This is some text within a card body.</p>
</Card>' />

                    <Card title="Stacked Card" stacked>
                        <p>This is some text within a card body.</p>
                    </Card>

                    <Code class="mt-3 mb-5" code='<Card title="Stacked Card" stacked>
    <p>This is some text within a card body.</p>
</Card>' />

                    <Card title="Actions Card" :actions="actions">
                        <p>This is some text within a card body.</p>
                    </Card>
                    <Code class="mt-3 mb-1" code='<Card title="Actions Card" :actions="actions">
    <p>This is some text within a card body.</p>
</Card>' />

<Code class="mt-3 mb-5" code="actions: <Array<any>>[
    { icon: 'pencil', click: this.onActions },
    { icon: 'trash', click: this.onActions },
]" />

                    <Card title="Card Image"
                        thumbnail="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi numquam atque, totam
                            eligendi explicabo, neque voluptate dolorem vitae illum magnam illo eveniet voluptatibus
                            doloremque consequuntur, aut sint. Blanditiis, aspernatur quibusdam!
                        </p>

                        <div class="d-flex align-items-center pt-4 mt-auto">
                            <Avatar size="sm" url="https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-178.jpg?w=360" />
                            <div class="ms-3">
                                <a href="#" class="text-body">John Doe</a>
                                <div class="text-secondary">3 days ago</div>
                            </div>
                            <div class="ms-auto">
                                <a href="#" class="icon d-none d-md-inline-block ms-3 text-secondary">
                                    <Ti icon="heart" />
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>

                <div class="col-lg-8">
                    <Card title="Tabbed Card" :tabs="tabs" tab-pos="top" v-slot="{ tab }">
                        <div class="card-body">
                            <div class="card-title">Content of tab #{{ tab }}</div>
                            <p class="text-secondary">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
                                distinctio
                                dolorem expedita, fugiat hic magni molestiae molestias odit.
                            </p>
                        </div>
                    </Card>

                    <Code class="mt-3 mb-5" code='<Card title="Tabbed Card" :tabs="[]" v-slot="{ tab }">
    <p v-if="tab == 0">Your content is here...</p>
</Card>' />
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            actions: <Array<any>>[
                { icon: 'pencil', click: this.onActions },
                { icon: 'trash', click: this.onActions },
            ],

            tabs: [
                { label: 'Biodata', icon: 'user' },
                { label: 'Education', icon: 'school' },
                { label: 'Works', icon: 'briefcase' },
            ]
        }
    },

    methods: {
        onActions(data: any) {
            console.log(data)
        }
    },
}
</script>

<style lang="scss" scoped></style>
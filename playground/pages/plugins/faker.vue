<template>
    <div>
        <PageHeader title="Faker Generator" />

        <div class="row">
            <div class="col-lg-6">
                <h4>$ntx.faker.number</h4>
                <Code class="mb-3" code="$ntx.faker.number(5, '+62');"
                    description="Generates a random number with the specified length, optionally starting with a prefix." />

                <h4>$ntx.faker.price</h4>
                <Code class="mb-3" code="$ntx.faker.price(5, 'id_ID', 'IDR');"
                    description="Generates a formatted random price with the specified length, locale, and currency prefix." />

                <h4>$ntx.faker.name</h4>
                <Code class="mb-3" code="$ntx.faker.name();"
                    description="Generates a random name from a predefined list." />

                <h4>$ntx.faker.email</h4>
                <Code class="mb-3" code="$ntx.faker.email('example.com', true);"
                    description="Generates a random email address with an optional domain and number suffix." />

                <h4>$ntx.faker.phone</h4>
                <Code class="mb-3" code="$ntx.faker.phone('08');"
                    description="Generates a random phone number with a specified prefix." />

                <h4>$ntx.faker.address</h4>
                <Code class="mb-3" code="$ntx.faker.address();"
                    description="Generates a random address from a predefined list." />

                <h4>$ntx.faker.date</h4>
                <Code class="mb-3" code="$ntx.faker.date('yyyy-MM-dd');"
                    description="Generates a random date formatted according to the specified format." />

                <h4>$ntx.faker.gender</h4>
                <Code class="mb-3" code="$ntx.faker.gender(['Male', 'Female']);"
                    description="Generates a random gender from a predefined list." />

                <h4>$ntx.faker.time</h4>
                <Code class="mb-3" code="$ntx.faker.time();"
                    description="Generates a random time formatted as HH:MM:SS." />

                <h4>$ntx.faker.invoice</h4>
                <Code class="mb-3" code="$ntx.faker.invoice('INV');"
                    description="Generates a random invoice number with a specified prefix." />

                <h4>$ntx.faker.password</h4>
                <Code class="mb-3" code="$ntx.faker.password(8, true);"
                    description="Generates a random password with optional special characters." />

                <h4>$ntx.faker.image</h4>
                <Code class="mb-3" code="$ntx.faker.image('avatar');"
                    description="Generates a random image URL, optionally specifying the image type." />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
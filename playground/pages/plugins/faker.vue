<template>
    <div>
        <PageHeader title="Faker Generator" />

        <div class="row">
            <div class="col-lg-6">
                <h4>$e.faker.number</h4>
                <Code class="mb-3" code="$e.faker.number(5, '+62');"
                    description="Generates a random number with the specified length, optionally starting with a prefix." />

                <h4>$e.faker.price</h4>
                <Code class="mb-3" code="$e.faker.price(5, 'id_ID', 'IDR');"
                    description="Generates a formatted random price with the specified length, locale, and currency prefix." />

                <h4>$e.faker.name</h4>
                <Code class="mb-3" code="$e.faker.name();"
                    description="Generates a random name from a predefined list." />

                <h4>$e.faker.email</h4>
                <Code class="mb-3" code="$e.faker.email('example.com', true);"
                    description="Generates a random email address with an optional domain and number suffix." />

                <h4>$e.faker.phone</h4>
                <Code class="mb-3" code="$e.faker.phone('08');"
                    description="Generates a random phone number with a specified prefix." />

                <h4>$e.faker.address</h4>
                <Code class="mb-3" code="$e.faker.address();"
                    description="Generates a random address from a predefined list." />

                <h4>$e.faker.date</h4>
                <Code class="mb-3" code="$e.faker.date('yyyy-MM-dd');"
                    description="Generates a random date formatted according to the specified format." />

                <h4>$e.faker.gender</h4>
                <Code class="mb-3" code="$e.faker.gender(['Male', 'Female']);"
                    description="Generates a random gender from a predefined list." />

                <h4>$e.faker.time</h4>
                <Code class="mb-3" code="$e.faker.time();"
                    description="Generates a random time formatted as HH:MM:SS." />

                <h4>$e.faker.invoice</h4>
                <Code class="mb-3" code="$e.faker.invoice('INV');"
                    description="Generates a random invoice number with a specified prefix." />

                <h4>$e.faker.password</h4>
                <Code class="mb-3" code="$e.faker.password(8, true);"
                    description="Generates a random password with optional special characters." />

                <h4>$e.faker.image</h4>
                <Code class="mb-3" code="$e.faker.image('avatar');"
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
<template>
    <div>
        <PageHeader title="Utilities" />

        <div class="row">
            <div class="col-lg-6">
                <h4>$ntx.utils.alpha</h4>
                <Code class="mb-3" code="$ntx.utils.alpha('john do3e');"
                    description="Removes non-alphabetic characters." />

                <h4>$ntx.utils.numeric</h4>
                <Code class="mb-3" code="$ntx.utils.numeric('john do3e');"
                    description="Removes non-numeric characters." />

                <h4>$ntx.utils.alphanumeric</h4>
                <Code class="mb-3" code="$ntx.utils.alphanumeric('john do3e');"
                    description="Removes non-alphanumeric characters." />

                <h4>$ntx.utils.ucwords</h4>
                <Code class="mb-3" code="$ntx.utils.ucwords('hello world!');"
                    description="Capitalizes the first letter of each word." />

                <h4>$ntx.utils.ucfirst</h4>
                <Code class="mb-3" code="$ntx.utils.ucfirst('hello world!');"
                    description="Capitalizes the first letter of the string." />

                <h4>$ntx.utils.currency</h4>
                <Code class="mb-3" code="$ntx.utils.currency('35000');" description="Formats a number as currency." />

                <h4>$ntx.utils.cleanMap</h4>
                <Code class="mb-3" code="$ntx.utils.cleanMap(this, 'forms');"
                    description="Cleans undefined or null properties from an object." />

                <h4>$ntx.utils.randInt</h4>
                <Code class="mb-3" code="$ntx.utils.randInt(10, 100);"
                    description="Generates a random integer within a range." />

                <h4>$ntx.utils.randString</h4>
                <Code class="mb-3" code="$ntx.utils.randString(15);"
                    description="Generates a random string of a specified length." />

                <h4>$ntx.utils.formatBytes</h4>
                <Code class="mb-3" code="$ntx.utils.formatBytes(4586);"
                    description="Formats a number of bytes into a readable string." />

                <h4>$ntx.utils.copy</h4>
                <Code class="mb-3" code="$ntx.utils.copy('51022', 'OTP has been copied.');"
                    description="Copies text to clipboard with a message." />

                <h4>$ntx.utils.downloadFile</h4>
                <Code class="mb-3" code="$ntx.utils.downloadFile('<image-url>');"
                    description="Initiates a file download from a URL." />

                <h4>$ntx.utils.dateFormat</h4>
                <Code class="mb-3" code="$ntx.utils.dateFormat('2024-05-10', 'd-m-Y');"
                    description="Formats a date according to a specified format." />
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
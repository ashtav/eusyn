<template>
    <div>
        <PageHeader title="Utilities" />

        <div class="row">
            <div class="col-lg-6">
                <h4>$e.utils.alpha</h4>
                <Code class="mb-3" code="$e.utils.alpha('john do3e');"
                    description="Removes non-alphabetic characters." />

                <h4>$e.utils.numeric</h4>
                <Code class="mb-3" code="$e.utils.numeric('john do3e');"
                    description="Removes non-numeric characters." />

                <h4>$e.utils.alphanumeric</h4>
                <Code class="mb-3" code="$e.utils.alphanumeric('john do3e');"
                    description="Removes non-alphanumeric characters." />

                <h4>$e.utils.ucwords</h4>
                <Code class="mb-3" code="$e.utils.ucwords('hello world!');"
                    description="Capitalizes the first letter of each word." />

                <h4>$e.utils.ucfirst</h4>
                <Code class="mb-3" code="$e.utils.ucfirst('hello world!');"
                    description="Capitalizes the first letter of the string." />

                <h4>$e.utils.currency</h4>
                <Code class="mb-3" code="$e.utils.currency('35000');" description="Formats a number as currency." />

                <h4>$e.utils.cleanMap</h4>
                <Code class="mb-3" code="$e.utils.cleanMap(this, 'forms');"
                    description="Cleans undefined or null properties from an object." />

                <h4>$e.utils.randInt</h4>
                <Code class="mb-3" code="$e.utils.randInt(10, 100);"
                    description="Generates a random integer within a range." />

                <h4>$e.utils.randString</h4>
                <Code class="mb-3" code="$e.utils.randString(15);"
                    description="Generates a random string of a specified length." />

                <h4>$e.utils.formatBytes</h4>
                <Code class="mb-3" code="$e.utils.formatBytes(4586);"
                    description="Formats a number of bytes into a readable string." />

                <h4>$e.utils.copy</h4>
                <Code class="mb-3" code="$e.utils.copy('51022', 'OTP has been copied.');"
                    description="Copies text to clipboard with a message." />

                <h4>$e.utils.downloadFile</h4>
                <Code class="mb-3" code="$e.utils.downloadFile('<image-url>');"
                    description="Initiates a file download from a URL." />

                <h4>$e.utils.dateFormat</h4>
                <Code class="mb-3" code="$e.utils.dateFormat('2024-05-10', 'd-m-Y');"
                    description="Formats a date according to a specified format." />

                <h4>$e.utils.firstAndLastDate</h4>
                <Code class="mb-3" code="$e.utils.firstAndLastDate('2025-02-01');"
                    description="Returns the first and last date of the month." />

                <h4>$e.utils.now</h4>
                <Code class="mb-3" code="$e.utils.now();" description="Returns the current date and time." />
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
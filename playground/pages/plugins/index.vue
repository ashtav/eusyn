<template>
    <div>
        <PageHeader title="Utilities" />

        <div class="row">
            <div class="col-lg-6">
                <h4>$u.alpha</h4>
                <Code class="mb-3" code="$u.alpha('john do3e');" description="Removes non-alphabetic characters." />

                <h4>$u.numeric</h4>
                <Code class="mb-3" code="$u.numeric('john do3e');" description="Removes non-numeric characters." />

                <h4>$u.alphanumeric</h4>
                <Code class="mb-3" code="$u.alphanumeric('john do3e');"
                    description="Removes non-alphanumeric characters." />

                <h4>$u.ucwords</h4>
                <Code class="mb-3" code="$u.ucwords('hello world!');"
                    description="Capitalizes the first letter of each word." />

                <h4>$u.ucfirst</h4>
                <Code class="mb-3" code="$u.ucfirst('hello world!');"
                    description="Capitalizes the first letter of the string." />

                <h4>$u.currency</h4>
                <Code class="mb-3" code="$u.currency('35000');" description="Formats a number as currency." />

                <h4>$u.cleanMap</h4>
                <Code class="mb-3" code="$u.cleanMap(this, 'forms');"
                    description="Cleans undefined or null properties from an object." />

                <h4>$u.randInt</h4>
                <Code class="mb-3" code="$u.randInt(10, 100);"
                    description="Generates a random integer within a range." />

                <h4>$u.randString</h4>
                <Code class="mb-3" code="$u.randString(15);"
                    description="Generates a random string of a specified length." />

                <h4>$u.formatBytes</h4>
                <Code class="mb-3" code="$u.formatBytes(4586);"
                    description="Formats a number of bytes into a readable string." />

                <h4>$u.copy</h4>
                <Code class="mb-3" code="$u.copy('51022', 'OTP has been copied.');"
                    description="Copies text to clipboard with a message." />

                <h4>$u.downloadFile</h4>
                <Code class="mb-3" code="$u.downloadFile('<image-url>');"
                    description="Initiates a file download from a URL." />

                <h4>$u.dateFormat</h4>
                <Code class="mb-3" code="$u.dateFormat('2024-05-10', 'd-m-Y');"
                    description="Formats a date according to a specified format." />

                <h4>$u.firstAndLastDate</h4>
                <Code class="mb-3" code="$u.firstAndLastDate('2025-02-01');"
                    description="Returns the first and last date of the month." />

                <h4>$u.now</h4>
                <Code class="mb-3" code="$u.now();" description="Returns the current date and time." />

                <h4>$u.daysBetween</h4>
                <Code class="mb-3" code="$u.daysBetween('2025-08-01', '2025-08-04')"
                    description="Returns the number of days between two dates." />

                <h4>$u.getDateRange</h4>
                <Code class="mb-3" code="$u.getDateRange('2025-08-01', '2025-08-04')"
                    description="Returns the date range between two dates." />
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
const convertTimestamp = (input?: string): string => {
    if (!input) {
        return ''
    }

    const datePart = input.split('T')[0]; // Extract date part (2024-08-15)
    const timePart = input.split('T')[1]?.split('.')[0]; // Extract time part (21:57:29)

    if (!datePart || !timePart) {
        throw new Error("Invalid input format");
    }

    const formattedDate = datePart.replace(/-/g, ' '); // Convert date to "2024 08 15"
    const formattedTime = timePart.replace(/:/g, ' '); // Convert time to "21 57 29"

    return `${formattedDate} . ${formattedTime}`;
}

const helper = {
    convertTimestamp
}

export default defineNuxtPlugin((app) => {
    return {
        provide: {
            helper
        }
    }
})
export default defineNuxtPlugin((app) => {
    return {
        provide: {
            // u: utils
            ut: {
                hello: () => { }
            }
        }
    }
})


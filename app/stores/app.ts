import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            sidebar: <any>{
                expanded: false
            },
        }
    },

    actions: {
        expand(_: any) {
            this.sidebar.expanded = !this.sidebar.expanded
        },
    },
})
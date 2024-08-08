import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            paths: <Array<any>>[],

            sidebar: <any>{
                expanded: false
            },
        }
    },

    actions: {
        expand(_: any) {
            this.sidebar.expanded = !this.sidebar.expanded
        },

        assignPath(paths: Array<any>) {
            if (paths.length == 1 && paths[0].name == 'index') {
                return this.paths = []
            }

            this.paths = paths
        }
    },
})
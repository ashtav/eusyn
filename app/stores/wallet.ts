import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: () => {
    return {
      wallets: <Array<Wallet>>[],
      query: <any>{
        page: 1,
        per_page: 15
      }
    }
  },

  actions: {
    getData() {
      return api.get('wallets', this.query).then(res => {
        this.wallets = res.data ?? []
      })
    }
  }
})
import { defineStore } from 'pinia'

export const useCheckAuth = defineStore('authenticate', {
  state: () => ({
    authenticate: false,
  }),
  actions: {
    login() {
      this.authenticate = true
    },
    logout() {
      this.authenticate = false
    },
  },
  getters: {},
})

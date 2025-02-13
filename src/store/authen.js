import { defineStore } from 'pinia'

export const useCheckAuth = defineStore('counter', {
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

import { defineStore } from 'pinia'

export const chooseArrayIDStore = defineStore({
  id: 'chooseArray',
  state: () => ({
    count: 0,
    chooseArray: []
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as Record<string, any>
  }),

  actions: {
    setUser(newUser: Record<string, any>) {
      this.user = newUser
    },
    clearUser() {
      this.user = {}
    }
  },

  persist: import.meta.client 
})

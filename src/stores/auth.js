import { defineStore } from 'pinia'
import api from '@/utils/axios' // import axios instance

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null,
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(form) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/login', form)
        this.user = {
          id: res.data.data.id,
          name: res.data.data.name,
          email: res.data.data.email,
        }
        this.token = res.data.data.token
        localStorage.setItem('token', this.token)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.error = 'Unauthorized'
        } else if (err.response && err.response.data) {
          this.error = err.response.data.errors || 'Unknown error'
        } else {
          this.error = 'Something went wrong'
        }
      } finally {
        this.loading = false
      }
    },

    // async checkAuth() {
    //   this.loading = true
    //   this.error = null
    //   try {
    //     const res = await api.get('/auth/me')
    //     this.user = res.data.data
    //   } catch (err) {
    //     this.user = null
    //     this.token = null
    //     localStorage.removeItem('token')
    //     this.error = 'Not authenticated'
    //     throw err
    //   } finally {
    //     this.loading = false
    //   }
    // },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})

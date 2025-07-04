// auth.js
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { axiosInstance } from '@/plugins/axios'
import { handleError } from '@/helpers/errorHelper'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null,
    user: null,
    success: null,
  }),
  getters: {
    token: (state) => Cookies.get('token'),
  },
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.post('/login', credentials)
        const token = response.data.token
        if (!token) throw new Error('Token tidak ditemukan')
        Cookies.set('token', token)
        this.success = 'Login success'
        await this.checkAuth()
        router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      Cookies.remove('token')
      this.user = null
      this.error = null
      this.success = 'Logout Success'
      router.push({ name: 'login' })
    },

    async checkAuth() {
      this.loading = true
      try {
        const response = await axiosInstance.get('/me')
        this.user = response.data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.logout()
        } else {
          this.error = handleError(error)
        }
      } finally {
        this.loading = false
      }
    },
  },
})

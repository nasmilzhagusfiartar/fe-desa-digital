import { handleError } from '@/helpers/errorHelper'
import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios'
import router from '@/router'

export const useSocialAssistanceStore = defineStore('social-assistance', {
  state: () => ({
    socialAssistances: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
    loading: false,
    error: null,
    success: null,
  }),
  actions: {
    async fetchSocialAssistancesPaginated(params) {
      this.loading = true

      try {
        const response = await axiosInstance.get(`social-assistance/all/paginated`, { params })

        this.socialAssistances = response.data.data.data
        this.meta = response.data.data.meta
      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async fetchSocialAssistance(id) {
      this.loading = true

      try {
        const response = await axiosInstance.get(`/social-assistance/${id}`)

        return response.data.data
      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async deleteSocialAssistance(id) {
      this.loading = true

      try {
        const response = await axiosInstance.delete(`/social-assistance/${id}`)

        this.success = response.data.message
      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },
  },
})

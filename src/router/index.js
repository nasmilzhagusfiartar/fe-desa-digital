import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Main from '../layouts/Main.vue'
import Auth from '../layouts/Auth.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          // meta: { requiresAuth: true, permission: 'dashboard-menu' },
        },
      ],
    },
    {
      path: '/login',
      component: Auth,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
          meta: { requiresUnauth: true },
        },
      ],
    },
    {
      path: '/403',
      name: 'error403',
      component: {
        template:
          '<div class="text-center p-10 text-red-600 font-bold">403 Forbidden: Akses Ditolak</div>',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      try {
        if (!authStore.user) {
          await authStore.checkAuth()
        }

        const userPermissions = authStore.user?.permissions || []

        if (to.meta.permission && !userPermissions.includes(to.meta.permission)) {
          next({ name: 'error403' })
          return
        }

        next()
      } catch (error) {
        next({ name: 'login' })
      }
    } else {
      const userPermissions = authStore.user?.permissions || []

      if (to.meta.permission && !userPermissions.includes(to.meta.permission)) {
        next({ name: 'error403' })
        return
      }

      next()
    }
  } else if (to.meta.requiresUnauth && authStore.token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router

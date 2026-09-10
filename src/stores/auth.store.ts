import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  LoginData,
  RegisterData,
} from '@/repositories/auth/auth.repository'

import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<{
      id: string
      fullName: string
      email: string
      phone: string
    } | null>(null)

    const loading = ref(false)
    const error = ref<string | null>(null)

    async function login(data: LoginData) {
      loading.value = true
      error.value = null

      try {
        user.value =
          await authService.login(data)

        return true
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Login failed'

        return false
      } finally {
        loading.value = false
      }
    }

    async function register(data: RegisterData) {
      loading.value = true
      error.value = null

      try {
        user.value =
          await authService.register(data)

        return true
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Registration failed'

        return false
      } finally {
        loading.value = false
      }
    }

    async function logout() {
      await authService.logout()
      user.value = null
    }

    async function loadUser() {
      user.value =
        await authService.getCurrentUser()
    }

    return {
      user,
      loading,
      error,
      login,
      register,
      logout,
      loadUser,
    }
  },
)
import { LocalAuthRepository } from '@/repositories/auth/local-auth.repository'

import type {
  LoginData,
  RegisterData,
} from '@/repositories/auth/auth.repository'

const authRepository =
  new LocalAuthRepository()

export const authService = {
  async login(data: LoginData) {
    return authRepository.login(data)
  },

  async register(data: RegisterData) {
    return authRepository.register(data)
  },

  async logout() {
    return authRepository.logout()
  },

  async getCurrentUser() {
    return authRepository.getCurrentUser()
  },
}
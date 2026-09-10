import type {
  AuthRepository,
  AuthUser,
  LoginData,
  RegisterData,
} from './auth.repository'

const USER_KEY = 'payflow_user'
const AUTH_KEY = 'payflow_authenticated'

export class LocalAuthRepository
  implements AuthRepository
{
  async login(data: LoginData): Promise<AuthUser> {
    const user = localStorage.getItem(USER_KEY)

    if (!user) {
      throw new Error('Account not found')
    }

    const parsedUser = JSON.parse(user) as AuthUser

    if (parsedUser.email !== data.email) {
      throw new Error('Invalid email or password')
    }

    localStorage.setItem(AUTH_KEY, 'true')

    return parsedUser
  }

  async register(data: RegisterData): Promise<AuthUser> {
    const user: AuthUser = {
      id: `USER-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    }

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user),
    )

    localStorage.setItem(AUTH_KEY, 'true')

    return user
  }

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY)
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const authenticated =
      localStorage.getItem(AUTH_KEY)

    if (authenticated !== 'true') {
      return null
    }

    const user = localStorage.getItem(USER_KEY)

    if (!user) {
      return null
    }

    return JSON.parse(user) as AuthUser
  }
}
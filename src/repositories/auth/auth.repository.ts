export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface AuthRepository {
  login(data: LoginData): Promise<AuthUser>
  register(data: RegisterData): Promise<AuthUser>
  logout(): Promise<void>
  getCurrentUser(): Promise<AuthUser | null>
}
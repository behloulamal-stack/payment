
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function login() {
  const success = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <v-app>
    <v-main class="auth-page">
      <div class="auth-container">

        <!-- Brand -->
        <div class="brand">
          <div class="brand-icon">
            <v-icon
              icon="mdi-wallet-outline"
              size="26"
            />
          </div>

          <span class="brand-name">
            PayFlow
          </span>
        </div>

        <!-- Login Card -->
        <v-card
          class="auth-card"
          rounded="xl"
          elevation="0"
        >
          <div class="text-center card-header">
            <h1 class="auth-title">
              Welcome back
            </h1>

            <p class="auth-subtitle">
              Login to your PayFlow account
            </p>
          </div>

          <!-- Error -->
          <v-alert
            v-if="authStore.error"
            type="error"
            variant="tonal"
            rounded="lg"
            class="mb-5"
          >
            {{ authStore.error }}
          </v-alert>

          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-email-outline"
            rounded="lg"
            class="mb-3"
          />

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            rounded="lg"
            class="mb-2"
          />

          <!-- Forgot password -->
          <div class="forgot-password">
            <v-btn
              variant="text"
              size="small"
              color="primary"
              class="px-0"
            >
              Forgot password?
            </v-btn>
          </div>

          <!-- Login button -->
          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            class="login-button"
            :loading="authStore.loading"
            @click="login"
          >
            Login
          </v-btn>

          <!-- Register -->
          <div class="register-link">
            <span>
              Don't have an account?
            </span>

            <v-btn
              variant="text"
              color="primary"
              to="/register"
              class="px-1"
            >
              Register
            </v-btn>
          </div>
        </v-card>

        <!-- Footer -->
        <p class="auth-footer">
          © 2026 PayFlow
        </p>

      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: rgb(var(--v-theme-background));
}

.auth-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

/* Brand */

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-primary));
  color: white;
}

.brand-name {
  font-size: 23px;
  font-weight: 700;
  color: #111827;
}

/* Card */

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border: 1px solid #e9eaf0;
  background: #ffffff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06) !important;
}

.card-header {
  margin-bottom: 28px;
}

.auth-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.auth-subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  color: #9ca3af;
}

/* Forgot password */

.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-top: -4px;
  margin-bottom: 12px;
}

/* Login button */

.login-button {
  height: 50px !important;
  font-weight: 600;
  letter-spacing: 0;
}

/* Register link */

.register-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 24px;
  font-size: 13px;
  color: #9ca3af;
}

/* Footer */

.auth-footer {
  margin-top: 24px;
  font-size: 11px;
  color: #9ca3af;
}

/* Mobile */

@media (max-width: 600px) {
  .auth-container {
    justify-content: flex-start;
    padding: 36px 16px 24px;
  }

  .brand {
    margin-bottom: 24px;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  .brand-name {
    font-size: 21px;
  }

  .auth-card {
    max-width: 100%;
    padding: 24px 20px;
    border-radius: 20px !important;
  }

  .auth-title {
    font-size: 24px;
  }

  .auth-subtitle {
    font-size: 13px;
  }

  .card-header {
    margin-bottom: 24px;
  }

  .auth-footer {
    margin-top: 20px;
  }
}
</style>

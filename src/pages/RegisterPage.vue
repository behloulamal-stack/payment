<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

async function register() {
  const success = await authStore.register({
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
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
        <!-- Branding -->
        <div class="brand">
          <div class="brand-icon">
            <v-icon
              icon="mdi-wallet-outline"
              size="30"
            />
          </div>

          <span>PayFlow</span>
        </div>

        <v-card
          width="420"
          rounded="xl"
          class="pa-8"
        >
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold">
              Create account
            </h1>

            <p class="text-body-2 text-medium-emphasis mt-2">
              Start using PayFlow today
            </p>
          </div>

          <v-alert
            v-if="authStore.error"
            type="error"
            variant="tonal"
            class="mb-4"
          >
            {{ authStore.error }}
          </v-alert>

          <v-text-field
            v-model="fullName"
            label="Full name"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            class="mb-3"
          />

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
            class="mb-3"
          />

          <v-text-field
            v-model="phone"
            label="Phone"
            variant="outlined"
            prepend-inner-icon="mdi-phone-outline"
            class="mb-3"
          />

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            class="mb-4"
          />

          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            :loading="authStore.loading"
            @click="register"
          >
            Create Account
          </v-btn>

          <div class="text-center mt-6">
            <span class="text-body-2 text-medium-emphasis">
              Already have an account?
            </span>

            <v-btn
              variant="text"
              color="primary"
              to="/login"
            >
              Login
            </v-btn>
          </div>
        </v-card>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  font-size: 24px;
  font-weight: 700;
}

.brand-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-primary));
  color: white;
}
</style>
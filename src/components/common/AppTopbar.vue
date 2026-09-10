<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const authStore = useAuthStore()

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/transfer': 'Send Money',
  '/transactions': 'Transactions',
  '/wallet': 'Wallet',
  '/qr': 'QR Pay',
  '/settings': 'Settings',
}

const pageTitle = computed(() => {
  return pageTitles[route.path] ?? 'PayFlow'
})

const userName = computed(() => {
  return authStore.user?.fullName ?? 'User'
})
</script>

<template>
  <header class="app-topbar">
    <div>
      <h1 class="page-title">
        {{ pageTitle }}
      </h1>

      <p class="page-subtitle">
        Welcome back, {{ userName }} 👋
      </p>
    </div>

    <div class="topbar-actions">
      <v-btn
        icon="mdi-magnify"
        variant="text"
        size="small"
      />

      <v-btn
        icon="mdi-bell-outline"
        variant="text"
        size="small"
      >
        <v-badge
          color="error"
          dot
          floating
        />
      </v-btn>

      <v-divider
        vertical
        class="mx-2"
      />

      <v-avatar size="38">
        <v-img src="https://i.pravatar.cc/100?img=47" />
      </v-avatar>
    </div>
  </header>
</template>

<style scoped>
.app-topbar {
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e9eaf0;
}

.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.page-subtitle {
  margin: 3px 0 0;
  font-size: 13px;
  color: #9ca3af;
}

.topbar-actions {
  display: flex;
  align-items: center;
}
</style>
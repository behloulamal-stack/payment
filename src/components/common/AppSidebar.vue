<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: '/dashboard',
  },
  {
    title: 'Send Money',
    icon: 'mdi-send-outline',
    to: '/transfer',
  },
  {
    title: 'Transactions',
    icon: 'mdi-swap-horizontal',
    to: '/transactions',
  },
  {
    title: 'Wallet',
    icon: 'mdi-wallet-outline',
    to: '/wallet',
  },
  {
    title: 'QR Pay',
    icon: 'mdi-qrcode',
    to: '/qr',
  },
]

const bottomItems = [
  {
    title: 'Settings',
    icon: 'mdi-cog-outline',
    to: '/settings',
  },
]

const currentRoute = computed(() => route.path)

const userName = computed(() => {
  return authStore.user?.fullName ?? 'User'
})

const userEmail = computed(() => {
  return authStore.user?.email ?? ''
})

function navigate(to: string) {
  router.push(to)
}

async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="app-sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="logo-icon">
        <v-icon
          icon="mdi-wallet-outline"
          size="22"
        />
      </div>

      <span class="logo-text">
        PayFlow
      </span>
    </div>

    <!-- Main Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <span class="section-title">
          MENU
        </span>

        <v-list
          class="nav-list"
          bg-color="transparent"
          density="comfortable"
        >
          <v-list-item
            v-for="item in menuItems"
            :key="item.to"
            :active="currentRoute === item.to"
            :prepend-icon="item.icon"
            :title="item.title"
            rounded="lg"
            @click="navigate(item.to)"
          />
        </v-list>
      </div>
    </nav>

    <!-- Bottom -->
    <div class="sidebar-bottom">
      <v-list
        class="nav-list"
        bg-color="transparent"
        density="comfortable"
      >
        <v-list-item
          v-for="item in bottomItems"
          :key="item.to"
          :active="currentRoute === item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          @click="navigate(item.to)"
        />
      </v-list>

      <div class="user-mini-card">
        <v-avatar size="38">
          <v-img src="https://i.pravatar.cc/100?img=47" />
        </v-avatar>

        <div class="user-info">
          <span class="user-name">
            {{ userName }}
          </span>

          <span class="user-email">
            {{ userEmail }}
          </span>
        </div>

        <v-btn
          icon="mdi-logout"
          variant="text"
          size="small"
          title="Logout"
          @click="logout"
        />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-right: 1px solid #e9eaf0;
  padding: 24px 16px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  margin-bottom: 40px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-primary));
  color: white;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.sidebar-nav {
  flex: 1;
}

.section-title {
  display: block;
  padding: 0 12px 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

.nav-list {
  padding: 0;
}

:deep(.v-list-item) {
  margin-bottom: 4px;
  color: #6b7280;
}

:deep(.v-list-item--active) {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.sidebar-bottom {
  margin-top: auto;
}

.user-mini-card {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 12px 8px;
  border-top: 1px solid #e9eaf0;
}

.user-info {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

.user-email {
  font-size: 11px;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
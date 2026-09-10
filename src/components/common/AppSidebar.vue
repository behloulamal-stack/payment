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

      <!-- User -->
      <div class="user-mini-card">

        <v-avatar size="38">
          <v-img
            src="https://i.pravatar.cc/100?img=47"
          />
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
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  flex-shrink: 0;

  background: #ffffff;
  border-right: 1px solid #e9eaf0;

  padding: 24px 16px;
}

/* =========================
   Logo
========================= */

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

  flex-shrink: 0;

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

/* =========================
   Navigation
========================= */

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

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

:deep(.v-list-item:hover) {
  background: #f7f7fa;
}

:deep(.v-list-item--active) {
  background: rgba(var(--v-theme-primary), 0.1);

  color: rgb(var(--v-theme-primary));
}

/* =========================
   Bottom
========================= */

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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 11px;
  color: #9ca3af;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =========================
   Tablet
========================= */

@media (max-width: 960px) {
  .app-sidebar {
    width: 210px;
    padding: 20px 12px;
  }

  .sidebar-header {
    margin-bottom: 28px;
  }

  .logo-text {
    font-size: 18px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 600px) {
  .app-sidebar {
    width: 72px;

    padding: 20px 10px;

    align-items: center;
  }

  /* Logo */

  .sidebar-header {
    padding: 0;
    margin-bottom: 28px;

    justify-content: center;
  }

  .logo-icon {
    width: 42px;
    height: 42px;
  }

  .logo-text {
    display: none;
  }

  /* Section */

  .section-title {
    display: none;
  }

  /* Navigation */

  .nav-list {
    width: 100%;
  }

  :deep(.v-list-item) {
    min-height: 46px;

    justify-content: center;

    padding: 0 !important;
  }

  :deep(.v-list-item__prepend) {
    margin-inline-end: 0 !important;
  }

  :deep(.v-list-item__content) {
    display: none;
  }

  :deep(.v-list-item__prepend) {
    margin-inline-start: 0;
  }

  /* Bottom */

  .sidebar-bottom {
    width: 100%;
  }

  .user-mini-card {
    padding: 12px 0;

    justify-content: center;
  }

  .user-mini-card .v-avatar {
    display: none;
  }

  .user-info {
    display: none;
  }

  .user-mini-card .v-btn {
    margin: 0;
  }
}
</style>
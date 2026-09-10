<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const actions = [
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

function navigate(to: string) {
  router.push(to)
}
</script>

<template>
  <div>
    <div class="section-header">
      <h2>Quick Actions</h2>
      <span>Manage your money</span>
    </div>

    <div class="actions-grid">
      <v-card
        v-for="action in actions"
        :key="action.to"
        class="action-card"
        rounded="xl"
        @click="navigate(action.to)"
      >
        <div class="action-icon">
          <v-icon :icon="action.icon" size="22" />
        </div>

        <span>{{ action.title }}</span>

        <v-icon
          icon="mdi-chevron-right"
          size="18"
          class="action-arrow"
        />
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-header h2 {
  font-size: 17px;
  color: #111827;
}

.section-header span {
  font-size: 12px;
  color: #9ca3af;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.action-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  cursor: pointer;
  transition: 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.action-card span {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.action-arrow {
  margin-left: auto;
  color: #9ca3af;
}
</style>
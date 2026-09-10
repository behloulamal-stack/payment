
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
      <div>
        <h2>
          Quick Actions
        </h2>

        <span>
          Manage your money
        </span>
      </div>
    </div>

    <div class="actions-grid">
      <v-card
        v-for="action in actions"
        :key="action.to"
        class="action-card"
        rounded="xl"
        elevation="0"
        @click="navigate(action.to)"
      >
        <div class="action-icon">
          <v-icon
            :icon="action.icon"
            size="22"
          />
        </div>

        <span class="action-title">
          {{ action.title }}
        </span>

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
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.section-header span {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: #9ca3af;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.action-card {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  cursor: pointer;
  border: 1px solid #eef0f4;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06) !important;
}

.action-icon {
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.action-title {
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-arrow {
  flex: 0 0 auto;
  margin-left: auto;
  color: #9ca3af;
}

/* Tablet */

@media (max-width: 1000px) {
  .actions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile */

@media (max-width: 600px) {
  .section-header {
    margin-bottom: 12px;
  }

  .section-header h2 {
    font-size: 16px;
  }

  .actions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .action-card {
    min-height: 76px;
    padding: 14px;
    gap: 9px;
  }

  .action-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .action-title {
    font-size: 12px;
  }

  .action-arrow {
    display: none;
  }
}
</style>


<script setup lang="ts">
import type { Wallet } from '@/types/wallet'

defineProps<{
  wallet: Wallet
}>()
</script>

<template>
  <div class="stats-grid">

    <!-- Income -->
    <v-card
      class="stat-card"
      rounded="xl"
      elevation="0"
    >
      <div class="stat-icon income">
        <v-icon icon="mdi-arrow-down-left" />
      </div>

      <div class="stat-content">
        <span class="stat-label">
          Income
        </span>

        <strong>
          +{{ wallet.income.toLocaleString() }}
          {{ wallet.currency }}
        </strong>
      </div>
    </v-card>

    <!-- Expenses -->
    <v-card
      class="stat-card"
      rounded="xl"
      elevation="0"
    >
      <div class="stat-icon expense">
        <v-icon icon="mdi-arrow-up-right" />
      </div>

      <div class="stat-content">
        <span class="stat-label">
          Expenses
        </span>

        <strong>
          -{{ wallet.expense.toLocaleString() }}
          {{ wallet.currency }}
        </strong>
      </div>
    </v-card>

    <!-- Transactions -->
    <v-card
      class="stat-card"
      rounded="xl"
      elevation="0"
    >
      <div class="stat-icon transactions">
        <v-icon icon="mdi-swap-horizontal" />
      </div>

      <div class="stat-content">
        <span class="stat-label">
          Transactions
        </span>

        <strong>
          24
        </strong>
      </div>
    </v-card>

  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border: 1px solid #eef0f4;
}

.stat-icon {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  min-width: 0;
}

.income {
  color: #16a34a;
  background: #ecfdf5;
}

.expense {
  color: #dc2626;
  background: #fef2f2;
}

.transactions {
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.stat-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.stat-card strong {
  display: block;
  overflow: hidden;
  font-size: 15px;
  color: #111827;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Tablet */

@media (max-width: 800px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-card:last-child {
    grid-column: 1 / -1;
  }
}

/* Mobile */

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stat-card:last-child {
    grid-column: auto;
  }

  .stat-card {
    padding: 16px;
    gap: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-card strong {
    font-size: 14px;
  }
}
</style>

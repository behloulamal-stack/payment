<script setup lang="ts">
import type { Wallet } from '@/types/wallet'

defineProps<{
  wallet: Wallet
}>()
</script>

<template>
  <div class="stats-grid">
    <v-card class="stat-card" rounded="xl">
      <div class="stat-icon income">
        <v-icon icon="mdi-arrow-down-left" />
      </div>

      <div>
        <span class="stat-label">Income</span>
        <strong>
          +{{ wallet.income.toLocaleString() }} {{ wallet.currency }}
        </strong>
      </div>
    </v-card>

    <v-card class="stat-card" rounded="xl">
      <div class="stat-icon expense">
        <v-icon icon="mdi-arrow-up-right" />
      </div>

      <div>
        <span class="stat-label">Expenses</span>
        <strong>
          -{{ wallet.expense.toLocaleString() }} {{ wallet.currency }}
        </strong>
      </div>
    </v-card>

    <v-card class="stat-card" rounded="xl">
      <div class="stat-icon transactions">
        <v-icon icon="mdi-swap-horizontal" />
      </div>

      <div>
        <span class="stat-label">Transactions</span>
        <strong>24</strong>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.stat-card strong {
  font-size: 15px;
  color: #111827;
}
</style>
<script setup lang="ts">
import type { Transaction } from '@/types/transaction'

defineProps<{
  transactions: Transaction[]
}>()

function formatAmount(transaction: Transaction) {
  const sign = transaction.type === 'income' ? '+' : '-'

  return `${sign}${transaction.amount.toLocaleString()} ${transaction.currency}`
}
</script>

<template>
  <v-card rounded="xl" class="transactions-card">
    <div class="transactions-header">
      <div>
        <h2>Recent Transactions</h2>
        <span>Your latest activity</span>
      </div>

      <v-btn
        variant="text"
        color="primary"
        to="/transactions"
        append-icon="mdi-arrow-right"
      >
        View all
      </v-btn>
    </div>

    <v-divider />

    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="transaction-row"
    >
      <div
        class="transaction-icon"
        :class="transaction.type"
      >
        <v-icon
          :icon="
            transaction.type === 'income'
              ? 'mdi-arrow-down-left'
              : 'mdi-arrow-up-right'
          "
        />
      </div>

      <div class="transaction-info">
        <strong>
          {{
            transaction.type === 'income'
              ? transaction.sender
              : transaction.recipient
          }}
        </strong>

        <span>{{ transaction.description }}</span>
      </div>

      <div class="transaction-right">
        <strong :class="transaction.type">
          {{ formatAmount(transaction) }}
        </strong>

        <span>{{ transaction.date }}</span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.transactions-card {
  overflow: hidden;
}

.transactions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px;
}

.transactions-header h2 {
  margin: 0;
  font-size: 17px;
  color: #111827;
}

.transactions-header span {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: #9ca3af;
}

.transaction-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 22px;
  border-bottom: 1px solid #f0f1f5;
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-icon.income {
  color: #16a34a;
  background: #ecfdf5;
}

.transaction-icon.expense {
  color: #dc2626;
  background: #fef2f2;
}

.transaction-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transaction-info strong {
  font-size: 13px;
  color: #374151;
}

.transaction-info span,
.transaction-right span {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 3px;
}

.transaction-right {
  text-align: right;
  display: flex;
  flex-direction: column;
}

.transaction-right strong {
  font-size: 13px;
}

.transaction-right strong.income {
  color: #16a34a;
}

.transaction-right strong.expense {
  color: #dc2626;
}
</style>
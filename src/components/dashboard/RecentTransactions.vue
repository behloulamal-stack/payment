
<script setup lang="ts">
import type { Transaction } from '@/types/transaction'

defineProps<{
  transactions: Transaction[]
}>()

function formatAmount(transaction: Transaction) {
  const sign =
    transaction.type === 'income'
      ? '+'
      : '-'

  return `${sign}${transaction.amount.toLocaleString()} ${transaction.currency}`
}
</script>

<template>
  <v-card
    rounded="xl"
    class="transactions-card"
    elevation="0"
  >
    <!-- Header -->
    <div class="transactions-header">
      <div>
        <h2>
          Recent Transactions
        </h2>

        <span>
          Your latest activity
        </span>
      </div>

      <v-btn
        variant="text"
        color="primary"
        to="/transactions"
        append-icon="mdi-arrow-right"
        size="small"
      >
        View all
      </v-btn>
    </div>

    <v-divider />

    <!-- Transactions -->
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
          size="19"
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

        <span>
          {{ transaction.description }}
        </span>
      </div>

      <div class="transaction-right">
        <strong :class="transaction.type">
          {{ formatAmount(transaction) }}
        </strong>

        <span>
          {{ transaction.date }}
        </span>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="transactions.length === 0"
      class="empty-state"
    >
      <v-icon
        icon="mdi-swap-horizontal"
        size="32"
      />

      <span>
        No transactions yet
      </span>
    </div>
  </v-card>
</template>

<style scoped>
.transactions-card {
  overflow: hidden;
  border: 1px solid #eef0f4;
}

.transactions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 22px;
}

.transactions-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
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
  min-width: 0;
  padding: 16px 22px;
  border-bottom: 1px solid #f0f1f5;
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-icon {
  flex: 0 0 auto;
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
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transaction-info strong {
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-info span {
  overflow: hidden;
  margin-top: 3px;
  font-size: 11px;
  color: #9ca3af;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-right {
  flex: 0 0 auto;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.transaction-right strong {
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-right strong.income {
  color: #16a34a;
}

.transaction-right strong.expense {
  color: #dc2626;
}

.transaction-right span {
  margin-top: 3px;
  font-size: 11px;
  color: #9ca3af;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 13px;
}

/* Mobile */

@media (max-width: 600px) {
  .transactions-header {
    padding: 16px;
  }

  .transactions-header h2 {
    font-size: 15px;
  }

  .transactions-header span {
    font-size: 11px;
  }

  .transaction-row {
    gap: 10px;
    padding: 14px 16px;
  }

  .transaction-icon {
    width: 36px;
    height: 36px;
  }

  .transaction-info strong {
    font-size: 12px;
  }

  .transaction-info span {
    font-size: 10px;
  }

  .transaction-right {
    min-width: 82px;
  }

  .transaction-right strong {
    font-size: 11px;
  }

  .transaction-right span {
    font-size: 10px;
  }
}
</style>

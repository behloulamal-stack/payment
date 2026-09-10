<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTransactionStore } from '@/stores/transaction.store'
import type { Transaction } from '@/types/transaction'

const route = useRoute()
const router = useRouter()

const transactionStore = useTransactionStore()

const transaction = computed<Transaction | undefined>(() => {
  const id = String(route.params.id)

  return transactionStore.transactions.find(
    (item) => item.id === id,
  )
})

onMounted(async () => {
  await transactionStore.fetchRecentTransactions(100)
})

const isIncome = computed(() => {
  return transaction.value?.type === 'income'
})

const counterparty = computed(() => {
  if (!transaction.value) {
    return 'Unknown'
  }

  if (transaction.value.type === 'income') {
    return transaction.value.sender || 'Unknown'
  }

  return transaction.value.recipient || 'Unknown'
})

const formattedAmount = computed(() => {
  if (!transaction.value) {
    return ''
  }

  const sign =
    transaction.value.type === 'income'
      ? '+'
      : '-'

  return `${sign}${transaction.value.amount.toLocaleString()} ${transaction.value.currency}`
})

const typeIcon = computed(() => {
  return isIncome.value
    ? 'mdi-arrow-down-left'
    : 'mdi-arrow-up-right'
})

const statusColor = computed(() => {
  switch (transaction.value?.status) {
    case 'completed':
      return 'success'

    case 'pending':
      return 'warning'

    case 'failed':
      return 'error'

    default:
      return 'grey'
  }
})

const statusIcon = computed(() => {
  switch (transaction.value?.status) {
    case 'completed':
      return 'mdi-check-circle-outline'

    case 'pending':
      return 'mdi-clock-outline'

    case 'failed':
      return 'mdi-close-circle-outline'

    default:
      return 'mdi-help-circle-outline'
  }
})

function goBack() {
  router.push('/transactions')
}

function sendMoney() {
  router.push('/transfer')
}
</script>

<template>
  <div class="details-page">

    <!-- Back -->
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="back-button"
      @click="goBack"
    >
      Back to Transactions
    </v-btn>

    <!-- Loading -->
    <div
      v-if="transactionStore.loading && !transaction"
      class="state-container"
    >
      <v-progress-circular
        color="primary"
        indeterminate
      />

      <span>Loading transaction...</span>
    </div>

    <!-- Not found -->
    <v-card
      v-else-if="!transaction"
      rounded="xl"
      class="not-found-card"
    >
      <div class="not-found-icon">
        <v-icon
          icon="mdi-file-alert-outline"
          size="32"
        />
      </div>

      <h2>Transaction not found</h2>

      <p>
        This transaction does not exist.
      </p>

      <v-btn
        color="primary"
        @click="goBack"
      >
        Back to Transactions
      </v-btn>
    </v-card>

    <!-- Details -->
    <template v-else>

      <!-- Header -->
      <div class="details-header">

        <div class="header-text">
          <h1>Transaction Details</h1>

          <p>
            Complete information about this transaction.
          </p>
        </div>

        <v-chip
          :color="statusColor"
          variant="tonal"
          class="status-chip"
        >
          <v-icon
            :icon="statusIcon"
            start
          />

          {{ transaction.status }}
        </v-chip>

      </div>

      <!-- Main Card -->
      <v-card
        rounded="xl"
        class="main-card"
      >

        <!-- Amount -->
        <div class="amount-section">

          <div
            class="transaction-icon"
            :class="transaction.type"
          >
            <v-icon
              :icon="typeIcon"
              size="28"
            />
          </div>

          <span class="type-label">
            {{ isIncome ? 'Money Received' : 'Money Sent' }}
          </span>

          <h2
            class="amount"
            :class="transaction.type"
          >
            {{ formattedAmount }}
          </h2>

          <span class="date">
            {{ transaction.date }}
          </span>

        </div>

        <v-divider />

        <!-- Information -->
        <div class="details-list">

          <!-- From / To -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-account-outline" />

              <span>
                {{ isIncome ? 'From' : 'To' }}
              </span>
            </div>

            <strong>
              {{ counterparty }}
            </strong>
          </div>

          <!-- Description -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-text-box-outline" />

              <span>
                Description
              </span>
            </div>

            <strong>
              {{ transaction.description }}
            </strong>
          </div>

          <!-- Category -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-shape-outline" />

              <span>
                Category
              </span>
            </div>

            <strong>
              {{ transaction.category || 'Transfer' }}
            </strong>
          </div>

          <!-- Date -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-calendar-outline" />

              <span>
                Date
              </span>
            </div>

            <strong>
              {{ transaction.date }}
            </strong>
          </div>

          <!-- Currency -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-cash-outline" />

              <span>
                Currency
              </span>
            </div>

            <strong>
              {{ transaction.currency }}
            </strong>
          </div>

          <!-- Transaction ID -->
          <div class="detail-row">
            <div class="detail-label">
              <v-icon icon="mdi-identifier" />

              <span>
                Transaction ID
              </span>
            </div>

            <strong class="transaction-id">
              {{ transaction.id }}
            </strong>
          </div>

        </div>
      </v-card>

      <!-- Actions -->
      <div class="actions">

        <v-btn
          variant="outlined"
          size="large"
          prepend-icon="mdi-arrow-left"
          @click="goBack"
        >
          Back
        </v-btn>

        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-send-outline"
          @click="sendMoney"
        >
          Send Money
        </v-btn>

      </div>

    </template>
  </div>
</template>

<style scoped>
.details-page {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

/* =========================
   Back
========================= */

.back-button {
  margin-bottom: 20px;
  color: #6b7280;
}

/* =========================
   Header
========================= */

.details-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.header-text {
  min-width: 0;
}

.details-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.details-header p {
  margin: 6px 0 0;
  font-size: 13px;
  color: #9ca3af;
}

.status-chip {
  flex-shrink: 0;
}

/* =========================
   Main Card
========================= */

.main-card {
  overflow: hidden;
}

/* =========================
   Amount
========================= */

.amount-section {
  padding: 40px 24px;
  text-align: center;
}

.transaction-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;
}

.transaction-icon.income {
  color: #16a34a;
  background: #ecfdf5;
}

.transaction-icon.expense {
  color: #dc2626;
  background: #fef2f2;
}

.type-label {
  display: block;
  font-size: 12px;
  color: #9ca3af;
}

.amount {
  margin: 8px 0 6px;
  font-size: 32px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.amount.income {
  color: #16a34a;
}

.amount.expense {
  color: #dc2626;
}

.date {
  font-size: 12px;
  color: #9ca3af;
}

/* =========================
   Details
========================= */

.details-list {
  padding: 10px 28px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;
  padding: 18px 0;

  border-bottom: 1px solid #f0f1f5;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;

  color: #9ca3af;
  font-size: 13px;
}

.detail-label .v-icon {
  font-size: 19px;
}

.detail-row strong {
  max-width: 55%;

  text-align: right;

  font-size: 13px;
  color: #374151;

  overflow-wrap: anywhere;
}

.transaction-id {
  font-family: monospace;
  font-size: 12px !important;
}

/* =========================
   Actions
========================= */

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* =========================
   States
========================= */

.state-container {
  min-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  color: #9ca3af;
  font-size: 13px;
}

.not-found-card {
  padding: 50px 30px;
  text-align: center;
}

.not-found-icon {
  width: 70px;
  height: 70px;

  margin: 0 auto 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.not-found-card h2 {
  margin-bottom: 8px;
  color: #111827;
}

.not-found-card p {
  margin-bottom: 24px;
  color: #9ca3af;
  font-size: 13px;
}

/* =========================
   Tablet
========================= */

@media (max-width: 700px) {
  .details-header {
    align-items: flex-start;
  }

  .details-header h1 {
    font-size: 21px;
  }

  .details-header p {
    font-size: 12px;
  }

  .details-list {
    padding: 8px 20px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 600px) {
  .back-button {
    margin-bottom: 14px;
  }

  .details-header {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 18px;
  }

  .status-chip {
    align-self: flex-start;
  }

  .amount-section {
    padding: 30px 16px;
  }

  .transaction-icon {
    width: 58px;
    height: 58px;
    border-radius: 16px;
  }

  .amount {
    font-size: 25px;
  }

  .details-list {
    padding: 6px 16px;
  }

  .detail-row {
    align-items: flex-start;
    gap: 14px;
    padding: 16px 0;
  }

  .detail-label {
    gap: 7px;
    font-size: 12px;
  }

  .detail-label .v-icon {
    font-size: 17px;
  }

  .detail-row strong {
    max-width: 52%;
    font-size: 12px;
  }

  .transaction-id {
    font-size: 10px !important;
  }

  .actions {
    flex-direction: column-reverse;
    gap: 8px;
  }

  .actions .v-btn {
    width: 100%;
  }

  .not-found-card {
    padding: 40px 20px;
  }
}
</style>
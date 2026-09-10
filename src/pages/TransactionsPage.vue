<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useTransactionStore } from '@/stores/transaction.store'
import type {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/types/transaction'

const router = useRouter()
const transactionStore = useTransactionStore()

const search = ref('')
const typeFilter = ref<'all' | TransactionType>('all')
const statusFilter = ref<'all' | TransactionStatus>('all')

onMounted(() => {
  transactionStore.fetchRecentTransactions(100)
})

const filteredTransactions = computed(() => {
  const query = search.value.toLowerCase().trim()

  return transactionStore.transactions.filter((transaction) => {
    const matchesSearch =
      !query ||
      transaction.id.toLowerCase().includes(query) ||
      transaction.description.toLowerCase().includes(query) ||
      transaction.recipient?.toLowerCase().includes(query) ||
      transaction.sender?.toLowerCase().includes(query)

    const matchesType =
      typeFilter.value === 'all' ||
      transaction.type === typeFilter.value

    const matchesStatus =
      statusFilter.value === 'all' ||
      transaction.status === statusFilter.value

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    )
  })
})

function formatAmount(transaction: Transaction) {
  const sign =
    transaction.type === 'income' ? '+' : '-'

  return `${sign}${transaction.amount.toLocaleString()} ${transaction.currency}`
}

function getCounterparty(transaction: Transaction) {
  return transaction.type === 'income'
    ? transaction.sender
    : transaction.recipient
}

function getTypeIcon(transaction: Transaction) {
  return transaction.type === 'income'
    ? 'mdi-arrow-down-left'
    : 'mdi-arrow-up-right'
}

function getStatusColor(status: TransactionStatus) {
  switch (status) {
    case 'completed':
      return 'success'

    case 'pending':
      return 'warning'

    case 'failed':
      return 'error'

    default:
      return 'grey'
  }
}

function openTransaction(transaction: Transaction) {
  router.push({
    name: 'transaction-details',
    params: {
      id: transaction.id,
    },
  })
}
</script>

<template>
  <div class="transactions-page">

    <!-- HEADER -->
    <div class="page-header">
      <div class="header-content">
        <h2>Transactions</h2>

        <p>
          View and manage your transaction history.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-send-outline"
        to="/transfer"
        class="send-button"
      >
        Send Money
      </v-btn>
    </div>

    <!-- FILTERS -->
    <v-card
      rounded="xl"
      class="filters-card"
    >
      <div class="filters">

        <!-- SEARCH -->
        <v-text-field
          v-model="search"
          placeholder="Search transactions..."
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="search-field"
        />

        <!-- TYPE -->
        <v-select
          v-model="typeFilter"
          :items="[
            { title: 'All Types', value: 'all' },
            { title: 'Income', value: 'income' },
            { title: 'Expenses', value: 'expense' },
          ]"
          item-title="title"
          item-value="value"
          hide-details
          class="filter-field"
        />

        <!-- STATUS -->
        <v-select
          v-model="statusFilter"
          :items="[
            { title: 'All Status', value: 'all' },
            { title: 'Completed', value: 'completed' },
            { title: 'Pending', value: 'pending' },
            { title: 'Failed', value: 'failed' },
          ]"
          item-title="title"
          item-value="value"
          hide-details
          class="filter-field"
        />

      </div>
    </v-card>

    <!-- TRANSACTIONS -->
    <v-card
      rounded="xl"
      class="transactions-card"
    >

      <!-- CARD HEADER -->
      <div class="table-header">

        <div class="table-title">
          <h3>Transaction History</h3>

          <span>
            {{ filteredTransactions.length }} transactions
          </span>
        </div>

      </div>

      <v-divider />

      <!-- LOADING -->
      <div
        v-if="transactionStore.loading"
        class="loading-state"
      >
        <v-progress-circular
          color="primary"
          indeterminate
        />

        <span>
          Loading transactions...
        </span>
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="filteredTransactions.length === 0"
        class="empty-state"
      >
        <div class="empty-icon">
          <v-icon
            icon="mdi-file-search-outline"
            size="30"
          />
        </div>

        <h3>
          No transactions found
        </h3>

        <p>
          Try changing your search or filters.
        </p>
      </div>

      <!-- LIST -->
      <div
        v-else
        class="transaction-list"
      >

        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          class="transaction-row"
          @click="openTransaction(transaction)"
        >

          <!-- ICON -->
          <div
            class="transaction-icon"
            :class="transaction.type"
          >
            <v-icon
              :icon="getTypeIcon(transaction)"
              size="20"
            />
          </div>

          <!-- INFO -->
          <div class="transaction-info">

            <strong>
              {{ getCounterparty(transaction) || 'Unknown' }}
            </strong>

            <span>
              {{ transaction.description }}
            </span>

          </div>

          <!-- CATEGORY -->
          <div class="transaction-category">
            <span>
              {{ transaction.category || 'Transfer' }}
            </span>
          </div>

          <!-- DATE -->
          <div class="transaction-date">
            {{ transaction.date }}
          </div>

          <!-- STATUS -->
          <div class="transaction-status">
            <v-chip
              :color="getStatusColor(transaction.status)"
              size="small"
              variant="tonal"
            >
              {{ transaction.status }}
            </v-chip>
          </div>

          <!-- AMOUNT -->
          <div
            class="transaction-amount"
            :class="transaction.type"
          >
            {{ formatAmount(transaction) }}
          </div>

          <!-- ARROW -->
          <v-icon
            icon="mdi-chevron-right"
            size="18"
            class="row-arrow"
          />

        </div>

      </div>

    </v-card>

  </div>
</template>

<style scoped>
/* ========================================
   PAGE
======================================== */

.transactions-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* ========================================
   HEADER
======================================== */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;
  margin-bottom: 24px;
}

.header-content {
  min-width: 0;
}

.page-header h2 {
  margin: 0;

  font-size: 24px;
  font-weight: 700;

  color: #111827;
}

.page-header p {
  margin: 6px 0 0;

  font-size: 13px;
  color: #9ca3af;
}

.send-button {
  flex-shrink: 0;
}

/* ========================================
   FILTERS
======================================== */

.filters-card {
  padding: 18px;
  margin-bottom: 20px;
}

.filters {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    200px
    200px;

  gap: 12px;
}

.search-field,
.filter-field {
  min-width: 0;
}

/* ========================================
   TRANSACTIONS CARD
======================================== */

.transactions-card {
  width: 100%;
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;

  padding: 22px;
}

.table-title h3 {
  margin: 0;

  font-size: 16px;
  font-weight: 600;

  color: #111827;
}

.table-title span {
  display: block;

  margin-top: 4px;

  font-size: 12px;
  color: #9ca3af;
}

/* ========================================
   TRANSACTION LIST
======================================== */

.transaction-list {
  width: 100%;
}

.transaction-row {
  display: grid;

  grid-template-columns:
    44px
    minmax(180px, 1fr)
    120px
    110px
    100px
    150px
    24px;

  align-items: center;

  gap: 16px;

  padding: 16px 22px;

  border-bottom: 1px solid #f0f1f5;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-row:hover {
  background: #fafaff;
}

/* ========================================
   ICON
======================================== */

.transaction-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
}

.transaction-icon.income {
  color: #16a34a;
  background: #ecfdf5;
}

.transaction-icon.expense {
  color: #dc2626;
  background: #fef2f2;
}

/* ========================================
   INFO
======================================== */

.transaction-info {
  min-width: 0;

  display: flex;
  flex-direction: column;
}

.transaction-info strong {
  min-width: 0;

  font-size: 13px;
  font-weight: 600;

  color: #374151;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-info span {
  min-width: 0;

  margin-top: 4px;

  font-size: 11px;

  color: #9ca3af;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================
   CATEGORY
======================================== */

.transaction-category {
  min-width: 0;
}

.transaction-category span {
  font-size: 12px;
  color: #6b7280;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================
   DATE
======================================== */

.transaction-date {
  font-size: 12px;
  color: #6b7280;

  white-space: nowrap;
}

/* ========================================
   STATUS
======================================== */

.transaction-status {
  display: flex;
  min-width: 0;
}

/* ========================================
   AMOUNT
======================================== */

.transaction-amount {
  min-width: 0;

  text-align: right;

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
}

.transaction-amount.income {
  color: #16a34a;
}

.transaction-amount.expense {
  color: #dc2626;
}

/* ========================================
   ARROW
======================================== */

.row-arrow {
  color: #c4c7d0;

  flex-shrink: 0;
}

/* ========================================
   LOADING / EMPTY
======================================== */

.loading-state,
.empty-state {
  min-height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;
}

.loading-state span {
  font-size: 13px;
  color: #9ca3af;
}

.empty-icon {
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.empty-state h3 {
  margin: 4px 0 0;

  font-size: 16px;

  color: #374151;
}

.empty-state p {
  margin: 0;

  font-size: 12px;

  color: #9ca3af;
}

/* ========================================
   TABLET
======================================== */

@media (max-width: 1100px) {
  .transaction-row {
    grid-template-columns:
      44px
      minmax(150px, 1fr)
      100px
      120px
      24px;
  }

  .transaction-category,
  .transaction-date {
    display: none;
  }
}

/* ========================================
   SMALL TABLET
======================================== */

@media (max-width: 800px) {
  .filters {
    grid-template-columns: 1fr 1fr;
  }

  .search-field {
    grid-column: 1 / -1;
  }

  .transaction-row {
    padding: 15px 18px;
  }
}

/* ========================================
   MOBILE
======================================== */

@media (max-width: 600px) {

  /* Header */

  .page-header {
    align-items: stretch;

    flex-direction: column;

    gap: 16px;

    margin-bottom: 18px;
  }

  .page-header h2 {
    font-size: 21px;
  }

  .page-header p {
    font-size: 12px;
  }

  .send-button {
    width: 100%;
  }

  /* Filters */

  .filters-card {
    padding: 12px;

    margin-bottom: 16px;
  }

  .filters {
    grid-template-columns: 1fr;

    gap: 10px;
  }

  .search-field {
    grid-column: auto;
  }

  /* Card header */

  .table-header {
    padding: 18px 16px;
  }

  .table-title h3 {
    font-size: 15px;
  }

  /* Transaction */

  .transaction-row {
    grid-template-columns:
      42px
      minmax(0, 1fr)
      auto
      18px;

    gap: 10px;

    padding: 14px 16px;
  }

  .transaction-icon {
    width: 40px;
    height: 40px;
  }

  .transaction-info strong {
    font-size: 12px;
  }

  .transaction-info span {
    font-size: 10px;
  }

  /* Hide information that doesn't fit mobile */

  .transaction-category,
  .transaction-date,
  .transaction-status {
    display: none;
  }

  .transaction-amount {
    font-size: 11px;
  }

  .row-arrow {
    font-size: 17px !important;
  }

  /* Empty / Loading */

  .loading-state,
  .empty-state {
    min-height: 240px;

    padding: 20px;
  }
}

/* ========================================
   VERY SMALL MOBILE
======================================== */

@media (max-width: 380px) {
  .transaction-row {
    grid-template-columns:
      38px
      minmax(0, 1fr)
      18px;

    gap: 8px;
  }

  .transaction-icon {
    width: 36px;
    height: 36px;
  }

  .transaction-amount {
    display: none;
  }

  .transaction-info strong {
    font-size: 11px;
  }

  .transaction-info span {
    font-size: 9px;
  }
}
</style>
<script setup lang="ts">
import { onMounted } from 'vue'

import BalanceCard from '@/components/dashboard/BalanceCard.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import RecentTransactions from '@/components/dashboard/RecentTransactions.vue'

import { useWalletStore } from '@/stores/wallet.store'
import { useTransactionStore } from '@/stores/transaction.store'

const walletStore = useWalletStore()
const transactionStore = useTransactionStore()

onMounted(async () => {
  await Promise.all([
    walletStore.fetchWallet(),
    transactionStore.fetchRecentTransactions(5),
  ])
})

function handleTopUp() {
  console.log('Top up')
}

function handleWithdraw() {
  console.log('Withdraw')
}
</script>

<template>
  <div class="dashboard-page">
    <template v-if="walletStore.wallet">
      <BalanceCard
        :wallet="walletStore.wallet"
        @top-up="handleTopUp"
        @withdraw="handleWithdraw"
      />

      <StatsCards
        :wallet="walletStore.wallet"
        class="mt-5"
      />
    </template>

    <div v-else class="loading-container">
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </div>

    <QuickActions class="mt-6" />

    <RecentTransactions
      :transactions="transactionStore.transactions"
      class="mt-6"
    />
  </div>
</template>

<style scoped>
.dashboard-page {
  max-width: 1400px;
  margin: 0 auto;
}

.loading-container {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
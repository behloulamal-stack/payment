<script setup lang="ts">
import { onMounted } from 'vue'

import { useWalletStore } from '@/stores/wallet.store'

const walletStore = useWalletStore()

onMounted(() => {
  walletStore.fetchWallet()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        Wallet
      </h1>

      <p class="text-body-2 text-medium-emphasis">
        Manage your balance and money
      </p>
    </div>

    <v-row v-if="walletStore.wallet">
      <!-- Balance -->
      <v-col cols="12">
        <v-card
          rounded="xl"
          class="pa-6"
        >
          <div class="text-body-2 text-medium-emphasis">
            Current Balance
          </div>

          <div class="text-h3 font-weight-bold mt-2">
            {{ walletStore.wallet.balance.toLocaleString() }}
            {{ walletStore.wallet.currency }}
          </div>

          <div class="text-body-2 text-medium-emphasis mt-3">
            Wallet ID:
            {{ walletStore.wallet.id }}
          </div>
        </v-card>
      </v-col>

      <!-- Income -->
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          rounded="xl"
          class="pa-5"
        >
          <div class="text-body-2 text-medium-emphasis">
            Total Income
          </div>

          <div class="text-h5 font-weight-bold mt-2">
            {{ walletStore.wallet.income.toLocaleString() }}
            {{ walletStore.wallet.currency }}
          </div>
        </v-card>
      </v-col>

      <!-- Expense -->
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          rounded="xl"
          class="pa-5"
        >
          <div class="text-body-2 text-medium-emphasis">
            Total Expenses
          </div>

          <div class="text-h5 font-weight-bold mt-2">
            {{ walletStore.wallet.expense.toLocaleString() }}
            {{ walletStore.wallet.currency }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div v-else-if="walletStore.loading">
      <v-progress-circular indeterminate />
    </div>
  </div>
</template>
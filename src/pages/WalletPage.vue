<script setup lang="ts">
import { onMounted } from 'vue'

import { useWalletStore } from '@/stores/wallet.store'

const walletStore = useWalletStore()

onMounted(() => {
  walletStore.fetchWallet()
})
</script>

<template>
  <div class="wallet-page">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Wallet</h1>

        <p>
          Manage your balance and money.
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="walletStore.loading && !walletStore.wallet"
      class="loading-state"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="40"
      />

      <span>
        Loading wallet...
      </span>
    </div>

    <!-- Wallet -->
    <template v-else-if="walletStore.wallet">

      <!-- Balance -->
      <v-card
        rounded="xl"
        class="balance-card"
      >
        <div class="balance-top">

          <div>
            <span class="balance-label">
              Current Balance
            </span>

            <div class="balance-amount">
              {{ walletStore.wallet.balance.toLocaleString() }}

              <span>
                {{ walletStore.wallet.currency }}
              </span>
            </div>
          </div>

          <div class="wallet-icon">
            <v-icon
              icon="mdi-wallet-outline"
              size="26"
            />
          </div>

        </div>

        <div class="wallet-id">
          <span>Wallet ID</span>

          <strong>
            {{ walletStore.wallet.id }}
          </strong>
        </div>
      </v-card>

      <!-- Stats -->
      <div class="stats-grid">

        <!-- Income -->
        <v-card
          rounded="xl"
          class="stat-card"
        >
          <div class="stat-icon income">
            <v-icon
              icon="mdi-arrow-down-left"
              size="22"
            />
          </div>

          <div class="stat-content">
            <span>
              Total Income
            </span>

            <strong>
              +{{ walletStore.wallet.income.toLocaleString() }}
              {{ walletStore.wallet.currency }}
            </strong>
          </div>
        </v-card>

        <!-- Expense -->
        <v-card
          rounded="xl"
          class="stat-card"
        >
          <div class="stat-icon expense">
            <v-icon
              icon="mdi-arrow-up-right"
              size="22"
            />
          </div>

          <div class="stat-content">
            <span>
              Total Expenses
            </span>

            <strong>
              -{{ walletStore.wallet.expense.toLocaleString() }}
              {{ walletStore.wallet.currency }}
            </strong>
          </div>
        </v-card>

      </div>

      <!-- Wallet information -->
      <v-card
        rounded="xl"
        class="info-card"
      >
        <div class="info-header">
          <div class="info-icon">
            <v-icon
              icon="mdi-information-outline"
              size="20"
            />
          </div>

          <div>
            <h3>Wallet Information</h3>

            <span>
              Basic information about your wallet
            </span>
          </div>
        </div>

        <v-divider class="my-4" />

        <div class="info-row">
          <span>Currency</span>

          <strong>
            {{ walletStore.wallet.currency }}
          </strong>
        </div>

        <div class="info-row">
          <span>Wallet ID</span>

          <strong class="wallet-id-text">
            {{ walletStore.wallet.id }}
          </strong>
        </div>
      </v-card>

    </template>
  </div>
</template>

<style scoped>
.wallet-page {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* =========================
   Header
========================= */

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
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

/* =========================
   Balance
========================= */

.balance-card {
  padding: 28px;

  color: white;

  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    #8b7cff
  );
}

.balance-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;
}

.balance-label {
  display: block;

  margin-bottom: 8px;

  font-size: 13px;
  opacity: 0.8;
}

.balance-amount {
  font-size: 34px;
  font-weight: 700;

  line-height: 1.2;
}

.balance-amount span {
  margin-left: 6px;

  font-size: 15px;
  font-weight: 500;

  opacity: 0.85;
}

.wallet-icon {
  width: 50px;
  height: 50px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  background: rgba(255, 255, 255, 0.15);
}

.wallet-id {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 28px;

  font-size: 11px;
}

.wallet-id span {
  opacity: 0.65;
}

.wallet-id strong {
  font-weight: 500;
  opacity: 0.9;

  overflow-wrap: anywhere;
}

/* =========================
   Stats
========================= */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;

  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 22px;
}

.stat-icon {
  width: 46px;
  height: 46px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;
}

.stat-icon.income {
  color: #16a34a;
  background: #ecfdf5;
}

.stat-icon.expense {
  color: #dc2626;
  background: #fef2f2;
}

.stat-content {
  min-width: 0;

  display: flex;
  flex-direction: column;
}

.stat-content span {
  margin-bottom: 4px;

  font-size: 12px;
  color: #9ca3af;
}

.stat-content strong {
  font-size: 15px;
  color: #111827;

  overflow-wrap: anywhere;
}

/* =========================
   Information
========================= */

.info-card {
  margin-top: 20px;

  padding: 22px;
}

.info-header {
  display: flex;
  align-items: center;

  gap: 12px;
}

.info-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.info-header h3 {
  margin: 0;

  font-size: 15px;
  color: #111827;
}

.info-header span {
  display: block;

  margin-top: 3px;

  font-size: 11px;
  color: #9ca3af;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 13px 0;

  border-bottom: 1px solid #f0f1f5;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  font-size: 12px;
  color: #9ca3af;
}

.info-row strong {
  font-size: 13px;
  color: #374151;
}

.wallet-id-text {
  font-family: monospace;
  overflow-wrap: anywhere;
}

/* =========================
   Loading
========================= */

.loading-state {
  min-height: 350px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 12px;

  color: #9ca3af;
  font-size: 13px;
}

/* =========================
   Tablet
========================= */

@media (max-width: 700px) {
  .balance-card {
    padding: 24px;
  }

  .balance-amount {
    font-size: 30px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 600px) {
  .page-header {
    margin-bottom: 18px;
  }

  .page-header h1 {
    font-size: 21px;
  }

  .page-header p {
    font-size: 12px;
  }

  .balance-card {
    padding: 20px;
  }

  .balance-top {
    gap: 12px;
  }

  .balance-label {
    font-size: 12px;
  }

  .balance-amount {
    font-size: 25px;
  }

  .balance-amount span {
    font-size: 13px;
  }

  .wallet-icon {
    width: 44px;
    height: 44px;
    border-radius: 13px;
  }

  .wallet-id {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;

    margin-top: 22px;
  }

  .stats-grid {
    grid-template-columns: 1fr;

    gap: 12px;

    margin-top: 16px;
  }

  .stat-card {
    padding: 18px;
  }

  .info-card {
    margin-top: 16px;
    padding: 18px;
  }

  .info-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .loading-state {
    min-height: 250px;
  }
}
</style>
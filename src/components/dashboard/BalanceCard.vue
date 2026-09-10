<script setup lang="ts">
import type { Wallet } from '@/types/wallet'

defineProps<{
  wallet: Wallet
}>()

const emit = defineEmits<{
  topUp: []
  withdraw: []
}>()
</script>

<template>
  <v-card class="balance-card" rounded="xl">
    <div class="balance-header">
      <div>
        <span class="balance-label">Total Balance</span>

        <div class="balance-amount">
          {{ wallet.balance.toLocaleString() }}
          <span>{{ wallet.currency }}</span>
        </div>
      </div>

      <div class="balance-icon">
        <v-icon icon="mdi-wallet-outline" size="24" />
      </div>
    </div>

    <div class="balance-footer">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        @click="emit('topUp')"
      >
        Add Money
      </v-btn>

      <v-btn
        color="primary"
        prepend-icon="mdi-arrow-up"
        @click="emit('withdraw')"
      >
        Withdraw
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.balance-card {
  padding: 28px;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    #8b7cff
  );
  color: white;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.balance-label {
  display: block;
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.balance-amount {
  font-size: 34px;
  font-weight: 700;
}

.balance-amount span {
  font-size: 16px;
  font-weight: 500;
  margin-left: 6px;
}

.balance-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
}

.balance-footer {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.balance-footer .v-btn:first-child {
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
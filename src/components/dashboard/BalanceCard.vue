
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
  <v-card
    class="balance-card"
    rounded="xl"
    elevation="0"
  >
    <div class="balance-header">
      <div class="balance-content">
        <span class="balance-label">
          Total Balance
        </span>

        <div class="balance-amount">
          {{ wallet.balance.toLocaleString() }}

          <span>
            {{ wallet.currency }}
          </span>
        </div>
      </div>

      <div class="balance-icon">
        <v-icon
          icon="mdi-wallet-outline"
          size="24"
        />
      </div>
    </div>

    <div class="balance-footer">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        rounded="lg"
        class="balance-button"
        @click="emit('topUp')"
      >
        Add Money
      </v-btn>

      <v-btn
        color="white"
        variant="flat"
        prepend-icon="mdi-arrow-up"
        rounded="lg"
        class="balance-button withdraw-button"
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
  overflow: hidden;
}

.balance-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.balance-content {
  min-width: 0;
}

.balance-label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
}

.balance-amount {
  font-size: 34px;
  line-height: 1.2;
  font-weight: 700;
  word-break: break-word;
}

.balance-amount span {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
}

.balance-icon {
  flex: 0 0 auto;
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

.balance-button {
  min-height: 44px;
  padding-inline: 18px;
}

.balance-card .balance-button:first-child {
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}

.withdraw-button {
  color: rgb(var(--v-theme-primary)) !important;
}

/* Tablet */

@media (max-width: 800px) {
  .balance-card {
    padding: 24px;
  }

  .balance-amount {
    font-size: 30px;
  }
}

/* Mobile */

@media (max-width: 600px) {
  .balance-card {
    padding: 20px;
  }

  .balance-header {
    gap: 12px;
  }

  .balance-label {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .balance-amount {
    font-size: 27px;
  }

  .balance-amount span {
    font-size: 14px;
    margin-left: 4px;
  }

  .balance-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .balance-footer {
    gap: 10px;
    margin-top: 22px;
  }

  .balance-button {
    flex: 1;
    min-width: 0;
    padding-inline: 8px;
  }
}
</style>

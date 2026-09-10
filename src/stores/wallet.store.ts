import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Wallet } from '@/types/wallet'

import { walletService } from '@/services/wallet.service'

export const useWalletStore = defineStore(
  'wallet',
  () => {
    const wallet = ref<Wallet | null>(null)
    const loading = ref(false)

    async function fetchWallet() {
      loading.value = true

      try {
        wallet.value =
          await walletService.getWallet()
      } finally {
        loading.value = false
      }
    }

    async function updateBalance(balance: number) {
      wallet.value =
        await walletService.updateBalance(balance)
    }

    return {
      wallet,
      loading,
      fetchWallet,
      updateBalance,
    }
  },
)
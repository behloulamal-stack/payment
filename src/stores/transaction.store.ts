import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  CreateTransactionData,
  Transaction,
} from '@/types/transaction'

import { transactionService } from '@/services/transaction.service'

export const useTransactionStore = defineStore(
  'transaction',
  () => {
    const transactions = ref<Transaction[]>([])
    const loading = ref(false)

    async function fetchRecentTransactions(
      limit = 5,
    ) {
      loading.value = true

      try {
        transactions.value =
          await transactionService
            .getRecentTransactions(limit)
      } finally {
        loading.value = false
      }
    }

    async function createTransaction(
      data: CreateTransactionData,
    ) {
      loading.value = true

      try {
        const transaction =
          await transactionService
            .createTransaction(data)

        transactions.value = [
          transaction,
          ...transactions.value,
        ]

        return transaction
      } finally {
        loading.value = false
      }
    }

    return {
      transactions,
      loading,
      fetchRecentTransactions,
      createTransaction,
    }
  },
)
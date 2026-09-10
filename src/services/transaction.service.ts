import type {
  CreateTransactionData,
  Transaction,
} from '@/types/transaction'

import { LocalTransactionRepository } from '@/repositories/transaction/local-transaction.repository'

const transactionRepository =
  new LocalTransactionRepository()

export const transactionService = {
  async getRecentTransactions(
    limit = 5,
  ): Promise<Transaction[]> {
    return transactionRepository.getRecentTransactions(limit)
  },

  async createTransaction(
    data: CreateTransactionData,
  ): Promise<Transaction> {
    return transactionRepository.createTransaction(data)
  },
}
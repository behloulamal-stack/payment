import type {
  CreateTransactionData,
  Transaction,
} from '@/types/transaction'

import { mockTransactions } from '@/data/mock/transactions'

import type { TransactionRepository } from './transaction.repository'

import {
  getFromStorage,
  saveToStorage,
  TRANSACTIONS_KEY,
} from './local-storage'

export class LocalTransactionRepository
  implements TransactionRepository
{
  async getRecentTransactions(
    limit = 5,
  ): Promise<Transaction[]> {
    const transactions = getFromStorage<Transaction[]>(
      TRANSACTIONS_KEY,
      mockTransactions,
    )

    return transactions.slice(0, limit)
  }

  async createTransaction(
    data: CreateTransactionData,
  ): Promise<Transaction> {
    const transactions = getFromStorage<Transaction[]>(
      TRANSACTIONS_KEY,
      mockTransactions,
    )

    const transaction: Transaction = {
      id: `TX-${Date.now()}`,
      type: 'expense',
      status: 'completed',
      amount: data.amount,
      currency: data.currency,
      description: data.note || 'Money sent',
      recipient: data.recipient,
      date: new Date().toISOString().split('T')[0],
      category: 'Transfer',
    }

    const updatedTransactions = [
      transaction,
      ...transactions,
    ]

    saveToStorage(
      TRANSACTIONS_KEY,
      updatedTransactions,
    )

    return transaction
  }
}
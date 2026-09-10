import type {
  CreateTransactionData,
  Transaction,
} from '@/types/transaction'

export interface TransactionRepository {
  getRecentTransactions(limit?: number): Promise<Transaction[]>

  createTransaction(
    data: CreateTransactionData,
  ): Promise<Transaction>
}
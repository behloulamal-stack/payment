export type TransactionType = 'income' | 'expense'

export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  currency: string
  description: string
  recipient?: string
  sender?: string
  date: string
  category?: string
}
export interface CreateTransactionData {
  amount: number
  currency: string
  recipient: string
  note?: string
}
import type { Wallet } from '@/types/wallet'

export interface WalletRepository {
  getWallet(): Promise<Wallet>

  updateBalance(balance: number): Promise<Wallet>
}

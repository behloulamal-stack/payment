import type { Wallet } from '@/types/wallet'

import { LocalWalletRepository } from '@/repositories/wallet/local-wallet.repository'

const walletRepository =
  new LocalWalletRepository()

export const walletService = {
  async getWallet(): Promise<Wallet> {
    return walletRepository.getWallet()
  },

  async updateBalance(balance: number): Promise<Wallet> {
    return walletRepository.updateBalance(balance)
  },
}
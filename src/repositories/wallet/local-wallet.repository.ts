import type { Wallet } from '@/types/wallet'

import { mockWallet } from '@/data/mock/wallet'

import type { WalletRepository } from './wallet.repository'

import {
  getFromStorage,
  saveToStorage,
  WALLET_KEY,
} from '@/repositories/transaction/local-storage'

export class LocalWalletRepository
  implements WalletRepository
{
  async getWallet(): Promise<Wallet> {
    return getFromStorage<Wallet>(
      WALLET_KEY,
      mockWallet,
    )
  }

  async updateBalance(balance: number): Promise<Wallet> {
    const wallet = getFromStorage<Wallet>(
      WALLET_KEY,
      mockWallet,
    )

    const updatedWallet: Wallet = {
      ...wallet,
      balance,
    }

    saveToStorage(WALLET_KEY, updatedWallet)

    return updatedWallet
  }
}
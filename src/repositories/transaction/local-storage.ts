const TRANSACTIONS_KEY = 'payflow_transactions'
const WALLET_KEY = 'payflow_wallet'

export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFromStorage<T>(
  key: string,
  fallback: T,
): T {
  const data = localStorage.getItem(key)

  if (!data) {
    return fallback
  }

  try {
    return JSON.parse(data) as T
  } catch {
    return fallback
  }
}

export {
  TRANSACTIONS_KEY,
  WALLET_KEY,
}
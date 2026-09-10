<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useWalletStore } from '@/stores/wallet.store'
import { useTransactionStore } from '@/stores/transaction.store'

const router = useRouter()

const walletStore = useWalletStore()
const transactionStore = useTransactionStore()

const recipient = ref('')
const amount = ref<number | null>(null)
const note = ref('')

const showConfirmation = ref(false)
const success = ref(false)
const sending = ref(false)

const createdTransactionId = ref('')

const recipientError = computed(() => {
  if (!recipient.value) {
    return 'Recipient is required'
  }

  return ''
})

const amountError = computed(() => {
  if (!amount.value || amount.value <= 0) {
    return 'Enter a valid amount'
  }

  if (
    walletStore.wallet &&
    amount.value > walletStore.wallet.balance
  ) {
    return 'Insufficient balance'
  }

  return ''
})

const canContinue = computed(() => {
  return (
    !recipientError.value &&
    !amountError.value
  )
})

function openConfirmation() {
  if (!canContinue.value) {
    return
  }

  showConfirmation.value = true
}

async function sendMoney() {
  if (!walletStore.wallet || !amount.value) {
    return
  }

  sending.value = true

  try {
    const transaction =
      await transactionStore.createTransaction({
        amount: amount.value,
        currency: walletStore.wallet.currency,
        recipient: recipient.value,
        note: note.value,
      })

    const newBalance =
      walletStore.wallet.balance - amount.value

    await walletStore.updateBalance(newBalance)

    createdTransactionId.value =
      transaction.id

    showConfirmation.value = false
    success.value = true
  } finally {
    sending.value = false
  }
}

function resetForm() {
  recipient.value = ''
  amount.value = null
  note.value = ''
  success.value = false
  createdTransactionId.value = ''
}

function goToTransactions() {
  router.push('/transactions')
}
</script>

<template>
  <div class="transfer-page">

    <!-- SUCCESS -->
    <v-card
      v-if="success"
      class="success-card"
      rounded="xl"
    >
      <div class="success-icon">
        <v-icon
          icon="mdi-check"
          size="42"
        />
      </div>

      <h2>Money Sent Successfully</h2>

      <p class="success-message">
        {{ amount?.toLocaleString() }}
        {{ walletStore.wallet?.currency }}
        was sent to
        <strong>{{ recipient }}</strong>
      </p>

      <div class="transaction-id">
        <span>Transaction ID</span>
        <strong>{{ createdTransactionId }}</strong>
      </div>

      <div class="success-actions">
        <v-btn
          color="primary"
          block
          size="large"
          @click="resetForm"
        >
          Send Another
        </v-btn>

        <v-btn
          variant="outlined"
          block
          size="large"
          @click="goToTransactions"
        >
          View Transactions
        </v-btn>
      </div>
    </v-card>

    <!-- TRANSFER FORM -->
    <template v-else>

      <div class="transfer-header">
        <div>
          <h2>Send Money</h2>
          <p>
            Transfer money quickly and securely.
          </p>
        </div>

        <div
          v-if="walletStore.wallet"
          class="available-balance"
        >
          <span>Available balance</span>

          <strong>
            {{ walletStore.wallet.balance.toLocaleString() }}
            {{ walletStore.wallet.currency }}
          </strong>
        </div>
      </div>

      <v-card
        class="transfer-card"
        rounded="xl"
      >

        <div class="form-section">

          <div class="field-label">
            Recipient
          </div>

          <v-text-field
            v-model="recipient"
            placeholder="Phone, email or username"
            prepend-inner-icon="mdi-account-outline"
            :error-messages="
              recipient && recipientError
                ? [recipientError]
                : []
            "
          />

        </div>

        <div class="form-section">

          <div class="field-label">
            Amount
          </div>

          <v-text-field
            v-model.number="amount"
            type="number"
            placeholder="0.00"
            prepend-inner-icon="mdi-cash"
            suffix="DZD"
            :error-messages="
              amount && amountError
                ? [amountError]
                : []
            "
          />

        </div>

        <div class="quick-amounts">

          <button
            v-for="value in [1000, 2500, 5000, 10000]"
            :key="value"
            type="button"
            @click="amount = value"
          >
            {{ value.toLocaleString() }} DZD
          </button>

        </div>

        <div class="form-section">

          <div class="field-label">
            Note
            <span>Optional</span>
          </div>

          <v-textarea
            v-model="note"
            placeholder="What's this transfer for?"
            prepend-inner-icon="mdi-note-text-outline"
            rows="3"
            auto-grow
          />

        </div>

        <v-divider class="my-4" />

        <div class="transfer-summary">

          <span>You will send</span>

          <strong v-if="amount">
            {{ amount.toLocaleString() }}
            {{ walletStore.wallet?.currency }}
          </strong>

          <strong v-else>
            0 DZD
          </strong>

        </div>

        <v-btn
          color="primary"
          size="large"
          block
          :disabled="!canContinue"
          class="continue-btn"
          @click="openConfirmation"
        >
          Continue
          <v-icon
            icon="mdi-arrow-right"
            end
          />
        </v-btn>

      </v-card>

    </template>

    <!-- CONFIRMATION -->
    <v-dialog
      v-model="showConfirmation"
      max-width="460"
    >

      <v-card rounded="xl">

        <v-card-title class="dialog-title">
          Confirm Transfer
        </v-card-title>

        <v-card-text>

          <div class="confirm-icon">
            <v-icon
              icon="mdi-send-outline"
              size="28"
            />
          </div>

          <p class="confirm-label">
            You are sending
          </p>

          <h2 class="confirm-amount">
            {{ amount?.toLocaleString() }}
            {{ walletStore.wallet?.currency }}
          </h2>

          <div class="confirm-details">

            <div>
              <span>Recipient</span>
              <strong>{{ recipient }}</strong>
            </div>

            <div v-if="note">
              <span>Note</span>
              <strong>{{ note }}</strong>
            </div>

          </div>

        </v-card-text>

        <v-card-actions class="dialog-actions">

          <v-btn
            variant="outlined"
            @click="showConfirmation = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            :loading="sending"
            @click="sendMoney"
          >
            Confirm & Send
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </div>
</template>

<style scoped>
.transfer-page {
  max-width: 900px;
  margin: 0 auto;
}

.transfer-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
}

.transfer-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.transfer-header p {
  margin: 6px 0 0;
  color: #9ca3af;
  font-size: 13px;
}

.available-balance {
  text-align: right;
}

.available-balance span {
  display: block;
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.available-balance strong {
  font-size: 15px;
  color: #374151;
}

.transfer-card {
  padding: 30px;
}

.form-section {
  margin-bottom: 8px;
}

.field-label {
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.field-label span {
  margin-left: 5px;
  font-weight: 400;
  color: #9ca3af;
}

.quick-amounts {
  display: flex;
  gap: 8px;
  margin: 4px 0 22px;
}

.quick-amounts button {
  padding: 8px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.quick-amounts button:hover {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
}

.transfer-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.transfer-summary span {
  color: #9ca3af;
  font-size: 13px;
}

.transfer-summary strong {
  color: #111827;
  font-size: 18px;
}

.continue-btn {
  height: 50px !important;
}

.success-card {
  max-width: 520px;
  margin: 60px auto;
  padding: 40px;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  background: #ecfdf5;
}

.success-card h2 {
  margin-bottom: 10px;
  color: #111827;
}

.success-message {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.transaction-id {
  margin: 24px 0;
  padding: 14px;
  border-radius: 12px;
  background: #f7f8fc;
}

.transaction-id span {
  display: block;
  margin-bottom: 5px;
  color: #9ca3af;
  font-size: 11px;
}

.transaction-id strong {
  font-size: 13px;
  color: #374151;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dialog-title {
  padding: 24px 24px 10px;
  font-size: 19px;
  font-weight: 700;
}

.confirm-icon {
  width: 58px;
  height: 58px;
  margin: 10px auto 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.confirm-label {
  text-align: center;
  margin: 0;
  color: #9ca3af;
  font-size: 12px;
}

.confirm-amount {
  text-align: center;
  margin: 6px 0 24px;
  font-size: 28px;
  color: #111827;
}

.confirm-details {
  padding: 16px;
  border-radius: 12px;
  background: #f7f8fc;
}

.confirm-details div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 7px 0;
}

.confirm-details span {
  color: #9ca3af;
  font-size: 12px;
}

.confirm-details strong {
  color: #374151;
  font-size: 12px;
  text-align: right;
}

.dialog-actions {
  padding: 16px 24px 24px;
  gap: 10px;
}
</style>
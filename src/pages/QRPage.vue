<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const paymentId = 'PAYFLOW-AMEL-001'

const copied = ref(false)

const userName = computed(() => {
  return authStore.user?.fullName ?? 'User'
})

const userEmail = computed(() => {
  return authStore.user?.email ?? ''
})

const userPhone = computed(() => {
  return authStore.user?.phone ?? ''
})

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentId)}`
})

async function copyPaymentId() {
  try {
    await navigator.clipboard.writeText(paymentId)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy Payment ID:', error)
  }
}
</script>

<template>
  <div class="qr-page">

    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>QR Pay</h1>

        <p>
          Receive payments quickly and securely using your QR code.
        </p>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="qr-layout">

      <!-- QR CARD -->
      <v-card
        rounded="xl"
        class="qr-card"
      >

        <!-- BRAND -->
        <div class="brand-section">

          <div class="brand-icon">
            <v-icon
              icon="mdi-wallet-outline"
              size="30"
            />
          </div>

          <div>
            <h2>PayFlow</h2>

            <span>
              Personal Payment
            </span>
          </div>

        </div>

        <!-- USER -->
        <div class="user-section">

          <v-avatar
            size="64"
            class="user-avatar"
          >
            <v-icon
              icon="mdi-account"
              size="32"
            />
          </v-avatar>

          <h3>
            {{ userName }}
          </h3>

          <p v-if="userEmail">
            {{ userEmail }}
          </p>

          <p v-if="userPhone">
            {{ userPhone }}
          </p>

        </div>

        <!-- QR -->
        <div class="qr-wrapper">

          <div class="qr-container">
            <v-img
              :src="qrCodeUrl"
              alt="PayFlow QR Code"
              width="260"
              height="260"
            />
          </div>

        </div>

        <div class="scan-info">
          <v-icon
            icon="mdi-camera-outline"
            size="18"
          />

          <span>
            Scan this QR code to send payment
          </span>
        </div>

        <!-- PAYMENT ID -->
        <div class="payment-section">

          <div class="section-label">
            <span>
              Payment ID
            </span>

            <v-icon
              icon="mdi-information-outline"
              size="16"
            />
          </div>

          <div class="payment-id-box">

            <span>
              {{ paymentId }}
            </span>

            <v-btn
              icon
              variant="text"
              size="small"
              :title="copied ? 'Copied' : 'Copy Payment ID'"
              @click="copyPaymentId"
            >
              <v-icon
                :icon="
                  copied
                    ? 'mdi-check'
                    : 'mdi-content-copy'
                "
                :color="copied ? 'success' : undefined"
              />
            </v-btn>

          </div>

          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            class="copy-button"
            @click="copyPaymentId"
          >
            <v-icon
              :icon="
                copied
                  ? 'mdi-check'
                  : 'mdi-content-copy'
              "
              start
            />

            {{ copied ? 'Copied!' : 'Copy Payment ID' }}
          </v-btn>

        </div>

      </v-card>

      <!-- INFO CARD -->
      <v-card
        rounded="xl"
        class="info-card"
      >

        <div class="info-header">
          <div class="info-icon">
            <v-icon
              icon="mdi-shield-check-outline"
              size="24"
            />
          </div>

          <div>
            <h3>
              How it works
            </h3>

            <p>
              Receive money in a few simple steps.
            </p>
          </div>
        </div>

        <div class="steps">

          <div class="step">

            <div class="step-number">
              1
            </div>

            <div>
              <strong>
                Show your QR code
              </strong>

              <span>
                Let the sender scan your QR code.
              </span>
            </div>

          </div>

          <div class="step">

            <div class="step-number">
              2
            </div>

            <div>
              <strong>
                Sender confirms payment
              </strong>

              <span>
                The sender enters the amount and confirms.
              </span>
            </div>

          </div>

          <div class="step">

            <div class="step-number">
              3
            </div>

            <div>
              <strong>
                Money arrives
              </strong>

              <span>
                The payment will appear in your wallet.
              </span>
            </div>

          </div>

        </div>

        <v-divider class="my-5" />

        <div class="security-note">

          <v-icon
            icon="mdi-lock-outline"
            size="20"
          />

          <span>
            Your payment information is protected by PayFlow.
          </span>

        </div>

      </v-card>

    </div>

  </div>
</template>

<style scoped>
/* ========================================
   PAGE
======================================== */

.qr-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* ========================================
   HEADER
======================================== */

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  margin: 0;

  font-size: 24px;
  font-weight: 700;

  color: #111827;
}

.page-header p {
  margin: 6px 0 0;

  font-size: 13px;

  color: #9ca3af;
}

/* ========================================
   LAYOUT
======================================== */

.qr-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(300px, 0.8fr);

  gap: 24px;

  align-items: start;
}

/* ========================================
   QR CARD
======================================== */

.qr-card {
  padding: 32px;
}

/* ========================================
   BRAND
======================================== */

.brand-section {
  display: flex;
  align-items: center;

  justify-content: center;

  gap: 12px;

  margin-bottom: 24px;
}

.brand-icon {
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  color: white;

  background: rgb(var(--v-theme-primary));
}

.brand-section h2 {
  margin: 0;

  font-size: 19px;
  font-weight: 700;

  color: #111827;
}

.brand-section span {
  display: block;

  margin-top: 2px;

  font-size: 11px;

  color: #9ca3af;
}

/* ========================================
   USER
======================================== */

.user-section {
  text-align: center;

  margin-bottom: 24px;
}

.user-avatar {
  margin-bottom: 10px;

  background: rgba(var(--v-theme-primary), 0.1);

  color: rgb(var(--v-theme-primary));
}

.user-section h3 {
  margin: 0;

  font-size: 18px;
  font-weight: 600;

  color: #111827;
}

.user-section p {
  margin: 4px 0 0;

  font-size: 12px;

  color: #9ca3af;
}

/* ========================================
   QR
======================================== */

.qr-wrapper {
  display: flex;

  justify-content: center;

  margin: 20px 0;
}

.qr-container {
  width: 280px;
  height: 280px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;

  background: white;

  border: 1px solid #e9eaf0;

  border-radius: 18px;

  box-shadow:
    0 10px 30px rgba(17, 24, 39, 0.06);
}

.scan-info {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 7px;

  margin-bottom: 28px;

  font-size: 12px;

  color: #9ca3af;
}

/* ========================================
   PAYMENT ID
======================================== */

.payment-section {
  width: 100%;
}

.section-label {
  display: flex;

  align-items: center;

  gap: 6px;

  margin-bottom: 8px;

  font-size: 12px;
  font-weight: 600;

  color: #374151;
}

.section-label .v-icon {
  color: #9ca3af;
}

.payment-id-box {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 8px;

  min-width: 0;

  padding: 8px 10px 8px 14px;

  border: 1px solid #e5e7eb;

  border-radius: 10px;

  background: #f9fafb;
}

.payment-id-box span {
  min-width: 0;

  font-family: monospace;

  font-size: 12px;

  color: #374151;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.copy-button {
  margin-top: 12px;
}

/* ========================================
   INFO CARD
======================================== */

.info-card {
  padding: 28px;
}

.info-header {
  display: flex;

  align-items: flex-start;

  gap: 12px;

  margin-bottom: 28px;
}

.info-icon {
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  color: rgb(var(--v-theme-primary));

  background: rgba(var(--v-theme-primary), 0.1);
}

.info-header h3 {
  margin: 0;

  font-size: 16px;
  font-weight: 600;

  color: #111827;
}

.info-header p {
  margin: 4px 0 0;

  font-size: 12px;

  color: #9ca3af;
}

/* ========================================
   STEPS
======================================== */

.steps {
  display: flex;

  flex-direction: column;

  gap: 24px;
}

.step {
  display: flex;

  align-items: flex-start;

  gap: 14px;
}

.step-number {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 12px;
  font-weight: 700;

  color: rgb(var(--v-theme-primary));

  background: rgba(var(--v-theme-primary), 0.1);
}

.step strong {
  display: block;

  font-size: 13px;
  font-weight: 600;

  color: #374151;
}

.step span {
  display: block;

  margin-top: 4px;

  font-size: 11px;

  line-height: 1.5;

  color: #9ca3af;
}

/* ========================================
   SECURITY
======================================== */

.security-note {
  display: flex;

  align-items: flex-start;

  gap: 8px;

  font-size: 11px;

  line-height: 1.5;

  color: #9ca3af;
}

.security-note .v-icon {
  flex-shrink: 0;

  color: #16a34a;
}

/* ========================================
   TABLET
======================================== */

@media (max-width: 900px) {
  .qr-layout {
    grid-template-columns: 1fr;
  }

  .qr-card {
    max-width: 650px;
    width: 100%;
    margin: 0 auto;
  }

  .info-card {
    max-width: 650px;
    width: 100%;
    margin: 0 auto;
  }
}

/* ========================================
   MOBILE
======================================== */

@media (max-width: 600px) {
  .page-header {
    margin-bottom: 18px;
  }

  .page-header h1 {
    font-size: 21px;
  }

  .page-header p {
    font-size: 12px;
    line-height: 1.5;
  }

  .qr-layout {
    gap: 16px;
  }

  .qr-card {
    padding: 22px 16px;
  }

  .info-card {
    padding: 22px 18px;
  }

  .brand-section {
    margin-bottom: 20px;
  }

  .user-section {
    margin-bottom: 18px;
  }

  .qr-container {
    width: 240px;
    height: 240px;
  }

  .scan-info {
    margin-bottom: 22px;

    text-align: center;

    line-height: 1.5;
  }

  .payment-id-box span {
    font-size: 11px;
  }

  .info-header {
    margin-bottom: 22px;
  }

  .steps {
    gap: 20px;
  }
}

/* ========================================
   VERY SMALL MOBILE
======================================== */

@media (max-width: 380px) {
  .qr-card {
    padding: 18px 12px;
  }

  .qr-container {
    width: 210px;
    height: 210px;
  }

  .payment-id-box span {
    font-size: 10px;
  }

  .brand-section h2 {
    font-size: 17px;
  }

  .user-section h3 {
    font-size: 16px;
  }
}
</style>
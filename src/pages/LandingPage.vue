<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <v-app>
    <v-main class="landing-page">

      <!-- Navbar -->
      <header class="landing-navbar">
        <div class="brand">
          <div class="brand-icon">
            <v-icon
              icon="mdi-wallet-outline"
              size="24"
            />
          </div>

          <span class="brand-name">
            PayFlow
          </span>
        </div>

        <div class="nav-actions">
          <v-btn
            variant="text"
            @click="goToLogin"
          >
            Login
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            @click="goToRegister"
          >
            Get Started
          </v-btn>
        </div>
      </header>

      <!-- Hero -->
      <section class="hero-section">
        <v-container>
          <v-row
            align="center"
            justify="space-between"
          >
            <!-- Left -->
            <v-col
              cols="12"
              md="6"
            >
              <div class="hero-content">

                <v-chip
                  color="primary"
                  variant="tonal"
                  rounded="pill"
                  class="mb-5"
                >
                  <v-icon
                    start
                    size="18"
                  >
                    mdi-shield-check-outline
                  </v-icon>

                  Simple. Secure. Smart.
                </v-chip>

                <h1 class="hero-title">
                  Your money,
                  <span>simplified.</span>
                </h1>

                <p class="hero-description">
                  PayFlow makes sending, receiving and
                  managing your money simple, fast and secure.
                </p>

                <div class="hero-actions">
                  <v-btn
                    color="primary"
                    size="large"
                    rounded="lg"
                    class="px-7"
                    @click="goToRegister"
                  >
                    Get Started

                    <v-icon end>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>

                  <v-btn
                    variant="outlined"
                    size="large"
                    rounded="lg"
                    class="px-7"
                    @click="goToLogin"
                  >
                    Login
                  </v-btn>
                </div>

                <div class="trust-row">
                  <div class="trust-item">
                    <v-icon color="primary">
                      mdi-check-circle-outline
                    </v-icon>

                    <span>Secure payments</span>
                  </div>

                  <div class="trust-item">
                    <v-icon color="primary">
                      mdi-check-circle-outline
                    </v-icon>

                    <span>Easy to use</span>
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Right -->
            <v-col
              cols="12"
              md="5"
            >
              <div class="hero-visual">

                <!-- Main Card -->
                <v-card
                  rounded="xl"
                  elevation="8"
                  class="wallet-card"
                >
                  <div class="card-header">
                    <div>
                      <span class="card-label">
                        Available Balance
                      </span>

                      <div class="balance">
                        125,450
                        <span>DZD</span>
                      </div>
                    </div>

                    <v-avatar
                      color="primary"
                      size="46"
                    >
                      <v-icon>
                        mdi-wallet-outline
                      </v-icon>
                    </v-avatar>
                  </div>

                  <div class="card-number">
                    •••• •••• •••• 4821
                  </div>

                  <div class="card-footer">
                    <span>PayFlow Wallet</span>

                    <v-icon>
                      mdi-contactless-payment
                    </v-icon>
                  </div>
                </v-card>

                <!-- Transaction Card -->
                <v-card
                  rounded="xl"
                  elevation="4"
                  class="transaction-card"
                >
                  <div class="transaction-icon">
                    <v-icon>
                      mdi-arrow-top-right
                    </v-icon>
                  </div>

                  <div class="transaction-info">
                    <span class="transaction-title">
                      Money sent
                    </span>

                    <span class="transaction-subtitle">
                      Today
                    </span>
                  </div>

                  <strong>
                    -2,000 DZD
                  </strong>
                </v-card>

                <!-- Floating Security -->
                <div class="security-badge">
                  <v-icon
                    color="primary"
                    size="22"
                  >
                    mdi-shield-check
                  </v-icon>

                  <div>
                    <strong>Protected</strong>
                    <span>Your money is secure</span>
                  </div>
                </div>

              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Features -->
      <section class="features-section">
        <v-container>
          <div class="section-heading">
            <span>Everything you need</span>

            <h2>
              One place for your money
            </h2>
          </div>

          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-card
                rounded="xl"
                class="feature-card pa-6"
              >
                <div class="feature-icon">
                  <v-icon>
                    mdi-send-outline
                  </v-icon>
                </div>

                <h3>
                  Send Money
                </h3>

                <p>
                  Send money quickly and easily
                  whenever you need it.
                </p>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-card
                rounded="xl"
                class="feature-card pa-6"
              >
                <div class="feature-icon">
                  <v-icon>
                    mdi-wallet-outline
                  </v-icon>
                </div>

                <h3>
                  Smart Wallet
                </h3>

                <p>
                  Keep track of your balance,
                  income and expenses in one place.
                </p>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-card
                rounded="xl"
                class="feature-card pa-6"
              >
                <div class="feature-icon">
                  <v-icon>
                    mdi-qrcode
                  </v-icon>
                </div>

                <h3>
                  QR Pay
                </h3>

                <p>
                  Make payments simple with
                  your personal PayFlow QR code.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <span>
          © 2026 PayFlow
        </span>

        <span>
          Simple payments for everyone.
        </span>
      </footer>

    </v-main>
  </v-app>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: rgb(var(--v-theme-background));
}

/* Navbar */

.landing-navbar {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  background: #ffffff;
  border-bottom: 1px solid #eef0f4;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-primary));
  color: white;
}

.brand-name {
  font-size: 21px;
  font-weight: 700;
  color: #111827;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Hero */

.hero-section {
  padding: 90px 0 100px;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: clamp(42px, 5vw, 68px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #111827;
  margin-bottom: 24px;
}

.hero-title span {
  display: block;
  color: rgb(var(--v-theme-primary));
}

.hero-description {
  max-width: 520px;
  font-size: 18px;
  line-height: 1.7;
  color: #6b7280;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.trust-row {
  display: flex;
  gap: 24px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #6b7280;
}

/* Hero Visual */

.hero-visual {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wallet-card {
  width: 360px;
  min-height: 220px;
  padding: 28px;
  color: white;
  background: rgb(var(--v-theme-primary));
  transform: rotate(-4deg);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-label {
  display: block;
  font-size: 12px;
  opacity: 0.8;
}

.balance {
  margin-top: 8px;
  font-size: 30px;
  font-weight: 700;
}

.balance span {
  font-size: 13px;
  font-weight: 500;
}

.card-number {
  margin-top: 42px;
  font-size: 18px;
  letter-spacing: 0.12em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  font-size: 12px;
  opacity: 0.9;
}

/* Transaction */

.transaction-card {
  position: absolute;
  right: 0;
  bottom: 30px;
  width: 280px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
}

.transaction-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.transaction-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transaction-title {
  font-size: 13px;
  font-weight: 600;
}

.transaction-subtitle {
  font-size: 11px;
  color: #9ca3af;
}

/* Security */

.security-badge {
  position: absolute;
  left: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.security-badge div {
  display: flex;
  flex-direction: column;
}

.security-badge strong {
  font-size: 12px;
}

.security-badge span {
  font-size: 10px;
  color: #9ca3af;
}

/* Features */

.features-section {
  padding: 80px 0;
  background: #ffffff;
}

.section-heading {
  text-align: center;
  margin-bottom: 40px;
}

.section-heading span {
  font-size: 13px;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.section-heading h2 {
  margin-top: 8px;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.feature-card {
  height: 100%;
  border: 1px solid #eef0f4;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.feature-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  line-height: 1.7;
  color: #6b7280;
}

/* Footer */

.landing-footer {
  min-height: 70px;
  padding: 20px 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
  background: #ffffff;
  border-top: 1px solid #eef0f4;
}

/* Mobile */

@media (max-width: 768px) {
  .landing-navbar {
    padding: 0 20px;
  }

  .hero-section {
    padding: 60px 0;
  }

  .hero-content {
    text-align: center;
  }

  .hero-actions,
  .trust-row {
    justify-content: center;
  }

  .hero-visual {
    margin-top: 50px;
    min-height: 360px;
  }

  .wallet-card {
    width: 320px;
  }

  .transaction-card {
    right: 5px;
  }

  .security-badge {
    left: 5px;
  }

  .landing-footer {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
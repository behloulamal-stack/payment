<script setup lang="ts">
import { ref } from 'vue'

const paymentId = 'PAYFLOW-AMEL-001'

const copied = ref(false)

async function copyPaymentId() {
  await navigator.clipboard.writeText(paymentId)

  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        QR Pay
      </h1>

      <p class="text-body-2 text-medium-emphasis">
        Receive payments quickly using your QR code
      </p>
    </div>

    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="5"
      >
        <v-card
          rounded="xl"
          class="pa-8 text-center"
        >
          <!-- Brand -->
          <v-avatar
            size="64"
            class="mb-4"
          >
            <v-icon
              size="36"
              color="primary"
            >
              mdi-wallet-outline
            </v-icon>
          </v-avatar>

          <h2 class="text-h5 font-weight-bold">
            PayFlow
          </h2>

          <p class="text-body-1 mt-1">
            Amel Behloul
          </p>

          <!-- QR Code -->
          <v-sheet
            class="mx-auto my-8 pa-5"
            width="240"
            height="240"
            rounded="lg"
            border
          >
            <v-img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYFLOW-AMEL-001"
              width="200"
              height="200"
              class="mx-auto"
              alt="PayFlow QR Code"
            />
          </v-sheet>

          <p class="text-body-2 text-medium-emphasis">
            Scan this QR code to pay
          </p>

          <!-- Payment ID -->
          <v-text-field
            :model-value="paymentId"
            label="Payment ID"
            variant="outlined"
            readonly
            class="mt-6"
          />

          <!-- Copy -->
          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            @click="copyPaymentId"
          >
            <v-icon start>
              mdi-content-copy
            </v-icon>

            {{ copied ? 'Copied!' : 'Copy Payment ID' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
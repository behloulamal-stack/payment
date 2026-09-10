<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('Amel Behloul')
const email = ref('amel@example.com')
const phone = ref('+213 555 000 000')
const currency = ref('DZD')
const notifications = ref(true)

function saveSettings() {
  localStorage.setItem(
    'payflow_settings',
    JSON.stringify({
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
      currency: currency.value,
      notifications: notifications.value,
    }),
  )
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        Settings
      </h1>

      <p class="text-body-2 text-medium-emphasis">
        Manage your account and preferences
      </p>
    </div>

    <v-row>
      <!-- Profile -->
      <v-col
        cols="12"
        md="7"
      >
        <v-card
          rounded="xl"
          class="pa-6"
        >
          <h2 class="text-h6 font-weight-bold mb-5">
            Profile
          </h2>

          <v-text-field
            v-model="fullName"
            label="Full name"
            variant="outlined"
            class="mb-3"
          />

          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            class="mb-3"
          />

          <v-text-field
            v-model="phone"
            label="Phone"
            variant="outlined"
          />

          <v-btn
            color="primary"
            size="large"
            rounded="lg"
            @click="saveSettings"
          >
            Save Changes
          </v-btn>
        </v-card>
      </v-col>

      <!-- Preferences -->
      <v-col
        cols="12"
        md="5"
      >
        <v-card
          rounded="xl"
          class="pa-6"
        >
          <h2 class="text-h6 font-weight-bold mb-5">
            Preferences
          </h2>

          <v-select
            v-model="currency"
            label="Currency"
            :items="['DZD', 'USD', 'EUR']"
            variant="outlined"
            class="mb-4"
          />

          <v-switch
            v-model="notifications"
            label="Notifications"
            color="primary"
          />
        </v-card>
      </v-col>

      <!-- Security -->
      <v-col cols="12">
        <v-card
          rounded="xl"
          class="pa-6"
        >
          <h2 class="text-h6 font-weight-bold">
            Security
          </h2>

          <p class="text-body-2 text-medium-emphasis mt-1">
            Keep your PayFlow account secure
          </p>

          <v-btn
            variant="outlined"
            class="mt-4"
          >
            Change Password
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
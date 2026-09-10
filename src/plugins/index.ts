import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { payflowTheme } from '../theme'

export default createVuetify({
  theme: {
    defaultTheme: 'payflowTheme',

    themes: {
      payflowTheme,
    },
  },

  defaults: {
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },

    VBtn: {
      rounded: 'lg',
      height: 44,
    },

    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },

    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
})
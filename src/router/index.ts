import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
      {
      path: '/',
      name: 'landing',
      component: () =>
        import('@/pages/LandingPage.vue'),
    },

    // =====================
    // Auth
    // =====================

    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/pages/LoginPage.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: () =>
        import('@/pages/RegisterPage.vue'),
    },

    // =====================
    // Dashboard
    // =====================

    {
      path: '/dashboard',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'dashboard',
          component: () =>
            import('@/pages/DashboardPage.vue'),
        },
      ],
    },

    // =====================
    // Transfer
    // =====================

    {
      path: '/transfer',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'transfer',
          component: () =>
            import('@/pages/TransferPage.vue'),
        },
      ],
    },

    // =====================
    // Transactions
    // =====================

    {
      path: '/transactions',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'transactions',
          component: () =>
            import('@/pages/TransactionsPage.vue'),
        },
      ],
    },

    {
      path: '/transactions/:id',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'transaction-details',
          component: () =>
            import('@/pages/TransactionDetailsPage.vue'),
        },
      ],
    },

    // =====================
    // Wallet
    // =====================

    {
      path: '/wallet',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'wallet',
          component: () =>
            import('@/pages/WalletPage.vue'),
        },
      ],
    },

    // =====================
    // QR
    // =====================

    {
      path: '/qr',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'qr',
          component: () =>
            import('@/pages/QRPage.vue'),
        },
      ],
    },

    // =====================
    // Settings
    // =====================

    {
      path: '/settings',
      component: () =>
        import('@/layouts/DashboardLayout.vue'),

      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'settings',
          component: () =>
            import('@/pages/SettingsPage.vue'),
        },
      ],
    },
  ],
})

// =====================
// Authentication Guard
// =====================

router.beforeEach((to) => {
  const isAuthenticated =
    localStorage.getItem('payflow_authenticated') === 'true'

  // User is not logged in
  // but wants to access protected page
  if (
    to.meta.requiresAuth &&
    !isAuthenticated
  ) {
    return '/login'
  }

  // User is already logged in
  // and tries to open Login/Register
  if (
    (to.path === '/login' ||
      to.path === '/register') &&
    isAuthenticated
  ) {
    return '/dashboard'
  }

  return true
})

export default router
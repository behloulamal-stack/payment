<script setup lang="ts">
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppTopbar from '@/components/common/AppTopbar.vue'
</script>

<template>
  <v-app>
    <div class="dashboard-layout">
      <AppSidebar />

      <div class="main-area">
        <AppTopbar />

        <main class="page-content">
          <router-view />
        </main>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  background: rgb(var(--v-theme-background));
}

.main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  padding: 32px;
}

/* Tablet */
@media (max-width: 960px) {
  .page-content {
    padding: 24px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .page-content {
    padding: 20px 16px;
  }
}
</style>
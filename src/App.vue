<template>
  <div class="flex h-screen bg-gray-50 relative">
    <!-- Sidebar -->
    <div class="z-[999] relative">
      <SchoolSidebar v-if="!isAuthRoute" />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header
        v-if="!isAuthRoute"
        class="bg-white shadow-sm border-b border-gray-200 px-6"
      >
        <SchoolHeader />
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto px-6 py-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import SchoolHeader from "./components/Header/SchoolHeader.vue";
  import SchoolSidebar from "./components/Sidebar/SchoolSidebar.vue";

  // Auth route check
  const route = useRoute();
  const isAuthRoute = computed(() =>
    ["/login", "/signup"].includes(route.path)
  );
</script>

<style>
  html {
    font-size: 14.5px;
  }

  /* Global style */
  #app {
    font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    background-color: #f9fafb;
  }
</style>

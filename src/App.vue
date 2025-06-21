<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <SchoolSidebar v-if="!isAuthRoute" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header
        v-if="!isAuthRoute"
        class="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
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
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import SchoolHeader from "./components/Header/SchoolHeader.vue";
  import SchoolSidebar from "./components/Sidebar/SchoolSidebar.vue";

  const route = useRoute();

  // Check if current route is login or signup
  const isAuthRoute = computed(() => {
    return ["/login", "/signup"].includes(route.path);
  });
</script>

<style>
  #app {
    font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    background-color: #f9fafb;
  }
</style>

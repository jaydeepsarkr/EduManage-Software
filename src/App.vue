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

    <!-- Toasts -->
    <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <transition-group
        name="fade-slide"
        tag="div"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="max-w-sm bg-gradient-to-r from-green-100 via-white to-green-50 border border-green-400 rounded-lg shadow-lg p-4 pointer-events-auto backdrop-blur-md transition-all duration-500"
        >
          <div class="flex items-start space-x-3">
            <div class="mt-1 text-green-600">
              <component
                :is="getToastIcon(toast.type)"
                class="w-5 h-5"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-green-800">
                {{ toast.title }}
              </p>
              <p class="text-xs text-green-700 mt-1">
                {{ toast.message }}
              </p>
            </div>
            <button
              @click="removeToast(toast.id)"
              class="text-green-400 hover:text-green-600 transition-colors duration-150"
            >
              <XIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SchoolHeader from "./components/Header/SchoolHeader.vue";
  import SchoolSidebar from "./components/Sidebar/SchoolSidebar.vue";

  // Icons
  const CheckCircleIcon = {
    template: `<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>`,
  };
  const XIcon = {
    template: `<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>`,
  };
  const InfoIcon = {
    template: `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
  </svg>`,
  };

  // Toast logic
  const toasts = ref([]);

  const addToast = (toast) => {
    toast.id = Date.now();
    toasts.value.push(toast);
    setTimeout(() => removeToast(toast.id), 4000);
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return CheckCircleIcon;
      case "info":
        return InfoIcon;
      case "error":
        return XIcon;
      default:
        return InfoIcon;
    }
  };

  // Auth route check
  const route = useRoute();
  const isAuthRoute = computed(() =>
    ["/login", "/signup"].includes(route.path)
  );

  // Lifecycle
onMounted(() => {
  if (!["/login", "/signup"].includes(route.path) && !sessionStorage.getItem("welcome_toast_shown")) {
    addToast({
      type: "success",
      title: "Welcome 🎉",
      message: "Welcome back! Your dashboard is ready.",
    });
    sessionStorage.setItem("welcome_toast_shown", "true");
  }
});

</script>

<style>
  /* Toast animation */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
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

<template>
  <div
    class="flex items-center space-x-3 sm:space-x-4 pl-4 sm:pl-6 border-l border-slate-200"
  >
    <!-- Enhanced User Info -->
    <div class="text-right hidden lg:block">
      <div class="text-sm font-semibold text-gray-800 leading-tight">
        {{ userName }}
      </div>
      <div class="text-xs text-gray-500 capitalize">
        {{ userRole }}
      </div>
    </div>

    <!-- Enhanced Profile Dropdown -->
    <div class="relative your-profile-wrapper">
      <button
        @click="toggleUserMenu"
        class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm group"
      >
        <!-- Enhanced User Photo with Larger Size -->
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:border-indigo-300"
        >
          <img
            v-if="userPhoto"
            :src="userPhoto"
            alt="User Photo"
            class="w-full h-full object-cover"
          />
          <User
            v-else
            class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
          />
        </div>

        <!-- Enhanced Chevron with Animation -->
        <ChevronDown
          :class="[
            'w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-200 group-hover:text-slate-600',
            showUserMenu ? 'rotate-180' : '',
          ]"
        />
      </button>

      <!-- Enhanced Dropdown Menu -->
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-slate-200 animate-fade-in backdrop-blur-sm"
      >
        <!-- User Info Header in Dropdown -->
        <div class="px-4 py-3 border-b border-slate-100">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200"
            >
              <img
                v-if="userPhoto"
                :src="userPhoto"
                alt="User Photo"
                class="w-full h-full object-cover"
              />
              <User
                v-else
                class="w-5 h-5 text-indigo-600"
              />
            </div>
            <div>
              <div class="text-sm font-semibold text-slate-800">
                {{ userName }}
              </div>
              <div class="text-xs text-slate-500 capitalize">
                {{ userRole }}
              </div>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <a
            href="#"
            class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
          >
            <div
              class="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-200"
            >
              <User class="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div class="font-medium">Profile</div>
              <div class="text-xs text-slate-500">View and edit profile</div>
            </div>
          </a>

          <a
            href="#"
            class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
          >
            <div
              class="p-2 bg-emerald-100 rounded-lg mr-3 group-hover:bg-emerald-200 transition-colors duration-200"
            >
              <Settings class="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div class="font-medium">Settings</div>
              <div class="text-xs text-slate-500">Account preferences</div>
            </div>
          </a>

          <!-- Divider -->
          <div class="border-t border-slate-100 my-2"></div>

          <a
            href="#"
            class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <div
              class="p-2 bg-red-100 rounded-lg mr-3 group-hover:bg-red-200 transition-colors duration-200"
            >
              <LogOut class="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div class="font-medium">Sign out</div>
              <div class="text-xs text-slate-500">End your session</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { User, ChevronDown, Settings, LogOut } from "lucide-vue-next";
  import store from "@/store";

  // State
  const showUserMenu = ref(false);
  const showSearch = ref(false);

  // Actions
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };

  // Base URL for accessing image
  // const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:5000";

  // Getters
  const userName = computed(() => store.getters.getUserName);
  const userRole = computed(() => store.getters.getUserRole);
  const userPhoto = computed(() => {
    const path = store.getters.getUserPhoto;
    const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:5000";

    if (!path) return null;

    // Check if the path is already an absolute URL
    return path.startsWith("http")
      ? path
      : `${baseURL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  });

  onMounted(() => {
    store.dispatch("initializeUserRole");

    document.addEventListener("click", (e) => {
      const el = document.querySelector(".your-profile-wrapper");
      if (el && !el.contains(e.target)) {
        showUserMenu.value = false;
        showSearch.value = false;
      }
    });
  });
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  /* Smooth transitions for all interactive elements */
  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced focus styles */
  button:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
    border-radius: 0.75rem;
  }

  /* Custom hover effects */
  .group:hover .group-hover\:shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* Backdrop blur support */
  @supports (backdrop-filter: blur(8px)) {
    .backdrop-blur-sm {
      backdrop-filter: blur(8px);
    }
  }
</style>

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

        <ChevronDown
          :class="[
            'w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-200 group-hover:text-slate-600',
            showUserMenu ? 'rotate-180' : '',
          ]"
        />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-slate-200 animate-fade-in backdrop-blur-sm"
      >
        <!-- User Info -->
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
          <!-- Profile -->
          <a
            href="#"
            class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
          >
            <div
              class="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-200"
            >
              <User class="w-4 h-4 text-blue-600" />
            </div>
            <router-link
              to="/profile"
              class="block"
            >
              <div>
                <div class="font-medium">Profile</div>
                <div class="text-xs text-slate-500">View and edit profile</div>
              </div>
            </router-link>
          </a>

          <!-- Settings -->
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

          <!-- Conditional School Menu Items -->
          <template v-if="hasSchool">
            <!-- School Details -->
            <router-link
              to="/schoolDetails"
              class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 transition-all duration-200 group"
            >
              <div
                class="p-2 bg-cyan-100 rounded-lg mr-3 group-hover:bg-cyan-200 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">School Details</div>
                <div class="text-xs text-slate-500">
                  View school information
                </div>
              </div>
            </router-link>
          </template>

          <template v-else-if="userRole === 'admin' && !hasSchool">
            <!-- Create School -->
            <router-link
              to="/createSchool"
              class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-all duration-200 group"
            >
              <div
                class="p-2 bg-indigo-100 rounded-lg mr-3 group-hover:bg-indigo-200 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">Create School</div>
                <div class="text-xs text-slate-500">Add a new school</div>
              </div>
            </router-link>
          </template>

          <!-- Divider -->
          <div class="border-t border-slate-100 my-2"></div>

          <!-- Sign Out -->
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
  import { ref, computed, onMounted } from "vue";
  import { User, ChevronDown, Settings, LogOut } from "lucide-vue-next";
  import store from "@/store";

  // State
  const showUserMenu = ref(false);
  const showSearch = ref(false);

  // Actions
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };

  // Getters
  const currentUser = computed(() => store.state.currentUserDetails);
  const userName = computed(() => store.getters.getUserName);
  const userRole = computed(() => store.getters.getUserRole);
  const userPhoto = computed(() => {
    const photo = currentUser.value?.photo;
    const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:5000";

    return photo
      ? photo.startsWith("http")
        ? photo
        : `${baseURL}/${photo}`
      : null;
  });
  // School presence checker
  const hasSchool = computed(() => !!store.state.schoolId);

  // Close dropdown on outside click
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

  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  button:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
    border-radius: 0.75rem;
  }

  .group:hover .group-hover\:shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @supports (backdrop-filter: blur(8px)) {
    .backdrop-blur-sm {
      backdrop-filter: blur(8px);
    }
  }
</style>

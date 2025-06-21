<template>
  <div
    class="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200"
  >
    <div class="text-right hidden lg:block">
      <div class="text-sm font-medium text-gray-900">Dr. Sarah Johnson</div>
      <div class="text-xs text-gray-500">Principal • Greenwood High</div>
    </div>
    <div class="relative">
      <button
        @click="toggleUserMenu"
        class="flex items-center space-x-1 sm:space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <div
          class="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center"
        >
          <User class="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
        </div>
        <ChevronDown
          class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 hidden sm:block"
        />
      </button>

      <!-- User Dropdown Menu -->
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
      >
        <a
          href="#"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <User class="w-4 h-4 mr-2" />
          Profile
        </a>
        <a
          href="#"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Settings class="w-4 h-4 mr-2" />
          Settings
        </a>
        <a
          href="#"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Sign out
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { User, ChevronDown, Settings, LogOut } from "lucide-vue-next";

  export default {
    name: "SchoolHeader",
    components: {
      User,
      ChevronDown,

      Settings,
      LogOut,
    },
    data() {
      return {
        showUserMenu: false,
        showSearch: false,
      };
    },
    methods: {
      toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
      },
    },
    mounted() {
      // Close dropdowns when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showUserMenu = false;
          this.showSearch = false;
          this.showCalendar = false;
        }
      });
    },
  };
</script>

<style></style>

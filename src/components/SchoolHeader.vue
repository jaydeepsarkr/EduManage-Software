<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <!-- Main Header -->
    <div class="px-4 sm:px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Left Section - Title and Info -->
        <div class="flex items-center space-x-4 min-w-0 flex-1">
          <div class="min-w-0 flex-1">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {{ getCurrentPageTitle() }}
            </h2>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1"
            >
              <p class="text-sm text-gray-500 truncate">
                {{ getCurrentPageDescription() }}
              </p>
              <!-- Academic Session Badge -->
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1 sm:mt-0 w-fit"
              >
                Session 2024-25
              </span>
            </div>
          </div>
        </div>

        <!-- Right Section - Stats and Actions -->
        <div class="flex items-center space-x-2 sm:space-x-6">
          <!-- Quick School Stats - Hidden on mobile, shown on large screens -->
          <div
            class="hidden xl:flex items-center space-x-6 px-6 border-l border-gray-200"
          >
            <div class="text-center">
              <div class="flex items-center space-x-1">
                <Users class="w-4 h-4 text-green-600" />
                <span class="text-lg font-semibold text-gray-900">1,247</span>
              </div>
              <div class="text-xs text-gray-500">Total Students</div>
            </div>
            <div class="text-center">
              <div class="flex items-center space-x-1">
                <UserCheck class="w-4 h-4 text-blue-600" />
                <span class="text-lg font-semibold text-gray-900">89</span>
              </div>
              <div class="text-xs text-gray-500">Teaching Staff</div>
            </div>
            <div class="text-center">
              <div class="flex items-center space-x-1">
                <ClipboardCheck class="w-4 h-4 text-orange-600" />
                <span class="text-lg font-semibold text-gray-900">94.2%</span>
              </div>
              <div class="text-xs text-gray-500">Attendance Today</div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <!-- Emergency Alert -->
            <button
              class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Emergency Alerts"
            >
              <AlertTriangle class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <!-- Attendance Quick Mark - Hidden on small screens -->
            <button
              class="hidden sm:block p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
              title="Quick Attendance"
            >
              <ClipboardCheck class="w-5 h-5" />
            </button>

            <!-- School Calendar - Hidden on small screens -->
            <button
              class="hidden sm:block p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="School Calendar"
            >
              <Calendar class="w-5 h-5" />
            </button>

            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Notifications"
            >
              <Bell class="w-4 h-4 sm:w-5 sm:h-5" />
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
                ></span>
              </span>
            </button>

            <!-- Search -->
            <button
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Search Students, Teachers, Classes"
            >
              <Search class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <!-- User Profile Dropdown -->
            <div
              class="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200"
            >
              <div class="text-right hidden lg:block">
                <div class="text-sm font-medium text-gray-900">
                  Dr. Sarah Johnson
                </div>
                <div class="text-xs text-gray-500">
                  Principal • Greenwood High
                </div>
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
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Settings</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Stats Section - Visible only on mobile when expanded -->
    <div
      v-if="showMobileStats"
      class="xl:hidden px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200"
    >
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-1">
            <Users class="w-4 h-4 text-green-600" />
            <span class="text-sm font-semibold text-gray-900">1,247</span>
          </div>
          <div class="text-xs text-gray-500">Students</div>
        </div>
        <div class="text-center">
          <div class="flex items-center justify-center space-x-1">
            <UserCheck class="w-4 h-4 text-blue-600" />
            <span class="text-sm font-semibold text-gray-900">89</span>
          </div>
          <div class="text-xs text-gray-500">Staff</div>
        </div>
        <div class="text-center">
          <div class="flex items-center justify-center space-x-1">
            <ClipboardCheck class="w-4 h-4 text-orange-600" />
            <span class="text-sm font-semibold text-gray-900">94.2%</span>
          </div>
          <div class="text-xs text-gray-500">Attendance</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import {
    // Menu,
    Users,
    UserCheck,
    ClipboardCheck,
    AlertTriangle,
    Calendar,
    Bell,
    Search,
    User,
    ChevronDown,
    // Clock,
    // X,
  } from "lucide-vue-next";

  export default {
    name: "SchoolHeader",
    components: {
      //   Menu,
      Users,
      UserCheck,
      ClipboardCheck,
      AlertTriangle,
      Calendar,
      Bell,
      Search,
      User,
      ChevronDown,
      //   Clock,
      //   X,
    },
    data() {
      return {
        showUserMenu: false,
        showMobileMenu: false,
        showMobileStats: false,
      };
    },
    methods: {
      getCurrentPageTitle() {
        return "Wellcome back!";
      },
      getCurrentPageDescription() {
        return "Here's what's happening at your school today.";
      },
      toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
      },
      toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu;
      },
      closeMobileMenu() {
        this.showMobileMenu = false;
        this.showMobileStats = false;
      },
      toggleMobileStats() {
        this.showMobileStats = !this.showMobileStats;
      },
    },
    mounted() {
      // Close dropdowns when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showUserMenu = false;
        }
      });
    },
  };
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <!-- Main Header -->
    <div class="px-4 sm:px-6 py-3 sm:py-4">
      <div class="flex items-center justify-between">
        <!-- Left Section - Title and Info (Mobile: Centered, Desktop: Left) -->
        <div class="flex items-center space-x-4 min-w-0 flex-1 sm:flex-initial">
          <div class="min-w-0 flex-1 text-center sm:text-left">
            <h2
              class="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate"
            >
              {{ getCurrentPageTitle() }}
            </h2>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1"
            >
              <p
                class="text-indigo-800 truncate bg-indigo-100 mt-1 sm:mt-0 w-fit mx-auto sm:mx-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ getCurrentPageDescription() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section - Desktop Stats and Actions (Hidden on Mobile) -->
        <div class="hidden sm:flex items-center space-x-2 md:space-x-6">
          <!-- Quick School Stats - Hidden on mobile, shown on large screens -->
          <div class="hidden lg:block">
            <TodaysData />
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center space-x-1 md:space-x-2">
            <!-- School Calendar - Hidden on small screens -->
            <div class="hidden md:block">
              <Calender />
            </div>

            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Notifications"
            >
              <Bell class="w-4 h-4 md:w-5 md:h-5" />
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
            <div class="hidden md:block">
              <SearchBar />
            </div>
          </div>
        </div>

        <!-- Mobile User Profile (Always Visible) -->
        <div class="flex items-center ml-4 sm:ml-0">
          <UserProfile />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { Bell } from "lucide-vue-next";
  import Calender from "./Calender/Calender.vue";
  import UserProfile from "./UserProfile/UserProfile .vue";
  import SearchBar from "@/components/Header/Search/Search.vue";
  import TodaysData from "@/components/Header/TodaysData/Data.vue";

  export default {
    name: "SchoolHeader",
    components: {
      TodaysData,
      Bell,
      SearchBar,
      UserProfile,
      Calender,
    },
    data() {
      return {};
    },
    methods: {
      getCurrentPageTitle() {
        return "Welcome back 😊!";
      },
      getCurrentPageDescription() {
        return "what's happening at your school today.";
      },
    },
  };
</script>

<style scoped>
  /* Mobile-first optimizations */
  @media (max-width: 640px) {
    /* Ensure text doesn't get too small on mobile */
    .text-base {
      font-size: 0.95rem;
      line-height: 1.4;
    }

    /* Optimize spacing for mobile */
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    /* Center alignment for mobile */
    .text-center {
      text-align: center;
    }
  }

  /* Smooth transitions */
  .transition-colors {
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Ensure proper touch targets on mobile */
  @media (max-width: 640px) {
    button {
      min-height: 44px;
      min-width: 44px;
    }
  }
</style>

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
              <p
                class="text-indigo-800 truncate bg-indigo-100 mt-1 sm:mt-0 w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ getCurrentPageDescription() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section - Stats and Actions -->
        <div class="flex items-center space-x-2 sm:space-x-6">
          <!-- Quick School Stats - Hidden on mobile, shown on large screens -->
          <TodaysData />

          <!-- Quick Actions -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <!-- School Calendar - Hidden on small screens -->
            <Calender />
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
            <SearchBar />

            <!-- User Profile Dropdown -->
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { Bell } from "lucide-vue-next";
  import Calender from "./Calender/Calender.vue";
  import UserProfile from "@/components/Header/UserProfile/UserProfile .vue";
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

<template>
  <header
    class="bg-white shadow-sm border-b border-gray-200 sm:sticky sm:top-0 sm:z-40"
  >
    <!-- Main Header -->
    <div class="px-4 sm:px-6 py-3 sm:py-4">
      <div class="flex items-center justify-between gap-4">
        <!-- Mobile-only Content: TodaysData, Calender, Bell -->
        <!-- This section is visible only on mobile (screens smaller than 'sm') -->
        <div
          class="flex-1 flex justify-center items-center space-x-4 sm:hidden"
        >
          <!-- Explicitly setting 'block' to try and override any internal 'hidden' classes -->
          <div class="block">
            <TodaysData />
          </div>
          <div class="block">
            <Calender />
          </div>
          <button
            class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center justify-center min-h-10 min-w-10"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell class="w-4 h-4 md:w-5 md:h-5" />
            <span class="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
              ></span>
            </span>
          </button>
        </div>

        <!-- Desktop-only Content: Title/Description -->
        <!-- This section is visible only on desktop (screens 'sm' and larger) -->
        <div class="flex-1 min-w-0 text-center sm:text-left hidden sm:block">
          <h2
            class="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate"
          >
            {{ getCurrentPageTitle() }}
          </h2>
          <div class="flex justify-center sm:justify-start mt-1">
            <p
              class="text-blue-800 truncate bg-blue-100 px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-medium w-fit"
            >
              {{ getCurrentPageDescription() }}
            </p>
          </div>
        </div>

        <!-- Right Section - Desktop Stats and Actions -->
        <!-- This section is visible only on desktop (screens 'sm' and larger) -->
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
              class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center justify-center min-h-10 min-w-10"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell class="w-4 h-4 md:w-5 md:h-5" />
              <span class="absolute -top-0.5 -right-0.5 flex h-3 w-3">
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
        <div class="flex items-center">
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

<style scoped></style>

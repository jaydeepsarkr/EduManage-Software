<template>
  <div class="relative">
    <button
      @click="toggleSearch"
      class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      title="Search Students, Teachers, Classes"
    >
      <Search class="w-4 h-4 sm:w-5 sm:h-5" />
    </button>

    <!-- Search Dropdown -->
    <div
      v-if="showSearch"
      class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div
        class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <div class="p-4">
          <h3 class="font-semibold text-sm mb-3 text-gray-900">
            Search School Directory
          </h3>

          <!-- Search Input -->
          <div class="relative mb-4">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search students, teachers, classes..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- No Results (Example UI only) -->
          <div class="text-center py-8 text-gray-500">
            <Search class="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p class="text-sm">No results found</p>
          </div>

          <!-- Suggestions (Static Note) -->
          <div class="text-center py-4 text-gray-500">
            <p class="text-sm">
              Start typing to search for students, teachers, or classes
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Search } from "lucide-vue-next";

  export default {
    name: "SchoolHeader",
    components: {
      Search,
    },
    data() {
      return {
        showSearch: false,
      };
    },
    methods: {
      // Search methods
      toggleSearch() {
        this.showSearch = !this.showSearch;
        if (this.showSearch) {
          this.$nextTick(() => {
            this.$refs.searchInput?.focus();
          });
        }
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

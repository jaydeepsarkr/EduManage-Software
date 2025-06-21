<template>
  <div class="relative">
    <button
      @click="toggleCalendar"
      class="hidden sm:block p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
      title="School Calendar"
    >
      <Calendar class="w-5 h-5" />
    </button>

    <!-- Calendar Dropdown -->
    <div
      v-if="showCalendar"
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div class="p-4">
        <h3 class="font-semibold text-sm mb-3 text-gray-900">
          School Calendar
        </h3>

        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-4">
          <button
            @click="previousMonth"
            class="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <h4 class="font-medium text-gray-900">
            {{ currentMonth }} {{ currentYear }}
          </h4>
          <button
            @click="nextMonth"
            class="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="day"
            class="text-xs font-medium text-gray-500 text-center py-2"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="date in calendarDates"
            :key="date.key"
            @click="selectDate(date)"
            :class="[
              'text-sm p-2 rounded hover:bg-blue-50 transition-colors',
              {
                'text-gray-400': !date.isCurrentMonth,
                'bg-blue-600 text-white hover:bg-blue-700': date.isSelected,
                'bg-blue-100 text-blue-900': date.isToday && !date.isSelected,
                'text-gray-900':
                  date.isCurrentMonth && !date.isSelected && !date.isToday,
              },
            ]"
          >
            {{ date.day }}
          </button>
        </div>

        <!-- Selected Date Info -->
        <div
          v-if="selectedDate"
          class="mt-4 p-3 bg-blue-50 rounded-lg"
        >
          <p class="font-medium text-blue-900 text-sm">
            Selected: {{ formatSelectedDate() }}
          </p>
          <p class="text-blue-700 text-xs mt-1">
            No events scheduled for this date
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Calendar, ChevronLeft, ChevronRight } from "lucide-vue-next";

  export default {
    name: "SchoolHeader",
    components: {
      Calendar,

      ChevronLeft,
      ChevronRight,
    },
    data() {
      return {
        showCalendar: false,
        selectedDate: new Date(),
        currentDate: new Date(),
      };
    },
    computed: {
      currentMonth() {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months[this.currentDate.getMonth()];
      },
      currentYear() {
        return this.currentDate.getFullYear();
      },
      calendarDates() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        // const lastDay = new Date(year, month + 1, 0);
        // First day of the week for the first day of the month
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const dates = [];
        const today = new Date();

        // Generate 42 days (6 weeks)
        for (let i = 0; i < 42; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);

          const isCurrentMonth = date.getMonth() === month;
          const isToday = date.toDateString() === today.toDateString();
          const isSelected =
            this.selectedDate &&
            date.toDateString() === this.selectedDate.toDateString();

          dates.push({
            day: date.getDate(),
            date: new Date(date),
            isCurrentMonth,
            isToday,
            isSelected,
            key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          });
        }

        return dates;
      },
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

      // Calendar methods
      toggleCalendar() {
        this.showCalendar = !this.showCalendar;
      },
      previousMonth() {
        this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() - 1,
          1
        );
      },
      nextMonth() {
        this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          1
        );
      },
      selectDate(dateObj) {
        this.selectedDate = new Date(dateObj.date);
      },
      formatSelectedDate() {
        return this.selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
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

<style scoped>
  .search-overlay-enter-active,
  .search-overlay-leave-active {
    transition: all 0.3s ease;
  }

  .search-overlay-enter-from,
  .search-overlay-leave-to {
    opacity: 0;
  }

  /* Search panel transitions */
  .search-panel-enter-active,
  .search-panel-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .search-panel-enter-from,
  .search-panel-leave-to {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  /* Calendar dropdown transitions */
  .calendar-dropdown-enter-active,
  .calendar-dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .calendar-dropdown-enter-from,
  .calendar-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }

  /* Dropdown transitions */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>

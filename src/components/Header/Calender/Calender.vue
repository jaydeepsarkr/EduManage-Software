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
          <div class="text-blue-700 text-xs mt-1">
            <template v-if="getEventsForDate(selectedDate).length">
              <p class="font-semibold">Events:</p>
              <ul class="list-disc ml-4 mt-1">
                <li
                  v-for="(event, idx) in getEventsForDate(selectedDate)"
                  :key="idx"
                >
                  {{ event.summary }} - {{ formatEventTime(event) }}
                </li>
              </ul>
            </template>
            <p v-else>No events scheduled for this date</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Calendar, ChevronLeft, ChevronRight } from "lucide-vue-next";

  export default {
    name: "SchoolCalendar",
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
        events: [],
        calendarId: process.env.VUE_APP_GOOGLE_CALENDAR_ID,
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      };
    },
    computed: {
      currentMonth() {
        return this.currentDate.toLocaleString("default", { month: "long" });
      },
      currentYear() {
        return this.currentDate.getFullYear();
      },
      calendarDates() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const dates = [];
        const today = new Date();

        for (let i = 0; i < 42; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);

          dates.push({
            day: date.getDate(),
            date: new Date(date),
            isCurrentMonth: date.getMonth() === month,
            isToday: date.toDateString() === today.toDateString(),
            isSelected:
              this.selectedDate &&
              date.toDateString() === this.selectedDate.toDateString(),
            key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          });
        }

        return dates;
      },
    },
    methods: {
      toggleCalendar() {
        this.showCalendar = !this.showCalendar;
      },
      previousMonth() {
        this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() - 1,
          1
        );
        this.fetchCalendarEvents();
      },
      nextMonth() {
        this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          1
        );
        this.fetchCalendarEvents();
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
      async fetchCalendarEvents() {
        const timeMin = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          1
        ).toISOString();
        const timeMax = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          0
        ).toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          this.events = data.items || [];
        } catch (err) {
          console.error("Error fetching calendar events", err);
        }
      },
      getEventsForDate(date) {
        return this.events.filter((event) => {
          const eventDate = new Date(event.start.date || event.start.dateTime);
          return eventDate.toDateString() === date.toDateString();
        });
      },
      formatEventTime(event) {
        const start = event.start.dateTime || event.start.date;
        return new Date(start).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    mounted() {
      this.fetchCalendarEvents();
      document.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showCalendar = false;
        }
      });
    },
  };
</script>

<style scoped>
  button:focus {
    outline: none;
  }
</style>

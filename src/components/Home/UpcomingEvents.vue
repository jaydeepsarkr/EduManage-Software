<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Events This Month</h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <template v-if="currentMonthEvents.length">
          <div
            v-for="event in currentMonthEvents"
            :key="event.id"
            class="flex items-center space-x-3"
          >
            <div
              class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"
            >
              <Calendar class="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ event.summary || "Untitled Event" }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatEventTime(event) }}
              </p>
            </div>
          </div>
        </template>
        <p
          v-else
          class="text-sm text-gray-500"
        >
          No events scheduled this month
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Calendar } from "lucide-vue-next";
  import { computed } from "vue";
  import { useStore } from "vuex";

  // Access Vuex store
  const store = useStore();

  // Get all events stored in Vuex
  const events = computed(() => store.getters.getUpcomingEvents || []);

  // Filter events for the current month
  const currentMonthEvents = computed(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return events.value.filter((event) => {
      const dateStr = event.start?.dateTime || event.start?.date;
      if (!dateStr) return false;
      const date = new Date(dateStr);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });
  });

  // Format event start time for display
  function formatEventTime(event) {
    const start = event.start?.dateTime || event.start?.date;
    const date = new Date(start);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        Events This Month ({{ currentMonthEvents.length }})
      </h3>
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

<script>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { Calendar } from "lucide-vue-next";

  export default {
    name: "EventsThisMonth",
    components: { Calendar },
    setup() {
      const store = useStore();
      const currentDate = ref(new Date());
      const events = computed(() => store.getters.getUpcomingEvents || []);

      const calendarId = process.env.VUE_APP_GOOGLE_CALENDAR_ID;
      const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;

      const fetchEventsForMonth = async () => {
        if (!currentDate.value || isNaN(currentDate.value.getTime())) {
          console.warn("Invalid currentDate");
          return;
        }

        const timeMin = new Date(
          currentDate.value.getFullYear(),
          currentDate.value.getMonth(),
          1
        ).toISOString();

        const timeMax = new Date(
          currentDate.value.getFullYear(),
          currentDate.value.getMonth() + 1,
          0
        ).toISOString();

        try {
          await store.dispatch("fetchUpcomingEvents", {
            calendarId,
            apiKey,
            timeMin,
            timeMax,
          });
        } catch (error) {
          console.error("Error fetching calendar events:", error);
        }
      };

      const formatEventTime = (event) => {
        const start = event.start?.dateTime || event.start?.date;
        const date = new Date(start);
        return date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      const currentMonthEvents = computed(() => {
        return events.value
          .filter((event) => {
            const start = event.start?.dateTime || event.start?.date;
            if (!start) return false;
            const date = new Date(start);
            return (
              date.getMonth() === currentDate.value.getMonth() &&
              date.getFullYear() === currentDate.value.getFullYear()
            );
          })
          .sort((a, b) => {
            const aTime = new Date(a.start?.dateTime || a.start?.date);
            const bTime = new Date(b.start?.dateTime || b.start?.date);
            return aTime - bTime;
          });
      });

      onMounted(() => {
        fetchEventsForMonth();
      });

      return {
        currentMonthEvents,
        formatEventTime,
      };
    },
  };
</script>

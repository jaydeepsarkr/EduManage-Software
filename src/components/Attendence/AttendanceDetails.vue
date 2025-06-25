<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Attendance Dashboard
        </h1>
        <p class="text-gray-600">
          Track and manage student attendance with ease
        </p>
      </div>

      <!-- Filter Section -->
      <div
        class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8 hover:shadow-xl transition-all duration-300"
      >
        <div
          class="flex flex-col lg:flex-row gap-4 items-center justify-between"
        >
          <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <!-- Search Input -->
            <div class="relative flex-1 sm:w-80 group">
              <Search
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
              />
              <input
                v-model="search"
                type="text"
                placeholder="Search student by name..."
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
              />
            </div>

            <!-- Class Dropdown -->
            <div class="relative group">
              <GraduationCap
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
              />
              <select
                v-model="selectedClass"
                class="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 appearance-none w-40"
              >
                <option value="">All Classes</option>
                <option
                  v-for="n in 10"
                  :key="n"
                  :value="n"
                >
                  Class {{ n }}
                </option>
              </select>
              <ChevronDown
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              />
            </div>

            <!-- Date Picker -->
            <div class="relative group">
              <Calendar
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
              />
              <input
                v-model="selectedDate"
                type="date"
                class="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 w-44"
              />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Filter class="w-4 h-4" />
            </button>
            <button
              class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <RefreshCw class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Present Students -->
        <div
          class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors"
            >
              <UserCheck class="w-6 h-6" />
            </div>
            <span class="text-xs font-medium bg-white/20 px-3 py-1 rounded-full"
              >Today</span
            >
          </div>
          <h3 class="text-lg font-semibold mb-2">Present Students</h3>
          <p class="text-3xl font-bold mb-2">{{ stats.today?.present || 0 }}</p>
          <p class="text-emerald-100">
            Out of {{ stats.today?.total || 0 }} students
          </p>
        </div>

        <!-- Absent Students -->
        <div
          class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors"
            >
              <UserX class="w-6 h-6" />
            </div>
            <span class="text-xs font-medium bg-white/20 px-3 py-1 rounded-full"
              >Today</span
            >
          </div>
          <h3 class="text-lg font-semibold mb-2">Absent Students</h3>
          <p class="text-3xl font-bold mb-2">{{ stats.today?.absent || 0 }}</p>
          <p class="text-red-100">
            {{ getAttendancePercentage() }}% attendance rate
          </p>
        </div>

        <!-- On Leave -->
        <div
          class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors"
            >
              <Clock class="w-6 h-6" />
            </div>
            <span class="text-xs font-medium bg-white/20 px-3 py-1 rounded-full"
              >Today</span
            >
          </div>
          <h3 class="text-lg font-semibold mb-2">On Leave</h3>
          <p class="text-3xl font-bold mb-2">{{ stats.today?.leave || 0 }}</p>
          <p class="text-amber-100">Approved leaves</p>
        </div>

        <!-- Average Attendance -->
        <div
          class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors"
            >
              <TrendingUp class="w-6 h-6" />
            </div>
            <span class="text-xs font-medium bg-white/20 px-3 py-1 rounded-full"
              >7 Days</span
            >
          </div>
          <h3 class="text-lg font-semibold mb-2">Avg Attendance</h3>
          <p class="text-3xl font-bold mb-2">{{ getWeeklyAverage() }}%</p>
          <p class="text-blue-100">Past week average</p>
        </div>
      </div>

      <!-- Attendance History Table -->
      <div
        class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div class="p-6 border-b border-gray-200/50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-1">
                Recent Attendance Records
              </h3>
              <p class="text-gray-600">Latest attendance entries and updates</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
              >
                <MoreVertical class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50/50 border-b border-gray-200/50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Teacher
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody class="bg-white/50 divide-y divide-gray-200/50">
              <tr
                v-for="entry in history"
                :key="entry._id"
                class="hover:bg-indigo-50/50 transition-all duration-200 group"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <Calendar
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                    <span class="text-sm font-semibold text-gray-900">{{
                      formatDate(entry.date)
                    }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"
                    >
                      <span class="text-sm font-bold text-white">{{
                        getInitials(entry.studentName)
                      }}</span>
                    </div>
                    <span class="text-sm font-semibold text-gray-900">{{
                      entry.studentName || "N/A"
                    }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(entry.status)"
                    class="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-full shadow-sm"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="getStatusDotClass(entry.status)"
                    ></div>
                    {{ capitalizeStatus(entry.status) }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <User
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                    <span class="text-sm font-medium text-gray-700">{{
                      entry.teacherName || "N/A"
                    }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <Clock
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                    <span class="text-sm font-medium text-gray-700">{{
                      formatTime(entry.date)
                    }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div
            v-if="!history || history.length === 0"
            class="text-center py-16"
          >
            <div
              class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ClipboardList class="w-10 h-10 text-indigo-500" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              No attendance records found
            </h3>
            <p class="text-gray-600">
              Try adjusting your filters or check back later.
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-8 px-2">
        <div class="text-sm text-gray-600 font-medium">
          Showing <span class="font-bold text-gray-900">1</span> to
          <span class="font-bold text-gray-900">{{
            Math.min(20, history?.length || 0)
          }}</span>
          of
          <span class="font-bold text-gray-900">{{
            history?.length || 0
          }}</span>
          results
        </div>
        <div class="flex items-center gap-1">
          <button
            class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            class="px-4 py-2 text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            1
          </button>
          <button
            class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
          >
            2
          </button>
          <button
            class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useStore } from "vuex";
  import {
    Search,
    Calendar,
    GraduationCap,
    ChevronDown,
    Filter,
    RefreshCw,
    UserCheck,
    UserX,
    Clock,
    TrendingUp,
    User,
    MoreVertical,
    ClipboardList,
    ChevronLeft,
    ChevronRight,
  } from "lucide-vue-next";

  const store = useStore();

  // Form fields
  const search = ref("");
  const selectedClass = ref("");
  const selectedDate = ref("");

  // Attendance data from Vuex
  const history = computed(() => store.getters.getAttendanceHistory);
  const stats = computed(() => store.getters.getAttendanceStats);

  // Utility functions
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "absent":
        return "bg-red-100 text-red-800 border border-red-200";
      case "leave":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const getStatusDotClass = (status) => {
    switch (status) {
      case "present":
        return "bg-emerald-500";
      case "absent":
        return "bg-red-500";
      case "leave":
        return "bg-yellow-500";
      default:
        return "bg-slate-500";
    }
  };

  const capitalizeStatus = (status) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getAttendancePercentage = () => {
    const today = stats.value?.today;
    if (!today || !today.total) return 0;
    return Math.round((today.present / today.total) * 100);
  };

  const getWeeklyAverage = () => {
    const daily = stats.value?.daily;
    if (!daily || daily.length === 0) return 0;

    const totalDays = daily.slice(0, 7);
    const avgPercentage =
      totalDays.reduce((acc, day) => {
        const total = day.totalPresent + day.totalAbsent;
        return acc + (total > 0 ? (day.totalPresent / total) * 100 : 0);
      }, 0) / totalDays.length;

    return Math.round(avgPercentage);
  };

  // Fetch on mount
  onMounted(() => {
    fetchFilteredHistory();
    store.dispatch("fetchAttendanceStats");
  });

  // Watchers for filters
  watch([search, selectedClass, selectedDate], () => {
    fetchFilteredHistory();
  });

  // Filtered fetch function
  async function fetchFilteredHistory() {
    const filters = {
      page: 1,
      limit: 1,
      search: search.value || "",
      class: selectedClass.value || "",
    };

    if (selectedDate.value) {
      filters.startDate = selectedDate.value;
      filters.endDate = selectedDate.value;
    }

    await store.dispatch("fetchAttendanceHistory", filters);
  }
</script>

<style scoped>
  /* Custom scrollbar */
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Custom select arrow */
  select {
    background-image: none;
  }
</style>

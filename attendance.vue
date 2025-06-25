<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <!-- Header -->
      <div class="mb-8 lg:mb-12">
        <div class="text-center lg:text-left">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Attendance Dashboard
          </h1>
          <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Track and manage student attendance with ease and precision
          </p>
        </div>
      </div>

      <!-- Filter Section -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 mb-8 lg:mb-12 hover:shadow-3xl transition-all duration-500 hover:bg-white/90"
      >
        <div
          class="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center justify-between"
        >
          <div
            class="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full xl:w-auto"
          >
            <!-- Search Input -->
            <div class="relative flex-1 sm:min-w-80 group">
              <Search
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-all duration-300"
              />
              <input
                v-model="search"
                type="text"
                placeholder="Search student by name..."
                class="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-900 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl"
              />
            </div>

            <!-- Class Dropdown -->
            <div class="relative group">
              <GraduationCap
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-all duration-300"
              />
              <select
                v-model="selectedClass"
                class="pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 appearance-none w-full sm:w-48 font-medium shadow-lg hover:shadow-xl text-gray-900"
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
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-indigo-500 transition-all duration-300"
              />
            </div>

            <!-- Date Picker -->
            <div class="relative group">
              <Calendar
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-all duration-300"
              />
              <input
                v-model="selectedDate"
                type="date"
                class="pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 w-full sm:w-52 font-medium shadow-lg hover:shadow-xl text-gray-900"
              />
            </div>
          </div>

          <div class="flex items-center justify-center xl:justify-end gap-3">
            <button
              class="p-4 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-sm"
            >
              <Filter class="w-5 h-5" />
            </button>
            <button
              class="p-4 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-sm"
            >
              <RefreshCw class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12"
      >
        <!-- Present Students -->
        <div
          class="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div
                class="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
              >
                <UserCheck class="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <span
                class="text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
                >Today</span
              >
            </div>
            <h3 class="text-lg lg:text-xl font-bold mb-3">Present Students</h3>
            <p class="text-4xl lg:text-5xl font-black mb-3">
              {{ stats.today?.present || 0 }}
            </p>
            <p class="text-emerald-100 font-medium">
              Out of {{ stats.today?.total || 0 }} students
            </p>
          </div>
        </div>

        <!-- Absent Students -->
        <div
          class="bg-gradient-to-br from-red-500 via-red-600 to-rose-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div
                class="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
              >
                <UserX class="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <span
                class="text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
                >Today</span
              >
            </div>
            <h3 class="text-lg lg:text-xl font-bold mb-3">Absent Students</h3>
            <p class="text-4xl lg:text-5xl font-black mb-3">
              {{ stats.today?.absent || 0 }}
            </p>
            <p class="text-red-100 font-medium">
              {{ getAttendancePercentage() }}% attendance rate
            </p>
          </div>
        </div>

        <!-- Late Students -->
        <div
          class="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div
                class="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
              >
                <Clock class="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <span
                class="text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
                >Today</span
              >
            </div>
            <h3 class="text-lg lg:text-xl font-bold mb-3">Late Students</h3>
            <p class="text-4xl lg:text-5xl font-black mb-3">
              {{ stats.today?.late || 0 }}
            </p>
            <p class="text-amber-100 font-medium">Late arrivals</p>
          </div>
        </div>

        <!-- Average Attendance -->
        <div
          class="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div
                class="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
              >
                <TrendingUp class="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <span
                class="text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
                >7 Days</span
              >
            </div>
            <h3 class="text-lg lg:text-xl font-bold mb-3">Avg Attendance</h3>
            <p class="text-4xl lg:text-5xl font-black mb-3">
              {{ getWeeklyAverage() }}%
            </p>
            <p class="text-blue-100 font-medium">Past week average</p>
          </div>
        </div>
      </div>

      <!-- Attendance History Table -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-all duration-500"
      >
        <div
          class="p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"
        >
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h3
                class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                Recent Attendance Records
              </h3>
              <p class="text-gray-600 font-medium">
                Latest attendance entries and updates
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <MoreVertical class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-full">
            <thead
              class="bg-gradient-to-r from-gray-50/80 to-indigo-50/80 border-b border-gray-200/50"
            >
              <tr>
                <th
                  class="px-4 sm:px-6 py-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-4 sm:px-6 py-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  class="px-4 sm:px-6 py-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 sm:px-6 py-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider hidden sm:table-cell"
                >
                  Teacher
                </th>
                <th
                  class="px-4 sm:px-6 py-5 text-left text-xs font-black text-gray-700 uppercase tracking-wider hidden lg:table-cell"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody class="bg-white/60 divide-y divide-gray-200/50">
              <tr
                v-for="entry in history"
                :key="entry._id"
                class="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
              >
                <td class="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <Calendar
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
                    />
                    <span class="text-sm font-bold text-gray-900">{{
                      formatDate(entry.date)
                    }}</span>
                  </div>
                </td>

                <td class="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center gap-4">
                    <div
                      class="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                    >
                      <span class="text-sm font-black text-white">{{
                        getInitials(entry.studentName)
                      }}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <span
                        class="text-sm font-bold text-gray-900 block truncate"
                        >{{ entry.studentName || "N/A" }}</span
                      >
                    </div>
                  </div>
                </td>

                <td class="px-4 sm:px-6 py-5 whitespace-nowrap">
                  <span
                    :class="getStatusClass(entry.status)"
                    class="inline-flex items-center gap-2 px-4 py-2 text-xs font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      class="w-2.5 h-2.5 rounded-full"
                      :class="getStatusDotClass(entry.status)"
                    ></div>
                    {{ capitalizeStatus(entry.status) }}
                  </span>
                </td>

                <td
                  class="px-4 sm:px-6 py-5 whitespace-nowrap hidden sm:table-cell"
                >
                  <div class="flex items-center gap-3">
                    <User
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
                    />
                    <span class="text-sm font-semibold text-gray-700">{{
                      entry.teacherName || "N/A"
                    }}</span>
                  </div>
                </td>

                <td
                  class="px-4 sm:px-6 py-5 whitespace-nowrap hidden lg:table-cell"
                >
                  <div class="flex items-center gap-3">
                    <Clock
                      class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
                    />
                    <span class="text-sm font-semibold text-gray-700">{{
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
            class="text-center py-20"
          >
            <div
              class="w-24 h-24 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <ClipboardList class="w-12 h-12 text-indigo-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              No attendance records found
            </h3>
            <p class="text-gray-600 font-medium max-w-md mx-auto">
              Try adjusting your filters or check back later for new attendance
              data.
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between mt-8 lg:mt-12 px-2 gap-4"
      >
        <!-- Results summary -->
        <div class="text-sm text-gray-600 font-semibold order-2 sm:order-1">
          Showing
          <span class="font-black text-gray-900">{{
            (currentPage - 1) * limit + 1
          }}</span>
          to
          <span class="font-black text-gray-900">{{
            Math.min(currentPage * limit, totalResults)
          }}</span>
          of
          <span class="font-black text-gray-900">{{ totalResults }}</span>
          results
        </div>

        <!-- Pagination buttons -->
        <div class="flex items-center gap-2 order-1 sm:order-2">
          <!-- Previous button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-3 text-sm font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-sm"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <!-- Numbered buttons -->
          <template
            v-for="page in totalPages"
            :key="page"
          >
            <button
              @click="goToPage(page)"
              :class="[
                'px-4 py-3 text-sm rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl',
                page === currentPage
                  ? 'font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 text-white hover:scale-105'
                  : 'font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 bg-white/70 backdrop-blur-sm hover:scale-105',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-3 text-sm font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-sm"
          >
            <ChevronRight class="w-5 h-5" />
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

  // Form filter fields
  const search = ref("");
  const selectedClass = ref("");
  const selectedDate = ref("");

  // Pagination state
  const currentPage = ref(1);

  // Getters from Vuex
  const history = computed(() => store.getters.getAttendanceHistory);
  const stats = computed(() => store.getters.getAttendanceStats);
  const pagination = computed(() => store.getters.getAttendancePagination);

  const totalPages = computed(() => pagination.value.pages || 1);
  const totalResults = computed(() => pagination.value.total || 0);
  const limit = computed(() => pagination.value.limit || 20);

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
        return "bg-emerald-100 text-emerald-800 border-2 border-emerald-200";
      case "absent":
        return "bg-red-100 text-red-800 border-2 border-red-200";
      case "leave":
        return "bg-yellow-100 text-yellow-800 border-2 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-800 border-2 border-slate-200";
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

  // Fetch attendance and stats on mount
  onMounted(() => {
    fetchFilteredHistory();
    store.dispatch("fetchAttendanceStats");
  });

  // Watch filters
  watch([search, selectedClass, selectedDate], () => {
    currentPage.value = 1;
    fetchFilteredHistory();
  });

  // Fetch data with filters
  async function fetchFilteredHistory() {
    const filters = {
      page: currentPage.value,
      limit: limit.value,
      search: search.value || "",
      class: selectedClass.value || "",
    };

    if (selectedDate.value) {
      filters.startDate = selectedDate.value;
      filters.endDate = selectedDate.value;
    }

    await store.dispatch("fetchAttendanceHistory", filters);
  }

  // Pagination navigation
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      fetchFilteredHistory();
    }
  }
</script>

<style scoped>
  /* Custom scrollbar */
  .overflow-x-auto::-webkit-scrollbar {
    height: 8px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
    border-radius: 4px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 4px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
  }

  /* Custom select arrow */
  select {
    background-image: none;
  }

  /* Enhanced animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .group:hover {
    animation: fadeInUp 0.3s ease-out;
  }

  /* Mobile responsive table */
  @media (max-width: 640px) {
    .overflow-x-auto {
      -webkit-overflow-scrolling: touch;
    }

    table {
      font-size: 14px;
    }

    th,
    td {
      padding: 12px 16px;
    }
  }

  /* Enhanced focus states */
  input:focus,
  select:focus,
  button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  /* Smooth transitions for all interactive elements */
  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>

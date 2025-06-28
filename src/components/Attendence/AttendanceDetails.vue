<template>
  <!-- Loading Overlay -->
  <div
    v-if="isInitialLoading"
    class="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
  >
    <div class="text-center">
      <div class="relative mb-6">
        <!-- Main Spinner -->
        <div
          class="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"
        ></div>
        <!-- Inner Spinner -->
        <div
          class="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto"
          style="animation-direction: reverse; animation-duration: 1.5s"
        ></div>
      </div>
      <div class="space-y-2">
        <h3 class="text-xl font-semibold text-gray-800">
          {{ loadingMessage }}
        </h3>
        <p class="text-sm text-gray-600">
          Please wait while we prepare your dashboard...
        </p>
        <!-- Loading Progress Dots -->
        <div class="flex justify-center space-x-1 mt-4">
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div
            class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          ></div>
        </div>
      </div>
    </div>
  </div>

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
                :disabled="isLoading"
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <!-- Search Loading Indicator -->
              <div
                v-if="isSearching"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <div
                  class="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
                ></div>
              </div>
            </div>

            <!-- Class Dropdown -->
            <div class="relative group">
              <GraduationCap
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
              />
              <select
                v-model="selectedClass"
                :disabled="isLoading"
                class="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 appearance-none w-40 disabled:opacity-50 disabled:cursor-not-allowed"
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
                :disabled="isLoading"
                class="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 w-44 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="">
              <button
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  isMineOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  isLoading ? 'opacity-50 cursor-not-allowed' : '',
                ]"
                @click="toggleView"
                :disabled="isLoading"
              >
                {{ isMineOnly ? "Showing: Mine Only" : "Showing: All" }}
              </button>
            </div>
            <button
              @click="refreshData"
              :disabled="isLoading"
              class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                :class="['w-4 h-4', isLoading ? 'animate-spin' : '']"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Present Students -->
        <div
          class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <!-- Loading Overlay for Stats Card -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </div>

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
          <p class="text-3xl font-bold mb-2">
            <template v-if="!isStatsLoading">{{
              stats.today?.present || 0
            }}</template>
            <template v-else>--</template>
          </p>
          <p class="text-emerald-100">
            Out of
            <template v-if="!isStatsLoading">{{
              stats.today?.total || 0
            }}</template>
            <template v-else>--</template>
            students
          </p>
        </div>

        <!-- Absent Students -->
        <div
          class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <!-- Loading Overlay for Stats Card -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </div>

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
          <p class="text-3xl font-bold mb-2">
            <template v-if="!isStatsLoading">{{
              stats.today?.absent || 0
            }}</template>
            <template v-else>--</template>
          </p>
          <p class="text-red-100">
            <template v-if="!isStatsLoading"
              >{{ getAttendancePercentage() }}%</template
            >
            <template v-else>--%</template>
            attendance rate
          </p>
        </div>

        <!-- On Leave -->
        <div
          class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <!-- Loading Overlay for Stats Card -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </div>

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
          <h3 class="text-lg font-semibold mb-2">Late</h3>
          <p class="text-3xl font-bold mb-2">
            <template v-if="!isStatsLoading">{{
              stats.today?.late || 0
            }}</template>
            <template v-else>--</template>
          </p>
          <p class="text-amber-100">late student</p>
        </div>

        <!-- Average Attendance -->
        <div
          class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <!-- Loading Overlay for Stats Card -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </div>

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
          <p class="text-3xl font-bold mb-2">
            <template v-if="!isStatsLoading"
              >{{ getWeeklyAverage() }}%</template
            >
            <template v-else>--%</template>
          </p>
          <p class="text-blue-100">Past week average</p>
        </div>
      </div>

      <!-- Attendance History Table -->
      <div
        class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 relative"
      >
        <!-- Table Loading Overlay -->
        <div
          v-if="isTableLoading"
          class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
        >
          <div class="text-center">
            <div
              class="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
            ></div>
            <p class="text-sm text-gray-600">{{ tableLoadingMessage }}</p>
          </div>
        </div>

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
                :disabled="isLoading"
                class="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MoreVertical class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <!-- Table Skeleton Loading -->
          <div
            v-if="isTableLoading"
            class="p-6"
          >
            <div class="space-y-4">
              <div
                v-for="i in 5"
                :key="i"
                class="flex items-center space-x-4"
              >
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div class="flex items-center space-x-3">
                  <div
                    class="h-10 w-10 bg-gray-200 rounded-full animate-pulse"
                  ></div>
                  <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div
                  class="h-6 bg-gray-200 rounded-full w-20 animate-pulse"
                ></div>
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Actual Table -->
          <table
            v-else
            class="w-full"
          >
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
            v-if="!isTableLoading && (!history || history.length === 0)"
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

      <!-- Pagination Section -->
      <div class="flex items-center justify-between mt-8 px-2">
        <!-- Results summary -->
        <div class="text-sm text-gray-600 font-medium">
          <template v-if="!isTableLoading">
            Showing
            <span class="font-bold text-gray-900">
              {{ (currentPage - 1) * limit + 1 }}
            </span>
            to
            <span class="font-bold text-gray-900">
              {{ Math.min(currentPage * limit, totalResults) }}
            </span>
            of
            <span class="font-bold text-gray-900">
              {{ totalResults }}
            </span>
            results
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"
              ></div>
              <span>Loading results...</span>
            </div>
          </template>
        </div>

        <!-- Pagination buttons -->
        <div class="flex items-center gap-1">
          <!-- Previous button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || isTableLoading"
            class="px-3 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>

          <!-- Numbered buttons -->
          <template
            v-for="page in totalPages"
            :key="page"
          >
            <button
              @click="goToPage(page)"
              :disabled="isTableLoading"
              :class="[
                'px-3 py-2 text-sm rounded-xl transition-all duration-200',
                page === currentPage
                  ? 'font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                  : 'font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || isTableLoading"
            class="px-3 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

  // Loading States
  const isInitialLoading = ref(false);
  const isLoading = ref(false);
  const isStatsLoading = ref(false);
  const isTableLoading = ref(false);
  const isSearching = ref(false);
  const loadingMessage = ref("Loading dashboard...");
  const tableLoadingMessage = ref("Loading attendance records...");

  // Form filter fields
  const search = ref("");
  const selectedClass = ref("");
  const selectedDate = ref("");
  const isMineOnly = ref(false); // false = All, true = Mine only

  // Pagination state
  const currentPage = ref(1);

  // Getters from Vuex
  const history = computed(() => store.getters.getAttendanceHistory);
  const stats = computed(() => store.getters.getAttendanceStats);
  const pagination = computed(() => store.getters.getAttendancePagination);
  const totalPages = computed(() => pagination.value.pages ?? 0);
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
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "absent":
        return "bg-red-100 text-red-800 border border-red-200";
      case "late":
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
      case "late":
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
  onMounted(async () => {
    isInitialLoading.value = true;
    loadingMessage.value = "Initializing dashboard...";

    try {
      // Load stats and history in parallel
      await Promise.all([fetchStats(), fetchFilteredHistory()]);
    } finally {
      isInitialLoading.value = false;
    }
  });

  // Watch filters with debouncing for search
  let searchTimeout;
  watch(search, () => {
    clearTimeout(searchTimeout);
    isSearching.value = true;
    searchTimeout = setTimeout(() => {
      currentPage.value = 1;
      fetchFilteredHistory();
    }, 300);
  });

  watch([selectedClass, selectedDate, isMineOnly], () => {
    currentPage.value = 1;
    fetchFilteredHistory();
  });

  watch(
    () => pagination.value.page,
    (val) => {
      currentPage.value = val;
    }
  );

  // Fetch stats
  async function fetchStats() {
    isStatsLoading.value = true;
    try {
      await store.dispatch("fetchAttendanceStats");
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      isStatsLoading.value = false;
    }
  }

  // Fetch data with filters
  async function fetchFilteredHistory() {
    const isInitialLoad = currentPage.value === 1 && history.value.length === 0;

    if (isInitialLoad && !isInitialLoading.value) {
      isTableLoading.value = true;
      tableLoadingMessage.value = "Loading attendance records...";
    } else if (!isInitialLoading.value) {
      isTableLoading.value = true;
      tableLoadingMessage.value =
        currentPage.value === 1
          ? "Filtering records..."
          : `Loading page ${currentPage.value}...`;
    }

    try {
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

      if (isMineOnly.value) {
        filters.self = true;
      }

      await store.dispatch("fetchAttendanceHistory", filters);
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    } finally {
      isTableLoading.value = false;
      isSearching.value = false;
      isLoading.value = false;
    }
  }

  // Refresh all data
  async function refreshData() {
    isLoading.value = true;
    loadingMessage.value = "Refreshing dashboard data...";

    try {
      await Promise.all([fetchStats(), fetchFilteredHistory()]);
    } finally {
      isLoading.value = false;
    }
  }

  // Pagination navigation
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value && !isTableLoading.value) {
      currentPage.value = page;
      isTableLoading.value = true;
      tableLoadingMessage.value = `Loading page ${page}...`;
      fetchFilteredHistory();
    }
  }

  function toggleView() {
    if (!isLoading.value) {
      isMineOnly.value = !isMineOnly.value;
      currentPage.value = 1;
      isTableLoading.value = true;
      tableLoadingMessage.value = isMineOnly.value
        ? "Loading your records..."
        : "Loading all records...";
      fetchFilteredHistory();
    }
  }
</script>

<style scoped>
  /* Custom animations */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

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

  /* Loading overlay styles */
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  /* Disabled state improvements */
  .disabled\:opacity-50:disabled {
    opacity: 0.5;
  }

  .disabled\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }

  /* Skeleton loading animation */
  @keyframes skeleton-loading {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: skeleton-loading 1.5s infinite;
  }
</style>

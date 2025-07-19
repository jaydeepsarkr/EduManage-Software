<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8 font-sans"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Daily Summary Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8"
      >
        <div
          class="bg-white rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Teachers</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">
                {{ summaryStats.total }}
              </p>
            </div>
            <div
              class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-md"
            >
              <Users class="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Present Today</p>
              <p class="text-3xl font-bold text-green-600 mt-1">
                {{ summaryStats.present }}
              </p>
            </div>
            <div
              class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shadow-md"
            >
              <CheckCircle class="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Late Check-ins</p>
              <p class="text-3xl font-bold text-yellow-600 mt-1">
                {{ summaryStats.late }}
              </p>
            </div>
            <div
              class="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center shadow-md"
            >
              <Clock class="w-7 h-7 text-yellow-600" />
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Absent Today</p>
              <p class="text-3xl font-bold text-red-600 mt-1">
                {{ summaryStats.absent }}
              </p>
            </div>
            <div
              class="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shadow-md"
            >
              <XCircle class="w-7 h-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Main Teacher Grid -->
        <div class="xl:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl border border-white/20">
            <div class="p-6 border-b border-gray-100">
              <div
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4"
              >
                <h2 class="text-xl sm:text-2xl font-semibold text-gray-900">
                  Real-Time Attendance Monitor
                </h2>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="filter in filters"
                    :key="filter"
                    @click="activeFilter = filter"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      activeFilter === filter
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100',
                    ]"
                  >
                    {{ filter }}
                  </button>
                </div>
              </div>
              <!-- New Filter/Search Bar -->
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="relative flex-1">
                  <Search
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  />
                  <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search teacher by name..."
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-sm"
                    :disabled="isTableLoading"
                  />
                  <div
                    v-if="isSearching"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div
                      class="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"
                    ></div>
                  </div>
                </div>
                <div class="relative">
                  <CalendarDays
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  />
                  <input
                    type="date"
                    v-model="selectedDate"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-sm"
                    :disabled="isTableLoading"
                  />
                </div>
                <button
                  @click="fetchTeachersData(1)"
                  :disabled="isTableLoading"
                  class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RefreshCw
                    v-if="isTableLoading"
                    class="w-4 h-4 animate-spin"
                  />
                  <span v-else>Apply Filters</span>
                </button>
              </div>
            </div>
            <div class="p-6 relative">
              <div
                v-if="isTableLoading"
                class="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center"
              >
                <div class="text-center">
                  <div
                    class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
                  ></div>
                  <p class="text-sm text-gray-600">Loading teachers...</p>
                </div>
              </div>
              <div
                v-if="filteredTeachers.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div
                  v-for="teacher in filteredTeachers"
                  :key="teacher._id"
                  class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200 shadow-sm hover:shadow-md"
                >
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <img
                        :src="
                          teacher.photo || '/placeholder.svg?height=48&width=48'
                        "
                        :alt="teacher.name"
                        class="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                      />
                      <div
                        :class="[
                          'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                          getStatusColor(teacher.attendanceStatus),
                        ]"
                      ></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-medium text-gray-900 truncate">
                        {{ teacher.name }}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {{ teacher.subject }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-4 space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Check-in:</span>
                      <span class="text-sm font-medium text-gray-800">{{
                        teacher.checkInTime || "-"
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Check-out:</span>
                      <span class="text-sm font-medium text-gray-800">{{
                        teacher.checkOutTime || "-"
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Duration:</span>
                      <span class="text-sm font-medium text-gray-800">{{
                        teacher.duration || "-"
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Status:</span>
                      <span
                        :class="[
                          'text-sm font-medium',
                          getStatusTextColor(teacher.attendanceStatus),
                        ]"
                      >
                        {{ teacher.attendanceStatus || "N/A" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="text-center py-8 text-gray-500"
              >
                No teachers found for the selected filters.
              </div>
            </div>
            <!-- Pagination Section -->
            <div
              v-if="teachers.length > 0"
              class="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 space-y-4 sm:space-y-0 px-6 pb-6"
            >
              <!-- Results summary -->
              <div
                class="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left"
              >
                <template v-if="!isTableLoading">
                  Showing
                  <span class="font-bold text-gray-900">
                    {{ (currentPage - 1) * itemsPerPage + 1 }}
                  </span>
                  to
                  <span class="font-bold text-gray-900">
                    {{ Math.min(currentPage * itemsPerPage, totalResults) }}
                  </span>
                  of
                  <span class="font-bold text-gray-900">
                    {{ totalResults }}
                  </span>
                  results
                </template>
                <template v-else>
                  <div
                    class="flex items-center gap-2 justify-center sm:justify-start"
                  >
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
                  class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px] border border-gray-300"
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
                      'px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 min-h-[36px] min-w-[36px] border',
                      page === currentPage
                        ? 'font-bold bg-blue-600 text-white border-blue-600'
                        : 'font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 border-gray-300',
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
                  class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px] border border-gray-300"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Notifications -->
          <div
            class="bg-white rounded-2xl shadow-xl border border-white/20 p-6"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Notifications
            </h3>
            <div class="space-y-3">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm"
              >
                <AlertCircle
                  class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p class="text-sm font-medium text-yellow-800">
                    {{ notification.title }}
                  </p>
                  <p class="text-xs text-yellow-700">
                    {{ notification.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Working Hours Chart -->
          <div
            class="bg-white rounded-2xl shadow-xl border border-white/20 p-6"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Working Hours This Week
            </h3>
            <div class="space-y-4">
              <div
                v-for="day in weeklyHours"
                :key="day.day"
                class="flex items-center justify-between"
              >
                <span class="text-sm text-gray-600 font-medium">{{
                  day.day
                }}</span>
                <div class="flex items-center space-x-3">
                  <div class="w-24 bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      :style="{ width: `${(day.hours / 8) * 100}%` }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-gray-900 w-10 text-right"
                    >{{ day.hours }}h</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useStore } from "vuex";
  import {
    Users,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Search,
    CalendarDays,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
  } from "lucide-vue-next";

  const store = useStore();

  // Reactive data
  const activeFilter = ref("All");

  const searchQuery = ref("");
  const selectedDate = ref(new Date().toISOString().split("T")[0]);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);

  // Loading states
  const isTableLoading = ref(false);
  const isSearching = ref(false);

  const filters = ref(["All", "Present", "Late", "Absent"]);

  const teachers = computed(() => store.getters.getAllTeachers || []);
  const totalResults = computed(
    () => store.getters.getTeacherPagination?.totalResults || 0
  );
  const totalPages = computed(() => {
    const total = store.getters.getTeacherPagination?.totalResults || 0;
    const limit = itemsPerPage.value;
    return Math.ceil(total / limit);
  });

  const summaryStats = computed(() => {
    const total = teachers.value.length;
    const present = teachers.value.filter(
      (t) => t.attendanceStatus === "Present"
    ).length;
    const late = teachers.value.filter(
      (t) => t.attendanceStatus === "Late"
    ).length;
    const absent = teachers.value.filter(
      (t) => t.attendanceStatus === "Absent"
    ).length;
    return { total, present, late, absent };
  });

  // Filtered teachers (client-side filter based on activeFilter)
  const filteredTeachers = computed(() => {
    if (activeFilter.value === "All") {
      return teachers.value;
    }
    return teachers.value.filter(
      (teacher) => teacher.attendanceStatus === activeFilter.value
    );
  });

  // Notifications (static for now)
  const notifications = ref([
    {
      id: 1,
      title: "Late Check-ins",
      message: "2 teachers checked in late today",
    },
    {
      id: 2,
      title: "Missing Check-out",
      message: "3 teachers haven't checked out yet",
    },
  ]);

  // Weekly hours data (static for now)
  const weeklyHours = ref([
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 6.5 },
    { day: "Fri", hours: 7 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ]);

  // Methods
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500";
      case "Late":
        return "bg-yellow-500";
      case "Absent":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Late":
        return "text-yellow-600";
      case "Absent":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const fetchTeachersData = async (page = currentPage.value) => {
    isTableLoading.value = true;
    try {
      currentPage.value = page;
      await store.dispatch("fetchTeachers", {
        page: currentPage.value,
        limit: itemsPerPage.value,
        search: searchQuery.value.trim(),
        date: selectedDate.value, // Pass the selected date to the backend
      });
    } catch (error) {
      console.error("Error fetching teachers for dashboard:", error);
    } finally {
      isTableLoading.value = false;
      isSearching.value = false;
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && !isTableLoading.value) {
      fetchTeachersData(page);
    }
  };

  let searchTimeout = null;
  watch(searchQuery, () => {
    clearTimeout(searchTimeout);
    isSearching.value = true;
    searchTimeout = setTimeout(() => {
      fetchTeachersData(1);
    }, 300);
  });

  watch(selectedDate, () => {
    fetchTeachersData(1);
  });

  onMounted(() => {
    fetchTeachersData();
  });
</script>

<style scoped>
  /* Basic spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  /* Stronger Pulse animation for NFC scanner */
  @keyframes pulse-strong {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
  .animate-pulse-strong {
    animation: pulse-strong 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Backdrop blur for loading overlay */
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
</style>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-[15px] sm:text-3xl font-bold text-gray-900">
            Teacher Attendance Dashboard
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Notifications Bell -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            >
              <Bell class="h-6 w-6" />
              <span
                v-if="notifications.length > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ notifications.length }}
              </span>
            </button>

            <!-- Enhanced Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-[-28px] sm:right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50"
            >
              <div class="p-4 border-b bg-gray-50 rounded-t-lg">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-gray-900">Notifications</h3>
                  <span class="text-xs text-gray-500"
                    >{{ notifications.length }} items</span
                  >
                </div>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div
                  v-if="isLoadingNotifications"
                  class="p-6 text-center"
                >
                  <div
                    class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"
                  ></div>
                  <p class="text-sm text-gray-500">Loading notifications...</p>
                </div>
                <div
                  v-else-if="notifications.length === 0"
                  class="p-6 text-gray-500 text-center"
                >
                  <Bell class="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p class="text-sm">No new notifications</p>
                </div>
                <div
                  v-else
                  class="divide-y divide-gray-100"
                >
                  <div
                    v-for="notification in notifications"
                    :key="notification.id || notification"
                    class="p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div class="flex items-start space-x-3">
                      <!-- Notification Icon -->
                      <div
                        :class="[
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          getNotificationIconClass(notification),
                        ]"
                      >
                        <component
                          :is="getNotificationIcon(notification)"
                          class="w-4 h-4"
                        />
                      </div>

                      <!-- Notification Content -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                          <p
                            class="text-xs font-medium text-gray-600 uppercase tracking-wide"
                          >
                            {{ getNotificationTitle(notification) }}
                          </p>
                          <span
                            :class="[
                              'text-xs px-2 py-1 rounded-full',
                              getNotificationSeverityClass(notification),
                            ]"
                          >
                            {{ getNotificationSeverity(notification) }}
                          </span>
                        </div>
                        <p class="text-sm text-gray-900 mt-1">
                          {{ getNotificationMessage(notification) }}
                        </p>
                        <p class="text-xs text-gray-500 mt-1">
                          {{ formatNotificationTime(notification) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notification Footer -->
              <div class="p-3 border-t bg-gray-50 rounded-b-lg">
                <button
                  @click="refreshNotifications"
                  :disabled="isLoadingNotifications"
                  class="w-full text-xs text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                >
                  <RefreshCw
                    class="w-3 h-3 inline mr-1"
                    :class="{ 'animate-spin': isLoadingNotifications }"
                  />
                  Refresh Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <UserCheck class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Present Today</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ summaryStats.present }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Late Today</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ summaryStats.late }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <UserX class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Absent Today</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ summaryStats.absent }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Users class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Teachers</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ summaryStats.total }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div
          class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
            <input
              v-model="searchName"
              type="text"
              placeholder="Search by teacher name..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="debouncedSearch"
            />
          </div>

          <input
            v-model="selectedDate"
            type="date"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @change="fetchAttendanceData"
          />
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Show:</span>
          <select
            v-model="pageLimit"
            @change="fetchAttendanceData"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600">per page</span>
        </div>
      </div>
    </div>

    <!-- Attendance Table/Cards -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">
          Today's Teacher Attendance
        </h2>
      </div>

      <div
        v-if="isTableLoading"
        class="flex items-center justify-center py-12"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <span class="ml-2 text-gray-600">Loading attendance data...</span>
      </div>

      <div
        v-else-if="attendanceRecords.length === 0"
        class="text-center py-12"
      >
        <Users class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No attendance records found
        </h3>
        <p class="text-gray-500 mb-4">
          {{
            searchName
              ? "Try adjusting your search terms or filters."
              : "No attendance data available for the selected date."
          }}
        </p>
        <button
          @click="fetchAttendanceData(1)"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Refresh Data
        </button>
      </div>

      <div v-else>
        <!-- Mobile Cards View -->
        <div class="block md:hidden">
          <div class="divide-y divide-gray-200">
            <div
              v-for="record in attendanceRecords"
              :key="record._id"
              class="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="flex items-start space-x-3">
                <img
                  :src="
                    getTeacherPhoto(record) ||
                    '/placeholder.svg?height=40&width=40'
                  "
                  :alt="getTeacherName(record)"
                  class="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-medium text-gray-900 truncate">
                      {{ getTeacherName(record) }}
                    </h3>
                    <span
                      :class="getStatusBadgeClass(record.status)"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize"
                    >
                      {{ record.status }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 mb-2">
                    ID: {{ getTeacherId(record) }}
                  </p>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span class="text-gray-500">Check In:</span>
                      <p class="font-medium text-gray-900">
                        {{ formatTime(record.checkIn) }}
                      </p>
                    </div>
                    <div>
                      <span class="text-gray-500">Check Out:</span>
                      <p class="font-medium text-gray-900">
                        {{ formatTime(record.checkOut) }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="text-xs text-gray-500">Duration:</span>
                    <p class="text-xs font-medium text-gray-900">
                      {{ calculateDuration(record.checkIn, record.checkOut) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Teacher
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Check In
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Check Out
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="record in attendanceRecords"
                :key="record._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      :src="
                        getTeacherPhoto(record) ||
                        '/placeholder.svg?height=32&width=32'
                      "
                      :alt="getTeacherName(record)"
                      class="h-8 w-8 rounded-full object-cover"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ getTeacherName(record) }}
                      </div>
                      <div class="text-sm text-gray-500">
                        ID: {{ getTeacherId(record) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusBadgeClass(record.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize"
                  >
                    {{ record.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatTime(record.checkIn) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatTime(record.checkOut) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ calculateDuration(record.checkIn, record.checkOut) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="attendanceRecords.length > 0"
        class="bg-gray-50 px-4 md:px-6 py-3 flex items-center justify-between border-t border-gray-200"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage <= 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ getStartRecord() }}</span>
              to
              <span class="font-medium">{{ getEndRecord() }}</span>
              of
              <span class="font-medium">{{ attendanceTotal }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            >
              <button
                @click="previousPage"
                :disabled="currentPage <= 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="h-5 w-5" />
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="h-5 w-5" />
              </button>
            </nav>
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
    Bell,
    UserCheck,
    UserX,
    Clock,
    Users,
    Search,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Info,
  } from "lucide-vue-next";

  const store = useStore();

  // Reactive data

  const showNotifications = ref(false);
  const searchName = ref("");
  const selectedDate = ref(new Date().toISOString().split("T")[0]);
  const pageLimit = ref(10);
  const currentPage = ref(1);
  const isTableLoading = ref(false);
  const isLoadingNotifications = ref(false);

  // Computed properties from Vuex store
  const attendanceRecords = computed(() => {
    console.log(
      "📊 Current attendance records:",
      store.state.attendanceRecords
    );
    return store.state.attendanceRecords || [];
  });

  const attendanceTotal = computed(() => {
    console.log("📊 Total attendance count:", store.state.attendanceTotal);
    return store.state.attendanceTotal || 0;
  });

  const notifications = computed(() => {
    const rawNotifications = store.state.notifications || [];
    console.log("📊 Raw notifications from store:", rawNotifications);

    // Handle both string array and object array formats
    return rawNotifications.map((notification, index) => {
      if (typeof notification === "string") {
        return {
          id: `notification_${index}`,
          message: notification,
          type: "info",
          severity: "info",
          createdAt: new Date().toISOString(),
          title: "Attendance Alert",
        };
      }
      return notification;
    });
  });

  // Computed stats based on actual data
  const summaryStats = computed(() => {
    const records = attendanceRecords.value;
    const total = records.length;
    const present = records.filter((r) => r.status === "present").length;
    const late = records.filter((r) => r.status === "late").length;
    const absent = records.filter((r) => r.status === "absent").length;

    console.log("📊 Summary stats:", { total, present, late, absent });
    return { total, present, late, absent };
  });

  // Computed pagination
  const totalPages = computed(() =>
    Math.ceil(attendanceTotal.value / pageLimit.value)
  );
  const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, currentPage.value + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  // Helper methods to extract teacher data
  const getTeacherName = (record) => {
    return record.userId?.name || record.name || "Unknown Teacher";
  };

  const getTeacherPhoto = (record) => {
    return record.userId?.photo || record.photo || null;
  };

  const getTeacherId = (record) => {
    return record.userId?._id || record.userId || record._id || "N/A";
  };

  // Notification helper methods
  const getNotificationMessage = (notification) => {
    return notification.message || notification;
  };

  const getNotificationTitle = (notification) => {
    return notification.title || "Notification";
  };

  const getNotificationSeverity = (notification) => {
    return notification.severity || "info";
  };

  const getNotificationIcon = (notification) => {
    const severity = getNotificationSeverity(notification);
    switch (severity) {
      case "error":
        return AlertCircle;
      case "warning":
        return Clock;
      case "info":
        return Info;
      default:
        return CheckCircle;
    }
  };

  const getNotificationIconClass = (notification) => {
    const severity = getNotificationSeverity(notification);
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  const getNotificationSeverityClass = (notification) => {
    const severity = getNotificationSeverity(notification);
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const formatNotificationTime = (notification) => {
    const createdAt = notification.createdAt || new Date().toISOString();
    try {
      const date = new Date(createdAt);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Recently";
    }
  };

  // Methods
  const fetchAttendanceData = async (page = currentPage.value) => {
    isTableLoading.value = true;
    try {
      currentPage.value = Number(page);
      const limit = Number(pageLimit.value);

      console.log("📡 Fetching attendance data with params:", {
        page: currentPage.value,
        limit: limit,
        name: searchName.value.trim(),
        date: selectedDate.value,
      });

      await store.dispatch("fetchAttendanceForToday", {
        page: currentPage.value,
        limit: limit,
        name: searchName.value.trim(),
        date: selectedDate.value,
      });

      console.log("✅ Attendance data fetched successfully");
      console.log("📊 Records:", attendanceRecords.value);
      console.log("📊 Total:", attendanceTotal.value);
    } catch (error) {
      console.error("❌ Error fetching attendance data:", error);
    } finally {
      isTableLoading.value = false;
    }
  };

  const fetchNotifications = async () => {
    isLoadingNotifications.value = true;
    try {
      console.log("📡 Fetching notifications...");
      await store.dispatch("fetchAttendanceNotifications");
      console.log("✅ Notifications fetched:", notifications.value);
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    } finally {
      isLoadingNotifications.value = false;
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // Debounced search
  let searchTimeout;
  const debouncedSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage.value = 1;
      fetchAttendanceData();
    }, 500);
  };

  // Pagination methods
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchAttendanceData();
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchAttendanceData();
    }
  };

  const goToPage = (page) => {
    currentPage.value = page;
    fetchAttendanceData();
  };

  // Utility methods
  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "present":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Invalid Time";

      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid Time";
    }
  };

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "N/A";

    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Invalid";

      const diffMs = end - start;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (diffHours < 0 || diffMinutes < 0) return "Invalid";

      return `${diffHours}h ${diffMinutes}m`;
    } catch (error) {
      console.error("Error calculating duration:", error);
      return "Error";
    }
  };

  // Pagination helper methods
  const getStartRecord = () => {
    const start = (currentPage.value - 1) * Number(pageLimit.value) + 1;
    return isNaN(start) ? 1 : start;
  };

  const getEndRecord = () => {
    const end = Math.min(
      currentPage.value * Number(pageLimit.value),
      attendanceTotal.value
    );
    return isNaN(end) ? attendanceTotal.value : end;
  };

  // Watchers
  watch([pageLimit], () => {
    // Convert pageLimit to number to avoid NaN issues
    pageLimit.value = Number(pageLimit.value);
    currentPage.value = 1;
    fetchAttendanceData();
  });

  // Lifecycle
  onMounted(() => {
    console.log("🚀 Component mounted, fetching data...");
    fetchAttendanceData();
    fetchNotifications();
  });
</script>

<style scoped>
  /* Custom scrollbar for notifications */
  .max-h-80::-webkit-scrollbar {
    width: 4px;
  }

  .max-h-80::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .max-h-80::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  .max-h-80::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <!-- Daily Summary Cards -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Teachers</p>
                <p class="text-3xl font-bold text-gray-900">
                  {{ summaryStats.total }}
                </p>
              </div>
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <Users class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Present Today</p>
                <p class="text-3xl font-bold text-green-600">
                  {{ summaryStats.present }}
                </p>
              </div>
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <CheckCircle class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Late Check-ins</p>
                <p class="text-3xl font-bold text-yellow-600">
                  {{ summaryStats.late }}
                </p>
              </div>
              <div
                class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
              >
                <Clock class="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Absent Today</p>
                <p class="text-3xl font-bold text-red-600">
                  {{ summaryStats.absent }}
                </p>
              </div>
              <div
                class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"
              >
                <XCircle class="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <!-- Main Teacher Grid -->
          <div class="xl:col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100">
              <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold text-gray-900">
                    Real-Time Attendance Monitor
                  </h2>
                  <div class="flex space-x-2">
                    <button
                      v-for="filter in filters"
                      :key="filter"
                      @click="activeFilter = filter"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                        activeFilter === filter
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100',
                      ]"
                    >
                      {{ filter }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="teacher in filteredTeachers"
                    :key="teacher.id"
                    class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="relative">
                        <img
                          :src="teacher.photo"
                          :alt="teacher.name"
                          class="w-12 h-12 rounded-full object-cover"
                        />
                        <div
                          :class="[
                            'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                            getStatusColor(teacher.status),
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
                        <span class="text-sm font-medium">{{
                          teacher.checkIn || "-"
                        }}</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Check-out:</span>
                        <span class="text-sm font-medium">{{
                          teacher.checkOut || "-"
                        }}</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Duration:</span>
                        <span class="text-sm font-medium">{{
                          teacher.duration || "-"
                        }}</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Status:</span>
                        <span
                          :class="[
                            'text-sm font-medium',
                            getStatusTextColor(teacher.status),
                          ]"
                        >
                          {{ teacher.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="space-y-6">
            <!-- NFC Scan Simulator -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                NFC Scanner
              </h3>
              <div class="text-center">
                <div
                  :class="[
                    'w-32 h-32 mx-auto rounded-full border-4 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300',
                    isScanning
                      ? 'border-blue-500 bg-blue-50 animate-pulse'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                  ]"
                  @click="simulateNFCScan"
                >
                  <div class="text-center">
                    <Smartphone class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">
                      {{ isScanning ? "Scanning..." : "Tap to Scan" }}
                    </p>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  NFC Reader Status: {{ nfcStatus }}
                </p>
              </div>
            </div>

            <!-- Notifications -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Notifications
              </h3>
              <div class="space-y-3">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <AlertCircle class="w-5 h-5 text-yellow-600 mt-0.5" />
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
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Working Hours This Week
              </h3>
              <div class="space-y-3">
                <div
                  v-for="day in weeklyHours"
                  :key="day.day"
                  class="flex items-center justify-between"
                >
                  <span class="text-sm text-gray-600">{{ day.day }}</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${(day.hours / 8) * 100}%` }"
                      ></div>
                    </div>
                    <span class="text-sm font-medium text-gray-900 w-8"
                      >{{ day.hours }}h</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import {
    // GraduationCap,
    Users,
    CheckCircle,
    Clock,
    XCircle,
    Smartphone,
    AlertCircle,
  } from "lucide-vue-next";

  // Reactive data
  const currentTime = ref("");
  const currentDate = ref("");

  const activeFilter = ref("All");
  const isScanning = ref(false);
  const nfcStatus = ref("Ready");

  // Filters
  const filters = ref(["All", "Present", "Late", "Absent"]);

  // Sample teacher data
  const teachers = ref([
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "Mathematics",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: "08:15 AM",
      checkOut: "04:30 PM",
      duration: "8h 15m",
      status: "Present",
    },
    {
      id: 2,
      name: "Michael Chen",
      subject: "Physics",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: "08:45 AM",
      checkOut: null,
      duration: "6h 30m",
      status: "Late",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      subject: "English Literature",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: "08:00 AM",
      checkOut: "04:15 PM",
      duration: "8h 15m",
      status: "Present",
    },
    {
      id: 4,
      name: "David Thompson",
      subject: "Chemistry",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: null,
      checkOut: null,
      duration: "-",
      status: "Absent",
    },
    {
      id: 5,
      name: "Lisa Wang",
      subject: "Biology",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: "08:30 AM",
      checkOut: null,
      duration: "5h 45m",
      status: "Present",
    },
    {
      id: 6,
      name: "Robert Brown",
      subject: "History",
      photo: "/placeholder.svg?height=48&width=48",
      checkIn: "09:15 AM",
      checkOut: "04:00 PM",
      duration: "6h 45m",
      status: "Late",
    },
  ]);

  // Summary statistics
  const summaryStats = computed(() => {
    const total = teachers.value.length;
    const present = teachers.value.filter((t) => t.status === "Present").length;
    const late = teachers.value.filter((t) => t.status === "Late").length;
    const absent = teachers.value.filter((t) => t.status === "Absent").length;

    return { total, present, late, absent };
  });

  // Filtered teachers
  const filteredTeachers = computed(() => {
    if (activeFilter.value === "All") {
      return teachers.value;
    }
    return teachers.value.filter(
      (teacher) => teacher.status === activeFilter.value
    );
  });

  // Notifications
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

  // Weekly hours data
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
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    currentDate.value = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  const simulateNFCScan = () => {
    isScanning.value = true;
    nfcStatus.value = "Scanning...";

    setTimeout(() => {
      isScanning.value = false;
      nfcStatus.value = "Scan Complete";

      setTimeout(() => {
        nfcStatus.value = "Ready";
      }, 2000);
    }, 2000);
  };

  // Lifecycle
  let timeInterval;

  onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  });
</script>

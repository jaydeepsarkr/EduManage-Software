<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useStore } from "vuex";
  import {
    User,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    Calendar,
    FileText,
    Download,
    CheckCircle,
    XCircle,
    Clock,
    Shield,
    Award,
    BookOpen,
    IdCard,
    UserCheck,
    UserX,
    AlertTriangle,
    TrendingUp,
    BarChart3,
    Loader2,
    RefreshCw,
  } from "lucide-vue-next";

  const store = useStore();
  const student = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const retryCount = ref(0);

  // Get decoded userId from Vuex (set by initializeUserRole)
  const userId = computed(() => store.getters.getUserId);

  // Optimized fetch function with error handling and retry logic
  const fetchStudentProfile = async (showLoader = true) => {
    if (!userId.value) {
      error.value = "User ID not found";
      loading.value = false;
      return;
    }

    try {
      if (showLoader) loading.value = true;
      error.value = null;

      const user = await store.dispatch("fetchUserById", userId.value);
      console.log("Fetched user data:", user);

      if (user) {
        student.value = {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || "Not Available",
          address: user.address || "Not Available",
          class: user.class || "N/A",
          rollNumber: user.rollNumber || "N/A",
          status: user.status || "Active",
          enrollmentDate: user.enrollmentDate || new Date().toISOString(),
          photo: user.photo || "/placeholder.svg?height=200&width=200",
          role: user.role || "Student",
          aadhaarCard: user.aadhaarCard || "Not Available",
          birthCertificate: user.birthCertificate || "Not Available",
          transferCertificate: user.transferCertificate || "Not Available",
          marksheet: user.marksheet || "Not Available",
          // Attendance data - these should come from your backend
          totalDays: user.totalDays || 100,
          presentDays: user.presentDays || 85,
          absentDays: user.absentDays || 10,
          lateDays: user.lateDays || 5,
        };
        retryCount.value = 0;
      } else {
        throw new Error("Student profile not found");
      }
    } catch (err) {
      console.error("Error fetching student profile:", err);
      error.value = err.message || "Failed to fetch student profile";
      retryCount.value++;
    } finally {
      loading.value = false;
    }
  };

  // Retry function
  const retryFetch = () => {
    if (retryCount.value < 3) {
      fetchStudentProfile();
    }
  };

  // Watch for userId changes
  watch(
    userId,
    (newUserId) => {
      if (newUserId) {
        fetchStudentProfile();
      }
    },
    { immediate: false }
  );

  onMounted(() => {
    fetchStudentProfile();
  });

  // Computed attendance percentages
  const attendanceStats = computed(() => {
    if (!student.value) return null;

    const { totalDays, presentDays, absentDays, lateDays } = student.value;

    if (totalDays === 0) return null;

    return {
      presentPercentage: Math.round((presentDays / totalDays) * 100),
      absentPercentage: Math.round((absentDays / totalDays) * 100),
      latePercentage: Math.round((lateDays / totalDays) * 100),
      totalDays,
      presentDays,
      absentDays,
      lateDays,
    };
  });

  // Computed documents with optimized status logic
  const documents = computed(() => {
    if (!student.value) return [];

    const getDocumentStatus = (value) => {
      if (value === "Not Available") return "pending";
      if (value && value.trim() !== "") return "verified";
      return "available";
    };

    return [
      {
        name: "Aadhaar Card",
        value: student.value.aadhaarCard,
        status: getDocumentStatus(student.value.aadhaarCard),
        icon: IdCard,
        type: "number",
      },
      {
        name: "Birth Certificate",
        value: student.value.birthCertificate,
        status: getDocumentStatus(student.value.birthCertificate),
        icon: FileText,
        type: "document",
      },
      {
        name: "Transfer Certificate",
        value: student.value.transferCertificate,
        status: getDocumentStatus(student.value.transferCertificate),
        icon: FileText,
        type: "document",
      },
      {
        name: "Marksheet",
        value: student.value.marksheet,
        status: getDocumentStatus(student.value.marksheet),
        icon: Award,
        type: "document",
      },
    ];
  });

  // Computed profile completion
  const profileCompletion = computed(() => {
    if (!student.value)
      return { percentage: 0, completedFields: 0, totalFields: 0 };

    const fields = [
      student.value.name,
      student.value.email,
      student.value.phone !== "Not Available" ? student.value.phone : null,
      student.value.address !== "Not Available" ? student.value.address : null,
      student.value.class !== "N/A" ? student.value.class : null,
      student.value.rollNumber !== "N/A" ? student.value.rollNumber : null,
      student.value.aadhaarCard !== "Not Available"
        ? student.value.aadhaarCard
        : null,
      student.value.birthCertificate !== "Not Available"
        ? student.value.birthCertificate
        : null,
      student.value.transferCertificate !== "Not Available"
        ? student.value.transferCertificate
        : null,
      student.value.marksheet !== "Not Available"
        ? student.value.marksheet
        : null,
    ];

    const completedFields = fields.filter((field) => {
      // Check if field exists, is a string, and has content after trimming
      return field && typeof field === "string" && field.trim() !== "";
    }).length;

    const totalFields = fields.length;
    const percentage = Math.round((completedFields / totalFields) * 100);

    return { percentage, completedFields, totalFields };
  });

  // Optimized utility functions
  const getStatusColor = (status) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      suspended: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      statusColors[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getDocumentStatusIcon = (status) => {
    const statusIcons = {
      verified: CheckCircle,
      available: FileText,
      pending: Clock,
    };
    return statusIcons[status.toLowerCase()] || XCircle;
  };

  const getDocumentStatusColor = (status) => {
    const statusColors = {
      verified: "text-green-600",
      available: "text-blue-600",
      pending: "text-yellow-600",
    };
    return statusColors[status.toLowerCase()] || "text-red-600";
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Download document function
  const downloadDocument = (doc) => {
    // Implement download logic here
    console.log("Downloading document:", doc.name);
    // You can add actual download functionality based on your backend
  };
</script>

<template>
  <!-- Loading State -->
  <div
    v-if="loading"
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"
  >
    <div class="text-center bg-white rounded-2xl p-8 shadow-lg">
      <Loader2 class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
      <p class="text-gray-600">Loading student profile...</p>
    </div>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error"
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"
  >
    <div class="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
      <XCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        Error Loading Profile
      </h2>
      <p class="text-gray-600 mb-4">{{ error }}</p>
      <div class="space-y-2">
        <button
          @click="retryFetch"
          :disabled="retryCount >= 3"
          class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <RefreshCw class="w-4 h-4" />
          <span>{{
            retryCount >= 3 ? "Max Retries Reached" : "Try Again"
          }}</span>
        </button>
        <p
          v-if="retryCount > 0"
          class="text-sm text-gray-500"
        >
          Attempt {{ retryCount }}/3
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div
    v-else-if="student"
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Main Profile Card -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <!-- Profile Header -->
        <div
          class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-12"
        >
          <div class="absolute inset-0 bg-black opacity-10"></div>
          <div
            class="relative flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8"
          >
            <!-- Profile Photo -->
            <div class="relative">
              <div
                class="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white"
              >
                <img
                  :src="student.photo"
                  :alt="student.name"
                  class="w-full h-full object-cover"
                  @error="
                    $event.target.src = '/placeholder.svg?height=200&width=200'
                  "
                />
              </div>
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center"
              >
                <CheckCircle class="w-4 h-4 text-white" />
              </div>
            </div>

            <!-- Basic Info -->
            <div class="text-center md:text-left text-white flex-1">
              <h2 class="text-3xl font-bold mb-2">{{ student.name }}</h2>
              <div
                class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-blue-100"
              >
                <div
                  class="flex items-center justify-center md:justify-start space-x-2"
                >
                  <IdCard class="w-4 h-4" />
                  <span>ID: {{ student._id }}</span>
                </div>
                <div
                  class="flex items-center justify-center md:justify-start space-x-2"
                >
                  <GraduationCap class="w-4 h-4" />
                  <span>{{ student.class }}</span>
                </div>
                <div
                  class="flex items-center justify-center md:justify-start space-x-2"
                >
                  <BookOpen class="w-4 h-4" />
                  <span>Roll: {{ student.rollNumber }}</span>
                </div>
              </div>
            </div>

            <!-- Status Badge -->
            <div
              :class="[
                'px-4 py-2 rounded-full border font-medium text-sm',
                getStatusColor(student.status),
              ]"
            >
              {{ student.status }}
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Personal Information -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Contact Information -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3
                  class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
                >
                  <User class="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <Mail class="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p class="text-sm font-medium text-gray-500">
                          Email Address
                        </p>
                        <p class="text-gray-900 font-medium">
                          {{ student.email }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3">
                      <Phone class="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p class="text-sm font-medium text-gray-500">
                          Phone Number
                        </p>
                        <p class="text-gray-900 font-medium">
                          {{ student.phone }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-start space-x-3">
                      <MapPin class="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p class="text-sm font-medium text-gray-500">Address</p>
                        <p class="text-gray-900 font-medium">
                          {{ student.address }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Academic Information -->
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3
                  class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
                >
                  <GraduationCap class="w-5 h-5 mr-2 text-blue-600" />
                  Academic Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-white rounded-xl p-4 shadow-sm">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                      >
                        <BookOpen class="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Class</p>
                        <p class="text-lg font-bold text-gray-900">
                          {{ student.class }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white rounded-xl p-4 shadow-sm">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                      >
                        <IdCard class="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">
                          Roll Number
                        </p>
                        <p class="text-lg font-bold text-gray-900">
                          {{ student.rollNumber }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white rounded-xl p-4 shadow-sm">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                      >
                        <Calendar class="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">
                          Enrolled
                        </p>
                        <p class="text-sm font-bold text-gray-900">
                          {{ formatDate(student.enrollmentDate) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Attendance Statistics -->
              <div
                v-if="attendanceStats"
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
              >
                <h3
                  class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
                >
                  <BarChart3 class="w-5 h-5 mr-2 text-green-600" />
                  Attendance Overview
                </h3>

                <!-- Attendance Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <!-- Present Percentage -->
                  <div
                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <UserCheck class="w-5 h-5 text-green-600" />
                        <span class="text-sm font-medium text-gray-600"
                          >Present</span
                        >
                      </div>
                      <TrendingUp class="w-4 h-4 text-green-500" />
                    </div>
                    <div class="flex items-end space-x-2">
                      <span
                        :class="[
                          'text-2xl font-bold',
                          getAttendanceColor(attendanceStats.presentPercentage),
                        ]"
                      >
                        {{ attendanceStats.presentPercentage }}%
                      </span>
                      <span class="text-sm text-gray-500 mb-1"
                        >{{ attendanceStats.presentDays }}/{{
                          attendanceStats.totalDays
                        }}</span
                      >
                    </div>
                    <div class="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div
                        class="bg-green-500 h-2 rounded-full transition-all duration-500"
                        :style="{
                          width: attendanceStats.presentPercentage + '%',
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- Absent Percentage -->
                  <div
                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <UserX class="w-5 h-5 text-red-600" />
                        <span class="text-sm font-medium text-gray-600"
                          >Absent</span
                        >
                      </div>
                      <XCircle class="w-4 h-4 text-red-500" />
                    </div>
                    <div class="flex items-end space-x-2">
                      <span
                        :class="[
                          'text-2xl font-bold',
                          getAttendanceColor(
                            100 - attendanceStats.absentPercentage
                          ),
                        ]"
                      >
                        {{ attendanceStats.absentPercentage }}%
                      </span>
                      <span class="text-sm text-gray-500 mb-1"
                        >{{ attendanceStats.absentDays }}/{{
                          attendanceStats.totalDays
                        }}</span
                      >
                    </div>
                    <div class="w-full bg-red-200 rounded-full h-2 mt-2">
                      <div
                        class="bg-red-500 h-2 rounded-full transition-all duration-500"
                        :style="{
                          width: attendanceStats.absentPercentage + '%',
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- Late Percentage -->
                  <div
                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <AlertTriangle class="w-5 h-5 text-yellow-600" />
                        <span class="text-sm font-medium text-gray-600"
                          >Late</span
                        >
                      </div>
                      <Clock class="w-4 h-4 text-yellow-500" />
                    </div>
                    <div class="flex items-end space-x-2">
                      <span
                        :class="[
                          'text-2xl font-bold',
                          getAttendanceColor(
                            100 - attendanceStats.latePercentage
                          ),
                        ]"
                      >
                        {{ attendanceStats.latePercentage }}%
                      </span>
                      <span class="text-sm text-gray-500 mb-1"
                        >{{ attendanceStats.lateDays }}/{{
                          attendanceStats.totalDays
                        }}</span
                      >
                    </div>
                    <div class="w-full bg-yellow-200 rounded-full h-2 mt-2">
                      <div
                        class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        :style="{ width: attendanceStats.latePercentage + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Overall Attendance Summary -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                  <h4 class="font-semibold text-gray-900 mb-3">
                    Attendance Summary
                  </h4>
                  <div class="flex items-center space-x-4 text-sm">
                    <div class="flex items-center space-x-2">
                      <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span
                        >Present: {{ attendanceStats.presentDays }} days</span
                      >
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Absent: {{ attendanceStats.absentDays }} days</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Late: {{ attendanceStats.lateDays }} days</span>
                    </div>
                  </div>
                  <div class="mt-3 text-sm text-gray-600">
                    Total School Days:
                    <span class="font-semibold">{{
                      attendanceStats.totalDays
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents Section -->
            <div class="space-y-6">
              <div
                class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h3
                  class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
                >
                  <Shield class="w-5 h-5 mr-2 text-green-600" />
                  Documents
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="doc in documents"
                    :key="doc.name"
                    class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                      >
                        <component
                          :is="doc.icon"
                          class="w-5 h-5 text-blue-600"
                        />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ doc.name }}</p>
                        <p class="text-sm text-gray-600">
                          {{ doc.type === "number" ? doc.value : doc.value }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <component
                        :is="getDocumentStatusIcon(doc.status)"
                        :class="['w-5 h-5', getDocumentStatusColor(doc.status)]"
                      />
                      <button
                        v-if="doc.status !== 'pending'"
                        @click="downloadDocument(doc)"
                        class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        :title="`Download ${doc.name}`"
                      >
                        <Download class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Profile Completion -->
              <div
                class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
              >
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Profile Completion
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Overall Progress</span>
                    <span class="text-sm font-semibold text-purple-600"
                      >{{ profileCompletion.percentage }}%</span
                    >
                  </div>
                  <div class="w-full bg-purple-200 rounded-full h-2">
                    <div
                      class="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      :style="{ width: profileCompletion.percentage + '%' }"
                    ></div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="text-center">
                      <p class="text-2xl font-bold text-purple-600">
                        {{
                          documents.filter((d) => d.status !== "pending")
                            .length
                        }}/{{ documents.length }}
                      </p>
                      <p class="text-xs text-gray-600">Documents</p>
                    </div>
                    <div class="text-center">
                      <p class="text-2xl font-bold text-blue-600">
                        {{ profileCompletion.completedFields }}/{{
                          profileCompletion.totalFields
                        }}
                      </p>
                      <p class="text-xs text-gray-600">Fields Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AttendanceCard
          viewKey="attendance"
          title="Give Attendance"
          description="Mark daily attendance for students"
          :iconPath="'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'"
          :isActive="currentView === 'attendance'"
          color="blue"
          @select="currentView = $event"
        />
        <AttendanceCard
          viewKey="details"
          title="Attendance Details"
          description="View attendance reports and analytics"
          :iconPath="'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'"
          :isActive="currentView === 'details'"
          color="blue"
          @select="currentView = $event"
        />
      </div>

      <div v-if="currentView === 'attendance'">
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

              <button
                @click="fetchFilteredStudents"
                class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit
              </button>
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
        <div
          v-if="students.length > 0"
          class="bg-white rounded-xl shadow-sm border border-slate-200"
        >
          <div class="p-6 border-b border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-slate-900">
                {{ getClassName(selectedClass) }} - Student Attendance
              </h2>
              <div class="flex items-center space-x-6 text-sm">
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span class="font-medium text-slate-700"
                    >Present: {{ getPresentCount() }}</span
                  >
                </span>
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span class="font-medium text-slate-700"
                    >Absent: {{ getAbsentCount() }}</span
                  >
                </span>
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span class="font-medium text-slate-700"
                    >Late: {{ getLateCount() }}</span
                  >
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                @click="markAllPresent"
                class="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium border border-emerald-200"
              >
                Mark All Present
              </button>
              <button
                @click="markAllAbsent"
                class="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-200"
              >
                Mark All Absent
              </button>
              <button
                @click="clearAll"
                class="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium border border-slate-200"
              >
                Clear All
              </button>
            </div>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-slate-200">
                    <th
                      class="text-left py-4 px-4 font-semibold text-slate-700"
                    >
                      Roll No.
                    </th>
                    <th
                      class="text-left py-4 px-4 font-semibold text-slate-700"
                    >
                      Student Name
                    </th>
                    <th
                      class="text-center py-4 px-4 font-semibold text-slate-700"
                    >
                      Attendance Status
                    </th>
                    <th
                      class="text-center py-4 px-4 font-semibold text-slate-700"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="student in students"
                    :key="student._id"
                    :class="[
                      'border-b transition-colors',
                      attendance[student._id] === 'present'
                        ? 'bg-green-50 hover:bg-green-100'
                        : attendance[student._id] === 'absent'
                        ? 'bg-red-50 hover:bg-red-100'
                        : attendance[student._id] === 'late'
                        ? 'bg-yellow-50 hover:bg-yellow-100'
                        : 'hover:bg-slate-50',
                    ]"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <div class="flex items-center gap-2">
                        <IdCard class="w-8 h-8 text-blue-600" />
                        <span>{{ student.rollNumber }}</span>
                      </div>
                    </td>

                    <td class="py-4 px-4">
                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3"
                        >
                          <span class="text-sm font-semibold text-white">
                            {{ student.name.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                        <span class="font-medium text-slate-900">
                          {{ student.name }}
                          <span
                            v-if="alreadyMarked[student._id]"
                            class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                          >
                            (Marked)
                          </span>
                        </span>
                      </div>
                    </td>

                    <td class="py-4 px-4">
                      <div class="flex justify-center space-x-2">
                        <button
                          @click="setAttendance(student._id, 'present')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student._id] === 'present'
                              ? 'bg-emerald-500 text-white shadow-md'
                              : alreadyMarked[student._id]
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200',
                          ]"
                        >
                          Present
                        </button>

                        <button
                          @click="setAttendance(student._id, 'absent')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student._id] === 'absent'
                              ? 'bg-red-500 text-white shadow-md'
                              : alreadyMarked[student._id]
                              ? 'bg-red-50 text-red-700 border border-red-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-200',
                          ]"
                        >
                          Absent
                        </button>

                        <button
                          @click="setAttendance(student._id, 'late')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student._id] === 'late'
                              ? 'bg-amber-500 text-white shadow-md'
                              : alreadyMarked[student._id]
                              ? 'bg-amber-50 text-amber-700 border border-amber-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200',
                          ]"
                        >
                          Late
                        </button>
                      </div>
                    </td>

                    <td class="py-4 px-4">
                      <input
                        type="text"
                        v-model="remarks[student._id]"
                        placeholder="Add remarks..."
                        class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-8 flex justify-end">
              <button
                @click="saveAttendance"
                :disabled="!canSubmit"
                :class="
                  canSubmit
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                "
                class="px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform"
              >
                Save Attendance Record
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <EmptyStateCard />
        </div>
      </div>

      <div v-else-if="currentView === 'details'">
        <AttendanceDetails />
      </div>
    </div>

    <div
      v-if="showSuccessToast"
      class="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-6 rounded-2xl shadow-2xl transition-all duration-500 transform animate-bounce z-50"
    >
      <ShowSuccess />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useStore } from "vuex";
  import {
    IdCard,
    ChevronDown,
    Search,
    GraduationCap,
    Filter,
    RefreshCw,
  } from "lucide-vue-next";

  import AttendanceCard from "@/components/Attendence/ActionButtons.vue";
  import EmptyStateCard from "@/components/Attendence/EmptyState.vue";
  import AttendanceDetails from "@/components/Attendence/AttendanceDetails.vue";
  import ShowSuccess from "@/components/Attendence/Success.vue";

  // State
  const currentView = ref("attendance");
  const attendanceDate = ref("");
  const attendance = ref({});
  const remarks = ref({});
  const alreadyMarked = ref({});
  const showSuccessToast = ref(false);
  const selectedClass = ref("1");
  const search = ref("");
  const students = ref([]);
  const isSaving = ref(false);

  const store = useStore();

  onMounted(async () => {
    const today = new Date();
    attendanceDate.value = today.toISOString().split("T")[0];
    await fetchFilteredStudents(); // initial load
  });

  // 🔍 Fetch Students with Filters
  const fetchFilteredStudents = async () => {
    await store.dispatch("fetchStudents", {
      class: selectedClass.value,
      search: search.value.trim(),
      page: 1,
      limit: 50,
    });

    // Sort students by roll number before assigning
    students.value = [...store.getters.allStudents].sort(
      (a, b) => a.rollNumber - b.rollNumber
    );

    attendance.value = {};
    remarks.value = {};
    alreadyMarked.value = {};

    students.value.forEach((student) => {
      if (student.attendanceStatus) {
        attendance.value[student._id] = student.attendanceStatus;
        alreadyMarked.value[student._id] = true;
      }
      if (student.remarks) {
        remarks.value[student._id] = student.remarks;
      }
    });
  };

  // 🎓 Class Display Helper
  const getClassName = (classId) => `Class ${classId ?? "N/A"}`;

  // 📊 Count Helpers
  const getPresentCount = () =>
    Object.values(attendance.value).filter((v) => v === "present").length;

  const getAbsentCount = () =>
    Object.values(attendance.value).filter((v) => v === "absent").length;

  const getLateCount = () =>
    Object.values(attendance.value).filter((v) => v === "late").length;

  // ✅ Bulk Marking
  const markAllPresent = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        attendance.value[s._id] = "present";
      }
    });
  };

  const markAllAbsent = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        attendance.value[s._id] = "absent";
      }
    });
  };

  const clearAll = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        delete attendance.value[s._id];
        delete remarks.value[s._id];
      }
    });
  };

  // ✅ Set individual attendance
  const setAttendance = (studentId, status) => {
    attendance.value[studentId] = status;
  };

  // 💾 Save attendance
  const saveAttendance = async () => {
    isSaving.value = true;

    try {
      for (const student of students.value) {
        const studentId = student._id;
        const status = attendance.value[studentId];
        const notes = remarks.value[studentId] || "";

        if (!status) continue;

        await store.dispatch("markAttendance", {
          studentId,
          status,
          subject: "",
          notes,
        });

        alreadyMarked.value[studentId] = true;
      }

      showSuccessToast.value = true;
      setTimeout(() => (showSuccessToast.value = false), 3000);
    } catch (error) {
      console.error("Error while saving attendance:", error);
      alert("Failed to save attendance. Please try again.");
    } finally {
      isSaving.value = false;
    }
  };

  // 🔒 Allow submit only if something is selected
  const canSubmit = computed(() => Object.keys(attendance.value).length > 0);
</script>
<style scoped>
  /* Custom animations */
  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  .animate-bounce {
    animation: bounce 1s ease infinite;
  }

  /* Smooth transitions */
  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Focus styles */
  input:focus,
  select:focus,
  button:focus {
    outline: none;
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
</style>

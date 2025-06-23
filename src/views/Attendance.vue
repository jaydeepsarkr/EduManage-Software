<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Action Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          @click="currentView = 'attendance'"
          :class="[
            'group relative overflow-hidden rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105',
            currentView === 'attendance'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
              : 'bg-white text-slate-700 shadow-sm border border-slate-200 hover:shadow-lg',
          ]"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2">Give Attendance</h3>
              <p
                :class="
                  currentView === 'attendance'
                    ? 'text-blue-100'
                    : 'text-slate-500'
                "
              >
                Mark daily attendance for students
              </p>
            </div>
            <div
              :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center',
                currentView === 'attendance' ? 'bg-white/20' : 'bg-blue-50',
              ]"
            >
              <svg
                class="w-6 h-6"
                :class="
                  currentView === 'attendance' ? 'text-white' : 'text-blue-600'
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </button>

        <button
          @click="currentView = 'details'"
          :class="[
            'group relative overflow-hidden rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105',
            currentView === 'details'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-xl'
              : 'bg-white text-slate-700 shadow-sm border border-slate-200 hover:shadow-lg',
          ]"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2">Attendance Details</h3>
              <p
                :class="
                  currentView === 'details'
                    ? 'text-emerald-100'
                    : 'text-slate-500'
                "
              >
                View attendance reports and analytics
              </p>
            </div>
            <div
              :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center',
                currentView === 'details' ? 'bg-white/20' : 'bg-emerald-50',
              ]"
            >
              <svg
                class="w-6 h-6"
                :class="
                  currentView === 'details' ? 'text-white' : 'text-emerald-600'
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
          </div>
        </button>
      </div>

      <!-- Give Attendance View -->
      <div v-if="currentView === 'attendance'">
        <!-- Filters and Controls -->
        <div
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6"
        >
          <h2 class="text-lg font-semibold text-slate-900 mb-4">
            Attendance Configuration
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Class Filter -->
            <div>
              <label
                for="class-select"
                class="block text-sm font-medium text-slate-700 mb-2"
              >
                Select Class
              </label>
              <select
                id="class-select"
                v-model="selectedClass"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
              >
                <option value="">Choose a class...</option>
                <option
                  v-for="cls in classes"
                  :key="cls.id"
                  :value="cls.id"
                >
                  {{ cls.name }}
                </option>
              </select>
            </div>

            <!-- Date Selection -->
            <div>
              <label
                for="attendance-date"
                class="block text-sm font-medium text-slate-700 mb-2"
              >
                Attendance Date
              </label>
              <input
                id="attendance-date"
                type="date"
                v-model="attendanceDate"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
              />
            </div>
          </div>
        </div>

        <!-- Student List -->
        <div
          v-if="selectedClass"
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

            <!-- Quick Actions -->
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
            <!-- Students Table -->
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
                    v-for="student in filteredStudents"
                    :key="student.id"
                    class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td class="py-4 px-4 font-semibold text-slate-900">
                      {{ student.rollNo }}
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
                        <span class="font-medium text-slate-900">{{
                          student.name
                        }}</span>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex justify-center space-x-2">
                        <button
                          @click="setAttendance(student.id, 'present')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student.id] === 'present'
                              ? 'bg-emerald-500 text-white shadow-md'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200',
                          ]"
                        >
                          Present
                        </button>
                        <button
                          @click="setAttendance(student.id, 'absent')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student.id] === 'absent'
                              ? 'bg-red-500 text-white shadow-md'
                              : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-200',
                          ]"
                        >
                          Absent
                        </button>
                        <button
                          @click="setAttendance(student.id, 'late')"
                          :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            attendance[student.id] === 'late'
                              ? 'bg-amber-500 text-white shadow-md'
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
                        v-model="remarks[student.id]"
                        placeholder="Add remarks..."
                        class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Submit Button -->
            <div class="mt-8 flex justify-end">
              <button
                @click="saveAttendance"
                :disabled="!canSubmit"
                :class="[
                  'px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform',
                  canSubmit
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed',
                ]"
              >
                Save Attendance Record
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center"
        >
          <div
            class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">
            Select a Class to Begin
          </h3>
          <p class="text-slate-600">
            Choose a class from the dropdown above to view and mark student
            attendance.
          </p>
        </div>
      </div>

      <!-- Attendance Details View -->
      <div
        v-else-if="currentView === 'details'"
        class="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
      >
        <div class="text-center py-16">
          <div
            class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-slate-900 mb-4">
            Attendance Details & Reports
          </h3>
          <p class="text-slate-600 text-lg mb-8">
            This section will display comprehensive attendance reports,
            analytics, and historical data.
          </p>
          <div
            class="inline-flex items-center px-6 py-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Feature coming soon
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl transition-all duration-300 transform"
    >
      <div class="flex items-center">
        <svg
          class="w-6 h-6 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <div>
          <p class="font-semibold">Success!</p>
          <p class="text-sm text-emerald-100">Attendance saved successfully</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";

  // Reactive data
  const currentView = ref("attendance");
  const selectedClass = ref("");
  const attendanceDate = ref("");
  const attendance = ref({});
  const remarks = ref({});
  const showSuccessToast = ref(false);

  // Sample data
  const classes = ref([
    { id: "class-1", name: "Class 1A - Mathematics" },
    { id: "class-2", name: "Class 1B - Science" },
    { id: "class-3", name: "Class 2A - English" },
    { id: "class-4", name: "Class 2B - History" },
    { id: "class-5", name: "Class 3A - Physics" },
    { id: "class-6", name: "Class 3B - Chemistry" },
  ]);

  const students = ref([
    // Class 1A students
    { id: 1, name: "Alice Johnson", rollNo: "001", classId: "class-1" },
    { id: 2, name: "Bob Smith", rollNo: "002", classId: "class-1" },
    { id: 3, name: "Charlie Brown", rollNo: "003", classId: "class-1" },
    { id: 4, name: "Diana Prince", rollNo: "004", classId: "class-1" },
    { id: 5, name: "Edward Norton", rollNo: "005", classId: "class-1" },

    // Class 1B students
    { id: 6, name: "Fiona Green", rollNo: "006", classId: "class-2" },
    { id: 7, name: "George Wilson", rollNo: "007", classId: "class-2" },
    { id: 8, name: "Hannah Davis", rollNo: "008", classId: "class-2" },
    { id: 9, name: "Ian Thompson", rollNo: "009", classId: "class-2" },
    { id: 10, name: "Julia Roberts", rollNo: "010", classId: "class-2" },

    // Class 2A students
    { id: 11, name: "Kevin Hart", rollNo: "011", classId: "class-3" },
    { id: 12, name: "Lisa Anderson", rollNo: "012", classId: "class-3" },
    { id: 13, name: "Michael Jordan", rollNo: "013", classId: "class-3" },
    { id: 14, name: "Nancy Drew", rollNo: "014", classId: "class-3" },
    { id: 15, name: "Oliver Twist", rollNo: "015", classId: "class-3" },
  ]);

  // Computed properties
  const filteredStudents = computed(() => {
    if (!selectedClass.value) return [];
    return students.value.filter(
      (student) => student.classId === selectedClass.value
    );
  });

  const canSubmit = computed(() => {
    return (
      selectedClass.value &&
      attendanceDate.value &&
      filteredStudents.value.length > 0
    );
  });

  // Methods

  const getClassName = (classId) => {
    const cls = classes.value.find((c) => c.id === classId);
    return cls ? cls.name : "";
  };

  const setAttendance = (studentId, status) => {
    attendance.value[studentId] = status;
  };

  const markAllPresent = () => {
    filteredStudents.value.forEach((student) => {
      attendance.value[student.id] = "present";
    });
  };

  const markAllAbsent = () => {
    filteredStudents.value.forEach((student) => {
      attendance.value[student.id] = "absent";
    });
  };

  const clearAll = () => {
    filteredStudents.value.forEach((student) => {
      delete attendance.value[student.id];
      delete remarks.value[student.id];
    });
  };

  const getPresentCount = () => {
    return filteredStudents.value.filter(
      (student) => attendance.value[student.id] === "present"
    ).length;
  };

  const getAbsentCount = () => {
    return filteredStudents.value.filter(
      (student) => attendance.value[student.id] === "absent"
    ).length;
  };

  const getLateCount = () => {
    return filteredStudents.value.filter(
      (student) => attendance.value[student.id] === "late"
    ).length;
  };

  const saveAttendance = () => {
    const attendanceData = {
      classId: selectedClass.value,
      date: attendanceDate.value,
      attendance: attendance.value,
      remarks: remarks.value,
    };

    console.log("Saving attendance:", attendanceData);

    // Show success toast
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 4000);
  };

  // Initialize with today's date
  onMounted(() => {
    const today = new Date();
    attendanceDate.value = today.toISOString().split("T")[0];
  });
</script>

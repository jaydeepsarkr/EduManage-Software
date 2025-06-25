<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">Total Students</p>
              <p class="text-2xl font-bold text-slate-900">
                {{ students.length }}
              </p>
            </div>
            <div class="p-3 bg-blue-100 rounded-lg">
              <Users class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">Active</p>
              <p class="text-2xl font-bold text-emerald-600">
                {{ activeStudents }}
              </p>
            </div>
            <div class="p-3 bg-emerald-100 rounded-lg">
              <UserCheck class="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">Graduated</p>
              <p class="text-2xl font-bold text-blue-600">
                {{ graduatedStudents }}
              </p>
            </div>
            <div class="p-3 bg-blue-100 rounded-lg">
              <GraduationCap class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">Inactive</p>
              <p class="text-2xl font-bold text-red-600">
                {{ inactiveStudents }}
              </p>
            </div>
            <div class="p-3 bg-red-100 rounded-lg">
              <UserX class="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      <!-- Controls -->
      <Header />
      .
      <!-- Table -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button class="flex items-center gap-1 hover:text-gray-700">
                    Roll no
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      ></path>
                    </svg>
                  </button>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button class="flex items-center gap-1 hover:text-gray-700">
                    Name
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      ></path>
                    </svg>
                  </button>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Class
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Enrollment Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="student in students"
                :key="student.id"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center gap-2">
                    <IdCard class="w-6 h-6 text-purple-600" />
                    <span>{{ student.rollNumber }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <span class="text-sm font-medium text-blue-600">{{
                          getInitials(student.name)
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ student.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex items-center gap-2">
                    <Mail class="w-5 h-5 text-blue-600" />
                    <span>{{ student.email }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex items-center gap-2">
                    <School class="w-5 h-5 text-green-600" />
                    <span>{{ student.class }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2 text-sm text-gray-900">
                    <Phone class="w-4 h-4 text-green-600" />
                    <span>{{ student.phone }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <MapPinHouse class="w-4 h-4 text-blue-600" />
                    <span :title="student.address">
                      {{
                        student.address
                          ? student.address.includes(",")
                            ? student.address.split(",")[0]
                            : student.address.split(" ")[0]
                          : ""
                      }}
                    </span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(student.status)"
                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    <FileChartLine class="w-4 h-4 text-blue-600" />
                    {{ student.status }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex items-center gap-2">
                    <Calendar class="w-4 h-4 text-blue-600" />
                    <span>{{ formatDate(student.enrollmentDate) }}</span>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <button
                      class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="View Details"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      class="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="Edit"
                      @click="editStudent(student)"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>

                    <button
                      class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <!-- Edit Student Modal -->
            <div
              v-if="showEditModal"
              class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
            >
              <div
                class="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative animate-fade-in"
              >
                <!-- Close Button -->
                <button
                  @click="closeModal"
                  class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                  title="Close"
                >
                  <X class="w-5 h-5" />
                </button>

                <div class="mb-4 flex items-center gap-2">
                  <Pencil class="w-6 h-6 text-green-600" />
                  <h2 class="text-xl font-semibold text-gray-800">
                    Edit Student
                  </h2>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Full Name</label
                    >
                    <input
                      v-model="editingStudent.name"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Email</label
                    >
                    <input
                      v-model="editingStudent.email"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Class</label
                    >
                    <input
                      v-model="editingStudent.class"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >rollNumber</label
                    >
                    <input
                      v-model="editingStudent.rollNumber"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Phone</label
                    >
                    <input
                      v-model="editingStudent.phone"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Address</label
                    >
                    <input
                      v-model="editingStudent.address"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none truncate"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Status</label
                    >
                    <select
                      v-model="editingStudent.status"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Leaved</option>
                      <option value="Graduated">Passed Out</option>
                    </select>
                  </div>
                </div>

                <div class="mt-6 flex justify-end gap-2">
                  <button
                    @click="saveStudent"
                    class="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <Save class="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    @click="closeModal"
                    class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useStore } from "vuex";
  import {
    Pencil,
    X,
    Save,
    School,
    Mail,
    Phone,
    MapPinHouse,
    FileChartLine,
    Calendar,
    IdCard,
    Users,
    UserCheck,
    GraduationCap,
    UserX,
  } from "lucide-vue-next";
  import Header from "@/components/Students/HeaderStudent.vue";

  // Vuex store
  const store = useStore();
  const students = computed(() => store.getters.allStudents);
  // console.log(students);

  // Local state
  const editingStudent = ref(null);
  const showEditModal = ref(false);
  const loading = ref(false);
  const error = ref("");
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch students via Vuex
  const fetchStudents = async () => {
    try {
      loading.value = true;
      await store.dispatch("fetchStudents");
    } catch (err) {
      error.value = "Failed to fetch students.";
    } finally {
      loading.value = false;
    }
  };

  // On component mount
  onMounted(() => {
    fetchStudents();
  });

  // Utilities
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
      case "active":
        return "bg-green-100 text-green-800";
      case "leaved":
        return "bg-red-100 text-red-800";
      case "passedout":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Editing logic
  function editStudent(student) {
    editingStudent.value = { ...student };
    showEditModal.value = true;
  }

  function saveStudent() {
    const index = students.value.findIndex(
      (s) => s._id === editingStudent.value._id
    );
    if (index !== -1) {
      students.value[index] = { ...editingStudent.value };
      // Optional: Dispatch an update action to Vuex/server
    }
    showEditModal.value = false;
  }

  function closeModal() {
    showEditModal.value = false;
  }
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
</style>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Controls -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div
          class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search students..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Grade Filter -->
            <select
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Grades</option>
              <option
                v-for="grade in grades"
                :key="grade"
                :value="grade"
              >
                {{ grade }}
              </option>
            </select>

            <!-- Status Filter -->
            <select
              v-model="selectedStatus"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <!-- Add Student Button -->
          <button
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Student
          </button>
        </div>
      </div>

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
                    Student ID
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
                  Grade
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
                  {{ student.id }}
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
                  {{ student.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ student.grade }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ student.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(student.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ student.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ student.enrollmentDate }}
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
            <div
              v-if="showEditModal"
              class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
            >
              <div
                class="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative"
              >
                <!-- Close Button -->
                <button
                  @click="closeModal"
                  class="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  <X class="w-5 h-5" />
                </button>

                <h2 class="text-lg font-semibold text-gray-800 mb-4">
                  Edit Student
                </h2>

                <div class="space-y-4">
                  <div>
                    <label class="text-sm text-gray-600">Name</label>
                    <input
                      v-model="editingStudent.name"
                      class="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>

                  <div>
                    <label class="text-sm text-gray-600">Email</label>
                    <input
                      v-model="editingStudent.email"
                      class="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>

                  <div>
                    <label class="text-sm text-gray-600">Grade</label>
                    <input
                      v-model="editingStudent.grade"
                      class="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>

                  <div>
                    <label class="text-sm text-gray-600">Phone</label>
                    <input
                      v-model="editingStudent.phone"
                      class="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                </div>

                <div class="flex justify-end gap-2 mt-6">
                  <button
                    @click="saveStudent"
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    @click="closeModal"
                    class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
  import { ref } from "vue";
  import { Pencil, X } from "lucide-vue-next";

  // Reactive data

  const selectedStatus = ref("");

  const showAddModal = ref(false);

  // Sample student data
  const students = ref([
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      grade: "10th Grade",
      phone: "+1 (555) 123-4567",
      status: "Active",
      enrollmentDate: "2024-01-15",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      grade: "11th Grade",
      phone: "+1 (555) 234-5678",
      status: "Active",
      enrollmentDate: "2024-01-20",
    },
  ]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const editingStudent = ref(null);
  const showEditModal = ref(false);

  function editStudent(student) {
    editingStudent.value = { ...student }; // clone to avoid direct mutation
    showEditModal.value = true;
  }

  function saveStudent() {
    const index = students.value.findIndex(
      (s) => s.id === editingStudent.value.id
    );
    if (index !== -1) {
      students.value[index] = { ...editingStudent.value };
    }
    showEditModal.value = false;
  }

  function closeModal() {
    showEditModal.value = false;
  }
</script>

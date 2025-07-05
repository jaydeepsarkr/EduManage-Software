<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Teacher Management
        </h1>
        <p class="text-gray-600">Manage teachers in your school system</p>
      </div>

      <!-- Action Bar -->
      <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div class="flex-1 max-w-md">
            <div class="relative">
              <Search
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search teachers..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            @click="openAddModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus class="w-4 h-4" />
            Add Teacher
          </button>
        </div>
      </div>

      <!-- Teachers Table -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Photo
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Name
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Subject
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Email
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Phone
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="teacher in filteredTeachers"
                :key="teacher.id"
                class="hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  <img
                    :src="teacher.photo"
                    :alt="teacher.name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td class="py-3 px-4">
                  <div class="font-medium text-gray-900">
                    {{ teacher.name }}
                  </div>
                  <div class="text-sm text-gray-500">ID: {{ teacher.id }}</div>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ teacher.subject }}
                  </span>
                </td>
                <td class="py-3 px-4 text-gray-900">{{ teacher.email }}</td>
                <td class="py-3 px-4 text-gray-900">{{ teacher.phone }}</td>
                <td class="py-3 px-4">
                  <span
                    :class="
                      teacher.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ teacher.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewTeacher(teacher)"
                      class="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="View"
                    >
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      @click="editTeacher(teacher)"
                      class="text-green-600 hover:text-green-800 p-1 rounded"
                      title="Edit"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteTeacher(teacher)"
                      class="text-red-600 hover:text-red-800 p-1 rounded"
                      title="Delete"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ isEditing ? "Edit Teacher" : "Add New Teacher" }}
              </h2>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <form
              @submit.prevent="saveTeacher"
              class="space-y-4"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Name</label
                >
                <input
                  v-model="currentTeacher.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Subject</label
                >
                <select
                  v-model="currentTeacher.subject"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  v-model="currentTeacher.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Phone</label
                >
                <input
                  v-model="currentTeacher.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Status</label
                >
                <select
                  v-model="currentTeacher.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {{ isEditing ? "Update" : "Add" }} Teacher
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- View Modal -->
      <div
        v-if="showViewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg max-w-md w-full">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Teacher Details
              </h2>
              <button
                @click="closeViewModal"
                class="text-gray-400 hover:text-gray-600"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <div
              v-if="selectedTeacher"
              class="space-y-4"
            >
              <div class="text-center">
                <img
                  :src="selectedTeacher.photo"
                  :alt="selectedTeacher.name"
                  class="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                />
                <h3 class="text-lg font-medium text-gray-900">
                  {{ selectedTeacher.name }}
                </h3>
                <p class="text-sm text-gray-500">
                  ID: {{ selectedTeacher.id }}
                </p>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Subject</label
                  >
                  <p class="text-gray-900">{{ selectedTeacher.subject }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <p class="text-gray-900">{{ selectedTeacher.email }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Phone</label
                  >
                  <p class="text-gray-900">{{ selectedTeacher.phone }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Status</label
                  >
                  <span
                    :class="
                      selectedTeacher.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ selectedTeacher.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg max-w-sm w-full">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3"
              >
                <AlertTriangle class="w-5 h-5 text-red-600" />
              </div>
              <h2 class="text-lg font-semibold text-gray-900">
                Delete Teacher
              </h2>
            </div>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete {{ teacherToDelete?.name }}? This
              action cannot be undone.
            </p>
            <div class="flex gap-3">
              <button
                @click="confirmDelete"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                @click="closeDeleteModal"
                class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, reactive } from "vue";
  import {
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    X,
    AlertTriangle,
  } from "lucide-vue-next";

  // Reactive data
  const searchQuery = ref("");
  const showModal = ref(false);
  const showViewModal = ref(false);
  const showDeleteModal = ref(false);
  const isEditing = ref(false);
  const selectedTeacher = ref(null);
  const teacherToDelete = ref(null);

  // Sample teachers data
  const teachers = ref([
    {
      id: "T001",
      name: "Sarah Johnson",
      subject: "Mathematics",
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      status: "Active",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "T002",
      name: "Michael Chen",
      subject: "Science",
      email: "michael.chen@school.edu",
      phone: "+1 (555) 234-5678",
      status: "Active",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "T003",
      name: "Emily Rodriguez",
      subject: "English",
      email: "emily.rodriguez@school.edu",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "T004",
      name: "David Thompson",
      subject: "History",
      email: "david.thompson@school.edu",
      phone: "+1 (555) 456-7890",
      status: "Active",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "T005",
      name: "Lisa Wang",
      subject: "Physics",
      email: "lisa.wang@school.edu",
      phone: "+1 (555) 567-8901",
      status: "Active",
      photo: "/placeholder.svg?height=40&width=40",
    },
  ]);

  // Current teacher form data
  const currentTeacher = reactive({
    id: "",
    name: "",
    subject: "",
    email: "",
    phone: "",
    status: "Active",
    photo: "/placeholder.svg?height=40&width=40",
  });

  // Computed properties
  const filteredTeachers = computed(() => {
    if (!searchQuery.value) return teachers.value;

    return teachers.value.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        teacher.subject
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  // Methods
  const openAddModal = () => {
    isEditing.value = false;
    resetCurrentTeacher();
    showModal.value = true;
  };

  const editTeacher = (teacher) => {
    isEditing.value = true;
    Object.assign(currentTeacher, teacher);
    showModal.value = true;
  };

  const viewTeacher = (teacher) => {
    selectedTeacher.value = teacher;
    showViewModal.value = true;
  };

  const deleteTeacher = (teacher) => {
    teacherToDelete.value = teacher;
    showDeleteModal.value = true;
  };

  const saveTeacher = () => {
    if (isEditing.value) {
      // Update existing teacher
      const index = teachers.value.findIndex((t) => t.id === currentTeacher.id);
      if (index !== -1) {
        teachers.value[index] = { ...currentTeacher };
      }
    } else {
      // Add new teacher
      const newId = "T" + String(teachers.value.length + 1).padStart(3, "0");
      teachers.value.push({
        ...currentTeacher,
        id: newId,
      });
    }
    closeModal();
  };

  const confirmDelete = () => {
    const index = teachers.value.findIndex(
      (t) => t.id === teacherToDelete.value.id
    );
    if (index !== -1) {
      teachers.value.splice(index, 1);
    }
    closeDeleteModal();
  };

  const closeModal = () => {
    showModal.value = false;
    resetCurrentTeacher();
  };

  const closeViewModal = () => {
    showViewModal.value = false;
    selectedTeacher.value = null;
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    teacherToDelete.value = null;
  };

  const resetCurrentTeacher = () => {
    Object.assign(currentTeacher, {
      id: "",
      name: "",
      subject: "",
      email: "",
      phone: "",
      status: "Active",
      photo: "/placeholder.svg?height=40&width=40",
    });
  };
</script>

<style scoped>
  /* Additional custom styles if needed */
</style>

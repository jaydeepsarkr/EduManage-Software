<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <HeaderTeacher
        @search="searchQuery = $event"
        @add-new="addTeacher"
        @bulk-delete="bulkDeleteTeachers"
        :is-any-selected="isAnyTeacherSelected"
        :selected-count="selectedTeacherIds.length"
      />

      <!-- Teachers Table (Desktop View) -->
      <div
        class="hidden md:block bg-white rounded-xl shadow-lg border overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleSelectAll"
                    :disabled="isLoading"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Photo
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DOB
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="teacher in filteredTeachers"
                :key="teacher._id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-4 py-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :checked="selectedTeacherIds.includes(teacher._id)"
                    @change="toggleTeacherSelection(teacher._id)"
                    :disabled="isLoading"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <img
                    :src="teacher.photo"
                    :alt="teacher.name"
                    class="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ teacher.name }}
                  </div>
                  <div class="text-xs text-gray-500">ID: {{ teacher._id }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ teacher.role }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {{ teacher.subject }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ teacher.email }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ teacher.phone }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ teacher.dob }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
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
                <td
                  class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewTeacher(teacher)"
                      :disabled="isLoading"
                      class="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="View"
                    >
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      @click="editTeacher(teacher)"
                      :disabled="isLoading"
                      class="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteTeacher(teacher)"
                      :disabled="isLoading"
                      class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredTeachers.length === 0">
                <td
                  colspan="10"
                  class="px-4 py-6 text-center text-gray-500"
                >
                  No teachers found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Teachers Grid (Mobile View) -->
      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-if="filteredTeachers.length === 0"
          class="col-span-full text-center py-6 text-gray-500 bg-white rounded-xl shadow-sm border"
        >
          No teachers found.
        </div>
        <div
          v-for="teacher in filteredTeachers"
          :key="teacher._id"
          class="bg-white rounded-xl shadow-lg border p-4 flex flex-col space-y-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img
                :src="teacher.photo"
                :alt="teacher.name"
                class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ teacher.name }}
                </h3>
                <p class="text-sm text-gray-500">ID: {{ teacher._id }}</p>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="selectedTeacherIds.includes(teacher._id)"
              @change="toggleTeacherSelection(teacher._id)"
              :disabled="isLoading"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span class="font-medium text-gray-700">Role:</span>
              {{ teacher.role }}
            </div>
            <div>
              <span class="font-medium text-gray-700">Subject:</span>
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {{ teacher.subject }}
              </span>
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-700">Email:</span>
              {{ teacher.email }}
            </div>
            <div>
              <span class="font-medium text-gray-700">Phone:</span>
              {{ teacher.phone }}
            </div>
            <div>
              <span class="font-medium text-gray-700">DOB:</span>
              {{ teacher.dob }}
            </div>
            <div>
              <span class="font-medium text-gray-700">Status:</span>
              <span
                :class="
                  teacher.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {{ teacher.status }}
              </span>
            </div>
          </div>

          <div
            class="flex justify-end gap-2 mt-4 border-t pt-3 border-gray-100"
          >
            <button
              @click="viewTeacher(teacher)"
              :disabled="isLoading"
              class="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              title="View"
            >
              <Eye class="w-5 h-5" />
            </button>
            <button
              @click="editTeacher(teacher)"
              :disabled="isLoading"
              class="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit"
            >
              <Edit class="w-5 h-5" />
            </button>
            <button
              @click="deleteTeacher(teacher)"
              :disabled="isLoading"
              class="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Basic Delete Confirmation (simple inline display) -->
      <div
        v-if="showDeleteModal"
        class="bg-white rounded-xl shadow-lg border p-6 mt-6 transition-all duration-300 ease-in-out"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
        <p
          v-if="teacherToDelete"
          class="text-gray-700 mb-6"
        >
          Are you sure you want to delete teacher
          <span class="font-medium text-red-600">{{
            teacherToDelete.name
          }}</span>
          (ID: {{ teacherToDelete.id }})?
        </p>
        <p
          v-else
          class="text-gray-700 mb-6"
        >
          Are you sure you want to delete the selected
          {{ selectedTeacherIds.length }} teachers?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            :disabled="isLoading"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="isLoading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isLoading"
              class="flex items-center"
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>

      <!-- Toast Notification (Integrated) -->
      <transition name="fade">
        <div
          v-if="toast.isVisible"
          :class="toastClasses"
          class="fixed bottom-6 right-6 p-4 rounded-lg shadow-lg text-white text-sm font-medium z-50 flex items-center space-x-2"
        >
          <Info
            v-if="toast.type === 'info'"
            class="w-5 h-5"
          />
          <CheckCircle
            v-if="toast.type === 'success'"
            class="w-5 h-5"
          />
          <XCircle
            v-if="toast.type === 'error'"
            class="w-5 h-5"
          />
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, reactive, onMounted } from "vue";
  import { useStore } from "vuex";
  import {
    Eye,
    Edit,
    Trash2,
    Info,
    CheckCircle,
    XCircle,
  } from "lucide-vue-next";
  import HeaderTeacher from "@/components/Teacher/HeaderTeacher.vue";

  // Vuex store
  const store = useStore();

  // UI state
  const searchQuery = ref("");
  const showModal = ref(false);
  const showViewModal = ref(false);
  const showDeleteModal = ref(false);
  const isEditing = ref(false);
  const selectedTeacher = ref(null);
  const teacherToDelete = ref(null);
  const selectedTeacherIds = ref([]);
  const isLoading = ref(false);

  // Toast
  const toast = reactive({
    isVisible: false,
    message: "",
    type: "info", // 'success', 'error', 'info'
  });
  let toastTimeoutId = null;

  // Form data
  const currentTeacher = reactive({
    id: "",
    name: "",
    role: "teacher",
    subject: "",
    email: "",
    phone: "",
    status: "active",
    photo: "",
    dob: "",
  });

  // Fetch teachers on load
  onMounted(() => {
    store.dispatch("fetchTeachers");
    setTimeout(() => {
      console.log("👩‍🏫 All Teachers from Vuex:", store.getters.getAllTeachers);
    }, 100);
  });

  // Get teachers from Vuex
  const teachers = computed(() => store.getters.getAllTeachers || []);

  // Filtering
  const filteredTeachers = computed(() => {
    if (!searchQuery.value) return teachers.value;
    const query = searchQuery.value.toLowerCase();
    return teachers.value.filter(
      (t) =>
        t.name?.toLowerCase().includes(query) ||
        t.subject?.toLowerCase().includes(query) ||
        t.email?.toLowerCase().includes(query) ||
        t.role?.toLowerCase().includes(query)
    );
  });

  // Checkbox
  const allSelected = computed(() => {
    return (
      filteredTeachers.value.length > 0 &&
      filteredTeachers.value.every((t) =>
        selectedTeacherIds.value.includes(t.id)
      )
    );
  });
  const isAnyTeacherSelected = computed(
    () => selectedTeacherIds.value.length > 0
  );

  // Toast utility
  const showToast = (msg, type = "info", duration = 3000) => {
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toast.message = msg;
    toast.type = type;
    toast.isVisible = true;
    toastTimeoutId = setTimeout(() => {
      toast.isVisible = false;
    }, duration);
  };

  // Reset form
  const resetCurrentTeacher = () => {
    Object.assign(currentTeacher, {
      id: "",
      name: "",
      role: "teacher",
      subject: "",
      email: "",
      phone: "",
      status: "active",
      photo: "",
      dob: "",
    });
  };

  // Actions
  const addTeacher = () => {
    isEditing.value = false;
    resetCurrentTeacher();
    showModal.value = true;
  };

  const editTeacher = (teacher) => {
    isEditing.value = true;
    Object.assign(currentTeacher, { ...teacher });
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

  const bulkDeleteTeachers = () => {
    teacherToDelete.value = null;
    showDeleteModal.value = true;
  };

  // Confirm deletion (single or bulk)
  const confirmDelete = async () => {
    isLoading.value = true;
    try {
      if (teacherToDelete.value) {
        await store.dispatch("deleteUserById", teacherToDelete.value.id);
        showToast(`🗑️ Deleted: ${teacherToDelete.value.name}`, "success");
      } else if (selectedTeacherIds.value.length > 0) {
        for (const id of selectedTeacherIds.value) {
          await store.dispatch("deleteUserById", id);
        }
        showToast(
          `🗑️ ${selectedTeacherIds.value.length} teachers deleted`,
          "success"
        );
        selectedTeacherIds.value = [];
      }
      showDeleteModal.value = false;
      store.dispatch("fetchTeachers");
    } catch (err) {
      showToast("❌ Failed to delete teacher(s)", "error");
    } finally {
      isLoading.value = false;
      teacherToDelete.value = null;
    }
  };

  const cancelDelete = () => {
    showDeleteModal.value = false;
    teacherToDelete.value = null;
  };

  // Checkbox select
  const toggleSelectAll = () => {
    if (allSelected.value) {
      selectedTeacherIds.value = [];
    } else {
      selectedTeacherIds.value = filteredTeachers.value.map((t) => t.id);
    }
  };

  const toggleTeacherSelection = (id) => {
    const index = selectedTeacherIds.value.indexOf(id);
    if (index === -1) {
      selectedTeacherIds.value.push(id);
    } else {
      selectedTeacherIds.value.splice(index, 1);
    }
  };
</script>

<style scoped>
  /* Toast transition styles */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

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
</style>

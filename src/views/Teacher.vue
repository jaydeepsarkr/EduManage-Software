<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <!-- Loading State -->
      <div
        v-if="isInitialLoading"
        class="flex flex-col items-center justify-center min-h-[60vh] text-gray-600"
      >
        <div
          class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"
        ></div>
        <p class="text-xl font-medium">Loading teachers...</p>
        <p class="text-sm text-gray-500 mt-2">Please wait a moment.</p>
      </div>
      <!-- Main Content (only show when not loading) -->
      <div v-else>
        <!-- Header - This component is responsible for the bulk delete button -->
        <HeaderTeacher
          @search="searchQuery = $event"
          @add-new="addTeacher"
          @bulk-delete="bulkDeleteTeachers"
          :is-any-selected="isAnyTeacherSelected"
          :selected-count="selectedTeacherIds.length"
        />
        <!-- Bulk Delete Button (appears when teachers are selected) -->
        <div
          v-if="isAnyTeacherSelected"
          class="mt-6 mb-4 flex justify-end animate-fade-in"
        >
          <button
            @click="bulkDeleteTeachers"
            :disabled="isLoading"
            class="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 class="w-5 h-5 mr-2" />
            Delete Selected ({{ selectedTeacherIds.length }})
          </button>
        </div>
        <!-- Teachers Table (Desktop View) -->
        <div
          class="hidden md:block bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          :class="{ 'mt-6': !isAnyTeacherSelected }"
        >
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    <!-- Checkbox for selecting all visible teachers -->
                    <input
                      type="checkbox"
                      :checked="allSelected"
                      @change="toggleSelectAll"
                      :disabled="isLoading"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed h-4 w-4"
                    />
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Photo
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Subject
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    DOB
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr
                  v-for="teacher in paginatedTeachers"
                  :key="teacher._id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="px-4 py-3 whitespace-nowrap">
                    <!-- Checkbox for individual teacher selection -->
                    <input
                      type="checkbox"
                      :checked="selectedTeacherIds.includes(teacher._id)"
                      @change="toggleTeacherSelection(teacher._id)"
                      :disabled="isLoading"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed h-4 w-4"
                    />
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <img
                      :src="
                        teacher.photo || '/placeholder.svg?height=40&width=40'
                      "
                      :alt="teacher.name"
                      class="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ teacher.name }}
                    </div>
                    <!-- <div class="text-xs text-gray-500">
                      ID: {{ teacher._id }}
                    </div> -->
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {{ teacher.role }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {{ teacher.subject }}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {{ teacher.email }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {{ teacher.phone }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {{ formatDate(teacher.dob) }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      :class="
                        teacher.status === 'active'
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
                        class="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="View Details"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button
                        @click="editTeacher(teacher)"
                        :disabled="isLoading"
                        class="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit Teacher"
                      >
                        <Edit class="w-4 h-4" />
                      </button>
                      <button
                        @click="deleteTeacher(teacher)"
                        :disabled="isLoading"
                        class="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Teacher"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="paginatedTeachers.length === 0">
                  <td
                    colspan="10"
                    class="px-4 py-6 text-center text-gray-500 text-base"
                  >
                    No teachers found matching your criteria.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Teachers Grid (Mobile View) -->
        <div
          class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-[304px] -ml-[23px]"
          :class="{ 'mt-6': !isAnyTeacherSelected }"
        >
          <div
            v-if="paginatedTeachers.length === 0"
            class="col-span-full text-center py-6 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100 text-base"
          >
            No teachers found matching your criteria.
          </div>
          <div
            v-for="teacher in paginatedTeachers"
            :key="teacher._id"
            class="bg-white rounded-xl border border-gray-100 p-4 flex flex-col space-y-3 w-full max-w-2xl"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <img
                  :src="teacher.photo || '/placeholder.svg?height=64&width=64'"
                  :alt="teacher.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ teacher.name }}
                  </h3>
                  <p class="text-gray-500 text-[10px]">ID: {{ teacher._id }}</p>
                </div>
              </div>
              <!-- Checkbox for individual teacher selection -->
              <input
                type="checkbox"
                :checked="selectedTeacherIds.includes(teacher._id)"
                @change="toggleTeacherSelection(teacher._id)"
                :disabled="isLoading"
                class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed h-5 w-5"
              />
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
              <div>
                <span class="font-medium text-gray-700">Role:</span>
                {{ teacher.role }}
              </div>
              <div>
                <span class="font-medium text-gray-700">Subject:</span>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
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
                {{ formatDate(teacher.dob) }}
              </div>
              <div>
                <span class="font-medium text-gray-700">Status:</span>
                <span
                  :class="
                    teacher.status === 'active'
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
                class="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                title="View Details"
              >
                <Eye class="w-5 h-5" />
              </button>
              <button
                @click="editTeacher(teacher)"
                :disabled="isLoading"
                class="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit Teacher"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                @click="deleteTeacher(teacher)"
                :disabled="isLoading"
                class="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Teacher"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center space-x-3 mt-8"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1 || isLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
          >
            Previous
          </button>
          <span class="text-gray-700 font-medium"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages || isLoading"
            class="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
          >
            Next
          </button>
        </div>
        <!-- Delete Confirmation Modal (Inline for simplicity, consider a dedicated modal component for complex UIs) -->
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 sm:p-6"
          @click.self="cancelDelete"
        >
          <div
            class="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0"
            :class="{ 'scale-100 opacity-100': showDeleteModal }"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h2>
            <p
              v-if="teacherToDelete"
              class="text-gray-700 mb-6"
            >
              Are you sure you want to delete teacher
              <span class="font-semibold text-red-600">{{
                teacherToDelete.name
              }}</span>
              (ID: {{ teacherToDelete._id }})? This action cannot be undone.
            </p>
            <p
              v-else
              class="text-gray-700 mb-6"
            >
              Are you sure you want to delete the selected
              <span class="font-semibold text-red-600">{{
                selectedTeacherIds.length
              }}</span>
              teachers? This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-3">
              <button
                @click="cancelDelete"
                :disabled="isLoading"
                class="inline-flex justify-center py-2.5 px-5 border border-gray-200 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                :disabled="isLoading"
                class="inline-flex justify-center py-2.5 px-5 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </div>
      <!-- Toast Notification (Integrated) -->
      <transition name="fade">
        <div
          v-if="toast.isVisible"
          :class="toastClasses"
          class="fixed bottom-6 right-6 p-4 rounded-lg shadow-xl text-white text-base font-medium z-50 flex items-center space-x-2 min-w-[250px]"
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
      <!-- Teacher Details Modal -->
      <TeacherDetailsModal
        :teacher="selectedTeacher"
        :is-open="showViewModal"
        @close="showViewModal = false"
      />
      <!-- Teacher Edit Modal -->
      <TeacherEditModal
        :teacher="selectedTeacher"
        :is-open="showEditModal"
        @close="showEditModal = false"
        @save="handleSaveEdit"
        :isLoading="isLoading"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, reactive, onMounted, watch } from "vue";
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
  import TeacherDetailsModal from "@/components/Teacher/Actions/TeacherDetailsModal.vue";
  import TeacherEditModal from "@/components/Teacher/Actions/TeacherEditModal.vue";

  // Vuex store
  const store = useStore();

  // UI state
  const searchQuery = ref("");
  const showModal = ref(false);
  const showViewModal = ref(false);
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);
  const isEditing = ref(false);
  const selectedTeacher = ref(null);
  const teacherToDelete = ref(null);
  const selectedTeacherIds = ref([]);
  const isLoading = ref(false); // This ref controls the loading state for the entire view and modals
  const isInitialLoading = ref(true);

  // Pagination state
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Toast
  const toast = reactive({
    isVisible: false,
    message: "",
    type: "info",
  });
  let toastTimeoutId = null;

  // Form data (currentTeacher is now less critical as edit modal manages its own local state)
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

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Fetch teachers on load
  const fetchTeachers = async () => {
    try {
      await store.dispatch("fetchTeachers");
    } catch (error) {
      console.error("Error fetching teachers:", error);
      showToast("❌ Failed to load teachers", "error");
    } finally {
      setTimeout(() => {
        isInitialLoading.value = false;
      }, 500);
    }
  };

  onMounted(() => {
    fetchTeachers();
  });

  // Get teachers from Vuex
  const teachers = computed(() => store.getters.getAllTeachers || []);

  watch(
    teachers,
    (newTeachers) => {
      if (newTeachers && newTeachers.length >= 0) {
        setTimeout(() => {
          isInitialLoading.value = false;
        }, 300);
      }
    },
    { immediate: true }
  );

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

  // Pagination computed properties
  const totalPages = computed(() => {
    return Math.ceil(filteredTeachers.value.length / itemsPerPage.value);
  });

  const paginatedTeachers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredTeachers.value.slice(start, end);
  });

  watch(filteredTeachers, () => {
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    } else if (totalPages.value === 0) {
      currentPage.value = 1;
    }
    selectedTeacherIds.value = [];
  });

  // Pagination actions
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  // Checkbox logic for current page
  const allSelected = computed(() => {
    return (
      paginatedTeachers.value.length > 0 &&
      paginatedTeachers.value.every((t) =>
        selectedTeacherIds.value.includes(t._id)
      )
    );
  });

  const isAnyTeacherSelected = computed(
    () => selectedTeacherIds.value.length > 0
  );

  // Toast classes
  const toastClasses = computed(() => {
    const baseClasses = "transition-all duration-300 ease-in-out";
    switch (toast.type) {
      case "success":
        return `${baseClasses} bg-green-600`;
      case "error":
        return `${baseClasses} bg-red-600`;
      case "info":
      default:
        return `${baseClasses} bg-blue-600`;
    }
  });

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
    selectedTeacher.value = teacher;
    showEditModal.value = true;
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

  const confirmDelete = async () => {
    isLoading.value = true;
    try {
      if (teacherToDelete.value) {
        await store.dispatch("deleteUserById", teacherToDelete.value._id);
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
      await fetchTeachers();
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

  // Handle save from TeacherEditModal
  const handleSaveEdit = async ({ teacherData }) => {
    isLoading.value = true; // Set loading true when save starts
    try {
      const originalTeacher = selectedTeacher.value;
      const updatesToSend = {};

      // Helper to normalize values that might be empty objects to empty strings
      const normalizeValue = (value) => {
        return typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0
          ? "" // Treat empty object as empty string
          : value;
      };

      // 1. Handle regular fields (non-file related)
      for (const key in teacherData) {
        if (
          key === "_id" ||
          key === "photo" ||
          key === "aadhaarCard" ||
          key === "qualifications"
        ) {
          continue; // Handle these separately
        }
        const normalizedNewValue = normalizeValue(teacherData[key]);
        if (normalizedNewValue !== originalTeacher[key]) {
          updatesToSend[key] = normalizedNewValue;
        }
      }

      // 2. Handle photo (now expected to be a Base64 string or URL in teacherData.photo)
      const normalizedNewPhotoValue = normalizeValue(teacherData.photo);
      if (normalizedNewPhotoValue !== originalTeacher.photo) {
        updatesToSend.photo = normalizedNewPhotoValue;
      }

      // 3. Handle aadhaarCard (now expected to be a Base64 string or URL in teacherData.aadhaarCard)
      const normalizedNewAadhaarValue = normalizeValue(teacherData.aadhaarCard);
      if (normalizedNewAadhaarValue !== originalTeacher.aadhaarCard) {
        updatesToSend.aadhaarCard = normalizedNewAadhaarValue;
      }

      // 4. Handle qualifications
      const updatedQualifications = teacherData.qualifications
        ? JSON.parse(JSON.stringify(teacherData.qualifications))
        : [];
      let qualificationsChanged = false;

      // Normalize fileUrl for each qualification and check for changes
      updatedQualifications.forEach((qual, index) => {
        const normalizedFileUrl = normalizeValue(qual.fileUrl);
        // Compare with original qualification's fileUrl
        if (
          originalTeacher.qualifications &&
          originalTeacher.qualifications[index]
        ) {
          if (
            normalizedFileUrl !== originalTeacher.qualifications[index].fileUrl
          ) {
            qual.fileUrl = normalizedFileUrl;
            qualificationsChanged = true;
          }
        } else if (normalizedFileUrl !== "") {
          // New qualification with a fileUrl
          qualificationsChanged = true;
        }
      });

      // Check if the array structure itself changed (e.g., added/removed qualifications)
      if (
        updatedQualifications.length !==
        (originalTeacher.qualifications
          ? originalTeacher.qualifications.length
          : 0)
      ) {
        qualificationsChanged = true;
      }

      // If qualificationsChanged is true OR the array content is different, include it.
      if (
        qualificationsChanged ||
        JSON.stringify(updatedQualifications) !==
          JSON.stringify(originalTeacher.qualifications)
      ) {
        updatesToSend.qualifications = updatedQualifications;
      }

      // If no updates were detected, show an info toast and exit
      if (Object.keys(updatesToSend).length === 0) {
        showToast("ℹ️ No changes detected.", "info");
        showEditModal.value = false;
        return; // Exit early, no need to set isLoading to false in finally if we return here
      }

      // Dispatch the action with only the changed fields. File data is now Base64 strings.
      await store.dispatch("editTeacherById", {
        teacherId: originalTeacher._id,
        updates: updatesToSend,
      });

      showToast(
        `✅ Teacher ${originalTeacher.name} updated successfully!`,
        "success"
      );
      await fetchTeachers(); // Re-fetch teachers to update the table
    } catch (error) {
      console.error("Error saving teacher:", error);
      showToast("❌ Failed to save teacher updates", "error");
    } finally {
      isLoading.value = false; // Set loading false when save completes (success or error)
      showEditModal.value = false;
      selectedTeacher.value = null;
    }
  };

  // Toggle selection for all teachers on the current page
  const toggleSelectAll = () => {
    if (allSelected.value) {
      selectedTeacherIds.value = [];
    } else {
      selectedTeacherIds.value = paginatedTeachers.value.map((t) => t._id);
    }
  };

  // Toggle selection for an individual teacher
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
  /* Fade-in animation for bulk delete button */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
</style>

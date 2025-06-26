<template>
  <!-- Enhanced Header Section -->
  <div
    class="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6 mb-6"
  >
    <div
      class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
    >
      <!-- Search and Filters Section -->
      <div
        class="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1 w-full lg:w-auto"
      >
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <Search />
        </div>

        <!-- Filters Container -->
        <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div class="min-w-0">
            <GradeFilter />
          </div>
          <div class="min-w-0">
            <StatusFilter />
          </div>
        </div>
      </div>

      <!-- Enhanced Add Student Button -->
      <button
        @click="showAddModal = true"
        class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
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
        <span class="font-bold">Add Student</span>
      </button>
    </div>
  </div>

  <!-- Enhanced Scrollable Add Student Modal -->
  <div
    v-if="showAddModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <div
      class="bg-white w-full max-w-2xl max-h-[95vh] rounded-3xl shadow-2xl relative animate-fade-in border border-slate-200 flex flex-col"
    >
      <!-- Fixed Header -->
      <div class="flex-shrink-0 p-6 md:p-8 border-b border-slate-200">
        <!-- Close Button -->
        <button
          @click="closeAddModal"
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          title="Close"
        >
          <X class="w-5 h-5" />
        </button>

        <!-- Header -->
        <div class="flex items-center gap-3">
          <div
            class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"
          >
            <UserPlus class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-800">
              Add New Student
            </h2>
            <p class="text-slate-500 text-sm">
              Fill in the student information below
            </p>
          </div>
        </div>
      </div>

      <!-- Scrollable Form Content -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- Full Name -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-blue-100 rounded">
                <User class="w-3 h-3 text-blue-600" />
              </div>
              Full Name
            </label>
            <input
              v-model="newStudent.name"
              placeholder="Enter student name"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.name"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.name }}
            </p>
          </div>

          <!-- Roll Number -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-purple-100 rounded">
                <Hash class="w-3 h-3 text-purple-600" />
              </div>
              Roll Number
            </label>
            <input
              v-model="newStudent.rollNumber"
              placeholder="Enter roll number"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.rollNumber"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.rollNumber }}
            </p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-green-100 rounded">
                <Mail class="w-3 h-3 text-green-600" />
              </div>
              Email Address
            </label>
            <input
              v-model="newStudent.email"
              type="email"
              placeholder="student@example.com"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.email"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.email }}
            </p>
          </div>

          <!-- Class -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-emerald-100 rounded">
                <List class="w-3 h-3 text-emerald-600" />
              </div>
              Class
            </label>
            <input
              v-model="newStudent.class"
              placeholder="Enter class"
              type="number"
              min="1"
              max="12"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.class"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.class }}
            </p>
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-orange-100 rounded">
                <Phone class="w-3 h-3 text-orange-600" />
              </div>
              Phone Number
            </label>
            <input
              v-model="newStudent.phone"
              placeholder="9876543210"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.phone"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.phone }}
            </p>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-indigo-100 rounded">
                <Activity class="w-3 h-3 text-indigo-600" />
              </div>
              Status
            </label>
            <select
              v-model="newStudent.status"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium bg-white text-sm md:text-base"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="leaved">Leaved</option>
              <option value="passout">Passed Out</option>
            </select>
            <p
              v-if="formErrors.status"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.status }}
            </p>
          </div>

          <!-- Enrollment Date -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-cyan-100 rounded">
                <Calendar class="w-3 h-3 text-cyan-600" />
              </div>
              Enrollment Date
            </label>
            <input
              type="date"
              v-model="newStudent.enrollmentDate"
              :max="new Date().toISOString().split('T')[0]"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base"
            />
            <p
              v-if="formErrors.enrollmentDate"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.enrollmentDate }}
            </p>
          </div>

          <!-- Address -->
          <div class="md:col-span-2 space-y-2">
            <label
              class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              <div class="p-1 bg-rose-100 rounded">
                <MapPin class="w-3 h-3 text-rose-600" />
              </div>
              Address
            </label>
            <textarea
              v-model="newStudent.address"
              placeholder="123 Main Street, City, State, ZIP"
              rows="3"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium resize-none text-sm md:text-base"
            ></textarea>
            <p
              v-if="formErrors.address"
              class="text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formErrors.address }}
            </p>
          </div>
        </div>
      </div>

      <!-- Fixed Footer -->
      <div class="flex-shrink-0 p-6 md:p-8 border-t border-slate-200">
        <div
          class="flex flex-col-reverse md:flex-row justify-end gap-3 md:gap-4"
        >
          <button
            @click="closeAddModal"
            class="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            @click="addStudent"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <Save class="w-4 h-4" />
            Save Student
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import {
    UserPlus,
    X,
    Save,
    User,
    Mail,
    Calendar,
    Hash,
    List,
    MapPin,
    Phone,
    Activity,
  } from "lucide-vue-next";
  import Search from "@/components/Students/Search/Search.vue";
  import GradeFilter from "@/components/Students/GradeFilter/GradeFilter.vue";
  import StatusFilter from "@/components/Students/StatusFilter/StatusFilter.vue";

  const store = useStore(); // Vuex store

  const showAddModal = ref(false);
  const formErrors = ref({});

  const newStudent = ref({
    rollNumber: "",
    name: "",
    email: "",
    class: "",
    phone: "",
    address: "",
    status: "",
    enrollmentDate: "",
  });

  // Reset and close modal
  function closeAddModal() {
    showAddModal.value = false;
  }

  // Vuex-powered add student
  async function addStudent() {
    if (!newStudent.value.name || !newStudent.value.email) {
      alert("Name and Email are required.");
      return;
    }

    try {
      // Create payload (password required by backend, and role is handled in Vuex)
      const payload = {
        name: newStudent.value.name,
        email: newStudent.value.email,
        password: "default123", // use real password field if needed
        phone: newStudent.value.phone,
        class: newStudent.value.class,
        rollNumber: newStudent.value.rollNumber,
        address: newStudent.value.address,
        status: newStudent.value.status,
        enrollmentDate: newStudent.value.enrollmentDate,
      };

      await store.dispatch("addStudent", payload);

      // Optionally reload the student list
      await store.dispatch("fetchStudents");

      // Reset form
      newStudent.value = {
        rollNumber: "",
        name: "",
        email: "",
        class: "",
        phone: "",
        address: "",
        status: "",
        enrollmentDate: "",
      };

      showAddModal.value = false;
    } catch (error) {
      if (error.response && error.response.data?.errors) {
        formErrors.value = error.response.data.errors;
      } else {
        alert("Something went wrong!");
      }
    }
  }
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  /* Custom scrollbar for modal */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
</style>

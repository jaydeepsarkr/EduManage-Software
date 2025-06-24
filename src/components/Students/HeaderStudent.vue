<template>
  <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
    <div
      class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
    >
      <div class="flex flex-col sm:flex-row gap-4 flex-1">
        <!-- Search -->
        <Search />
        <!-- Grade Filter -->
        <GradeFilter />
        <!-- Status Filter -->
        <StatusFilter />
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
  <!-- Add Student Modal -->
  <div
    v-if="showAddModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
  >
    <div
      class="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fade-in"
    >
      <!-- Close Button -->
      <button
        @click="closeAddModal"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition"
        title="Close"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="mb-6 flex items-center gap-2">
        <UserPlus class="w-6 h-6 text-blue-600" />
        <h2 class="text-xl font-semibold text-gray-800">Add New Student</h2>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <User class="w-4 h-4 text-blue-500" /> Full Name
          </label>
          <input
            v-model="newStudent.name"
            placeholder="Enter student name"
            class="input"
          />
          <p
            v-if="formErrors.name"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.name }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <Mail class="w-4 h-4 text-blue-500" /> Email
          </label>
          <input
            v-model="newStudent.email"
            placeholder="example@email.com"
            class="input"
          />
          <p
            v-if="formErrors.email"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.email }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <List class="w-4 h-4 text-blue-500" /> Class
          </label>
          <input
            v-model="newStudent.class"
            placeholder="Class"
            type="number"
            min="1"
            max="10"
            class="input"
          />
          <p
            v-if="formErrors.class"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.class }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <Hash class="w-4 h-4 text-blue-500" /> Roll No
          </label>
          <input
            v-model="newStudent.rollNumber"
            placeholder="Roll number"
            class="input"
          />
          <p
            v-if="formErrors.rollNumber"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.rollNumber }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <Calendar class="w-4 h-4 text-blue-500" /> Enrollment Date
          </label>
          <input
            type="date"
            v-model="newStudent.enrollmentDate"
            class="input"
            :max="new Date().toISOString().split('T')[0]"
          />
          <p
            v-if="formErrors.enrollmentDate"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.enrollmentDate }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <MapPin class="w-4 h-4 text-blue-500" /> Address
          </label>
          <textarea
            v-model="newStudent.address"
            placeholder="123 Main St, Springfield"
            class="input h-20 resize-none"
          />
          <p
            v-if="formErrors.address"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.address }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <Phone class="w-4 h-4 text-blue-500" /> Phone
          </label>
          <input
            v-model="newStudent.phone"
            placeholder="9876543210"
            class="input"
          />
          <p
            v-if="formErrors.phone"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.phone }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <Activity class="w-4 h-4 text-blue-500" /> Status
          </label>
          <select
            v-model="newStudent.status"
            class="input"
          >
            <option value="active">Active</option>
            <option value="leaved">Leaved</option>
            <option value="passout">Passout</option>
          </select>
          <p
            v-if="formErrors.status"
            class="text-sm text-red-600 mt-1"
          >
            {{ formErrors.status }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="addStudent"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Save class="w-4 h-4" />
          Save
        </button>
        <button
          @click="closeAddModal"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
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
  .input {
    @apply mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none;
  }
</style>

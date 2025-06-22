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
      class="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative animate-fade-in"
    >
      <!-- Close Button -->
      <button
        @click="closeAddModal"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        title="Close"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="mb-4 flex items-center gap-2">
        <UserPlus class="w-6 h-6 text-blue-600" />
        <h2 class="text-xl font-semibold text-gray-800">Add New Student</h2>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            v-model="newStudent.name"
            placeholder="Enter student name"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="newStudent.email"
            placeholder="example@email.com"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Grade</label>
          <input
            v-model="newStudent.grade"
            placeholder="10th Grade"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            v-model="newStudent.phone"
            placeholder="+1 (555) 123-4567"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <input
            v-model="newStudent.address"
            placeholder="123 Main St, Springfield"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="newStudent.status"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          @click="addStudent"
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
  import { X, UserPlus, Save } from "lucide-vue-next";
  import Search from "@/components/Students/Search/Search.vue";
  import GradeFilter from "@/components/Students/GradeFilter/GradeFilter.vue";
  import StatusFilter from "@/components/Students/StatusFilter/StatusFilter.vue";

  // Reactive data

  const showAddModal = ref(false);

  // Sample student data
  const students = ref([
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      grade: "10th Grade",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Springfield",
      status: "Active",
      enrollmentDate: "2024-01-15",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      grade: "11th Grade",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Shelbyville",
      status: "Active",
      enrollmentDate: "2024-01-20",
    },
  ]);

  const newStudent = ref({
    id: "",
    name: "",
    email: "",
    grade: "",
    phone: "",
    address: "",
    status: "Active",
    enrollmentDate: "",
  });

  function addStudent() {
    if (!newStudent.value.name || !newStudent.value.email) return;

    const id = `STU${Math.floor(1000 + Math.random() * 9000)}`; // Random ID
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    students.value.push({
      ...newStudent.value,
      id,
      enrollmentDate: today,
    });

    // Reset and close modal
    newStudent.value = {
      id: "",
      name: "",
      email: "",
      grade: "",
      phone: "",
      address: "",
      status: "Active",
      enrollmentDate: "",
    };
    showAddModal.value = false;
  }

  function closeAddModal() {
    showAddModal.value = false;
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

<template>
  <Title />
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
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { Search, Plus } from "lucide-vue-next";
  import Title from "@/components/Teacher/Title.vue";

  // Reactive data
  const searchQuery = ref("");
  const showModal = ref(false);

  const isEditing = ref(false);

  // Sample teachers data

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

  // Methods
  const openAddModal = () => {
    isEditing.value = false;
    resetCurrentTeacher();
    showModal.value = true;
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

<style></style>

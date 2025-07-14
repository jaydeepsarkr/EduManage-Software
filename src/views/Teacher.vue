<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <HeaderTeacher />
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
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, reactive } from "vue";
  import { Eye, Edit, Trash2 } from "lucide-vue-next";
  import HeaderTeacher from "@/components/Teacher/HeaderTeacher.vue";

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

  // const resetCurrentTeacher = () => {
  //   Object.assign(currentTeacher, {
  //     id: "",
  //     name: "",
  //     subject: "",
  //     email: "",
  //     phone: "",
  //     status: "Active",
  //     photo: "/placeholder.svg?height=40&width=40",
  //   });
  // };
</script>

<style scoped>
  /* Additional custom styles if needed */
</style>

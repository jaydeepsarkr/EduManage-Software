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
          <Search @search-text="emitSearchText" />
        </div>
        <!-- Filters Container -->
        <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div class="min-w-0">
            <!-- <GradeFilter /> -->
          </div>
          <div class="min-w-0">
            <StatusFilter @selected-class="emitSelectedClass" />
          </div>
        </div>
      </div>
      <!-- Enhanced Add Student Button -->
      <button
        @click="showAddModal = true"
        class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Plus class="w-5 h-5" />
        <span class="font-bold">Add Student</span>
      </button>
    </div>
  </div>

  <!-- Toast Notification -->
  <div
    v-if="showToast"
    class="fixed top-4 right-4 z-60 transform transition-all duration-300 ease-in-out"
    :class="
      showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    "
  >
    <div
      class="bg-white rounded-xl shadow-2xl border border-green-200 p-4 max-w-sm"
    >
      <div class="flex items-start gap-3">
        <!-- Success Icon -->
        <div
          class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle class="w-5 h-5 text-green-600" />
        </div>

        <!-- Toast Content -->
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-gray-900">Success!</h4>
          <p class="text-sm text-gray-600 mt-1">Student added successfully</p>
        </div>

        <!-- Close Button -->
        <button
          @click="closeToast"
          class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  <!-- Enhanced Scrollable Add Student Modal -->
  <div
    v-if="showAddModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <div
      class="bg-white w-full max-w-4xl max-h-[95vh] rounded-3xl shadow-2xl relative animate-fade-in border border-slate-200 flex flex-col"
    >
      <!-- Modal Loading Overlay -->
      <div
        v-if="isAdding"
        class="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center rounded-3xl"
      >
        <div class="text-center">
          <div
            class="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
          ></div>
          <p class="text-sm text-gray-600">Adding student...</p>
        </div>
      </div>

      <!-- Fixed Header -->
      <div class="flex-shrink-0 p-6 md:p-8 border-b border-slate-200">
        <!-- Close Button -->
        <button
          @click="closeAddModal"
          :disabled="isAdding"
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200 disabled:opacity-50"
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
              Fill in the student information and upload documents
            </p>
          </div>
        </div>
      </div>

      <!-- Scrollable Form Content -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <!-- Error Message -->
        <div
          v-if="generalError"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
        >
          <div class="p-1 bg-red-100 rounded-full">
            <AlertCircle class="w-4 h-4 text-red-600" />
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-red-800">Error</h4>
            <p class="text-sm text-red-700 mt-1">{{ generalError }}</p>
          </div>
          <button
            @click="
              () => {
                closeAddModal();
                generalError = '';
              }
            "
            class="p-1 text-red-400 hover:text-red-600 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="space-y-8">
          <!-- Basic Information Section -->
          <div class="bg-slate-50 rounded-xl p-6">
            <h3
              class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"
            >
              <div class="p-1 bg-blue-100 rounded">
                <User class="w-4 h-4 text-blue-600" />
              </div>
              Basic Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <!-- Full Name -->
              <div class="space-y-2">
                <label
                  class="block text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <div class="p-1 bg-blue-100 rounded">
                    <User class="w-3 h-3 text-blue-600" />
                  </div>
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newStudent.name"
                  :disabled="isAdding"
                  placeholder="Enter student name"
                  :class="[
                    'w-full rounded-xl border-2 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50',
                    formErrors.name
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-200',
                  ]"
                />
                <p
                  v-if="formErrors.name"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
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
                  Roll Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newStudent.rollNumber"
                  :disabled="isAdding"
                  placeholder="Enter roll number"
                  :class="[
                    'w-full rounded-xl border-2 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50',
                    formErrors.rollNumber
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-200',
                  ]"
                />
                <p
                  v-if="formErrors.rollNumber"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
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
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newStudent.email"
                  :disabled="isAdding"
                  type="email"
                  placeholder="student@example.com"
                  :class="[
                    'w-full rounded-xl border-2 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50',
                    formErrors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-200',
                  ]"
                />
                <p
                  v-if="formErrors.email"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
                  {{ formErrors.email }}
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
                  :disabled="isAdding"
                  placeholder="9876543210"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50"
                />
                <p
                  v-if="formErrors.phone"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
                  {{ formErrors.phone }}
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
                  :disabled="isAdding"
                  placeholder="Enter class"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50"
                />
                <p
                  v-if="formErrors.class"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
                  {{ formErrors.class }}
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
                  :disabled="isAdding"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium bg-white text-sm md:text-base disabled:opacity-50"
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
                  <AlertCircle class="w-4 h-4" />
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
                  :disabled="isAdding"
                  :max="new Date().toISOString().split('T')[0]"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50"
                />
                <p
                  v-if="formErrors.enrollmentDate"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
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
                  :disabled="isAdding"
                  placeholder="123 Main Street, City, State, ZIP"
                  rows="3"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 font-medium resize-none text-sm md:text-base disabled:opacity-50"
                ></textarea>
                <p
                  v-if="formErrors.address"
                  class="text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle class="w-4 h-4" />
                  {{ formErrors.address }}
                </p>
              </div>
            </div>
          </div>

          <!-- Photo Section -->
          <div class="bg-blue-50 rounded-xl p-6">
            <h3
              class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"
            >
              <div class="p-1 bg-blue-100 rounded">
                <Camera class="w-4 h-4 text-blue-600" />
              </div>
              Student Photo
            </h3>
            <div class="space-y-4">
              <!-- Current Photo Display -->
              <div
                v-if="newStudent.photo"
                class="flex items-center gap-4"
              >
                <img
                  :src="newStudent.photo"
                  alt="Student Photo"
                  class="w-16 h-16 rounded-lg object-cover border border-gray-300"
                />
                <div>
                  <p class="text-sm font-medium text-gray-700">
                    Photo Selected
                  </p>
                  <button
                    @click="newStudent.photo = ''"
                    :disabled="isAdding"
                    class="text-xs text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>

              <!-- Photo Upload -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handlePhotoUpload"
                  :disabled="isAdding"
                  class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50"
                />
                <p class="text-xs text-slate-500">
                  Upload a clear photo of the student (JPG, PNG, max 1MB - will
                  be automatically compressed)
                </p>
                <p
                  v-if="formErrors.photo"
                  class="text-sm text-red-600"
                >
                  {{ formErrors.photo }}
                </p>
              </div>
            </div>
          </div>

          <!-- Documents Section -->
          <div class="bg-yellow-50 rounded-xl p-6">
            <h3
              class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"
            >
              <div class="p-1 bg-yellow-100 rounded">
                <FileText class="w-4 h-4 text-yellow-600" />
              </div>
              Documents
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <!-- Document Upload Input Component (Reusable) -->
              <template
                v-for="doc in [
                  'aadhaarCard',
                  'birthCertificate',
                  'transferCertificate',
                  'marksheet',
                ]"
                :key="doc"
              >
                <div class="space-y-2">
                  <label
                    class="block text-sm font-semibold text-slate-700 capitalize"
                  >
                    {{ doc.replace(/([A-Z])/g, " $1") }}
                  </label>
                  <!-- If file uploaded -->
                  <div
                    v-if="newStudent[doc]"
                    class="mb-2"
                  >
                    <div
                      class="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded"
                    >
                      <CheckCircle class="w-4 h-4 text-green-600" />
                      <span class="text-sm text-green-700"
                        >Document uploaded</span
                      >
                      <button
                        @click="newStudent[doc] = ''"
                        :disabled="isAdding"
                        class="ml-auto text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    @change="handleDocumentUpload($event, doc)"
                    :disabled="isAdding"
                    class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50"
                  />
                  <p
                    v-if="formErrors[doc]"
                    class="text-sm text-red-600"
                  >
                    {{ formErrors[doc] }}
                  </p>
                </div>
              </template>
            </div>
            <p class="text-xs text-slate-500 mt-4">
              Supported formats: PDF, JPG, PNG (Max: 2MB per file - images will
              be compressed)
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
            :disabled="isAdding"
            class="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all duration-200 transform hover:scale-105 text-sm md:text-base disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="addStudent"
            :disabled="isAdding"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base disabled:opacity-50"
          >
            <div
              v-if="isAdding"
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
            <Save
              v-else
              class="w-4 h-4"
            />
            <span>{{ isAdding ? "Adding..." : "Save Student" }}</span>
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
    Plus,
    AlertCircle,
    Camera,
    FileText,
    CheckCircle,
  } from "lucide-vue-next";
  import Search from "@/components/Students/Search/Search.vue";
  import StatusFilter from "@/components/Students/StatusFilter/StatusFilter.vue";

  const store = useStore();
  const showAddModal = ref(false);
  const isAdding = ref(false);
  const generalError = ref("");

  // Toast notification state
  const showToast = ref(false);

  const formErrors = ref({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    class: "",
    address: "",
    status: "",
    enrollmentDate: "",
    photo: "",
    aadhaarCard: "",
    birthCertificate: "",
    transferCertificate: "",
    marksheet: "",
  });

  const newStudent = ref({
    rollNumber: "",
    name: "",
    email: "",
    class: "",
    phone: "",
    address: "",
    status: "",
    enrollmentDate: "",
    photo: "",
    aadhaarCard: "",
    birthCertificate: "",
    transferCertificate: "",
    marksheet: "",
  });

  const emit = defineEmits(["selected-class", "search-text"]);
  const emitSelectedClass = (val) => emit("selected-class", val);
  const emitSearchText = (val) => emit("search-text", val);

  // Toast functions
  const showSuccessToast = () => {
    showToast.value = true;
    // Auto close after 3 seconds
    setTimeout(() => {
      closeToast();
    }, 3000);
  };

  const closeToast = () => {
    showToast.value = false;
  };

  const closeAddModal = () => {
    showAddModal.value = false;
    // Reset form data
    newStudent.value = {
      rollNumber: "",
      name: "",
      email: "",
      class: "",
      phone: "",
      address: "",
      status: "",
      enrollmentDate: "",
      photo: "",
      aadhaarCard: "",
      birthCertificate: "",
      transferCertificate: "",
      marksheet: "",
    };
    // Clear errors
    formErrors.value = {};
    generalError.value = "";
  };

  // Image compression utility
  const compressImage = (
    file,
    quality = 0.7,
    maxWidth = 800,
    maxHeight = 600
  ) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          file.type,
          quality
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Base64 utility
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Photo Upload
  const handlePhotoUpload = async (event) => {
    formErrors.value.photo = "";
    generalError.value = "";

    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      formErrors.value.photo = "Only image files are allowed.";
      return;
    }

    if (file.size > 1024 * 1024) {
      formErrors.value.photo = "Photo must be less than 1MB.";
      return;
    }

    try {
      const compressedFile = await compressImage(file);
      newStudent.value.photo = compressedFile;
    } catch (error) {
      console.error("Image compression failed:", error);
      formErrors.value.photo = "Failed to process image.";
    }
  };

  // Document Upload
  const handleDocumentUpload = async (event, documentType) => {
    formErrors.value[documentType] = "";
    generalError.value = "";

    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      formErrors.value[documentType] = `${formatLabel(
        documentType
      )} must be a .jpg, .jpeg, .png, or .pdf file.`;
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      formErrors.value[documentType] = "File must be less than 2MB.";
      return;
    }

    try {
      let processedFile;
      if (file.type.startsWith("image/")) {
        processedFile = await compressImage(file, 0.8, 1200, 1600);
      } else {
        processedFile = await fileToBase64(file);
      }

      newStudent.value[documentType] = processedFile;
    } catch (error) {
      console.error("File processing failed:", error);
      formErrors.value[documentType] = "Failed to process file.";
    }
  };

  // Format label for error messages
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Add Student
  const addStudent = async () => {
    formErrors.value = {};
    generalError.value = "";

    if (!newStudent.value.name?.trim()) {
      formErrors.value.name = "Student name is required";
      return;
    }

    if (!newStudent.value.email?.trim()) {
      formErrors.value.email = "Email address is required";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStudent.value.email)) {
      formErrors.value.email = "Invalid email address";
      return;
    }

    if (!newStudent.value.rollNumber?.trim()) {
      formErrors.value.rollNumber = "Roll number is required";
      return;
    }

    isAdding.value = true;

    try {
      const payload = {
        name: newStudent.value.name.trim(),
        email: newStudent.value.email.trim(),
        password: "default123",
        phone: newStudent.value.phone?.trim() || "",
        class: newStudent.value.class || "",
        rollNumber: newStudent.value.rollNumber.trim(),
        address: newStudent.value.address?.trim() || "",
        status: newStudent.value.status || "active",
        enrollmentDate: newStudent.value.enrollmentDate || null,
        photo: newStudent.value.photo || "",
        aadhaarCard: newStudent.value.aadhaarCard || "",
        birthCertificate: newStudent.value.birthCertificate || "",
        transferCertificate: newStudent.value.transferCertificate || "",
        marksheet: newStudent.value.marksheet || "",
      };

      await store.dispatch("addStudent", payload);
      await store.dispatch("fetchStudents");

      // Close modal first

      // Show success toast
      showSuccessToast();
      closeAddModal();
    } catch (error) {
      console.error("Add student error:", error);
      if (
        error.response?.status === 413 ||
        error.message?.includes("too large") ||
        error.message?.includes("413")
      ) {
        generalError.value =
          "Files are too large. Use smaller images (under 1MB) and documents (under 2MB).";
      } else if (error.response?.data?.errors) {
        formErrors.value = error.response.data.errors;
      } else if (error.response?.data?.message) {
        generalError.value = error.response.data.message;
      } else if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.response.data?.error;
        switch (status) {
          case 400:
            generalError.value =
              message || "Invalid student data. Please check all fields.";
            break;
          case 409:
            generalError.value =
              message ||
              "A student with this email or roll number already exists.";
            break;
          case 422:
            generalError.value =
              message || "Please check your input data for errors.";
            break;
          default:
            generalError.value =
              message || `Error ${status}: Failed to add student.`;
        }
      } else if (error.request) {
        generalError.value =
          "Network error. Please check your internet connection.";
      } else {
        generalError.value =
          error.message || "An unexpected error occurred. Please try again.";
      }
    } finally {
      isAdding.value = false;
    }
  };
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

  /* Custom animations */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
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

  /* Disabled state improvements */
  .disabled\:opacity-50:disabled {
    opacity: 0.5;
  }

  .disabled\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }

  /* Toast animations */
  .translate-x-full {
    transform: translateX(100%);
  }

  .translate-x-0 {
    transform: translateX(0);
  }
</style>

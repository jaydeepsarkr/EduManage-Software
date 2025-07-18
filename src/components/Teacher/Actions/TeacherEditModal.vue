<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out"
      :class="{
        'scale-100 opacity-100': isOpen,
        'scale-95 opacity-0': !isOpen,
      }"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-100"
      >
        <h2 class="text-2xl font-bold text-gray-900">
          Edit Teacher: {{ localTeacher.name }}
        </h2>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
          title="Close"
        >
          <X class="w-6 h-6" />
        </button>
      </div>
      <form
        @submit.prevent="handleSave"
        class="p-6 space-y-8"
      >
        <!-- Basic Info -->
        <section class="space-y-6">
          <h3
            class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3"
          >
            Personal Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="localTeacher.name"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="localTeacher.email"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Phone</label
              >
              <input
                type="tel"
                id="phone"
                v-model="localTeacher.phone"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                for="dob"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Date of Birth</label
              >
              <input
                type="date"
                id="dob"
                :value="formatDateForInput(localTeacher.dob)"
                @input="localTeacher.dob = $event.target.value"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900"
              />
            </div>
            <div>
              <label
                for="role"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Role</label
              >
              <select
                id="role"
                v-model="localTeacher.role"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 bg-white text-gray-900"
              >
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                v-model="localTeacher.subject"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Status</label
              >
              <select
                id="status"
                v-model="localTeacher.status"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 bg-white text-gray-900"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <!-- Photo Upload -->
            <div>
              <label
                for="photo"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Photo</label
              >
              <input
                type="file"
                id="photo"
                @change="handlePhotoUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                accept="image/*"
              />
              <div
                v-if="photoPreview || localTeacher.photo"
                class="mt-3 flex items-center space-x-3"
              >
                <img
                  v-if="photoPreview"
                  :src="photoPreview"
                  alt="New Photo Preview"
                  class="w-16 h-16 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                />
                <img
                  v-else-if="localTeacher.photo"
                  :src="localTeacher.photo"
                  alt="Current Photo"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
                <span
                  v-if="photoPreview"
                  class="text-sm text-gray-600 font-medium"
                  >New Photo Selected</span
                >
                <span
                  v-else-if="localTeacher.photo"
                  class="text-sm text-gray-600"
                  >Current Photo</span
                >
              </div>
            </div>
          </div>
        </section>
        <!-- Aadhaar Info -->
        <section class="border-t border-gray-100 pt-8 space-y-6">
          <h3
            class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3"
          >
            Aadhaar Details
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="aadhaarNumber"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Aadhaar Number</label
              >
              <input
                type="text"
                id="aadhaarNumber"
                v-model="localTeacher.aadhaarNumber"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <!-- Aadhaar Card Upload -->
            <div>
              <label
                for="aadhaarCard"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Aadhaar Card Document</label
              >
              <input
                type="file"
                id="aadhaarCard"
                @change="handleAadhaarUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                accept=".pdf,image/*"
              />
              <div
                v-if="localTeacher.aadhaarCard"
                class="mt-3 flex items-center space-x-3"
              >
                <Paperclip class="w-5 h-5 text-gray-500" />
                <a
                  :href="localTeacher.aadhaarCard"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-blue-600 hover:underline"
                  >{{
                    localTeacher.aadhaarCard.startsWith("data:")
                      ? "New Document Selected"
                      : "Current Document"
                  }}</a
                >
              </div>
            </div>
          </div>
        </section>
        <!-- Address Info -->
        <section class="border-t border-gray-100 pt-8 space-y-6">
          <h3
            class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3"
          >
            Address Details
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                for="vtc"
                class="block text-sm font-medium text-gray-700 mb-1"
                >VTC</label
              >
              <input
                type="text"
                id="vtc"
                v-model="localTeacher.vtc"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="postOffice"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Post Office</label
              >
              <input
                type="text"
                id="postOffice"
                v-model="localTeacher.postOffice"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="subDistrict"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Sub-District</label
              >
              <input
                type="text"
                id="subDistrict"
                v-model="localTeacher.subDistrict"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="state"
                class="block text-sm font-medium text-gray-700 mb-1"
                >State</label
              >
              <input
                type="text"
                id="state"
                v-model="localTeacher.state"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="pincode"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Pincode</label
              >
              <input
                type="text"
                id="pincode"
                v-model="localTeacher.pincode"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        </section>
        <!-- Qualifications -->
        <section class="border-t border-gray-100 pt-8 space-y-6">
          <h3
            class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3"
          >
            Qualifications
          </h3>
          <div
            v-for="(q, index) in localTeacher.qualifications"
            :key="index"
            class="grid grid-cols-1 md:grid-cols-4 gap-6 p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
          >
            <div>
              <label
                :for="`q-type-${index}`"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Type</label
              >
              <input
                type="text"
                :id="`q-type-${index}`"
                v-model="q.type"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                :for="`q-institution-${index}`"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Institution</label
              >
              <input
                type="text"
                :id="`q-institution-${index}`"
                v-model="q.institution"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                :for="`q-year-${index}`"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Year</label
              >
              <input
                type="text"
                :id="`q-year-${index}`"
                v-model="q.year"
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div class="flex items-end gap-3">
              <div class="flex-grow">
                <label
                  :for="`q-file-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Document</label
                >
                <input
                  type="file"
                  :id="`q-file-${index}`"
                  @change="(event) => handleQualificationUpload(event, index)"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  accept=".pdf,image/*"
                />
                <div
                  v-if="q.fileUrl"
                  class="mt-3 flex items-center space-x-3"
                >
                  <Paperclip class="w-5 h-5 text-gray-500" />
                  <a
                    :href="q.fileUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-blue-600 hover:underline"
                    >{{
                      q.fileUrl.startsWith("data:")
                        ? "New Document Selected"
                        : "Current Document"
                    }}</a
                  >
                </div>
              </div>
              <button
                type="button"
                @click="removeQualification(index)"
                class="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-colors duration-150 flex-shrink-0"
                title="Remove Qualification"
              >
                <MinusCircle class="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addQualification"
            class="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusCircle class="w-5 h-5 mr-2" /> Add Qualification
          </button>
        </section>
        <!-- Remarks -->
        <section class="border-t border-gray-100 pt-8 space-y-6">
          <h3
            class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3"
          >
            Remarks
          </h3>
          <div>
            <label
              for="remark"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Remark</label
            >
            <textarea
              id="remark"
              v-model="localTeacher.remark"
              rows="4"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400"
            ></textarea>
          </div>
        </section>
        <div
          class="flex justify-end space-x-4 border-t border-gray-100 pt-6 mt-6"
        >
          <button
            type="button"
            @click="emit('close')"
            :disabled="isLoading"
            class="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              Saving...
            </span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, defineProps, defineEmits } from "vue";
  import { X, PlusCircle, MinusCircle, Paperclip } from "lucide-vue-next";

  const props = defineProps({
    teacher: {
      type: Object,
      default: null,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      // New prop for loading state
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["close", "save"]);

  const localTeacher = ref({});
  const photoPreview = ref(null); // Still used for displaying the new photo preview

  // Watch for changes in the prop.teacher and update localTeacher and clear file selections
  watch(
    () => props.teacher,
    (newTeacher) => {
      if (newTeacher) {
        // Deep copy the teacher object to avoid direct mutation of props
        localTeacher.value = JSON.parse(JSON.stringify(newTeacher));
        if (!localTeacher.value.qualifications) {
          localTeacher.value.qualifications = [];
        }
        // Set photo preview based on current photo URL
        photoPreview.value = localTeacher.value.photo || null;
      } else {
        localTeacher.value = {};
        photoPreview.value = null;
      }
    },
    { immediate: true, deep: true }
  );

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Error formatting date for input:", e);
      return "";
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localTeacher.value.photo = e.target.result; // Store Base64 string
        photoPreview.value = e.target.result; // Update preview
      };
      reader.readAsDataURL(file);
    } else {
      localTeacher.value.photo = null; // Clear photo if input is cleared
      photoPreview.value = null;
    }
  };

  const handleAadhaarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localTeacher.value.aadhaarCard = e.target.result; // Store Base64 string
      };
      reader.readAsDataURL(file);
    } else {
      localTeacher.value.aadhaarCard = null; // Clear Aadhaar card if input is cleared
    }
  };

  const handleQualificationUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (localTeacher.value.qualifications[index]) {
          localTeacher.value.qualifications[index].fileUrl = e.target.result; // Store Base64 string
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (localTeacher.value.qualifications[index]) {
        localTeacher.value.qualifications[index].fileUrl = null; // Clear document if input is cleared
      }
    }
  };

  const addQualification = () => {
    if (!localTeacher.value.qualifications) {
      localTeacher.value.qualifications = [];
    }
    localTeacher.value.qualifications.push({
      type: "",
      institution: "",
      year: "",
      fileUrl: null, // Initialize with null for fileUrl
    });
  };

  const removeQualification = (index) => {
    localTeacher.value.qualifications.splice(index, 1);
  };

  const handleSave = () => {
    // Emit only the localTeacher data, as all file data (Base64 or URLs) is now within it
    emit("save", {
      teacherData: localTeacher.value,
    });
  };
</script>

<style scoped>
  /* Basic modal transition styles */
  .scale-95 {
    transform: scale(0.95);
  }
  .opacity-0 {
    opacity: 0;
  }
  .scale-100 {
    transform: scale(1);
  }
  .opacity-100 {
    opacity: 1;
  }
</style>

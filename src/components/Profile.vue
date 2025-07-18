<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
    <div
      class="max-w-4xl mx-auto bg-white rounded-3xl shadow-1xl border border-gray-100 relative overflow-hidden"
    >
      <!-- Loading Overlay -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center transition-opacity duration-300 ease-in-out"
      >
        <div class="text-center">
          <div
            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"
          ></div>
          <p class="text-lg font-medium text-gray-700">Processing...</p>
          <p class="text-sm text-gray-500 mt-1">Please wait a moment.</p>
        </div>
      </div>

      <div class="p-6 sm:p-8 lg:p-10">
        <h1
          class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b-2 border-blue-100 pb-4 text-center sm:text-left"
        >
          My Profile
        </h1>

        <div v-if="currentUser">
          <!-- Profile Header & Photo Upload -->
          <section
            class="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-10 pb-8 border-b border-gray-100"
          >
            <div class="relative group flex-shrink-0">
              <img
                :src="
                  photoPreview ||
                  displayPhotoUrl ||
                  '/placeholder.svg?height=128&width=128'
                "
                :alt="currentUser.name || 'Profile Photo'"
                class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <label
                for="profile-photo-upload"
                class="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform group-hover:scale-110"
                title="Change profile photo"
              >
                <Camera class="w-5 h-5 sm:w-6 sm:h-6" />
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handlePhotoUpload"
                  :disabled="isLoading"
                />
              </label>
            </div>
            <div class="text-center sm:text-left flex-1 min-w-0">
              <h2
                class="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
              >
                {{ currentUser.name || "N/A" }}
              </h2>
              <p class="text-lg text-gray-600 mt-2">
                Role:
                <span class="font-semibold text-blue-700">{{
                  capitalize(currentUser.role) || "N/A"
                }}</span>
              </p>
              <p class="text-sm text-gray-500 mt-2">
                School ID:
                <span
                  class="font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-md text-xs"
                  >{{ currentUser.schoolId || "N/A" }}</span
                >
              </p>
              <button
                v-if="photoPreview && photoPreview !== displayPhotoUrl"
                @click="updateProfilePhoto"
                :disabled="isLoading"
                class="mt-5 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                <UploadCloud class="w-5 h-5 mr-2" />
                {{ isLoading ? "Uploading..." : "Save New Photo" }}
              </button>
            </div>
          </section>

          <!-- Common Details -->
          <section class="mb-10 space-y-6">
            <h3
              class="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center"
            >
              <Info class="w-6 h-6 mr-3 text-blue-500" /> General Information
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Email:</span>
                  {{ currentUser.email || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Phone:</span>
                  {{ currentUser.phone || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Status:</span>
                  <span
                    :class="
                      currentUser.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ml-2"
                  >
                    {{ capitalize(currentUser.status) || "N/A" }}
                  </span>
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Address:</span>
                  {{ currentUser.address || "N/A" }}
                </p>
              </div>
              <div
                v-if="currentUser.role !== 'admin'"
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm col-span-full"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Remarks:</span>
                  {{ currentUser.remark || "N/A" }}
                </p>
              </div>
            </div>
          </section>

          <!-- Student Specific Details -->
          <section
            v-if="currentUser.role === 'student'"
            class="mb-10 space-y-6"
          >
            <h3
              class="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center"
            >
              <GraduationCap class="w-6 h-6 mr-3 text-blue-500" /> Student
              Details
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Class:</span>
                  {{ currentUser.class || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Roll Number:</span>
                  {{ currentUser.rollNumber || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900"
                    >Enrollment Date:</span
                  >
                  {{ formatDate(currentUser.enrollmentDate) || "N/A" }}
                </p>
              </div>
            </div>
            <div class="mt-8 space-y-4">
              <h4 class="text-xl font-semibold text-gray-800 flex items-center">
                <FileText class="w-5 h-5 mr-2 text-blue-500" /> Documents:
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-if="currentUser.birthCertificate"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span class="font-semibold text-gray-900 text-base"
                    >Birth Certificate:</span
                  >
                  <a
                    :href="currentUser.birthCertificate"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline flex items-center text-sm mt-2 transition-colors duration-200"
                  >
                    <Paperclip class="w-4 h-4 mr-2" /> View Document
                  </a>
                </div>
                <div
                  v-if="currentUser.transferCertificate"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span class="font-semibold text-gray-900 text-base"
                    >Transfer Certificate:</span
                  >
                  <a
                    :href="currentUser.transferCertificate"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline flex items-center text-sm mt-2 transition-colors duration-200"
                  >
                    <Paperclip class="w-4 h-4 mr-2" /> View Document
                  </a>
                </div>
                <div
                  v-if="currentUser.marksheet"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span class="font-semibold text-gray-900 text-base"
                    >Marksheet:</span
                  >
                  <a
                    :href="currentUser.marksheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline flex items-center text-sm mt-2 transition-colors duration-200"
                  >
                    <Paperclip class="w-4 h-4 mr-2" /> View Document
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Teacher Specific Details -->
          <section
            v-else-if="currentUser.role === 'teacher'"
            class="mb-10 space-y-6"
          >
            <h3
              class="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center"
            >
              <Briefcase class="w-6 h-6 mr-3 text-blue-500" /> Teacher Details
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900"
                    >Date of Birth:</span
                  >
                  {{ formatDate(currentUser.dob) || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Subject:</span>
                  {{ currentUser.subject || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900"
                    >Aadhaar Number:</span
                  >
                  {{ currentUser.aadhaarNumber || "N/A" }}
                </p>
              </div>
              <div
                v-if="currentUser.aadhaarCard"
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <span class="font-semibold text-gray-900 text-base"
                  >Aadhaar Card:</span
                >
                <a
                  :href="currentUser.aadhaarCard"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline flex items-center text-sm mt-2 transition-colors duration-200"
                >
                  <Paperclip class="w-4 h-4 mr-2" /> View Document
                </a>
              </div>
            </div>
            <!-- Address Details for Teacher - Removed as per request -->
            <div
              v-if="
                currentUser.qualifications &&
                currentUser.qualifications.length > 0
              "
              class="mt-8 space-y-4"
            >
              <h4 class="text-xl font-semibold text-gray-800 flex items-center">
                <Award class="w-5 h-5 mr-2 text-blue-500" /> Qualifications:
              </h4>
              <ul class="list-none pl-0 space-y-3">
                <li
                  v-for="(q, index) in currentUser.qualifications"
                  :key="index"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <p class="text-gray-700 text-base">
                    <span class="font-semibold text-gray-900">{{
                      q.type || "N/A"
                    }}</span>
                    from
                    <span class="font-medium">{{
                      q.institution || "N/A"
                    }}</span>
                    ({{ q.year || "N/A" }})
                  </p>
                  <div v-if="q.fileUrl">
                    <a
                      :href="q.fileUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:underline flex items-center text-sm mt-2 transition-colors duration-200"
                    >
                      <Paperclip class="w-4 h-4 mr-2" /> View Document
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Admin Specific Details (subset of common fields, explicitly listed for clarity) -->
          <section
            v-else-if="currentUser.role === 'admin'"
            class="mb-10 space-y-6"
          >
            <h3
              class="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center"
            >
              <ShieldCheck class="w-6 h-6 mr-3 text-blue-500" /> Admin Details
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Email:</span>
                  {{ currentUser.email || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Phone:</span>
                  {{ currentUser.phone || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">School ID:</span>
                  {{ currentUser.schoolId || "N/A" }}
                </p>
              </div>
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p class="text-gray-700 text-base">
                  <span class="font-semibold text-gray-900">Role:</span>
                  {{ capitalize(currentUser.role) || "N/A" }}
                </p>
              </div>
            </div>
          </section>

          <!-- Document Change Warning - Hidden for Admin -->
          <div
            v-if="currentUser.role !== 'admin'"
            class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-5 rounded-lg mb-10 shadow-md"
            role="alert"
          >
            <div class="flex items-center">
              <AlertTriangle
                class="w-6 h-6 mr-3 flex-shrink-0 text-yellow-500"
              />
              <p class="text-sm sm:text-base font-medium">
                To change any document (e.g., Birth Certificate, Aadhaar Card,
                Qualification documents), please contact the Admin or Principal.
              </p>
            </div>
          </div>

          <!-- Change Password Section -->
          <section class="space-y-6">
            <h3
              class="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex items-center"
            >
              <Lock class="w-6 h-6 mr-3 text-blue-500" /> Change Password
            </h3>
            <form
              @submit.prevent="changePassword"
              class="space-y-5"
            >
              <div>
                <label
                  for="current-password"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Current Password</label
                >
                <input
                  id="current-password"
                  type="password"
                  v-model="passwordForm.currentPassword"
                  required
                  :disabled="isLoading"
                  class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label
                  for="new-password"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >New Password</label
                >
                <input
                  id="new-password"
                  type="password"
                  v-model="passwordForm.newPassword"
                  required
                  :disabled="isLoading"
                  class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Confirm New Password</label
                >
                <input
                  id="confirm-password"
                  type="password"
                  v-model="passwordForm.confirmPassword"
                  required
                  :disabled="isLoading"
                  class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>
              <button
                type="submit"
                :disabled="isLoading"
                class="inline-flex justify-center py-3 px-6 border border-transparent shadow-md text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
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
                  Changing...
                </span>
                <span v-else>Change Password</span>
              </button>
            </form>
          </section>
        </div>
        <div
          v-else
          class="text-center py-16 text-gray-500"
        >
          <p class="text-xl font-medium">Loading profile data...</p>
          <p class="text-base mt-3">
            Please ensure you are logged in and refresh the page.
          </p>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
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
  </div>
</template>

<script setup>
  import { ref, computed, reactive, onMounted, watch } from "vue";
  import { useStore } from "vuex";
  import {
    Camera,
    UploadCloud,
    Paperclip,
    Info,
    CheckCircle,
    XCircle,
    GraduationCap, // Added for student details
    Briefcase, // Added for teacher details
    ShieldCheck, // Added for admin details
    AlertTriangle, // Added for warning
    Lock, // Added for change password
    FileText, // Added for documents
    Award, // Added for qualifications
  } from "lucide-vue-next";

  const store = useStore();

  // State
  const photoPreview = ref(null);
  const isLoading = ref(false); // General loading state for actions
  const passwordForm = reactive({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Toast
  const toast = reactive({
    isVisible: false,
    message: "",
    type: "info",
  });
  let toastTimeoutId = null;

  // Computed properties from Vuex getters
  const currentUser = computed(() => store.state.currentUserDetails);

  // Local computed property for displaying photo URL, handling base URL logic
  const displayPhotoUrl = computed(() => {
    const path = currentUser.value?.photo;
    const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:5000";
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `${baseURL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  });

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

  // Utility functions
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  const showToast = (msg, type = "info", duration = 3000) => {
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toast.message = msg;
    toast.type = type;
    toast.isVisible = true;
    toastTimeoutId = setTimeout(() => {
      toast.isVisible = false;
    }, duration);
  };

  // Photo upload logic
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.value = e.target.result; // Set preview to Base64 string
      };
      reader.readAsDataURL(file);
    } else {
      photoPreview.value = displayPhotoUrl.value; // Revert to current photo if cleared
    }
  };

  const updateProfilePhoto = async () => {
    if (!photoPreview.value || !currentUser.value) {
      showToast("No new photo selected.", "info");
      return;
    }

    isLoading.value = true;
    try {
      if (currentUser.value.role === "teacher") {
        await store.dispatch("editTeacherById", {
          teacherId: currentUser.value._id,
          updates: { photo: photoPreview.value },
        });
      } else {
        await store.dispatch("editUserById", {
          userId: currentUser.value._id,
          updates: { photo: photoPreview.value },
        });
      }
      // After successful update, re-fetch current user to ensure all data is fresh
      await store.dispatch("fetchCurrentUser");
      // Reset photoPreview to null to hide the "Save New Photo" button
      photoPreview.value = null;
      showToast("Profile photo updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile photo:", error);
      showToast("Failed to update profile photo.", "error");
    } finally {
      isLoading.value = false;
    }
  };

  // Change password logic
  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match.", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      // Basic validation
      showToast("New password must be at least 6 characters long.", "error");
      return;
    }

    isLoading.value = true;
    try {
      await store.dispatch("changeUserPassword", {
        userId: currentUser.value._id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      showToast("Password changed successfully!", "success");
      // Clear form
      passwordForm.currentPassword = "";
      passwordForm.newPassword = "";
      passwordForm.confirmPassword = "";
    } catch (error) {
      console.error("Error changing password:", error);
      showToast(
        error.message ||
          "Failed to change password. Please check your current password.",
        "error"
      );
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch user data on component mount
  onMounted(async () => {
    isLoading.value = true;
    try {
      await store.dispatch("fetchCurrentUser");
    } catch (error) {
      console.error("Error fetching current user:", error);
      showToast("Failed to load profile data.", "error");
    } finally {
      isLoading.value = false;
    }
  });

  // Watch for changes in the currentUser object to initialize photoPreview
  // This ensures photoPreview reflects the current profile photo from the store
  // unless a new file is actively selected by the user.
  watch(
    currentUser,
    // eslint-disable-next-line no-unused-vars
    (newVal) => {
      // Only update photoPreview if it's not currently showing a new unsaved photo
      // (i.e., if photoPreview is null or matches the current displayPhotoUrl)
      if (!photoPreview.value || photoPreview.value === displayPhotoUrl.value) {
        photoPreview.value = displayPhotoUrl.value || null;
      }
    },
    { immediate: true, deep: true } // Run immediately on component mount and deep watch for object changes
  );
</script>

<style scoped>
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

  /* Disabled state improvements */
  .disabled\:opacity-50:disabled {
    opacity: 0.5;
  }
  .disabled\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }
</style>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out"
      :class="{
        'scale-100 opacity-100': isOpen,
        'scale-95 opacity-0': !isOpen,
      }"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-100"
      >
        <h2 class="text-2xl font-bold text-gray-900">Teacher Details</h2>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
          title="Close"
        >
          <X class="w-6 h-6" />
        </button>
      </div>
      <div
        v-if="teacher"
        class="p-8 space-y-8"
      >
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 pb-6 border-b border-gray-100"
        >
          <img
            :src="teacher.photo || '/placeholder.svg?height=128&width=128'"
            :alt="teacher.name"
            class="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg flex-shrink-0"
          />
          <div class="text-center sm:text-left">
            <h3 class="text-4xl font-extrabold text-gray-900">
              {{ teacher.name }}
            </h3>
            <p class="text-lg text-gray-500 mt-2">
              ID: <span class="font-mono text-gray-600">{{ teacher._id }}</span>
            </p>
            <p class="text-md text-gray-500 mt-1">{{ teacher.role }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Contact Info -->
          <div
            class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md"
          >
            <h4
              class="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-3"
            >
              <User class="w-6 h-6 mr-3 text-blue-600" /> Contact Information
            </h4>
            <p class="text-base text-gray-800 mb-2">
              <span class="font-medium text-gray-700">Email:</span>
              {{ teacher.email }}
            </p>
            <p class="text-base text-gray-800 mb-2">
              <span class="font-medium text-gray-700">Phone:</span>
              {{ teacher.phone }}
            </p>
            <p class="text-base text-gray-800 mb-2">
              <span class="font-medium text-gray-700">DOB:</span>
              {{ formatDate(teacher.dob) }}
            </p>
            <p class="text-base text-gray-800">
              <span class="font-medium text-gray-700">Status:</span>
              <span
                :class="
                  teacher.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ml-2"
              >
                {{ teacher.status }}
              </span>
            </p>
          </div>
          <!-- Subject & Aadhaar -->
          <div
            class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md"
          >
            <h4
              class="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-3"
            >
              <Briefcase class="w-6 h-6 mr-3 text-blue-600" /> Professional & ID
            </h4>
            <p class="text-base text-gray-800 mb-2">
              <span class="font-medium text-gray-700">Subject:</span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 ml-2"
              >
                {{ teacher.subject }}
              </span>
            </p>
            <p
              v-if="teacher.aadhaarNumber"
              class="text-base text-gray-800 mb-2"
            >
              <span class="font-medium text-gray-700">Aadhaar Number:</span>
              {{ teacher.aadhaarNumber }}
            </p>
            <div
              v-if="teacher.aadhaarCard"
              class="mt-3"
            >
              <span class="font-medium text-gray-700">Aadhaar Card:</span>
              <div v-if="isImage(teacher.aadhaarCard)">
                <img
                  :src="teacher.aadhaarCard"
                  alt="Aadhaar Card"
                  class="mt-3 max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
              <div v-else-if="isPdf(teacher.aadhaarCard)">
                <a
                  :href="teacher.aadhaarCard"
                  target="_blank"
                  rel="noopener noreferrer"
                  :download="
                    teacher.aadhaarCard.startsWith('data:')
                      ? 'aadhaar_card.pdf'
                      : null
                  "
                  class="text-blue-600 hover:underline flex items-center text-sm mt-1"
                >
                  <Paperclip class="w-4 h-4 mr-2" /> View/Download Document
                </a>
              </div>
              <div v-else>
                <a
                  :href="teacher.aadhaarCard"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline flex items-center text-sm mt-1"
                >
                  <Paperclip class="w-4 h-4 mr-2" /> View Document (Unsupported
                  Type)
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Address -->
        <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <h4
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-3"
          >
            <MapPin class="w-6 h-6 mr-3 text-blue-600" /> Address Details
          </h4>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-base text-gray-800"
          >
            <p v-if="teacher.vtc">
              <span class="font-medium text-gray-700">VTC:</span>
              {{ teacher.vtc }}
            </p>
            <p v-if="teacher.postOffice">
              <span class="font-medium text-gray-700">Post Office:</span>
              {{ teacher.postOffice }}
            </p>
            <p v-if="teacher.subDistrict">
              <span class="font-medium text-gray-700">Sub-District:</span>
              {{ teacher.subDistrict }}
            </p>
            <p v-if="teacher.state">
              <span class="font-medium text-gray-700">State:</span>
              {{ teacher.state }}
            </p>
            <p v-if="teacher.pincode">
              <span class="font-medium text-gray-700">Pincode:</span>
              {{ teacher.pincode }}
            </p>
          </div>
        </div>
        <!-- Qualifications -->
        <div
          v-if="teacher.qualifications && teacher.qualifications.length > 0"
          class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md"
        >
          <h4
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-3"
          >
            <GraduationCap class="w-6 h-6 mr-3 text-blue-600" /> Qualifications
          </h4>
          <ul class="list-none pl-0 space-y-4">
            <li
              v-for="(q, index) in teacher.qualifications"
              :key="index"
              class="text-base text-gray-800 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <span class="font-medium text-gray-700">{{ q.type }}</span> from
              <span class="font-semibold">{{ q.institution }}</span> ({{
                q.year
              }})
              <div v-if="q.fileUrl">
                <a
                  v-if="isPdf(q.fileUrl)"
                  :href="q.fileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :download="
                    q.fileUrl.startsWith('data:')
                      ? `qualification_${index + 1}.pdf`
                      : null
                  "
                  class="text-blue-600 hover:underline flex items-center text-sm mt-2"
                >
                  <Paperclip class="w-4 h-4 mr-2" /> View/Download Document
                </a>
                <img
                  v-else-if="isImage(q.fileUrl)"
                  :src="q.fileUrl"
                  alt="Qualification Document"
                  class="mt-2 max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                />
                <a
                  v-else
                  :href="q.fileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline flex items-center text-sm mt-2"
                >
                  <Paperclip class="w-4 h-4 mr-2" /> View Document (Unsupported
                  Type)
                </a>
              </div>
            </li>
          </ul>
        </div>
        <!-- Remarks -->
        <div
          v-if="teacher.remark"
          class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md"
        >
          <h4
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-3"
          >
            <MessageSquare class="w-6 h-6 mr-3 text-blue-600" /> Remarks
          </h4>
          <p class="text-base text-gray-800">{{ teacher.remark }}</p>
        </div>
      </div>
      <div
        v-else
        class="p-8 text-center text-gray-500 text-lg"
      >
        No teacher data available for display.
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from "vue";
  import {
    X,
    Paperclip,
    User,
    Briefcase,
    MapPin,
    GraduationCap,
    MessageSquare,
  } from "lucide-vue-next";

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    teacher: {
      type: Object,
      default: null,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(["close"]);

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

  const isImage = (urlOrBase64) => {
    if (!urlOrBase64) return false;
    // Check for common image file extensions in URLs
    if (/\.(jpeg|jpg|gif|png|svg|webp)$/i.test(urlOrBase64)) {
      return true;
    }
    // Check for Base64 image data URLs
    if (urlOrBase64.startsWith("data:image/")) {
      return true;
    }
    return false;
  };

  const isPdf = (urlOrBase64) => {
    if (!urlOrBase64) return false;
    // Check for .pdf extension in URLs
    if (/\.pdf$/i.test(urlOrBase64)) {
      return true;
    }
    // Check for Base64 PDF data URLs
    if (urlOrBase64.startsWith("data:application/pdf")) {
      return true;
    }
    return false;
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

<template>
  <Title />
  <!-- Action Bar -->
  <div class="bg-white p-6 mb-8">
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
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-all duration-200"
          />
        </div>
      </div>
      <button
        v-show="role === 'admin' || role === 'superadmin'"
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
      >
        <Plus class="w-4 h-4" />
        Add Teacher
      </button>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-out scale-95 opacity-0"
      :class="{ 'scale-100 opacity-100': showModal }"
    >
      <div
        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10"
      >
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isEditing ? "Edit Teacher" : "Add New Teacher" }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
      </div>
      <form
        @submit.prevent="submitForm"
        class="p-8 space-y-10"
      >
        <!-- Personal Information -->
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-4">
            Personal Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Full Name *</label
              >
              <input
                v-model="currentTeacher.name"
                type="text"
                :class="{ 'border-red-500': fieldErrors.name }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter full name"
              />
              <p
                v-if="fieldErrors.name"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.name }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email *</label
              >
              <input
                v-model="currentTeacher.email"
                type="email"
                :class="{ 'border-red-500': fieldErrors.email }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter email address"
              />
              <p
                v-if="fieldErrors.email"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.email }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Mobile Number *</label
              >
              <input
                v-model="currentTeacher.mobile"
                type="tel"
                :class="{ 'border-red-500': fieldErrors.mobile }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter 10-digit mobile number"
              />
              <p
                v-if="fieldErrors.mobile"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.mobile }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Date of Birth *</label
              >
              <input
                v-model="currentTeacher.dob"
                type="date"
                :class="{ 'border-red-500': fieldErrors.dob }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <p
                v-if="fieldErrors.dob"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.dob }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Subject *</label
              >
              <input
                v-model="currentTeacher.subject"
                type="text"
                :class="{ 'border-red-500': fieldErrors.subject }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., Mathematics, Science"
              />
              <p
                v-if="fieldErrors.subject"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.subject }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status *</label
              >
              <select
                v-model="currentTeacher.status"
                :class="{ 'border-red-500': fieldErrors.status }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="leaved">Leaved</option>
              </select>
              <p
                v-if="fieldErrors.status"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.status }}
              </p>
            </div>
          </div>
        </div>
        <!-- Profile Photo Upload -->
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-4">
            Profile Photo
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Upload Profile Photo *</label
              >
              <div
                class="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                :class="
                  fieldErrors.profilePhotoFile
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                "
                @click="$refs.profilePhotoInput.click()"
              >
                <input
                  ref="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  @change="handleProfilePhotoUpload"
                  class="hidden"
                />
                <div v-if="!profilePhotoFile">
                  <Upload class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p class="text-sm text-gray-600">
                    Click to upload profile photo
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Supports JPG, PNG (Max 5MB)
                  </p>
                </div>
                <div
                  v-else
                  class="space-y-2"
                >
                  <img
                    v-if="profilePhotoPreview"
                    :src="profilePhotoPreview"
                    alt="Profile Photo Preview"
                    class="mx-auto h-24 w-24 object-cover rounded-full mb-2 shadow-md"
                  />
                  <p class="text-sm text-gray-600">
                    {{ profilePhotoFile.name }}
                  </p>
                  <button
                    type="button"
                    @click.stop="removeProfilePhotoFile"
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove file
                  </button>
                </div>
              </div>
              <p
                v-if="fieldErrors.profilePhotoFile"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.profilePhotoFile }}
              </p>
            </div>
          </div>
        </div>
        <!-- Aadhaar Card Upload -->
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-4">
            Aadhaar Card Verification
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Upload Aadhaar Card *</label
              >
              <div
                class="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                :class="
                  fieldErrors.aadhaarFile
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                "
                @click="$refs.aadhaarInput.click()"
              >
                <input
                  ref="aadhaarInput"
                  type="file"
                  accept="image/*,.pdf"
                  @change="handleAadhaarUpload"
                  class="hidden"
                />
                <div v-if="!aadhaarFile">
                  <Upload class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p class="text-sm text-gray-600">
                    Click to upload Aadhaar card
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Supports JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>
                <div
                  v-else
                  class="space-y-2"
                >
                  <FileText class="mx-auto h-12 w-12 text-green-500" />
                  <p class="text-sm text-gray-600">{{ aadhaarFile.name }}</p>
                  <button
                    type="button"
                    @click.stop="removeAadhaarFile"
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove file
                  </button>
                </div>
              </div>
              <p
                v-if="fieldErrors.aadhaarFile"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.aadhaarFile }}
              </p>
            </div>
            <!-- Aadhaar Number Field -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Aadhaar Number *</label
              >
              <input
                v-model="currentTeacher.aadhaarNumber"
                type="text"
                :class="{ 'border-red-500': fieldErrors.aadhaarNumber }"
                maxlength="14"
                @input="formatAadhaarNumber"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter 12-digit Aadhaar number (XXXX XXXX XXXX)"
              />
              <p class="text-xs text-gray-500 mt-1">Format: XXXX XXXX XXXX</p>
              <p
                v-if="fieldErrors.aadhaarNumber"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.aadhaarNumber }}
              </p>
            </div>
            <div
              v-if="aadhaarProcessing"
              class="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm"
            >
              <div class="flex items-center gap-3">
                <div class="relative w-5 h-5">
                  <div
                    class="absolute inset-0 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"
                  ></div>
                </div>
                <span class="text-sm font-medium text-blue-700">
                  Processing Aadhaar card... This may take a moment.
                </span>
              </div>
              <div class="mt-2 text-xs text-blue-600 pl-8">
                🔄 Step {{ ocrStep }}/3:
                <span class="italic">{{ ocrStepText }}</span>
              </div>
            </div>
            <div
              v-if="ocrError"
              class="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div class="flex items-center">
                <AlertCircle class="h-4 w-4 text-red-500 mr-2" />
                <span class="text-sm text-red-700">{{ ocrError }}</span>
              </div>
              <button
                type="button"
                @click="retryOCR"
                class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
            <div
              v-if="extractedAadhaarNumber"
              class="bg-green-50 border border-green-300 rounded-lg p-5 shadow-sm"
            >
              <h4
                class="text-sm font-semibold text-green-800 flex items-center gap-1 mb-3"
              >
                ✅ Extracted Aadhaar Number
              </h4>
              <div class="text-sm text-gray-800 mb-3">
                <span class="font-medium text-green-700">Aadhaar Number:</span>
                <div>{{ extractedAadhaarNumber }}</div>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  @click="applyAadhaarNumber"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
                >
                  Apply to Form
                </button>
                <button
                  type="button"
                  @click="clearExtractedData"
                  class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Address Information -->
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-4">
            Address Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Village *</label
              >
              <input
                v-model="currentTeacher.village"
                type="text"
                :class="{ 'border-red-500': fieldErrors.village }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter village name"
              />
              <p
                v-if="fieldErrors.village"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.village }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >VTC
                <span class="text-gray-500 font-normal">(optional)</span></label
              >
              <input
                v-model="currentTeacher.vtc"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter VTC"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Post Office *</label
              >
              <input
                v-model="currentTeacher.postOffice"
                type="text"
                :class="{ 'border-red-500': fieldErrors.postOffice }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter post office"
              />
              <p
                v-if="fieldErrors.postOffice"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.postOffice }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >District *</label
              >
              <input
                v-model="currentTeacher.subDistrict"
                type="text"
                :class="{ 'border-red-500': fieldErrors.subDistrict }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter sub district"
              />
              <p
                v-if="fieldErrors.subDistrict"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.subDistrict }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >State *</label
              >
              <select
                v-model="currentTeacher.state"
                :class="{ 'border-red-500': fieldErrors.state }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select State</option>
                <option
                  v-for="state in indianStates"
                  :key="state"
                  :value="state"
                >
                  {{ state }}
                </option>
              </select>
              <p
                v-if="fieldErrors.state"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.state }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pincode *</label
              >
              <input
                v-model="currentTeacher.pincode"
                type="text"
                :class="{ 'border-red-500': fieldErrors.pincode }"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter 6-digit pincode"
              />
              <p
                v-if="fieldErrors.pincode"
                class="text-red-500 text-xs mt-1"
              >
                {{ fieldErrors.pincode }}
              </p>
            </div>
          </div>
        </div>
        <!-- Qualification Certificates -->
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-4">
            Educational Qualifications
          </h3>
          <div class="space-y-4">
            <div
              v-for="(qualification, index) in qualifications"
              :key="index"
              class="border rounded-lg p-5 shadow-sm"
              :class="
                fieldErrors[`qualification_${index}`]
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white'
              "
            >
              <div class="flex justify-between items-start mb-4">
                <h4 class="font-medium text-gray-800">
                  Qualification {{ index + 1 }}
                </h4>
                <button
                  v-if="qualifications.length > 1"
                  type="button"
                  @click="removeQualification(index)"
                  class="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Qualification Type *</label
                  >
                  <select
                    v-model="qualification.type"
                    :class="{
                      'border-red-500':
                        fieldErrors[`qualification_${index}_type`],
                    }"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select Type</option>
                    <option value="Matric">Matric (10th)</option>
                    <option value="Higher Secondary">
                      Higher Secondary (12th)
                    </option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  <p
                    v-if="fieldErrors[`qualification_${index}_type`]"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ fieldErrors[`qualification_${index}_type`] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Institution *</label
                  >
                  <input
                    v-model="qualification.institution"
                    type="text"
                    :class="{
                      'border-red-500':
                        fieldErrors[`qualification_${index}_institution`],
                    }"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Institution name"
                  />
                  <p
                    v-if="fieldErrors[`qualification_${index}_institution`]"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ fieldErrors[`qualification_${index}_institution`] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Year of Passing *</label
                  >
                  <input
                    v-model="qualification.year"
                    type="number"
                    :class="{
                      'border-red-500':
                        fieldErrors[`qualification_${index}_year`],
                    }"
                    min="1950"
                    :max="new Date().getFullYear()"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="YYYY"
                  />
                  <p
                    v-if="fieldErrors[`qualification_${index}_year`]"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ fieldErrors[`qualification_${index}_year`] }}
                  </p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Upload Certificate *</label
                >
                <div
                  class="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  :class="
                    fieldErrors[`qualification_${index}_file`]
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-gray-50'
                  "
                  @click="$refs[`qualificationInput${index}`][0].click()"
                >
                  <input
                    :ref="`qualificationInput${index}`"
                    type="file"
                    accept="image/*,.pdf"
                    @change="(e) => handleQualificationUpload(e, index)"
                    class="hidden"
                  />
                  <div v-if="!qualification.file">
                    <Upload class="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p class="text-sm text-gray-600">
                      Click to upload certificate
                    </p>
                  </div>
                  <div
                    v-else
                    class="space-y-2"
                  >
                    <FileText class="mx-auto h-8 w-8 text-green-500" />
                    <p class="text-sm text-gray-600">
                      {{ qualification.file.name }}
                    </p>
                    <button
                      type="button"
                      @click.stop="removeQualificationFile(index)"
                      class="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
                <p
                  v-if="fieldErrors[`qualification_${index}_file`]"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ fieldErrors[`qualification_${index}_file`] }}
                </p>
              </div>
            </div>
            <button
              type="button"
              @click="addQualification"
              class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors bg-gray-50 hover:bg-gray-100"
            >
              <Plus class="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <span class="text-sm text-gray-600"
                >Add Another Qualification</span
              >
            </button>
          </div>
          <!-- General Form Error -->
          <div
            v-if="formError"
            class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700"
          >
            {{ formError }}
          </div>
        </div>
        <!-- Form Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <div
              v-if="isSubmitting"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
            ></div>
            {{
              isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Teacher"
                : "Add Teacher"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Local Toast Display -->
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
    <div
      v-for="toastItem in toasts"
      :key="toastItem.id"
      :class="[
        'p-4 rounded-lg shadow-lg flex items-start gap-3 transition-all duration-300 ease-out transform',
        toastItem.variant === 'success'
          ? 'bg-green-50 border border-green-200 text-green-800'
          : '',
        toastItem.variant === 'destructive'
          ? 'bg-red-50 border border-red-200 text-red-800'
          : '',
        toastItem.variant === 'default'
          ? 'bg-white border border-gray-200 text-gray-800'
          : '',
      ]"
    >
      <div v-if="toastItem.variant === 'success'">
        <CheckCircle class="w-5 h-5 text-green-600" />
      </div>
      <div v-else-if="toastItem.variant === 'destructive'">
        <AlertCircle class="w-5 h-5 text-red-600" />
      </div>
      <div v-else>
        <Info class="w-5 h-5 text-gray-600" />
      </div>
      <div class="flex-1">
        <div class="font-semibold">{{ toastItem.title }}</div>
        <div
          v-if="toastItem.description"
          class="text-sm"
        >
          {{ toastItem.description }}
        </div>
      </div>
      <button
        @click="removeToast(toastItem.id)"
        class="text-gray-400 hover:text-gray-600"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, computed } from "vue";
  import { useStore } from "vuex";
  import {
    Search,
    Plus,
    X,
    Upload,
    FileText,
    Trash2,
    AlertCircle,
    CheckCircle, // Added for success toast icon
    Info, // Added for default toast icon
  } from "lucide-vue-next";
  import Title from "@/components/Teacher/Title.vue";
  import Tesseract from "tesseract.js";
  import * as pdfjsLib from "pdfjs-dist";

  // Configure PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const emit = defineEmits(["search"]);

  const searchQuery = ref("");

  // Watch for changes in searchQuery and emit to parent
  watch(searchQuery, (newQuery) => {
    emit("search", newQuery);
  });

  // Reactive data

  const showModal = ref(false);
  const isEditing = ref(false);
  const isSubmitting = ref(false);
  const role = computed(() => store.getters.getUserRole);
  // Error handling states
  const formError = ref("");
  const fieldErrors = reactive({});

  // Profile Photo
  const profilePhotoFile = ref(null);
  const profilePhotoPreview = ref(null);

  // Aadhaar OCR
  const aadhaarProcessing = ref(false);
  const aadhaarFile = ref(null);
  const ocrError = ref("");
  const ocrStep = ref(1);
  const ocrStepText = ref("Preparing image...");

  // Current teacher form data
  const currentTeacher = reactive({
    id: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    subject: "", // New field
    status: "active", // New field with default
    aadhaarNumber: "",
    village: "",
    vtc: "",
    postOffice: "",
    subDistrict: "",
    state: "",
    pincode: "",
  });

  // Extracted Aadhaar number
  const extractedAadhaarNumber = ref("");

  // Qualifications array
  const qualifications = ref([
    {
      type: "",
      institution: "",
      year: "",
      file: null,
    },
  ]);

  // Indian states list
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const store = useStore();

  // ✅ Local Toast Logic
  const toasts = ref([]);
  let toastCounter = 0;

  const toast = ({
    title,
    description,
    variant = "default",
    duration = 3000,
  }) => {
    const id = `toast-${toastCounter++}`;
    toasts.value.push({ id, title, description, variant });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((toastItem) => toastItem.id !== id);
  };
  // End Local Toast Logic ✅

  // Format Aadhaar number input
  const formatAadhaarNumber = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 12) value = value.substring(0, 12);
    // Format as XXXX XXXX XXXX
    if (value.length > 8) {
      value =
        value.substring(0, 4) +
        " " +
        value.substring(4, 8) +
        " " +
        value.substring(8);
    } else if (value.length > 4) {
      value = value.substring(0, 4) + " " + value.substring(4);
    }
    currentTeacher.aadhaarNumber = value;
    // Clear Aadhaar number error on input
    if (fieldErrors.aadhaarNumber) {
      fieldErrors.aadhaarNumber = "";
    }
  };
  // Handle Profile Photo Upload
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      // Replace alert with toast
      toast({
        title: "File Too Large",
        description: "Profile photo size should be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    profilePhotoFile.value = file;
    profilePhotoPreview.value = URL.createObjectURL(file);
    // Clear error on successful upload
    if (fieldErrors.profilePhotoFile) {
      fieldErrors.profilePhotoFile = "";
    }
  };
  // Remove Profile Photo
  const removeProfilePhotoFile = () => {
    profilePhotoFile.value = null;
    profilePhotoPreview.value = null;
    // Clear error when removed
    if (fieldErrors.profilePhotoFile) {
      fieldErrors.profilePhotoFile = "Profile photo is required.";
    }
  };
  // Simplified Aadhaar upload handler - only extracts Aadhaar number
  const handleAadhaarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      // Replace alert with toast
      toast({
        title: "File Too Large",
        description: "Aadhaar card file size should be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    aadhaarFile.value = file;
    aadhaarProcessing.value = true;
    ocrError.value = "";
    extractedAadhaarNumber.value = "";
    // Clear Aadhaar file error on upload attempt
    if (fieldErrors.aadhaarFile) {
      fieldErrors.aadhaarFile = "";
    }
    try {
      ocrStep.value = 1;
      ocrStepText.value = "Preparing image...";
      let imageDataUrl;
      if (file.type === "application/pdf") {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file))
          .promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 3 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
        imageDataUrl = canvas.toDataURL();
      } else {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        imageDataUrl = canvas.toDataURL();
      }
      ocrStep.value = 2;
      ocrStepText.value = "Extracting text...";
      const { data } = await Tesseract.recognize(imageDataUrl, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            ocrStepText.value = `Recognizing text... ${Math.round(
              m.progress * 100
            )}%`;
          }
        },
        tessedit_char_whitelist: "0123456789 ",
      });
      ocrStep.value = 3;
      ocrStepText.value = "Processing extracted data...";
      const rawText = data.text;
      // Extract only Aadhaar number
      const aadhaarNumber = extractAadhaarNumber(rawText);
      if (!aadhaarNumber) {
        throw new Error(
          "Could not extract Aadhaar number. Please ensure the image is clear and well-lit."
        );
      }
      extractedAadhaarNumber.value = aadhaarNumber;
    } catch (err) {
      console.error("OCR failed:", err);
      ocrError.value =
        err.message ||
        "Failed to extract Aadhaar number. Please try a clearer scan.";
      // Show error toast for OCR failure
      toast({
        title: "OCR Failed",
        description: ocrError.value,
        variant: "destructive",
      });
    } finally {
      aadhaarProcessing.value = false;
    }
  };
  // Simplified extraction function - only extracts Aadhaar number
  const extractAadhaarNumber = (text) => {
    const fullText = text.replace(/\s+/g, " ").trim();
    // Aadhaar number patterns
    const aadhaarNumberPatterns = [
      /(\d{4})\s*(\d{4})\s*(\d{4})/, // Flexible spacing
      /(\d{12})/, // Compact form
    ];
    for (const pattern of aadhaarNumberPatterns) {
      const match = fullText.match(pattern);
      if (match) {
        let number;
        // Join components or format compact form
        if (match.length === 4) {
          number = `${match[1]} ${match[2]} ${match[3]}`;
        } else {
          number = match[1].replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
        }
        // Correct common OCR mistakes
        number = number
          .replace(/^0/, "6") // First digit correction
          .replace(/\s/g, "")
          .replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
        // Validate
        if (/^\d{4}\s\d{4}\s\d{4}$/.test(number)) {
          return number;
        }
      }
    }
    return "";
  };
  // Apply extracted Aadhaar number to form
  const applyAadhaarNumber = () => {
    if (extractedAadhaarNumber.value) {
      currentTeacher.aadhaarNumber = extractedAadhaarNumber.value;
      // Clear Aadhaar number error when applied
      if (fieldErrors.aadhaarNumber) {
        fieldErrors.aadhaarNumber = "";
      }
      toast({
        title: "Aadhaar Applied",
        description: "Extracted Aadhaar number applied to the form.",
        variant: "success",
      });
    }
  };
  // Clear extracted data
  const clearExtractedData = () => {
    extractedAadhaarNumber.value = "";
    toast({
      title: "Data Cleared",
      description: "Extracted Aadhaar data has been cleared.",
      variant: "default",
    });
  };
  // Retry OCR function
  const retryOCR = () => {
    if (aadhaarFile.value) {
      const event = { target: { files: [aadhaarFile.value] } };
      handleAadhaarUpload(event);
    }
  };
  // Modal and form controls
  const openAddModal = () => {
    isEditing.value = false;
    resetCurrentTeacher();
    showModal.value = true;
  };
  const closeModal = () => {
    showModal.value = false;
    resetCurrentTeacher();
  };
  const resetCurrentTeacher = () => {
    Object.assign(currentTeacher, {
      id: "",
      name: "",
      email: "",
      mobile: "",
      dob: "",
      subject: "", // Reset new field
      status: "active", // Reset new field
      aadhaarNumber: "",
      village: "",
      vtc: "",
      postOffice: "",
      subDistrict: "",
      state: "",
      pincode: "",
    });
    qualifications.value = [
      {
        type: "",
        institution: "",
        year: "",
        file: null,
      },
    ];
    profilePhotoFile.value = null; // Reset new field
    profilePhotoPreview.value = null; // Reset new field
    aadhaarFile.value = null;
    extractedAadhaarNumber.value = "";
    ocrError.value = "";
    ocrStep.value = 1;
    ocrStepText.value = "Preparing image...";
    // Clear all errors
    formError.value = "";
    for (const key in fieldErrors) {
      delete fieldErrors[key];
    }
  };
  const addQualification = () => {
    qualifications.value.push({
      type: "",
      institution: "",
      year: "",
      file: null,
    });
  };
  const removeQualification = (index) => {
    qualifications.value.splice(index, 1);
    // Re-validate qualifications if one is removed
    validateForm();
    toast({
      title: "Qualification Removed",
      description: `Qualification ${index + 1} has been removed.`,
      variant: "default",
    });
  };
  const handleQualificationUpload = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      // Replace alert with toast
      toast({
        title: "File Too Large",
        description: "Certificate file size should be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    qualifications.value[index].file = file;
    // Clear specific qualification file error
    if (fieldErrors[`qualification_${index}_file`]) {
      fieldErrors[`qualification_${index}_file`] = "";
    }
  };
  const removeQualificationFile = (index) => {
    qualifications.value[index].file = null;
    // Set specific qualification file error when removed
    fieldErrors[`qualification_${index}_file`] =
      "Certificate file is required.";
    toast({
      title: "File Removed",
      description: "Qualification certificate file has been removed.",
      variant: "default",
    });
  };
  const removeAadhaarFile = () => {
    aadhaarFile.value = null;
    clearExtractedData();
    ocrError.value = "";
    // Set Aadhaar file error when removed
    fieldErrors.aadhaarFile = "Aadhaar card is required.";
    toast({
      title: "File Removed",
      description: "Aadhaar card file has been removed.",
      variant: "default",
    });
  };
  // Client-side validation function
  const validateForm = () => {
    let isValid = true;
    formError.value = ""; // Clear general form error
    for (const key in fieldErrors) {
      delete fieldErrors[key]; // Clear previous field errors
    }
    // Personal Information
    if (!currentTeacher.name) {
      fieldErrors.name = "Full Name is required.";
      isValid = false;
    }
    if (!currentTeacher.email) {
      fieldErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(currentTeacher.email)) {
      fieldErrors.email = "Invalid email format.";
      isValid = false;
    }
    if (!currentTeacher.mobile) {
      fieldErrors.mobile = "Mobile Number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(currentTeacher.mobile)) {
      fieldErrors.mobile = "Mobile Number must be 10 digits.";
      isValid = false;
    }
    if (!currentTeacher.dob) {
      fieldErrors.dob = "Date of Birth is required.";
      isValid = false;
    }
    if (!currentTeacher.subject) {
      fieldErrors.subject = "Subject is required.";
      isValid = false;
    }
    if (!currentTeacher.status) {
      fieldErrors.status = "Status is required.";
      isValid = false;
    }
    // Profile Photo
    if (!profilePhotoFile.value) {
      fieldErrors.profilePhotoFile = "Profile photo is required.";
      isValid = false;
    }
    // Aadhaar Card
    if (!aadhaarFile.value) {
      fieldErrors.aadhaarFile = "Aadhaar card is required.";
      isValid = false;
    }
    if (!currentTeacher.aadhaarNumber) {
      fieldErrors.aadhaarNumber = "Aadhaar Number is required.";
      isValid = false;
    } else if (!/^\d{4}\s\d{4}\s\d{4}$/.test(currentTeacher.aadhaarNumber)) {
      fieldErrors.aadhaarNumber =
        "Invalid Aadhaar number format (XXXX XXXX XXXX).";
      isValid = false;
    }
    // Address Information
    if (!currentTeacher.village) {
      fieldErrors.village = "Village is required.";
      isValid = false;
    }
    if (!currentTeacher.postOffice) {
      fieldErrors.postOffice = "Post Office is required.";
      isValid = false;
    }
    if (!currentTeacher.subDistrict) {
      fieldErrors.subDistrict = "District is required.";
      isValid = false;
    }
    if (!currentTeacher.state) {
      fieldErrors.state = "State is required.";
      isValid = false;
    }
    if (!currentTeacher.pincode) {
      fieldErrors.pincode = "Pincode is required.";
      isValid = false;
    } else if (!/^\d{6}$/.test(currentTeacher.pincode)) {
      fieldErrors.pincode = "Pincode must be 6 digits.";
      isValid = false;
    }
    // Qualifications
    qualifications.value.forEach((q, index) => {
      if (!q.type) {
        fieldErrors[`qualification_${index}_type`] = "Type is required.";
        isValid = false;
      }
      if (!q.institution) {
        fieldErrors[`qualification_${index}_institution`] =
          "Institution is required.";
        isValid = false;
      }
      if (!q.year) {
        fieldErrors[`qualification_${index}_year`] = "Year is required.";
        isValid = false;
      } else if (q.year < 1950 || q.year > new Date().getFullYear()) {
        fieldErrors[`qualification_${index}_year`] = "Invalid year.";
        isValid = false;
      }
      if (!q.file) {
        fieldErrors[`qualification_${index}_file`] = "Certificate is required.";
        isValid = false;
      }
    });
    return isValid;
  };
  const submitForm = async () => {
    isSubmitting.value = true;
    formError.value = "";
    if (!validateForm()) {
      isSubmitting.value = false;
      formError.value = "Please correct the errors in the form.";
      // ✅ Show error toast for validation failure
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }
    try {
      const formData = new FormData();
      const defaultPassword =
        process.env.VUE_APP_DEFAULT_TEACHER_PASSWORD || "default123";
      formData.append("name", currentTeacher.name?.trim());
      formData.append("email", currentTeacher.email?.trim());
      formData.append("password", defaultPassword);
      formData.append("phone", currentTeacher.mobile?.trim());
      formData.append("dob", currentTeacher.dob);
      formData.append("subject", currentTeacher.subject?.trim());
      formData.append("aadhaarNumber", currentTeacher.aadhaarNumber?.trim());
      formData.append("aadhaarCard", aadhaarFile.value);
      formData.append("photo", profilePhotoFile.value);
      formData.append("role", "teacher");
      if (currentTeacher.status)
        formData.append("status", currentTeacher.status);
      if (currentTeacher.vtc)
        formData.append("vtc", currentTeacher.vtc?.trim());
      if (currentTeacher.postOffice)
        formData.append("postOffice", currentTeacher.postOffice?.trim());
      if (currentTeacher.subDistrict)
        formData.append("subDistrict", currentTeacher.subDistrict?.trim());
      if (currentTeacher.state)
        formData.append("state", currentTeacher.state?.trim());
      if (currentTeacher.pincode)
        formData.append("pincode", currentTeacher.pincode?.trim());
      // ✅ Convert qualifications to clean stringified JSON
      const qualificationPayload = qualifications.value.map((q) => ({
        type: q.type?.trim(),
        institution: q.institution?.trim(),
        year: String(q.year).trim(),
      }));
      const stringifiedQualifications = JSON.stringify(qualificationPayload);
      formData.append("qualifications", stringifiedQualifications);
      // ✅ Attach files
      qualifications.value.forEach((q, index) => {
        if (q.file instanceof File) {
          formData.append(`qualification_${index}_file`, q.file);
        }
      });

      // ✅ Send to backend
      await store.dispatch("addTeacher", formData);

      // ✅ Replace alert with toast on success
      toast({
        title: "Success!",
        description: "Teacher added successfully.",
        variant: "success",
      });
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 ms = 2 seconds
    } catch (error) {
      console.error("❌ Error adding teacher:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add teacher.";
      formError.value = errorMessage;
      // ✅ Show error toast on failure
      toast({
        title: "Error!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

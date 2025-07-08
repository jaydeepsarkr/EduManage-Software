<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-6 sm:mb-8">
        <div
          class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
        >
          <School class="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
        >
          School Registration
        </h1>
        <p
          class="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
        >
          Create a new school profile in our management system
        </p>
      </div>

      <!-- Error Toast -->
      <div
        v-if="globalError"
        class="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
      >
        <div class="flex items-start space-x-3">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <AlertCircle class="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm sm:text-base font-semibold text-red-900 mb-1">
              Registration Failed
            </h3>
            <p class="text-xs sm:text-sm text-red-700 break-words">
              {{ globalError }}
            </p>
            <button
              @click="globalError = ''"
              class="mt-2 text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <form
          @submit.prevent="submitForm"
          class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
        >
          <!-- Basic Information Section -->
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center"
              >
                <Info class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <!-- School Name -->
              <div class="lg:col-span-2">
                <label
                  for="schoolName"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  School Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="schoolName"
                    v-model="formData.schoolName"
                    type="text"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('schoolName')"
                    placeholder="Enter school name"
                    @blur="validateField('schoolName')"
                    @input="clearFieldError('schoolName')"
                  />
                  <School
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.schoolName"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.schoolName }}</span>
                </p>
              </div>

              <!-- School Type -->
              <div>
                <label
                  for="schoolType"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  School Type <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select
                    id="schoolType"
                    v-model="formData.schoolType"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-8 sm:pr-10 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none text-sm sm:text-base"
                    :class="getFieldClasses('schoolType')"
                    @blur="validateField('schoolType')"
                    @change="clearFieldError('schoolType')"
                  >
                    <option value="">Select school type</option>
                    <option value="primary">Primary School</option>
                    <option value="secondary">Secondary School</option>
                    <option value="high">High School</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                  </select>
                  <GraduationCap
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                  <ChevronDown
                    class="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
                  />
                </div>
                <p
                  v-if="errors.schoolType"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.schoolType }}</span>
                </p>
              </div>

              <!-- Establishment Year -->
              <div>
                <label
                  for="establishmentYear"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Establishment Year
                </label>
                <div class="relative">
                  <input
                    id="establishmentYear"
                    v-model="formData.establishmentYear"
                    type="number"
                    min="1800"
                    :max="currentYear"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="e.g., 1995"
                  />
                  <Calendar
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information Section -->
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center"
              >
                <MapPin class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                Address Information
              </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <!-- Street Address -->
              <div class="lg:col-span-2">
                <label
                  for="address"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Street Address <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <textarea
                    id="address"
                    v-model="formData.address"
                    required
                    rows="3"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-sm sm:text-base"
                    :class="getFieldClasses('address')"
                    placeholder="Enter complete street address"
                    @blur="validateField('address')"
                    @input="clearFieldError('address')"
                  ></textarea>
                  <Home
                    class="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.address"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.address }}</span>
                </p>
              </div>

              <!-- Village -->
              <div>
                <label
                  for="village"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Village/Area
                </label>
                <div class="relative">
                  <input
                    id="village"
                    v-model="formData.village"
                    type="text"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Enter village or area name"
                  />
                  <TreePine
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Post Office -->
              <div>
                <label
                  for="postOffice"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Post Office
                </label>
                <div class="relative">
                  <input
                    id="postOffice"
                    v-model="formData.postOffice"
                    type="text"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Enter post office name"
                  />
                  <Mail
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- City -->
              <div>
                <label
                  for="city"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  City <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="city"
                    v-model="formData.city"
                    type="text"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('city')"
                    placeholder="Enter city name"
                    @blur="validateField('city')"
                    @input="clearFieldError('city')"
                  />
                  <Building
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.city"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.city }}</span>
                </p>
              </div>

              <!-- State -->
              <div>
                <label
                  for="state"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  State/Province <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="state"
                    v-model="formData.state"
                    type="text"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('state')"
                    placeholder="Enter state or province"
                    @blur="validateField('state')"
                    @input="clearFieldError('state')"
                  />
                  <Map
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.state"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.state }}</span>
                </p>
              </div>

              <!-- Country -->
              <div>
                <label
                  for="country"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Country <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select
                    id="country"
                    v-model="formData.country"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-8 sm:pr-10 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none text-sm sm:text-base"
                    :class="getFieldClasses('country')"
                    @blur="validateField('country')"
                    @change="clearFieldError('country')"
                  >
                    <option value="">Select country</option>
                    <option
                      v-for="country in countries"
                      :key="country.code"
                      :value="country.code"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                  <Globe
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                  <ChevronDown
                    class="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
                  />
                </div>
                <p
                  v-if="errors.country"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.country }}</span>
                </p>
              </div>

              <!-- PIN Code -->
              <div>
                <label
                  for="pincode"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  PIN/ZIP Code <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="pincode"
                    v-model="formData.pincode"
                    type="text"
                    required
                    pattern="[0-9]{5,10}"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('pincode')"
                    placeholder="Enter PIN or ZIP code"
                    @blur="validateField('pincode')"
                    @input="clearFieldError('pincode')"
                  />
                  <Hash
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.pincode"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.pincode }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center"
              >
                <Phone class="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                Contact Information
              </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <!-- Primary Phone -->
              <div>
                <label
                  for="primaryPhone"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Primary Phone Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="primaryPhone"
                    v-model="formData.primaryPhone"
                    type="tel"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('primaryPhone')"
                    placeholder="+1 (555) 123-4567"
                    @blur="validateField('primaryPhone')"
                    @input="clearFieldError('primaryPhone')"
                  />
                  <Phone
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.primaryPhone"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.primaryPhone }}</span>
                </p>
              </div>

              <!-- Secondary Phone -->
              <div>
                <label
                  for="secondaryPhone"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Secondary Phone Number
                </label>
                <div class="relative">
                  <input
                    id="secondaryPhone"
                    v-model="formData.secondaryPhone"
                    type="tel"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="+1 (555) 987-6543"
                  />
                  <PhoneCall
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('email')"
                    placeholder="school@example.com"
                    @blur="validateField('email')"
                    @input="clearFieldError('email')"
                  />
                  <Mail
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.email"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.email }}</span>
                </p>
              </div>

              <!-- Website -->
              <div>
                <label
                  for="website"
                  class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Website URL
                </label>
                <div class="relative">
                  <input
                    id="website"
                    v-model="formData.website"
                    type="url"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    :class="getFieldClasses('website')"
                    placeholder="https://www.school.com"
                    @blur="validateField('website')"
                    @input="clearFieldError('website')"
                  />
                  <Globe
                    class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.website"
                  class="mt-1 text-xs sm:text-sm text-red-600 flex items-center space-x-1"
                >
                  <AlertCircle class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{{ errors.website }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Additional Information Section -->
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center"
              >
                <FileText class="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                Additional Information
              </h2>
            </div>

            <!-- Description -->
            <div>
              <label
                for="description"
                class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
              >
                School Description
              </label>
              <div class="relative">
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="4"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-sm sm:text-base"
                  placeholder="Brief description about the school, its mission, and values..."
                ></textarea>
                <FileText
                  class="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div
            class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200"
          >
            <button
              type="button"
              @click="resetForm"
              :disabled="isSubmitting"
              class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Reset Form
            </button>
            <button
              type="submit"
              :disabled="isSubmitting || hasErrors"
              class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span v-if="!isSubmitting">Register School</span>
              <span
                v-else
                class="flex items-center space-x-2"
              >
                <div
                  class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Registering...</span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
      >
        <div class="flex items-start space-x-3">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <CheckCircle class="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <h3
              class="text-sm sm:text-base lg:text-lg font-semibold text-green-900 mb-1"
            >
              Registration Successful!
            </h3>
            <p class="text-xs sm:text-sm text-green-700 break-words">
              {{ formData.schoolName }} has been successfully registered in our
              system.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import {
    School,
    Info,
    GraduationCap,
    Calendar,
    MapPin,
    Home,
    TreePine,
    Mail,
    Building,
    Map,
    Globe,
    Hash,
    Phone,
    PhoneCall,
    FileText,
    CheckCircle,
    ChevronDown,
    AlertCircle,
  } from "lucide-vue-next";

  // Vuex and router
  const store = useStore();
  const router = useRouter();

  // Form data
  const formData = ref({
    schoolName: "",
    schoolType: "",
    establishmentYear: "",
    address: "",
    village: "",
    postOffice: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    website: "",
    description: "",
  });

  // Form validation errors
  const errors = ref({});
  const globalError = ref("");

  // Form state
  const isSubmitting = ref(false);
  const showSuccess = ref(false);

  // Current year for validation
  const currentYear = new Date().getFullYear();

  // Country options
  const countries = ref([
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "BR", name: "Brazil" },
  ]);

  // Computed property to check if form has errors
  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0;
  });

  // Validation rules
  const validationRules = {
    schoolName: {
      required: true,
      minLength: 2,
      message: "School name must be at least 2 characters long",
    },
    schoolType: {
      required: true,
      message: "Please select a school type",
    },
    address: {
      required: true,
      minLength: 10,
      message: "Address must be at least 10 characters long",
    },
    city: {
      required: true,
      minLength: 2,
      message: "City name must be at least 2 characters long",
    },
    state: {
      required: true,
      minLength: 2,
      message: "State name must be at least 2 characters long",
    },
    country: {
      required: true,
      message: "Please select a country",
    },
    pincode: {
      required: true,
      pattern: /^[0-9]{5,10}$/,
      message: "PIN code must be 5-10 digits",
    },
    primaryPhone: {
      required: true,
      pattern: /^[\]?[0-9\s\-$$$$]{10,}$/,
      message: "Please enter a valid phone number",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    website: {
      required: false,
      pattern: /^https?:\/\/.+\..+/,
      message:
        "Please enter a valid website URL (starting with http:// or https://)",
    },
  };

  // Individual field validation
  const validateField = (fieldName) => {
    const value = formData.value[fieldName];
    const rules = validationRules[fieldName];

    if (!rules) return;

    // Clear previous error
    delete errors.value[fieldName];

    // Required validation
    if (rules.required && (!value || value.toString().trim() === "")) {
      errors.value[fieldName] = `${fieldName
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()} is required`;
      return;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === "") return;

    // Min length validation
    if (rules.minLength && value.toString().trim().length < rules.minLength) {
      errors.value[fieldName] = rules.message;
      return;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value.toString().trim())) {
      errors.value[fieldName] = rules.message;
      return;
    }
  };

  // Clear field error
  const clearFieldError = (fieldName) => {
    if (errors.value[fieldName]) {
      delete errors.value[fieldName];
    }
    globalError.value = "";
  };

  // Get field classes for styling
  const getFieldClasses = (fieldName) => {
    return {
      "border-red-500 focus:border-red-500 focus:ring-red-500":
        errors.value[fieldName],
      "border-gray-300": !errors.value[fieldName],
    };
  };

  // Validate entire form
  const validateForm = () => {
    errors.value = {};

    // Validate all fields with rules
    Object.keys(validationRules).forEach((fieldName) => {
      validateField(fieldName);
    });

    return Object.keys(errors.value).length === 0;
  };

  // Watch for form changes to provide real-time validation feedback
  watch(
    formData,
    () => {
      // Clear global error when user starts typing
      if (globalError.value) {
        globalError.value = "";
      }
    },
    { deep: true }
  );

  // Submit handler with better error handling
  const submitForm = async () => {
    if (!validateForm()) {
      globalError.value = "Please fix the errors above before submitting.";
      const firstErrorField = Object.keys(errors.value)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    isSubmitting.value = true;
    globalError.value = "";

    try {
      const payload = {
        schoolName: formData.value.schoolName.trim(),
        schoolType: formData.value.schoolType,
        establishmentYear: formData.value.establishmentYear || null,
        address: formData.value.address.trim(),
        village: formData.value.village.trim() || null,
        postOffice: formData.value.postOffice.trim() || null,
        city: formData.value.city.trim(),
        state: formData.value.state.trim(),
        country: formData.value.country,
        pincode: formData.value.pincode.trim(),
        primaryPhone: formData.value.primaryPhone.trim(),
        secondaryPhone: formData.value.secondaryPhone.trim() || null,
        email: formData.value.email.trim().toLowerCase(),
        website: formData.value.website.trim() || null,
        description: formData.value.description.trim() || null,
      };

      const createdSchool = await store.dispatch("createSchool", payload);
      console.log("✅ School created:", createdSchool);

      // ✅ Show popup
      alert("✅ School created successfully!");

      // ✅ Redirect to school details page
      router.push("/schoolDetails");
    } catch (error) {
      console.error("❌ Registration error:", error);

      if (error?.response?.status === 422) {
        const serverErrors = error.response.data.errors || {};
        Object.keys(serverErrors).forEach((field) => {
          if (validationRules[field]) {
            errors.value[field] = serverErrors[field][0] || serverErrors[field];
          }
        });
        globalError.value = "Please fix the validation errors above.";
      } else if (error?.response?.status === 409) {
        globalError.value = "A school with this name or email already exists.";
      } else if (error?.response?.status >= 500) {
        globalError.value = "Server error occurred. Please try again later.";
      } else if (error?.code === "NETWORK_ERROR" || !error?.response) {
        globalError.value = "Network error. Please check your connection.";
      } else {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Registration failed. Please try again.";
        globalError.value = message;
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  // Reset form with confirmation
  const resetForm = () => {
    if (
      Object.values(formData.value).some(
        (value) => value && value.toString().trim()
      )
    ) {
      if (
        !confirm(
          "Are you sure you want to reset the form? All entered data will be lost."
        )
      ) {
        return;
      }
    }

    formData.value = {
      schoolName: "",
      schoolType: "",
      establishmentYear: "",
      address: "",
      village: "",
      postOffice: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      primaryPhone: "",
      secondaryPhone: "",
      email: "",
      website: "",
      description: "",
    };

    errors.value = {};
    globalError.value = "";
    showSuccess.value = false;
  };
</script>

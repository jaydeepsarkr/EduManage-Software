<template>
  <div v-if="schoolData">
    <div class="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header with Actions -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0"
        >
          <!-- Left side content -->
          <div class="flex-1 order-2 sm:order-1">
            <h1
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
            >
              School Dashboard
            </h1>
            <p class="text-sm sm:text-base text-gray-600">
              Manage your school information and settings
            </p>
          </div>

          <!-- Right-aligned buttons -->
          <div
            class="flex items-center justify-end space-x-2 sm:space-x-3 order-1 sm:order-2"
          >
            <button
              v-if="userRole === 'admin'"
              @click="editSchool"
              class="flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Edit class="w-4 h-4" />
              <span class="hidden xs:inline">Edit Details</span>
              <span class="xs:hidden">Edit</span>
            </button>
          </div>
        </div>

        <!-- School Header Card -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 mb-6 lg:mb-8 overflow-hidden"
        >
          <div
            class="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6 lg:p-8 text-white"
          >
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0"
            >
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto lg:mx-0"
              >
                <School
                  class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white"
                />
              </div>

              <div class="flex-1 text-center lg:text-left">
                <h2
                  class="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3"
                >
                  {{ schoolData.schoolName }}
                </h2>
                <div
                  class="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-blue-100 text-sm sm:text-base"
                >
                  <div class="flex items-center space-x-2">
                    <GraduationCap class="w-4 h-4 sm:w-5 sm:h-5" />
                    <span class="capitalize"
                      >{{ schoolData.schoolType }} School</span
                    >
                  </div>
                  <div
                    v-if="schoolData.establishmentYear"
                    class="flex items-center space-x-2"
                  >
                    <Calendar class="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Est. {{ schoolData.establishmentYear }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <MapPin class="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{{ schoolData.city }}, {{ schoolData.state }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-center space-x-4">
                <div class="text-center">
                  <div class="text-xl sm:text-2xl font-bold">
                    {{ getSchoolAge() }}
                  </div>
                  <div class="text-xs sm:text-sm text-blue-200">Years</div>
                </div>
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <CheckCircle
                    class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <!-- Left Column - Main Information -->
          <div class="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <!-- Basic Information -->
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
            >
              <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <Info class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900"
                >
                  Basic Information
                </h3>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
              >
                <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div
                    class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"
                  >
                    <School class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <span
                      class="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide"
                    >
                      School Name
                    </span>
                  </div>
                  <p
                    class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-words"
                  >
                    {{ schoolData.schoolName }}
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div
                    class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"
                  >
                    <GraduationCap
                      class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                    />
                    <span
                      class="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide"
                    >
                      School Type
                    </span>
                  </div>
                  <p
                    class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 capitalize"
                  >
                    {{ schoolData.schoolType }} School
                  </p>
                </div>

                <div
                  v-if="schoolData.establishmentYear"
                  class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                >
                  <div
                    class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"
                  >
                    <Calendar class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <span
                      class="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide"
                    >
                      Established
                    </span>
                  </div>
                  <p
                    class="text-sm sm:text-base lg:text-lg font-bold text-gray-900"
                  >
                    {{ schoolData.establishmentYear }}
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div
                    class="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3"
                  >
                    <Clock class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <span
                      class="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide"
                    >
                      Age
                    </span>
                  </div>
                  <p
                    class="text-sm sm:text-base lg:text-lg font-bold text-gray-900"
                  >
                    {{ getSchoolAge() }} Years
                  </p>
                </div>
              </div>
            </div>

            <!-- Address Information -->
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
            >
              <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <MapPin class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900"
                >
                  Address Information
                </h3>
              </div>

              <div class="space-y-4 sm:space-y-6">
                <!-- Full Address Display -->
                <div
                  class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200"
                >
                  <div class="flex items-start space-x-3">
                    <MapPin
                      class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0"
                    />
                    <div class="min-w-0 flex-1">
                      <h4
                        class="font-semibold text-gray-900 mb-2 text-sm sm:text-base"
                      >
                        Complete Address
                      </h4>
                      <div
                        class="text-gray-700 leading-relaxed text-sm sm:text-base space-y-1"
                      >
                        <p class="break-words">{{ schoolData.address }}</p>
                        <p
                          v-if="schoolData.village"
                          class="break-words"
                        >
                          {{ schoolData.village }}
                        </p>
                        <p
                          v-if="schoolData.postOffice"
                          class="break-words"
                        >
                          Post Office: {{ schoolData.postOffice }}
                        </p>
                        <p class="break-words">
                          {{ schoolData.city }}, {{ schoolData.state }}
                          {{ schoolData.pincode }}
                        </p>
                        <p class="font-medium break-words">
                          {{ getCountryName(schoolData.country) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Address Components Grid -->
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                >
                  <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <Building class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        City
                      </span>
                    </div>
                    <p
                      class="font-bold text-gray-900 text-sm sm:text-base break-words"
                    >
                      {{ schoolData.city }}
                    </p>
                  </div>

                  <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <Map class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        State
                      </span>
                    </div>
                    <p
                      class="font-bold text-gray-900 text-sm sm:text-base break-words"
                    >
                      {{ schoolData.state }}
                    </p>
                  </div>

                  <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <Hash class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        PIN Code
                      </span>
                    </div>
                    <p class="font-bold text-gray-900 text-sm sm:text-base">
                      {{ schoolData.pincode }}
                    </p>
                  </div>

                  <div
                    v-if="schoolData.village"
                    class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
                  >
                    <div class="flex items-center space-x-2 mb-2">
                      <TreePine class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        Village
                      </span>
                    </div>
                    <p
                      class="font-bold text-gray-900 text-sm sm:text-base break-words"
                    >
                      {{ schoolData.village }}
                    </p>
                  </div>

                  <div
                    v-if="schoolData.postOffice"
                    class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
                  >
                    <div class="flex items-center space-x-2 mb-2">
                      <Mail class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        Post Office
                      </span>
                    </div>
                    <p
                      class="font-bold text-gray-900 text-sm sm:text-base break-words"
                    >
                      {{ schoolData.postOffice }}
                    </p>
                  </div>

                  <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <Globe class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span
                        class="text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        Country
                      </span>
                    </div>
                    <p
                      class="font-bold text-gray-900 text-sm sm:text-base break-words"
                    >
                      {{ getCountryName(schoolData.country) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div
              v-if="schoolData.description"
              class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
            >
              <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <FileText class="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900"
                >
                  About the School
                </h3>
              </div>
              <div
                class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-200"
              >
                <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {{ schoolData.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column - Contact & Quick Info -->
          <div class="space-y-4 sm:space-y-6 lg:space-y-8">
            <!-- Contact Information -->
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
            >
              <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <Phone class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div class="space-y-3 sm:space-y-4">
                <!-- Primary Phone -->
                <div class="bg-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Phone class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p
                        class="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide"
                      >
                        Primary Phone
                      </p>
                      <p
                        class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-all"
                      >
                        {{ schoolData.primaryPhone }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Secondary Phone -->
                <div
                  v-if="schoolData.secondaryPhone"
                  class="bg-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <PhoneCall class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p
                        class="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide"
                      >
                        Secondary Phone
                      </p>
                      <p
                        class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-all"
                      >
                        {{ schoolData.secondaryPhone }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="bg-green-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Mail class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p
                        class="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide"
                      >
                        Email Address
                      </p>
                      <p
                        class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-all"
                      >
                        {{ schoolData.email }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Website -->
                <div
                  v-if="schoolData.website"
                  class="bg-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Globe class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p
                        class="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wide"
                      >
                        Website
                      </p>
                      <a
                        :href="schoolData.website"
                        target="_blank"
                        class="text-sm sm:text-base lg:text-lg font-bold text-indigo-600 hover:text-indigo-800 break-all block"
                      >
                        {{ schoolData.website }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6"
              >
                Quick Actions
              </h3>
              <div class="space-y-2 sm:space-y-3">
                <button
                  class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center space-x-3 text-sm sm:text-base"
                >
                  <Users class="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Teachers</span>
                </button>
                <button
                  class="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center space-x-3 text-sm sm:text-base"
                >
                  <UserCheck class="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Students</span>
                </button>
                <button
                  class="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center space-x-3 text-sm sm:text-base"
                >
                  <BarChart3 class="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Reports</span>
                </button>
                <button
                  class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center space-x-3 text-sm sm:text-base"
                >
                  <Settings class="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>School Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else-if="isLoading"
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Loading Header -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 mb-6 lg:mb-8 overflow-hidden"
      >
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6 lg:p-8"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0"
          >
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto lg:mx-0 animate-pulse"
            >
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/30 rounded-xl"
              ></div>
            </div>
            <div class="flex-1 text-center lg:text-left">
              <div
                class="h-6 sm:h-8 bg-white/20 rounded-lg mb-2 sm:mb-4 animate-pulse"
              ></div>
              <div class="space-y-2">
                <div
                  class="h-3 sm:h-4 bg-white/20 rounded w-3/4 mx-auto lg:mx-0 animate-pulse"
                ></div>
                <div
                  class="h-3 sm:h-4 bg-white/20 rounded w-1/2 mx-auto lg:mx-0 animate-pulse"
                ></div>
              </div>
            </div>
            <div class="flex items-center justify-center space-x-4">
              <div class="text-center">
                <div
                  class="w-8 h-6 sm:w-12 sm:h-8 bg-white/20 rounded animate-pulse mb-2"
                ></div>
                <div
                  class="w-12 h-3 sm:w-16 sm:h-4 bg-white/20 rounded animate-pulse"
                ></div>
              </div>
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <!-- Left Column Loading -->
        <div class="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
          <div
            class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
          >
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
              <div
                class="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-48 animate-pulse"
              ></div>
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
            >
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"
                ></div>
                <div class="h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"
                ></div>
                <div class="h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"
                ></div>
                <div class="h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"
                ></div>
                <div class="h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
          >
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
              <div
                class="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-48 animate-pulse"
              ></div>
            </div>
            <div class="space-y-4 sm:space-y-6">
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"
                ></div>
                <div class="space-y-2">
                  <div
                    class="h-3 sm:h-4 bg-gray-200 rounded animate-pulse"
                  ></div>
                  <div
                    class="h-3 sm:h-4 bg-gray-200 rounded w-3/4 animate-pulse"
                  ></div>
                  <div
                    class="h-3 sm:h-4 bg-gray-200 rounded w-1/2 animate-pulse"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column Loading -->
        <div class="space-y-4 sm:space-y-6 lg:space-y-8">
          <div
            class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8"
          >
            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
              <div
                class="h-5 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 animate-pulse"
              ></div>
            </div>
            <div class="space-y-3 sm:space-y-4">
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg sm:rounded-xl animate-pulse"
                  ></div>
                  <div class="flex-1">
                    <div
                      class="h-2 sm:h-3 bg-gray-200 rounded mb-2 animate-pulse"
                    ></div>
                    <div
                      class="h-4 sm:h-5 bg-gray-200 rounded animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg sm:rounded-xl animate-pulse"
                  ></div>
                  <div class="flex-1">
                    <div
                      class="h-2 sm:h-3 bg-gray-200 rounded mb-2 animate-pulse"
                    ></div>
                    <div
                      class="h-4 sm:h-5 bg-gray-200 rounded animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div class="flex items-center justify-center mt-6 lg:mt-8">
        <div
          class="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 px-4 sm:px-6 py-3 sm:py-4"
        >
          <div class="flex items-center space-x-3">
            <div
              class="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-600"
            ></div>
            <span class="text-gray-700 font-medium text-sm sm:text-base"
              >Loading school details...</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- No Results State -->
  <div
    v-else
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 flex items-center justify-center"
  >
    <div class="max-w-sm sm:max-w-md mx-auto text-center">
      <div
        class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-12"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
        >
          <School class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          No School Found
        </h3>
        <p
          class="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
        >
          We couldn't find any school details to display. This might be because
          no school has been set up yet or there was an issue loading the data.
        </p>
        <div class="space-y-2 sm:space-y-3">
          <button
            @click="$emit('refresh')"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Try Again</span>
          </button>
          <router-link
            to="/createSchool"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Create New School</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";

  import {
    Edit,
    School,
    GraduationCap,
    Calendar,
    MapPin,
    CheckCircle,
    Info,
    Building,
    Map,
    Hash,
    TreePine,
    Mail,
    Globe,
    Phone,
    PhoneCall,
    FileText,
    Users,
    UserCheck,
    BarChart3,
    Settings,
    Clock,
  } from "lucide-vue-next";
  import store from "@/store";

  // 🎯 UI state
  const showMenu = ref(false);
  const isLoading = ref(true);

  // 🌍 Country lookup
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

  // 🔁 Fetch school details from Vuex on mount
  onMounted(async () => {
    try {
      await store.dispatch("fetchMySchool");
    } finally {
      isLoading.value = false;
    }
  });

  // 🏫 Get school from Vuex state
  const schoolData = computed(() => store.state.schools[0] || null);
  const userRole = computed(() => store.state.userRole);

  // 🧮 Calculate school age
  const getSchoolAge = () => {
    if (!schoolData.value?.establishmentYear) return "N/A";
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(schoolData.value.establishmentYear);
  };

  // 🌎 Convert country code to readable name
  const getCountryName = (code) => {
    const country = countries.value.find((c) => c.code === code);
    return country ? country.name : code;
  };

  // 🧭 Navigation & Actions
  const editSchool = () => {
    console.log("Editing school");
  };

  // 🖱 Close dropdown menu if clicked outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      showMenu.value = false;
    }
  };

  if (typeof window !== "undefined") {
    document.addEventListener("click", handleClickOutside);
  }
</script>

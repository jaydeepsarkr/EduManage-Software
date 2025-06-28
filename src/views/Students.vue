<template>
  <!-- Loading Overlay - Mobile Optimized -->
  <div
    v-if="isInitialLoading"
    class="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div class="text-center max-w-sm mx-auto">
      <div class="relative mb-4 sm:mb-6">
        <!-- Main Spinner -->
        <div
          class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"
        ></div>
        <!-- Inner Spinner -->
        <div
          class="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin mx-auto"
          style="animation-direction: reverse; animation-duration: 1.5s"
        ></div>
      </div>
      <div class="space-y-2">
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
          {{ loadingMessage }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-600">
          Please wait while we load student data...
        </p>
        <!-- Loading Progress Dots -->
        <div class="flex justify-center space-x-1 mt-4">
          <div class="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <div
            class="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
  >
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <!-- Enhanced Stats Cards - Mobile Responsive Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        <!-- Total Students -->
        <div
          class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"
            ></div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide"
              >
                Total Students
              </p>
              <p
                class="text-2xl sm:text-3xl font-bold text-slate-800 mt-1 sm:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  students.length
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-lg"
            >
              <Users class="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>

        <!-- Active Students -->
        <div
          class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"
            ></div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide"
              >
                Active
              </p>
              <p
                class="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2"
              >
                <template v-if="!isStatsLoading">{{ activeStudents }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-3 sm:p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg"
            >
              <UserCheck class="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>

        <!-- Graduated Students -->
        <div
          class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
            ></div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide"
              >
                Graduated
              </p>
              <p
                class="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1 sm:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  graduatedStudents
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg"
            >
              <GraduationCap class="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>

        <!-- Inactive Students -->
        <div
          class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"
            ></div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide"
              >
                Inactive
              </p>
              <p
                class="text-2xl sm:text-3xl font-bold text-red-600 mt-1 sm:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  inactiveStudents
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-3 sm:p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl shadow-lg"
            >
              <UserX class="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <Header
        @search-text="handleSearch"
        @selected-class="handleClassSelect"
        :disabled="isLoading"
      />

      <!-- Enhanced Table - Mobile Responsive -->
      <div
        class="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative"
      >
        <!-- Table Loading Overlay -->
        <div
          v-if="isTableLoading"
          class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
        >
          <div class="text-center">
            <div
              class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-2"
            ></div>
            <p class="text-xs sm:text-sm text-gray-600">
              {{ tableLoadingMessage }}
            </p>
          </div>
        </div>

        <!-- Table Header -->
        <div
          class="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-3 sm:py-4"
        >
          <h3 class="text-lg sm:text-xl font-bold text-white">
            Student Directory
          </h3>
          <p class="text-slate-300 text-xs sm:text-sm mt-1">
            Manage and view all student information
          </p>
        </div>

        <!-- Mobile View - Cards (< 768px) -->
        <div class="block md:hidden">
          <!-- Mobile Skeleton Loading -->
          <div
            v-if="isTableLoading"
            class="p-4 space-y-4"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div class="flex items-center justify-between">
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div
                  class="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                ></div>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="h-12 w-12 bg-gray-200 rounded-full animate-pulse"
                ></div>
                <div class="space-y-2 flex-1">
                  <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div class="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Mobile Cards -->
          <div
            v-else
            class="p-4 space-y-4"
          >
            <div
              v-for="student in students"
              :key="student.id"
              class="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
            >
              <!-- Card Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <div
                    class="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md"
                  >
                    <IdCard class="w-4 h-4 text-white" />
                  </div>
                  <span class="text-sm font-bold text-slate-800">{{
                    student.rollNumber
                  }}</span>
                </div>
                <span
                  :class="getStatusClass(student.status)"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full"
                >
                  <FileChartLine class="w-3 h-3" />
                  {{ student.status }}
                </span>
              </div>

              <!-- Student Info -->
              <div class="flex items-center gap-3 mb-3">
                <div class="flex-shrink-0">
                  <div
                    class="h-6 w-6 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 sm:ring-4 ring-blue-100"
                  >
                    <span class="text-[10px] sm:text-sm font-bold text-white">
                      {{ getInitials(student.name) }}
                    </span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-slate-800 truncate">
                    {{ student.name }}
                  </div>
                  <div
                    class="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 mt-1"
                  >
                    <Mail class="w-3 h-3 flex-shrink-0" />
                    <span class="truncate">{{ student.email }}</span>
                  </div>
                </div>
              </div>

              <!-- Contact & Academic Info -->
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-xs text-slate-700">
                    <div class="p-1 bg-green-100 rounded">
                      <Phone class="w-3 h-3 text-green-600" />
                    </div>
                    <span class="font-medium truncate">{{
                      student.phone
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <div class="p-1 bg-blue-100 rounded">
                      <MapPinHouse class="w-3 h-3 text-blue-600" />
                    </div>
                    <span
                      class="truncate"
                      :title="student.address"
                    >
                      {{
                        student.address
                          ? student.address.includes(",")
                            ? student.address.split(",")[0]
                            : student.address.split(" ")[0]
                          : ""
                      }}
                    </span>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <div
                      class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md"
                    >
                      <School class="w-3 h-3 text-white" />
                    </div>
                    <span class="text-sm font-semibold text-slate-800">{{
                      student.class
                    }}</span>
                  </div>
                  <div
                    class="flex items-center gap-2 text-[8px] sm:text-xs text-slate-600"
                  >
                    <div class="p-1 bg-indigo-100 rounded">
                      <Calendar class="w-3 h-3 text-indigo-600" />
                    </div>
                    <span class="font-medium">
                      {{ formatDate(student.enrollmentDate) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div
                class="flex items-center justify-end gap-2 pt-3 border-t border-gray-100"
              >
                <button
                  :disabled="isLoading"
                  class="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="View Details"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="editStudent(student)"
                  :disabled="isLoading"
                  class="p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Edit"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button
                  :disabled="isLoading"
                  class="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Mobile Empty State -->
            <div
              v-if="!isTableLoading && students.length === 0"
              class="text-center py-12"
            >
              <div
                class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users class="w-8 h-8 text-indigo-500" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                No students found
              </h3>
              <p class="text-sm text-gray-600">
                Try adjusting your search criteria or add new students.
              </p>
            </div>
          </div>
        </div>

        <!-- Desktop View - Table (≥ 768px) -->
        <div class="hidden md:block overflow-x-auto">
          <!-- Desktop Skeleton Loading -->
          <div
            v-if="isTableLoading"
            class="p-6"
          >
            <div class="space-y-4">
              <div
                v-for="i in 8"
                :key="i"
                class="flex items-center space-x-4 py-4"
              >
                <!-- Roll Number Skeleton -->
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                  <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <!-- Student Info Skeleton -->
                <div class="flex items-center space-x-4 flex-1">
                  <div
                    class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"
                  ></div>
                  <div class="space-y-2">
                    <div
                      class="h-4 bg-gray-200 rounded w-32 animate-pulse"
                    ></div>
                    <div
                      class="h-3 bg-gray-200 rounded w-24 animate-pulse"
                    ></div>
                  </div>
                </div>
                <!-- Contact Skeleton -->
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div class="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <!-- Academic Skeleton -->
                <div class="flex items-center space-x-2">
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                  <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <!-- Status Skeleton -->
                <div
                  class="h-6 bg-gray-200 rounded-full w-20 animate-pulse"
                ></div>
                <!-- Date Skeleton -->
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <!-- Actions Skeleton -->
                <div class="flex space-x-2">
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actual Desktop Table -->
          <table
            v-else
            class="w-full"
          >
            <thead
              class="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200"
            >
              <tr>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  <button
                    class="flex items-center gap-2 hover:text-slate-800 transition-colors group"
                    :disabled="isLoading"
                  >
                    <span>Roll No</span>
                    <svg
                      class="w-4 h-4 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      ></path>
                    </svg>
                  </button>
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  <button
                    class="flex items-center gap-2 hover:text-slate-800 transition-colors group"
                    :disabled="isLoading"
                  >
                    <span>Student</span>
                    <svg
                      class="w-4 h-4 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      ></path>
                    </svg>
                  </button>
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  Contact Info
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  Academic
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  Enrollment
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-100">
              <tr
                v-for="student in students"
                :key="student.id"
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
              >
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md"
                    >
                      <IdCard class="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span class="text-sm font-bold text-slate-800">{{
                      student.rollNumber
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                      <div
                        class="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-4 ring-blue-100"
                      >
                        <span class="text-xs lg:text-sm font-bold text-white">{{
                          getInitials(student.name)
                        }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-bold text-slate-800">
                        {{ student.name }}
                      </div>
                      <div
                        class="text-xs text-slate-500 flex items-center gap-1 mt-1"
                      >
                        <Mail class="w-3 h-3" />
                        {{ student.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-slate-700">
                      <div class="p-1 bg-green-100 rounded">
                        <Phone class="w-3 h-3 text-green-600" />
                      </div>
                      <span class="font-medium">{{ student.phone }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-slate-500">
                      <div class="p-1 bg-blue-100 rounded">
                        <MapPinHouse class="w-3 h-3 text-blue-600" />
                      </div>
                      <span
                        :title="student.address"
                        class="truncate max-w-24"
                      >
                        {{
                          student.address
                            ? student.address.includes(",")
                              ? student.address.split(",")[0]
                              : student.address.split(" ")[0]
                            : ""
                        }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md"
                    >
                      <School class="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <span class="text-sm font-semibold text-slate-800">{{
                      student.class
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <span
                    :class="getStatusClass(student.status)"
                    class="inline-flex items-center gap-2 px-2 lg:px-3 py-1 lg:py-2 text-xs font-bold rounded-full shadow-sm"
                  >
                    <FileChartLine class="w-3 h-3" />
                    {{ student.status }}
                  </span>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-2 text-sm text-slate-600">
                    <div class="p-1 bg-indigo-100 rounded">
                      <Calendar class="w-3 h-3 lg:w-4 lg:h-4 text-indigo-600" />
                    </div>
                    <span class="font-medium">{{
                      formatDate(student.enrollmentDate)
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <button
                      :disabled="isLoading"
                      class="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="View Details"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="editStudent(student)"
                      :disabled="isLoading"
                      class="p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      :disabled="isLoading"
                      class="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Desktop Empty State -->
          <div
            v-if="!isTableLoading && students.length === 0"
            class="text-center py-16"
          >
            <div
              class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users class="w-10 h-10 text-indigo-500" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              No students found
            </h3>
            <p class="text-gray-600">
              Try adjusting your search criteria or add new students.
            </p>
          </div>
        </div>
      </div>

      <!-- Enhanced Edit Student Modal - Mobile Responsive -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div
          class="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl relative animate-fade-in border border-slate-200 flex flex-col"
        >
          <!-- Modal Loading Overlay -->
          <div
            v-if="isSaving"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl sm:rounded-3xl"
          >
            <div class="text-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-2"
              ></div>
              <p class="text-xs sm:text-sm text-gray-600">Saving changes...</p>
            </div>
          </div>

          <!-- Fixed Header -->
          <div
            class="flex-shrink-0 p-4 sm:p-6 md:p-8 border-b border-slate-200"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              :disabled="isSaving"
              class="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Close"
            >
              <X class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <!-- Header -->
            <div class="flex items-center gap-3">
              <div
                class="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg"
              >
                <Pencil class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2
                  class="text-lg sm:text-xl md:text-2xl font-bold text-slate-800"
                >
                  Edit Student
                </h2>
                <p class="text-slate-500 text-xs sm:text-sm">
                  Update student information
                </p>
              </div>
            </div>
          </div>

          <!-- Scrollable Form Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            >
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Full Name</label
                >
                <input
                  v-model="editingStudent.name"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter full name"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Roll Number</label
                >
                <input
                  v-model="editingStudent.rollNumber"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter roll number"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Email Address</label
                >
                <input
                  v-model="editingStudent.email"
                  type="email"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter email address"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Class</label
                >
                <input
                  v-model="editingStudent.class"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter class"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Phone Number</label
                >
                <input
                  v-model="editingStudent.phone"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter phone number"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Status</label
                >
                <select
                  v-model="editingStudent.status"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium bg-white text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Leaved</option>
                  <option value="Graduated">Passed Out</option>
                </select>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label
                  class="block text-xs sm:text-sm font-semibold text-slate-700"
                  >Address</label
                >
                <textarea
                  v-model="editingStudent.address"
                  rows="3"
                  :disabled="isSaving"
                  class="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-medium resize-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter full address"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Fixed Footer -->
          <div
            class="flex-shrink-0 p-4 sm:p-6 md:p-8 border-t border-slate-200"
          >
            <div
              class="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4"
            >
              <button
                @click="closeModal"
                :disabled="isSaving"
                class="px-4 sm:px-6 py-2 sm:py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg sm:rounded-xl hover:bg-slate-300 transition-all duration-200 transform hover:scale-105 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Cancel
              </button>
              <button
                @click="saveStudent"
                :disabled="isSaving"
                class="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div
                  v-if="isSaving"
                  class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                ></div>
                <Save
                  v-else
                  class="w-3 h-3 sm:w-4 sm:h-4"
                />
                <span>{{ isSaving ? "Saving..." : "Save Changes" }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Section - Mobile Responsive -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 sm:mt-8 space-y-3 sm:space-y-0 px-2"
      >
        <!-- Results summary -->
        <div
          class="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left"
        >
          <template v-if="!isTableLoading">
            Showing
            <span class="font-bold text-gray-900">
              {{ (currentPage - 1) * limit + 1 }}
            </span>
            to
            <span class="font-bold text-gray-900">
              {{ Math.min(currentPage * limit, totalResults) }}
            </span>
            of
            <span class="font-bold text-gray-900">
              {{ totalResults }}
            </span>
            results
          </template>
          <template v-else>
            <div
              class="flex items-center gap-2 justify-center sm:justify-start"
            >
              <div
                class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"
              ></div>
              <span>Loading results...</span>
            </div>
          </template>
        </div>

        <!-- Pagination buttons -->
        <div class="flex items-center justify-center gap-1">
          <!-- Previous button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || isTableLoading"
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px]"
          >
            <ChevronLeft class="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <!-- Numbered buttons -->
          <template
            v-for="page in Math.min(totalPages, 5)"
            :key="page"
          >
            <button
              @click="goToPage(page)"
              :disabled="isTableLoading"
              :class="[
                'px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 min-h-[36px] min-w-[36px]',
                page === currentPage
                  ? 'font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                  : 'font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || isTableLoading"
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px]"
          >
            <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { useStore } from "vuex";
  import {
    Pencil,
    X,
    Save,
    School,
    Mail,
    Phone,
    MapPinHouse,
    FileChartLine,
    Calendar,
    IdCard,
    Users,
    UserCheck,
    GraduationCap,
    UserX,
    ChevronLeft,
    ChevronRight,
  } from "lucide-vue-next";
  import Header from "@/components/Students/HeaderStudent.vue";

  // Vuex store
  const store = useStore();
  const students = computed(() => store.getters.allStudents);

  // Loading States
  const isInitialLoading = ref(false);
  const isLoading = ref(false);
  const isStatsLoading = ref(false);
  const isTableLoading = ref(false);
  const isSaving = ref(false);
  const loadingMessage = ref("Loading student data...");
  const tableLoadingMessage = ref("Loading students...");

  // 📄 Pagination State
  const currentPage = ref(1);
  const limit = ref(20);
  const totalResults = computed(() => store.getters.getStudentPagination.total);
  const totalPages = computed(() => store.getters.getStudentPagination.pages);

  // Local state
  const editingStudent = ref(null);
  const showEditModal = ref(false);
  const error = ref("");

  // Filters
  const searchTerm = ref("");
  const selectedClass = ref(null);

  // Computed stats
  const activeStudents = computed(
    () => students.value.filter((s) => s.status === "active").length
  );
  const graduatedStudents = computed(
    () => students.value.filter((s) => s.status === "passedout").length
  );
  const inactiveStudents = computed(
    () => students.value.filter((s) => s.status === "leaved").length
  );

  // Handle events from Header
  const handleSearch = (value) => {
    searchTerm.value = value;
  };
  const handleClassSelect = (value) => {
    selectedClass.value = value;
  };

  // Fetch students with filters
  const fetchStudents = async () => {
    const isInitialLoad =
      currentPage.value === 1 && students.value.length === 0;
    if (isInitialLoad) {
      isInitialLoading.value = true;
      loadingMessage.value = "Loading student directory...";
    } else {
      isTableLoading.value = true;
      tableLoadingMessage.value =
        currentPage.value === 1
          ? "Filtering students..."
          : `Loading page ${currentPage.value}...`;
    }

    try {
      isLoading.value = true;
      await store.dispatch("fetchStudents", {
        search: searchTerm.value,
        class: selectedClass.value,
        page: currentPage.value,
        limit: limit.value,
      });
    } catch (err) {
      error.value = "Failed to fetch students.";
      console.error("Error fetching students:", err);
    } finally {
      isLoading.value = false;
      isTableLoading.value = false;
      isInitialLoading.value = false;
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    isStatsLoading.value = true;
    try {
      // Simulate stats loading - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      isStatsLoading.value = false;
    }
  };

  // Fetch on mount
  onMounted(async () => {
    isInitialLoading.value = true;
    loadingMessage.value = "Initializing student management...";
    try {
      await Promise.all([fetchStudents(), fetchStats()]);
    } finally {
      isInitialLoading.value = false;
    }
  });

  // Watch filters and refetch with debouncing
  let searchTimeout;
  watch(searchTerm, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage.value = 1;
      fetchStudents();
    }, 300);
  });

  watch(selectedClass, () => {
    currentPage.value = 1;
    fetchStudents();
  });

  // Utilities
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300";
      case "leaved":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300";
      case "passedout":
        return "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border border-indigo-300";
      default:
        return "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300";
    }
  };

  // Edit logic
  const editStudent = (student) => {
    editingStudent.value = { ...student };
    showEditModal.value = true;
  };

  const saveStudent = async () => {
    isSaving.value = true;
    try {
      // Simulate save operation - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const index = students.value.findIndex(
        (s) => s._id === editingStudent.value._id
      );
      if (index !== -1) {
        students.value[index] = { ...editingStudent.value };
        // Optional: Dispatch an update action to Vuex/server
      }
      showEditModal.value = false;
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      isSaving.value = false;
    }
  };

  const closeModal = () => {
    if (!isSaving.value) {
      showEditModal.value = false;
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && !isTableLoading.value) {
      currentPage.value = page;
      isTableLoading.value = true;
      tableLoadingMessage.value = `Loading page ${page}...`;
      fetchStudents();
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

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Custom scrollbar */
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Loading overlay styles */
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  /* Disabled state improvements */
  .disabled\:opacity-50:disabled {
    opacity: 0.5;
  }

  .disabled\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }

  .disabled\:transform-none:disabled {
    transform: none;
  }

  /* Mobile-specific optimizations */
  @media (max-width: 640px) {
    /* Ensure minimum touch targets */
    button {
      min-height: 44px;
      min-width: 44px;
    }

    input,
    select,
    textarea {
      min-height: 44px;
    }

    /* Optimize text sizes for mobile */
    .text-xs {
      font-size: 0.75rem;
      line-height: 1rem;
    }

    .text-sm {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }

  /* Tablet optimizations */
  @media (min-width: 641px) and (max-width: 1023px) {
    /* Adjust spacing for tablet */
    .p-4 {
      padding: 1.5rem;
    }

    .gap-3 {
      gap: 0.75rem;
    }
  }

  /* Desktop optimizations */
  @media (min-width: 1024px) {
    /* Enhanced hover effects for desktop */
    button:hover {
      transform: translateY(-1px);
    }

    .hover\:scale-105:hover {
      transform: scale(1.05);
    }
  }

  /* High DPI display optimizations */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    /* Sharper borders and shadows */
    .border {
      border-width: 0.5px;
    }

    .shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>

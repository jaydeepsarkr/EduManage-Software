<template>
  <!-- Loading Overlay -->
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div class="text-center">
      <div class="relative">
        <!-- Animated Spinner -->
        <div
          class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"
        ></div>
        <!-- Pulsing Dots -->
        <div class="flex justify-center space-x-1 mb-4">
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div
            class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          ></div>
        </div>
      </div>
      <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">
        {{ loadingMessage }}
      </h3>
      <p class="text-xs sm:text-sm text-gray-500">
        Please wait while we load your data...
      </p>
    </div>
  </div>

  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-4 lg:p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header Cards - Mobile Responsive Grid -->
      <!-- Updated grid container -->
      <div class="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
        <AttendanceCard
          viewKey="attendance"
          title="Give Attendance"
          description="Mark daily attendance for students"
          :iconPath="'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'"
          :isActive="currentView === 'attendance'"
          color="blue"
          @select="currentView = $event"
          :class="
            currentView === 'attendance'
              ? 'ring-1 sm:ring-2 ring-blue-500 bg-blue-50/70'
              : ''
          "
        />

        <AttendanceCard
          viewKey="details"
          title="Attendance Details"
          description="View attendance reports and analytics"
          :iconPath="'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'"
          :isActive="currentView === 'details'"
          color="blue"
          @select="currentView = $event"
          :class="
            currentView === 'details'
              ? 'ring-1 sm:ring-2 ring-blue-500 bg-blue-50/70'
              : ''
          "
        />
      </div>

      <div v-if="currentView === 'attendance'">
        <!-- Filter Section - Mobile First -->
        <div
          class="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-6 lg:mb-8 hover:shadow-xl transition-all duration-300"
        >
          <!-- Mobile Filter Header -->
          <div class="flex items-center justify-between mb-4 sm:hidden">
            <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              @click="showMobileFilters = !showMobileFilters"
              class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg
                v-if="!showMobileFilters"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Filter Content -->
          <div
            :class="[
              'sm:block transition-all duration-300',
              showMobileFilters ? 'block' : 'hidden sm:block',
            ]"
          >
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-end"
            >
              <!-- Search Input - Mobile First -->
              <div class="flex-1 sm:max-w-sm lg:max-w-md">
                <label
                  class="block text-sm font-medium text-gray-700 mb-2 sm:hidden"
                  >Search Student</label
                >
                <div class="relative group">
                  <Search
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
                  />
                  <input
                    v-model="search"
                    type="text"
                    placeholder="Search student by name..."
                    :disabled="isSearching"
                    class="w-full pl-10 pr-10 py-3 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  />

                  <!-- Search Loading Indicator -->
                  <div
                    v-if="isSearching"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div
                      class="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Class Dropdown - Mobile Responsive -->
              <div class="sm:w-40 lg:w-44">
                <label
                  class="block text-sm font-medium text-gray-700 mb-2 sm:hidden"
                  >Class</label
                >
                <div class="relative group">
                  <GraduationCap
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
                  />
                  <select
                    v-model="selectedClass"
                    :disabled="isLoading"
                    class="w-full pl-10 pr-8 py-3 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 appearance-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <option
                      v-for="n in 10"
                      :key="n"
                      :value="n"
                    >
                      Class {{ n }}
                    </option>
                  </select>
                  <ChevronDown
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                  />
                </div>
              </div>

              <!-- Action Buttons - Mobile Responsive -->
              <div class="flex space-x-2 sm:space-x-3">
                <button
                  @click="fetchFilteredStudents"
                  :disabled="isLoading"
                  class="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-3 sm:py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base min-h-[44px]"
                >
                  <div
                    v-if="isLoading"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <span>{{ isLoading ? "Loading..." : "Submit" }}</span>
                </button>

                <button
                  :disabled="isLoading"
                  class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                >
                  <Filter class="w-4 h-4" />
                </button>
                <button
                  @click="refreshData"
                  :disabled="isLoading"
                  class="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                >
                  <RefreshCw
                    :class="['w-4 h-4', isLoading ? 'animate-spin' : '']"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area with Loading State -->
        <div class="relative">
          <!-- Content Loading Overlay -->
          <div
            v-if="isContentLoading"
            class="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center"
          >
            <div class="text-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
              ></div>
              <p class="text-xs sm:text-sm text-gray-600">
                Loading students...
              </p>
            </div>
          </div>

          <div
            v-if="students.length > 0"
            class="bg-white rounded-xl shadow-sm border border-slate-200"
          >
            <div class="p-4 sm:p-6 border-b border-slate-200">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4"
              >
                <h2 class="text-lg sm:text-xl font-semibold text-slate-900">
                  {{ getClassName(selectedClass) }} - Student Attendance
                </h2>

                <!-- Stats - Mobile Responsive -->
                <div class="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
                  <span class="flex items-center">
                    <div class="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span class="font-medium text-slate-700"
                      >Present: {{ getPresentCount() }}</span
                    >
                  </span>
                  <span class="flex items-center">
                    <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span class="font-medium text-slate-700"
                      >Absent: {{ getAbsentCount() }}</span
                    >
                  </span>
                  <span class="flex items-center">
                    <div class="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                    <span class="font-medium text-slate-700"
                      >Late: {{ getLateCount() }}</span
                    >
                  </span>
                </div>
              </div>

              <!-- Bulk Actions - Mobile Responsive -->
              <div class="flex flex-wrap gap-2 sm:gap-3">
                <button
                  @click="markAllPresent"
                  :disabled="isLoading"
                  class="px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-xs sm:text-sm font-medium border border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
                >
                  Mark All Present
                </button>
                <button
                  @click="markAllAbsent"
                  :disabled="isLoading"
                  class="px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm font-medium border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
                >
                  Mark All Absent
                </button>
                <button
                  @click="clearAll"
                  :disabled="isLoading"
                  class="px-3 sm:px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-xs sm:text-sm font-medium border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div class="p-4 sm:p-6">
              <!-- Mobile View - Cards (< 768px) -->
              <div class="block md:hidden space-y-4">
                <div
                  v-for="student in students"
                  :key="student._id"
                  :class="[
                    'border-2 rounded-xl p-4 transition-all duration-200 shadow-sm',
                    attendance[student._id] === 'present'
                      ? 'border-green-200 bg-green-50'
                      : attendance[student._id] === 'absent'
                      ? 'border-red-200 bg-red-50'
                      : attendance[student._id] === 'late'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white',
                  ]"
                >
                  <!-- Student Info Header -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center gap-2">
                        <IdCard class="w-4 h-4 text-blue-600" />
                        <span class="text-sm font-medium text-gray-900">{{
                          student.rollNumber
                        }}</span>
                      </div>
                      <div
                        class="w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
                      >
                        <span class="text-sm font-semibold text-white">
                          {{ student.name.charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <span
                          class="text-[12px] md:text-sm font-medium text-slate-900 truncate block"
                        >
                          {{ student.name }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-if="alreadyMarked[student._id]"
                      class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      Marked
                    </div>
                  </div>

                  <!-- Attendance Buttons - Mobile Grid -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <button
                      @click="setAttendance(student._id, 'present')"
                      :disabled="isLoading"
                      :class="[
                        'flex items-center justify-center px-2 py-3 rounded-lg text-xs font-medium transition-all duration-200 min-h-[44px]',
                        attendance[student._id] === 'present'
                          ? 'bg-emerald-500 text-white shadow-md'
                          : alreadyMarked[student._id]
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ]"
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Present
                    </button>

                    <button
                      @click="setAttendance(student._id, 'absent')"
                      :disabled="isLoading"
                      :class="[
                        'flex items-center justify-center px-2 py-3 rounded-lg text-xs font-medium transition-all duration-200 min-h-[44px]',
                        attendance[student._id] === 'absent'
                          ? 'bg-red-500 text-white shadow-md'
                          : alreadyMarked[student._id]
                          ? 'bg-red-50 text-red-700 border border-red-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ]"
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                      Absent
                    </button>

                    <button
                      @click="setAttendance(student._id, 'late')"
                      :disabled="isLoading"
                      :class="[
                        'flex items-center justify-center px-2 py-3 rounded-lg text-xs font-medium transition-all duration-200 min-h-[44px]',
                        attendance[student._id] === 'late'
                          ? 'bg-amber-500 text-white shadow-md'
                          : alreadyMarked[student._id]
                          ? 'bg-amber-50 text-amber-700 border border-amber-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ]"
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Late
                    </button>
                  </div>

                  <!-- Remarks Input -->
                  <input
                    type="text"
                    v-model="remarks[student._id]"
                    placeholder="Add remarks..."
                    :disabled="isLoading"
                    class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px]"
                  />
                </div>
              </div>

              <!-- Desktop View - Table (≥ 768px) -->
              <div class="hidden md:block overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-slate-200">
                      <th
                        class="text-left py-4 px-4 font-semibold text-slate-700 text-sm"
                      >
                        Roll No.
                      </th>
                      <th
                        class="text-left py-4 px-4 font-semibold text-slate-700 text-sm"
                      >
                        Student Name
                      </th>
                      <th
                        class="text-center py-4 px-4 font-semibold text-slate-700 text-sm"
                      >
                        Attendance Status
                      </th>
                      <th
                        class="text-center py-4 px-4 font-semibold text-slate-700 text-sm"
                      >
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="student in students"
                      :key="student._id"
                      :class="[
                        'border-b transition-colors',
                        attendance[student._id] === 'present'
                          ? 'bg-green-50 hover:bg-green-100'
                          : attendance[student._id] === 'absent'
                          ? 'bg-red-50 hover:bg-red-100'
                          : attendance[student._id] === 'late'
                          ? 'bg-yellow-50 hover:bg-yellow-100'
                          : 'hover:bg-slate-50',
                      ]"
                    >
                      <td
                        class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        <div class="flex items-center gap-2">
                          <IdCard class="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                          <span>{{ student.rollNumber }}</span>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <div class="flex items-center">
                          <div
                            class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3"
                          >
                            <span
                              class="text-xs lg:text-sm font-semibold text-white"
                            >
                              {{ student.name.charAt(0).toUpperCase() }}
                            </span>
                          </div>
                          <span
                            class="font-medium text-slate-900 text-sm lg:text-base"
                          >
                            {{ student.name }}
                            <span
                              v-if="alreadyMarked[student._id]"
                              class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                            >
                              (Marked)
                            </span>
                          </span>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <div class="flex justify-center space-x-1 lg:space-x-2">
                          <button
                            @click="setAttendance(student._id, 'present')"
                            :disabled="isLoading"
                            :class="[
                              'px-2 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 min-h-[36px]',
                              attendance[student._id] === 'present'
                                ? 'bg-emerald-500 text-white shadow-md'
                                : alreadyMarked[student._id]
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200',
                              'disabled:opacity-50 disabled:cursor-not-allowed',
                            ]"
                          >
                            Present
                          </button>

                          <button
                            @click="setAttendance(student._id, 'absent')"
                            :disabled="isLoading"
                            :class="[
                              'px-2 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 min-h-[36px]',
                              attendance[student._id] === 'absent'
                                ? 'bg-red-500 text-white shadow-md'
                                : alreadyMarked[student._id]
                                ? 'bg-red-50 text-red-700 border border-red-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-200',
                              'disabled:opacity-50 disabled:cursor-not-allowed',
                            ]"
                          >
                            Absent
                          </button>

                          <button
                            @click="setAttendance(student._id, 'late')"
                            :disabled="isLoading"
                            :class="[
                              'px-2 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 min-h-[36px]',
                              attendance[student._id] === 'late'
                                ? 'bg-amber-500 text-white shadow-md'
                                : alreadyMarked[student._id]
                                ? 'bg-amber-50 text-amber-700 border border-amber-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200',
                              'disabled:opacity-50 disabled:cursor-not-allowed',
                            ]"
                          >
                            Late
                          </button>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <input
                          type="text"
                          v-model="remarks[student._id]"
                          placeholder="Add remarks..."
                          :disabled="isLoading"
                          class="w-full px-3 py-2 text-xs lg:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Save Button - Mobile Responsive -->
              <div class="mt-6 sm:mt-8 flex justify-center sm:justify-end">
                <button
                  @click="saveAttendance"
                  :disabled="!canSubmit || isSaving"
                  :class="[
                    canSubmit && !isSaving
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed',
                    'w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform flex items-center justify-center gap-2 text-[12px] sm:text-base min-h-[48px]',
                  ]"
                >
                  <div
                    v-if="isSaving"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <span>{{
                    isSaving ? "Saving..." : "Save Attendance Record"
                  }}</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="!isLoading && !isContentLoading">
            <EmptyStateCard />
          </div>
        </div>

        <!-- Pagination Section - Mobile Responsive -->
        <div
          v-if="students.length"
          class="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 space-y-4 sm:space-y-0 px-2"
        >
          <!-- Results summary -->
          <div
            class="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left"
          >
            <template v-if="!isLoading">
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
                  class="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"
                ></div>
                <span>Loading results...</span>
              </div>
            </template>
          </div>

          <!-- Pagination buttons -->
          <div class="flex items-center gap-1">
            <!-- Previous button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1 || isLoading"
              class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px]"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>

            <!-- Numbered buttons -->
            <template
              v-for="page in totalPages"
              :key="page"
            >
              <button
                @click="goToPage(page)"
                :disabled="isLoading"
                :class="[
                  'px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-xl transition-all duration-200 min-h-[36px] min-w-[36px]',
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
              :disabled="currentPage === totalPages || isLoading"
              class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px]"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="currentView === 'details'">
        <AttendanceDetails />
      </div>
    </div>

    <!-- Success Toast - Mobile Responsive -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-2xl shadow-2xl transition-all duration-500 transform animate-bounce z-50 max-w-sm mx-auto sm:mx-0"
    >
      <ShowSuccess />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { useStore } from "vuex";
  import {
    IdCard,
    ChevronDown,
    Search,
    GraduationCap,
    Filter,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
  } from "lucide-vue-next";
  import AttendanceCard from "@/components/Attendence/ActionButtons.vue";
  import EmptyStateCard from "@/components/Attendence/EmptyState.vue";
  import AttendanceDetails from "@/components/Attendence/AttendanceDetails.vue";
  import ShowSuccess from "@/components/Attendence/Success.vue";

  // 🧠 Store & Local State
  const store = useStore();
  const currentView = ref("attendance");
  const attendanceDate = ref("");
  const attendance = ref({});
  const remarks = ref({});
  const alreadyMarked = ref({});
  const showSuccessToast = ref(false);
  const selectedClass = ref("1");
  const search = ref("");
  const students = ref([]);

  // 🔄 Loading States
  const isLoading = ref(false);
  const isContentLoading = ref(false);
  const isSearching = ref(false);
  const isSaving = ref(false);
  const loadingMessage = ref("Loading attendance data...");

  // 📱 Mobile State
  const showMobileFilters = ref(false);

  // 📄 Pagination State
  const currentPage = ref(1);
  const limit = ref(20);
  const totalResults = computed(() => store.getters.getStudentPagination.total);
  const totalPages = computed(() => store.getters.getStudentPagination.pages);

  // ✅ Mounted: Fetch initial data
  onMounted(async () => {
    isLoading.value = true;
    loadingMessage.value = "Initializing attendance system...";
    try {
      const today = new Date();
      attendanceDate.value = today.toISOString().split("T")[0];
      await fetchFilteredStudents();
    } finally {
      isLoading.value = false;
    }
  });

  // 🔄 Fetch Students (with pagination support)
  const fetchFilteredStudents = async (page = 1) => {
    const isInitialLoad = page === 1 && students.value.length === 0;
    if (isInitialLoad) {
      isLoading.value = true;
      loadingMessage.value = "Loading students...";
    } else {
      isContentLoading.value = true;
    }

    try {
      currentPage.value = page;
      await store.dispatch("fetchStudents", {
        class: selectedClass.value,
        search: search.value.trim(),
        page: currentPage.value,
        limit: limit.value,
      });

      students.value = [...store.getters.allStudents].sort(
        (a, b) => a.rollNumber - b.rollNumber
      );

      attendance.value = {};
      remarks.value = {};
      alreadyMarked.value = {};

      students.value.forEach((student) => {
        if (student.attendanceStatus) {
          attendance.value[student._id] = student.attendanceStatus;
          alreadyMarked.value[student._id] = true;
        }
        if (student.remarks) {
          remarks.value[student._id] = student.remarks;
        }
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      isLoading.value = false;
      isContentLoading.value = false;
      isSearching.value = false;
    }
  };

  // 🔁 Watch for Class or Search changes
  let searchTimeout;
  watch(search, () => {
    clearTimeout(searchTimeout);
    isSearching.value = true;
    searchTimeout = setTimeout(() => {
      fetchFilteredStudents(1); // reset to page 1
    }, 300);
  });

  watch(selectedClass, () => {
    isContentLoading.value = true;
    loadingMessage.value = `Loading Class ${selectedClass.value} students...`;
    fetchFilteredStudents(1);
  });

  // 🔄 Refresh Data
  const refreshData = async () => {
    isLoading.value = true;
    loadingMessage.value = "Refreshing data...";
    await fetchFilteredStudents(currentPage.value);
  };

  // 📚 Class name display helper
  const getClassName = (classId) => `Class ${classId ?? "N/A"}`;

  // 📊 Count helpers
  const getPresentCount = () =>
    Object.values(attendance.value).filter((v) => v === "present").length;

  const getAbsentCount = () =>
    Object.values(attendance.value).filter((v) => v === "absent").length;

  const getLateCount = () =>
    Object.values(attendance.value).filter((v) => v === "late").length;

  // ✅ Bulk Marking
  const markAllPresent = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        attendance.value[s._id] = "present";
      }
    });
  };

  const markAllAbsent = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        attendance.value[s._id] = "absent";
      }
    });
  };

  const clearAll = () => {
    students.value.forEach((s) => {
      if (!alreadyMarked.value[s._id]) {
        delete attendance.value[s._id];
        delete remarks.value[s._id];
      }
    });
  };

  // 🔘 Set individual attendance
  const setAttendance = (studentId, status) => {
    attendance.value[studentId] = status;
  };

  // 💾 Save attendance
  const saveAttendance = async () => {
    isSaving.value = true;
    loadingMessage.value = "Saving attendance records...";

    try {
      for (const student of students.value) {
        const studentId = student._id;
        const status = attendance.value[studentId];
        const notes = remarks.value[studentId] || "";

        if (!status) continue;

        await store.dispatch("markAttendance", {
          studentId,
          status,
          subject: "",
          notes,
        });

        alreadyMarked.value[studentId] = true;
      }

      showSuccessToast.value = true;
      setTimeout(() => (showSuccessToast.value = false), 3000);
    } catch (error) {
      console.error("Error while saving attendance:", error);
      alert("Failed to save attendance. Please try again.");
    } finally {
      isSaving.value = false;
    }
  };

  // 🔁 Pagination Button Click
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && !isLoading.value) {
      isContentLoading.value = true;
      loadingMessage.value = `Loading page ${page}...`;
      fetchFilteredStudents(page);
    }
  };

  // 🚫 Allow submit only if at least one attendance is selected
  const canSubmit = computed(() => Object.keys(attendance.value).length > 0);
</script>

<style scoped>
  /* Custom animations */
  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  .animate-bounce {
    animation: bounce 1s ease infinite;
  }

  /* Enhanced spinner animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  /* Pulse animation for loading dots */
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

  /* Smooth transitions */
  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Focus styles */
  input:focus,
  select:focus,
  button:focus {
    outline: none;
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
    select {
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

  /* Dark mode support (if needed) */
  @media (prefers-color-scheme: dark) {
    /* Add dark mode styles here if needed */
  }
</style>

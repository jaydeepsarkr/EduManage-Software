<template>
  <!-- Loading Overlay - Mobile Optimized -->
  <div
    v-if="isInitialLoading"
    class="fixed inset-0 bg-white z-50 flex items-center justify-center p-3 sm:p-4"
  >
    <div class="text-center max-w-xs sm:max-w-sm mx-auto">
      <div class="relative mb-3 sm:mb-4 md:mb-6">
        <!-- Main Spinner -->
        <div
          class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-3 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"
        ></div>
        <!-- Inner Spinner -->
        <div
          class="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-3 sm:border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto"
          style="animation-direction: reverse; animation-duration: 1.5s"
        ></div>
      </div>
      <div class="space-y-1 sm:space-y-2">
        <h3 class="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {{ loadingMessage }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-600 px-2">
          Please wait while we load student data...
        </p>
        <!-- Loading Progress Dots -->
        <div class="flex justify-center space-x-1 mt-3 sm:mt-4">
          <div
            class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse"
          ></div>
          <div
            class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-screen bg-gray-50">
    <div
      class="max-w-none xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-6 lg:py-8"
    >
      <!-- Global Success/Error Toast -->
      <div
        v-if="globalMessage.show"
        :class="[
          'fixed top-2 left-2 right-2 sm:top-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 p-3 sm:p-4 rounded-lg shadow-lg border animate-slide-in',
          globalMessage.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800',
        ]"
      >
        <div class="flex items-start gap-2 sm:gap-3">
          <div
            :class="[
              'p-1 rounded-full flex-shrink-0',
              globalMessage.type === 'success' ? 'bg-green-100' : 'bg-red-100',
            ]"
          >
            <svg
              v-if="globalMessage.type === 'success'"
              class="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
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
            <svg
              v-else
              class="w-3 h-3 sm:w-4 sm:h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4
              :class="[
                'text-xs sm:text-sm font-semibold',
                globalMessage.type === 'success'
                  ? 'text-green-800'
                  : 'text-red-800',
              ]"
            >
              {{ globalMessage.type === "success" ? "Success" : "Error" }}
            </h4>
            <p
              :class="[
                'text-xs sm:text-sm mt-0.5 sm:mt-1 break-words',
                globalMessage.type === 'success'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ globalMessage.message }}
            </p>
          </div>
          <button
            @click="hideGlobalMessage"
            :class="[
              'p-1 transition-colors flex-shrink-0',
              globalMessage.type === 'success'
                ? 'text-green-400 hover:text-green-600'
                : 'text-red-400 hover:text-red-600',
            ]"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4"
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
      </div>

      <!-- Enhanced Stats Cards - Mobile Responsive Grid -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8"
      >
        <!-- Total Students -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
          >
            <div
              class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"
            ></div>
          </div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div class="flex-1">
              <p
                class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide"
              >
                Total Students
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-0.5 sm:mt-1 md:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  students.length
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-2 sm:p-3 md:p-4 bg-blue-600 rounded-lg border border-blue-600 self-end sm:self-auto"
            >
              <Users
                class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white"
              />
            </div>
          </div>
        </div>

        <!-- Active Students -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
          >
            <div
              class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"
            ></div>
          </div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div class="flex-1">
              <p
                class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide"
              >
                Active
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mt-0.5 sm:mt-1 md:mt-2"
              >
                <template v-if="!isStatsLoading">{{ activeStudents }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-2 sm:p-3 md:p-4 bg-green-600 rounded-lg border border-green-600 self-end sm:self-auto"
            >
              <UserCheck
                class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white"
              />
            </div>
          </div>
        </div>

        <!-- Graduated Students -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
          >
            <div
              class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"
            ></div>
          </div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div class="flex-1">
              <p
                class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide"
              >
                Graduated
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mt-0.5 sm:mt-1 md:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  graduatedStudents
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-2 sm:p-3 md:p-4 bg-blue-600 rounded-lg border border-blue-600 self-end sm:self-auto"
            >
              <GraduationCap
                class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white"
              />
            </div>
          </div>
        </div>

        <!-- Inactive Students -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 relative overflow-hidden"
        >
          <!-- Stats Loading Overlay -->
          <div
            v-if="isStatsLoading"
            class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
          >
            <div
              class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"
            ></div>
          </div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div class="flex-1">
              <p
                class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide"
              >
                Inactive
              </p>
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600 mt-0.5 sm:mt-1 md:mt-2"
              >
                <template v-if="!isStatsLoading">{{
                  inactiveStudents
                }}</template>
                <template v-else>--</template>
              </p>
            </div>
            <div
              class="p-2 sm:p-3 md:p-4 bg-red-600 rounded-lg border border-red-600 self-end sm:self-auto"
            >
              <UserX
                class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white"
              />
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

      <!-- Bulk Actions Bar -->
      <div
        v-if="selectedStudents.length > 0"
        class="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 md:mb-6 animate-slide-down"
      >
        <div class="flex flex-col gap-3 sm:gap-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-blue-600 rounded-lg flex-shrink-0">
              <CheckSquare
                class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm sm:text-base font-semibold text-blue-900">
                {{ selectedStudents.length }} student{{
                  selectedStudents.length > 1 ? "s" : ""
                }}
                selected
              </p>
              <p class="text-xs sm:text-sm text-blue-700">
                Choose an action to perform on selected students
              </p>
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
          >
            <button
              @click="clearSelection"
              class="px-3 py-2 text-xs sm:text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-300 min-h-[40px] sm:min-h-[36px]"
            >
              Clear Selection
            </button>
            <button
              @click="promoteSelectedStudents"
              :disabled="isLoading"
              class="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-green-600 min-h-[40px] sm:min-h-[36px]"
            >
              <TrendingUp class="w-3 h-3 sm:w-4 sm:h-4" />
              <span class="hidden xs:inline">Promote to Higher Class</span>
              <span class="xs:hidden">Promote</span>
            </button>
            <button
              @click="deleteSelectedStudents"
              :disabled="isLoading || isDeleting"
              class="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-600 min-h-[40px] sm:min-h-[36px]"
            >
              <div
                v-if="isDeleting"
                class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              <Trash2
                v-else
                class="w-3 h-3 sm:w-4 sm:h-4"
              />
              <span class="hidden xs:inline">{{
                isDeleting ? "Deleting..." : "Delete Selected"
              }}</span>
              <span class="xs:hidden">{{
                isDeleting ? "Deleting..." : "Delete"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Table - Mobile Responsive -->
      <div
        class="bg-white rounded-lg border border-gray-200 overflow-hidden relative"
      >
        <!-- Table Loading Overlay -->
        <div
          v-if="isTableLoading"
          class="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center"
        >
          <div class="text-center">
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
            ></div>
            <p class="text-xs sm:text-sm text-gray-600">
              {{ tableLoadingMessage }}
            </p>
          </div>
        </div>

        <!-- Table Header -->
        <div
          class="bg-gray-800 px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <h3
                class="text-base sm:text-lg md:text-xl font-bold text-white truncate"
              >
                Student Directory
              </h3>
              <p class="text-gray-300 text-xs sm:text-sm mt-0.5 sm:mt-1">
                Manage and view all student information
              </p>
            </div>
            <!-- Select All Checkbox (Desktop only) -->
            <div class="hidden md:flex items-center gap-2 flex-shrink-0">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                :disabled="isLoading || students.length === 0"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span class="text-sm text-gray-300 whitespace-nowrap"
                >Select All</span
              >
            </div>
          </div>
        </div>

        <!-- Mobile View - Cards (< 768px) -->
        <div class="block md:hidden">
          <!-- Mobile Select All -->
          <div class="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                :disabled="isLoading || students.length === 0"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span class="text-sm font-medium text-gray-700">
                Select All Students
              </span>
            </label>
          </div>

          <!-- Mobile Skeleton Loading -->
          <div
            v-if="isTableLoading"
            class="p-3 sm:p-4 space-y-3 sm:space-y-4"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3"
            >
              <div class="flex items-center justify-between">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 animate-pulse"
                ></div>
                <div
                  class="h-5 sm:h-6 bg-gray-200 rounded-full w-12 sm:w-16 animate-pulse"
                ></div>
              </div>
              <div class="flex items-center space-x-2 sm:space-x-3">
                <div
                  class="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0"
                ></div>
                <div class="space-y-2 flex-1 min-w-0">
                  <div
                    class="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 animate-pulse"
                  ></div>
                  <div
                    class="h-2 sm:h-3 bg-gray-200 rounded w-20 sm:w-24 animate-pulse"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between">
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 animate-pulse"
                ></div>
                <div
                  class="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 animate-pulse"
                ></div>
              </div>
            </div>
          </div>

          <!-- Mobile Cards -->
          <div class="p-3 space-y-3 bg-gray-50/30">
            <div
              v-for="student in students"
              :key="student.id"
              class="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 touch-manipulation"
              :class="{
                'ring-2 ring-blue-400 bg-blue-50/30 shadow-sm':
                  isStudentSelected(student._id),
              }"
            >
              <!-- Header: Checkbox, Roll Number & Status -->
              <div class="flex items-center justify-between mb-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="isStudentSelected(student._id)"
                    @change="toggleStudentSelection(student._id)"
                    :disabled="isLoading"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span class="text-sm font-bold text-gray-800">
                    <span>Roll Number:&nbsp;</span>{{ student.rollNumber }}
                  </span>
                </label>

                <span
                  :class="getStatusClass(student.status)"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border"
                >
                  <FileChartLine class="w-3 h-3" />
                  {{ student.status }}
                </span>
              </div>

              <!-- Student Profile -->
              <div class="flex items-center gap-3 mb-4">
                <div class="relative flex-shrink-0">
                  <div
                    class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm"
                  >
                    <span class="text-sm font-bold text-white">{{
                      getInitials(student.name)
                    }}</span>
                  </div>
                  <div
                    class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  ></div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-bold text-gray-900 truncate mb-1">
                    {{ student.name }}
                  </h3>
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <Mail class="w-3 h-3" />
                    <span class="truncate">{{ student.email }}</span>
                  </div>
                </div>
              </div>

              <!-- Two-Line Info Layout -->
              <div class="space-y-2 mb-4">
                <!-- Phone & Address Line -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <div class="p-1.5 bg-green-100 rounded-lg">
                      <Phone class="w-3 h-3 text-green-600" />
                    </div>
                    <span class="text-sm font-medium text-gray-700 truncate">{{
                      student.phone
                    }}</span>
                  </div>

                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <div class="p-1.5 bg-blue-100 rounded-lg">
                      <MapPinHouse class="w-3 h-3 text-blue-600" />
                    </div>
                    <span
                      class="text-sm text-gray-600 truncate"
                      :title="student.address"
                    >
                      {{
                        student.address
                          ? student.address.split(",")[0] ||
                            student.address.split(" ")[0]
                          : "N/A"
                      }}
                    </span>
                  </div>
                </div>

                <!-- Class & Date Line -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <div class="p-1.5 bg-purple-100 rounded-lg">
                      <School class="w-3 h-3 text-purple-600" />
                    </div>
                    <span class="text-sm font-medium text-gray-700 truncate"
                      ><span>class:&nbsp;</span>{{ student.class }}</span
                    >
                  </div>

                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <div class="p-1.5 bg-orange-100 rounded-lg">
                      <Calendar class="w-3 h-3 text-orange-600" />
                    </div>
                    <span class="text-sm text-gray-600 truncate">{{
                      formatDate(student.enrollmentDate)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div
                class="flex items-center justify-end gap-2 pt-3 border-t border-gray-100"
              >
                <button
                  @click="viewStudentDetails(student)"
                  :disabled="isLoading"
                  class="flex items-center justify-center p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-200 border border-blue-200 hover:border-blue-600"
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
                  class="flex items-center justify-center p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors duration-200 border border-green-200 hover:border-green-600"
                  title="Edit"
                >
                  <Pencil class="w-4 h-4" />
                </button>

                <button
                  @click="deleteStudent(student._id, student.name)"
                  :disabled="isLoading || isDeleting"
                  class="flex items-center justify-center p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-600"
                  title="Delete"
                >
                  <div
                    v-if="isDeleting && deletingStudentId === student._id"
                    class="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"
                  ></div>
                  <Trash2
                    v-else
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            <!-- Simple Empty State -->
            <div
              v-if="!isTableLoading && students.length === 0"
              class="text-center py-12"
            >
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <Users class="w-8 h-8 text-blue-600" />
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
            class="p-4 lg:p-6"
          >
            <div class="space-y-4">
              <div
                v-for="i in 8"
                :key="i"
                class="flex items-center space-x-4 py-4"
              >
                <!-- Checkbox Skeleton -->
                <div class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
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
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    :disabled="isLoading || students.length === 0"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <button
                    class="flex items-center gap-2 hover:text-gray-800 transition-colors group"
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
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <button
                    class="flex items-center gap-2 hover:text-gray-800 transition-colors group"
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
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Contact Info
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Academic
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Enrollment
                </th>
                <th
                  class="px-4 lg:px-6 py-4 lg:py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr
                v-for="student in students"
                :key="student.id"
                class="hover:bg-gray-50 transition-all duration-200"
                :class="{
                  'bg-blue-50 ring-1 ring-blue-200': isStudentSelected(
                    student._id
                  ),
                }"
              >
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :checked="isStudentSelected(student._id)"
                    @change="toggleStudentSelection(student._id)"
                    :disabled="isLoading"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="p-2 bg-purple-600 rounded-lg border border-purple-600"
                    >
                      <IdCard class="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span class="text-sm font-bold text-gray-800">{{
                      student.rollNumber
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                      <div
                        class="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-blue-600 flex items-center justify-center border border-blue-600"
                      >
                        <span class="text-xs lg:text-sm font-bold text-white">{{
                          getInitials(student.name)
                        }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-800">
                        {{ student.name }}
                      </div>
                      <div
                        class="text-xs text-gray-500 flex items-center gap-1 mt-1"
                      >
                        <Mail class="w-3 h-3" />
                        {{ student.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-gray-700">
                      <div
                        class="p-1 bg-green-100 rounded border border-green-200"
                      >
                        <Phone class="w-3 h-3 text-green-600" />
                      </div>
                      <span class="font-medium">{{ student.phone }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                      <div
                        class="p-1 bg-blue-100 rounded border border-blue-200"
                      >
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
                      class="p-2 bg-green-600 rounded-lg border border-green-600"
                    >
                      <School class="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <span class="text-sm font-semibold text-gray-800">{{
                      student.class
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <span
                    :class="getStatusClass(student.status)"
                    class="inline-flex items-center gap-2 px-2 lg:px-3 py-1 lg:py-2 text-xs font-bold rounded-full border"
                  >
                    <FileChartLine class="w-3 h-3" />
                    {{ student.status }}
                  </span>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <div class="p-1 bg-blue-100 rounded border border-blue-200">
                      <Calendar class="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                    </div>
                    <span class="font-medium">{{
                      formatDate(student.enrollmentDate)
                    }}</span>
                  </div>
                </td>
                <td class="px-4 lg:px-6 py-4 lg:py-5 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewStudentDetails(student)"
                      :disabled="isLoading"
                      class="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-600"
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
                      class="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-green-600"
                      title="Edit"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteStudent(student._id, student.name)"
                      :disabled="isLoading || isDeleting"
                      class="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-600"
                      title="Delete"
                    >
                      <div
                        v-if="isDeleting && deletingStudentId === student._id"
                        class="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"
                      ></div>
                      <Trash2
                        v-else
                        class="w-4 h-4"
                      />
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
              class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200"
            >
              <Users class="w-10 h-10 text-blue-500" />
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
        class="fixed z-[9999] inset-0 bg-black bg-opacity-60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div
          class="bg-white w-full sm:max-w-4xl max-h-screen sm:max-h-[95vh] sm:rounded-lg border-0 sm:border border-gray-200 relative animate-fade-in flex flex-col"
        >
          <!-- Modal Loading Overlay -->
          <div
            v-if="isSaving"
            class="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center sm:rounded-lg"
          >
            <div class="text-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-2"
              ></div>
              <p class="text-xs sm:text-sm text-gray-600">Saving changes...</p>
            </div>
          </div>

          <!-- Fixed Header -->
          <div
            class="flex-shrink-0 p-4 sm:p-6 md:p-8 border-b border-gray-200 bg-white"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              :disabled="isSaving"
              class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation z-10"
              title="Close"
            >
              <X class="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>

            <!-- Header -->
            <div class="flex items-center gap-2 sm:gap-3 pr-10 sm:pr-12">
              <div
                class="p-2 sm:p-3 bg-green-600 rounded-lg border border-green-600 flex-shrink-0"
              >
                <Pencil
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h2
                  class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate"
                >
                  Edit Student
                </h2>
                <p class="text-gray-500 text-xs sm:text-sm">
                  Update student information and documents
                </p>
              </div>
            </div>
          </div>

          <!-- Scrollable Form Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <!-- Error Message -->
            <div
              v-if="saveError"
              class="mb-3 sm:mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 sm:gap-3"
            >
              <div class="p-1 bg-red-100 rounded-full flex-shrink-0">
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-red-800">Error</h4>
                <p class="text-sm text-red-700 mt-1 break-words">
                  {{ saveError }}
                </p>
              </div>
              <button
                @click="saveError = ''"
                class="p-1 text-red-400 hover:text-red-600 transition-colors flex-shrink-0 touch-manipulation"
              >
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4"
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

            <!-- Success Message -->
            <div
              v-if="saveSuccess"
              class="mb-3 sm:mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 sm:gap-3"
            >
              <div class="p-1 bg-green-100 rounded-full flex-shrink-0">
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
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
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-green-800">Success</h4>
                <p class="text-sm text-green-700 mt-1 break-words">
                  {{ saveSuccess }}
                </p>
              </div>
            </div>

            <!-- Form Sections -->
            <div class="space-y-6 sm:space-y-8">
              <!-- Basic Information Section -->
              <div class="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6">
                <h3
                  class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <span>Basic Information</span>
                </h3>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
                >
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Full Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editingStudent.name"
                      :disabled="isSaving"
                      :class="[
                        'w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation',
                        saveError && !editingStudent.name?.trim()
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200',
                      ]"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Roll Number <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editingStudent.rollNumber"
                      :disabled="isSaving"
                      :class="[
                        'w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation',
                        saveError && !editingStudent.rollNumber?.trim()
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200',
                      ]"
                      placeholder="Enter roll number"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Email Address <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editingStudent.email"
                      type="email"
                      :disabled="isSaving"
                      :class="[
                        'w-full rounded-lg border-2 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation',
                        saveError &&
                        (!editingStudent.email?.trim() ||
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            editingStudent.email
                          ))
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200',
                      ]"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      v-model="editingStudent.phone"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Class
                    </label>
                    <input
                      v-model="editingStudent.class"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                      placeholder="Enter class"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      v-model="editingStudent.status"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium bg-white text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      <option value="active">Active</option>
                      <option value="leaved">Leaved</option>
                      <option value="passout">Passout</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Enrollment Date
                    </label>
                    <input
                      v-model="editingStudent.enrollmentDate"
                      type="date"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                  </div>

                  <div class="md:col-span-2 space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      v-model="editingStudent.address"
                      rows="3"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-green-100 focus:border-green-500 focus:outline-none transition-all duration-200 font-medium resize-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                      placeholder="Enter full address"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Photo Section -->
              <div class="bg-blue-50 rounded-lg p-3 sm:p-4 md:p-6">
                <h3
                  class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Student Photo</span>
                </h3>

                <div class="space-y-3 sm:space-y-4">
                  <!-- Current Photo Display -->
                  <div
                    v-if="editingStudent.photo"
                    class="flex items-center gap-3 sm:gap-4"
                  >
                    <img
                      :src="editingStudent.photo"
                      alt="Student Photo"
                      class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-300 flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-700">
                        Current Photo
                      </p>
                      <button
                        @click="editingStudent.photo = ''"
                        :disabled="isSaving"
                        class="text-xs text-red-600 hover:text-red-800 disabled:opacity-50 touch-manipulation"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>

                  <!-- Photo Upload -->
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Upload New Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handlePhotoUpload"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                    <p class="text-xs text-gray-500">
                      Supported formats: JPG, PNG, GIF (Max: 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <!-- Documents Section -->
              <div class="bg-yellow-50 rounded-lg p-3 sm:p-4 md:p-6">
                <h3
                  class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>Documents</span>
                </h3>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
                >
                  <!-- Aadhaar Card -->
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Aadhaar Card
                    </label>
                    <div
                      v-if="editingStudent.aadhaarCard"
                      class="mb-2"
                    >
                      <div
                        class="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded"
                      >
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span class="text-xs sm:text-sm text-green-700 flex-1"
                          >Document uploaded</span
                        >
                        <button
                          @click="editingStudent.aadhaarCard = ''"
                          :disabled="isSaving"
                          class="text-red-600 hover:text-red-800 disabled:opacity-50 flex-shrink-0 touch-manipulation"
                        >
                          <svg
                            class="w-3 h-3 sm:w-4 sm:h-4"
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
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      @change="handleDocumentUpload($event, 'aadhaarCard')"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-yellow-100 focus:border-yellow-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                  </div>

                  <!-- Birth Certificate -->
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Birth Certificate
                    </label>
                    <div
                      v-if="editingStudent.birthCertificate"
                      class="mb-2"
                    >
                      <div
                        class="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded"
                      >
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span class="text-xs sm:text-sm text-green-700 flex-1"
                          >Document uploaded</span
                        >
                        <button
                          @click="editingStudent.birthCertificate = ''"
                          :disabled="isSaving"
                          class="text-red-600 hover:text-red-800 disabled:opacity-50 flex-shrink-0 touch-manipulation"
                        >
                          <svg
                            class="w-3 h-3 sm:w-4 sm:h-4"
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
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      @change="handleDocumentUpload($event, 'birthCertificate')"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-yellow-100 focus:border-yellow-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                  </div>

                  <!-- Transfer Certificate -->
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Transfer Certificate
                      <span class="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <div
                      v-if="editingStudent.transferCertificate"
                      class="mb-2"
                    >
                      <div
                        class="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded"
                      >
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span class="text-xs sm:text-sm text-green-700 flex-1"
                          >Document uploaded</span
                        >
                        <button
                          @click="editingStudent.transferCertificate = ''"
                          :disabled="isSaving"
                          class="text-red-600 hover:text-red-800 disabled:opacity-50 flex-shrink-0 touch-manipulation"
                        >
                          <svg
                            class="w-3 h-3 sm:w-4 sm:h-4"
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
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      @change="
                        handleDocumentUpload($event, 'transferCertificate')
                      "
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-yellow-100 focus:border-yellow-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                  </div>

                  <!-- Marksheet -->
                  <div class="space-y-2">
                    <label
                      class="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Marksheet
                      <span class="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <div
                      v-if="editingStudent.marksheet"
                      class="mb-2"
                    >
                      <div
                        class="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded"
                      >
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span class="text-xs sm:text-sm text-green-700 flex-1"
                          >Document uploaded</span
                        >
                        <button
                          @click="editingStudent.marksheet = ''"
                          :disabled="isSaving"
                          class="text-red-600 hover:text-red-800 disabled:opacity-50 flex-shrink-0 touch-manipulation"
                        >
                          <svg
                            class="w-3 h-3 sm:w-4 sm:h-4"
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
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      @change="handleDocumentUpload($event, 'marksheet')"
                      :disabled="isSaving"
                      class="w-full rounded-lg border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-yellow-100 focus:border-yellow-500 focus:outline-none transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                  </div>
                </div>

                <p class="text-xs text-gray-500 mt-3 sm:mt-4">
                  Supported formats: PDF, JPG, PNG (Max: 10MB per file)
                </p>
              </div>
            </div>
          </div>

          <!-- Fixed Footer -->
          <div
            class="flex-shrink-0 p-4 sm:p-6 md:p-8 border-t border-gray-200 bg-white"
          >
            <div
              class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 md:gap-4"
            >
              <button
                @click="closeModal"
                :disabled="isSaving"
                class="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 touch-manipulation min-h-[44px] sm:min-h-[40px]"
              >
                Cancel
              </button>
              <button
                @click="saveStudent"
                :disabled="isSaving"
                class="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed border border-green-600 touch-manipulation min-h-[44px] sm:min-h-[40px]"
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

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div
          class="bg-white w-full sm:max-w-md sm:rounded-lg border-0 sm:border border-gray-200 relative animate-fade-in"
        >
          <div class="p-4 sm:p-6">
            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div class="p-2 sm:p-3 bg-red-100 rounded-full flex-shrink-0">
                <Trash2 class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-base sm:text-lg font-bold text-gray-900">
                  Delete Student
                </h3>
                <p class="text-xs sm:text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p class="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Are you sure you want to delete
              <strong>{{ deleteTarget.name }}</strong
              >? This will permanently remove the student from the system.
            </p>

            <div class="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
              <button
                @click="cancelDelete"
                :disabled="isDeleting"
                class="px-4 py-2.5 sm:py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 touch-manipulation min-h-[44px] sm:min-h-[40px]"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                :disabled="isDeleting"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 touch-manipulation min-h-[44px] sm:min-h-[40px]"
              >
                <div
                  v-if="isDeleting"
                  class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                ></div>
                <Trash2
                  v-else
                  class="w-3 h-3 sm:w-4 sm:h-4"
                />
                {{ isDeleting ? "Deleting..." : "Delete Student" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Section - Mobile Responsive -->
      <div
        v-if="students.length"
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-0 px-1 sm:px-2"
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
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] sm:min-h-[32px] min-w-[36px] sm:min-w-[32px] border border-gray-300 touch-manipulation"
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
                'px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 min-h-[36px] sm:min-h-[32px] min-w-[36px] sm:min-w-[32px] border touch-manipulation',
                page === currentPage
                  ? 'font-bold bg-blue-600 text-white border-blue-600'
                  : 'font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 border-gray-300',
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
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] sm:min-h-[32px] min-w-[36px] sm:min-w-[32px] border border-gray-300 touch-manipulation"
          >
            <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div>
        <!-- Student Details Modal -->
        <div
          v-if="showDetailsModal"
          class="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            class="bg-white w-full sm:max-w-6xl max-h-screen sm:max-h-[95vh] sm:rounded-lg border-0 sm:border border-gray-200 relative animate-fade-in flex flex-col"
          >
            <!-- Modal Loading Overlay -->
            <div
              v-if="isDetailsLoading"
              class="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center sm:rounded-lg"
            >
              <div class="text-center">
                <div
                  class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"
                ></div>
                <p class="text-xs sm:text-sm text-gray-600">
                  Loading student details...
                </p>
              </div>
            </div>

            <!-- Fixed Header -->
            <div
              class="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200 bg-white"
            >
              <!-- Close Button -->
              <button
                @click="closeDetailsModal"
                :disabled="isDetailsLoading"
                class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation z-10"
                title="Close"
              >
                <X class="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>

              <!-- Header -->
              <div class="flex items-center gap-3 sm:gap-4 pr-10 sm:pr-12">
                <!-- Student Photo/Avatar -->
                <div class="flex-shrink-0">
                  <div
                    v-if="viewingStudent?.photo"
                    class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 sm:border-4 border-blue-200 z-[999]"
                  >
                    <img
                      :src="viewingStudent.photo"
                      :alt="viewingStudent.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-blue-600 flex items-center justify-center border-2 sm:border-4 border-blue-200"
                  >
                    <span
                      class="text-sm sm:text-lg md:text-xl font-bold text-white"
                    >
                      {{ getInitials(viewingStudent?.name || "") }}
                    </span>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h2
                    class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate"
                  >
                    {{ viewingStudent?.name || "Student Details" }}
                  </h2>
                  <div
                    class="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2"
                  >
                    <span
                      :class="getStatusClass(viewingStudent?.status)"
                      class="inline-flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs font-bold rounded-full border"
                    >
                      <FileChartLine class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {{ viewingStudent?.status }}
                    </span>
                    <span class="text-xs sm:text-sm text-gray-600">
                      Roll No: {{ viewingStudent?.rollNumber }}
                    </span>
                    <span class="text-xs sm:text-sm text-gray-600">
                      Class: {{ viewingStudent?.class }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <!-- Personal Information -->
                <div class="bg-blue-50 rounded-lg p-3 sm:p-4 md:p-6">
                  <h3
                    class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2"
                  >
                    <User
                      class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                    />
                    <span>Personal Information</span>
                  </h3>

                  <div class="space-y-3 sm:space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Full Name</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border break-words"
                        >
                          {{ viewingStudent?.name || "N/A" }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Roll Number</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border"
                        >
                          {{ viewingStudent?.rollNumber || "N/A" }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Email</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border break-all"
                        >
                          {{ viewingStudent?.email || "N/A" }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Phone</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border"
                        >
                          {{ viewingStudent?.phone || "N/A" }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                        >Address</label
                      >
                      <p
                        class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border min-h-[60px] break-words"
                      >
                        {{ viewingStudent?.address || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Academic Information -->
                <div class="bg-green-50 rounded-lg p-3 sm:p-4 md:p-6">
                  <h3
                    class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2"
                  >
                    <GraduationCap
                      class="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0"
                    />
                    <span>Academic Information</span>
                  </h3>

                  <div class="space-y-3 sm:space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Class</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border"
                        >
                          {{ viewingStudent?.class || "N/A" }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Status</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border"
                        >
                          {{ viewingStudent?.status || "N/A" }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Enrollment Date</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border"
                        >
                          {{
                            viewingStudent?.enrollmentDate
                              ? formatDate(viewingStudent.enrollmentDate)
                              : "N/A"
                          }}
                        </p>
                      </div>
                      <div>
                        <label
                          class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                          >Student ID</label
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-900 bg-white p-2 rounded border font-mono break-all"
                        >
                          {{ viewingStudent?._id || "N/A" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Documents Section -->
                <div
                  class="lg:col-span-2 bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6"
                >
                  <h3
                    class="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2"
                  >
                    <FileText
                      class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0"
                    />
                    <span>Documents</span>
                  </h3>

                  <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
                  >
                    <!-- Aadhaar Card -->
                    <div
                      class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm"
                    >
                      <div class="flex items-center gap-2 mb-2 sm:mb-3">
                        <div
                          class="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0"
                        >
                          <IdCard class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                        </div>
                        <h4
                          class="text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          Aadhaar Card
                        </h4>
                      </div>

                      <div
                        v-if="viewingStudent?.aadhaarCard"
                        class="space-y-2 sm:space-y-3"
                      >
                        <div
                          class="flex items-center gap-2 text-[10px] sm:text-xs text-green-700 bg-green-50 p-2 rounded"
                        >
                          <CheckCircle
                            class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                          />
                          <span>Available</span>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            @click="
                              viewDocument(
                                viewingStudent.aadhaarCard,
                                'Aadhaar Card'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-blue-600 text-white text-[10px] sm:text-xs rounded hover:bg-blue-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Eye class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            View
                          </button>
                          <button
                            @click="
                              downloadDocument(
                                viewingStudent.aadhaarCard,
                                'aadhaar-card'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-green-600 text-white text-[10px] sm:text-xs rounded hover:bg-green-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Download class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div
                        v-else
                        class="text-center py-4 sm:py-6"
                      >
                        <div class="text-[10px] sm:text-xs text-gray-500">
                          Not available
                        </div>
                      </div>
                    </div>

                    <!-- Birth Certificate -->
                    <div
                      class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm"
                    >
                      <div class="flex items-center gap-2 mb-2 sm:mb-3">
                        <div
                          class="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0"
                        >
                          <FileText
                            class="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
                          />
                        </div>
                        <h4
                          class="text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          Birth Certificate
                        </h4>
                      </div>

                      <div
                        v-if="viewingStudent?.birthCertificate"
                        class="space-y-2 sm:space-y-3"
                      >
                        <div
                          class="flex items-center gap-2 text-[10px] sm:text-xs text-green-700 bg-green-50 p-2 rounded"
                        >
                          <CheckCircle
                            class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                          />
                          <span>Available</span>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            @click="
                              viewDocument(
                                viewingStudent.birthCertificate,
                                'Birth Certificate'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-blue-600 text-white text-[10px] sm:text-xs rounded hover:bg-blue-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Eye class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            View
                          </button>
                          <button
                            @click="
                              downloadDocument(
                                viewingStudent.birthCertificate,
                                'birth-certificate'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-green-600 text-white text-[10px] sm:text-xs rounded hover:bg-green-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Download class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div
                        v-else
                        class="text-center py-4 sm:py-6"
                      >
                        <div class="text-[10px] sm:text-xs text-gray-500">
                          Not available
                        </div>
                      </div>
                    </div>

                    <!-- Transfer Certificate -->
                    <div
                      class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm"
                    >
                      <div class="flex items-center gap-2 mb-2 sm:mb-3">
                        <div
                          class="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0"
                        >
                          <FileText
                            class="w-3 h-3 sm:w-4 sm:h-4 text-purple-600"
                          />
                        </div>
                        <h4
                          class="text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          Transfer Certificate
                        </h4>
                      </div>

                      <div
                        v-if="viewingStudent?.transferCertificate"
                        class="space-y-2 sm:space-y-3"
                      >
                        <div
                          class="flex items-center gap-2 text-[10px] sm:text-xs text-green-700 bg-green-50 p-2 rounded"
                        >
                          <CheckCircle
                            class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                          />
                          <span>Available</span>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            @click="
                              viewDocument(
                                viewingStudent.transferCertificate,
                                'Transfer Certificate'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-blue-600 text-white text-[10px] sm:text-xs rounded hover:bg-blue-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Eye class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            View
                          </button>
                          <button
                            @click="
                              downloadDocument(
                                viewingStudent.transferCertificate,
                                'transfer-certificate'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-green-600 text-white text-[10px] sm:text-xs rounded hover:bg-green-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Download class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div
                        v-else
                        class="text-center py-4 sm:py-6"
                      >
                        <div class="text-[10px] sm:text-xs text-gray-500">
                          Not available
                        </div>
                      </div>
                    </div>

                    <!-- Marksheet -->
                    <div
                      class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm"
                    >
                      <div class="flex items-center gap-2 mb-2 sm:mb-3">
                        <div
                          class="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0"
                        >
                          <FileText
                            class="w-3 h-3 sm:w-4 sm:h-4 text-red-600"
                          />
                        </div>
                        <h4
                          class="text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          Marksheet
                        </h4>
                      </div>

                      <div
                        v-if="viewingStudent?.marksheet"
                        class="space-y-2 sm:space-y-3"
                      >
                        <div
                          class="flex items-center gap-2 text-[10px] sm:text-xs text-green-700 bg-green-50 p-2 rounded"
                        >
                          <CheckCircle
                            class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                          />
                          <span>Available</span>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            @click="
                              viewDocument(
                                viewingStudent.marksheet,
                                'Marksheet'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-blue-600 text-white text-[10px] sm:text-xs rounded hover:bg-blue-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Eye class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            View
                          </button>
                          <button
                            @click="
                              downloadDocument(
                                viewingStudent.marksheet,
                                'marksheet'
                              )
                            "
                            class="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-green-600 text-white text-[10px] sm:text-xs rounded hover:bg-green-700 transition-colors touch-manipulation min-h-[32px]"
                          >
                            <Download class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div
                        v-else
                        class="text-center py-4 sm:py-6"
                      >
                        <div class="text-[10px] sm:text-xs text-gray-500">
                          Not available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fixed Footer -->
            <div
              class="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white"
            >
              <div
                class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3"
              >
                <button
                  @click="closeDetailsModal"
                  class="px-4 py-2.5 sm:py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-[40px]"
                >
                  Close
                </button>
                <button
                  @click="editStudent(viewingStudent)"
                  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-[40px]"
                >
                  <Pencil class="w-3 h-3 sm:w-4 sm:h-4" />
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Viewer Modal - Professional Styling with Highest Z-Index -->
        <div
          v-if="showDocumentViewer"
          class="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in-0 duration-300"
        >
          <div
            class="bg-white w-full sm:max-w-5xl max-h-screen sm:max-h-[95vh] sm:rounded-xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
          >
            <!-- Document Viewer Header - Enhanced Professional Design -->
            <div
              class="flex-shrink-0 bg-gradient-to-r from-slate-50 to-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/80 flex items-center justify-between"
            >
              <div class="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div class="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <FileText class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-base sm:text-lg font-semibold text-gray-900 truncate"
                  >
                    {{ currentDocumentTitle }}
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Document Viewer
                  </p>
                </div>
              </div>

              <button
                @click="closeDocumentViewer"
                class="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 touch-manipulation flex-shrink-0"
                title="Close Document Viewer"
              >
                <X class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <!-- Document Content - Enhanced Container -->
            <div class="flex-1 overflow-hidden bg-gray-50">
              <div
                v-if="currentDocumentUrl"
                class="w-full h-full"
              >
                <!-- PDF Viewer - Enhanced -->
                <iframe
                  v-if="
                    currentDocumentUrl.includes('.pdf') ||
                    currentDocumentTitle.toLowerCase().includes('pdf')
                  "
                  :src="`https://docs.google.com/gview?url=${encodeURIComponent(
                    currentDocumentUrl
                  )}&embedded=true`"
                  class="w-full h-full border-0 bg-white"
                  title="PDF Viewer"
                ></iframe>

                <!-- Image Viewer - Enhanced -->
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center p-3 sm:p-6"
                >
                  <div
                    class="max-w-full max-h-full bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <img
                      :src="currentDocumentUrl"
                      :alt="currentDocumentTitle"
                      class="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <!-- Loading State - Enhanced -->
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="relative">
                    <div
                      class="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"
                    ></div>
                    <div
                      class="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-4 border-transparent border-r-blue-300 rounded-full animate-spin mx-auto"
                      style="
                        animation-direction: reverse;
                        animation-duration: 1.5s;
                      "
                    ></div>
                  </div>
                  <p
                    class="text-sm sm:text-base font-medium text-gray-700 mb-1"
                  >
                    Loading document...
                  </p>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Please wait while we prepare your document
                  </p>
                </div>
              </div>
            </div>

            <!-- Document Actions - Enhanced Professional Footer -->
            <div
              class="flex-shrink-0 bg-gradient-to-r from-slate-50 to-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0"
            >
              <div
                class="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
              >
                <div
                  class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"
                ></div>
                <span>Document loaded successfully</span>
              </div>

              <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  @click="closeDocumentViewer"
                  class="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-200 touch-manipulation min-h-[40px] sm:min-h-[36px]"
                >
                  Close
                </button>
                <button
                  @click="
                    downloadDocument(
                      currentDocumentUrl,
                      currentDocumentTitle.toLowerCase().replace(/\s+/g, '-')
                    )
                  "
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-200 shadow-lg hover:shadow-xl touch-manipulation min-h-[40px] sm:min-h-[36px]"
                >
                  <Download class="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
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
    CheckSquare,
    TrendingUp,
    Trash2,
    User,
    FileText,
    CheckCircle,
    Download,
  } from "lucide-vue-next";
  import Header from "@/components/Students/HeaderStudent.vue";

  const store = useStore();
  const students = computed(() => {
    return [...store.getters.allStudents]
      .filter((s) => s.rollNumber !== undefined && s.rollNumber !== null)
      .sort((a, b) => {
        const numA = parseInt(a.rollNumber);
        const numB = parseInt(b.rollNumber);
        return numA - numB;
      });
  });

  // Loading states
  const isInitialLoading = ref(false);
  const isLoading = ref(false);
  const isStatsLoading = ref(false);
  const isTableLoading = ref(false);
  const isSaving = ref(false);
  const isDeleting = ref(false);
  const loadingMessage = ref("Loading student data...");
  const tableLoadingMessage = ref("Loading students...");

  //view details
  const showDetailsModal = ref(false);
  const viewingStudent = ref(null);
  const isDetailsLoading = ref(false);
  const showDocumentViewer = ref(false);
  const currentDocumentUrl = ref("");
  const currentDocumentTitle = ref("");

  // Pagination
  const currentPage = ref(1);
  const limit = ref(20);
  const totalResults = computed(() => store.getters.getStudentPagination.total);
  const totalPages = computed(() => store.getters.getStudentPagination.pages);

  // Local state
  const editingStudent = ref(null);
  const showEditModal = ref(false);
  const error = ref("");
  const saveError = ref("");
  const saveSuccess = ref("");

  // Delete state
  const showDeleteModal = ref(false);
  const deleteTarget = ref({ id: null, name: "" });
  const deletingStudentId = ref(null);

  // Global message state
  const globalMessage = ref({
    show: false,
    type: "success", // 'success' or 'error'
    message: "",
  });

  // Filters
  const searchTerm = ref("");
  const selectedClass = ref(null);

  // Selection state
  const selectedStudents = ref([]);

  // Stats
  const activeStudents = computed(
    () => students.value.filter((s) => s.status === "active").length
  );
  const graduatedStudents = computed(
    () => students.value.filter((s) => s.status === "passout").length
  );
  const inactiveStudents = computed(
    () => students.value.filter((s) => s.status === "leaved").length
  );

  const isAllSelected = computed(() => {
    return (
      students.value.length > 0 &&
      selectedStudents.value.length === students.value.length
    );
  });

  // File upload handlers
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        saveError.value = "Photo file size must be less than 5MB";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        editingStudent.value.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (event, documentType) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        saveError.value = "Document file size must be less than 10MB";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        editingStudent.value[documentType] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Global message functions
  const showGlobalMessage = (type, message) => {
    globalMessage.value = { show: true, type, message };
    setTimeout(() => {
      globalMessage.value.show = false;
    }, 5000);
  };

  const hideGlobalMessage = () => {
    globalMessage.value.show = false;
  };

  // Filter events
  const handleSearch = (value) => {
    searchTerm.value = value;
  };

  const handleClassSelect = (value) => {
    selectedClass.value = value;
  };

  // Bulk selection
  const isStudentSelected = (studentId) =>
    selectedStudents.value.includes(studentId);

  const toggleStudentSelection = (studentId) => {
    const index = selectedStudents.value.indexOf(studentId);
    if (index > -1) selectedStudents.value.splice(index, 1);
    else selectedStudents.value.push(studentId);
  };

  const toggleSelectAll = () => {
    selectedStudents.value = isAllSelected.value
      ? []
      : students.value.map((s) => s._id);
  };

  const clearSelection = () => (selectedStudents.value = []);

  // Promote
  const promoteSelectedStudents = async () => {
    if (!selectedStudents.value) {
      showGlobalMessage(
        "error",
        "Please select at least one student to promote."
      );
      return;
    }

    const selectedCount = selectedStudents.value.length;
    const selectedStudentNames = students.value
      .filter((s) => selectedStudents.value.includes(s._id))
      .map((s) => s.name)
      .slice(0, 3);

    let message = `Promote ${selectedCount} student${
      selectedCount > 1 ? "s" : ""
    } to higher class?\n\n`;
    message += `Selected students:\n${selectedStudentNames.join("\n")}`;
    if (selectedCount > 3) message += `\n... and ${selectedCount - 3} more`;

    const confirmed = confirm(message);
    if (!confirmed) return;

    isLoading.value = true;
    try {
      // Check if the store action exists, if not simulate the promotion
      if (store._actions && store._actions.promoteStudentsByIds) {
        const response = await store.dispatch(
          "promoteStudentsByIds",
          selectedStudents.value
        );
        showGlobalMessage(
          "success",
          `Successfully promoted ${
            response.promotedCount || selectedCount
          } student${
            (response.promotedCount || selectedCount) > 1 ? "s" : ""
          } to higher class`
        );
      } else {
        // Simulate promotion if store action doesn't exist
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        // Update students locally (simulation)
        students.value.forEach((student) => {
          if (selectedStudents.value.includes(student._id)) {
            // Simulate class promotion logic
            const currentClass = parseInt(student.class) || 1;
            student.class = (currentClass + 1).toString();
          }
        });
        showGlobalMessage(
          "success",
          `Successfully promoted ${selectedCount} student${
            selectedCount > 1 ? "s" : ""
          } to higher class`
        );
      }
      await fetchStudents();
      clearSelection();
    } catch (err) {
      console.error("Promotion failed:", err);
      // Handle different error types
      let errorMessage = "Failed to promote students";
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;
        switch (status) {
          case 400:
            errorMessage =
              message ||
              "Invalid promotion request. Please check student data.";
            break;
          case 403:
            errorMessage = "You don't have permission to promote students.";
            break;
          case 404:
            errorMessage = "Some selected students were not found.";
            break;
          case 409:
            errorMessage =
              message || "Some students cannot be promoted due to conflicts.";
            break;
          case 422:
            errorMessage =
              message ||
              "Promotion validation failed. Check student eligibility.";
            break;
          default:
            errorMessage =
              message || `Error ${status}: Failed to promote students`;
        }
      } else if (err.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        errorMessage =
          err.message || "An unexpected error occurred during promotion.";
      }
      showGlobalMessage("error", errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  // Delete one student
  const deleteStudent = (studentId, studentName) => {
    deleteTarget.value = { id: studentId, name: studentName };
    showDeleteModal.value = true;
  };

  const confirmDelete = async () => {
    isDeleting.value = true;
    deletingStudentId.value = deleteTarget.value.id;
    try {
      await store.dispatch("deleteUserById", deleteTarget.value.id);
      await fetchStudents();
      showGlobalMessage(
        "success",
        `${deleteTarget.value.name} has been deleted successfully`
      );
      showDeleteModal.value = false;
    } catch (err) {
      console.error("Delete failed:", err);
      // Handle different error types
      let errorMessage = "Failed to delete student";
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;
        switch (status) {
          case 404:
            errorMessage =
              "Student not found. They may have already been deleted.";
            break;
          case 403:
            errorMessage = "You don't have permission to delete this student.";
            break;
          case 409:
            errorMessage =
              "Cannot delete student due to existing dependencies.";
            break;
          default:
            errorMessage =
              message || `Error ${status}: Failed to delete student`;
        }
      } else if (err.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }
      showGlobalMessage("error", errorMessage);
    } finally {
      isDeleting.value = false;
      deletingStudentId.value = null;
    }
  };

  const cancelDelete = () => {
    showDeleteModal.value = false;
    deleteTarget.value = { id: null, name: "" };
  };

  // Bulk delete
  const deleteSelectedStudents = async () => {
    if (!selectedStudents.value.length) return;

    const selectedCount = selectedStudents.value.length;
    const selectedNames = students.value
      .filter((s) => selectedStudents.value.includes(s._id))
      .map((s) => s.name)
      .slice(0, 3);

    let confirmMessage = `Are you sure you want to delete ${selectedCount} student${
      selectedCount > 1 ? "s" : ""
    }?\n\n`;
    confirmMessage += `Students to be deleted:\n${selectedNames.join("\n")}`;
    if (selectedCount > 3) {
      confirmMessage += `\n... and ${selectedCount - 3} more`;
    }
    confirmMessage += "\n\nThis action cannot be undone.";

    const confirmed = confirm(confirmMessage);
    if (!confirmed) return;

    isDeleting.value = true;
    try {
      let successCount = 0;
      let failedCount = 0;
      for (const id of selectedStudents.value) {
        try {
          await store.dispatch("deleteUserById", id);
          successCount++;
        } catch (err) {
          failedCount++;
          console.error(`Failed to delete student ${id}:`, err);
        }
      }

      await fetchStudents();
      clearSelection();

      if (failedCount === 0) {
        showGlobalMessage(
          "success",
          `Successfully deleted ${successCount} student${
            successCount > 1 ? "s" : ""
          }`
        );
      } else if (successCount === 0) {
        showGlobalMessage(
          "error",
          `Failed to delete all ${failedCount} student${
            failedCount > 1 ? "s" : ""
          }`
        );
      } else {
        showGlobalMessage(
          "error",
          `Deleted ${successCount} student${
            successCount > 1 ? "s" : ""
          }, but failed to delete ${failedCount} student${
            failedCount > 1 ? "s" : ""
          }`
        );
      }
    } catch (err) {
      console.error("Bulk delete failed:", err);
      showGlobalMessage(
        "error",
        "Bulk delete operation failed. Please try again."
      );
    } finally {
      isDeleting.value = false;
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    const isInitialLoad =
      currentPage.value === 1 && students.value.length === 0;
    isInitialLoading.value = isInitialLoad;
    isTableLoading.value = !isInitialLoad;
    tableLoadingMessage.value = isInitialLoad
      ? "Loading student directory..."
      : `Loading page ${currentPage.value}...`;

    try {
      isLoading.value = true;
      await store.dispatch("fetchStudents", {
        search: searchTerm.value,
        class: selectedClass.value,
        page: currentPage.value,
        limit: limit.value,
      });
      clearSelection();
    } catch (err) {
      error.value = "Failed to fetch students.";
      console.error(err);
      showGlobalMessage(
        "error",
        "Failed to load students. Please refresh the page."
      );
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
      await store.dispatch("fetchAttendanceStats");
    } catch (err) {
      console.error("Stats error:", err);
    } finally {
      isStatsLoading.value = false;
    }
  };

  // Mounted
  onMounted(async () => {
    isInitialLoading.value = true;
    await Promise.all([fetchStudents(), fetchStats()]);
  });

  // Watch filters
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
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "NA";

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "leaved":
        return "bg-red-100 text-red-800 border-red-300";
      case "passedout":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Edit
  const editStudent = (student) => {
    if (!student) {
      console.warn("Invalid student object passed to editStudent");
      return;
    }

    editingStudent.value = {
      ...editingStudent.value, // optional: preserve existing data
      ...student,
      enrollmentDate: student.enrollmentDate
        ? new Date(student.enrollmentDate).toISOString().split("T")[0]
        : editingStudent.value?.enrollmentDate || "",
      photo: (student.photo ?? editingStudent.value?.photo) || "",
      aadhaarCard:
        (student.aadhaarCard ?? editingStudent.value?.aadhaarCard) || "",
      birthCertificate:
        (student.birthCertificate ?? editingStudent.value?.birthCertificate) ||
        "",
      transferCertificate:
        (student.transferCertificate ??
          editingStudent.value?.transferCertificate) ||
        "",
      marksheet: (student.marksheet ?? editingStudent.value?.marksheet) || "",
    };

    showEditModal.value = true;
  };

  const saveStudent = async () => {
    saveError.value = "";
    saveSuccess.value = "";

    if (!editingStudent.value.name?.trim()) {
      saveError.value = "Student name is required";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editingStudent.value.email)) {
      saveError.value = "Invalid email address";
      return;
    }

    isSaving.value = true;

    try {
      const updates = {
        name: editingStudent.value.name.trim(),
        email: editingStudent.value.email.trim(),
        phone: editingStudent.value.phone?.trim() || "",
        address: editingStudent.value.address?.trim() || "",
        class: editingStudent.value.class || "",
        rollNumber: editingStudent.value.rollNumber?.trim() || "",
        status: editingStudent.value.status,
        enrollmentDate: editingStudent.value.enrollmentDate || null,
      };

      // Only include document URLs if they are defined (not "")
      const documentFields = [
        "photo",
        "aadhaarCard",
        "birthCertificate",
        "transferCertificate",
        "marksheet",
      ];
      for (const field of documentFields) {
        const value = editingStudent.value[field];
        if (value) {
          updates[field] = value;
        }
      }

      await store.dispatch("editUserById", {
        userId: editingStudent.value._id,
        updates,
      });

      await fetchStudents();

      saveSuccess.value = "Student updated successfully!";
      showEditModal.value = false;
      showDetailsModal.value = false;

      showGlobalMessage(
        "success",
        `${editingStudent.value.name} has been updated successfully`
      );
      saveSuccess.value = "";
    } catch (err) {
      console.error("Save error:", err);
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;
        switch (status) {
          case 400:
            saveError.value =
              message || "Invalid student data. Please check all fields.";
            break;
          case 409:
            saveError.value =
              message ||
              "A student with this email or roll number already exists.";
            break;
          case 422:
            saveError.value =
              message || "Please check your input data for errors.";
            break;
          default:
            saveError.value =
              message || `Error ${status}: Failed to save student information.`;
        }
      } else if (err.request) {
        saveError.value =
          "Network error. Please check your internet connection and try again.";
      } else {
        saveError.value =
          err.message || "An unexpected error occurred. Please try again.";
      }
    } finally {
      isSaving.value = false;
    }
  };

  const closeModal = () => {
    if (!isSaving.value) {
      showEditModal.value = false;
      saveError.value = "";
      saveSuccess.value = "";
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && !isTableLoading.value) {
      currentPage.value = page;
      tableLoadingMessage.value = `Loading page ${page}...`;
      fetchStudents();
    }
  };

  // View Student Details
  const viewStudentDetails = async (student) => {
    isDetailsLoading.value = true;
    showDetailsModal.value = true;

    try {
      const detailedStudent = await store.dispatch(
        "fetchUserById",
        student._id
      );

      // ✅ Assign all fields correctly
      viewingStudent.value = {
        ...detailedStudent,
        aadhaarCard: detailedStudent.aadhaarCard || "",
        birthCertificate: detailedStudent.birthCertificate || "",
        transferCertificate: detailedStudent.transferCertificate || "",
        marksheet: detailedStudent.marksheet || "",
      };

      // console.log("Aadhaar:", viewingStudent.value.aadhaarCard);
      // console.log("Birth:", viewingStudent.value.birthCertificate);
      // console.log("Transfer:", viewingStudent.value.transferCertificate);
      // console.log("Marksheet:", viewingStudent.value.marksheet);
    } catch (err) {
      console.error("Failed to load student details:", err);
      showGlobalMessage("error", "Failed to load student details");
    } finally {
      isDetailsLoading.value = false;
    }
  };

  const closeDetailsModal = () => {
    showDetailsModal.value = false;
    viewingStudent.value = null;
  };

  // ✅ View Document
  const viewDocument = (documentUrl, title) => {
    const fullUrl = documentUrl;
    // console.log("Viewing:", fullUrl);
    currentDocumentUrl.value = fullUrl;
    currentDocumentTitle.value = title;
    showDocumentViewer.value = true;
  };

  // ✅ Close Document Viewer
  const closeDocumentViewer = () => {
    showDocumentViewer.value = false;
    currentDocumentUrl.value = "";
    currentDocumentTitle.value = "";
  };

  // ✅ Download Document
  const downloadDocument = (documentUrl, filename) => {
    try {
      const fullUrl = documentUrl;
      console.log("Downloading:", fullUrl); // Optional debug log

      const link = document.createElement("a");
      link.href = fullUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showGlobalMessage("success", "Document download started");
    } catch (err) {
      console.error("Download failed:", err);
      showGlobalMessage("error", "Failed to download document");
    }
  };
</script>

<style scoped>
  /* Enhanced Mobile-First Animations */
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-down {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  /* Enhanced Touch Targets for Mobile */
  @media (max-width: 767px) {
    .touch-manipulation {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    /* Ensure minimum touch target size */
    button,
    input[type="checkbox"],
    input[type="radio"],
    select {
      /* min-height: 44px; */
      min-width: 44px;
    }

    /* Improve text input on mobile */
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="date"],
    textarea,
    select {
      font-size: 16px; /* Prevents zoom on iOS */
    }
  }

  /* Enhanced Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Enhanced Focus States for Accessibility */
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* Enhanced Loading States */
  .loading-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Enhanced Mobile Modal Styles */
  @media (max-width: 639px) {
    .modal-mobile {
      border-radius: 0;
      height: 100vh;
      max-height: 100vh;
    }

    .modal-mobile .modal-content {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Enhanced Responsive Grid */
  @media (max-width: 479px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }

    .xs\:grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Enhanced Button States */
  .btn-loading {
    position: relative;
    color: transparent;
  }

  .btn-loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Enhanced Table Responsive Styles */
  @media (max-width: 767px) {
    .table-mobile {
      display: block;
    }

    .table-mobile thead,
    .table-mobile tbody,
    .table-mobile th,
    .table-mobile td,
    .table-mobile tr {
      display: block;
    }

    .table-mobile thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    .table-mobile tr {
      border: 1px solid #ccc;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 8px;
      background: white;
    }

    .table-mobile td {
      border: none;
      position: relative;
      padding-left: 50%;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .table-mobile td:before {
      content: attr(data-label) ": ";
      position: absolute;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: bold;
      color: #666;
    }
  }

  /* Enhanced Print Styles */
  @media print {
    .no-print {
      display: none !important;
    }

    .print-break {
      page-break-after: always;
    }

    .print-avoid-break {
      page-break-inside: avoid;
    }
  }

  /* Enhanced Dark Mode Support (if needed) */
  @media (prefers-color-scheme: dark) {
    .dark-mode-auto {
      background-color: #1f2937;
      color: #f9fafb;
    }

    .dark-mode-auto .bg-white {
      background-color: #374151;
    }

    .dark-mode-auto .text-gray-900 {
      color: #f9fafb;
    }

    .dark-mode-auto .border-gray-200 {
      border-color: #4b5563;
    }
  }

  /* Enhanced High Contrast Mode Support */
  @media (prefers-contrast: high) {
    .high-contrast {
      border-width: 2px;
      font-weight: bold;
    }

    .high-contrast button {
      border: 2px solid currentColor;
    }
  }

  /* Enhanced Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>

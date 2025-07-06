<template>
  <div class="relative">
    <!-- Mobile Toggle Button -->
    <button
      v-if="isMobile"
      @click="toggleMobileSidebar"
      class="fixed top-4 left-4 z-[1001] lg:hidden bg-white shadow-lg rounded-lg p-2 border border-gray-200 mt-[-8px]"
      :class="{ 'left-4': !showMobileSidebar, 'left-72': showMobileSidebar }"
    >
      <Menu
        v-if="!showMobileSidebar"
        class="w-6 h-6 text-gray-700"
      />
      <X
        v-else
        class="w-6 h-6 text-gray-700"
      />
    </button>

    <!-- Mobile Backdrop -->
    <div
      v-if="isMobile && showMobileSidebar"
      @click="closeMobileSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-[999] lg:hidden"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[
        'bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col',
        // Desktop styles
        'lg:relative lg:translate-x-0',
        isCollapsed && !isMobile ? 'lg:w-16' : 'lg:w-64',
        // Mobile styles
        'fixed inset-y-0 left-0 z-[1000] w-64',
        'lg:block',
        isMobile
          ? showMobileSidebar
            ? 'translate-x-0'
            : '-translate-x-full'
          : 'translate-x-0',
      ]"
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div
            v-if="!isCollapsed || isMobile"
            class="flex items-center space-x-3"
          >
            <div
              class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <GraduationCap class="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">EduManage</h1>
              <p class="text-xs text-gray-500">School Management</p>
            </div>
          </div>
          <div
            v-else
            class="flex justify-center w-full"
          >
            <div
              class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <GraduationCap class="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <!-- Main Navigation -->
        <RouterLink
          v-for="item in mainNavigationItems"
          :key="item.id"
          :to="item.route"
          class="block"
          @click="handleNavClick(item.id)"
        >
          <div
            :class="[
              'w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation',
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200',
            ]"
            :title="isCollapsed && !isMobile ? item.label : ''"
          >
            <component
              :is="item.icon"
              :class="[
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed && !isMobile ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
              ]"
            />
            <span
              v-if="!isCollapsed || isMobile"
              class="truncate transition-opacity duration-200"
            >
              {{ item.label }}
            </span>
            <span
              v-if="(!isCollapsed || isMobile) && item.badge"
              :class="[
                'ml-auto text-xs px-2 py-0.5 rounded-full',
                item.badgeType === 'urgent'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600',
              ]"
            >
              {{ item.badge }}
            </span>
          </div>
        </RouterLink>

        <!-- Academic Section -->
        <div class="pt-4">
          <div
            v-if="!isCollapsed || isMobile"
            class="px-3 mb-2"
          >
            <h3
              class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Academic
            </h3>
          </div>
          <div class="space-y-1">
            <RouterLink
              v-for="item in academicItems"
              :key="item.id"
              :to="item.route"
              class="block"
              @click="handleNavClick(item.id)"
            >
              <div
                :class="[
                  'w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation',
                  activeItem === item.id
                    ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200',
                ]"
                :title="isCollapsed && !isMobile ? item.label : ''"
              >
                <component
                  :is="item.icon"
                  :class="[
                    'flex-shrink-0 transition-colors duration-200',
                    isCollapsed && !isMobile ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                    activeItem === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-500',
                  ]"
                />
                <span
                  v-if="!isCollapsed || isMobile"
                  class="truncate transition-opacity duration-200"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="(!isCollapsed || isMobile) && item.badge"
                  :class="[
                    'ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full',
                  ]"
                >
                  {{ item.badge }}
                </span>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Administration Section -->
        <div class="pt-4">
          <div
            v-if="!isCollapsed || isMobile"
            class="px-3 mb-2"
          >
            <h3
              class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Administration
            </h3>
          </div>
          <RouterLink
            v-for="item in administrationItems"
            :key="item.id"
            :to="item.route"
            class="block"
            @click="handleNavClick(item.id)"
          >
            <div
              :class="[
                'w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation',
                activeItem === item.id
                  ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200',
              ]"
              :title="isCollapsed && !isMobile ? item.label : ''"
            >
              <component
                :is="item.icon"
                :class="[
                  'flex-shrink-0 transition-colors duration-200',
                  isCollapsed && !isMobile ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                  activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
                ]"
              />
              <span
                v-if="!isCollapsed || isMobile"
                class="truncate transition-opacity duration-200"
              >
                {{ item.label }}
              </span>
              <span
                v-if="(!isCollapsed || isMobile) && item.badge"
                class="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full"
              >
                {{ item.badge }}
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Separator -->
        <div class="my-4 border-t border-gray-200"></div>

        <!-- System Section -->
        <RouterLink
          v-for="item in systemItems"
          :key="item.id"
          :to="item.route"
          class="block"
          @click="handleNavClick(item.id)"
        >
          <div
            :class="[
              'w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation',
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200',
            ]"
            :title="isCollapsed && !isMobile ? item.label : ''"
          >
            <component
              :is="item.icon"
              :class="[
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed && !isMobile ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
              ]"
            />
            <span
              v-if="!isCollapsed || isMobile"
              class="truncate transition-opacity duration-200"
            >
              {{ item.label }}
            </span>
          </div>
        </RouterLink>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <!-- Current Academic Year -->
        <div
          v-if="!isCollapsed || isMobile"
          class="mb-3 p-2 bg-indigo-50 rounded-lg"
        >
          <div class="text-xs text-indigo-600 font-medium">Today's Date</div>
          <div class="text-sm font-semibold text-indigo-800">
            {{ formatDate(new Date()) }}
          </div>
        </div>

        <!-- User Profile -->
        <div class="flex items-center space-x-3 mb-3">
          <div
            class="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-indigo-100"
          >
            <template v-if="userPhoto">
              <img
                :src="userPhoto"
                alt="User Photo"
                class="w-full h-full object-cover"
              />
            </template>
            <template v-else>
              <User class="w-4 h-4 text-indigo-600" />
            </template>
          </div>
          <div
            v-if="!isCollapsed || isMobile"
            class="flex-1 min-w-0"
          >
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ userName }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{
                UserRole === "admin"
                  ? "Administrator"
                  : UserRole === "teacher"
                  ? "Teacher"
                  : "Student"
              }}
            </p>
          </div>
        </div>

        <!-- Toggle Button (Desktop only) -->
        <button
          v-if="!isMobile"
          @click="toggleSidebar"
          class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 touch-manipulation"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <ChevronLeft
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isCollapsed ? 'rotate-180' : '',
            ]"
          />
          <span
            v-if="!isCollapsed"
            class="ml-2"
          >
            Collapse
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import router from "@/router";
  import { useStore } from "vuex";
  import {
    Home,
    Users,
    UserCheck,
    ClipboardCheck,
    Settings,
    HelpCircle,
    LogOut,
    GraduationCap,
    User,
    ChevronLeft,
    School,
    Menu,
    X,
  } from "lucide-vue-next";

  const store = useStore();

  // Sidebar state
  const isCollapsed = ref(false);
  const activeItem = ref("dashboard");
  const showMobileSidebar = ref(false);
  const isMobile = ref(false);

  // Fetch role on mount
  onMounted(() => {
    store.dispatch("initializeUserRole");
    store.dispatch("fetchStudents", { page: 1, limit: 1 });
  });

  // Computed values
  const TotalStudents = computed(() => store.getters.getTotalStudents);
  const userName = computed(() => store.getters.getUserName);
  const UserRole = computed(() => store.getters.getUserRole);
  const userPhoto = computed(() => {
    const photo = store.getters.getUserPhoto;
    const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:5000";
    return photo
      ? photo.startsWith("http")
        ? photo
        : `${baseURL}/${photo}`
      : null;
  });

  // Navigation items
  const mainNavigationItems = ref([
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      route: "/",
      description:
        "Overview of school statistics, recent activities, and key performance indicators.",
      quickAction: "View Today's Schedule",
    },
  ]);

  const academicItems = computed(() => [
    {
      id: "students",
      label: "Students",
      icon: Users,
      badge: TotalStudents.value,
      route: "/students",
      description:
        "Manage student records, enrollment, personal information, and academic history.",
      quickAction: "Add New Student",
    },
    {
      id: "teachers",
      label: "Teachers",
      icon: UserCheck,
      badge: "89",
      description:
        "Manage teacher profiles, assignments, schedules, and performance records.",
      quickAction: "Add New Teacher",
      route: "/working",
    },
    {
      id: "classes",
      label: "Classes",
      icon: School,
      badge: "42",
      description:
        "Manage class schedules, room assignments, and student-teacher allocations.",
      quickAction: "Create New Class",
      route: "/working",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: ClipboardCheck,
      badge: "Today",
      description: "Track and manage student and teacher attendance records.",
      quickAction: "Mark Attendance",
      route: "/attendance",
    },
  ]);

  const administrationItems = ref([
    {
      id: "reports",
      label: "Reports",
      icon: ClipboardCheck,
      badge: "New",
      route: "/working",
    },
  ]);

  const systemItems = ref([
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description:
        "Configure system settings, user permissions, and school preferences.",
      quickAction: "Manage Settings",
      route: "/working",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      description:
        "Access help documentation, tutorials, and technical support.",
      quickAction: "Contact Support",
      route: "/HelpSupport",
    },
    {
      id: "logout",
      label: "Logout",
      icon: LogOut,
      description: "Securely sign out of the school management system.",
      quickAction: null,
      route: "/login",
    },
  ]);

  // Methods
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const toggleMobileSidebar = () => {
    showMobileSidebar.value = !showMobileSidebar.value;
  };

  const closeMobileSidebar = () => {
    showMobileSidebar.value = false;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleNavClick = (itemId) => {
    activeItem.value = itemId;

    // Close mobile sidebar when navigating
    if (isMobile.value) {
      showMobileSidebar.value = false;
    }

    if (itemId === "logout") {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  // Responsive handling
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024; // lg breakpoint

    if (isMobile.value) {
      isCollapsed.value = false; // Always expanded on mobile when shown
      showMobileSidebar.value = false; // Hide by default on mobile
    } else {
      showMobileSidebar.value = false; // Reset mobile sidebar state
    }
  };

  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener("resize", checkMobile);
    checkMobile();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
</script>

<style scoped>
  /* Custom scrollbar for webkit browsers */
  nav::-webkit-scrollbar {
    width: 4px;
  }

  nav::-webkit-scrollbar-track {
    background: transparent;
  }

  nav::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 2px;
  }

  nav::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }

  /* Smooth transitions */
  * {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Focus styles for accessibility */
  button:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }

  /* Touch optimization */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Mobile-specific styles */
  @media (max-width: 1023px) {
    .sidebar-mobile {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1000;
    }
  }

  /* Badge pulse animation */
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Notification dot pulse */
  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  /* Prevent body scroll when mobile sidebar is open */
  body.sidebar-open {
    overflow: hidden;
  }
</style>

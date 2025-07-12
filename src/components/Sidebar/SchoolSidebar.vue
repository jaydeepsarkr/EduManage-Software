<template>
  <div class="relative">
    <!-- Mobile Toggle Button -->
    <button
      @click="toggleMobileSidebar"
      class="fixed bg-white shadow-lg rounded-lg p-2 border border-gray-200 top-[16px] ml-[5px] lg:hidden"
      :class="{ 'left-4': !showMobileSidebar, 'left-72': showMobileSidebar }"
    >
      <Menu
        v-if="!showMobileSidebar"
        class="w-6 h-6 text-gray-700"
      />
      <X
        v-else
        class="w-6 h-6 text-gray-700 z-[1001]"
      />
    </button>

    <!-- Mobile Fullscreen Button -->
    <button
      @click="toggleFullscreen"
      class="fixed p-2 top-[18px] right-4 lg:hidden transition-all duration-300"
      :class="{
        'bg-indigo-500 text-white border-indigo-500': isFullscreen,
        'hover:bg-gray-50': !isFullscreen,
      }"
    >
      <Maximize
        v-if="!isFullscreen"
        class="w-6 h-6 text-gray-700"
      />
      <Minimize
        v-else
        class="w-6 h-6 text-white"
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
        'bg-gradient-to-b from-slate-50 to-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-slate-200/60',
        // Desktop styles
        'lg:relative lg:translate-x-0',
        isCollapsed && !isMobile ? 'lg:w-20' : 'lg:w-72',
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
      <div
        class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-indigo-600 to-purple-600"
        :class="{ 'pt-16': isMobile && isFullscreen }"
      >
        <div class="flex items-center justify-between">
          <div
            v-if="!isCollapsed || isMobile"
            class="flex items-center space-x-3"
          >
            <div
              class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30"
            >
              <GraduationCap class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-white tracking-tight">
                EduManage
              </h1>
              <p class="text-sm text-indigo-100 font-medium">
                School Management
              </p>
            </div>
          </div>
          <div
            v-else
            class="flex justify-center w-full"
          >
            <div
              class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30"
            >
              <GraduationCap class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
        <!-- Main Navigation -->
        <div class="space-y-1">
          <RouterLink
            v-for="item in mainNavigationItems"
            :key="item.id"
            :to="item.route"
            class="block"
            @click="handleNavClick(item.id)"
          >
            <div
              :class="[
                'group relative w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 touch-manipulation transform hover:scale-[1.02]',
                activeItem === item.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-md',
              ]"
              :title="isCollapsed && !isMobile ? item.label : ''"
            >
              <div class="relative">
                <component
                  :is="item.icon"
                  :class="[
                    'flex-shrink-0 transition-all duration-300',
                    isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5 mr-4',
                    activeItem === item.id
                      ? 'text-white'
                      : 'text-slate-500 group-hover:text-indigo-600',
                  ]"
                />
                <div
                  v-if="activeItem === item.id"
                  class="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
                ></div>
              </div>
              <span
                v-if="!isCollapsed || isMobile"
                class="truncate transition-all duration-300 font-medium"
              >
                {{ item.label }}
              </span>
              <span
                v-if="(!isCollapsed || isMobile) && item.badge"
                :class="[
                  'ml-auto text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm',
                  item.badgeType === 'urgent'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-blue-100 text-blue-700 border border-blue-200',
                ]"
              >
                {{ item.badge }}
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Academic Section -->
        <div class="pt-6">
          <div
            v-if="!isCollapsed || isMobile"
            class="px-4 mb-3"
          >
            <h3
              class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center"
            >
              <div
                class="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-2"
              ></div>
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
                  'group relative w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 touch-manipulation transform hover:scale-[1.02]',
                  activeItem === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-md',
                ]"
                :title="isCollapsed && !isMobile ? item.label : ''"
              >
                <div class="relative">
                  <component
                    :is="item.icon"
                    :class="[
                      'flex-shrink-0 transition-all duration-300',
                      isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5 mr-4',
                      activeItem === item.id
                        ? 'text-white'
                        : 'text-slate-500 group-hover:text-emerald-600',
                    ]"
                  />
                  <div
                    v-if="activeItem === item.id"
                    class="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
                  ></div>
                </div>
                <span
                  v-if="!isCollapsed || isMobile"
                  class="truncate transition-all duration-300"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="(!isCollapsed || isMobile) && item.badge"
                  class="ml-auto bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm border border-emerald-200"
                >
                  {{ item.badge }}
                </span>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Administration Section -->
        <div class="pt-6">
          <div
            v-if="!isCollapsed || isMobile"
            class="px-4 mb-3"
          >
            <h3
              class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center"
            >
              <div
                class="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-2"
              ></div>
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
                'group relative w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 touch-manipulation transform hover:scale-[1.02]',
                activeItem === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-md',
              ]"
              :title="isCollapsed && !isMobile ? item.label : ''"
            >
              <div class="relative">
                <component
                  :is="item.icon"
                  :class="[
                    'flex-shrink-0 transition-all duration-300',
                    isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5 mr-4',
                    activeItem === item.id
                      ? 'text-white'
                      : 'text-slate-500 group-hover:text-orange-600',
                  ]"
                />
                <div
                  v-if="activeItem === item.id"
                  class="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
                ></div>
              </div>
              <span
                v-if="!isCollapsed || isMobile"
                class="truncate transition-all duration-300"
              >
                {{ item.label }}
              </span>
              <span
                v-if="(!isCollapsed || isMobile) && item.badge"
                class="ml-auto bg-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm border border-orange-200"
              >
                {{ item.badge }}
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Separator -->
        <div class="my-6">
          <div
            class="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          ></div>
        </div>

        <!-- System Section -->
        <div class="space-y-1">
          <RouterLink
            v-for="item in systemItems"
            :key="item.id"
            :to="item.route"
            class="block"
            @click="handleNavClick(item.id)"
          >
            <div
              :class="[
                'group relative w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 touch-manipulation transform hover:scale-[1.02]',
                activeItem === item.id
                  ? item.id === 'logout'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-500/25'
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-md',
                item.id === 'logout' &&
                  'hover:from-red-50 hover:to-pink-50 hover:text-red-700',
              ]"
              :title="isCollapsed && !isMobile ? item.label : ''"
            >
              <div class="relative">
                <component
                  :is="item.icon"
                  :class="[
                    'flex-shrink-0 transition-all duration-300',
                    isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5 mr-4',
                    activeItem === item.id
                      ? 'text-white'
                      : item.id === 'logout'
                      ? 'text-slate-500 group-hover:text-red-600'
                      : 'text-slate-500 group-hover:text-slate-600',
                  ]"
                />
                <div
                  v-if="activeItem === item.id"
                  class="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
                ></div>
              </div>
              <span
                v-if="!isCollapsed || isMobile"
                class="truncate transition-all duration-300"
              >
                {{ item.label }}
              </span>
            </div>
          </RouterLink>
        </div>
      </nav>

      <!-- Footer -->
      <div
        class="p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white"
      >
        <!-- Current Academic Year -->
        <div
          v-if="!isCollapsed || isMobile"
          class="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 shadow-sm"
        >
          <div
            class="text-xs text-indigo-600 font-semibold uppercase tracking-wide"
          >
            Today's Date
          </div>
          <div class="text-sm font-bold text-indigo-800 mt-1">
            {{ formatDate(new Date()) }}
          </div>
        </div>

        <!-- User Profile -->
        <div class="flex items-center space-x-3 mb-4">
          <div
            class="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center"
          >
            <template v-if="userPhoto">
              <img
                :src="userPhoto"
                alt="User Photo"
                class="w-full h-full object-cover"
              />
            </template>
            <template v-else>
              <User class="w-5 h-5 text-indigo-600" />
            </template>
            <div
              class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
            ></div>
          </div>
          <div
            v-if="!isCollapsed || isMobile"
            class="flex-1 min-w-0"
          >
            <p class="text-sm font-bold text-slate-900 truncate">
              {{ userName }}
            </p>
            <p class="text-xs text-slate-500 truncate font-medium">
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
          class="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-700 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl hover:from-slate-200 hover:to-slate-100 transition-all duration-300 touch-manipulation transform hover:scale-[1.02] shadow-sm border border-slate-200/60"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <ChevronLeft
            :class="[
              'w-5 h-5 transition-transform duration-300',
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
    Maximize,
    Minimize,
  } from "lucide-vue-next";

  const store = useStore();

  // Sidebar state
  const isCollapsed = ref(false);
  const activeItem = ref("dashboard");
  const showMobileSidebar = ref(false);
  const isMobile = ref(false);

  // Fullscreen state
  const isFullscreen = ref(false);

  // Fetch role on mount
  onMounted(() => {
    store.dispatch("initializeUserRole");
    store.dispatch("fetchStudents", { page: 1, limit: 1 });

    // Add fullscreen change event listener
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  });

  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
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

  // Fullscreen methods
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
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
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #e2e8f0, #cbd5e1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
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

  /* Enhanced hover effects */
  .group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
  }

  /* Gradient animations */
  @keyframes gradient-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
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

  /* Enhanced shadow effects */
  .shadow-glow {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }

  /* Backdrop blur support */
  @supports (backdrop-filter: blur(10px)) {
    .backdrop-blur-sm {
      backdrop-filter: blur(4px);
    }
  }

  /* Fullscreen specific styles */
  .fullscreen-active {
    background: #000;
  }
</style>

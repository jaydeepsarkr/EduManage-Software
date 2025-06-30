<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div
            v-if="!isCollapsed"
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
            class="flex justify-center"
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
        >
          <div
            @click="setActiveItem(item.id)"
            :class="[
              'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <component
              :is="item.icon"
              :class="[
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
              ]"
            />
            <span
              v-if="!isCollapsed"
              class="truncate transition-opacity duration-200"
            >
              {{ item.label }}
            </span>
            <span
              v-if="!isCollapsed && item.badge"
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
            v-if="!isCollapsed"
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
            >
              <div
                :class="[
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  activeItem === item.id
                    ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                ]"
                @click="setActiveItem(item.id)"
                :title="isCollapsed ? item.label : ''"
              >
                <component
                  :is="item.icon"
                  :class="[
                    'flex-shrink-0 transition-colors duration-200',
                    isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                    activeItem === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-500',
                  ]"
                />
                <span
                  v-if="!isCollapsed"
                  class="truncate transition-opacity duration-200"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="!isCollapsed && item.badge"
                  class="ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full"
                >
                  {{ item.badge }}
                </span>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Administration Section -->
        <div
          v-if="!isCollapsed"
          class="px-3 mb-2 pt-4"
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
        >
          <div
            @click="setActiveItem(item.id)"
            :class="[
              'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <component
              :is="item.icon"
              :class="[
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
              ]"
            />
            <span
              v-if="!isCollapsed"
              class="truncate transition-opacity duration-200"
            >
              {{ item.label }}
            </span>
            <span
              v-if="!isCollapsed && item.badge"
              class="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full"
            >
              {{ item.badge }}
            </span>
          </div>
        </RouterLink>

        <!-- Separator -->
        <div class="my-4 border-t border-gray-200"></div>

        <!-- System Section -->
        <RouterLink
          v-for="item in systemItems"
          :key="item.id"
          :to="item.route"
          class="block"
        >
          <div
            @click="setActiveItem(item.id)"
            :class="[
              'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <component
              :is="item.icon"
              :class="[
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                activeItem === item.id ? 'text-indigo-600' : 'text-gray-500',
              ]"
            />
            <span
              v-if="!isCollapsed"
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
          v-if="!isCollapsed"
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
            v-if="!isCollapsed"
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

        <!-- Toggle Button -->
        <button
          @click="toggleSidebar"
          class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
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
            >Collapse</span
          >
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
  } from "lucide-vue-next";

  const store = useStore();

  // Sidebar state
  const isCollapsed = ref(false);
  const activeItem = ref("dashboard");

  // Fetch role on mount
  onMounted(() => {
    store.dispatch("initializeUserRole");
    store.dispatch("fetchStudents", { page: 1, limit: 1 }); // ensure we get updated total
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

  // Main navigation items
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

  // ✅ Academic items with dynamic student total
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

  // System Items
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

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const setActiveItem = (itemId) => {
    activeItem.value = itemId;
    if (itemId === "logout") {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  // Responsive sidebar
  const handleResize = () => {
    if (window.innerWidth < 768) {
      isCollapsed.value = true;
    }
  };

  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
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
</style>

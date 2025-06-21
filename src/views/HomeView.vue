<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard Cards -->

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UserPlus class="h-8 w-8 text-blue-600 mb-2" />
              <span class="text-sm font-medium text-gray-900">Add Student</span>
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus class="h-8 w-8 text-green-600 mb-2" />
              <span class="text-sm font-medium text-gray-900">New Course</span>
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CalendarPlus class="h-8 w-8 text-purple-600 mb-2" />
              <span class="text-sm font-medium text-gray-900"
                >Schedule Event</span
              >
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText class="h-8 w-8 text-orange-600 mb-2" />
              <span class="text-sm font-medium text-gray-900"
                >Generate Report</span
              >
            </button>
          </div>
        </div>
        <!-- Announcements -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Announcements</h3>
            <button
              class="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="announcement in announcements"
              :key="announcement.id"
              class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div class="flex items-start space-x-3">
                <AlertCircle class="h-5 w-5 text-yellow-600 mt-0.5" />
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ announcement.title }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ announcement.content }}
                  </p>
                  <p class="text-xs text-gray-500 mt-2">
                    {{ announcement.date }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm text-gray-900">
                    New student enrollment: John Smith
                  </p>
                  <p class="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm text-gray-900">
                    Attendance marked for Grade 10-A
                  </p>
                  <p class="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm text-gray-900">Parent meeting scheduled</p>
                  <p class="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <Calendar class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Parent-Teacher Conference
                  </p>
                  <p class="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <Award class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Science Fair</p>
                  <p class="text-xs text-gray-500">Friday, 10:00 AM</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <BookOpen class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Final Exams Begin
                  </p>
                  <p class="text-xs text-gray-500">Next Monday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import {
    Users,
    UserCheck,
    ClipboardCheck,
    BookOpen,
    Calendar,
    Award,
    Plus,
    UserPlus,
    CalendarPlus,
    FileText,
    AlertCircle,
  } from "lucide-vue-next";

  export default {
    name: "App",
    components: {
      CalendarPlus,
      FileText,
      Plus,
      UserPlus,

      Users,
      UserCheck,
      ClipboardCheck,
      BookOpen,
      Calendar,
      Award,
      AlertCircle,
    },
    data() {
      return {
        showMobileSidebar: false,
        announcements: [
          {
            id: 1,
            title: "Holiday Schedule Update",
            content:
              "Please note the updated holiday schedule for the winter break period.",
            date: "Dec 20, 2024",
          },
          {
            id: 2,
            title: "Parent-Teacher Meeting",
            content: "Scheduled for September 5th at 6 PM.",
            date: "August 28, 2023",
          },
        ],
      };
    },
    methods: {
      toggleMobileSidebar() {
        this.showMobileSidebar = !this.showMobileSidebar;
      },
      closeMobileSidebar() {
        this.showMobileSidebar = false;
      },
    },
  };
</script>

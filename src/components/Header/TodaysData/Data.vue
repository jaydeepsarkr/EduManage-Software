<template>
  <div
    class="hidden xl:flex items-center space-x-6 px-6 border-l border-gray-200"
  >
    <div class="text-center">
      <div class="flex items-center space-x-1">
        <Users class="w-4 h-4 text-green-600" />
        <span class="text-lg font-semibold text-gray-900">1,247</span>
      </div>
      <div class="text-xs text-gray-500">Total Students</div>
    </div>
    <div class="text-center">
      <div class="flex items-center space-x-1">
        <UserCheck class="w-4 h-4 text-blue-600" />
        <span class="text-lg font-semibold text-gray-900">89</span>
      </div>
      <div class="text-xs text-gray-500">Teaching Staff</div>
    </div>
    <div class="text-center">
      <div class="flex items-center space-x-1">
        <ClipboardCheck class="w-4 h-4 text-orange-600" />
        <span class="text-lg font-semibold text-gray-900">94.2%</span>
      </div>
      <div class="text-xs text-gray-500">Attendance Today</div>
    </div>
  </div>
</template>

<script>
  import { Users, UserCheck, ClipboardCheck } from "lucide-vue-next";

  export default {
    name: "SchoolHeader",
    components: {
      Users,
      UserCheck,
      ClipboardCheck,
    },
    data() {
      return {};
    },
    methods: {
      getCurrentPageTitle() {
        return "Welcome back 😊!";
      },
      getCurrentPageDescription() {
        return "what's happening at your school today.";
      },
    },
  };
</script>

<template>
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
            <p class="text-sm font-medium text-gray-900">Final Exams Begin</p>
            <p class="text-xs text-gray-500">Next Monday</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { BookOpen, Calendar, Award } from "lucide-vue-next";
</script>

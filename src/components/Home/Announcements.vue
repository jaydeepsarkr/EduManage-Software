<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Announcements</h3>
      <button class="text-blue-600 text-sm font-medium hover:text-blue-700">
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
</template>

<script setup>
  import { AlertCircle } from "lucide-vue-next";

  import { ref } from "vue";

  const announcements = ref([
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
  ]);
</script>

<template>
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
</template>

<script>
  export default {};
</script>

<style></style>

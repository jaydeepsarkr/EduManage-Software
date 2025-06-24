<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
    <h2 class="text-lg font-semibold text-slate-900 mb-4">
      Attendance Configuration
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Class Filter -->
      <div>
        <label
          for="class-select"
          class="block text-sm font-medium text-slate-700 mb-2"
        >
          Select Class
        </label>
        <select
          id="class-select"
          v-model="selectedClass"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
        >
          <option value="">Choose a class...</option>
          <option
            v-for="cls in classes"
            :key="cls.id"
            :value="cls.id"
          >
            {{ cls.name }}
          </option>
        </select>
      </div>

      <!-- Date Selection -->
      <div>
        <label
          for="attendance-date"
          class="block text-sm font-medium text-slate-700 mb-2"
        >
          Attendance Date
        </label>
        <input
          id="attendance-date"
          type="date"
          v-model="attendanceDate"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>

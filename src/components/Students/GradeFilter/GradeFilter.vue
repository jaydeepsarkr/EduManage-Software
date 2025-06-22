<template>
  <select
    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <option value="">All Grades</option>
    <option
      v-for="grade in grades"
      :key="grade"
      :value="grade"
    >
      {{ grade }}
    </option>
  </select>
</template>

<script>
  export default {};
</script>

<style></style>

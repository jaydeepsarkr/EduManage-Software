<template>
  <select
    v-model="selectedStatus"
    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <option value="">All Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Graduated">Graduated</option>
  </select>
</template>

<script setup>
  import { ref } from "vue";
  const selectedStatus = ref("");
</script>

<style></style>

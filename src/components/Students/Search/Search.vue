<template>
  <div class="relative flex-1 max-w-md">
    <svg
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
    <input
      type="text"
      v-model="searchQuery"
      @input="$emit('search-text', searchQuery)"
      placeholder="Search students..."
      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const searchQuery = ref("");
  defineEmits(["search-text"]);
</script>

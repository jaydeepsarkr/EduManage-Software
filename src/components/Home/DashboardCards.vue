<!-- components/StatCard.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div class="flex items-center">
      <div :class="['p-2 rounded-lg', bgColor]">
        <component
          :is="icon"
          class="w-6 h-6"
          :class="iconColor"
        />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">{{ label }}</p>
        <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    icon: Object, // Pass the imported icon directly
    label: String,
    value: [String, Number],
    bgColor: String, // Tailwind bg class like "bg-blue-100"
    iconColor: String, // Tailwind text class like "text-blue-600"
  });
</script>

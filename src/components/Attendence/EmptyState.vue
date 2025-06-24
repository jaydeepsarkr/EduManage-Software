<!-- src/components/EmptyStateCard.vue -->
<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center"
  >
    <div
      class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <svg
        class="w-10 h-10 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="iconPath"
        ></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-slate-900 mb-2">
      {{ title }}
    </h3>
    <p class="text-slate-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: "Select a Class to Begin",
    },
    description: {
      type: String,
      default:
        "Choose a class from the dropdown above to view and mark student attendance.",
    },
    iconPath: {
      type: String,
      default:
        "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  });
</script>

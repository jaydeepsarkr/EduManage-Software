<!-- src/components/AttendanceCard.vue -->
<template>
  <button
    @click="$emit('select', viewKey)"
    :class="[
      'group relative overflow-hidden rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105',
      isActive
        ? `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white shadow-xl`
        : 'bg-white text-slate-700 shadow-sm border border-slate-200 hover:shadow-lg',
    ]"
  >
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
        <p :class="isActive ? `text-${color}-100` : 'text-slate-500'">
          {{ description }}
        </p>
      </div>
      <div
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center',
          isActive ? 'bg-white/20' : `bg-${color}-50`,
        ]"
      >
        <svg
          class="w-6 h-6"
          :class="isActive ? 'text-white' : `text-${color}-600`"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            :d="iconPath"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup>
  defineProps({
    viewKey: String,
    title: String,
    description: String,
    iconPath: String,
    isActive: Boolean,
    color: {
      type: String,
      default: "blue",
    },
  });
</script>

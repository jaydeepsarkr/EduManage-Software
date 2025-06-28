<!-- src/components/AttendanceCard.vue -->
<template>
  <button
    @click="$emit('select', viewKey)"
    :class="[
      'group relative overflow-hidden rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 text-left transition-all duration-300 transform hover:scale-105 w-full',
      isActive
        ? `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white shadow-lg sm:shadow-xl`
        : 'bg-white text-slate-700 shadow-sm border border-slate-200 hover:shadow-lg',
    ]"
  >
    <!-- Mobile Layout: Vertical stack -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <!-- Icon and Title Container -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Icon -->
        <div
          :class="[
            'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md flex items-center justify-center flex-shrink-0',
            isActive ? 'bg-white/20' : `bg-${color}-50`,
          ]"
        >
          <svg
            :class="[
              'w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5',
              isActive ? 'text-white' : `text-${color}-600`,
            ]"
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

        <!-- Title -->
        <div class="flex-1 min-w-0">
          <h3 class="text-xs sm:text-sm lg:text-base font-bold truncate">
            <span class="block sm:hidden">{{ getMobileTitle() }}</span>
            <span class="hidden sm:block">{{ title }}</span>
          </h3>
        </div>
      </div>

      <!-- Description: Only on larger screens -->
      <div class="hidden lg:block">
        <p
          v-if="description"
          :class="[
            'text-xs text-right max-w-32 truncate',
            isActive ? `text-${color}-100` : 'text-slate-500',
          ]"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </button>
</template>

<script setup>
  const props = defineProps({
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

  // Function to get mobile-friendly titles
  const getMobileTitle = () => {
    const mobileTitles = {
      "Give Attendance": "Attendance",
      "Attendance Details": "History",
      "Mark Attendance": "Attendance",
      "View Details": "History",
      "Daily Attendance": "Attendance",
      "Attendance Reports": "History",
    };

    return mobileTitles[props.title] || props.title;
  };
</script>

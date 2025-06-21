<!-- components/MiniStat.vue -->
<template>
  <div class="text-center">
    <div class="flex items-center space-x-1">
      <component
        :is="icon"
        class="w-4 h-4"
        :class="iconColor"
      />
      <span class="text-lg font-semibold text-gray-900">{{ value }}</span>
    </div>
    <div class="text-xs text-gray-500">{{ label }}</div>
  </div>
</template>

<script>
  export default {
    name: "MiniStat",
    props: {
      icon: {
        type: [Object, Function],
        required: true,
      },
      value: {
        type: [String, Number],
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        default: "text-gray-400",
      },
    },
  };
</script>

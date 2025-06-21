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

<script>
  export default {
    name: "StatCard",
    props: {
      icon: {
        type: [Object, Function],
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      value: {
        type: [String, Number],
        required: true,
      },
      bgColor: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        required: true,
      },
    },
  };
</script>

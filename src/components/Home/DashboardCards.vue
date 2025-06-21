<template>
  <div
    class="bg-white p-4 rounded-xl shadow-md border border-gray-100 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <div class="flex items-center">
      <div
        :class="[
          'p-2 rounded-lg shadow-inner transition duration-300',
          bgColor,
        ]"
      >
        <component
          :is="icon"
          class="w-5 h-5"
          :class="[
            iconColor,
            'transition-transform duration-300 group-hover:scale-110',
          ]"
        />
      </div>
      <div class="ml-4">
        <p class="text-xs font-medium text-gray-500">{{ label }}</p>
        <p class="text-lg font-bold text-gray-800">{{ value }}</p>
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

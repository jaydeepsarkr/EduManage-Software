<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(action, index) in actions"
        :key="index"
        @click="action.onClick"
        class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <component
          :is="action.icon"
          class="h-8 w-8 mb-2"
          :class="action.color"
        />
        <span class="text-sm font-medium text-gray-900">{{
          action.label
        }}</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuickActions",
    props: {
      actions: {
        type: Array,
        required: true,
      },
    },
  };
</script>

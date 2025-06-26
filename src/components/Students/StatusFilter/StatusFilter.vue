<template>
  <div class="relative group">
    <GraduationCap
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors"
    />
    <select
      v-model="selectedClass"
      @change="$emit('selected-class', selectedClass)"
      class="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 appearance-none w-40"
    >
      <option
        v-for="n in 10"
        :key="n"
        :value="n"
      >
        Class {{ n }}
      </option>
    </select>
    <ChevronDown
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { GraduationCap, ChevronDown } from "lucide-vue-next";

  const selectedClass = ref(1); // default to Class 1
  const emit = defineEmits(["selected-class"]);

  onMounted(() => {
    emit("selected-class", selectedClass.value); // Emit default value on mount
  });
</script>

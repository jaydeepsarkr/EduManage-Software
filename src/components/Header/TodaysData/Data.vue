<template>
  <div
    class="hidden xl:flex items-center space-x-6 px-6 border-l border-gray-200"
  >
    <MiniStat
      v-for="(stat, index) in miniStats"
      :key="index"
      :icon="stat.icon"
      :value="stat.value"
      :label="stat.label"
      :iconColor="stat.iconColor"
    />
  </div>
</template>

<script>
  import { Users, UserCheck, ClipboardCheck } from "lucide-vue-next";
  import MiniStat from "@/components/Header/TodaysData/MiniStat/MiniStat.vue";

  export default {
    name: "SchoolHeader",
    components: {
      MiniStat,
    },
    data() {
      return {
        miniStats: [
          {
            icon: Users,
            value: 1247,
            label: "Total Students",
            iconColor: "text-green-600",
          },
          {
            icon: UserCheck,
            value: 80,
            label: "Teaching Staff",
            iconColor: "text-blue-600",
          },
          {
            icon: ClipboardCheck,
            value: "94.2%",
            label: "Attendance Today",
            iconColor: "text-orange-600",
          },
        ],
      };
    },
    methods: {
      getCurrentPageTitle() {
        return "Welcome back 😊!";
      },
      getCurrentPageDescription() {
        return "what's happening at your school today.";
      },
    },
  };
</script>

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
  import { mapState } from "vuex";
  import { Users, UserCheck, ClipboardCheck } from "lucide-vue-next";
  import MiniStat from "@/components/Header/TodaysData/MiniStat/MiniStat.vue";

  export default {
    name: "SchoolHeader",
    components: {
      MiniStat,
    },
    data() {
      return {
        interval: null,
      };
    },
    computed: {
      ...mapState(["attendanceStats"]),
      miniStats() {
        const todayStats = this.attendanceStats?.today?.overall || {};

        return [
          {
            icon: Users,
            value: todayStats.totalStudents || 0,
            label: "Total Students",
            iconColor: "text-green-600",
          },
          {
            icon: UserCheck,
            value: todayStats.totalPresent || 0,
            label: "Present Today",
            iconColor: "text-blue-600",
          },
          {
            icon: ClipboardCheck,
            value: todayStats.overallAttendancePercentage || "0%",
            label: "Attendance Today",
            iconColor: "text-orange-600",
          },
        ];
      },
    },
    methods: {
      fetchStats() {
        this.$store.dispatch("fetchAttendanceStats");
      },
    },
    mounted() {
      this.fetchStats();
      this.interval = setInterval(this.fetchStats, 1000);
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
</script>

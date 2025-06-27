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
  import { mapState, mapGetters } from "vuex";
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
      ...mapGetters(["getTotalStudentCount"]), // ✅ use new getter for total count
      miniStats() {
        const today = this.attendanceStats?.today || {};
        return [
          {
            icon: Users,
            value: this.getTotalStudentCount || 0, // ✅ total student count from Vuex
            label: "Total Students",
            iconColor: "text-green-600",
          },
          {
            icon: UserCheck,
            value: 80, // Replace with dynamic staff count if needed
            label: "Teaching Staff",
            iconColor: "text-blue-600",
          },
          {
            icon: ClipboardCheck,
            value: today.averageAttendance || "0%",
            label: "Attendance Today",
            iconColor: "text-orange-600",
          },
        ];
      },
    },
    methods: {
      fetchStats() {
        this.$store.dispatch("fetchAttendanceStats");
        this.$store.dispatch("fetchTotalStudentCount"); // ✅ new action that only gets total
      },
    },
    mounted() {
      this.fetchStats(); // Initial fetch
      this.interval = setInterval(this.fetchStats, 10000); // Repeat every 10s
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
</script>

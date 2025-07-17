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
      ...mapState(["todaysAttendancePercentage"]),
      miniStats() {
        const stats = this.todaysAttendancePercentage || {
          totalStudents: 0,
          presentToday: 0,
          attendancePercentage: "0%",
        };

        return [
          {
            icon: Users,
            value: stats.totalStudents,
            label: "Total Students",
            iconColor: "text-green-600",
          },
          {
            icon: UserCheck,
            value: stats.presentToday,
            label: "Present Today",
            iconColor: "text-blue-600",
          },
          {
            icon: ClipboardCheck,
            value: stats.attendancePercentage || "0%",
            label: "Attendance Today",
            iconColor: "text-orange-600",
          },
        ];
      },
    },

    methods: {
      fetchTodaysData() {
        this.$store.dispatch("fetchTodaysAttendancePercentage");
      },
    },
    mounted() {
      this.fetchTodaysData();
      this.interval = setInterval(this.fetchTodaysData, 1000);
      this.$store.dispatch("fetchTeachers", {
        page: 1,
        limit: 10,
        search: "",
      });
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <DashboardCards
          v-for="(card, index) in stats"
          :key="index"
          :icon="card.icon"
          :label="card.label"
          :value="card.value"
          :bgColor="card.bgColor"
          :iconColor="card.iconColor"
        />
      </div>
      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActions :actions="quickActionList" />
        <!-- Announcements -->
        <Announcements />
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingEvents />
      </div>
    </div>
    <ChatBot />
  </main>
</template>

<script setup>
  import {
    Users,
    UserCheck,
    ClipboardCheck,
    BookOpen,
    Plus,
    UserPlus,
    CalendarPlus,
    FileText,
  } from "lucide-vue-next";

  // import { ref } from "vue";
  import DashboardCards from "@/components/Home/DashboardCards.vue";
  import QuickActions from "@/components/Home/QuickActions.vue";
  import Announcements from "@/components/Home/Announcements.vue";
  import RecentActivity from "@/components/Home/RecentActivity.vue";
  import UpcomingEvents from "@/components/Home/UpcomingEvents.vue";
  import ChatBot from "@/components/AI-ChatBot.vue";
  const stats = [
    {
      icon: Users,
      label: "Total Students",
      value: "1,247",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: UserCheck,
      label: "Teaching Staff",
      value: 80,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: ClipboardCheck,
      label: "Attendance Rate",
      value: "94.2%",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: BookOpen,
      label: "Active Classes",
      value: 42,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];
  const quickActionList = [
    {
      label: "Add Student",
      icon: UserPlus,
      color: "text-blue-600",
      onClick: () => alert("Add Student clicked"),
    },
    {
      label: "New Course",
      icon: Plus,
      color: "text-green-600",
      onClick: () => alert("New Course clicked"),
    },
    {
      label: "Schedule Event",
      icon: CalendarPlus,
      color: "text-purple-600",
      onClick: () => alert("Schedule Event clicked"),
    },
    {
      label: "Generate Report",
      icon: FileText,
      color: "text-orange-600",
      onClick: () => alert("Generate Report clicked"),
    },
  ];
</script>

<template>
  <div class="container mx-auto px-4 pt-20 relative z-10">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <div class="inline-block">
        <span
          class="bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-1 rounded-full"
        >
          Coming Soon
        </span>
      </div>
      <h1
        class="mt-8 text-4xl md:text-6xl font-bold text-gray-900 tracking-tight"
      >
        School Management
        <span class="block text-indigo-600">System</span>
      </h1>
      <p class="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        We're building a comprehensive platform to revolutionize educational
        management. Stay tuned for the launch!
      </p>
    </div>

    <!-- Progress Section -->
    <div class="max-w-3xl mx-auto mb-20">
      <div class="bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          class="bg-indigo-600 h-full w-3/4 rounded-full transition-all duration-1000 ease-out animate-progress"
        ></div>
      </div>
      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <span>Development in Progress</span>
        <span>75% Complete</span>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        <div
          class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300"
        >
          <i :class="[feature.icon, 'text-indigo-600 text-xl']"></i>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">
          {{ feature.title }}
        </h3>
        <p class="mt-2 text-gray-600">{{ feature.description }}</p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="text-center"
      >
        <div class="text-3xl font-bold text-indigo-600">{{ stat.value }}</div>
        <div class="mt-1 text-sm text-gray-600">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="max-w-xl mx-auto bg-indigo-50 rounded-2xl p-8 mb-20">
      <h3 class="text-xl font-semibold text-gray-900 text-center mb-6">
        Get Notified When We Launch
      </h3>
      <div class="flex gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:ring-0 outline-none"
        />
        <button
          class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Notify Me
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UnderConstruction",
    data() {
      return {
        features: [
          {
            icon: "fas fa-graduation-cap",
            title: "Smart Learning",
            description:
              "Personalized learning paths with AI-driven recommendations for each student.",
          },
          {
            icon: "fas fa-chart-line",
            title: "Performance Analytics",
            description:
              "Real-time insights and detailed analytics on student progress.",
          },
          {
            icon: "fas fa-users",
            title: "Collaboration Tools",
            description:
              "Enhanced communication between teachers, students, and parents.",
          },
          {
            icon: "fas fa-shield-alt",
            title: "Secure Platform",
            description:
              "Enterprise-grade security to protect sensitive educational data.",
          },
          {
            icon: "fas fa-calendar-alt",
            title: "Schedule Management",
            description:
              "Efficient timetable management and scheduling system.",
          },
          {
            icon: "fas fa-file-alt",
            title: "Resource Library",
            description:
              "Centralized repository for educational materials and resources.",
          },
        ],
        stats: [
          { value: "2000+", label: "Beta Users" },
          { value: "150+", label: "Features" },
          { value: "99%", label: "Satisfaction" },
          { value: "24/7", label: "Support" },
        ],
      };
    },
  };
</script>

<style>
  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 75%;
    }
  }

  .animate-progress {
    animation: progress 2s ease-out forwards;
  }
</style>

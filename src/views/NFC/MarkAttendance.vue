<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Loading State -->
      <transition
        name="fade-slide"
        appear
      >
        <div
          v-if="loading"
          class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        >
          <div class="flex flex-col items-center space-y-6">
            <!-- Animated Loading Ring -->
            <div class="relative">
              <div
                class="w-20 h-20 border-4 border-blue-100 rounded-full animate-spin-slow"
              >
                <div
                  class="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"
                ></div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <UserCheck class="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <!-- Ripple Effect -->
              <div
                class="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-20"
              ></div>
            </div>

            <div class="space-y-3">
              <h2 class="text-2xl font-bold text-gray-800 animate-fade-in-up">
                Processing Attendance
              </h2>
              <div class="flex items-center justify-center space-x-1">
                <span class="text-gray-600">Please wait</span>
                <div class="flex space-x-1">
                  <div
                    class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                    style="animation-delay: 0ms"
                  ></div>
                  <div
                    class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                    style="animation-delay: 150ms"
                  ></div>
                  <div
                    class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                    style="animation-delay: 300ms"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Success State -->
      <transition
        name="success-bounce"
        appear
      >
        <div
          v-if="success"
          class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20 relative overflow-hidden"
        >
          <!-- Confetti Animation -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              v-for="i in 20"
              :key="i"
              class="absolute w-2 h-2 bg-green-400 rounded-full animate-confetti"
              :style="{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: 2 + Math.random() * 2 + 's',
              }"
            ></div>
          </div>

          <div class="flex flex-col items-center space-y-6 relative z-10">
            <!-- Success Icon with Pulse -->
            <div class="relative">
              <div
                class="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg"
              >
                <CheckCircle class="w-10 h-10 text-white animate-check-draw" />
              </div>
              <div
                class="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"
              ></div>
              <div
                class="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-20"
              ></div>
            </div>

            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-800 animate-fade-in-up">
                Attendance Confirmed!
              </h2>
              <p class="text-gray-600 animate-fade-in-up animation-delay-200">
                Successfully marked attendance for
              </p>

              <div
                class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 animate-fade-in-up animation-delay-400 transform hover:scale-105 transition-transform duration-200"
              >
                <p class="font-bold text-green-800 text-lg">
                  {{ studentName }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center space-x-2 text-sm text-gray-500 animate-fade-in-up animation-delay-600"
            >
              <Clock class="w-4 h-4 animate-tick" />
              <span>{{ currentTime }}</span>
            </div>
          </div>
        </div>
      </transition>

      <!-- Error State -->
      <transition
        name="shake"
        appear
      >
        <div
          v-if="error"
          class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20"
        >
          <div class="flex flex-col items-center space-y-6">
            <!-- Error Icon with Shake -->
            <div class="relative">
              <div
                class="w-20 h-20 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg"
              >
                <AlertCircle class="w-10 h-10 text-white animate-shake" />
              </div>
              <div
                class="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25"
              ></div>
            </div>

            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-800 animate-fade-in-up">
                Attendance Failed
              </h2>
              <p class="text-gray-600 animate-fade-in-up animation-delay-200">
                We encountered an issue while marking attendance
              </p>

              <div
                class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 animate-fade-in-up animation-delay-400"
              >
                <p class="text-red-800 text-sm">{{ error }}</p>
              </div>
            </div>

            <button
              @click="retryAttendance"
              class="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-600 active:scale-95"
            >
              <RefreshCw
                class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
              />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Footer -->
      <transition
        name="fade-up"
        appear
      >
        <div class="mt-8 text-center animate-fade-in-up animation-delay-800">
          <div
            class="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="text-sm text-gray-600 font-medium">
              Powered by NFC Technology
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import {
    UserCheck,
    CheckCircle,
    AlertCircle,
    Clock,
    RefreshCw,
  } from "lucide-vue-next";
  import axios from "axios";

  const route = useRoute();
  const studentId = route.params.studentId;

  const loading = ref(true);
  const success = ref(false);
  const error = ref("");
  const studentName = ref("Student");

  const currentTime = computed(() => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const markAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      loading.value = true;
      success.value = false;
      error.value = "";

      // Get student name using new /students/:id route
      const res = await axios.get(
        `http://localhost:5000/api/students/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      studentName.value = res.data.name;

      // Mark attendance
      await axios.post(
        "http://localhost:5000/api/attendance/manual",
        {
          studentId,
          status: "present",
          subject: "Math",
          notes: "Marked via NFC link",
          attendanceByNFC: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      success.value = true;
    } catch (err) {
      error.value =
        err.response?.data?.error ||
        "Failed to mark attendance. Please try again.";
      console.error("MarkAttendance Error:", err);
    } finally {
      loading.value = false;
    }
  };

  const retryAttendance = () => {
    markAttendance();
  };

  onMounted(() => {
    markAttendance();
  });
</script>

<style scoped>
  /* Blob Animation */
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  /* Custom Animations */
  @keyframes spin-slow {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes scale-in {
    0% {
      transform: scale(0) rotate(180deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.1) rotate(90deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes fade-in-up {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes check-draw {
    0% {
      stroke-dasharray: 0 100;
    }
    100% {
      stroke-dasharray: 100 0;
    }
  }

  @keyframes confetti {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  @keyframes tick {
    0%,
    50% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  /* Animation Classes */
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }

  .animate-scale-in {
    animation: scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
  }

  .animate-check-draw {
    animation: check-draw 0.5s ease-in-out 0.3s both;
  }

  .animate-confetti {
    animation: confetti linear;
  }

  .animate-tick {
    animation: tick 2s ease-in-out infinite;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  /* Animation Delays */
  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-800 {
    animation-delay: 0.8s;
  }

  /* Vue Transitions */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }

  .success-bounce-enter-active {
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .success-bounce-enter-from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }

  .shake-enter-active {
    transition: all 0.5s ease-out;
  }

  .shake-enter-from {
    opacity: 0;
    transform: translateX(-20px) scale(0.9);
  }

  .fade-up-enter-active {
    transition: all 0.8s ease-out;
  }

  .fade-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  /* Glassmorphism Effect */
  .bg-white\/80 {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .bg-white\/60 {
    background-color: rgba(255, 255, 255, 0.6);
  }

  .border-white\/20 {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .border-white\/30 {
    border-color: rgba(255, 255, 255, 0.3);
  }
</style>

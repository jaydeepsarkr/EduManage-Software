<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full">
      <!-- Login Card -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
      >
        <!-- Header -->
        <div class="px-8 pt-8 pb-6 text-center">
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <GraduationCapIcon class="w-8 h-8 text-white" />
          </div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
          >
            Welcome Back
          </h1>
          <p class="text-gray-600 font-medium">
            Sign in to your school account
          </p>
        </div>

        <!-- OAuth Section -->
        <div class="px-8 pt-2 space-y-3">
          <button
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md group"
          >
            <svg
              class="w-5 h-5 mr-3 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500 font-medium"
                >Or continue with email</span
              >
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div class="px-8 pb-8 space-y-5">
          <div class="space-y-1">
            <label
              for="email"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              <MailIcon class="w-4 h-4 inline mr-2 text-gray-500" />
              Email Address
            </label>
            <div class="relative">
              <input
                id="email"
                type="email"
                v-model="email"
                class="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="your@email.com"
              />
              <MailIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              <LockIcon class="w-4 h-4 inline mr-2 text-gray-500" />
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-4 py-3 pl-11 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="Enter your password"
              />
              <LockIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <EyeIcon
                  v-if="!showPassword"
                  class="w-5 h-5"
                />
                <EyeOffIcon
                  v-else
                  class="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <transition
            name="error"
            mode="out-in"
          >
            <div
              v-if="errorMessage"
              class="flex items-center space-x-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <AlertCircleIcon class="w-4 h-4 flex-shrink-0" />
              <span>{{ errorMessage }}</span>
            </div>
          </transition>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
              />
              <span
                class="ml-2 text-gray-600 group-hover:text-gray-800 transition-colors"
                >Remember me</span
              >
            </label>
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div>
            <button
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <LoaderIcon
                v-if="isLoading"
                class="w-5 h-5 animate-spin"
              />
              <LogInIcon
                v-else
                class="w-5 h-5"
              />
              <span>{{ isLoading ? "Signing In..." : "Sign In" }}</span>
            </button>
          </div>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <router-link
                to="/signup"
                class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors ml-1"
              >
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p
          class="text-sm text-gray-500 flex items-center justify-center space-x-1"
        >
          <ShieldCheckIcon class="w-4 h-4" />
          <span>Your data is protected with enterprise-grade security</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import router from "@/router";
  import {
    MailIcon,
    LockIcon,
    EyeIcon,
    EyeOffIcon,
    LogInIcon,
    LoaderIcon,
    AlertCircleIcon,
    GraduationCapIcon,
    ShieldCheckIcon,
  } from "lucide-vue-next";

  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const showPassword = ref(false);
  const isLoading = ref(false);

  const handleLogin = async () => {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.value,
          password: password.value,
        }
      );

      // Save token & redirect
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      router.push("/");
    } catch (err) {
      errorMessage.value =
        err.response?.data?.error || "Login failed. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped>
  /* Error message transitions */
  .error-enter-active,
  .error-leave-active {
    transition: all 0.3s ease-out;
  }

  .error-enter-from,
  .error-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }

  /* Custom scrollbar for better aesthetics */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Enhanced focus styles */
  input:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Smooth animations for all interactive elements */
  * {
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
</style>

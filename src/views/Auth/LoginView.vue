<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Login Card -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-500 hover:shadow-md"
      >
        <!-- Header -->
        <div class="px-8 pt-8 pb-6 text-center border-b border-gray-100">
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">
            Welcome Back
          </h1>
          <p class="text-sm text-gray-600">Sign in to your school account</p>
        </div>

        <!-- OAuth Section -->
        <div class="px-8 pt-6 space-y-3">
          <button
            class="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <svg
              class="w-5 h-5 mr-3"
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

          <button
            class="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <svg
              class="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f25022"
                d="M1 1h10v10H1z"
              />
              <path
                fill="#00a4ef"
                d="M13 1h10v10H13z"
              />
              <path
                fill="#7fba00"
                d="M1 13h10v10H1z"
              />
              <path
                fill="#ffb900"
                d="M13 13h10v10H13z"
              />
            </svg>
            Continue with Microsoft
          </button>

          <button
            class="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 ..." />
            </svg>
            Continue with GitHub
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"
                >Or continue with email</span
              >
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div class="px-8 pb-8 space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              id="email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              id="password"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
            />
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-gray-900 border-gray-300 rounded"
              />
              <span class="ml-2 text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              class="text-gray-900 hover:underline"
              >Forgot password?</a
            >
          </div>

          <div>
            <button
              class="w-full bg-gray-900 text-white py-2.5 px-4 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200"
            >
              Sign In
            </button>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <a
                href="#"
                class="text-gray-900 hover:underline font-medium"
                >Sign up</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Fade in animation */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }

  /* Slide up animation */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.5s ease-out both;
  }

  /* Message transition */
  .message-enter-active,
  .message-leave-active {
    transition: all 0.3s ease-out;
  }

  .message-enter-from,
  .message-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
</style>

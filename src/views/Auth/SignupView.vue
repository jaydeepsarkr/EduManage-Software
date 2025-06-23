<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex"
  >
    <!-- Left Side - Signup Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
      <div class="max-w-md w-full">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-0 overflow-hidden"
        >
          <!-- Header -->
          <div class="px-8 pt-8 pb-6 text-center border-b border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <BookOpenIcon class="w-8 h-8 text-white" />
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Join EduManage
            </h1>
            <p class="text-gray-600">Create your school management account</p>
          </div>

          <div class="px-8 pt-6 pb-8 space-y-6">
            <!-- OAuth Section -->
            <button
              class="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg flex items-center justify-center transition-all duration-200"
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

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500"
                  >Or continue with email</span
                >
              </div>
            </div>

            <!-- Form Fields -->
            <div class="space-y-4">
              <!-- Full Name -->
              <div class="space-y-2">
                <label
                  for="fullName"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <UserIcon class="w-4 h-4" />
                  Full Name
                </label>
                <input
                  id="fullName"
                  v-model="formData.fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label
                  for="email"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MailIcon class="w-4 h-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Role -->
              <div class="space-y-2">
                <label
                  for="role"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <UsersIcon class="w-4 h-4" />
                  Role
                </label>
                <select
                  id="role"
                  v-model="formData.role"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <!-- Class and Roll Number (for students) -->
              <div
                v-if="formData.role === 'student'"
                class="grid grid-cols-2 gap-4"
              >
                <div class="space-y-2">
                  <label
                    for="class"
                    class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <GraduationCapIcon class="w-4 h-4" />
                    Class
                  </label>
                  <select
                    id="class"
                    v-model="formData.classValue"
                    class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">Select class</option>
                    <option
                      v-for="n in 12"
                      :key="n"
                      :value="n"
                    >
                      Class {{ n }}
                    </option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label
                    for="rollNo"
                    class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <HashIcon class="w-4 h-4" />
                    Roll Number
                  </label>
                  <input
                    id="rollNo"
                    v-model="formData.rollNo"
                    type="text"
                    placeholder="Enter roll no."
                    class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div class="space-y-2">
                <label
                  for="phone"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <PhoneIcon class="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  placeholder="Enter phone number"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label
                  for="password"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <LockIcon class="w-4 h-4" />
                  Password
                </label>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  placeholder="Create a strong password"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Confirm Password -->
              <div class="space-y-2">
                <label
                  for="confirmPassword"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <LockIcon class="w-4 h-4" />
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  class="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <p
                  v-if="
                    formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                  "
                  class="text-sm text-red-600 flex items-center gap-2"
                >
                  <AlertCircleIcon class="w-4 h-4" />
                  Passwords do not match
                </p>
              </div>

              <!-- Address -->
              <div class="space-y-2">
                <label
                  for="address"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MapPinIcon class="w-4 h-4" />
                  Address
                </label>
                <textarea
                  id="address"
                  v-model="formData.address"
                  placeholder="Enter your full address"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                ></textarea>
              </div>

              <!-- Error/Success Messages -->
              <div
                v-if="errorMessages.length"
                class="p-4 bg-red-50 border border-red-200 rounded-lg space-y-1"
              >
                <div
                  v-for="(err, index) in errorMessages"
                  :key="index"
                  class="text-sm text-red-600 flex items-center gap-2"
                >
                  <AlertCircleIcon class="w-4 h-4" />
                  <span>{{ err }}</span>
                </div>
              </div>

              <div
                v-if="successMessage"
                class="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div class="flex items-center gap-2">
                  <CheckCircleIcon class="h-4 w-4 text-green-600" />
                  <p class="text-green-600 text-sm">{{ successMessage }}</p>
                </div>
              </div>

              <!-- Terms Agreement -->
              <div class="flex items-start space-x-3">
                <input
                  id="terms"
                  v-model="formData.agreed"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 focus:ring-blue-500"
                />
                <label
                  for="terms"
                  class="text-sm text-gray-600 leading-relaxed"
                >
                  I agree to the
                  <a
                    href="#"
                    class="text-blue-600 hover:underline font-medium"
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="#"
                    class="text-blue-600 hover:underline font-medium"
                    >Privacy Policy</a
                  >
                </label>
              </div>

              <!-- Submit Button -->
              <button
                @click="handleSignup"
                :disabled="!formData.agreed || loading"
                class="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Loader2Icon
                  v-if="loading"
                  class="w-4 h-4 mr-2 animate-spin"
                />
                <span v-if="loading">Creating Account...</span>
                <span v-else>Create Account</span>
              </button>

              <!-- Login Link -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Already have an account?
                  <a
                    href="/login"
                    class="text-blue-600 hover:underline font-semibold"
                    >Sign in</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Feature Showcase -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-8 relative overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"
        ></div>
        <div
          class="absolute top-60 right-20 w-16 h-16 bg-white rounded-full animate-pulse"
          style="animation-delay: 2s"
        ></div>
        <div
          class="absolute bottom-40 left-20 w-12 h-12 bg-white rounded-full animate-pulse"
          style="animation-delay: 4s"
        ></div>
        <div
          class="absolute top-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse"
          style="animation-delay: 1s"
        ></div>
      </div>

      <div class="relative z-10 text-white max-w-lg">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Welcome to EduManage</h2>
          <p class="text-xl text-blue-100">
            Your comprehensive school management solution
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="space-y-6">
          <div
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <BookOpenIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">Academic Management</h3>
                <p class="text-blue-100 text-sm">
                  Track grades, assignments, and academic progress
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <UsersIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">Student & Parent Portal</h3>
                <p class="text-blue-100 text-sm">
                  Connect students, parents, and teachers seamlessly
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <BarChart3Icon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">Analytics & Reports</h3>
                <p class="text-blue-100 text-sm">
                  Comprehensive insights and performance analytics
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <CalendarIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">Schedule Management</h3>
                <p class="text-blue-100 text-sm">
                  Organize classes, events, and activities efficiently
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-12 grid grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold">1000+</div>
            <div class="text-blue-100 text-sm">Students</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">50+</div>
            <div class="text-blue-100 text-sm">Teachers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">25+</div>
            <div class="text-blue-100 text-sm">Classes</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from "vue-router";

  import { ref } from "vue";
  import axios from "axios";
  import {
    BookOpenIcon,
    UserIcon,
    MailIcon,
    UsersIcon,
    GraduationCapIcon,
    HashIcon,
    PhoneIcon,
    LockIcon,
    MapPinIcon,
    AlertCircleIcon,
    CheckCircleIcon,
    Loader2Icon,
    BarChart3Icon,
    CalendarIcon,
  } from "lucide-vue-next";
  const router = useRouter();
  const formData = ref({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    classValue: "",
    rollNo: "",
    address: "",
    agreed: false,
  });

  const loading = ref(false);
  const errorMessages = ref([]); // 👈 array to hold multiple errors
  const successMessage = ref("");

  const handleSignup = async () => {
    errorMessages.value = [];
    successMessage.value = "";
    loading.value = true;

    // ✅ Frontend validations
    if (
      !formData.value.fullName ||
      !formData.value.email ||
      !formData.value.password ||
      !formData.value.role ||
      !formData.value.phone ||
      !formData.value.address
    ) {
      errorMessages.value.push("Please fill in all required fields");
      loading.value = false;
      return;
    }

    if (formData.value.password.length < 6) {
      errorMessages.value.push("Password must be at least 6 characters long");
      loading.value = false;
      return;
    }

    if (formData.value.password !== formData.value.confirmPassword) {
      errorMessages.value.push("Passwords do not match");
      loading.value = false;
      return;
    }

    if (!formData.value.agreed) {
      errorMessages.value.push(
        "You must agree to the Terms and Privacy Policy"
      );
      loading.value = false;
      return;
    }

    if (
      formData.value.role === "student" &&
      (!formData.value.classValue || !formData.value.rollNo)
    ) {
      errorMessages.value.push(
        "Class and Roll Number are required for students"
      );
      loading.value = false;
      return;
    }

    // ✅ Build request payload
    const payload = {
      name: formData.value.fullName,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.role,
      phone: formData.value.phone,
      address: formData.value.address,
    };

    if (formData.value.role === "student") {
      payload.class = Number(formData.value.classValue);
      payload.rollNumber = formData.value.rollNo;
    }

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      successMessage.value =
        response.data.message ||
        "Account created successfully! Redirecting to login...";

      // Clear form after successful signup
      setTimeout(() => {
        formData.value = {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          phone: "",
          classValue: "",
          rollNo: "",
          address: "",
          agreed: false,
        };
        // Optional: navigate to login
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      const resError = err.response?.data;

      if (Array.isArray(resError?.errors)) {
        errorMessages.value = resError.errors;
      } else if (resError?.error) {
        errorMessages.value.push(resError.error);
      } else if (resError?.message) {
        errorMessages.value.push(resError.message);
      } else {
        errorMessages.value.push("Signup failed. Please try again.");
      }
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped>
  /* Custom animations */
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  /* Hover effects */
  .hover\:scale-\[1\.02\]:hover {
    transform: scale(1.02);
  }

  .active\:scale-\[0\.98\]:active {
    transform: scale(0.98);
  }

  .hover\:-translate-y-1:hover {
    transform: translateY(-0.25rem);
  }

  /* Focus styles */
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    ring: 2px;
    ring-color: rgb(59 130 246);
    border-color: transparent;
  }

  /* Disabled styles */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Backdrop blur */
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
</style>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex"
  >
    <!-- Left Side - Signup Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
      <div class="max-w-md w-full">
        <div
          class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-500 hover:shadow-3xl"
        >
          <!-- Header -->
          <div class="px-8 pt-8 pb-6 text-center relative overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"
            ></div>
            <div class="relative z-10">
              <div
                class="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300"
              >
                <BookOpenIcon class="w-10 h-10 text-white" />
              </div>
              <h1
                class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2"
              >
                Join EduManage
              </h1>
              <p class="text-gray-600 font-medium">
                Create your school management account
              </p>
            </div>
          </div>

          <div class="px-8 pt-2 pb-8 space-y-6">
            <!-- OAuth Section -->
            <button
              class="w-full h-12 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg group shadow-sm"
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
              <span class="font-semibold">Continue with Google</span>
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

            <!-- Form Fields -->
            <div class="space-y-5">
              <!-- Full Name -->
              <div class="space-y-2">
                <label
                  for="fullName"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <UserIcon class="w-4 h-4 text-blue-600" />
                  Full Name
                </label>
                <div class="relative">
                  <input
                    id="fullName"
                    v-model="formData.fullName"
                    type="text"
                    placeholder="Enter your full name"
                    class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                  />
                  <UserIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label
                  for="email"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MailIcon class="w-4 h-4 text-blue-600" />
                  Email Address
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                  />
                  <MailIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Role -->
              <div class="space-y-2">
                <label
                  for="role"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <UsersIcon class="w-4 h-4 text-blue-600" />
                  Role
                </label>
                <div class="relative">
                  <select
                    id="role"
                    v-model="formData.role"
                    class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                  </select>
                  <UsersIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  />
                  <ChevronDownIcon
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <!-- Class and Roll Number (for students) -->
              <transition
                name="slide-down"
                mode="out-in"
              >
                <div
                  v-if="formData.role === 'student'"
                  class="grid grid-cols-2 gap-4"
                >
                  <div class="space-y-2">
                    <label
                      for="class"
                      class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <GraduationCapIcon class="w-4 h-4 text-blue-600" />
                      Class
                    </label>
                    <div class="relative">
                      <select
                        id="class"
                        v-model="formData.classValue"
                        class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
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
                      <GraduationCapIcon
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      />
                      <ChevronDownIcon
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label
                      for="rollNo"
                      class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <HashIcon class="w-4 h-4 text-blue-600" />
                      Roll Number
                    </label>
                    <div class="relative">
                      <input
                        id="rollNo"
                        v-model="formData.rollNo"
                        type="text"
                        placeholder="Enter roll no."
                        class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                      />
                      <HashIcon
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Phone -->
              <div class="space-y-2">
                <label
                  for="phone"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <PhoneIcon class="w-4 h-4 text-blue-600" />
                  Phone Number
                </label>
                <div class="relative">
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    placeholder="Enter phone number"
                    class="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                  />
                  <PhoneIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label
                  for="password"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <LockIcon class="w-4 h-4 text-blue-600" />
                  Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Create a strong password"
                    class="w-full h-12 px-4 pl-11 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
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

              <!-- Confirm Password -->
              <div class="space-y-2">
                <label
                  for="confirmPassword"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <LockIcon class="w-4 h-4 text-blue-600" />
                  Confirm Password
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm your password"
                    class="w-full h-12 px-4 pl-11 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                    :class="{
                      'border-red-300 focus:ring-red-500': passwordMismatch,
                    }"
                  />
                  <LockIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <EyeIcon
                      v-if="!showConfirmPassword"
                      class="w-5 h-5"
                    />
                    <EyeOffIcon
                      v-else
                      class="w-5 h-5"
                    />
                  </button>
                </div>
                <transition name="fade">
                  <p
                    v-if="passwordMismatch"
                    class="text-sm text-red-600 flex items-center gap-2 mt-1"
                  >
                    <AlertCircleIcon class="w-4 h-4" />
                    Passwords do not match
                  </p>
                </transition>
              </div>

              <!-- Address -->
              <div class="space-y-2">
                <label
                  for="address"
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MapPinIcon class="w-4 h-4 text-blue-600" />
                  Address
                </label>
                <div class="relative">
                  <textarea
                    id="address"
                    v-model="formData.address"
                    placeholder="Enter your full address"
                    rows="3"
                    class="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 hover:bg-white focus:bg-white"
                  ></textarea>
                  <MapPinIcon
                    class="absolute left-3 top-4 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              <!-- Error/Success Messages -->
              <transition
                name="slide-down"
                mode="out-in"
              >
                <div
                  v-if="errorMessages.length"
                  class="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2"
                >
                  <div
                    v-for="(err, index) in errorMessages"
                    :key="index"
                    class="text-sm text-red-600 flex items-center gap-2"
                  >
                    <AlertCircleIcon class="w-4 h-4 flex-shrink-0" />
                    <span>{{ err }}</span>
                  </div>
                </div>
              </transition>

              <transition
                name="slide-down"
                mode="out-in"
              >
                <div
                  v-if="successMessage"
                  class="p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                  <div class="flex items-center gap-2">
                    <CheckCircleIcon
                      class="h-4 w-4 text-green-600 flex-shrink-0"
                    />
                    <p class="text-green-600 text-sm">{{ successMessage }}</p>
                  </div>
                </div>
              </transition>

              <!-- Terms Agreement -->
              <div
                class="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <input
                  id="terms"
                  v-model="formData.agreed"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 focus:ring-blue-500 transition-colors"
                />
                <label
                  for="terms"
                  class="text-sm text-gray-600 leading-relaxed"
                >
                  I agree to the
                  <a
                    href="#"
                    class="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="#"
                    class="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
                    >Privacy Policy</a
                  >
                </label>
              </div>

              <!-- Submit Button -->
              <button
                @click="handleSignup"
                :disabled="!formData.agreed || loading"
                class="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Loader2Icon
                  v-if="loading"
                  class="w-5 h-5 animate-spin"
                />
                <UserPlusIcon
                  v-else
                  class="w-5 h-5"
                />
                <span>{{
                  loading ? "Creating Account..." : "Create Account"
                }}</span>
              </button>

              <!-- Login Link -->
              <div class="text-center pt-2">
                <p class="text-gray-600">
                  Already have an account?
                  <a
                    href="/login"
                    class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors ml-1"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Feature Showcase -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 items-center justify-center p-8 relative overflow-hidden"
    >
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-float"
          style="animation-delay: 0s"
        ></div>
        <div
          class="absolute top-60 right-20 w-16 h-16 bg-white rounded-full animate-float"
          style="animation-delay: 2s"
        ></div>
        <div
          class="absolute bottom-40 left-20 w-12 h-12 bg-white rounded-full animate-float"
          style="animation-delay: 4s"
        ></div>
        <div
          class="absolute top-10 right-10 w-24 h-24 bg-white rounded-full animate-float"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute bottom-20 right-40 w-14 h-14 bg-white rounded-full animate-float"
          style="animation-delay: 3s"
        ></div>
      </div>

      <div class="relative z-10 text-white max-w-lg">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="text-5xl font-bold mb-4 leading-tight">
            Welcome to<br />EduManage
          </h2>
          <p class="text-xl text-blue-100 font-medium">
            Your comprehensive school management solution
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="space-y-4">
          <div
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer group"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
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
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer group"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
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
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer group"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
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
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer group"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
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
          <div class="text-center group cursor-pointer">
            <div
              class="text-3xl font-bold group-hover:scale-110 transition-transform duration-300"
            >
              1000+
            </div>
            <div class="text-blue-100 text-sm font-medium">Students</div>
          </div>
          <div class="text-center group cursor-pointer">
            <div
              class="text-3xl font-bold group-hover:scale-110 transition-transform duration-300"
            >
              50+
            </div>
            <div class="text-blue-100 text-sm font-medium">Teachers</div>
          </div>
          <div class="text-center group cursor-pointer">
            <div
              class="text-3xl font-bold group-hover:scale-110 transition-transform duration-300"
            >
              25+
            </div>
            <div class="text-blue-100 text-sm font-medium">Classes</div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div
          class="mt-8 flex items-center justify-center space-x-6 text-blue-100"
        >
          <div class="flex items-center space-x-2">
            <ShieldCheckIcon class="w-5 h-5" />
            <span class="text-sm font-medium">Secure</span>
          </div>
          <div class="flex items-center space-x-2">
            <StarIcon class="w-5 h-5" />
            <span class="text-sm font-medium">Trusted</span>
          </div>
          <div class="flex items-center space-x-2">
            <ZapIcon class="w-5 h-5" />
            <span class="text-sm font-medium">Fast</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
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
    EyeIcon,
    EyeOffIcon,
    ChevronDownIcon,
    UserPlusIcon,
    ShieldCheckIcon,
    StarIcon,
    ZapIcon,
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
  const errorMessages = ref([]);
  const successMessage = ref("");
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const passwordMismatch = computed(() => {
    return (
      formData.value.password &&
      formData.value.confirmPassword &&
      formData.value.password !== formData.value.confirmPassword
    );
  });

  const handleSignup = async () => {
    errorMessages.value = [];
    successMessage.value = "";
    loading.value = true;

    // Frontend validations
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

    // Build request payload
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
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px);
      opacity: 1;
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  /* Transitions */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Enhanced focus styles */
  input:focus,
  select:focus,
  textarea:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Custom select styling */
  select {
    background-image: none;
  }

  /* Smooth animations for all interactive elements */
  * {
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  /* Enhanced hover effects */
  .hover\:scale-\[1\.02\]:hover {
    transform: scale(1.02);
  }

  .hover\:scale-105:hover {
    transform: scale(1.05);
  }

  .group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
  }
</style>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="text-center">
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <HelpCircle class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Help & Support Center
          </h1>
          <p class="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Get the help you need to make the most of your school management
            system
          </p>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <Search
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              @input="handleSearch"
            />
          </div>
          <div
            v-if="searchResults.length > 0 && searchQuery"
            class="mt-4 bg-gray-50 rounded-lg p-4"
          >
            <h3 class="font-semibold text-gray-900 mb-3">Search Results:</h3>
            <div class="space-y-2">
              <div
                v-for="result in searchResults.slice(0, 5)"
                :key="result.id"
                @click="scrollToSection(result.section)"
                class="p-3 bg-white rounded border hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <h4 class="font-medium text-blue-600">{{ result.title }}</h4>
                <p class="text-sm text-gray-600">{{ result.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Get immediate help with these common tasks and features
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="action in quickActions"
          :key="action.id"
          @click="handleQuickAction(action)"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group border hover:border-blue-300"
        >
          <div class="flex flex-col items-center text-center">
            <div
              :class="[
                'p-4 rounded-full mb-4 transition-colors',
                action.bgColor,
                'group-hover:scale-110 transform transition-transform',
              ]"
            >
              <component
                :is="action.icon"
                :class="['w-8 h-8', action.iconColor]"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ action.title }}</h3>
            <p class="text-sm text-gray-600">{{ action.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div
      id="faq-section"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about our school management
          system
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="category in faqCategories"
          :key="category.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div :class="['p-6 border-b', category.headerBg]">
            <div class="flex items-center">
              <component
                :is="category.icon"
                :class="['w-6 h-6 mr-3', category.iconColor]"
              />
              <h3 class="text-xl font-semibold text-gray-900">
                {{ category.title }}
              </h3>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="faq in category.faqs"
                :key="faq.id"
                class="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  @click="toggleFaq(faq.id)"
                  class="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span class="font-medium text-gray-900">{{
                    faq.question
                  }}</span>
                  <ChevronDown
                    :class="[
                      'w-5 h-5 text-gray-500 transition-transform',
                      openFaqs.includes(faq.id) ? 'rotate-180' : '',
                    ]"
                  />
                </button>
                <div
                  v-if="openFaqs.includes(faq.id)"
                  class="px-4 py-3 bg-white border-t border-gray-200"
                >
                  <p class="text-gray-700 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Guides Section -->
    <div
      id="guides-section"
      class="bg-white py-12"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Step-by-Step Guides
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Detailed tutorials to help you master every feature of the system
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="guide in guides"
            :key="guide.id"
            @click="openGuide(guide)"
            class="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div
              :class="[
                'h-48 bg-gradient-to-br',
                guide.gradient,
                'flex items-center justify-center',
              ]"
            >
              <component
                :is="guide.icon"
                class="w-16 h-16 text-white"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-2">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    guide.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : guide.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ guide.difficulty }}
                </span>
                <span class="ml-2 text-sm text-gray-500">{{
                  guide.duration
                }}</span>
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
              >
                {{ guide.title }}
              </h3>
              <p class="text-gray-600 mb-4">{{ guide.description }}</p>
              <div class="flex items-center text-blue-600 font-medium">
                <span>Start Guide</span>
                <ArrowRight
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Support Section -->
    <div
      id="contact-section"
      class="bg-gray-50 py-12"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form
                @submit.prevent="submitSupportRequest"
                class="space-y-6"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      v-model="supportForm.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      v-model="supportForm.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    v-model="supportForm.subject"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="feature">Feature Request</option>
                    <option value="billing">Billing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <div class="flex space-x-4">
                    <label
                      v-for="priority in priorities"
                      :key="priority.value"
                      class="flex items-center cursor-pointer"
                    >
                      <input
                        v-model="supportForm.priority"
                        type="radio"
                        :value="priority.value"
                        class="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span :class="['text-sm font-medium', priority.color]">
                        {{ priority.label }}
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    v-model="supportForm.message"
                    rows="5"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Describe your issue or question in detail..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <div
                    v-if="isSubmitting"
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"
                  ></div>
                  {{ isSubmitting ? "Sending..." : "Send Message" }}
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <Mail class="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-gray-900">Email Support</p>
                    <p class="text-gray-600">support@schoolsystem.com</p>
                    <p class="text-sm text-gray-500">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <Phone
                    class="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <div>
                    <p class="font-medium text-gray-900">Phone Support</p>
                    <p class="text-gray-600">+1 (555) 123-4567</p>
                    <p class="text-sm text-gray-500">
                      Mon-Fri, 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <MessageCircle
                    class="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <div>
                    <p class="font-medium text-gray-900">Live Chat</p>
                    <p class="text-gray-600">Available 24/7</p>
                    <button
                      class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start Chat →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                System Status
              </h3>
              <div class="flex items-center mb-2">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-sm font-medium text-gray-900"
                  >All Systems Operational</span
                >
              </div>
              <p class="text-sm text-gray-600 mb-3">
                Last updated: 2 minutes ago
              </p>
              <button
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Status Page →
              </button>
            </div>

            <div class="bg-yellow-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                Emergency Contact
              </h3>
              <p class="text-sm text-gray-600 mb-3">
                For critical system issues affecting multiple users
              </p>
              <div class="flex items-center">
                <AlertTriangle class="w-4 h-4 text-yellow-600 mr-2" />
                <span class="text-sm font-medium text-gray-900"
                  >+1 (555) 911-HELP</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Message Sent Successfully!
          </h3>
          <p class="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            @click="showSuccessModal = false"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Guide Modal -->
    <div
      v-if="selectedGuide"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            {{ selectedGuide.title }}
          </h3>
          <button
            @click="selectedGuide = null"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div class="p-6">
          <div class="prose max-w-none">
            <div
              v-for="(step, index) in selectedGuide.steps"
              :key="index"
              class="mb-8"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-3"
                >
                  {{ index + 1 }}
                </div>
                <h4 class="text-lg font-semibold text-gray-900">
                  {{ step.title }}
                </h4>
              </div>
              <p class="text-gray-700 ml-11">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import {
    HelpCircle,
    Search,
    Users,
    BookOpen,
    Settings,
    BarChart3,
    ChevronDown,
    ArrowRight,
    Mail,
    Phone,
    MessageCircle,
    AlertTriangle,
    CheckCircle,
    X,
    UserPlus,
    Calendar,
    //   FileText,
    Shield,
  } from "lucide-vue-next";

  // Reactive data
  const searchQuery = ref("");
  const openFaqs = ref([]);
  const selectedGuide = ref(null);
  const showSuccessModal = ref(false);
  const isSubmitting = ref(false);

  // Support form
  const supportForm = ref({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: "",
  });

  // Quick actions data
  const quickActions = ref([
    {
      id: 1,
      title: "Add New Student",
      description: "Register a new student in the system",
      icon: UserPlus,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      action: "add-student",
    },
    {
      id: 2,
      title: "View Reports",
      description: "Access attendance and grade reports",
      icon: BarChart3,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      action: "view-reports",
    },
    {
      id: 3,
      title: "Manage Classes",
      description: "Create and organize class schedules",
      icon: Calendar,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      action: "manage-classes",
    },
    {
      id: 4,
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      action: "system-settings",
    },
  ]);

  // FAQ categories
  const faqCategories = ref([
    {
      id: 1,
      title: "Student Management",
      icon: Users,
      iconColor: "text-blue-600",
      headerBg: "bg-blue-50",
      faqs: [
        {
          id: 1,
          question: "How do I add a new student to the system?",
          answer:
            'Navigate to the Students section, click "Add New Student", fill in the required information including name, contact details, and class assignment, then save the record.',
        },
        {
          id: 2,
          question: "Can I bulk import student data?",
          answer:
            "Yes, you can import student data using CSV files. Go to Students > Import, download the template, fill it with student information, and upload the file.",
        },
        {
          id: 3,
          question: "How do I update student information?",
          answer:
            "Find the student in the Students list, click the edit icon, make your changes, and save. You can update contact information, class assignments, and other details.",
        },
      ],
    },
    {
      id: 2,
      title: "Attendance & Grades",
      icon: BookOpen,
      iconColor: "text-green-600",
      headerBg: "bg-green-50",
      faqs: [
        {
          id: 4,
          question: "How do I mark attendance for a class?",
          answer:
            "Go to Attendance, select the class and date, then mark each student as present, absent, or late. The system automatically saves your entries.",
        },
        {
          id: 5,
          question: "Can I generate attendance reports?",
          answer:
            "Yes, visit the Reports section and select Attendance Reports. You can filter by date range, class, or individual students to generate detailed reports.",
        },
        {
          id: 6,
          question: "How do I enter grades for assignments?",
          answer:
            "Navigate to Grades, select the class and assignment, then enter scores for each student. You can also set grade scales and calculate averages automatically.",
        },
      ],
    },
    {
      id: 3,
      title: "System Access",
      icon: Shield,
      iconColor: "text-purple-600",
      headerBg: "bg-purple-50",
      faqs: [
        {
          id: 7,
          question: "I forgot my password. How do I reset it?",
          answer:
            'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the reset email sent to you.',
        },
        {
          id: 8,
          question: "How do I change my account permissions?",
          answer:
            "Contact your system administrator to modify user permissions. Only administrators can change access levels and assign roles.",
        },
        {
          id: 9,
          question: "Can I access the system from mobile devices?",
          answer:
            "Yes, the system is fully responsive and works on tablets and smartphones. You can also download our mobile app for enhanced functionality.",
        },
      ],
    },
    {
      id: 4,
      title: "Reports & Analytics",
      icon: BarChart3,
      iconColor: "text-orange-600",
      headerBg: "bg-orange-50",
      faqs: [
        {
          id: 10,
          question: "What types of reports can I generate?",
          answer:
            "You can generate attendance reports, grade reports, student progress reports, class summaries, and custom reports based on various criteria.",
        },
        {
          id: 11,
          question: "How do I export reports to Excel?",
          answer:
            'After generating any report, click the "Export" button and select Excel format. The file will be downloaded to your device automatically.',
        },
        {
          id: 12,
          question: "Can I schedule automatic reports?",
          answer:
            "Yes, go to Reports > Scheduled Reports to set up automatic generation and email delivery of reports on a daily, weekly, or monthly basis.",
        },
      ],
    },
  ]);

  // Guides data
  const guides = ref([
    {
      id: 1,
      title: "Getting Started Guide",
      description:
        "Learn the basics of navigating and using the school management system",
      difficulty: "Beginner",
      duration: "15 min",
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
      steps: [
        {
          title: "System Overview",
          description:
            "Familiarize yourself with the main dashboard and navigation menu. The dashboard provides quick access to key metrics and recent activities.",
        },
        {
          title: "User Profile Setup",
          description:
            "Complete your user profile by adding your photo, contact information, and preferences. This helps personalize your experience.",
        },
        {
          title: "Basic Navigation",
          description:
            "Learn how to navigate between different sections like Students, Classes, Attendance, and Reports using the main menu.",
        },
        {
          title: "Quick Actions",
          description:
            "Discover the quick action buttons that allow you to perform common tasks like adding students or marking attendance quickly.",
        },
      ],
    },
    {
      id: 2,
      title: "Student Registration",
      description: "Complete guide to adding and managing student records",
      difficulty: "Beginner",
      duration: "10 min",
      icon: UserPlus,
      gradient: "from-green-500 to-green-600",
      steps: [
        {
          title: "Access Student Section",
          description:
            "Navigate to the Students section from the main menu. This is where all student-related functions are located.",
        },
        {
          title: "Add New Student",
          description:
            'Click the "Add New Student" button and fill in the required information including personal details, contact information, and emergency contacts.',
        },
        {
          title: "Class Assignment",
          description:
            "Assign the student to appropriate classes and set their academic year. You can also add any special notes or requirements.",
        },
        {
          title: "Document Upload",
          description:
            "Upload important documents like birth certificates, previous school records, and medical information for complete student records.",
        },
      ],
    },
    {
      id: 3,
      title: "Attendance Management",
      description: "Master the attendance tracking and reporting features",
      difficulty: "Intermediate",
      duration: "20 min",
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
      steps: [
        {
          title: "Daily Attendance",
          description:
            "Learn how to mark daily attendance for classes, including handling late arrivals and early departures.",
        },
        {
          title: "Bulk Operations",
          description:
            "Use bulk operations to mark attendance for entire classes quickly, and learn about attendance patterns and trends.",
        },
        {
          title: "Attendance Reports",
          description:
            "Generate detailed attendance reports for individual students, classes, or school-wide statistics.",
        },
        {
          title: "Parent Notifications",
          description:
            "Set up automatic notifications to parents when students are absent or late, improving communication.",
        },
      ],
    },
    {
      id: 4,
      title: "Advanced Reporting",
      description: "Create custom reports and analytics for better insights",
      difficulty: "Advanced",
      duration: "30 min",
      icon: BarChart3,
      gradient: "from-orange-500 to-orange-600",
      steps: [
        {
          title: "Report Builder",
          description:
            "Use the advanced report builder to create custom reports with specific data fields and filters.",
        },
        {
          title: "Data Visualization",
          description:
            "Learn to create charts and graphs to visualize student performance, attendance trends, and other key metrics.",
        },
        {
          title: "Scheduled Reports",
          description:
            "Set up automated report generation and distribution to stakeholders on a regular schedule.",
        },
        {
          title: "Data Export",
          description:
            "Export data in various formats for external analysis or integration with other systems.",
        },
      ],
    },
    {
      id: 5,
      title: "System Administration",
      description: "Configure system settings and manage user permissions",
      difficulty: "Advanced",
      duration: "25 min",
      icon: Settings,
      gradient: "from-red-500 to-red-600",
      steps: [
        {
          title: "User Management",
          description:
            "Create and manage user accounts, assign roles and permissions, and set up access controls.",
        },
        {
          title: "System Configuration",
          description:
            "Configure school-specific settings like academic years, grading scales, and attendance policies.",
        },
        {
          title: "Data Backup",
          description:
            "Set up automated data backups and learn about data recovery procedures to protect important information.",
        },
        {
          title: "Security Settings",
          description:
            "Configure security settings including password policies, session timeouts, and audit logging.",
        },
      ],
    },
    {
      id: 6,
      title: "Parent Portal Setup",
      description: "Enable and configure parent access to student information",
      difficulty: "Intermediate",
      duration: "15 min",
      icon: Users,
      gradient: "from-teal-500 to-teal-600",
      steps: [
        {
          title: "Portal Activation",
          description:
            "Enable the parent portal feature and configure basic settings for parent access.",
        },
        {
          title: "Parent Account Creation",
          description:
            "Create parent accounts and link them to their children's student records for proper access control.",
        },
        {
          title: "Permission Settings",
          description:
            "Configure what information parents can view, including grades, attendance, and communication preferences.",
        },
        {
          title: "Communication Setup",
          description:
            "Set up automated notifications and messaging systems to keep parents informed about their child's progress.",
        },
      ],
    },
  ]);

  // Priority options
  const priorities = ref([
    { value: "low", label: "Low", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-red-600" },
  ]);

  // Search functionality
  const searchResults = computed(() => {
    if (!searchQuery.value) return [];

    const query = searchQuery.value.toLowerCase();
    const results = [];

    // Search in FAQs
    faqCategories.value.forEach((category) => {
      category.faqs.forEach((faq) => {
        if (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        ) {
          results.push({
            id: faq.id,
            title: faq.question,
            description: faq.answer.substring(0, 100) + "...",
            section: "faq-section",
          });
        }
      });
    });

    // Search in guides
    guides.value.forEach((guide) => {
      if (
        guide.title.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query)
      ) {
        results.push({
          id: guide.id,
          title: guide.title,
          description: guide.description,
          section: "guides-section",
        });
      }
    });

    return results;
  });

  // Methods
  const handleSearch = () => {
    // Search functionality is handled by computed property
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    searchQuery.value = "";
  };

  const handleQuickAction = (action) => {
    // Handle quick action clicks
    console.log("Quick action:", action.action);
    // You can implement navigation or modal opening here
  };

  const toggleFaq = (faqId) => {
    const index = openFaqs.value.indexOf(faqId);
    if (index > -1) {
      openFaqs.value.splice(index, 1);
    } else {
      openFaqs.value.push(faqId);
    }
  };

  const openGuide = (guide) => {
    selectedGuide.value = guide;
  };

  const submitSupportRequest = async () => {
    isSubmitting.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    supportForm.value = {
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      message: "",
    };

    isSubmitting.value = false;
    showSuccessModal.value = true;
  };
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  .prose {
    max-width: none;
  }

  .prose h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .prose p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* Custom scrollbar for modal */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Responsive improvements */
  @media (max-width: 640px) {
    .grid {
      gap: 1rem;
    }

    .p-6 {
      padding: 1rem;
    }

    .sm\:p-8 {
      padding: 1.5rem;
    }
  }
</style>

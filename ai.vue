<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
              circle at 25px 25px,
              #6366f1 2px,
              transparent 0
            ),
            radial-gradient(circle at 75px 75px, #8b5cf6 2px, transparent 0);
          background-size: 100px 100px;
        "
      ></div>
    </div>

    <!-- Chat Header -->
    <div
      class="relative bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div
              class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Bot class="w-7 h-7 text-white" />
            </div>
            <div
              class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full animate-pulse"
            ></div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg">EduBot AI</h3>
            <div class="flex items-center space-x-2">
              <div
                class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
              ></div>
              <p class="text-sm text-gray-600 font-medium">
                Online • Powered by AI
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
            :class="{ 'bg-gray-100': isDarkMode }"
          >
            <Moon
              v-if="!isDarkMode"
              class="w-5 h-5 text-gray-600"
            />
            <Sun
              v-else
              class="w-5 h-5 text-yellow-500"
            />
          </button>

          <!-- Settings -->
          <button
            class="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Settings class="w-5 h-5 text-gray-600" />
          </button>

          <!-- Close -->
          <button
            @click="toggleChat"
            class="p-2.5 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth"
      @scroll="handleScroll"
    >
      <!-- Welcome Screen -->
      <div
        v-if="messages.length === 0"
        class="text-center py-12 animate-fade-in"
      >
        <div
          class="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce-slow"
        >
          <Sparkles class="w-10 h-10 text-white" />
        </div>
        <h4
          class="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Welcome to EduBot AI! 🎓
        </h4>
        <p class="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
          Your intelligent school assistant is here to help with grades,
          schedules, assignments, and more!
        </p>

        <!-- Enhanced Quick Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div
            v-for="(action, index) in quickActions"
            :key="action.id"
            @click="sendQuickMessage(action.message)"
            class="group p-6 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl animate-slide-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center space-x-4">
              <div
                :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                  action.bgColor,
                ]"
              >
                <component
                  :is="action.icon"
                  :class="['w-6 h-6', action.iconColor]"
                />
              </div>
              <div class="text-left flex-1">
                <p class="font-semibold text-gray-900 mb-1">
                  {{ action.title }}
                </p>
                <p class="text-sm text-gray-600">{{ action.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        :class="[
          'flex animate-slide-up',
          message.sender === 'user' ? 'justify-end' : 'justify-start',
        ]"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <!-- Bot Avatar -->
        <div
          v-if="message.sender === 'bot'"
          class="flex-shrink-0 mr-3"
        >
          <div
            class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <Bot class="w-4 h-4 text-white" />
          </div>
        </div>

        <!-- Message Bubble -->
        <div
          :class="[
            'max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md',
            message.sender === 'user'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-12'
              : 'bg-white/80 backdrop-blur-sm border border-white/50 text-gray-900',
          ]"
        >
          <!-- Message Content -->
          <div v-if="message.type === 'text'">
            <p class="text-sm leading-relaxed whitespace-pre-line">
              {{ message.text }}
            </p>
          </div>

          <!-- Rich Card Message -->
          <div
            v-else-if="message.type === 'card'"
            class="space-y-3"
          >
            <p class="text-sm leading-relaxed">{{ message.text }}</p>
            <div
              v-if="message.card"
              class="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <h5 class="font-semibold text-gray-900 mb-2">
                {{ message.card.title }}
              </h5>
              <p class="text-sm text-gray-600 mb-3">
                {{ message.card.description }}
              </p>
              <div class="flex space-x-2">
                <button
                  v-for="button in message.card.buttons"
                  :key="button.text"
                  @click="sendQuickMessage(button.action)"
                  class="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-200 transition-colors"
                >
                  {{ button.text }}
                </button>
              </div>
            </div>
          </div>

          <!-- Timestamp and Status -->
          <div class="flex items-center justify-between mt-2">
            <p
              :class="[
                'text-xs',
                message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500',
              ]"
            >
              {{ formatTime(message.timestamp) }}
            </p>
            <div
              v-if="message.sender === 'user'"
              class="flex space-x-1"
            >
              <Check
                v-if="message.status === 'sent'"
                class="w-3 h-3 text-indigo-200"
              />
              <CheckCheck
                v-if="message.status === 'delivered'"
                class="w-3 h-3 text-indigo-200"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Typing Indicator -->
      <div
        v-if="isTyping"
        class="flex justify-start animate-slide-up"
      >
        <div class="flex-shrink-0 mr-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <Bot class="w-4 h-4 text-white" />
          </div>
        </div>
        <div
          class="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3 shadow-sm"
        >
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div
                class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              ></div>
              <div
                class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
            </div>
            <span class="text-xs text-gray-500 ml-2">EduBot is typing...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Quick Suggestions -->
    <div
      v-if="messages.length > 0 && suggestions.length > 0"
      class="px-6 py-3 bg-white/50 backdrop-blur-sm border-t border-white/20"
    >
      <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          v-for="(suggestion, index) in suggestions"
          :key="suggestion"
          @click="sendQuickMessage(suggestion)"
          class="flex-shrink-0 px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-white/50 rounded-full text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-md animate-slide-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>

    <!-- Enhanced Input Area -->
    <div
      class="bg-white/80 backdrop-blur-xl border-t border-white/20 px-6 py-4"
    >
      <div class="flex items-end space-x-3">
        <!-- Enhanced File Upload -->
        <div class="relative">
          <button
            @click="triggerFileUpload"
            class="p-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-105"
            :class="{ 'animate-pulse': isUploading }"
          >
            <Paperclip class="w-5 h-5" />
          </button>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileUpload"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>

        <!-- Enhanced Message Input -->
        <div class="flex-1 relative">
          <div class="relative">
            <textarea
              v-model="newMessage"
              @keydown.enter.prevent="handleEnterKey"
              @input="handleInput"
              ref="messageInput"
              placeholder="Ask me anything about your school..."
              class="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
              rows="1"
              :disabled="isTyping"
              maxlength="1000"
            ></textarea>

            <!-- Character Counter -->
            <div class="absolute bottom-2 right-12 text-xs text-gray-400">
              {{ newMessage.length }}/1000
            </div>

            <!-- Voice Input Button -->
            <button
              @click="toggleVoiceInput"
              class="absolute bottom-2 right-2 p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors"
              :class="{ 'text-red-500 animate-pulse': isListening }"
            >
              <Mic class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Enhanced Send Button -->
        <button
          @click="sendMessage"
          :disabled="!canSend"
          class="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
        >
          <Send class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl">
        <div class="flex items-center space-x-3">
          <div
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"
          ></div>
          <span class="text-gray-700 font-medium">Processing...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Bot,
    X,
    Sparkles,
    BookOpen,
    Calendar,
    Users,
    FileText,
    Send,
    Paperclip,
    Check,
    CheckCheck,
    Settings,
    Moon,
    Sun,
    Mic,
  } from "lucide-vue-next";

  export default {
    name: "ModernSchoolChatbot",
    components: {
      Bot,
      X,
      Sparkles,
      BookOpen,
      Calendar,
      Users,
      FileText,
      Send,
      Paperclip,
      Check,
      CheckCheck,
      Settings,
      Moon,
      Sun,
      Mic,
    },
    data() {
      return {
        messages: [],
        newMessage: "",
        isTyping: false,
        isLoading: false,
        isUploading: false,
        isListening: false,
        isDarkMode: false,
        suggestions: [],
        typingTimeout: null,
        quickActions: [
          {
            id: 1,
            title: "📊 Check Grades",
            description: "View your academic performance",
            icon: "BookOpen",
            message: "Show me my recent grades and GPA",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            id: 2,
            title: "📅 My Schedule",
            description: "Today's classes and events",
            icon: "Calendar",
            message: "What's my schedule for today?",
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            id: 3,
            title: "✅ Attendance",
            description: "Check attendance record",
            icon: "Users",
            message: "Show my attendance status",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
          },
          {
            id: 4,
            title: "📝 Assignments",
            description: "Pending tasks and deadlines",
            icon: "FileText",
            message: "What assignments do I have pending?",
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
          },
        ],
      };
    },
    computed: {
      canSend() {
        return this.newMessage.trim() && !this.isTyping && !this.isLoading;
      },
    },
    methods: {
      sendMessage() {
        if (!this.canSend) return;

        const userMessage = {
          id: Date.now(),
          text: this.newMessage.trim(),
          sender: "user",
          timestamp: new Date(),
          status: "sent",
          type: "text",
        };

        this.messages.push(userMessage);
        this.newMessage = "";
        this.adjustTextareaHeight();
        this.scrollToBottom();

        // Update message status
        setTimeout(() => {
          userMessage.status = "delivered";
        }, 500);

        this.simulateBotResponse(userMessage.text);
      },

      sendQuickMessage(message) {
        this.newMessage = message;
        this.sendMessage();
      },

      simulateBotResponse(userMessage) {
        this.isTyping = true;
        this.suggestions = [];

        // Simulate realistic typing delay
        const typingDelay = Math.random() * 2000 + 1500;

        setTimeout(() => {
          const botResponse = this.generateEnhancedBotResponse(userMessage);

          this.messages.push({
            id: Date.now(),
            ...botResponse,
            sender: "bot",
            timestamp: new Date(),
          });

          this.suggestions = botResponse.suggestions || [];
          this.isTyping = false;
          this.scrollToBottom();
        }, typingDelay);
      },

      generateEnhancedBotResponse(userMessage) {
        const message = userMessage.toLowerCase();

        if (message.includes("grade")) {
          return {
            type: "card",
            text: "Here's your current academic performance! 🎯",
            card: {
              title: "Academic Performance Summary",
              description: "Overall GPA: 3.8/4.0 • Rank: 15/120",
              buttons: [
                {
                  text: "Detailed Report",
                  action: "Show detailed grade breakdown",
                },
                {
                  text: "Compare Semester",
                  action: "Compare with last semester",
                },
              ],
            },
            suggestions: [
              "Show subject-wise grades",
              "Check assignment scores",
              "View grade trends",
            ],
          };
        } else if (message.includes("schedule")) {
          return {
            type: "card",
            text: "Here's your schedule for today! 📅",
            card: {
              title: "Today's Classes - Monday, Dec 4",
              description: "5 classes • Next: Mathematics in 45 mins",
              buttons: [
                {
                  text: "Full Schedule",
                  action: "Show complete weekly schedule",
                },
                { text: "Set Reminder", action: "Set class reminders" },
              ],
            },
            suggestions: [
              "Tomorrow's schedule",
              "This week's events",
              "Exam schedule",
            ],
          };
        } else if (message.includes("attendance")) {
          return {
            type: "card",
            text: "Your attendance is looking great! ✨",
            card: {
              title: "Attendance Summary",
              description: "90% Present • 45/50 days • Excellent standing",
              buttons: [
                { text: "View Details", action: "Show detailed attendance" },
                { text: "Request Leave", action: "Apply for leave" },
              ],
            },
            suggestions: [
              "Monthly attendance",
              "Attendance policy",
              "Leave balance",
            ],
          };
        } else if (message.includes("assignment")) {
          return {
            type: "card",
            text: "You have 3 pending assignments 📚",
            card: {
              title: "Pending Assignments",
              description: "2 due this week • 1 overdue",
              buttons: [
                { text: "View All", action: "Show all assignments" },
                { text: "Submit Work", action: "Submit assignment" },
              ],
            },
            suggestions: [
              "Assignment calendar",
              "Submission guidelines",
              "Request extension",
            ],
          };
        } else {
          return {
            type: "text",
            text: "I'm here to help with all your school needs! 🤖\n\nI can assist you with:\n• 📊 Academic grades and progress\n• 📅 Class schedules and timetables\n• ✅ Attendance tracking\n• 📝 Assignment management\n• 🏫 School events and news\n• 💰 Fee payments and receipts\n\nWhat would you like to explore?",
            suggestions: [
              "Check my grades",
              "Show today's schedule",
              "Attendance status",
              "Pending assignments",
            ],
          };
        }
      },

      handleInput() {
        this.adjustTextareaHeight();

        // Clear existing timeout
        if (this.typingTimeout) {
          clearTimeout(this.typingTimeout);
        }

        // Debounce input handling
        this.typingTimeout = setTimeout(() => {
          // Handle smart suggestions or auto-complete here
        }, 300);
      },

      handleEnterKey(event) {
        if (!event.shiftKey) {
          this.sendMessage();
        }
      },

      adjustTextareaHeight() {
        this.$nextTick(() => {
          const textarea = this.$refs.messageInput;
          if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
          }
        });
      },

      scrollToBottom() {
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "smooth",
            });
          }
        });
      },

      handleScroll() {
        // Handle infinite scroll or load more messages
      },

      formatTime(timestamp) {
        return timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },

      triggerFileUpload() {
        this.$refs.fileInput.click();
      },

      async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.isUploading = true;

        try {
          // Simulate file upload
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const fileMessage = {
            id: Date.now(),
            text: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(
              1
            )} KB)`,
            sender: "user",
            timestamp: new Date(),
            status: "sent",
            type: "text",
          };

          this.messages.push(fileMessage);
          this.scrollToBottom();

          // Bot response
          setTimeout(() => {
            this.messages.push({
              id: Date.now() + 1,
              text: "Perfect! I've received your file. 📄\n\nI can help you with:\n• Document analysis\n• Assignment feedback\n• Content review\n• Format checking\n\nWhat would you like me to do with this file?",
              sender: "bot",
              timestamp: new Date(),
              type: "text",
            });
            this.suggestions = [
              "Analyze content",
              "Check format",
              "Provide feedback",
              "Save to portfolio",
            ];
            this.scrollToBottom();
          }, 1000);
        } catch (error) {
          console.error("File upload error:", error);
        } finally {
          this.isUploading = false;
        }
      },

      toggleVoiceInput() {
        this.isListening = !this.isListening;
        // Implement voice recognition here
        if (this.isListening) {
          setTimeout(() => {
            this.isListening = false;
          }, 3000);
        }
      },

      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        // Implement dark mode logic
      },

      toggleChat() {
        this.$emit("close-chat");
      },
    },

    mounted() {
      this.$nextTick(() => {
        this.$refs.messageInput?.focus();
      });
    },

    beforeUnmount() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
    },
  };
</script>

<style scoped>
  /* Custom Animations */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce-slow {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
    opacity: 0;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s infinite;
  }

  /* Custom Scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }

  /* Smooth Transitions */
  * {
    transition-property: color, background-color, border-color, transform,
      opacity, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Glassmorphism Effects */
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
  }

  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  /* Enhanced Focus States */
  textarea:focus,
  input:focus {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  /* Hover Effects */
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }

  .hover\:scale-110:hover {
    transform: scale(1.1);
  }

  /* Mobile Optimizations */
  @media (max-width: 640px) {
    .px-6 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .py-6 {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  }
</style>

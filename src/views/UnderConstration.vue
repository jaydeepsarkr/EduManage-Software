<template>
  <!-- Chat Widget Container -->
  <div class="fixed bottom-4 right-4 z-50 font-sans">
    <!-- Minimized Chat Button -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="scale-0 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-0 opacity-0"
    >
      <button
        v-if="!isOpen"
        @click="toggleChat"
        class="group relative w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-200"
      >
        <!-- Chat Icon -->
        <div class="flex items-center justify-center w-full h-full">
          <MessageCircle
            class="w-7 h-7 text-white transition-transform group-hover:scale-110"
          />
        </div>

        <!-- Notification Badge -->
        <div
          v-if="unreadCount > 0"
          class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span class="text-white text-xs font-bold">{{
            unreadCount > 9 ? "9+" : unreadCount
          }}</span>
        </div>

        <!-- Pulse Animation -->
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-ping opacity-20"
        ></div>

        <!-- Tooltip -->
        <div
          class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          Need help? Chat with EduBot!
          <div
            class="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"
          ></div>
        </div>
      </button>
    </transition>

    <!-- Expanded Chat Interface -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="scale-95 opacity-0 translate-y-4"
      enter-to-class="scale-100 opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="scale-100 opacity-100 translate-y-0"
      leave-to-class="scale-95 opacity-0 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
        :class="{ 'w-full h-full fixed inset-4': isMobile && isOpen }"
      >
        <!-- Chat Header -->
        <div
          class="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 flex items-center justify-between"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bot class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="text-white font-semibold text-sm">EduBot Assistant</h3>
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span class="text-white/80 text-xs">Online</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-1">
            <!-- Minimize Button -->
            <button
              @click="toggleChat"
              class="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Minimize2 class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
        >
          <!-- Welcome Message -->
          <div
            v-if="messages.length === 0"
            class="text-center py-6"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <Sparkles class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Hi there! 👋</h4>
            <p class="text-gray-600 text-sm mb-4">
              I'm your school assistant. How can I help you today?
            </p>

            <!-- Quick Actions -->
            <div class="space-y-2">
              <button
                v-for="action in quickActions"
                :key="action.id"
                @click="sendQuickMessage(action.message)"
                class="w-full p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{{ action.emoji }}</span>
                  <span class="text-sm text-gray-700">{{ action.title }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Chat Messages -->
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'user' ? 'justify-end' : 'justify-start',
            ]"
          >
            <!-- Bot Avatar -->
            <div
              v-if="message.sender === 'bot'"
              class="flex-shrink-0 mr-2"
            >
              <div
                class="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Bot class="w-3 h-3 text-white" />
              </div>
            </div>

            <!-- Message Bubble -->
            <div
              :class="[
                'max-w-xs px-3 py-2 rounded-2xl text-sm',
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md',
              ]"
            >
              <p class="leading-relaxed">{{ message.text }}</p>
              <p
                :class="[
                  'text-xs mt-1',
                  message.sender === 'user'
                    ? 'text-indigo-200'
                    : 'text-gray-500',
                ]"
              >
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div
            v-if="isTyping"
            class="flex justify-start"
          >
            <div class="flex-shrink-0 mr-2">
              <div
                class="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Bot class="w-3 h-3 text-white" />
              </div>
            </div>
            <div
              class="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2"
            >
              <div class="flex space-x-1">
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                ></div>
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.1s"
                ></div>
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Suggestions -->
        <div
          v-if="suggestions.length > 0"
          class="px-4 py-2 bg-white border-t border-gray-100"
        >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="suggestion in suggestions.slice(0, 3)"
              :key="suggestion"
              @click="sendQuickMessage(suggestion)"
              class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-3 bg-white border-t border-gray-100">
          <div class="flex items-center space-x-2">
            <div class="flex-1 relative">
              <input
                v-model="newMessage"
                @keydown.enter="sendMessage"
                type="text"
                placeholder="Type your message..."
                class="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                :disabled="isTyping"
                maxlength="500"
              />
            </div>
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim() || isTyping"
              class="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Backdrop -->
    <div
      v-if="isOpen && isMobile"
      @click="toggleChat"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
    ></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
  import {
    MessageCircle,
    Bot,
    Minimize2,
    Sparkles,
    Send,
  } from "lucide-vue-next";
  import axios from "axios";

  // DeepSeek API key (add this in your .env file)
  const API_KEY = process.env.VUE_APP_DEEPSEEK_API_KEY;

  console.log("DeepSeek Key:", API_KEY); // should start with sk-af5...

  // Refs and reactive state
  const isOpen = ref(false);
  const messages = ref([]);
  const newMessage = ref("");
  const isTyping = ref(false);
  const unreadCount = ref(0);
  const suggestions = ref([]);
  const isMobile = ref(false);
  const messagesContainer = ref(null);

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: "Check my grades",
      emoji: "📊",
      message: "Show me my recent grades",
    },
    {
      id: 2,
      title: "Today's schedule",
      emoji: "📅",
      message: "What's my schedule for today?",
    },
    {
      id: 3,
      title: "Attendance status",
      emoji: "✅",
      message: "Check my attendance record",
    },
    {
      id: 4,
      title: "Pending assignments",
      emoji: "📝",
      message: "Show my pending assignments",
    },
  ];

  // Methods
  const toggleChat = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      unreadCount.value = 0;
      scrollToBottom();
    }
  };

  const sendMessage = () => {
    if (!newMessage.value.trim() || isTyping.value) return;

    const userMsg = {
      id: Date.now(),
      text: newMessage.value.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    messages.value.push(userMsg);
    newMessage.value = "";
    scrollToBottom();
    fetchDeepSeekResponse(userMsg.text);
  };

  const sendQuickMessage = (msg) => {
    newMessage.value = msg;
    sendMessage();
  };

  const fetchDeepSeekResponse = async (userText) => {
    isTyping.value = true;
    suggestions.value = [];

    try {
      const res = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a helpful school assistant chatbot.",
            },
            { role: "user", content: userText },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const botText = res.data.choices?.[0]?.message?.content?.trim();

      messages.value.push({
        id: Date.now(),
        text: botText || "⚠️ Sorry, I couldn't understand that.",
        sender: "bot",
        timestamp: new Date(),
      });

      if (!isOpen.value) {
        unreadCount.value++;
      }
    } catch (err) {
      console.error("DeepSeek Error:", err);
      messages.value.push({
        id: Date.now(),
        text: "⚠️ Something went wrong. Try again later.",
        sender: "bot",
        timestamp: new Date(),
      });
    } finally {
      isTyping.value = false;
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 640;
  };

  const handleResize = () => {
    checkMobile();
  };

  // Lifecycle hooks
  onMounted(() => {
    checkMobile();
    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      if (!isOpen.value) {
        unreadCount.value = 1;
      }
    }, 3000);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>

<style scoped>
  /* Custom Animations */
  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  .animate-bounce {
    animation: bounce 1.4s infinite ease-in-out both;
  }

  /* Custom Scrollbar for Messages */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }

  /* Smooth Transitions */
  * {
    transition-property: color, background-color, border-color, transform,
      opacity, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Mobile Optimizations */
  @media (max-width: 640px) {
    .fixed.bottom-4.right-4 {
      bottom: 1rem;
      right: 1rem;
    }
  }

  /* Focus States */
  input:focus,
  button:focus {
    outline: none;
  }

  /* Hover Effects */
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }

  .hover\:scale-110:hover {
    transform: scale(1.1);
  }

  /* Pulse Animation */
  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
</style>

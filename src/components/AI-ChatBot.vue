<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen && isMobile"
      class="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto"
      @click="toggleChat"
    ></div>

    <!-- Chat Widget Container -->
    <div
      class="absolute pointer-events-auto transition-all duration-300 ease-in-out"
      :class="chatContainerClasses"
    >
      <div
        class="bg-white rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden h-full flex flex-col"
        :class="{ 'bg-gray-800 border-gray-600': isDark }"
        v-if="isOpen"
      >
        <!-- Chat Header -->
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between flex-shrink-0"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">EduBot Assistant</h3>
              <div class="flex items-center space-x-2">
                <div
                  class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                ></div>
                <p class="text-sm text-blue-100">Online now</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="toggleTheme"
              class="p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"
              :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <svg
                v-if="isDark"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button
              @click="toggleChat"
              class="p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"
              title="Close chat"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Actions -->
        <!-- <div
          class="p-4 bg-gray-50 border-b flex-shrink-0"
          :class="{ 'bg-gray-700 border-gray-600': isDark }"
        >
          <h4
            class="text-sm font-medium text-gray-600 mb-3"
            :class="{ 'text-gray-300': isDark }"
          >
            Quick Actions
          </h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="action in quickActions.slice(0, 6)"
              :key="action.id"
              @click="sendQuickAction(action.message)"
              class="flex items-center justify-center space-x-2 px-3 py-3 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-xl text-sm font-medium text-blue-700 transition-all duration-200 touch-manipulation"
              :class="{
                'bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-blue-200':
                  isDark,
              }"
            >
              <span class="text-lg">{{ action.icon }}</span>
              <span class="hidden sm:inline">{{ action.label }}</span>
              <span class="sm:hidden text-xs">{{ action.shortLabel }}</span>
            </button>
          </div>
        </div> -->

        <!-- Chat Messages -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-0"
          :class="{ 'bg-gray-800': isDark }"
          @scroll="handleScroll"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex animate-slide-in"
            :class="message.isUser ? 'justify-end' : 'justify-start'"
          >
            <div class="flex items-start space-x-3 max-w-[85%] sm:max-w-xs">
              <!-- Bot Avatar -->
              <div
                v-if="!message.isUser"
                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Message Content -->
              <div class="flex flex-col flex-1">
                <div
                  class="px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed"
                  :class="
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                      : isDark
                      ? 'bg-gray-700 text-gray-100 rounded-bl-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  "
                >
                  <p class="whitespace-pre-wrap break-words">
                    {{ message.content }}
                  </p>

                  <!-- Image Display -->
                  <div
                    v-if="message.image"
                    class="mt-3"
                  >
                    <img
                      :src="message.image"
                      alt="Generated image"
                      class="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                      @click="openImageModal(message.image)"
                    />
                  </div>
                </div>

                <!-- Timestamp -->
                <div
                  class="text-xs text-gray-500 mt-2 px-2"
                  :class="{ 'text-gray-400': isDark }"
                >
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>

              <!-- User Avatar -->
              <div
                v-if="message.isUser"
                class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div
            v-if="isTyping"
            class="flex justify-start animate-slide-in"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div
                class="rounded-2xl rounded-bl-md px-4 py-3"
                :class="isDark ? 'bg-gray-700' : 'bg-gray-100'"
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
        </div>

        <!-- Scroll to Bottom Button -->
        <button
          v-if="showScrollButton"
          @click="scrollToBottom"
          class="absolute right-4 bottom-20 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 touch-manipulation"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        <!-- Input Area -->
        <div
          class="p-4 bg-gray-50 border-t flex-shrink-0"
          :class="{ 'bg-gray-700 border-gray-600': isDark }"
        >
          <div class="flex items-end space-x-3">
            <!-- Voice Button -->
            <button
              @click="toggleVoiceInput"
              class="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors touch-manipulation flex-shrink-0"
              :class="{
                'text-gray-400 hover:text-blue-400 hover:bg-gray-600': isDark,
                'bg-red-100 text-red-600': isListening,
              }"
              :title="isListening ? 'Stop listening' : 'Voice input'"
            >
              <svg
                v-if="!isListening"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <div
                v-else
                class="w-5 h-5 bg-red-500 rounded-full animate-pulse"
              ></div>
            </button>

            <!-- Message Input -->
            <div class="flex-1 relative">
              <textarea
                ref="messageInput"
                v-model="currentMessage"
                @keydown="handleKeyDown"
                @input="handleInput"
                :disabled="isTyping"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none touch-manipulation"
                :class="{
                  'bg-gray-600 border-gray-500 text-white placeholder-gray-400':
                    isDark,
                  'opacity-50 cursor-not-allowed': isTyping,
                  'border-red-300 focus:ring-red-500': isListening,
                }"
                :rows="textareaRows"
                maxlength="500"
              ></textarea>

              <!-- Character Counter -->
              <div
                v-if="currentMessage.length > 400"
                class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full"
                :class="
                  currentMessage.length >= 500
                    ? 'bg-red-100 text-red-600'
                    : 'bg-yellow-100 text-yellow-600'
                "
              >
                {{ currentMessage.length }}/500
              </div>
            </div>

            <!-- Send Button -->
            <button
              @click="sendMessage"
              :disabled="
                !currentMessage.trim() ||
                isTyping ||
                currentMessage.length > 500
              "
              class="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 touch-manipulation flex-shrink-0"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Toggle Button -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="fixed bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group touch-manipulation pointer-events-auto"
    >
      <div class="relative">
        <svg
          class="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <!-- Notification Badge -->
        <div
          v-if="hasNewMessage"
          class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center"
        >
          <span class="text-xs text-white font-bold">{{ unreadCount }}</span>
        </div>
      </div>
    </button>

    <!-- Welcome Tooltip -->
    <div
      v-if="!isOpen && !hasInteracted && !isMobile"
      class="fixed bottom-20 right-4 bg-white rounded-xl shadow-xl p-4 max-w-xs animate-bounce-gentle pointer-events-auto"
      :class="{ 'bg-gray-800 text-white': isDark }"
    >
      <div class="flex items-center space-x-2 mb-2">
        <span class="text-2xl">👋</span>
        <div class="font-semibold">Hi! I'm EduBot</div>
      </div>
      <div
        class="text-sm text-gray-600 mb-3"
        :class="{ 'text-gray-300': isDark }"
      >
        Ask me about grades, schedules, assignments, or school info!
      </div>
      <button
        @click="toggleChat"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
      >
        Start Chat
      </button>
      <div
        class="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"
        :class="{ 'bg-gray-800': isDark }"
      ></div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="imageModal.show"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 pointer-events-auto p-4"
      @click="closeImageModal"
    >
      <div class="relative max-w-full max-h-full">
        <img
          :src="imageModal.src"
          alt="Full size image"
          class="max-w-full max-h-full rounded-lg"
        />
        <button
          @click="closeImageModal"
          class="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, nextTick, watch, computed, onUnmounted } from "vue";

  export default {
    name: "ChatWidget",
    setup() {
      // Reactive data
      const isOpen = ref(false);
      const messages = ref([]);
      const currentMessage = ref("");
      const isTyping = ref(false);
      const isDark = ref(false);
      const chatContainer = ref(null);
      const messageInput = ref(null);
      const hasNewMessage = ref(false);
      const hasInteracted = ref(false);
      const unreadCount = ref(0);
      const showScrollButton = ref(false);
      const isListening = ref(false);
      const isMobile = ref(false);
      const imageModal = ref({ show: false, src: "" });

      // Quick actions for school management
      const quickActions = ref([
        {
          id: 1,
          label: "Grades",
          shortLabel: "Grades",
          message: "Show my current grades and academic performance",
          icon: "📊",
        },
        {
          id: 2,
          label: "Schedule",
          shortLabel: "Schedule",
          message: "What's my class schedule for today?",
          icon: "📅",
        },
        {
          id: 3,
          label: "Assignments",
          shortLabel: "Tasks",
          message: "Show my pending assignments and homework",
          icon: "📝",
        },
        {
          id: 4,
          label: "Teachers",
          shortLabel: "Teachers",
          message: "Show my teachers contact information",
          icon: "👨‍🏫",
        },
        {
          id: 5,
          label: "News",
          shortLabel: "News",
          message: "Any new school announcements or important updates?",
          icon: "📢",
        },
        {
          id: 6,
          label: "Generate",
          shortLabel: "Image",
          message: "/image Create a study motivation poster",
          icon: "🎨",
        },
      ]);

      // API URLs
      const API_URLS = {
        chat: "https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==",
        image:
          "https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==",
      };

      // Computed properties
      const textareaRows = computed(() => {
        const lines = currentMessage.value.split("\n").length;
        return Math.min(Math.max(lines, 1), 4);
      });

      const chatContainerClasses = computed(() => {
        if (isMobile.value) {
          return isOpen.value
            ? "bottom-0 left-0 right-0 top-20"
            : "bottom-4 right-4 w-14 h-14";
        } else {
          return isOpen.value
            ? "bottom-4 right-4 w-96 h-[32rem]"
            : "bottom-4 right-4 w-14 h-14";
        }
      });

      // Methods
      const checkMobile = () => {
        isMobile.value = window.innerWidth < 640;
      };

      const toggleChat = () => {
        isOpen.value = !isOpen.value;
        hasInteracted.value = true;
        if (isOpen.value) {
          hasNewMessage.value = false;
          unreadCount.value = 0;
          nextTick(() => {
            scrollToBottom();
            if (messageInput.value) {
              messageInput.value.focus();
            }
          });
        }
      };

      const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      };

      const handleInput = () => {
        // Auto-resize textarea is handled by computed property
      };

      const handleScroll = () => {
        if (chatContainer.value) {
          const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
          showScrollButton.value =
            scrollHeight - scrollTop - clientHeight > 100;
        }
      };

      const sendMessage = async () => {
        if (
          !currentMessage.value.trim() ||
          isTyping.value ||
          currentMessage.value.length > 500
        )
          return;

        const userMessage = {
          id: Date.now(),
          content: currentMessage.value,
          isUser: true,
          timestamp: new Date(),
        };

        messages.value.push(userMessage);
        const messageToProcess = currentMessage.value;
        currentMessage.value = "";

        await scrollToBottom();

        // Show typing indicator
        isTyping.value = true;

        try {
          const response = await callApi(messageToProcess);
          messages.value.push(response);

          // Show notification if chat is closed
          if (!isOpen.value) {
            hasNewMessage.value = true;
            unreadCount.value++;
          }
        } catch (error) {
          console.error("Error:", error);
          messages.value.push({
            id: Date.now() + 1,
            content: "Sorry, I encountered an error. Please try again.",
            isUser: false,
            timestamp: new Date(),
          });
        } finally {
          isTyping.value = false;
          await scrollToBottom();
        }
      };

      const sendQuickAction = (message) => {
        currentMessage.value = message;
        sendMessage();
      };

      const callApi = async (prompt) => {
        const isImageRequest = prompt.toLowerCase().startsWith("/image");
        const apiUrl = isImageRequest ? API_URLS.image : API_URLS.chat;

        // eslint-disable-next-line no-useless-catch
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          });

          const data = await response.json();

          if (data.status === "success") {
            const responseMessage = {
              id: Date.now() + 1,
              content: data.text || "Here's your response:",
              isUser: false,
              timestamp: new Date(),
            };

            // If it's an image response and has image URL
            if (isImageRequest && data.image_url) {
              responseMessage.image = data.image_url;
              responseMessage.content = "Here's your generated image:";
            }

            return responseMessage;
          } else {
            throw new Error("API returned error status");
          }
        } catch (error) {
          throw error;
        }
      };

      const scrollToBottom = async () => {
        await nextTick();
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
          showScrollButton.value = false;
        }
      };

      const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      const toggleTheme = () => {
        isDark.value = !isDark.value;
        localStorage.setItem("edubot-dark-mode", isDark.value);
      };

      const toggleVoiceInput = () => {
        if (
          !("webkitSpeechRecognition" in window) &&
          !("SpeechRecognition" in window)
        ) {
          alert("Speech recognition is not supported in your browser.");
          return;
        }

        if (isListening.value) {
          // Stop listening
          isListening.value = false;
        } else {
          // Start listening
          isListening.value = true;
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();

          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = "en-US";

          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            currentMessage.value = transcript;
            isListening.value = false;
          };

          recognition.onerror = () => {
            isListening.value = false;
          };

          recognition.onend = () => {
            isListening.value = false;
          };

          recognition.start();
        }
      };

      const openImageModal = (src) => {
        imageModal.value = { show: true, src };
      };

      const closeImageModal = () => {
        imageModal.value = { show: false, src: "" };
      };

      // Initialize
      onMounted(() => {
        // Check mobile
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Load theme preference
        const savedTheme = localStorage.getItem("edubot-dark-mode");
        if (savedTheme !== null) {
          isDark.value = JSON.parse(savedTheme);
        }

        // Welcome message
        messages.value.push({
          id: 1,
          content: `Hi! I'm EduBot 🎓

I can help you with:
📊 Grades & academic performance
📅 Class schedules & timetables
📝 Assignments & homework
👨‍🏫 Teacher contact information
📢 School announcements & news
🎨 Generate educational images (use '/image')

What would you like to know about your school?`,
          isUser: false,
          timestamp: new Date(),
        });

        // Auto-hide welcome tooltip after 8 seconds
        setTimeout(() => {
          if (!hasInteracted.value) {
            hasInteracted.value = true;
          }
        }, 8000);
      });

      onUnmounted(() => {
        window.removeEventListener("resize", checkMobile);
      });

      // Watch for new messages to scroll
      watch(
        messages,
        () => {
          if (isOpen.value) {
            nextTick(() => {
              scrollToBottom();
            });
          }
        },
        { deep: true }
      );

      return {
        isOpen,
        messages,
        currentMessage,
        isTyping,
        isDark,
        chatContainer,
        messageInput,
        hasNewMessage,
        hasInteracted,
        unreadCount,
        showScrollButton,
        isListening,
        isMobile,
        imageModal,
        quickActions,
        textareaRows,
        chatContainerClasses,
        toggleChat,
        handleKeyDown,
        handleInput,
        handleScroll,
        sendMessage,
        sendQuickAction,
        scrollToBottom,
        formatTime,
        toggleTheme,
        toggleVoiceInput,
        openImageModal,
        closeImageModal,
      };
    },
  };
</script>

<style scoped>
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }

  /* Touch manipulation */
  .touch-manipulation {
    touch-action: manipulation;
  }

  /* Animations */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounceGentle {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .animate-slide-in {
    animation: slideIn 0.4s ease-out;
  }

  .animate-bounce-gentle {
    animation: bounceGentle 3s infinite;
  }

  /* Shadow utilities */
  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }

  /* Hover and active states */
  .transform {
    transition: transform 0.2s ease-in-out;
  }

  .hover\:scale-105:hover {
    transform: scale(1.05);
  }

  .hover\:scale-110:hover {
    transform: scale(1.1);
  }

  .active\:scale-95:active {
    transform: scale(0.95);
  }

  /* Focus styles */
  .focus\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .focus\:ring-2:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }

  .focus\:ring-blue-500:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
  }

  .focus\:ring-red-500:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(239 68 68 / var(--tw-ring-opacity));
  }

  .focus\:border-transparent:focus {
    border-color: transparent;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .animate-bounce-gentle {
      display: none;
    }
  }

  /* Prevent zoom on input focus on iOS */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    select,
    textarea,
    input[type="text"],
    input[type="password"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="date"],
    input[type="month"],
    input[type="time"],
    input[type="week"],
    input[type="number"],
    input[type="email"],
    input[type="url"],
    input[type="search"],
    input[type="tel"],
    input[type="color"] {
      font-size: 16px;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .bg-gradient-to-r {
      background: #1e40af !important;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .animate-slide-in,
    .animate-bounce-gentle,
    .animate-bounce,
    .animate-pulse {
      animation: none;
    }

    .transition-all,
    .transition-colors,
    .transition-transform {
      transition: none;
    }
  }
</style>

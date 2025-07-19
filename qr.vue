<template>
  <!-- NFC Scan Simulator -->
  <div class="bg-white rounded-2xl shadow-xl border border-white/20 p-6">
    <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
      NFC Scanner
    </h3>
    <div class="text-center">
      <div
        :class="[
          'w-36 h-36 mx-auto rounded-full border-4 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300',
          isScanning
            ? 'border-blue-500 bg-blue-50 animate-pulse-strong'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50',
        ]"
        @click="simulateNFCScan"
      >
        <div class="text-center">
          <Smartphone class="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p class="text-sm text-gray-600 font-medium">
            {{ isScanning ? "Scanning..." : "Tap to Scan" }}
          </p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-3">
        NFC Reader Status: {{ nfcStatus }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { useStore } from "vuex";
  import { Smartphone } from "lucide-vue-next";

  const store = useStore();

  // Reactive data

  const isScanning = ref(false);
  const nfcStatus = ref("Ready");

  // New reactive data for filters and pagination
  const searchQuery = ref("");
  const selectedDate = ref(new Date().toISOString().split("T")[0]); // Default to today
  const currentPage = ref(1);
  const itemsPerPage = ref(6); // Adjusted for grid layout

  // Loading states
  const isTableLoading = ref(false); // For data fetching in the main table/grid
  const isSearching = ref(false); // For search input debounce spinner

  // Summary statistics based on currently displayed teachers

  // Filtered teachers (client-side filter based on activeFilter)

  const simulateNFCScan = () => {
    isScanning.value = true;
    nfcStatus.value = "Scanning...";
    setTimeout(() => {
      isScanning.value = false;
      nfcStatus.value = "Scan Complete";
      setTimeout(() => {
        nfcStatus.value = "Ready";
      }, 2000);
    }, 2000);
  };

  // Fetch teachers data from Vuex store
  const fetchTeachersData = async (page = currentPage.value) => {
    isTableLoading.value = true;
    try {
      currentPage.value = page;
      await store.dispatch("fetchTeachers", {
        page: currentPage.value,
        limit: itemsPerPage.value,
        search: searchQuery.value.trim(),
        date: selectedDate.value, // Pass the selected date to the backend
      });
    } catch (error) {
      console.error("Error fetching teachers for dashboard:", error);
      // Optionally show a toast notification for error
    } finally {
      isTableLoading.value = false;
      isSearching.value = false; // Reset search spinner
    }
  };

  // Watchers for filters
  let searchTimeout = null;
  watch(searchQuery, () => {
    clearTimeout(searchTimeout);
    isSearching.value = true; // Show spinner immediately
    searchTimeout = setTimeout(() => {
      fetchTeachersData(1); // Reset to page 1 on new search
    }, 300); // Debounce search input
  });

  watch(selectedDate, () => {
    fetchTeachersData(1); // Reset to page 1 on date change
  });

  // Lifecycle hooks
  onMounted(() => {
    fetchTeachersData(); // Initial fetch on mount
  });

  // No need for timeInterval as current time/date are not displayed in this component
  // onUnmounted(() => {
  //   if (timeInterval) {
  //     clearInterval(timeInterval);
  //   }
  // });
</script>

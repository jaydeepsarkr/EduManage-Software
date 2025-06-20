<template>
  <h1></h1>
</template>

<script>
  export default {};
</script>

<style scoped>
  .search-overlay-enter-active,
  .search-overlay-leave-active {
    transition: all 0.3s ease;
  }

  .search-overlay-enter-from,
  .search-overlay-leave-to {
    opacity: 0;
  }

  /* Search panel transitions */
  .search-panel-enter-active,
  .search-panel-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .search-panel-enter-from,
  .search-panel-leave-to {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  /* Calendar dropdown transitions */
  .calendar-dropdown-enter-active,
  .calendar-dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .calendar-dropdown-enter-from,
  .calendar-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }

  /* Dropdown transitions */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>

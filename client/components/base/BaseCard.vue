<script setup>
// We use 'props' to make the card dynamic
defineProps({
  hover: {
    type: Boolean,
    default: true,
  },
  padding: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    class="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
    :class="[
      hover
        ? 'hover:shadow-xl hover:-translate-y-1 hover:border-maedot-gold/50'
        : 'shadow-sm',
      padding ? 'p-6' : 'p-0',
    ]"
  >
    <!-- Slot for any content you want to put inside the card -->
    <slot />
  </div>
</template>

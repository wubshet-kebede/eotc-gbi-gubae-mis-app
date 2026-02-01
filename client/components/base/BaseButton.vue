<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  type: { type: String, default: "button" },
  icon: { type: String, default: null },
  trailingIcon: { type: String, default: null },
  loading: Boolean,
  disabled: Boolean,
  block: Boolean,
});

// Logic to keep icons sized correctly relative to the button size
const iconSize = computed(() => {
  if (props.size === "sm") return "w-3.5 h-3.5";
  if (props.size === "lg") return "w-5 h-5";
  return "w-4 h-4"; // md default
});

const variantClasses = {
  primary: "bg-maedot-navy text-white hover:bg-slate-800 shadow-sm",
  secondary:
    "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
};
</script>
<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2"
    :class="[variantClasses[variant], sizeClasses[size], block ? 'w-full' : '']"
  >
    <!-- LOADING STATE  -->
    <Icon
      v-if="loading"
      name="lucide:loader-2"
      class="animate-spin"
      :class="iconSize"
    />
    <Icon v-if="!loading && icon" :name="icon" :class="iconSize" />

    <!-- button text will be appeared here  -->
    <slot />

    <!-- trailing icon fro enter and the like  -->
    <Icon
      v-if="!loading && trailingIcon"
      :name="trailingIcon"
      :class="iconSize"
    />
  </button>
</template>

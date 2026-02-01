<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  icon: String, // icon name here
  size: { type: String, default: "md" },
});

defineEmits(["update:modelValue"]);

const sizeClasses = {
  sm: "py-2 text-sm",
  md: "py-3 text-base",
  lg: "py-4 text-lg",
};
</script>

<template>
  <div class="w-full space-y-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="$.uid"
      class="block text-sm font-medium text-slate-700 ml-1"
    >
      {{ label }}
    </label>

    <div class="relative group">
      <!-- Leading Icon (Left) -->
      <div
        v-if="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-maedot-navy transition-colors"
      >
        <Icon :name="icon" class="w-5 h-5" />
      </div>

      <!-- Input Field -->
      <input
        :id="$.uid"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="w-full bg-white border border-slate-200 text-slate-900 rounded-xl transition-all outline-none focus:ring-4 focus:ring-maedot-gold/10 focus:border-maedot-gold"
        :class="[icon ? 'pl-11 pr-4' : 'px-4', sizeClasses[size]]"
      />
    </div>
  </div>
</template>

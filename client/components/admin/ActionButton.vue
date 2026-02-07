<script setup>
/**
 * DYNAMIC QUICK ACTIONS (Ref #Architect)
 * This component renders any list of actions passed by a Department Head.
 */
defineProps({
  title: { type: String, default: "Quick Actions" },
  actions: {
    type: Array,
    required: true,
    // Expected: [{ label: 'String', icon: 'String', command: Function }]
  },
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest">
        {{ title }}
      </h3>
      <span
        class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold"
      >
        {{ actions.length }}
      </span>
    </div>

    <BaseCard class="p-2 space-y-1">
      <!-- DYNAMIC BUTTON LOOP -->
      <BaseButton
        v-for="action in actions"
        :key="action.label"
        variant="ghost"
        block
        :icon="action.icon"
        class="justify-start hover:bg-maedot-gold/10 hover:text-maedot-navy group transition-all"
        @click="action.command"
      >
        <span class="text-sm font-medium">{{ action.label }}</span>
        <Icon
          name="lucide:chevron-right"
          class="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-maedot-gold"
        />
      </BaseButton>

      <!-- Optional: Divider for help/guidelines if needed -->
      <slot name="footer" />
    </BaseCard>

    <!-- SYSTEM NOTICE SLOT -->
    <slot name="notice" />
  </div>
</template>

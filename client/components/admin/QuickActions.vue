<script setup></script>
<template>
  <div class="space-y-4">
    <h3
      class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
    >
      Direct Actions
    </h3>

    <BaseCard class="space-y-3">
      <!-- We use the BaseButton we already built -->
      <BaseButton
        variant="secondary"
        block
        icon="lucide:user-plus"
        class="justify-start hover:border-maedot-gold group"
      >
        <span class="group-hover:text-maedot-navy">New Registration</span>
      </BaseButton>

      <BaseButton
        variant="secondary"
        block
        icon="lucide:file-up"
        class="justify-start hover:border-maedot-gold group"
      >
        <span class="group-hover:text-maedot-navy"
          >Submit Bi-Weekly Report</span
        >
      </BaseButton>

      <BaseButton
        variant="secondary"
        block
        icon="lucide:calendar-plus"
        class="justify-start hover:border-maedot-gold group"
      >
        <span class="group-hover:text-maedot-navy">Schedule Merha Gbir</span>
      </BaseButton>

      <div class="pt-2 mt-2 border-t border-slate-100">
        <BaseButton
          variant="ghost"
          block
          icon="lucide:help-circle"
          class="justify-start text-slate-400 hover:text-maedot-gold"
        >
          Leader Guidelines
        </BaseButton>
      </div>
    </BaseCard>

    <!-- 2. SYSTEM STATUS MINI-CARD -->
    <BaseCard class="bg-maedot-navy text-white border-none">
      <div class="flex items-center gap-3 mb-3">
        <Icon name="lucide:info" class="text-maedot-gold w-5 h-5" />
        <p class="text-xs font-bold uppercase tracking-tighter">
          System Notice
        </p>
      </div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Next server maintenance:
        <span class="text-white font-bold">Oct 30, 11:00 PM</span>. Please save
        all drafts.
      </p>
    </BaseCard>
  </div>
</template>

<!-- <div class="space-y-6">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest">
        {{ title }}
      </h3>
      <!-- Badge showing how many actions are available
      <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">
        {{ actions.length }}
      </span>
    </div>
    
    <BaseCard class="p-2 space-y-1">
      <!-- DYNAMIC BUTTONS -->
<!-- <BaseButton 
        v-for="action in actions" 
        :key="action.label"
        variant="ghost" 
        block 
        :icon="action.icon" 
        class="justify-start hover:bg-maedot-gold/10 hover:text-maedot-navy group transition-all"
        @click="action.command"
      >
        <span class="text-sm">{{ action.label }}</span>
        <Icon 
          name="lucide:chevron-right" 
          class="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" 
        /> -->
<!-- </BaseButton>

      <!-- SLOT FOR SPECIAL CONTENT (Like a mini-stat or extra tool) -->

<!-- <script setup>
defineProps({
  title: { type: String, default: 'Quick Actions' },
  actions: {
    type: Array,
    required: true
    // Expected: [{ label: 'String', icon: 'String', command: Function }]
  }
})
</script> -->

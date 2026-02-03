<script setup>
const props = defineProps({
  data: Array,
  title: String,
  loading: Boolean,
});
console.log("BaseDataTable props:", props);
</script>
<template>
  <BaseCard :padding="false" class="overflow-hidden">
    <!-- PrimeVue DataTable with Tailwind Styling -->
    <DataTable
      :value="props.data"
      :paginator="true"
      :rows="5"
      dataKey="id"
      :loading="props.loading"
      stripedRows
      responsiveLayout="stack"
      breakpoint="960px"
      class="maedot-datatable"
    >
      <!-- Dynamic Header Slot -->
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-4 p-4">
          <h3
            class="font-black text-maedot-navy text-sm uppercase tracking-widest"
          >
            {{ props.title }}
          </h3>
          <div class="relative">
            <Icon
              name="lucide:search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-maedot-gold/20 outline-none transition-all"
            />
          </div>
        </div>
      </template>

      <!-- Columns are injected via Slot -->
      <slot />

      <!-- Empty State -->
      <template #empty>
        <div class="py-12 text-center text-slate-400">
          <Icon
            name="lucide:database-zap"
            class="w-12 h-12 mx-auto mb-2 opacity-20"
          />
          <p>No records found.</p>
        </div>
      </template>
    </DataTable>
  </BaseCard>
</template>

<style scoped>
/* Industry trick: Styling PrimeVue components with your theme colors */
:deep(.p-datatable-thead > tr > th) {
  @apply bg-slate-50 text-slate-500 font-bold text-[10px] uppercase border-b border-slate-100 px-6 py-4;
}
:deep(.p-datatable-tbody > tr > td) {
  @apply px-6 py-4 text-sm text-slate-600 border-b border-slate-50;
}
:deep(.p-paginator) {
  @apply bg-white border-t border-slate-100 py-3;
}
:deep(.p-datatable.p-datatable-gridlines .p-datatable-header) {
  border: none !important;
}

:deep(.p-datatable .p-datatable-header) {
  background: white;
  border: none !important; /* This kills that thick top line */
  padding: 0; /* Let our inner div handle the padding */
}

/* If you are using striped rows, sometimes the container adds a border */
:deep(.p-datatable) {
  border: none !important;
}
/* Removes the default heavy black border from the footer */
:deep(.p-paginator) {
  @apply bg-white border-t border-slate-100 py-3 px-6 justify-center !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;
}

/* Styles the individual navigation buttons */
:deep(.p-paginator button) {
  @apply w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 transition-all !important;
  border: none !important; /* Kills the black border on the buttons */
}

/* Styles the active page number */
:deep(.p-paginator .p-highlight) {
  @apply bg-maedot-navy text-white font-bold !important;
}
</style>

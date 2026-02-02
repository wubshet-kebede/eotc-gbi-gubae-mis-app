<script setup>
definePageMeta({ layout: "admin" });

const loading = ref(false);
const inventoryItems = ref([
  {
    id: 1,
    name: "Hamer Magazine (Vol 24)",
    category: "Publication",
    stock: 45,
    price: 50,
  },
  {
    id: 2,
    name: "EOTC Yearly Calendar",
    category: "General",
    stock: 5,
    price: 120,
  },
  {
    id: 3,
    name: "Mahibere Kidusan T-shirt",
    category: "Apparel",
    stock: 12,
    price: 450,
  },
]);

const logSale = (item) => {
  const quantity = prompt(`How many units of ${item.name} sold?`, "1");
  if (quantity) {
    alert(
      `Logged sale of ${quantity} units. Total: ${quantity * item.price} ETB. Inventory updated.`,
    );
  }
};
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Inventory & Sales
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Managing Publications & Church Assets (Ref #7)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:package-plus"
        @click="showAddItem = true"
        >Add New Stock</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. STOCK LIST (Ref #7 Inventory Tracker) -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Active Stock Items
            </h3>
          </div>

          <BaseDataTable :data="inventoryItems" :loading="loading">
            <Column
              field="name"
              header="Item Name"
              class="font-bold text-slate-700"
            />
            <Column field="category" header="Category" />
            <Column field="stock" header="In Stock">
              <template #body="{ data }">
                <span
                  :class="
                    data.stock < 10
                      ? 'text-rose-600 font-black'
                      : 'text-slate-600'
                  "
                >
                  {{ data.stock }} units
                </span>
              </template>
            </Column>
            <Column field="price" header="Price (ETB)">
              <template #body="{ data }">
                <span class="font-bold text-maedot-navy">{{ data.price }}</span>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <BaseButton
                  size="sm"
                  variant="secondary"
                  icon="lucide:shopping-cart"
                  @click="logSale(data)"
                  >Log Sale</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. SALES SUMMARY & TOOLS -->
      <div class="lg:col-span-4 space-y-6">
        <BaseStatCard
          title="Total Inventory Value"
          value="12,450 ETB"
          icon="lucide:layout-list"
        />

        <AdminQuickActions
          title="Revenue Tools"
          :actions="[
            {
              label: 'Transfer Funds to Finance',
              icon: 'lucide:send',
              command: () => {},
            },
            {
              label: 'Bulk Stock Update',
              icon: 'lucide:refresh-cw',
              command: () => {},
            },
            {
              label: 'Print Price Tags',
              icon: 'lucide:printer',
              command: () => {},
            },
          ]"
        />

        <!-- Ref #7: Compliance Warning -->
        <BaseCard class="bg-amber-50 border-amber-200">
          <div class="flex items-center gap-2 text-amber-700 mb-2">
            <Icon name="lucide:shield-alert" class="w-4 h-4" />
            <p class="text-[10px] font-black uppercase tracking-tighter">
              Compliance Check
            </p>
          </div>
          <p class="text-[11px] text-amber-800 leading-relaxed">
            There are <span class="font-bold">4,200 ETB</span> in sales not yet
            signed over to Finance. Please initiate transfer.
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

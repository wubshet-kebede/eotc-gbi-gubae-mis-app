<script setup>
const route = useRoute();
const userInitial = "ST";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "lucide:layout-dashboard",
  },
  {
    name: "Departmental Data",
    href: "/admin/department",
    icon: "lucide:database",
  },
  { name: "Member Registry", href: "/admin/members", icon: "lucide:users" },
  { name: "Finance Ledger", href: "/admin/finance", icon: "lucide:wallet" },
  {
    name: "History & Archives",
    href: "/admin/archives",
    icon: "lucide:history",
  },
];

const handleLogout = () => {
  // Logic to clear Pinia/Auth state
  navigateTo("/");
};

const isMobileOpen = ref(false);
</script>
<template>
  <div class="min-h-screen bg-slate-50 flex">
    <HeadlessTransitionRoot :show="isMobileOpen" as="template">
      <HeadlessDialog
        as="div"
        @close="isMobileOpen = false"
        class="relative z-50 lg:hidden"
      >
        <HeadlessTransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-maedot-navy/80 backdrop-blur-sm" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 flex">
          <HeadlessTransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <HeadlessDialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-maedot-navy pt-5 pb-4"
            >
              <!-- Close Button -->
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  @click="isMobileOpen = false"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <Icon name="lucide:x" class="h-6 w-6 text-white" />
                </button>
              </div>
              <!-- Mobile Sidebar Content (Same as Desktop) -->
              <div class="flex flex-shrink-0 items-center px-6 gap-3">
                <div
                  class="w-8 h-8 bg-maedot-gold rounded-lg flex items-center justify-center font-bold"
                >
                  M
                </div>
                <span
                  class="text-white font-bold uppercase tracking-wider text-sm"
                  >Ma'edot</span
                >
              </div>
              <nav class="mt-8 flex-1 space-y-1 px-4">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  @click="isMobileOpen = false"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  :class="[
                    $route.path.includes(item.href)
                      ? 'bg-maedot-gold text-maedot-navy'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  <Icon :name="item.icon" class="w-5 h-5" />
                  {{ item.name }}
                </NuxtLink>
              </nav>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>

    <!-- THE SIDEBAR (Fixed on Desktop -->
    <aside
      class="hidden lg:flex flex-col w-72 bg-maedot-navy border-r border-slate-800 fixed h-full z-50"
    >
      <div class="p-6 flex items-center gap-3">
        <div
          class="w-8 h-8 bg-maedot-gold rounded-lg flex items-center justify-center"
        >
          <span class="text-maedot-navy font-bold">M</span>
        </div>
        <span class="text-white font-bold tracking-wider uppercase text-sm"
          >Ma'edot Admin</span
        >
      </div>

      <!-- Navigation Links -->
      <nav class="flex-grow px-4 space-y-1 mt-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group"
          :class="[
            $route.path.includes(item.href)
              ? 'bg-maedot-gold text-maedot-navy shadow-lg shadow-maedot-gold/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white',
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- User Profile Summary (Bottom) -->
      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
          <div
            class="w-10 h-10 rounded-full bg-maedot-gold flex items-center justify-center text-maedot-navy font-bold"
          >
            {{ userInitial }}
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-white truncate">Selam Tesfaye</p>
            <p class="text-[10px] text-slate-500 uppercase tracking-tighter">
              Finance Leader
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- 2. MAIN CONTENT AREA -->
    <div class="flex-grow lg:ml-72 flex flex-col min-h-screen">
      <!-- Top Header (Breadcrumbs & Global Actions) -->
      <header
        class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-8"
      >
        <div class="flex items-center gap-4">
          <!-- MOBILE MENU TRIGGER (FIXED) -->
          <button
            @click="isMobileOpen = true"
            class="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Icon name="lucide:menu" class="w-6 h-6" />
          </button>
          <h2
            class="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest"
          >
            Fasil Gbi Gubae <span class="mx-2 text-slate-200">|</span> 2018 E.C.
          </h2>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-400 hover:text-maedot-navy relative">
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span
              class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:log-out"
            @click="handleLogout"
          >
            Logout
          </BaseButton>
        </div>
      </header>

      <!-- THE CANVAS (Where the page content goes) -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

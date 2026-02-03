<script setup>
const route = useRoute();
const slug = computed(() => route.params.slug); // Dynamic Gbi Name (fasil, etc.)

/**
 * 1. THE 12-DEPARTMENT NAVIGATION MAP
 * Every link here matches the folder structure we built.
 */
const menuMap = {
  chairperson: [
    {
      name: "Executive Overview",
      href: "chairperson",
      icon: "lucide:layout-dashboard",
    },
    {
      name: "Sign-off Queue",
      href: "chairperson/approvals",
      icon: "lucide:pen-tool",
    },
    {
      name: "Senate Oversight",
      href: "chairperson/senate",
      icon: "lucide:users",
    },
    {
      name: "Master Archive",
      href: "chairperson/archives",
      icon: "lucide:archive",
    },
    {
      name: "Leadership Handover",
      href: "chairperson/handover",
      icon: "lucide:refresh-cw",
    },
    {
      name: "external Relations",
      href: "chairperson/external",
      icon: "lucide:globe",
    },
  ],
  finance: [
    { name: "General Ledger", href: "finance/ledger", icon: "lucide:book" },
    {
      name: "Budgetary Control",
      href: "finance/budget",
      icon: "lucide:pie-chart",
    },
    {
      name: "Asset Registry",
      href: "finance/property",
      icon: "lucide:package",
    },
    {
      name: "Finance Archive",
      href: "finance/archives",
      icon: "lucide:history",
    },
  ],
  education: [
    {
      name: "Abinet Tracking",
      href: "education/abinet",
      icon: "lucide:church",
    },
    {
      name: "Faith Courses",
      href: "education/courses",
      icon: "lucide:book-open",
    },
    {
      name: "Merha-Gbir Logs",
      href: "education/merha-gbir",
      icon: "lucide:mic-2",
    },
    {
      name: "Academic Archive",
      href: "education/archives",
      icon: "lucide:library",
    },
  ],
  secretary: [
    {
      name: "Protocol Register",
      href: "secretary/protocol",
      icon: "lucide:mail",
    },
    {
      name: "Meeting Minutes",
      href: "secretary/minutes",
      icon: "lucide:file-text",
    },
    {
      name: "Member Directory",
      href: "secretary/directory",
      icon: "lucide:contact",
    },
    {
      name: "Admin Archives",
      href: "secretary/archives",
      icon: "lucide:folder-lock",
    },
  ],
  audit: [
    { name: "System Health", href: "audit", icon: "lucide:shield-check" },
    {
      name: "Compliance Log",
      href: "audit/findings",
      icon: "lucide:alert-circle",
    },
    {
      name: "Audit Archives",
      href: "audit/archives",
      icon: "lucide:file-check",
    },
  ],
  care: [
    { name: "Support Tickets", href: "care/tickets", icon: "lucide:life-buoy" },
    {
      name: "Mentorship Map",
      href: "care/mentorship",
      icon: "lucide:heart-handshake",
    },
    {
      name: "Case Archives",
      href: "care/archives",
      icon: "lucide:folder-heart",
    },
  ],
  arts: [
    { name: "Talent Scout", href: "arts", icon: "lucide:users" },
    { name: "Hymn Library", href: "arts/library", icon: "lucide:music" },
    { name: "Script Pipeline", href: "arts/scripts", icon: "lucide:scroll" },
  ],
  revenue: [
    { name: "Sales Overview", href: "revenue", icon: "lucide:trending-up" },
    { name: "Inventory", href: "revenue/inventory", icon: "lucide:package" },
    { name: "Campaigns", href: "revenue/campaigns", icon: "lucide:piggy-bank" },
  ],
  planning: [
    { name: "KPI Dashboard", href: "planning", icon: "lucide:gauge" },
    { name: "Annual Plan", href: "planning/plan", icon: "lucide:map" },
    {
      name: "BI Archives",
      href: "planning/archives",
      icon: "lucide:bar-chart-3",
    },
  ],
};

/**
 * 2. DYNAMIC SIDEBAR SWITCHER
 * Logic: Checks the URL to see which department menu to show.
 */
const activeMenu = computed(() => {
  const path = route.path;
  if (path.includes("/finance")) return menuMap.finance;
  if (path.includes("/education")) return menuMap.education;
  if (path.includes("/secretary")) return menuMap.secretary;
  if (path.includes("/audit")) return menuMap.audit;
  if (path.includes("/care")) return menuMap.care;
  if (path.includes("/arts")) return menuMap.arts;
  if (path.includes("/revenue")) return menuMap.revenue;
  if (path.includes("/planning")) return menuMap.planning;
  return menuMap.chairperson; // Default home
});

// 3. UI STATE
const isMobileOpen = ref(false);
const userInitial = "ST";
const currentYear = 2018;

const handleLogout = () => {
  navigateTo("/");
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex font-sans antialiased">
    <!-- MOBILE SIDEBAR (Drawer) -->
    <HeadlessTransitionRoot :show="isMobileOpen" as="template">
      <HeadlessDialog
        as="div"
        @close="isMobileOpen = false"
        class="relative z-50 lg:hidden"
      >
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
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
              class="relative flex w-full max-w-xs flex-1 flex-col bg-maedot-navy pt-5 pb-4 shadow-2xl"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button @click="isMobileOpen = false" class="p-2 text-white">
                  <Icon name="lucide:x" class="w-6 h-6" />
                </button>
              </div>
              <nav class="mt-8 flex-grow px-4 space-y-1">
                <NuxtLink
                  v-for="item in activeMenu"
                  :key="item.name"
                  :to="`/admin/${slug}/${item.href}`"
                  @click="isMobileOpen = false"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                  :class="[
                    $route.path.includes(item.href)
                      ? 'bg-maedot-gold text-maedot-navy font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  <Icon :name="item.icon" class="w-5 h-5" />
                  <span class="text-sm">{{ item.name }}</span>
                </NuxtLink>
              </nav>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>

    <!-- DESKTOP SIDEBAR -->
    <aside
      class="hidden lg:flex flex-col w-72 bg-maedot-navy border-r border-slate-800 fixed h-full z-50"
    >
      <div class="p-6 flex items-center gap-3">
        <div
          class="w-10 h-10 bg-maedot-gold rounded-xl flex items-center justify-center shadow-lg shadow-maedot-gold/20"
        >
          <span class="text-maedot-navy font-black text-xl">M</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-black tracking-wider uppercase text-sm"
            >Ma'edot</span
          >
          <span
            class="text-[10px] text-maedot-gold font-bold tracking-tighter uppercase"
            >Admin Portal</span
          >
        </div>
      </div>

      <nav
        class="flex-grow px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar"
      >
        <NuxtLink
          v-for="item in activeMenu"
          :key="item.name"
          :to="`/admin/${slug}/${item.href}`"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            $route.path.includes(item.href)
              ? 'bg-maedot-gold text-maedot-navy font-bold shadow-xl shadow-maedot-gold/10'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white',
          ]"
        >
          <Icon
            :name="item.icon"
            class="w-5 h-5 transition-transform group-hover:scale-110"
          />
          <span class="text-sm truncate">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-800 bg-slate-900/50">
        <div
          class="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5"
        >
          <div
            class="w-10 h-10 rounded-full bg-maedot-gold flex items-center justify-center text-maedot-navy font-black shadow-inner"
          >
            {{ userInitial }}
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-white truncate">Selam Tesfaye</p>
            <p
              class="text-[9px] text-maedot-gold/80 font-black uppercase tracking-widest truncate"
            >
              Department Head
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- MAIN WORKSPACE -->
    <div class="flex-grow lg:ml-72 flex flex-col min-h-screen">
      <header
        class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8"
      >
        <div class="flex items-center gap-4">
          <button
            @click="isMobileOpen = true"
            class="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Icon name="lucide:menu" class="w-6 h-6" />
          </button>
          <div class="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
            <h2
              class="text-sm font-black text-maedot-navy uppercase tracking-tight capitalize"
            >
              {{ slug }} Gbi Gubae
            </h2>
            <span class="hidden lg:block text-slate-300">|</span>
            <span
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >{{ currentYear }} E.C. Academic Year</span
            >
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:border-maedot-gold transition-all cursor-text group"
          >
            <Icon
              name="lucide:search"
              class="w-4 h-4 group-hover:text-maedot-gold"
            />
            <span class="text-[11px] font-medium">Search records...</span>
          </div>
          <button class="p-2 text-slate-400 hover:text-maedot-navy relative">
            <Icon name="lucide:bell" class="w-5 h-5" /><span
              class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
            ></span>
          </button>
          <div class="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:log-out"
            class="text-slate-500 hover:text-rose-600"
            @click="handleLogout"
            >Logout</BaseButton
          >
        </div>
      </header>
      <main class="p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
</style>

<script setup>
const route = useRoute();
const slug = route.params.slug; // Captures 'fasil', 'arat-kilo'

//  dynamic navigation for 12-Department Brain)
const menuMap = {
  chairperson: [
    {
      name: "Executive Overview",
      href: "dashboard",
      icon: "lucide:layout-dashboard",
    },
    { name: "Sign-off Queue", href: "approvals", icon: "lucide:pen-tool" },
    { name: "Senate Oversight", href: "senate", icon: "lucide:users" },
    { name: "Master Archive", href: "archives", icon: "lucide:archive" },
  ],
  finance: [
    { name: "General Ledger", href: "finance/ledger", icon: "lucide:book" },
    {
      name: "Budgetary Control",
      href: "finance/budget",
      icon: "lucide:pie-chart",
    },
    { name: "Asset Registry", href: "finance/assets", icon: "lucide:package" },
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
      name: "Instructor Logs",
      href: "education/teachers",
      icon: "lucide:user-check",
    },
  ],
  secretary: [
    { name: "Protocol Register", href: "protocol", icon: "lucide:mail" },
    { name: "Meeting Minutes", href: "minutes", icon: "lucide:file-text" },
    { name: "Member Directory", href: "members", icon: "lucide:contact" },
  ],
  audit: [
    {
      name: "Compliance Feed",
      href: "audit/check",
      icon: "lucide:shield-check",
    },
    {
      name: "Findings Log",
      href: "audit/findings",
      icon: "lucide:alert-circle",
    },
  ],
  // Note: Add other depts (Hymn, Planning, Member Care) here as you build them
};

//  ACTIVE MENU LOGIC (Determines what to show based on URL or Role)
const activeMenu = computed(() => {
  if (route.path.includes("/finance")) return menuMap.finance;
  if (route.path.includes("/education")) return menuMap.education;
  if (route.path.includes("/secretary")) return menuMap.secretary;
  if (route.path.includes("/audit")) return menuMap.audit;
  return menuMap.chairperson; // Default
});

// 3. UI STATE
const isMobileOpen = ref(false);
const userInitial = "ST";
const currentYear = 2018;

const handleLogout = () => {
  // Logic: Clear tokens/Pinia here
  navigateTo("/");
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex font-sans antialiased">
    <!--  MOBILE SIDEBAR (Drawer) -->
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
              <div class="px-6 flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-maedot-gold rounded-lg flex items-center justify-center font-bold"
                >
                  M
                </div>
                <span
                  class="text-white font-bold uppercase tracking-widest text-sm"
                  >Ma'edot</span
                >
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

    <!--  DESKTOP SIDEBAR (Static) -->
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

      <nav class="flex-grow px-4 space-y-1.5 mt-4">
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
          <span class="text-sm">{{ item.name }}</span>
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
              class="text-[9px] text-maedot-gold/80 font-black uppercase tracking-widest"
            >
              Finance Head
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- 3. MAIN WORKSPACE -->
    <div class="flex-grow lg:ml-72 flex flex-col min-h-screen">
      <!-- DYNAMIC HEADER -->
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
          <button
            class="p-2 text-slate-400 hover:text-maedot-navy relative transition-colors"
          >
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span
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

      <!-- PAGE CANVAS -->
      <main class="p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Smooth Nuxt Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>

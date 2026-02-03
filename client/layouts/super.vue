<script setup>
const navigation = [
  { name: "Global Pulse", href: "/super-admin", icon: "lucide:bar-chart-3" },
  {
    name: "Organizations",
    href: "/super-admin/organizations",
    icon: "lucide:church",
  },
  {
    name: "Organizations",
    href: "/super-admin/organizations/requests",
    icon: "lucide:church",
  },
  { name: "City Grid", href: "/super-admin/cities", icon: "lucide:map" },
  {
    name: "User Control",
    href: "/super-admin/users",
    icon: "lucide:shield-check",
  },
  {
    name: "System Settings",
    href: "/super-admin/settings",
    icon: "lucide:settings",
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Super-Admin Sidebar (Darker Slate for distinction) -->
    <aside class="w-72 bg-slate-900 text-white flex flex-col fixed h-full z-50">
      <div class="p-8 flex items-center gap-3 border-b border-white/5">
        <div
          class="w-8 h-8 bg-maedot-gold rounded-lg flex items-center justify-center font-black text-slate-900"
        >
          M
        </div>
        <span class="font-black tracking-tighter uppercase text-sm"
          >Ma'edot Master</span
        >
      </div>

      <nav class="flex-grow p-4 mt-4 space-y-2">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          :class="[
            $route.path === item.href
              ? 'bg-maedot-gold text-slate-900 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-white/5',
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="p-6 bg-black/20">
        <p
          class="text-[10px] font-black text-maedot-gold uppercase tracking-widest mb-1"
        >
          System Status
        </p>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span class="text-[10px] text-white font-bold">ALL SYSTEMS LIVE</span>
        </div>
      </div>
    </aside>

    <main class="flex-grow ml-72 p-10">
      <slot />
    </main>
  </div>
</template>

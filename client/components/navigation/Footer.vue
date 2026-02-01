<template>
  <footer class="bg-white border-t border-slate-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Section: Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1 space-y-4">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-maedot-navy rounded-lg flex items-center justify-center"
            >
              <span class="text-maedot-gold font-bold text-xl">M</span>
            </div>
            <span class="font-bold text-xl tracking-tight uppercase"
              >Ma'edot</span
            >
          </div>
          <p class="text-slate-500 text-sm leading-relaxed">
            A specialized Management Information System for EOTC Gbi Gubaes.
            Empowering spiritual associations with digital continuity.
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h4
            class="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest"
          >
            Platform
          </h4>
          <ul class="space-y-4 text-sm text-slate-600">
            <li>
              <NuxtLink to="/" class="hover:text-maedot-gold transition-colors"
                >Gbi Directory</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="hover:text-maedot-gold transition-colors"
                >Our Mission</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/terms"
                class="hover:text-maedot-gold transition-colors"
                >Privacy & Terms</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div>
          <h4
            class="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest"
          >
            Support
          </h4>
          <ul class="space-y-4 text-sm text-slate-600">
            <li>
              <NuxtLink
                to="/help"
                class="hover:text-maedot-gold transition-colors"
                >Documentation</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="hover:text-maedot-gold transition-colors"
                >Contact Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/admin"
                class="hover:text-maedot-gold transition-colors"
                >Super Admin Portal</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Column 4: Institutional Links -->
        <div>
          <h4
            class="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest"
          >
            Affiliations
          </h4>
          <div class="flex flex-col gap-4">
            <div
              class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <Icon name="lucide:church" class="text-maedot-gold w-5 h-5" />
              <span class="text-xs font-medium text-slate-700"
                >Mahibere Kidusan</span
              >
            </div>
            <div
              class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <Icon name="lucide:globe" class="text-maedot-gold w-5 h-5" />
              <span class="text-xs font-medium text-slate-700"
                >EOTC Holy Synod</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Copyright & Meta -->
      <div
        class="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-xs text-slate-400">
          &copy; {{ new Date().getFullYear() }} Ma'edot Platform. Developed for
          EOTC University Associations.
        </p>

        <!-- Social/External Icons -->
        <div class="flex items-center gap-6 text-slate-400">
          <a href="#" class="hover:text-maedot-navy transition-colors"
            ><Icon name="ph:telegram-logo-duotone" class="w-5 h-5"
          /></a>
          <a href="#" class="hover:text-maedot-navy transition-colors"
            ><Icon name="ph:facebook-logo-duotone" class="w-5 h-5"
          /></a>
          <a href="#" class="hover:text-maedot-navy transition-colors"
            ><Icon name="ph:youtube-logo-duotone" class="w-5 h-5"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

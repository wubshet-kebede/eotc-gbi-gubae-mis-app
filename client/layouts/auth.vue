<template>
  <div class="min-h-screen flex bg-maedot-white font-sans">
    <!-- Left Side: Spiritual/Branding (Hidden on mobile) -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-maedot-navy relative overflow-hidden items-center justify-center p-12"
    >
      <!-- Sacred Glow -->
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-maedot-gold/10 rounded-full blur-[100px] -mr-64 -mt-64"
      ></div>

      <div class="relative z-10 text-center space-y-6">
        <Icon
          name="lucide:church"
          class="w-32 h-32 text-maedot-gold mx-auto opacity-80"
        />
        <h2 class="text-4xl font-bold text-white tracking-tight">
          Institutional Memory
        </h2>
        <p class="text-slate-400 max-w-md mx-auto leading-relaxed">
          "Preserving our heritage through digital continuity and administrative
          excellence."
        </p>
      </div>
    </div>

    <!-- Right Side: The Form Canvas -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false, // We use the <NuxtLayout> wrapper inside the template instead
});

const route = useRoute();
const loading = ref(false);

const form = reactive({
  email: "",
  password: "",
  org_slug: route.params.slug, // This ties the login attempt to the specific Gbi
});

const handleLogin = async () => {
  loading.value = true;
  // We will connect this to Hasura/Auth logic later
  console.log("Logging into:", form.org_slug);
  setTimeout(() => (loading.value = false), 1500);
};
</script>
<template>
  <NuxtLayout name="auth">
    <div class="space-y-8">
      <!-- Dynamic Branding -->
      <div class="text-center lg:text-left space-y-2">
        <BaseButton
          variant="ghost"
          size="sm"
          icon="lucide:arrow-left"
          @click="navigateTo('/')"
        >
          Back to Directory
        </BaseButton>
        <h1 class="text-3xl font-black text-maedot-navy mt-4 capitalize">
          {{ $route.params.slug }} Gbi Gubae
        </h1>
        <p class="text-slate-500 text-sm">
          Please enter your credentials to access the portal.
        </p>
      </div>

      <!-- The Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <BaseInput
          v-model="form.email"
          label="Email Address"
          placeholder="name@university.edu.et"
          icon="lucide:mail"
          type="email"
        />

        <BaseInput
          v-model="form.password"
          label="Password"
          placeholder="••••••••"
          icon="lucide:lock"
          type="password"
        />

        <div class="flex items-center justify-between text-xs font-medium">
          <label class="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              class="rounded border-slate-300 text-maedot-navy focus:ring-maedot-gold"
            />
            Remember me
          </label>
          <NuxtLink
            to="/forgot-password"
            class="text-maedot-gold hover:underline"
            >Forgot Password?</NuxtLink
          >
        </div>

        <BaseButton variant="primary" block size="lg" :loading="loading">
          Sign In
        </BaseButton>
      </form>

      <!-- Member Join Shortcut -->
      <p class="text-center text-sm text-slate-500">
        New student at {{ $route.params.slug }}?
        <NuxtLink
          :to="`/join/${$route.params.slug}`"
          class="text-maedot-navy font-bold hover:underline"
        >
          Request to Join
        </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>

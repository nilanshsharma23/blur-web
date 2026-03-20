<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import router from "@/router";
import { getAuth, signOut } from "firebase/auth";
import { ref } from "vue";

const loading = ref(false);

const onSignOutClicked = async () => {
  loading.value = true;

  await signOut(getAuth());

  router.replace("/sign-in");

  loading.value = false;
};
</script>

<template>
  <ParentContainer>
    <div
      class="flex flex-col items-center justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4"
    >
      <div class="text-2xl cursor-pointer" @click="onSignOutClicked">
        Sign Out
      </div>
      <div class="text-2xl cursor-pointer text-red-500">Delete Account</div>
      <WaveSpinner v-if="loading" />
    </div>
  </ParentContainer>
</template>

<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getProfile } from "@/functions/getProfile";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { onMounted, ref } from "vue";

const db = getFirestore();
const auth = getAuth();

const name = ref("");
const handle = ref("");

const loading = ref(false);

onMounted(async () => {
  loading.value = true;

  const data = await getProfile(auth.currentUser?.uid!);

  name.value = data!["name"];
  handle.value = data!["handle"];

  loading.value = false;
});
</script>

<template>
  <ParentContainer>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <div v-if="loading">
        <WaveSpinner />
      </div>
      <div v-else>
        <div class="text-4xl text-center">{{ name }}</div>
        <div class="text-2xl text-center">@{{ handle }}</div>
      </div>
    </div>
  </ParentContainer>
</template>

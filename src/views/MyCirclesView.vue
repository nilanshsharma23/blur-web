<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getCircles } from "@/functions/getCircles";
import { RiAddFill } from "@remixicon/vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const circles = ref();
const loading = ref(false);

onAuthStateChanged(getAuth(), async (user) => {
  loading.value = true;

  circles.value = await getCircles(user?.uid!);

  loading.value = false;
});
</script>

<template>
  <ParentContainer>
    <div
      class="flex flex-col items-center justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4"
    >
      <div v-if="loading">
        <WaveSpinner />
      </div>

      <div
        v-for="circle in circles"
        v-else
        class="p-4 bg-container border flex flex-col gap-2 w-full"
      >
        <div>{{ circle["name"] }}</div>
        <div class="text-red-500">Leave Circle</div>
      </div>
      <div class="flex flex-row w-full gap-2 items-center">
        <input
          type="text"
          placeholder="Enter code to join new circle"
          class="p-2 border bg-container w-full h-full"
        />
        <div
          class="bg-primary border-2 p-2 h-full flex items-center justify-center"
        >
          <RiAddFill />
        </div>
      </div>
    </div>
  </ParentContainer>
</template>

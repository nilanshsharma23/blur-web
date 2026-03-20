<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getCircles } from "@/functions/getCircles";
import { RiAddFill } from "@remixicon/vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";

const circles = ref();
const loading = ref(false);
const circleLoading = ref(false);

const uid = ref("");
const code = ref("");
const error = ref("");

onAuthStateChanged(getAuth(), async (user) => {
  loading.value = true;

  circles.value = await getCircles(user?.uid!);

  uid.value = user?.uid!;

  loading.value = false;
});

const onClick = async () => {
  if (code.value.length !== 5) {
    error.value = "Code should be 5 characters.";
    return;
  }

  for (let i = 0; i < circles.value.length; i++) {
    const circle = circles.value[i];

    if (circle["code"] === code.value) {
      error.value = "You are already in this circle!";
      return;
    }
  }

  circleLoading.value = true;

  const db = getFirestore();

  const circle = await getDoc(doc(db, "circles", code.value));

  if (!circle.exists()) {
    error.value = "This circle does not exist.";
    circleLoading.value = false;
    return;
  }

  await updateDoc(doc(db, "profiles", uid.value), {
    circles: arrayUnion(code.value),
  });

  circles.value = await getCircles(uid.value);

  circleLoading.value = false;
};

const leaveCircle = async (circle: string) => {
  circleLoading.value = true;

  const db = getFirestore();

  await updateDoc(doc(db, "profiles", uid.value), {
    circles: arrayRemove(circle),
  });

  circles.value = await getCircles(uid.value);

  circleLoading.value = false;
};
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
        <div
          class="text-red-500 cursor-pointer"
          v-if="circle['code'] !== '00000'"
          @click="leaveCircle(circle['code'])"
        >
          Leave Circle
        </div>
      </div>
      <div class="flex flex-row w-full gap-2 items-center">
        <input
          type="text"
          placeholder="Enter code to join new circle"
          class="p-2 border bg-container w-full h-full"
          v-model.lazy="code"
        />
        <div
          class="bg-primary border-2 cursor-pointer p-2 h-full flex items-center justify-center"
          v-on:click="onClick"
        >
          <RiAddFill />
        </div>
      </div>
      <span class="text-red-500">{{ error }}</span>
      <WaveSpinner v-if="circleLoading" />
    </div>
  </ParentContainer>
</template>

<script lang="ts" setup>
import BlurtTemplate from "@/components/BlurtTemplate.vue";
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getCircles } from "@/functions/getCircles";
import { getPosts } from "@/functions/getPosts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { ref } from "vue";

const auth = getAuth();
const circlesLoading = ref(false);
const circles = ref();

const posts = ref();
const currentCircle = ref("00000");
const loading = ref(false);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    circlesLoading.value = true;
    circles.value = await getCircles(user?.uid!);
    circlesLoading.value = false;

    loading.value = true;
    posts.value = await getPosts("00000");
    console.log(posts.value);
    loading.value = false;
  }
});

const onCircleSelected = async () => {
  loading.value = true;
  posts.value = await getPosts(currentCircle.value);
  loading.value = false;
};
</script>

<template>
  <ParentContainer>
    <div
      class="flex flex-col items-start justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4"
    >
      <div class="w-full flex flex-row lg:hidden items-center justify-between">
        <div class="text-4xl font-bold">blur</div>
        <div v-if="circlesLoading">
          <WaveSpinner />
        </div>

        <select
          v-else
          name="circle"
          id=""
          class="text-2xl"
          v-model="currentCircle"
          @change="onCircleSelected"
        >
          <option v-for="circle in circles" :value="circle['code']">
            {{ circle["name"] }}
          </option>
        </select>
      </div>

      <div v-if="circlesLoading" class="hidden lg:block">
        <WaveSpinner />
      </div>
      <select
        name="circle"
        id=""
        class="text-2xl hidden lg:block"
        v-model="currentCircle"
        @change="onCircleSelected"
      >
        <option v-for="circle in circles" :value="circle['code']">
          {{ circle["name"] }}
        </option>
      </select>

      <WaveSpinner v-if="loading" />
      <BlurtTemplate
        v-for="post in posts"
        v-else
        :name="post['profile']['name']"
        :handle="post['profile']['handle']"
        :time="Timestamp.now()"
        :anonymous="post['anonymous']"
        >{{ post["content"] }}</BlurtTemplate
      >
    </div>
  </ParentContainer>
</template>

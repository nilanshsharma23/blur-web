<script lang="ts" setup>
import BlurtTemplate from "@/components/BlurtTemplate.vue";
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getCircles } from "@/functions/getCircles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const auth = getAuth();
const circlesLoading = ref(false);
const circles = ref();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    circlesLoading.value = true;
    circles.value = await getCircles(user?.uid!);

    circlesLoading.value = false;
  }
});
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

        <select name="circle" id="" class="text-2xl">
          <option v-for="circle in circles" :value="circle['code']">
            {{ circle["name"] }}
          </option>
        </select>
      </div>

      <div v-if="circlesLoading" class="hidden lg:block">
        <WaveSpinner />
      </div>
      <select name="circle" id="" class="text-2xl hidden lg:block">
        <option v-for="circle in circles" :value="circle['code']">
          {{ circle["name"] }}
        </option>
      </select>
      <BlurtTemplate
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum cum
        impedit quia beatae, sint cupiditate perspiciatis voluptatum provident
        magni esse reiciendis sequi facilis quaerat omnis adipisci dignissimos
        amet ipsam exercitationem. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Tenetur eveniet hic aspernatur a quisquam dolore
        deleniti. Amet molestias ducimus animi nobis harum, temporibus delectus
        non, veritatis ea facilis illum eos.</BlurtTemplate
      >
      <BlurtTemplate
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum cum
        impedit quia beatae, sint cupiditate perspiciatis voluptatum provident
        magni esse reiciendis sequi facilis quaerat omnis adipisci dignissimos
        amet ipsam exercitationem. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Tenetur eveniet hic aspernatur a quisquam dolore
        deleniti. Amet molestias ducimus animi nobis harum, temporibus delectus
        non, veritatis ea facilis illum eos.</BlurtTemplate
      >
    </div>
  </ParentContainer>
</template>

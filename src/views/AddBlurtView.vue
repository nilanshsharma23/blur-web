<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import { getCircles } from "@/functions/getCircles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ErrorMessage, Field, Form } from "vee-validate";
import { onMounted, ref } from "vue";
import { object, string } from "yup";

const circlesLoading = ref(false);
const loading = ref(false);

const anonymous = ref(false);

const circles = ref();

const schema = object({
  content: string().required().label("Content"),
  circle: string().required(),
});

onAuthStateChanged(getAuth(), async (user) => {
  circlesLoading.value = true;

  circles.value = await getCircles(user?.uid!);
  circlesLoading.value = false;
});

const onSubmit = async (values: any) => {
  loading.value = true;

  console.log(values);

  loading.value = false;
};
</script>

<template>
  <ParentContainer>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="flex flex-col items-center justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4"
    >
      <div class="flex flex-col w-full">
        <Field name="content" v-slot="{ field }">
          <textarea
            v-bind="field"
            class="w-full h-64 bg-container border p-2"
            placeholder="Any gossip?"
          ></textarea>
        </Field>
        <ErrorMessage name="content" class="text-red-500" />
      </div>
      <div class="flex flex-col w-full">
        <div v-if="circlesLoading">
          <WaveSpinner />
        </div>
        <Field
          v-else
          name="circle"
          as="select"
          class="w-full bg-container border p-2"
        >
          <option v-for="circ in circles" :value="circ['code']">
            {{ circ["name"] }}
          </option>
        </Field>
        <ErrorMessage name="circle" class="text-red-500" />
      </div>
      <span>Note: You can only blurt every 1 hour.</span>

      <label class="flex flex-row w-full items-center justify-center gap-2">
        <input
          type="checkbox"
          :v-bind="anonymous"
          class="bg-container"
          id="anonymous"
        />
        Anonymous
      </label>
      <button
        class="w-full h-8 p-2 bg-primary flex items-center justify-center cursor-pointer border"
      >
        <div v-if="loading">
          <WaveSpinner />
        </div>
        <div v-else>Blurt</div>
      </button>
    </Form>
  </ParentContainer>
</template>

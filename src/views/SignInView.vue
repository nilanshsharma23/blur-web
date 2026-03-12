<script lang="ts" setup>
import WaveSpinner from "@/components/WaveSpinner.vue";
import router from "@/router";
import { RiGoogleFill } from "@remixicon/vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form } from "vee-validate";
import { ref } from "vue";
import { object, string } from "yup";

const loading = ref(false);

const schema = object({
  email: string().required().email().label("E-mail"),
  password: string().required().min(8).label("Password"),
});

const onSubmit = async (values: any) => {
  loading.value = true;

  await signInWithEmailAndPassword(
    getAuth(),
    values["email"],
    values["password"],
  );

  router.replace("/");

  loading.value = false;
};
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="w-screen h-screen flex flex-col items-start justify-center gap-4 xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8"
  >
    <div class="text-4xl font-bold w-full text-center">blur</div>
    <div class="flex flex-col w-full">
      <Field
        name="email"
        class="w-full bg-container border h-8 p-1"
        placeholder="E-mail"
      />
      <ErrorMessage name="email" class="text-red-500" />
    </div>

    <div class="flex flex-col w-full">
      <Field
        name="password"
        type="password"
        class="w-full bg-container border h-8 p-1"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-500" />
    </div>

    <button
      class="w-full h-8 p-2 bg-primary flex items-center justify-center cursor-pointer border"
    >
      <div v-if="loading">
        <WaveSpinner />
      </div>
      <div v-else>Sign In</div>
    </button>
    <div class="w-full flex flex-row items-center gap-2">
      <div class="bg-gray-400 h-0.5 w-full"></div>
      <div class="text-md text-gray-400">OR</div>
      <div class="bg-gray-400 h-0.5 w-full"></div>
    </div>
    <div class="flex flex-row items-center justify-center w-full">
      <div
        class="flex justify-center items-center p-2 bg-primary border cursor-pointer"
      >
        <RiGoogleFill color="white" />
      </div>
    </div>
    <div class="flex flex-row w-full justify-center items-center gap-2">
      <div class="text-md">Don't have an account?</div>
      <RouterLink to="/sign-up" class="text-md text-primary underline"
        >Sign Up</RouterLink
      >
    </div>
  </Form>
</template>

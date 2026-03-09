<script lang="ts" setup>
import router from '@/router';
import { RiAtLine } from '@remixicon/vue';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { object, string } from 'yup';

const loading = ref(false);

const schema = object({ name: string().required(), handle: string().required().min(8) })

const db = getFirestore()
const auth = getAuth()

const onSubmit = async (values: any) => {
    loading.value = true;

    const valueData = JSON.parse(JSON.stringify(values));

    await setDoc(doc(db, "profiles", auth.currentUser?.uid!), { "name": valueData["name"], "handle": valueData['handle'], "circles": ["00000"] })

    router.replace('/');

    loading.value = false;
};
</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema"
        class="w-screen h-screen flex flex-col items-start justify-center gap-4 xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8">
        <div class="text-4xl font-bold w-full text-center">profile setup</div>
        <div class="flex flex-col w-full">
            <Field name="name" class="w-full bg-container border h-8 p-1" placeholder="Name" />
            <ErrorMessage name="name" class="text-red-500" />
        </div>

        <div class="flex flex-col w-full">
            <div class="flex flex-row items-center gap-2">
                <div class="flex items-center justify-center bg-container border p-1 h-full">
                    <RiAtLine />
                </div>
                <Field name="handle" class="w-full h-full bg-container border p-1" placeholder="Handle" />
            </div>
            <ErrorMessage name="handle" class="text-red-500" />
        </div>

        <button class="w-full h-8 p-2 bg-primary flex items-center justify-center cursor-pointer border">
            <div v-if="loading">Loading</div>
            <div v-else>
                Continue
            </div>
        </button>
    </Form>
</template>
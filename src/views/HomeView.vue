<script lang="ts" setup>
import BlurtTemplate from "@/components/BlurtTemplate.vue";
import ParentContainer from "@/components/ParentContainer.vue";
import router from "@/router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRoute } from "vue-router";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        router.replace('/sign-up');
    }

    const docRef = doc(db, "profiles", user?.uid!);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        router.replace('/profile-setup');
    }
})

const route = useRoute()
</script>

<template>
    <ParentContainer>
        <div
            class="flex flex-col items-center justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4">
            <div class="w-full text-4xl font-bold ">blur</div>

            <BlurtTemplate />
            <BlurtTemplate />
            <BlurtTemplate />
            <BlurtTemplate />
            <BlurtTemplate />
            <BlurtTemplate />
            <BlurtTemplate />
        </div>
    </ParentContainer>
</template>
<script lang="ts" setup>
import router from "@/router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";


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
</script>

<template>Home Page</template>
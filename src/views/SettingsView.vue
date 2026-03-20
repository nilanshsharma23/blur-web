<script lang="ts" setup>
import ParentContainer from "@/components/ParentContainer.vue";
import WaveSpinner from "@/components/WaveSpinner.vue";
import router from "@/router";
import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref } from "vue";

const loading = ref(false);
const uid = ref("");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  uid.value = user?.uid!;
});

const onSignOutClicked = async () => {
  loading.value = true;

  await signOut(getAuth());

  router.replace("/sign-in");

  loading.value = false;
};

const onDeleteAccountClicked = async () => {
  loading.value = true;

  const db = getFirestore();

  const q = query(
    collection(db, "circles"),
    where("moderators", "array-contains", uid.value),
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(async (document) => {
    const id = document.id;

    await updateDoc(doc(db, "circles", id), {
      moderators: arrayRemove(getAuth().currentUser?.uid!),
    });
  });

  await deleteUser(getAuth().currentUser!);

  loading.value = false;
};
</script>

<template>
  <ParentContainer>
    <div
      class="flex flex-col items-center justify-start xl:pl-128 xl:pr-128 lg:pl-64 lg:pr-64 md:pl-32 md:pr-32 sm:pl-16 sm:pr-16 pl-8 pr-8 pt-4 gap-4"
    >
      <div class="text-2xl cursor-pointer" @click="onSignOutClicked">
        Sign Out
      </div>
      <div
        class="text-2xl cursor-pointer text-red-500"
        @click="onDeleteAccountClicked"
      >
        Delete Account
      </div>
      <WaveSpinner v-if="loading" />
    </div>
  </ParentContainer>
</template>

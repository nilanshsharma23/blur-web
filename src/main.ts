import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const app = createApp(App);
app.use(router);

app.mount("#app");

initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

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

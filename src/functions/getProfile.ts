import { doc, getDoc, getFirestore } from "firebase/firestore"

export const getProfile = async (uid: string) => {
    const db = getFirestore();

    const data = (await getDoc(doc(db, "profiles", uid))).data();

    return data;
}
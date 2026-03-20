import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getPosts = async (circleCode: String) => {
  const db = getFirestore();

  const output = [];
  const profileCache = [];

  //const q = query(collection(db, circleCode), orderBy("created_at"))
};

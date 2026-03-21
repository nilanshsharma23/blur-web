import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

export const getPosts = async (circleCode: string) => {
  const db = getFirestore();

  const output: Array<{
    anonymous: boolean;
    content: string;
    created_at: Timestamp;
    profile: { user_id: string; name: string; handle: string };
  }> = [];
  const profileCache: Array<{ user_id: string; name: string; handle: string }> =
    [];

  const q = await getDocs(
    query(collection(db, circleCode), orderBy("created_at", "desc"), limit(10)),
  );

  for (const document of q.docs) {
    const data = document.data();
    var profile: { user_id: string; name: string; handle: string } | undefined =
      profileCache.find((value) => value.user_id == data["user_id"]);

    if (profile === undefined) {
      const profileSnapshot = await getDoc(
        doc(db, "profiles", data["user_id"]),
      );
      const profileData = profileSnapshot.data();

      profile = {
        user_id: profileSnapshot.id,
        name: profileData!["name"],
        handle: profileData!["handle"],
      };

      profileCache.push(profile);
    }

    output.push({
      anonymous: data["anonymous"],
      content: data["content"],
      created_at: data["created_at"],
      profile: profile,
    });
  }

  return output;
};

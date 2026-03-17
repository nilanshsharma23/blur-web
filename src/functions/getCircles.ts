import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getProfile } from "./getProfile";

export const getCircles = async (uid: string) => {
  const db = getFirestore();

  let output = [];

  const circleCodes = (await getProfile(uid))!["circles"];

  for (let i = 0; i < circleCodes.length; i++) {
    const circleCode = circleCodes[i];

    const circleData = (await getDoc(doc(db, "circles", circleCode))).data();

    output.push({ code: circleCode, name: circleData!["name"] });
  }

  return output;
};

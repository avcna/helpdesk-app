import { firestore } from "./config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  deleteDoc,
  and,
} from "firebase/firestore";

const userRef = collection(firestore, "users");

export const postUserData = async (data) => {
  await addDoc(userRef, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserByEmail = async (email) => {
  try {
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return users;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

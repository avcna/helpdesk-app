import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

export const registerAPI = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    alert(err);
  }
};

export const loginAPI = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    alert(err);
  }
};

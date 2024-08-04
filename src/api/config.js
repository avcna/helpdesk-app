// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGHV5sp3OHkhy8ZrIS018k8EQOvHl81dU",
  authDomain: "helpdesk-app-95ed4.firebaseapp.com",
  projectId: "helpdesk-app-95ed4",
  storageBucket: "helpdesk-app-95ed4.appspot.com",
  messagingSenderId: "377053043581",
  appId: "1:377053043581:web:b354de60b35120bbc90a14",
  measurementId: "G-PZ1PK39E6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, auth, firestore, storage };

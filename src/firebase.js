// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKK1e6XynlIMD3-9rJCOqkfOJHHUlcSFU",
  authDomain: "clone-babbe.firebaseapp.com",
  projectId: "clone-babbe",
  storageBucket: "clone-babbe.firebasestorage.app",
  messagingSenderId: "467247605510",
  appId: "1:467247605510:web:ea09c7ce9e8283ef31e087",
  measurementId: "G-VXCKSM56ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };

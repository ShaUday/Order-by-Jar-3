// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo6wPqS4MsYEtOdnpV1egcoaU-fIjdqtQ",
  authDomain: "orderbyjar2.firebaseapp.com",
  projectId: "orderbyjar2",
  storageBucket: "orderbyjar2.appspot.com",
  messagingSenderId: "239320684751",
  appId: "1:239320684751:web:6390503be88d40b8d23fba",
  measurementId: "G-W4LYW4GM21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Get Firestore instance
const storage = getStorage(app); // Get Storage instance

export { auth, db, storage };

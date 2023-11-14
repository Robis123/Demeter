// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, addDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuTz51FrhMgRnQqQ-XK94vBqB9jgtXVTY",
  authDomain: "demeter-2a73f.firebaseapp.com",
  projectId: "demeter-2a73f",
  storageBucket: "demeter-2a73f.appspot.com",
  messagingSenderId: "221312520191",
  appId: "1:221312520191:web:16411649864ae2549361ca",
  measurementId: "G-W4112HM4G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {app, db, getFirestore, collection, addDoc};
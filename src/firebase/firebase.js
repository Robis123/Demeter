// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, addDoc} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfdF354IBXpAQoLVTYF_vVEziKaTkOg14",
  authDomain: "demetermobile-dce96.firebaseapp.com",
  projectId: "demetermobile-dce96",
  storageBucket: "demetermobile-dce96.appspot.com",
  messagingSenderId: "102409683902",
  appId: "1:102409683902:web:e4af39855baefb5a1defef",
  measurementId: "G-3N99SY698P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {app, db, getFirestore, collection, addDoc};
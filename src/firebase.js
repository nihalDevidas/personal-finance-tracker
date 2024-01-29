// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCu2ECNXgRW38dWzp0PUj2QrNtrm_UYWzo",
  authDomain: "financely-7517f.firebaseapp.com",
  projectId: "financely-7517f",
  storageBucket: "financely-7517f.appspot.com",
  messagingSenderId: "964998959213",
  appId: "1:964998959213:web:0b49bbf69e13c6c05eaf64",
  measurementId: "G-Y2B99QG10L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy4tR2qsjgwn8XSE01Bsq75-Go1oCPcf8",
  authDomain: "bookapp-be811.firebaseapp.com",
  projectId: "bookapp-be811",
  storageBucket: "bookapp-be811.appspot.com",
  messagingSenderId: "843525415259",
  appId: "1:843525415259:web:0a7de1da4736226ebbfa7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

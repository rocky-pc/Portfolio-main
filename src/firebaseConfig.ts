import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_G2-Ka05cq5eFHmaBQjUBThJL3kZSssY",
  authDomain: "tech-orders-ef61f.firebaseapp.com",
  projectId: "tech-orders-ef61f",
  storageBucket: "tech-orders-ef61f.firebasestorage.app",
  messagingSenderId: "532841721281",
  appId: "1:532841721281:web:222f6464bcec3d1bd0d340",
  measurementId: "G-4L1SFV3W5C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

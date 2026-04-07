import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf4e1CmmqK-tHegTudqTygBhH9EomXVCw",
  authDomain: "app-49834.firebaseapp.com",
  projectId: "app-49834",
  storageBucket: "app-49834.firebasestorage.app",
  messagingSenderId: "777710219005",
  appId: "1:777710219005:web:73e6a20cac5f4387075894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
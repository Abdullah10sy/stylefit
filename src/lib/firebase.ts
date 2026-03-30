import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOKrVIQlQk_igHSlPmSUD_f9o6mXncg6A",
  authDomain: "style-ai-fe0c6.firebaseapp.com",
  projectId: "style-ai-fe0c6",
  storageBucket: "style-ai-fe0c6.firebasestorage.app",
  messagingSenderId: "687739859098",
  appId: "1:687739859098:web:e4665659059d4e13aaaf23",
  measurementId: "G-6WHKDD5HJ7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

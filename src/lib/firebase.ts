import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // PASTE YOUR CONFIG HERE (from Firebase console)
  apiKey: "AIzaSy...",
  authDomain: "taskflow-khasif.firebaseapp.com",
  projectId: "taskflow-khasif",
  storageBucket: "taskflow-khasif.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

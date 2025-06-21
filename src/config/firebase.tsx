import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyACpMEvl1rCROR72TPFUJL38E5iqNGI-zI",
  authDomain: "monah-ai.firebaseapp.com",
  databaseURL: "https://monah-ai-default-rtdb.firebaseio.com",
  projectId: "monah-ai",
  storageBucket: "monah-ai.firebasestorage.app",
  messagingSenderId: "37108718640",
  appId: "1:37108718640:web:5446955a4893eea2c7a1f5",
  measurementId: "G-R40TDWL0FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db, analytics }; 
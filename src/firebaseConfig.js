import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWwpxTZLXmOtH9sDy-ICSWZHOZVRxttC0",
  authDomain: "product-manager-app-bbf73.firebaseapp.com",
  projectId: "product-manager-app-bbf73",
  storageBucket: "product-manager-app-bbf73.appspot.com",  // Can keep or remove (it's harmless if config has it)
  messagingSenderId: "1049747316761",
  appId: "1:1049747316761:web:881416887d4815b8574a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// ✅ src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ REQUIRED IMPORT

// TODO: Replace these placeholder values with your actual Firebase configuration
// You can find these values in your Firebase Console under Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyDWwpxTZLXmOtH9sDy-ICSWZHOZVRxttC0",
    authDomain: "product-manager-app-bbf73.firebaseapp.com",
    projectId: "product-manager-app-bbf73",
    storageBucket: "product-manager-app-bbf73.firebasestorage.app",
    messagingSenderId: "1049747316761",
    appId: "1:1049747316761:web:881416887d4815b8574a88"
  };

const app = initializeApp(firebaseConfig);

// ✅ Get Firestore instance
const db = getFirestore(app);

export { db };

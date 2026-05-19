import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "my-app-e1f0c.firebaseapp.com",
  projectId: "my-app-e1f0c",
  storageBucket: "my-app-e1f0c.firebasestorage.app",
  messagingSenderId: "790987486161",
  appId: "1:790987486161:web:0e00c94ff7c442fb4f26f0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyDAh5AoZhM02GZrEXn6rzQBCXwZZ89zCHU",
    authDomain: "bdnosql-59def.firebaseapp.com",
    projectId: "bdnosql-59def",
    storageBucket: "bdnosql-59def.firebasestorage.app",
    messagingSenderId: "693412492447",
    appId: "1:693412492447:web:0204d931558e9be932deaa",
    measurementId: "G-N1RYK4YXBK"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

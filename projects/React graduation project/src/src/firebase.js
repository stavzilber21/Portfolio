// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL6drwqXdgk64bQ_xZDfhZHVuWIF2DYnE",
  authDomain: "reactfinish.firebaseapp.com",
  projectId: "reactfinish",
  storageBucket: "reactfinish.appspot.com",
  messagingSenderId: "492387854310",
  appId: "1:492387854310:web:6e2e2841706b6719db5827"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
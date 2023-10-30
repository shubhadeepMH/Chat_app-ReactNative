// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkVB2Q3mzCorDBUt-uaSDLAsOeMrufORA",
  authDomain: "chit-chat-93ac8.firebaseapp.com",
  projectId: "chit-chat-93ac8",
  storageBucket: "chit-chat-93ac8.appspot.com",
  messagingSenderId: "1075819104578",
  appId: "1:1075819104578:web:f1c49399fdb1b34f2aa0db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db} ;
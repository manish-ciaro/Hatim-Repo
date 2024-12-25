import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFuPL_5vR5tTsoaOhrTkU9ByogylanJgM",
  authDomain: "react-routing-eb19f.firebaseapp.com",
  projectId: "react-routing-eb19f",
  storageBucket: "react-routing-eb19f.firebasestorage.app",
  messagingSenderId: "294711176935",
  appId: "1:294711176935:web:170a5a710a25ba16ef7c42",
  measurementId: "G-WBRW4JY16K",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp); 

export { firebaseApp };

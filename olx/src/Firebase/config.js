import { initializeApp } from "firebase/app";
import { getAuth,browserSessionPersistence,setPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlNQjRMBbwbo5H8rJTpUPJIvrb82MwPYs",
  authDomain: "olx-clone-36293.firebaseapp.com",
  projectId: "olx-clone-36293",
  storageBucket: "olx-clone-36293.appspot.com",
  messagingSenderId: "962944022043",
  appId: "1:962944022043:web:f00bb402d1b4e42aeb2abe"
};

const init = initializeApp(firebaseConfig);
export const auth = getAuth(init);
export const firestore = getFirestore(init);
export const db=getDatabase(init);
setPersistence(auth, browserSessionPersistence);

import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD_0ZlCCXm5Jp23VCeZpsTTBKb-YuYkg9k",
    authDomain: "chat-gpt-clone-53bfd.firebaseapp.com",
    projectId: "chat-gpt-clone-53bfd",
    storageBucket: "chat-gpt-clone-53bfd.appspot.com",
    messagingSenderId: "818788271413",
    appId: "1:818788271413:web:49c16cc13f8e8e82d9f87c",
    measurementId: "G-ZFV5R16V89"
  };
  
  // Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db= getFirestore(app)

export {db}
 
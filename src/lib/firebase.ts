import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDT2kjMlcGZQNTB4RvLOrsWJEFFLaLIZr0",
  authDomain: "saas-translation-mmm.firebaseapp.com",
  projectId: "saas-translation-mmm",
  storageBucket: "saas-translation-mmm.appspot.com",
  messagingSenderId: "548358895510",
  appId: "1:548358895510:web:c2cafa5aea975b12b58fb7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
const functions = getFunctions(app);

export { db, firebaseAuth, functions };

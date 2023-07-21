import { initializeApp } from "firebase/app";

import {getAuth , GoogleAuthProvider} from  "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBA5_RfcDw8RYAd0ZWPijNwIUXx0zEb_e4",
  authDomain: "superchatapp-d3975.firebaseapp.com",
  projectId: "superchatapp-d3975",
  storageBucket: "superchatapp-d3975.appspot.com",
  messagingSenderId: "963833733444",
  appId: "1:963833733444:web:0aae281d88079994e4b711",
  measurementId: "G-VNFQEYXKG9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = new getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbef9-0DrJPPpigFhnDt3TgugBWFjVap4",
  appId: "1:844320660699:web:e27367c92531b5c31b80fe",
  messagingSenderId: "844320660699",
  projectId: "iot-database-47d75",
  authDomain: "iot-database-47d75.firebaseapp.com",
  storageBucket: "iot-database-47d75.appspot.com",
  measurementId: "G-7PRTBE697N",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

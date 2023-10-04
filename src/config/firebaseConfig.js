// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore} from 'firebase/firestore'

import {getAuth} from 'firebase/auth'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsyFAAg8m_ShOvBaaipOrZ8besAc2LuJs",
  authDomain: "fb-fakestore.firebaseapp.com",
  projectId: "fb-fakestore",
  storageBucket: "fb-fakestore.appspot.com",
  messagingSenderId: "1014711957814",
  appId: "1:1014711957814:web:99269122d79ce0d81a1b97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up auth and export it
export const auth = getAuth(app)

//set up database and export it
export const db = getFirestore(app)
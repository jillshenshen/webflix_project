import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD1C6u4SfCgN1Xw5Oggy6iAkZB9eMiO1YQ",
  authDomain: "webflix-project.firebaseapp.com",
  projectId: "webflix-project",
  storageBucket: "webflix-project.appspot.com",
  messagingSenderId: "868854807727",
  appId: "1:868854807727:web:0c2b656bcdf18b7bbbe85a",
  measurementId: "G-NQ8JTSTHKY"
};

// Initialize Firebase
export const app=firebase.initializeApp(firebaseConfig)

export const db=getFirestore(app)
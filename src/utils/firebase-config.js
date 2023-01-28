import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyCswg-lxt4MTs8KfngqNtT5xpHOH8u0C3Q",
  authDomain: "react-netflix-1d0ee.firebaseapp.com",
  projectId: "react-netflix-1d0ee",
  storageBucket: "react-netflix-1d0ee.appspot.com",
  messagingSenderId: "615310670677",
  appId: "1:615310670677:web:5e67200d2675961e7c8ddc",
  measurementId: "G-D7VTXJMV7W"
};

// Initialize Firebase
export const app=firebase.initializeApp(firebaseConfig)
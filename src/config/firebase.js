// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnkzaJUHSP685lszpLWpAq8VCNacOqqa8",
  authDomain: "laundryhubvn.firebaseapp.com",
  projectId: "laundryhubvn",
  storageBucket: "laundryhubvn.appspot.com",
  messagingSenderId: "72400105596",
  appId: "1:72400105596:web:0d5992644fe4467d6899f9",
  measurementId: "G-M7MPCP5XC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export { storage, app };
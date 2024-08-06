// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD32XVZ7EwclQZJdWf_i6GpE7uCsOFREPs",
  authDomain: "streamgpt-25608.firebaseapp.com",
  projectId: "streamgpt-25608",
  storageBucket: "streamgpt-25608.appspot.com",
  messagingSenderId: "308729972474",
  appId: "1:308729972474:web:7e36b13ef23d1e9605ab43",
  measurementId: "G-XSEGQT3ZSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
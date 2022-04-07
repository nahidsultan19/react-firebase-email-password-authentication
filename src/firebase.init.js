// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQnCipemyrSVfccpj0eI64J9sXPQ0_k2M",
    authDomain: "user-email-pass-auth.firebaseapp.com",
    projectId: "user-email-pass-auth",
    storageBucket: "user-email-pass-auth.appspot.com",
    messagingSenderId: "611220926919",
    appId: "1:611220926919:web:b8e22cc3ae895cab7e69e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
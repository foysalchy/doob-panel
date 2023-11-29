// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXdsn4eapyFxDuLp-0yLdcHSIc6zJsQ4I",
    authDomain: "Doob-project.firebaseapp.com",
    projectId: "Doob-project",
    storageBucket: "Doob-project.appspot.com",
    messagingSenderId: "104288411234",
    appId: "1:104288411234:web:ed171d441783c77beabb3b",
    measurementId: "G-VVZSE33FDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
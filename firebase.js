// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYIpN93GHyd0Co_tKx4JNgf5FI_TFFuyw",
    authDomain: "remindar-193c3.firebaseapp.com",
    projectId: "remindar-193c3",
    storageBucket: "remindar-193c3.appspot.com",
    messagingSenderId: "156350107406",
    appId: "1:156350107406:web:428cdc2eb911fe5170d15f",
    measurementId: "G-FEPG5DN1XG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

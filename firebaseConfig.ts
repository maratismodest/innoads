import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyDd2-N8nPf1DNW6sv2-rz6kM5aaZ1iph34",
    authDomain: "classified-b8322.firebaseapp.com",
    databaseURL:
        "https://classified-b8322-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "classified-b8322",
    storageBucket: "classified-b8322.appspot.com",
    messagingSenderId: "251166938332",
    appId: "1:251166938332:web:1df13b4e18bf6ad5e4d019",
    measurementId: "G-JRKZW146KX",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};
export const firestore = firebase.firestore();
export const storage = firebase.storage();

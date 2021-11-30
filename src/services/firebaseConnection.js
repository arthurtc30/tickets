import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDxwQpG2ZS0m8H5pQ92W-6fEjjvGP94yAM",
    authDomain: "sistema-fbcf9.firebaseapp.com",
    projectId: "sistema-fbcf9",
    storageBucket: "sistema-fbcf9.appspot.com",
    messagingSenderId: "1053148262498",
    appId: "1:1053148262498:web:53502d2c404153612d613b",
    measurementId: "G-S2MQ663TKX"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

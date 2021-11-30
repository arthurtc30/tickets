import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDxwQpG2ZS0m8H5pQ92W-6fEjjvGP94yAM",
    authDomain: "sistema-98d1c.firebaseapp.com",
    projectId: "sistema-98d1c",
    storageBucket: "sistema-98d1c.appspot.com",
    messagingSenderId: "995118095071",
    appId: "1:995118095071:web:a193deadfeb858ada4a76a",
    measurementId: "G-PK1LX99KQE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

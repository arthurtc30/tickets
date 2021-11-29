import firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyC2RGcipfqIVNnqoQF05CadLKO4e4bgVWc",
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

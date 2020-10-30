// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCZMhs2-gZSzmw4gE7q4yVGkQ54JvtbM6s",
    authDomain: "whatsapp-clone-6f1f9.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-6f1f9.firebaseio.com",
    projectId: "whatsapp-clone-6f1f9",
    storageBucket: "whatsapp-clone-6f1f9.appspot.com",
    messagingSenderId: "1087750075235",
    appId: "1:1087750075235:web:87b7d7a09f583a64529956",
    measurementId: "G-T27FJ21H8S"
  };

// Initializing our firebase app using the firebase configuration
// that we copied from our firebase console
const firebaseApp = firebase.initializeApp(firebaseConfig);

//this is the database 
const db = firebaseApp.firestore();   

// this is our Authentication provider 
const auth = firebase.auth()                 

// this is our OAuth provider
const provider = new firebase.auth.GoogleAuthProvider();  

export { auth, provider};
export default db;
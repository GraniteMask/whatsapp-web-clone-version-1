// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "",
    authDomain: "whatsapp-firebase-12571.firebaseapp.com",
    databaseURL: "https://whatsapp-firebase-12571.firebaseio.com",
    projectId: "whatsapp-firebase-12571",
    storageBucket: "whatsapp-firebase-12571.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db

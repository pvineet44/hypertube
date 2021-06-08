import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNFKK05o2-NsxWMLhA1G_U3mnKSrYH7gg",
  authDomain: "hypertube-d9f3e.firebaseapp.com",
  projectId: "hypertube-d9f3e",
  storageBucket: "hypertube-d9f3e.appspot.com",
  messagingSenderId: "214979707970",
  appId: "1:214979707970:web:9613bc387c0c7ecdf0d9db",
  measurementId: "G-V251ZH4WZB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

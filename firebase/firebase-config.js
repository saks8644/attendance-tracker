// Firebase v9+ compat style, to work with <script> CDN in HTML

const firebaseConfig = {
  apiKey: "AIzaSyDZxoLRgJffMFiPD27rkqv34oTOMIRHaS0",
  authDomain: "attendance-tracker-5698d.firebaseapp.com",
  projectId: "attendance-tracker-5698d",
  storageBucket: "attendance-tracker-5698d.appspot.com",
  messagingSenderId: "1057110435379",
  appId: "1:1057110435379:web:030537af46eed42b11a546",
  measurementId: "G-N0EBBG0VE0"
};

// Initialize Firebase (compat SDK, no imports needed here)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

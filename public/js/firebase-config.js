// ====== FIREBASE CONFIGURATION ======
const firebaseConfig = {
  apiKey: "AIzaSyDdQn-SeakKc8cLVATPjCW8x1RzvtjnIBs",
  authDomain: "clinica-ativamente.firebaseapp.com",
  projectId: "clinica-ativamente",
  storageBucket: "clinica-ativamente.firebasestorage.app",
  messagingSenderId: "73202377832",
  appId: "1:73202377832:web:5d42477d7feea9d8b587dd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Enable offline persistence for Firestore (optional)
db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.log('The current browser does not support all of the features required to enable persistence');
    }
  });

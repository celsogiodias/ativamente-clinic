const firebaseConfig = {
  apiKey: "AIzaSyDdQn-SeakKc8cLVATPjCW8x1RzvtjnIBs",
  authDomain: "clinica-ativamente.firebaseapp.com",
  projectId: "clinica-ativamente",
  storageBucket: "clinica-ativamente.firebasestorage.app",
  messagingSenderId: "73202377832",
  appId: "1:73202377832:web:5d42477d7feea9d8b587dd"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Persistência falhou: várias abas abertas');
    } else if (err.code === 'unimplemented') {
      console.log('Persistência não disponível neste navegador');
    }
  });

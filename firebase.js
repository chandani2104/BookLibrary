import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAfaBeK4qeXrQCLp97Xep6y9Ernmeh02JE",
  authDomain: "booklibrary-b8334.firebaseapp.com",
  databaseURL: "https://booklibrary-b8334-default-rtdb.firebaseio.com",
  projectId: "booklibrary-b8334",
  storageBucket: "booklibrary-b8334.firebasestorage.app",
  messagingSenderId: "505341816930",
  appId: "1:505341816930:web:e6a348600f71cf8f58613b"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
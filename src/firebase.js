import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5KkEysKgxhPn2rOTVE76Hf3JGU37U5_Y",
    authDomain: "sight-reading-trainer-898b0.firebaseapp.com",
    projectId: "sight-reading-trainer-898b0",
    storageBucket: "sight-reading-trainer-898b0.appspot.com",
    messagingSenderId: "6764430054",
    appId: "1:6764430054:web:b7fce180a936b4e25ab127",
    measurementId: "G-PDT5BBJ6MT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
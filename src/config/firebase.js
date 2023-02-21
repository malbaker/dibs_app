import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:             import.meta.env.VITE_apiKey,
    authDomain:         import.meta.env.VITE_authDomain,
    projectId:          import.meta.env.VITE_projectId,
    storageBucket:      import.meta.env.VITE_storageBucket,
    messagingSenderId:  import.meta.env.VITE_messagingSenderId,
    appId:              import.meta.env.VITE_appId,
    measurementId:      import.meta.env.VITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
/* 
const firestoreDB = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line <-- throws error
})
*/
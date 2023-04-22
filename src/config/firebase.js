import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  query,
  collection,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const auth = getAuth(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      (async () => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            myPosts: [],
            myFavorites: [],
            myClaims: [],
          });
        } else {
          console.log("User already exists");
        }
      })();
    })
    .catch((error) => {
      console.error(error);
    });
}

const logout = () => {
  signOut(auth);
  window.location.reload();
};

export { db, auth, storage, googleSignIn, logout };

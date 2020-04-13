import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB-dSBtK6ax4GUTxOcET4HxJ-2uBCaM9RA",
  authDomain: "mrch-db.firebaseapp.com",
  databaseURL: "https://mrch-db.firebaseio.com",
  projectId: "mrch-db",
  storageBucket: "mrch-db.appspot.com",
  messagingSenderId: "256631773595",
  appId: "1:256631773595:web:d7ecb3c6250b1bf314293e",
  measurementId: "G-5SCGK31G10",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

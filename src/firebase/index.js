import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/functions";

import { firebaseConfig } from "../../env";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

// Firebase utils
const fireStore = firebase.firestore();
const fireAuth = firebase.auth();
const fireFunctions = firebase.functions();
const fireStorage = firebase.storage();
const Timestamp = firebase.firestore.Timestamp;
const { FieldValue } = firebase.firestore;

export {
  fireStore,
  fireAuth,
  fireFunctions,
  fireStorage,
  Timestamp,
  FieldValue
};

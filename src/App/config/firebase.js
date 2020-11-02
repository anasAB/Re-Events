import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtwi3yuk0nNLDnNFW0NOqpsHQxS2hRT6c",
  authDomain: "re-events-80443.firebaseapp.com",
  databaseURL: "https://re-events-80443.firebaseio.com",
  projectId: "re-events-80443",
  storageBucket: "re-events-80443.appspot.com",
  messagingSenderId: "359349428114",
  appId: "1:359349428114:web:40fa4184d057ca7b5deb4b",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

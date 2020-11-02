import firebase from "../config/firebase.js";
import { isDate } from "lodash";
const db = firebase.firestore();

//! Shape the data to be usable
export function dataFromSnapShot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  if (!isDate(data.date)) {
    return { ...data, date: data.date.toDate() };
  }

  return { ...data, id: snapshot.id };
}

export function listenEventsFromFirestore() {
  return db.collection("events");
}

export function listenToEventFromFirestore(eventId) {
  console.log("EVENT FROM STORE", db.collection("events").doc(eventId));
  return db.collection("events").doc(eventId);
}

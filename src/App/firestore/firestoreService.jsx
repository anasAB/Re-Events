import firebase from "../config/firebase.js";
import cuid from "cuid";

const db = firebase.firestore();

//**! Shape the data to be usable */
export function dataFromSnapShot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function listenEventsFromFirestore() {
  return db.collection("events").orderBy("date");
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

//**! Add Event*/
export function addEventToFirestore(event) {
  return db.collection("events").add({
    ...event,
    hostedBy: "ME new User",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/22.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Me",
      photoURL: "https://randomuser.me/api/portraits/women/72.jpg",
    }),
  });
}

//**! Updated Event*/
export function updateEventToFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

//**! Deleted Event*/
export function deletedEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

//**! Cancel Event */
export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

//**! Set user Profile Data */
export function setUserProfile(user) {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

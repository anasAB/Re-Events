import firebase from "../config/firebase.js";

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
//**! get Events */
export function listenEventsFromFirestore(predicate) {
  const user = firebase.auth().currentUser;
  let eventsRef = db.collection("events").orderBy("date");
  switch (predicate.get("filter")) {
    case "isGoing":
      return eventsRef
        .where("attendeeIds", "array-contains", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    case "isHosting":
      return eventsRef
        .where("hostUid", "==", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    default:
      return db.collection("events").orderBy("date");
  }
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

//**! Add Event*/
export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

//**! get user Profile */
export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

//**! Updated user Profile */
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

//**! Add User Attendee */
export async function addUSerAttendace(event) {
  const user = firebase.auth().currentUser;

  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

//**! Cancel the Attendee  */
export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection("events").doc(event.id).get();
    return db
      .collection("events")
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

//**! Query Event Future Past & Hosted*/
export function getUserEventQuery(activeTab, userId) {
  const today = new Date();
  let eventsRef = db.collection("events");
  switch (activeTab) {
    case 1: //!Past Event
      return eventsRef
        .where("attendeeIds", "array-contains", userId)
        .where("date", "<=", today)
        .orderBy("date", "desc");

    case 2:
      return eventsRef.where("hostUid", "==", userId).orderBy("date");
    default:
      return eventsRef
        .where("attendeeIds", "array-contains", userId)
        .orderBy("date");
  }
}

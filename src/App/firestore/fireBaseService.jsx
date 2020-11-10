import firebase from "../config/firebase.js";
import { toastr } from "react-redux-toastr";

export function signInWithEmail(payload) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerUser(user) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    return await result.user.updateProfile({ displayName: user.displayName });
  } catch (error) {
    toastr.error(error.message);
  }
}

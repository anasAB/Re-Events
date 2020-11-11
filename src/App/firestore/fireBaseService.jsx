import firebase from "../config/firebase.js";
import { toastr } from "react-redux-toastr";
import { setUserProfile } from "./firestoreService.jsx";

//**! signInWithEmail */
export function signInWithEmail(payload) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password);
}

//**! signOutFirebase */
export function signOutFirebase() {
  return firebase.auth().signOut();
}

//**! registerUser */
export async function registerUser(user) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    await result.user.updateProfile({ displayName: user.displayName });

    return (
      await setUserProfile(result.user),
      toastr.success("Welcome", user.displayName, "To Our Events")
    );
  } catch (error) {
    toastr.error("Register", error.message);
  }
}

//**! Socaila LogIn */
export async function socialLogIn(selectedProvider) {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      toastr.success("Welcome", result.user.displayName);
      return await setUserProfile(result.user);
    }
    return toastr.success("Welcome Back", result.user.displayName);
  } catch (error) {
    toastr.error("socialLogIn", error.message);
  }
}

//**! Update Password */
export function updateUserPassword(newPassword) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(newPassword.newPassword1);
}

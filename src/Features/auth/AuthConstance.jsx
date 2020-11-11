import { APP_LOADED } from "../../App/async/asyncReducer.jsx";
import firebase from "../../App/config/firebase.js";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export function signInUser(user) {
  return {
    type: SIGN_IN,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOut());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

//! Reducer
const InitialState = {
  authenticated: false,
  currentUser: null,
};

export default function authReducer(state = InitialState, { type, payload }) {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}

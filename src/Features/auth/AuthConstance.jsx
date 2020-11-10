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
      } else {
        dispatch(signOut());
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
        currentUser: { email: payload.email },
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

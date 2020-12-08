import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENT,
  LISTEN_FOLLOW_USER,
  LISTEN_UNFOLLOW_USER,
  CLEAR_FOLLOWER,
} from "./ProfileConstants";
import { follower } from "../../App/firestore/firestoreService";

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  profileEvent: [],
  follower: [],
  followings: [],
  followingUSer: false,
};

export default function profileReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload,
      };
    case LISTEN_TO_USER_EVENT:
      return { ...state, profileEvent: payload };
    case LISTEN_TO_FOLLOWERS:
      return { ...state, follower: payload };
    case LISTEN_TO_FOLLOWINGS:
      return { ...state, followings: payload };
    case LISTEN_FOLLOW_USER:
      return { ...state, followingUSer: true };
    case LISTEN_UNFOLLOW_USER:
      return { ...state, followingUSer: false };
    case CLEAR_FOLLOWER:
      return { ...state, follower: [], followings: [] };
    default: {
      return state;
    }
  }
}

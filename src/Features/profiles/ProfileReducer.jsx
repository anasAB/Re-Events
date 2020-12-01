import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENT,
} from "./ProfileConstants";

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  profileEvent: [],
  follower: [],
  followings: [],
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
    default: {
      return state;
    }
  }
}

import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENT,
  LISTEN_FOLLOW_USER,
  LISTEN_UNFOLLOW_USER,
} from "./ProfileConstants";

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToSelectedUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
}

export function listenToUserEvents(events) {
  return {
    type: LISTEN_TO_USER_EVENT,
    payload: events,
  };
}

export function listenToFollower(follower) {
  return {
    type: LISTEN_TO_FOLLOWERS,
    payload: follower,
  };
}

export function listenToFollowing(followings) {
  return {
    type: LISTEN_TO_FOLLOWINGS,
    payload: followings,
  };
}
export function setFollowUser() {
  return {
    type: LISTEN_FOLLOW_USER,
  };
}

export function setUnFollowUser() {
  return {
    type: LISTEN_UNFOLLOW_USER,
  };
}

import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./EventsConstants";

//! Action Creators

export function creatEvent(payload) {
  return {
    type: CREATE_EVENT,
    payload: payload,
  };
}

export function deleteEvent(payload) {
  return {
    type: DELETE_EVENT,
    payload: payload,
  };
}

export function updateEvent(payload) {
  return {
    type: UPDATE_EVENT,
    payload,
  };
}

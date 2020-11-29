import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
  LISTEN_TO_EVENT_CHAT,
} from "./EventsConstants";

// const toastrOptions = {
//   timeOut: 1000,
//   removeOnHover: true,
//   removeOnHoverTimeOut: 1000,
//   closeOnToastrClick: true,
//   transitionIn: "bounceIn",
//   transitionOut: "bounceOut",
//   newestOnTop: true,
//   progressBar: false,
// };

//! Action Creators
export function listenToEvents(events) {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
}

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

export function listenToEventChat(comment) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comment,
  };
}

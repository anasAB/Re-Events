import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
  LISTEN_TO_EVENT_CHAT,
  CLEAR_EVENTS,
  LISTEN_TO_SELECTED_EVENT,
} from "./EventsConstants";
import {
  asyncActionStart,
  asyncActionFINISH,
  asyncActionERROR,
} from "../../App/async/asyncReducer";
import {
  fetchEventsFromFirestore,
  dataFromSnapShot,
} from "../../App/firestore/firestoreService";

//! Action Creators

export function fetchEvents(predicate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(
        predicate,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapShot(doc));
      dispatch({ type: FETCH_EVENTS, payload: { events, moreEvents } });
      dispatch(asyncActionFINISH());
      return lastVisible;
    } catch (error) {
      console.log("Error in FetchEvents", error.message);
      dispatch(asyncActionERROR(error));
    }
  };
}

export function listenToSelectedEvents(event) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
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

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  };
}

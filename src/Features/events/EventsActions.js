import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../../App/async/asyncReducer";
import { delay } from "../../App/common/util/util";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./EventsConstants";
import { toastr } from "react-redux-toastr";
import { fetchSampleData } from "../../App/api/mockApi";

const toastrOptions = {
  timeOut: 1000,
  removeOnHover: true,
  removeOnHoverTimeOut: 1000,
  closeOnToastrClick: true,
  // attention: true,
  transitionIn: "bounceIn",
  transitionOut: "bounceOut",
  newestOnTop: true,
  progressBar: false,
};

//! Action Creators
export function listenToEvents(events) {
  console.log("listenToEvents", events);
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

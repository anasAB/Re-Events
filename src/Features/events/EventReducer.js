import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
  LISTEN_TO_EVENT_CHAT,
  CLEAR_COMMENT,
} from "./EventsConstants";

const initialState = {
  events: [],
  comments: [],
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((event) => event.id !== payload)],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== payload.id),
          payload,
        ],
      };
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
}

import { combineReducers } from "redux";
import eventReducer from "../../Features/events/EventReducer";
import testReducer from "../../Features/sadbox/TestReducer";

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
});

export default rootReducer;

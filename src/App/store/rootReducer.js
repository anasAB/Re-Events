import { combineReducers } from "redux";
import eventReducer from "../../Features/events/EventReducer";
import testReducer from "../../Features/sadbox/TestReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  toastr: toastrReducer,
});

export default rootReducer;

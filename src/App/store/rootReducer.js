import { combineReducers } from "redux";
import eventReducer from "../../Features/events/EventReducer";
import testReducer from "../../Features/sadbox/TestReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import modalReducer from "../common/modal/ModalReducer";
import authReducer from "../../Features/auth/AuthConstance";
import async from "../async/asyncReducer.jsx";
import ProfileReducer from "../../Features/profiles/ProfileReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    test: testReducer,
    events: eventReducer,
    toastr: toastrReducer,
    modal: modalReducer,
    auth: authReducer,
    async: async,
    profile: ProfileReducer,
    router: connectRouter(history),
  });

export default rootReducer;

import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../../App/async/asyncReducer";
import { delay } from "../../App/common/util/util";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

//! Create Action Creator
export function increment(amount) {
  // return {
  //   type: INCREMENT_COUNTER,
  //   payload: amount,
  // };

  //**! with Async function*/
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFINISH());
    } catch (error) {
      dispatch(asyncActionERROR(error));
    }
  };
}

export function decrement(amount) {
  // return {
  //   type: DECREMENT_COUNTER,
  //   payload: amount,
  // };
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: DECREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFINISH());
    } catch (error) {
      dispatch(asyncActionERROR(error));
    }
  };
}

const intialState = {
  data: 40,
};

export default function testReducer(state = intialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}

//! Jest Test

// test("reducers", () => {
//   let state;
//   state = reducers({ data: 40 }, { type: "DECREMENT_COUNTER", payload: 2 });
//   expect(state).toEqual({ data: 38 });
// });

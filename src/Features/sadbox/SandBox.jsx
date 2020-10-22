import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { decrement, increment } from "./TestReducer";

export default function SandBox() {
  //! Dispatch give us access to dispatch store function
  const dispatch = useDispatch();
  const state = useSelector((state) => state.test.data);
  return (
    <>
      <h2>Test</h2>
      <h2>the Data is : {state}</h2>
      <Button
        content="Increment"
        color="green"
        onClick={() => dispatch(increment(3))}
      />

      <Button
        content="Decrement"
        color="red"
        onClick={() => dispatch(decrement(2))}
      />
    </>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../App/common/modal/ModalReducer";
import { decrement, increment } from "./TestReducer";

export default function SandBox() {
  //! Dispatch give us access to dispatch store function
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  const state = useSelector((state) => state.test.data);
  return (
    <>
      <h2>Test</h2>
      <h2>the Data is : {data}</h2>
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
      <Button
        content="Open Model"
        color="black"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { state } }))
        }
      />
    </>
  );
}

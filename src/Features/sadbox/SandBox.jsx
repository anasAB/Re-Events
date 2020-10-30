import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../App/common/modal/ModalReducer";
import { decrement, increment } from "./TestReducer";

export default function SandBox() {
  //! Dispatch give us access to dispatch store function
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  const state = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const [target, setTarget] = useState();
  return (
    <>
      <h2>Test</h2>
      <h2>the Data is : {data}</h2>
      <Button
        name="Increment"
        loading={loading && target === "Increment"}
        content="Increment"
        color="green"
        onClick={(e) => {
          dispatch(increment(3));
          setTarget(e.target.name);
        }}
      />

      <Button
        name="Decrement"
        loading={loading && target === "Decrement"}
        content="Decrement"
        color="red"
        onClick={(e) => {
          dispatch(decrement(2));
          setTarget(e.target.name);
        }}
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

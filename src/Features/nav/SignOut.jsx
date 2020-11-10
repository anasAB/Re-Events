import React from "react";
import { useDispatch } from "react-redux";
import { Button, Menu } from "semantic-ui-react";
import { openModal } from "../../App/common/modal/ModalReducer";

export default function SignOut() {
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="login"
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      />
      <Button
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
        basic
        inverted
        content="Register"
        style={{ marginleft: "0.5em" }}
      />
    </Menu.Item>
  );
}

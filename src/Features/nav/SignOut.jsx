import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignOut({ setAuthenticated }) {
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="login"
        onClick={() => setAuthenticated(true)}
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginleft: "0.5em" }}
      />
    </Menu.Item>
  );
}

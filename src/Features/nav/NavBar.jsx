import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedInMenu from "./SignedInMenu";
import SignOut from "./SignOut";
import { useSelector } from "react-redux";

export default function NavBar() {
  /**
   *! Fake Authentication
   */
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>

        <Menu.Item as={NavLink} to="/events" name="Events"></Menu.Item>
        <Menu.Item as={NavLink} to="test" name="test"></Menu.Item>

        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button positive inverted content="Create Event" />
          </Menu.Item>
        )}

        {authenticated ? <SignedInMenu /> : <SignOut />}
      </Container>
    </Menu>
  );
}

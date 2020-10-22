import React, { useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import SignedInMenu from "./SignedInMenu";
import SignOut from "./SignOut";

export default function NavBar({ setFormOpen }) {
  /**
   *! Fake Authentication
   */
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  /**
   * ! LogOut Handler sending User back when logOut
   */
  function handleSignOut() {
    setAuthenticated(false);
    history.push("/");
  }

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

        {authenticated ? (
          <SignedInMenu handleSignOut={handleSignOut} />
        ) : (
          <SignOut setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}

import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../App/firestore/fireBaseService";
import { toastr } from "react-redux-toastr";

export default function SignedInMenu() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toastr.error(error.message);
    }
  }

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src=".." />

      <Dropdown
        pointing="top left"
        text={currentUser && currentUser.displayName}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="createEvent"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            text="My Account"
            icon="settings"
            as={Link}
            to="/account"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

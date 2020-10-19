import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import user from "../../assests/user.png";
import { Link } from "react-router-dom";

export default function SignedInMenu({ handleSignOut }) {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={user} />

      <Dropdown pointing="top left" text="Bob">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="createEvent"
            text="createEvent"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            onClick={() => handleSignOut()}
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

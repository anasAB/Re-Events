import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../App/firestore/fireBaseService";
import { toastr } from "react-redux-toastr";
import LoadingComponent from "../../App/layout/LoadingComponent";

export default function SignedInMenu() {
  const history = useHistory();
  const { currentUserProfile } = useSelector((state) => state.profile);
  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toastr.error(error.message);
    }
  }

  if (!currentUserProfile) return <LoadingComponent content="Logging In..." />;

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />

      <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="createEvent"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
            text="My profile"
            icon="user"
          />
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

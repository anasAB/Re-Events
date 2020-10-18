import { Button, Container, Image, Menu } from "semantic-ui-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ setFormOpen }) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact as={NavLink} to="" header>
          <Image
            src="/public/assets/logo.png"
            alt="logo"
            style={{ marginRight: 15 }}
          />
          Re-Event
        </Menu.Item>

        <Menu.Item as={NavLink} to="events" name="Events"></Menu.Item>

        <Menu.Item as={NavLink} to="createEvent">
          <Button
            onClick={() => setFormOpen(true)}
            positive
            inverted
            content="Create Event"
          />
        </Menu.Item>

        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button
            basic
            inverted
            content="Register"
            style={{ margin: "0.5em" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

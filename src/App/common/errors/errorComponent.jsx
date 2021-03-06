import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { toastr } from "react-redux-toastr";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Oops we have an Error"}
      ></Header>
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to events Page"
      />
      <p>{toastr.error(error ? error.message : "Error Component")}</p>
    </Segment>
  );
}

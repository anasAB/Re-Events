import React from "react";
import { Item, Segment } from "semantic-ui-react";

export default function EventDetaildSideBar({ attendees }) {
  console.log("##attendees", attendees);
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees &&
            Object.keys(attendees).map((attendee) => (
              <Item key={attendee.id} style={{ position: "relative" }}>
                <Item.Image
                  size="tiny"
                  src={attendee.photoURL || "/public/assets/user.png"}
                />

                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{attendee.name}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </>
  );
}

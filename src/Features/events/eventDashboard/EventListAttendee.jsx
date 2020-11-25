import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";

export default function EventListAttendee({ attendee }) {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image
        size="mini"
        circular
        src={
          (attendee && attendee.photoURL) ??
          "https://randomuser.me/api/portraits/women/72.jpg"
        }
      />
    </List.Item>
  );
}

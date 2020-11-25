import React, { useState } from "react";
import {
  Button,
  Confirm,
  Item,
  Label,
  List,
  Segment,
  Icon,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { deletedEventFromFirestore } from "../../../App/firestore/firestoreService";
import { toastr } from "react-redux-toastr";
import { format } from "date-fns";

export default function EventListItem({ event }) {
  //**! Handle Delete Event */
  const [confromOpen, setConfromOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleDeleteEvent(event) {
    setLoadingDelete(true);
    try {
      await deletedEventFromFirestore(event);
      setLoadingDelete(false);
    } catch (error) {
      toastr.error(error.message);
      setLoadingDelete(true);
    }
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              as={Link}
              to={`/profile/${event.hostUid}`}
              size="tiny"
              circular
              src={
                event.hostPhotoURL ??
                "https://randomuser.me/api/portraits/women/72.jpg"
              }
            />
            <Item.Content>
              <Item.Header content={event.title} />

              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: "-40" }}
                  ribbon="right"
                  color="red"
                  content="this event has been canceled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <span>
            <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
            <Icon name="marker" /> {event.venue.address}
          </span>
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee
              key={attendee.id}
              attendee={attendee}
              event={event}
            />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          // onClick={() => deletedEventFromFirestore(event.id)}
          onClick={() => {
            deletedEventFromFirestore(event.id);
          }}
          name="delete"
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
      <Confirm
        open={confromOpen}
        onCancel={() => setConfromOpen(false)}
        onConfirm={() => handleDeleteEvent(event)}
      />
    </Segment.Group>
  );
}

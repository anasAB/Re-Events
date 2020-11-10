import React, { useState } from "react";
import { Button, Confirm, Item, Label, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { deletedEventFromFirestore } from "../../../App/firestore/firestoreService";
import { toastr } from "react-redux-toastr";

export default function EventListItem({ event }) {
  //**! Handle Delete Event */
  const [confromOpen, setConfromOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleDeleteEvent(event) {
    setConfromOpen(false);
    setLoadingDelete(true);
    try {
      await deletedEventFromFirestore(event);
      toastr.warning("Are you sure you want to Delete this event ?");
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
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />

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
          {/* <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")} */}
          {/* <Icon name="clock" /> <span>{event.date}</span>
          <Icon name="marker" /> {event.venue} */}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendee &&
            event.attendees.map((attendee) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          // onClick={() => deletedEventFromFirestore(event.id)}
          onClick={() => setConfromOpen(true)}
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

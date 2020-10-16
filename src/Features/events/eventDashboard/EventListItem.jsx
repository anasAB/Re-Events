import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

export default function EventListItem({ event, selectEvent, deleteEvent }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/public/assests/user.png" />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>{event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          {event.date}
          <Icon name="marker" />
          {event.city}
        </span>
      </Segment>

      <Segment secondary clearing>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>

      <Segment clearing>
        <span>{event.description} </span>
        <Button
          color="teal"
          floated="right"
          content="view"
          onClick={() => selectEvent(event)}
        />

        <Button
          color="red"
          floated="left"
          content="delete"
          onClick={() => deleteEvent(event.id)}
        />
      </Segment>
    </Segment.Group>
  );
}

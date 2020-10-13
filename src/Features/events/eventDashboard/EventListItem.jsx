import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

export default function EventListItem({ event }) {
  console.log("event", event);
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
          {event.Date}
          <Icon name="marker" />
          {event.Venue}
        </span>
      </Segment>

      <Segment secondary clearing>
        <List horizontal>
          <EventListAttendee />
        </List>
      </Segment>

      <Segment clearing>
        <span>{event.description} </span>
        <Button color="teal" floated="right" content="view" />
      </Segment>
    </Segment.Group>
  );
}

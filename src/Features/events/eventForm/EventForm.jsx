import React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

export default function EventForm() {
  return (
    <Segment clearing>
      <Header content="create new Event" />

      <Form>
        <Form.Field>
          <input type="text" placeholder="Event Tile" />
        </Form.Field>

        <Form.Field>
          <input type="text" placeholder="Category" />
        </Form.Field>

        <Form.Field>
          <input type="text" placeholder="Description" />
        </Form.Field>

        <Form.Field>
          <input type="text" placeholder="City" />
        </Form.Field>

        <Form.Field>
          <input type="text" placeholder="Venue" />
        </Form.Field>

        <Form.Field>
          <input type="date" placeholder="Date" />
        </Form.Field>

        <Button content="submit" type="submit" floated="right" positive />
        <Button content="cancel" type="submit" floated="right" />
      </Form>
    </Segment>
  );
}

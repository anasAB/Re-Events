import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";

export default function EventForm({ setFormOpen, createEvent, selecteDEvent }) {
  const initialValues = selecteDEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  function handelInputChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handelFormSubmit() {
    createEvent({
      ...values,
      id: cuid(),
      hostedBy: "Anas",
      attendees: [],
    });
  }

  return (
    <Segment clearing>
      <Header content={selecteDEvent ? "Edit Event" : "create new Event"} />

      <Form onSubmit={handelFormSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event Tile"
            name="title"
            value={values.title}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="Category"
            value={values.category}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="Description"
            value={values.description}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="City"
            value={values.city}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="Venue"
            value={values.venue}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Button content="submit" type="submit" floated="right" positive />
        <Button
          onClick={() => setFormOpen(false)}
          content="cancel"
          floated="right"
        />
      </Form>
    </Segment>
  );
}

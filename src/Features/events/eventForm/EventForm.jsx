import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { creatEvent, updateEvent } from "../EventsActions";

export default function EventForm({ match, history }) {
  const selecteDEvent = useSelector((state) =>
    state.events.events.find((e) => e.id === match.params.id)
  );
  const dispatch = useDispatch();
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
    selecteDEvent
      ? dispatch(updateEvent({ ...selecteDEvent, ...values }))
      : dispatch(
          creatEvent({
            ...values,
            id: cuid(),
            hostedBy: "Anas",
            attendees: [],
          })
        );
    history.push("/events");
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
            name="category"
            value={values.category}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={values.city}
            onChange={(event) => handelInputChange(event)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
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

        <Button
          content={selecteDEvent ? "Edit Event" : "Submit"}
          type="submit"
          floated="right"
          positive
          onClick={() => updateEvent(selecteDEvent)}
        />
        <Button as={Link} to="/events" content="cancel" floated="right" />
      </Form>
    </Segment>
  );
}

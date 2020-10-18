import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";
import { sampleData } from "../../../App/api/sampleData.js";

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selecteDEvent,
}) {
  const [events, setEvent] = useState(sampleData);

  //**!Create Event */
  function handleCreateEvent(event) {
    setEvent([...events, event]);
  }

  //**! Updated Event */
  function handleUpatedEvent(updatedEvent) {
    setEvent(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }

  //**! Delete Event */
  function handleDeleteEvent(eventId) {
    setEvent(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvent={setEvent}
            createEvent={handleCreateEvent}
            selecteDEvent={selecteDEvent}
            updateEvent={handleUpatedEvent}
            key={selecteDEvent ? selecteDEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

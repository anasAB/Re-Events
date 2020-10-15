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

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvent={setEvent}
            createEvent={handleCreateEvent}
            selecteDEvent={selecteDEvent}
            key={selecteDEvent ? selecteDEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

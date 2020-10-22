import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.events);

  // //**!Create Event */
  // function handleCreateEvent(event) {
  //   setEvent([...events, event]);
  // }

  // //**! Updated Event */
  // function handleUpatedEvent(updatedEvent) {
  //   setEvent(
  //     events.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  // }

  //**! Delete Event */
  function handleDeleteEvent(eventId) {
    // setEvent(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Evnet Filters</h2>
      </Grid.Column>
    </Grid>
  );
}

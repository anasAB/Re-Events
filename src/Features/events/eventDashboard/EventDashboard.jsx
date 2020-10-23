import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.events);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Evnet Filters</h2>
      </Grid.Column>
    </Grid>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetaildChat from "./EventDetaildChat";
import EventDetaildHeader from "./EventDetaildHeader";
import EventDetaildInfo from "./EventDetaildInfo";
import EventDetaildSideBar from "./EventDetaildSidBar";

export default function EventDetaildPage({ match }) {
  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === match.params.id)
  );
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetaildHeader event={event} />
        <EventDetaildInfo event={event} />
        <EventDetaildChat event={event} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetaildSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

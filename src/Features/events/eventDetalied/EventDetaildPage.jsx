import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetaildChat from "./EventDetaildChat";
import EventDetaildHeader from "./EventDetaildHeader";
import EventDetaildInfo from "./EventDetaildInfo";
import EventDetaildSideBar from "./EventDetaildSidBar";

export default function EventDetaildPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetaildHeader />
        <EventDetaildInfo />
        <EventDetaildChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetaildSideBar />
      </Grid.Column>
    </Grid>
  );
}

import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import EventFilters from "./EventFilter";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.events);
  const { loading } = useSelector((state) => state.async);

  if (loading) return <LoadingComponent inverted={true} content="LOADING" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}

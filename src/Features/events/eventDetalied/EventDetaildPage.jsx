import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetaildChat from "./EventDetaildChat";
import EventDetaildHeader from "./EventDetaildHeader";
import EventDetaildInfo from "./EventDetaildInfo";
import EventDetaildSideBar from "./EventDetaildSidBar";
import useFirestoreDocs from "../../../App/hooks/useFirestoreDocs";
import { listenToEventFromFirestore } from "../../../App/firestore/firestoreService";
import { listenToEvents } from "../EventsActions";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { Redirect } from "react-router-dom";

export default function EventDetaildPage({ match }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);

  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === match.params.id)
  );

  useFirestoreDocs({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="loading The Event ..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetaildHeader event={event} />
        <EventDetaildInfo event={event} />
        <EventDetaildChat event={event} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetaildSideBar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
}

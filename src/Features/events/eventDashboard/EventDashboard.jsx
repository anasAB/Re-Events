import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import EventFilters from "./EventFilter";

import useFirestoreCollection from "../../../App/hooks/useFirebaseCollection";
import { listenEventsFromFirestore } from "../../../App/firestore/firestoreService";
import { listenToEvents } from "../EventsActions";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { loading } = useSelector((state) => state.async);
  console.log("EVENTS", events);

  // useFirestoreCollection({
  //   query: () => listenEventsFromFirestore(),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch],
  // });

  useFirestoreCollection({
    query: () => listenEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  if (loading) return <LoadingComponent inverted={true} content="LOADING" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventList events={events} />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}

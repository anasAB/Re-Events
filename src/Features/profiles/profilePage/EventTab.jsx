import React, { useState } from "react";
import { Card, Grid, Header, Image, Tab, TabPane } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreCollection from "../../../App/hooks/useFirebaseCollection";
import { getUserEventQuery } from "../../../App/firestore/firestoreService";
import { listenToUserEvents } from "../ProfileActions";
import { format } from "date-fns";

export default function EventTab({ profile }) {
  const dispatch = useDispatch();
  const { profileEvent } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    { menuItem: "Past", pane: { key: "Past" } },
    { menuItem: "Future", pane: { key: "future" } },
    { menuItem: "Hosting", pane: { key: "Hosting" } },
  ];

  useFirestoreCollection({
    query: () => getUserEventQuery(activeTab, profile.id),
    data: (profileEvent) => dispatch(listenToUserEvents(profileEvent)),
    deps: [dispatch, activeTab, profile.id],
  });

  return (
    <TabPane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" content="Events" />
        </Grid.Column>
        <Tab
          onTabChange={(event, data) => setActiveTab(data.activeIndex)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
          {profileEvent.map((event) => (
            <Card as={Link} to={`/events/${event.id}`} key={event.id}>
              <Image
                src={`/assets/${event.category}.jpg`}
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header content={event.title} textAlign="center" />
                <Card.Meta textAlign="center">
                  <p>{format(event.date, "MMMM d, yyyy")}</p>
                  <p>{format(event.date, "hh:mm a")}</p>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
    </TabPane>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Segment>
      {!authenticated ? (
        <Item.Content verticalAlign="middle">
          <Header
            as="h1"
            content="Please SignIn To see This Profile"
            style={{ display: "block", marginBottom: 10 }}
          />
        </Item.Content>
      ) : (
        <Grid>
          <Grid.Column width={12}>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="small"
                  src={
                    profile.photoURL
                      ? profile.photoURL
                      : "https://randomuser.me/api/portraits/women/72.jpg"
                  }
                />
                <Item.Content verticalAlign="middle">
                  <Header
                    as="h1"
                    content={profile.displayName}
                    style={{ display: "block", marginBottom: 10 }}
                  />
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic.Group>
              <Statistic label="followers" value={10} />
              <Statistic label="followers" value={5} />
            </Statistic.Group>
            {!isCurrentUser && (
              <>
                <Divider />
                <Reveal animated="move">
                  <Reveal.Content visible style={{ width: "100%" }}>
                    <Button fluid color="teal" content="Following" />
                  </Reveal.Content>

                  <Reveal.Content hidden style={{ width: "100%" }}>
                    <Button basic color="red" content="UnFollowing" />
                  </Reveal.Content>
                </Reveal>
              </>
            )}
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
}

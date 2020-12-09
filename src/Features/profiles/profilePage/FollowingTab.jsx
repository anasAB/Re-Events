import React from "react";
import { Grid, Header, Card, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import useFirebaseCollection from "../../../App/hooks/useFirebaseCollection";
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../App/firestore/firestoreService";
import { listenToFollower, listenToFollowing } from "../ProfileActions";

export default function FollowingTab({ profile, activeTab }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { followings, follower } = useSelector((state) => state.profile);

  useFirebaseCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      activeTab === 3
        ? dispatch(listenToFollower(data))
        : dispatch(listenToFollowing(data)),
    deps: [dispatch, activeTab],
  });

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={activeTab === 3 ? "Followers" : "following"}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 3 &&
              follower.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

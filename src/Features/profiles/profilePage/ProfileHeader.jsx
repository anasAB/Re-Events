import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  follower,
  getFollowingDoc,
  UnfollowUser,
} from "../../../App/firestore/firestoreService";
import { setFollowUser, setUnFollowUser } from "../ProfileActions";
import { CLEAR_FOLLOWER } from "../ProfileConstants";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { followingUSer } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoader(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
        return () => dispatch({ type: CLEAR_FOLLOWER });
      } catch (error) {
        console.log("### Error with FetchFollowingDoc", error.message);
        throw error.message;
      }
    }
    fetchFollowingDoc().then(() => setLoader(false));
  }, [dispatch, profile.id, isCurrentUser]);

  async function handleFollower() {
    try {
      setLoader(true);
      dispatch(setFollowUser());
      await follower(profile);
    } catch (error) {
      console.log("## Error in Profile Header");
      setLoader(false);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function handleUnFollower() {
    try {
      setLoader(true);
      await UnfollowUser(profile);
      dispatch(setUnFollowUser());
    } catch (error) {
      console.log("## Error in Profile Header");
      setLoader(false);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  return (
    <Segment>
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
            <Statistic label="followers" value={profile.followerCount || 0} />
            <Statistic label="followers" value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color={followingUSer ? "red" : "green"}
                    content={followingUSer ? "Following" : "Not Following"}
                  />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    basic
                    color={followingUSer ? "red" : "green"}
                    content={followingUSer ? " UnFollow" : "Follow"}
                    onClick={
                      followingUSer
                        ? () => handleUnFollower()
                        : () => handleFollower()
                    }
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

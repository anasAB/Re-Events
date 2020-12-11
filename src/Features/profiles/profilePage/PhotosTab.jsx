import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Header, Image, TabPane, Card } from "semantic-ui-react";
import PhotoUploadWidget from "../../../App/common/photos/PhotoUploadWidget";

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <TabPane>
      {!authenticated ? (
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Please LogIn" />
        </Grid.Column>
      ) : (
        <Grid>
          <Grid.Column width={16}>
            <Header
              floated="left"
              icon="user"
              content={`Photos ${profile.displayName}`}
            />
            {isCurrentUser && (
              <Button
                onClick={() => setEditMode(!editMode)}
                floated="right"
                basic
                content={editMode ? "Cancel" : "Add "}
              />
            )}
          </Grid.Column>

          <Grid.Column width={16}>
            {editMode ? (
              <PhotoUploadWidget setEditMode={setEditMode} />
            ) : (
              <Card.Group>
                <Card>
                  <Image src={"/public/assets/user.png"} />
                  <Button.Group fluid width={2}>
                    <Button basic color="green" content="Main" />
                    <Button basic color="red" icon="trash" />
                  </Button.Group>
                </Card>
              </Card.Group>
            )}
          </Grid.Column>
        </Grid>
      )}
    </TabPane>
  );
}

import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Grid, Header, TabPane } from "semantic-ui-react";
import ProfileForm from "./ProfileForm";

export default function AboutPage({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit "}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member Since: {format(profile.createdAt, "dd MMM yyyy")}
                </strong>

                <div>
                  <strong>Description:</strong>
                  {profile.description}
                </div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  );
}

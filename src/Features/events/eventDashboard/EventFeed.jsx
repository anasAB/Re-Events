import React from "react";
import { Feed, Header, Segment } from "semantic-ui-react";

export default function EventFeed() {
  const img = "/assets/user.png";
  const date = "3 days ago";
  const summary = "Hiba Joined an Event";

  return (
    <>
      <Header attached color="teal" icon="newspaper" content="News feed" />
      <Segment attached="bottom">
        <Feed>
          <Feed.Event image={img} date={date} summary={summary} />
          <Feed.Event image={img} date={date} summary={summary} />
          <Feed.Event image={img} date={date} summary={summary} />
        </Feed>
      </Segment>
    </>
  );
}

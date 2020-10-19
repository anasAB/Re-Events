import React from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import logo from "../../assests/logo.png";

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image size="massive" src={logo} style={{ marginBottom: 12 }} />
          RE-EVENTS
        </Header>
        <Button onClick={() => history.push("/events")} size="huge" inverted>
          Get Started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
}

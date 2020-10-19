import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../Features/events/eventDashboard/EventDashboard";
import EventDetaildPage from "../../Features/events/eventDetalied/EventDetaildPage";
import EventForm from "../../Features/events/eventForm/EventForm";
import HomePage from "../../Features/home/HomePage";
import NavBar from "../../Features/nav/NavBar";

function App() {
  return (
    <>
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route path="/event/:id" component={EventDetaildPage} />
              <Route path="/events" component={EventDashboard} />
              <Route
                path={["/createEvent", "/manageP/:id"]}
                component={EventForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;

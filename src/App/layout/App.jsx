import React from "react";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../Features/events/eventDashboard/EventDashboard";
import EventDetaildPage from "../../Features/events/eventDetalied/EventDetaildPage";
import EventForm from "../../Features/events/eventForm/EventForm";
import HomePage from "../../Features/home/HomePage";
import NavBar from "../../Features/nav/NavBar";
import SandBox from "../../Features/sadbox/SandBox";
import ModalManger from "../common/modal/ModalManger";

function App() {
  const { key } = useLocation();
  return (
    <>
      <ModalManger />
      <Route exact path="/" component={HomePage} />

      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetaildPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />

              <Route path="/test" component={SandBox} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;

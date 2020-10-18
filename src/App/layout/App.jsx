import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../Features/events/eventDashboard/EventDashboard";
import EventDetaildPage from "../../Features/events/eventDetalied/EventDetaildPage";
import EventForm from "../../Features/events/eventForm/EventForm";
import HomePage from "../../Features/home/HomePage";
import NavBar from "../../Features/nav/NavBar";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //**! select Event*/
  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events:id" component={EventDetaildPage} />
        <Route path="/events" component={EventDashboard} />
        <Route path="/createEvent" component={EventForm} />

        {/* <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selecteDEvent={selectedEvent}
        /> */}
      </Container>
    </>
  );
}

export default App;

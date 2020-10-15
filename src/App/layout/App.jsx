import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../Features/events/eventDashboard/EventDashboard";
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
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selecteDEvent={selectedEvent}
        />
      </Container>
    </>
  );
}

export default App;

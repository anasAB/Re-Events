import React from "react";
import EventListItem from "./EventListItem";

export default function EventList({ events, selectEvent, deleteEvent }) {
  return (
    <div>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          event={event}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
}

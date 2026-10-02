import { useState } from "react";
import { Link } from "react-router-dom";

function EventList({ events }) {
  return events.map((event) => (
    <li className="card" key={event.id}>
      <div className="date">
        <small>{event.month}</small>
        {event.day}

        {event.datetime && (
          <small>
            {new Date(event.datetime).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Madrid",
            })}
          </small>
        )}
      </div>

      <div>
        <h3>{event.title}</h3>
        <p> · {event.location} ·</p>
        <p>{event.summary}</p>
      </div>
    </li>
  ));
}

export default function Agenda({ events, loaded, preview = false }) {
  const [showPast, setShowPast] = useState(false);

  const now = new Date();

  const upcomingEvents = preview
    ? events.slice(0, 5)
    : events.filter(
        (event) => event.datetime && new Date(event.datetime) >= now
      );

  const pastEvents = preview
    ? []
    : events
        .filter(
          (event) => event.datetime && new Date(event.datetime) < now
        )
        .reverse();

  const Container = preview ? "div" : "section";

  return (
    <Container
      id="agenda"
      className={preview ? "home-updates-column" : "page-texture"}
    >
      <div className="wrap">
        {preview ? (
          <h2>Próximas actividades</h2>
        ) : (
          <h1 className="page-title">Agenda</h1>
        )}

        <ul className="events">
          {loaded && upcomingEvents.length === 0 && (
            <li>No hay próximos eventos.</li>
          )}

          <EventList events={upcomingEvents} />
        </ul>

        {!preview && pastEvents.length > 0 && (
          <>
            <button
              type="button"
              className="btn alt past-events-toggle"
              aria-expanded={showPast}
              aria-controls="past-events"
              onClick={() => setShowPast((open) => !open)}
            >
              Eventos pasados
            </button>

            <div id="past-events" hidden={!showPast}>
              <ul className="events">
                <EventList events={pastEvents} />
              </ul>
            </div>
          </>
        )}

        {preview && (
          <Link className="btn preview-link" to="/agenda">
            Ver agenda completa
          </Link>
        )}
      </div>
    </Container>
  );
}
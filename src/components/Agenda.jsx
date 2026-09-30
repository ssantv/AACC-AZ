import { Link } from "react-router-dom";

export default function Agenda({ events, loaded, preview = false }) {
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
          {loaded && events.length === 0 && (
            <li>No hay eventos programados.</li>
          )}
          {(preview ? events.slice(0, 2) : events).map((event) => (
            <li className="card" key={event.id}>
              <div className="date">
                <small>{event.month}</small>
                {event.day}
              </div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        {preview && (
          <Link className="btn preview-link" to="/agenda">
            Ver agenda completa
          </Link>
        )}
      </div>
    </Container>
  );
}

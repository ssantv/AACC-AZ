import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Hero from "./components/Hero.jsx";
import News from "./components/News.jsx";
import Agenda from "./components/Agenda.jsx";
import Contact from "./components/Contact.jsx";
import { CookiePolicy, PrivacyPolicy } from "./components/Legal.jsx";
import { fetchPublishedContent } from "./sanity.js";
import {
  About,
  Signs,
  Activities,
  Friends,
} from "./components/InfoSections.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [content, setContent] = useState([]);
  const [contentError, setContentError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedContent()
      .then((data) => {
        if (!cancelled) setContent(data);
      })
      .catch(() => {
        if (!cancelled) setContentError(true);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = content
    .filter((item) => item._type === "publication")
    .map((item) => ({
      id: item._id,
      type: item.kind,
      title: item.title,
      excerpt: item.summary,
      cover: item.cover,
      body: item.body || [],
      date: item.date,
    }));
  const events = content
    .filter((item) => item._type === "event")
    .sort((first, second) => first.date.localeCompare(second.date))
    .map((item) => ({
      id: item._id,
      month: new Date(`${item.date}T12:00:00`)
        .toLocaleDateString("es-ES", { month: "short" })
        .toUpperCase()
        .replace(".", ""),
      day: item.date.slice(-2),
      date: item.date,
      title: item.title,
      detail: [item.location, item.summary].filter(Boolean).join(" · "),
    }));
  const ready = loaded && !contentError;
  const upcomingEvents = events.filter(
    (event) => event.date >= new Date().toLocaleDateString("sv-SE"),
  );

  return (
    <>
      <ScrollToTop />
      <header>
        <div className="wrap">
          <Link className="brand" to="/">
            <img src="/logo.png" alt="" />
            ACI Zamora
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            id="primary-nav"
            className={menuOpen ? "nav-open" : ""}
            aria-label="Principal"
            onClick={() => setMenuOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }
            }}
          >
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/quienes">Quiénes somos</NavLink>
            <NavLink to="/aacc">Las AACC</NavLink>
            <NavLink to="/noticias">Noticias</NavLink>
            <NavLink to="/agenda">Agenda</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>
        </div>
      </header>
      <main id="top">
        {contentError && (
          <p className="wrap note content-error" role="alert">
            No se han podido cargar las noticias y la agenda. Inténtalo de nuevo
            más tarde.
          </p>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <section className="home-updates">
                  <div className="wrap">
                    <News posts={posts} loaded={ready} preview />
                    <Agenda events={upcomingEvents} loaded={ready} preview />
                  </div>
                </section>
              </>
            }
          />
          <Route
            path="/quienes"
            element={
              <>
                <About />
                <Activities />
              </>
            }
          />
          <Route path="/aacc" element={<Signs />} />
          <Route path="/senales" element={<Navigate to="/aacc" replace />} />
          <Route path="/hacemos" element={<Navigate to="/quienes" replace />} />
          <Route
            path="/noticias"
            element={<News posts={posts} loaded={ready} />}
          />
          <Route
            path="/agenda"
            element={<Agenda events={events} loaded={ready} />}
          />
          <Route
            path="/instituciones"
            element={<Navigate to="/#amigas" replace />}
          />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="wrap footer-main">
          <div className="footer-identity">
            <strong>ACI Zamora</strong>
            <span>Asociación de Altas Capacidades Intelectuales de Zamora</span>
            <span>Todos los derechos reservados</span>

          </div>
          <div className="footer-actions">
            <div className="footer-links">
              <a href="https://www.instagram.com/acizamora/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=100088137712325" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="mailto:acizamora22@gmail.com" target="_blank" rel="noopener noreferrer">Correo</a>
              <Friends />
            </div>
            <div className="footer-bottom mx-auto">
              <Link to="/privacidad">Política de privacidad</Link> ·{" "}
              <Link to="/cookies">Política de cookies</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}

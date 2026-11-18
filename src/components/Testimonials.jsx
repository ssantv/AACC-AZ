import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { useNavigate, useParams } from "react-router-dom";

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="post-image">
          <img
            src={`${value.url}?w=1200&auto=format`}
            alt={value.alt || ""}
            loading="lazy"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

const relationshipLabels = {
  madre: "Madre",
  padre: "Padre",
  "persona-aacc": "Persona con altas capacidades",
  docente: "Docente",
  otro: "Otro",
};

function relationshipLabel(testimonial) {
  if (testimonial.relationship === "otro" && testimonial.relationshipDetail) {
    return testimonial.relationshipDetail;
  }
  return relationshipLabels[testimonial.relationship] || "Testimonio";
}

export default function Testimonials({ testimonials, loaded }) {
  const params = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (active) dialogRef.current?.showModal();
  }, [active]);

  useEffect(() => {
    if (!loaded) return;
    const slug = params.slug;
    if (slug) {
      const testimonial = testimonials.find((item) => item.slug === slug);
      if (testimonial) {
        setActive(testimonial);
      } else {
        navigate("/testimonios", { replace: true });
      }
    } else {
      setActive(null);
      dialogRef.current?.close();
    }
  }, [params.slug, loaded, testimonials, navigate]);

  return (
    <section id="testimonios" className="band testimonials-section">
      <div className="wrap">
        <h1 className="page-title">Testimonios</h1>
        <p className="lead">
          Historias de familias y personas con altas capacidades, contadas en
          primera persona. Se publican de forma anónima para proteger la
          privacidad de quienes las comparten.
        </p>

        <div className="goals">
          {loaded && testimonials.length === 0 && (
            <p>Todavía no hay testimonios publicados.</p>
          )}
          {testimonials.map((testimonial) => (
            <button
              type="button"
              className="card testimonial-card"
              key={testimonial.id}
              onClick={() => {
                if (!testimonial.slug) setActive(testimonial);
                else navigate(`/testimonios/${testimonial.slug}`);
              }}
            >
              <div className="testimonial-quote-block">
                <span className="testimonial-mark" aria-hidden="true">
                  “
                </span>
                <p className="testimonial-quote">{testimonial.quote}</p>
              </div>

              <div className="testimonial-card-content">
                <span className="tag testimonial-tag">Testimonio</span>
                <p className="testimonial-relationship">
                  {relationshipLabel(testimonial)}
                </p>
                <time dateTime={testimonial.date}>
                  {formatDate(testimonial.date)}
                </time>
              </div>
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          onClose={() => navigate("/testimonios")}
        >
          {active && (
            <>
              <button
                type="button"
                className="dialog-close"
                aria-label="Cerrar testimonio"
                onClick={() => dialogRef.current.close()}
              >
                &times;
              </button>

              <div className="dialog-content">
                <div className="dialog-inner">
                  <span className="tag testimonial-tag">Testimonio</span>
                  <p className="note">Testimonio anónimo</p>

                  <blockquote className="testimonial-modal-quote">
                    {active.quote}
                  </blockquote>

                  <p className="note">
                    {relationshipLabel(active)} · {formatDate(active.date)}
                  </p>

                  {active.story?.length > 0 && (
                    <div className="dialog-body">
                      <PortableText
                        value={active.story}
                        components={portableTextComponents}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </dialog>
      </div>
    </section>
  );
}
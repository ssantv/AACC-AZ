import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router-dom";

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostDetails({ post }) {
  return (
    <>
      <span className={`tag ${post.type === "articulo" ? "art-tag" : ""}`}>
        {post.type === "articulo" ? "Artículo" : "Noticia"}
      </span>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </>
  );
}

export default function News({ posts, loaded, preview = false }) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (active) dialogRef.current?.showModal();
  }, [active]);

  const visiblePosts = preview
    ? posts.slice(0, 3)
    : posts.filter((post) => filter === "all" || post.type === filter);
  const Container = preview ? "div" : "section";

  return (
    <Container
      id="noticias"
      className={preview ? "home-updates-column" : "band"}
    >
      <div className="wrap">
        {preview ? (
          <h2>Últimas noticias y artículos</h2>
        ) : (
          <h1 className="page-title">Noticias y artículos</h1>
        )}
        {!preview && (
          <p className="lead">
            Lo que pasa en la asociación y lo que escribimos las familias y
            colaboradores.
          </p>
        )}
        {!preview && (
          <div className="chips" role="group" aria-label="Filtrar">
            {[
              ["all", "Todo"],
              ["noticia", "Noticias"],
              ["articulo", "Artículos"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <div className="goals" id="posts">
          {loaded && posts.length === 0 && (
            <p>No hay publicaciones disponibles.</p>
          )}
          {loaded &&
            !preview &&
            posts.length > 0 &&
            visiblePosts.length === 0 && (
              <p>No hay publicaciones de este tipo.</p>
            )}
          {visiblePosts.map((post) => (
            <button
              type="button"
              className="card post"
              key={post.id}
              onClick={() => setActive(post)}
            >
              <PostDetails post={post} />
            </button>
          ))}
        </div>
        {preview && (
          <Link className="btn alt preview-link" to="/noticias">
            Ver todas las publicaciones
          </Link>
        )}
        <dialog ref={dialogRef} onClose={() => setActive(null)}>
          {active && (
            <>
              <button
                type="button"
                className="dialog-close"
                aria-label="Cerrar publicación"
                onClick={() => dialogRef.current.close()}
              >
                &times;
              </button>
              <div className="dialog-content">
                <span className="tag">
                  {active.type === "articulo" ? "Artículo" : "Noticia"}
                </span>
                <h3>{active.title}</h3>
                <p className="note">{formatDate(active.date)}</p>
                {active.body.length > 0 && (
                  <div className="mt-4">
                    <PortableText value={active.body} />
                  </div>
                )}
              </div>
            </>
          )}
        </dialog>
      </div>
    </Container>
  );
}

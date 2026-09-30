import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const signs = [
  [
    "Preguntas enormes",
    "Dudas sobre la muerte, la justicia o el universo desde muy pequeños, con mucho vocabulario y memoria para lo que les interesa.",
  ],
  [
    "Aburrimiento en clase",
    "Rechazo a las tareas repetitivas, ensoñación o conducta que llama la atención. A veces es falta de reto, no de capacidad.",
  ],
  [
    "Mucha sensibilidad",
    "Molestan las costuras, los ruidos o las luces. Sienten hondo el dolor ajeno y les cuesta gestionar la frustración.",
  ],
  [
    "Sentirse distintos",
    "Sensación de no encajar en el patio. Algunos niños, sobre todo niñas, fingen no saber para encajar y llegan agotados a casa.",
  ],
];

const goals = [
  [
    "Un lugar donde encontrarse",
    "Que los niños y sus familias se conozcan, se relacionen y se sientan parte del grupo. Observamos qué necesitan y qué les gusta, y les ofrecemos actividades a nuestro alcance.",
  ],
  [
    "Visibilidad en la ciudad",
    "Dar a conocer las altas capacidades, acabar con los mitos y conseguir el apoyo de instituciones públicas y privadas a largo plazo.",
  ],
  [
    "Más formación en las aulas",
    "Impulsar la formación del profesorado, para que en el colegio reciban el trato que su educación específica necesita, como reconoce la ley.",
  ],
];

const activities = [
  [
    "Niños y jóvenes",
    "talleres.svg",
    "Talleres y actividades",
    "Ciencia, tecnología, filosofía, ajedrez, narrativa... sin exámenes ni notas, con grupos por edades.",
  ],
  [
    "Familias",
    "ninos.svg",
    "Grupos de iguales y familias",
    "Un sitio donde los peques hablan sin frenar el vocabulario y madres y padres comparten dudas con quien ya lo ha vivido.",
  ],
  [
    "Colegio",
    "libro.svg",
    "Acompañamiento escolar",
    "Orientación para hablar con tutores y equipos de orientación, y para pedir la evaluación y las medidas que necesita cada niño.",
  ],
  [
    "Zamora",
    "divulgacion.svg",
    "Divulgación y formación",
    "Charlas y jornadas para acabar con los mitos y formar al profesorado en altas capacidades.",
  ],
];

function SectionCards({ items, className }) {
  return (
    <div className={className}>
      {items.map(([title, description]) => (
        <div className="card" key={title}>
          <div className="flex items-center justify-between align-items-center" style={{ paddingBottom: "10px" }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <img
              src="/bombilla.svg"
              alt="bombilla"
              className="w-10 mt-0 justify-self-end"
            />
          </div>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <>
      <section id="quienes" className="about-section">
        <div className="wrap">
          <h1 className="page-title">
            Qué es <span>AciZamora</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="card md:w-5/7">
              <p className="mb-2">
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    backgroundColor: "--var(sun)",
                  }}
                >
                  AciZamora
                </span>{" "}
                es una asociación sin ánimo de lucro formada por familias con
                niños con altas capacidades intelectuales.
              </p>
              &nbsp;
              <p className="mt-2">
                Somos de ámbito provincial: queremos llegar a todos los niños y
                niñas con altas capacidades de la provincia de Zamora.
                Trabajamos en directo y en colaboración con el resto de
                asociaciones de Castilla y León.
              </p>
            </div>
            <div
              className="image-container md:w-2/7"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <img
                src="/familia.svg"
                alt="Descripción de la imagen"
                className="w-50"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="objetivos" className="band">
        <div className="wrap">
          <h2>Qué queremos conseguir</h2>
          <SectionCards items={goals} className="goals" />
        </div>
      </section>
    </>
  );
}

const sources = [
  {
    n: 1,
    text: "Definición en Castilla y León (Orden EDU/1152/2010, art. 19), citada por el Procurador del Común",
    url: "https://www.procuradordelcomun.org/archivos/resoluciones/1_1528371062.pdf",
  },
  {
    n: 2,
    text: "Junta de Castilla y León: protocolo de cribado de altas capacidades intelectuales",
    url: "https://www.educa.jcyl.es/dpburgos/es/apebu/area-atencion-diversidad/inclusion-orientacion-educativa-absentismo/diversidad-inclusion-educativa/alumnado-necesidad-especifica-apoyo-educativo.ficheros/1859642-Cribado%20AA%20CC.pdf",
  },
  {
    n: 3,
    text: "Virtus-Palacios y Orozco-Gómez (Universidad de Burgos): DETECTA, cribado de altas capacidades en Castilla y León",
    url: "https://revistascientificas.us.es/index.php/anduli/article/download/26569/24061/137743",
  },
  {
    n: 4,
    text: "Eurydice (Comisión Europea): atención al alumnado con altas capacidades en España",
    url: "https://eurydice.eacea.ec.europa.eu/es/national-education-systems/spain/atencion-las-necesidades-educativas-del-alumnado-en-centros",
  },
  {
    n: 5,
    text: "UNED: respuesta educativa al alumnado con altas capacidades en las 17 comunidades autónomas",
    url: "https://revistas.uned.es/index.php/REEC/article/download/44044/33062/142222",
  },
  {
    n: 6,
    text: "Revista de Educación Inclusiva: modelos de superdotación, criterio de CI 130 y modelo de Renzulli",
    url: "https://revistaeducacioninclusiva.es/index.php/REI/article/view/332/334",
  },
  {
    n: 7,
    text: "Vega y González (2023): dificultades académicas del alumnado con altas capacidades",
    url: "https://revistascientificas.us.es/index.php/Cuestiones-Pedagogicas/article/download/24225/22005/115728",
  },
  {
    n: 8,
    text: "Procurador del Común de Castilla y León: detección y evaluación psicopedagógica",
    url: "https://procuradordelcomun.org/archivos/resoluciones/1_1620974430.pdf",
  },
];

function Ref({ n }) {
  const source = sources.find((item) => item.n === n);
  if (!source) return null;

  return (
    <details className="source-reference">
      <summary aria-label={`Mostrar fuente ${n}`}>[{n}]</summary>
      <span className="source-popover">
        <span>{source.text}</span>
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          Visitar fuente
        </a>
      </span>
    </details>
  );
}

export function Signs() {
  return (
    <>
      <section id="senales" className="aacc-section page-texture signs-page">
        <div className="wrap">
          <h1 className="page-title">Las altas capacidades intelectuales</h1>
          <div>
            <h2>¿Qué son las altas capacidades?</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div
                className="image-container md:w-2/7"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <img
                  src="/cohete.svg"
                  alt="Descripción de la imagen"
                  className="w-50"
                />
              </div>
              <p className="card md:w-5/7">
                En Castilla y León se considera alumnado con altas capacidades
                al que tiene necesidades educativas derivadas de su alta
                capacidad intelectual, de haber aprendido algo muy pronto o de
                tener habilidades específicas o creativas en ciertas áreas, y
                que por eso necesita una respuesta educativa distinta.
                <Ref n={1} />
              </p>
            </div>
            <p>&nbsp;</p>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <p className="card md:w-5/7">
                No se reduce a un número. Durante mucho tiempo se definió por un
                cociente intelectual por encima de 130, pero desde 1978 el
                modelo de Renzulli lo entiende como la combinación de tres
                áreas: capacidad superior a la media, compromiso con la tarea y
                creatividad.
                <Ref n={6} />
              </p>
              <div
                className="image-container md:w-2/7"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <img
                  src="/mente.svg"
                  alt="Descripción de la imagen"
                  className="w-50"
                />
              </div>
            </div>
            <p>&nbsp;</p>
            <div className="flex flex-col md:flex-row items-center">
              <div
                className="image-container md:w-2/7"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <img
                  src="/puzzle.svg"
                  alt="Descripción de la imagen"
                  className="w-50"
                />
              </div>
              <p className="card md:w-5/7">
                Y tampoco es sinónimo de buenas notas: tener mucha capacidad no
                garantiza un buen rendimiento, y aprender con tanta facilidad
                puede traer impaciencia y aburrimiento.
                <Ref n={7} />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="aacc-section aacc-paper">
        <div className="wrap">
          <div>
            <h2>¿Sospechas altas capacidades?</h2>
            <div
              style={{
                borderBottom: "5px solid var(--sun)",
                marginBottom: "24px",
              }}
            ></div>
            <p className="card">
              No son un boletín lleno de sobresalientes. Es una forma de sentir
              y pensar con más intensidad. Estas son algunas señales que suelen
              verse en casa o en el cole:
            </p>
            <p>&nbsp;</p>
            <SectionCards items={signs} className="grid4" />
            <p className="card mt-7">
              Ojo: estas señales son pistas para hablar con el colegio, no un
              diagnóstico. Solo lo da una evaluación psicopedagógica. Y conviene
              fijarse en ellas porque hay indicios de que este alumnado no
              siempre recibe la atención que necesita: se le identifica poco,
              hay diferencias entre zonas y entre niños y niñas, y a veces
              aparecen bajo rendimiento, falta de respuesta educativa o acoso
              escolar.
              <Ref n={5} />
            </p>
          </div>
        </div>
      </section>
      <section className="aacc-section page-texture">
        <div className="wrap">
          <div>
            <h2>¿Cómo se detectan en Castilla y León?</h2>
            <div
              style={{
                borderBottom: "5px solid var(--sun)",
                marginBottom: "24px",
              }}
            ></div>
              <p className="card mb-7">
                No hay una norma nacional que regule cómo se identifica, así que
                cada comunidad autónoma lo organiza a su manera.
                <Ref n={3} /> La ley encarga a las administraciones educativas
                identificar a este alumnado, valorar sus necesidades pronto y
                ofrecerle planes de actuación y programas de enriquecimiento.
                <Ref n={4} />
              </p>
            <div className="flex flex-col md:flex-row gap-4 ">
              <p className="card">
                La Junta tiene un protocolo de cribado: una prueba para toda la
                clase, la opinión de las familias y la del profesorado. Si se
                cumplen las condiciones, se pasa a una evaluación
                psicopedagógica, que también puede pedir la propia familia.
                <Ref n={2} /> La detección puede empezar en casa o en el cole, y
                se concreta en una evaluación hecha por especialistas en
                orientación educativa.
                <Ref n={8} />
              </p>
              <img src="/formacion.svg" className="w-auto" />
            </div>
          </div>
        </div>
      </section>
      <section className="aacc-section aacc-paper">
        <div className="wrap">
          <div>
            <h2>Si sospechas, ¿qué puedes hacer?</h2>
            <div
              style={{
                borderBottom: "5px solid var(--sun)",
                marginBottom: "24px",
              }}
            ></div>
            <p className="card">
              Habla con el tutor o la tutora y con el orientador del centro, y
              pide por escrito que valoren el caso. Si necesitas apoyo o dudas
              por dónde empezar, escríbenos.
            </p>
            <p className="mt-7">
              <Link className="btn alt !ml-0" to="/contacto">
                Cuéntanos tu caso
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export function Activities() {
  return (
    <>
      <section id="hacemos">
        <div className="wrap">
          <h2>Qué hacemos</h2>
          <div className="grid2">
            {activities.map(([tag, icon, title, description]) => (
              <div className="card" key={title}>
                <span className="tag">{tag}</span>
                <div className="flex flex-col md:flex-row gap-5 items-center">
                  <div>
                    <img src={`/${icon}`} className="w-50" />
                  </div>
                  <div>
                <h3>{title}</h3>
                <p>{description}</p>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="socios" className="band">
        <div className="wrap">
          <h2>Hazte socio o socia</h2>
          <div className="card">
            <p>
              AciZamora es una asociación sin ánimo de lucro formada por
              familias. Cuantas más seamos, más actividades y más voz tendremos
              ante las instituciones.
            </p>
            <p className="mt-4">
              <Link className="btn mt-6" to="/contacto">
                Quiero asociarme
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Friends() {
  const dialogRef = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#amigas") dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [hash]);

  return (
    <div className="footer-institutions">
      <button
        type="button"
        className="footer-institutions-trigger"
        onClick={() => dialogRef.current?.showModal()}
      >
        Instituciones amigas
      </button>
      <dialog
        ref={dialogRef}
        id="amigas"
        className="friends-dialog"
        aria-labelledby="friends-title"
      >
        <div className="friends-dialog-heading">
          <h2 id="friends-title">Instituciones amigas</h2>
          <form method="dialog">
            <button type="submit" className="friends-close" aria-label="Cerrar">
              ×
            </button>
          </form>
        </div>
        <div className="friends">
          <a
            href="https://www.zamora.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayuntamiento de Zamora
          </a>
          <a
            href="https://www.diputaciondezamora.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diputación Provincial de Zamora
          </a>
          <a href="mailto:arquimedescyl@gmail.com" rel="noopener noreferrer">
            Arquimedes CyL
          </a>
          <a
            href="https://www.ogmiosasacta.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ogmios Asacta · Ávila
          </a>
          <a
            href="https://www.lucidusburgos.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucidus · Burgos
          </a>
          <a
            href="https://www.altascapacidadesleon.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            ALAC · León
          </a>
          <a
            href="https://www.apacpalencia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            APAC · Palencia
          </a>
          <a
            href="https://www.ateneaaltascapacidades.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Atenea · Salamanca
          </a>
          <a href="mailto:asociacion.segac@gmail.com" rel="noopener noreferrer">
            SEGAC · Segovia
          </a>
          <a
            href="mailto:altascapacidadessoria@gmail.com"
            rel="noopener noreferrer"
          >
            ACSO · Soria
          </a>
          <a
            href="https://www.acylac.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acylac · Valladolid
          </a>
        </div>
      </dialog>
    </div>
  );
}

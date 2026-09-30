import { Link } from "react-router-dom";

const privacyEmail = "acizamora22@gmail.com";

function LegalPage({ title, children }) {
  return (
    <section className="legal-page page-texture">
      <div className="wrap">
        <h1 className="page-title">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        ACI Zamora es la responsable de los datos que facilites en el formulario
        de contacto. Para cualquier consulta sobre privacidad o para ejercer tus
        derechos, escribe a{" "}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
      </p>

      <h2>Datos que recogemos</h2>
      <p>
        El formulario solicita nombre, teléfono, motivo y mensaje; el correo
        electrónico es opcional. También pueden tratarse datos técnicos de la
        conexión, como la dirección IP, necesarios para prestar y proteger los
        servicios utilizados por la web.
      </p>
      <p>
        No incluyas diagnósticos, informes médicos ni datos que identifiquen a
        menores en el mensaje. Para cuestiones delicadas, podemos acordar otra
        forma de comunicación después del primer contacto.
      </p>

      <h2>Finalidad y base jurídica</h2>
      <p>
        Usamos los datos que envías para atender tu consulta y responderte por
        teléfono o, si lo facilitas, por correo. La base para hacerlo es el
        consentimiento que prestas al enviar el formulario. No utilizamos los
        datos del formulario para publicidad ni para suscribirte a una lista.
      </p>

      <h2>Conservación y destinatarios</h2>
      <p>
        Conservamos las consultas hasta responderlas y cerrarlas, salvo que
        debamos mantener algún dato por una obligación legal. El formulario se
        procesa mediante Formspree, que recibe el contenido que envías. La web
        se aloja en Cloudflare Pages, consulta contenidos publicados en Sanity y
        carga tipografías desde Google Fonts; estos proveedores pueden recibir
        datos técnicos de conexión. Algunos proveedores pueden tratar datos
        fuera del Espacio Económico Europeo. Puedes consultar sus políticas en
        los sitios de{" "}
        <a href="https://formspree.io/legal/privacy-policy/">Formspree</a>,{" "}
        <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>,{" "}
        <a href="https://www.sanity.io/legal/privacy">Sanity</a> y{" "}
        <a href="https://policies.google.com/privacy">Google</a>.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión, limitación u
        oposición al tratamiento de tus datos, así como retirar tu
        consentimiento, escribiendo a{" "}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. También puedes
        presentar una reclamación ante la{" "}
        <a href="https://www.aepd.es/">
          Agencia Española de Protección de Datos
        </a>
        .
      </p>
    </LegalPage>
  );
}

export function CookiePolicy() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Esta web no incorpora herramientas de publicidad ni analítica y no
        configura cookies de seguimiento desde su código. Esto no impide que los
        servicios externos necesarios para su funcionamiento utilicen cookies
        técnicas o traten datos de conexión.
      </p>

      <h2>Servicios externos</h2>
      <p>
        Cloudflare aloja la web y puede utilizar cookies técnicas de seguridad
        cuando sean necesarias. El navegador también se conecta a Sanity para
        obtener noticias y agenda y a Google Fonts para cargar las tipografías.
        Al enviar el formulario, los datos se transmiten a Formspree. Consulta
        las políticas de{" "}
        <a href="https://www.cloudflare.com/cookie-policy/">Cloudflare</a>,{" "}
        <a href="https://www.sanity.io/legal/privacy">Sanity</a>,{" "}
        <a href="https://policies.google.com/technologies/cookies">Google</a> y{" "}
        <a href="https://formspree.io/legal/privacy-policy/">Formspree</a>
        para conocer cómo utilizan estas tecnologías.
      </p>

      <h2>Cómo gestionarlas</h2>
      <p>
        Puedes consultar, borrar o bloquear cookies desde la configuración de tu
        navegador. Bloquear cookies técnicas puede afectar al funcionamiento de
        algunos servicios. Si en el futuro incorporamos cookies no necesarias,
        actualizaremos esta política y solicitaremos el consentimiento que
        corresponda antes de utilizarlas.
      </p>
      <p>
        Para información sobre los datos enviados desde el formulario, consulta
        la <Link to="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}

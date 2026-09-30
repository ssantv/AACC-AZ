import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const configuredFormId = import.meta.env.VITE_FORMSPREE_ID?.trim();
  const formId = configuredFormId
    ? configuredFormId
        .replace(/^https:\/\/formspree\.io\/f\//, "")
        .replace(/\/$/, "")
    : "mgavdzdd";
  const formAction = `https://formspree.io/f/${formId}`;
  const [state, handleSubmit] = useForm(formId);

  return (
    <section id="contacto" className="contact">
      <div className="wrap">
        <h1 className="page-title">
          ¿Tienes un hijo o hija con altas capacidades?
        </h1>
        <p className="mb-7">
          Cuéntanos tu caso, sin compromiso. Te responderemos lo antes posible.
        </p>
        {state.succeeded ? (
          <p className="note" role="status">
            ¡Enviado! Te contestaremos lo antes posible.
          </p>
        ) : (
          <form
            className="form "
            action={formAction}
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="_subject"
              value="Nueva consulta desde la web de ACI Zamora"
            />
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label>
              Nombre
              <input name="nombre" required autoComplete="name" />
              <ValidationError
                prefix="Nombre"
                field="nombre"
                errors={state.errors}
              />
            </label>
            <label>
              Teléfono
              <input
                name="telefono"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
              />
              <ValidationError
                prefix="Teléfono"
                field="telefono"
                errors={state.errors}
              />
            </label>
            <label>
              Correo (opcional)
              <input name="email" type="email" autoComplete="email" />
              <ValidationError
                prefix="Correo"
                field="email"
                errors={state.errors}
              />
            </label>
            <label>
              Motivo
              <select name="motivo">
                <option>Sospecho altas capacidades</option>
                <option>Problema con el colegio</option>
                <option>Talleres y actividades</option>
                <option>Quiero asociarme</option>
                <option>Otra duda o voluntariado</option>
              </select>
              <ValidationError
                prefix="Motivo"
                field="motivo"
                errors={state.errors}
              />
            </label>
            <label>
              Cuéntanos
              <textarea name="mensaje" rows="4" />
              <ValidationError
                prefix="Mensaje"
                field="mensaje"
                errors={state.errors}
              />
            </label>
            <label className="chk">
              <input type="checkbox" name="acepta" value="si" required />
              <span>
                He leído la <a href="#">política de privacidad</a> y acepto que
                ACI Zamora use estos datos para contestarme.
              </span>
            </label>
            <button className="btn" type="submit" disabled={state.submitting}>
              {state.submitting ? "Enviando…" : "Enviar"}
            </button>
            <ValidationError errors={state.errors} />
          </form>
        )}
      </div>
    </section>
  );
}

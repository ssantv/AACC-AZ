# ACI Zamora

Web estática de React y JavaScript con Vite y Tailwind CSS. `src/App.jsx` mantiene la navegación; noticias, artículos y eventos publicados se leen del proyecto Sanity `322gfyp6`, dataset `production`. El contenido se edita en el Studio de `studio-477/`. El formulario de contacto usa Formspree.

## Desarrollo

Requiere Node.js 20.19+ o 22.12+.

```sh
npm install
npm run dev
```

Abrir la URL que muestra Vite. Para usar otro formulario de contacto, crear `.env.local` en la raíz con el ID de vuestro formulario de Formspree:

```dotenv
VITE_FORMSPREE_ID=tu_id
```

Si no se configura, el formulario usa el ID predeterminado de `src/components/Contact.jsx`; comprobad que corresponde a vuestra cuenta. No subas `.env.local` al repositorio. Las variables `VITE_` se incluyen en el JavaScript público, por lo que nunca deben contener secretos.

## Producción

En Cloudflare Pages, conectar el repositorio desde la raíz, usar `npm run build` como comando de compilación y `dist` como directorio de salida. Configurar `VITE_FORMSPREE_ID` como variable de entorno de compilación si se usa un formulario distinto del predeterminado. Si Cloudflare elige otra versión de Node, seleccionar Node.js 20.19+ o 22.12+.

Añadir el origen `https://<proyecto>.pages.dev` y cada dominio personalizado a los orígenes CORS permitidos del proyecto Sanity. Publicar contenido en Sanity actualiza la web al recargarla, sin reconstruir Pages. El Studio se despliega por separado para que el equipo edite sin ejecutar nada en local.

## Antes de publicar

- Comprobar que el formulario de Formspree pertenece a vuestra cuenta y recibe mensajes desde el dominio publicado.
- Verificar que las rutas `/noticias`, `/agenda` y `/contacto` funcionan al abrirlas directamente.
- Publicar y enlazar las políticas de privacidad y cookies; sus enlaces son marcadores de posición heredados del sitio original.

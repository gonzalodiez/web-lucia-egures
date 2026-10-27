# Alma mía · Web

Sitio de **Alma mía** (masajes terapéuticos y estética corporal, Maldonado / Punta del Este).

**Diseño en producción: `v1/` (Arena & Sal).** Las carpetas `v2/`, `v3/`, `v4/` y el `index.html` de la raíz son las propuestas descartadas; quedan como referencia y no se publican.

## Estructura

- `v1/` → diseño elegido (HTML, CSS, JS)
- `shared/content.js` → **todo el texto, servicios, zonas, horario y contacto** (editar acá)
- `shared/common.js` → formulario, WhatsApp, galería, animaciones
- `assets/img/` → fotos (reemplazables manteniendo el nombre, más la versión `-sm.jpg` de 720 px)
- `public/` → archivos extra de producción (`_headers`, `robots.txt`, `404.html`)
- `scripts/build.sh` → arma `dist/` con el diseño 1 en la raíz
- `docs/HOSTING.md` → costos de hosting, dominio, chatbot y backend

## Publicar en Cloudflare Pages (una sola vez)

1. Entrar a https://dash.cloudflare.com → **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git** (si aparece primero la opción de Workers, buscar el link "Looking to deploy Pages? Get started").
2. Autorizar GitHub y elegir el repo `web-lucia-egures`.
3. Configuración de build:
   - Project name: `alma-mia` (define la URL `alma-mia.pages.dev`)
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `bash scripts/build.sh`
   - Build output directory: `dist`
4. **Save and Deploy**. En ~1 minuto queda online.

Desde ahí, cada push a `main` se publica solo.

### Dominio propio

Pages → proyecto `alma-mia` → **Custom domains** → **Set up a custom domain** → escribir el dominio (ej. `almamiamasajes.com`). Si el dominio está en Cloudflare, el DNS y el HTTPS se configuran solos. Repetir con `www.`.

### Alternativa: Cloudflare Workers

Si se importa el repo como **Worker** en vez de Pages, `wrangler.jsonc` ya está listo. Build command `bash scripts/build.sh`, deploy command `npx wrangler deploy`.

## Probar local

```bash
bash scripts/build.sh
cd dist && python3 -m http.server 8787   # abrir http://localhost:8787
```

## Pendientes de contenido

- `web3formsKey` en `shared/content.js`: crear gratis en https://web3forms.com para que el formulario llegue por email. Sin key, el formulario abre WhatsApp con el mensaje armado.
- Testimonios: son de ejemplo. Reemplazar por reseñas reales.
- Duraciones, descripciones y bio: confirmar con Lucía.

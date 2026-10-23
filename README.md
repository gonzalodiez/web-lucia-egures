# Alma mía · Web

Rediseño del sitio de **Alma mía** (masajes terapéuticos, Maldonado / Punta del Este).

- `index.html` → selector de versiones
- `v1/` Arena & Sal · `v2/` Clínica Botánica · `v3/` Noche Oceánica · `v4/` Scrollytelling
- `shared/content.js` → **todo el texto, servicios, zonas y contacto** (editar acá)
- `assets/img/` → imágenes (generadas; reemplazables por fotos reales con el mismo nombre)
- `docs/HOSTING.md` → hosting, dominio, costos, chatbot, backend

Sitio estático, sin build. Deploy automático a GitHub Pages en cada push a `main`.

## Ver las propuestas

- **Online (GitHub Pages)**: activar una sola vez en *Settings → Pages → Build and deployment → Source: GitHub Actions*. A partir de ahí cada push a `main` publica en `https://gonzalodiez.github.io/web-lucia-egures/`.
- **Local**: abrir `index.html` en el navegador (no necesita servidor).

## Personalizar

1. `shared/content.js`: WhatsApp, email, Instagram, horarios, textos, servicios, zonas, testimonios, FAQ.
2. `web3formsKey` en ese mismo archivo: crear gratis en https://web3forms.com para que el formulario llegue por email. Sin key, el formulario deriva a WhatsApp.
3. Reemplazar fotos en `assets/img/` manteniendo el nombre (`room.jpg` + `room-sm.jpg` de 720 px, etc.).

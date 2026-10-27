# Hosting, dominio, costos, chatbot y backend

> Precios en USD, relevados en octubre de 2026 desde páginas de terceros y documentación pública. Verificar en la web de cada proveedor antes de contratar; cambian seguido.

---

## 1. Qué es este sitio técnicamente

- **Sitio estático**: HTML + CSS + JS, sin build, sin base de datos, sin servidor propio.
- **Formulario de contacto**: envía por `fetch` a un servicio "form-to-email" (Web3Forms). No necesita backend.
- **WhatsApp**: links `wa.me` directos. Cero costo.
- **Imágenes**: 15 fotos optimizadas (~5 MB total). Tráfico esperado de un negocio local: unos pocos GB/mes como máximo.

Eso significa que puede vivir **gratis** en cualquier host de estáticos. Lo único que cuesta plata es el **dominio**.

---

## 2. Opción recomendada (la más barata "oficial")

| Ítem | Proveedor | Costo |
|---|---|---|
| Hosting + HTTPS + CDN | **Cloudflare Pages** (plan Free) | **US$ 0 / mes** |
| Dominio `.com` | **Cloudflare Registrar** (a precio de costo, sin markup) | **≈ US$ 10,5 / año** (sube a ≈ US$ 11,2 desde nov-2026) |
| Formulario → email | **Web3Forms** Free (250 envíos/mes) | **US$ 0 / mes** |
| Email con el dominio (opcional) | Cloudflare Email Routing (reenvía `hola@almamiamasajes.com` a su Gmail) | **US$ 0** |

**Total: ≈ US$ 0,90 / mes** (solo el dominio, pagado anual).

Por qué Cloudflare Pages y no otro:
- Ancho de banda **ilimitado** en el plan gratis (Netlify y Vercel lo limitan a 100 GB y pausan o cobran al pasarse).
- Uso **comercial permitido** (el plan Hobby de Vercel prohíbe uso comercial).
- Dominio propio + certificado SSL incluidos, sin costo.
- Deploy automático desde GitHub en cada push (igual que ahora con GitHub Pages).

Cómo se pasa a producción (15 minutos):
1. Comprar el dominio en Cloudflare (o transferir el actual `almamiamasajes.com` si ya lo tiene: la transferencia cuesta un año de renovación y no se pierde nada).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → elegir este repo. Build command: `bash scripts/build.sh`. Output: `dist` (publica solo el diseño 1). Detalle paso a paso en el README.
3. Custom domains → agregar `almamiamasajes.com` y `www`. Listo, HTTPS automático.

### Alternativas equivalentes (todas US$ 0 de hosting)

| Host | Pros | Contras |
|---|---|---|
| **GitHub Pages** | Gratis, mismo repo | Sin funciones serverless; límite blando de 100 GB/mes; necesita activarlo una vez en Settings → Pages |
| **Netlify Free** | Formularios nativos (100 envíos/mes) | 100 GB/mes y sistema de créditos confuso desde 2025 |
| **Vercel Hobby** | Excelente DX | **No permite uso comercial** → habría que pagar Pro (US$ 20/mes) |

### Dominio `.uy` vs `.com`

- `.com`: ≈ US$ 10–11 / año en Cloudflare. Recomendado.
- `.com.uy` / `.uy`: entre US$ 64 y US$ 200 / año según registrador, y algunos exigen residencia en Uruguay. Solo vale la pena si es muy importante el "sello local"; el `.com` ya lo tiene y el negocio ya se llama `almamiamasajes.com`.

---

## 3. Formulario y emails

- **Web3Forms** (recomendado): gratis hasta 250 envíos/mes, sin branding, hCaptcha incluido. Se crea una "access key" con el email de Lucía y se pega en `shared/content.js` → `web3formsKey`. Cada consulta llega a su casilla con nombre, teléfono, tratamiento y mensaje.
- **Formspree**: 50 envíos/mes gratis, luego US$ 10–15/mes. Más conocido, menos generoso.
- **Mientras no haya key configurada**, el formulario arma el mensaje y abre WhatsApp. O sea: funciona desde el día uno.

---

## 4. Chatbot: ¿vale la pena y cuánto cuesta?

### Opción A — Widget de chat (humano + bot de reglas) · US$ 0

- **Tawk.to**: chat en vivo 100 % gratis, agentes ilimitados, app móvil. Lucía responde desde el celular. Quitar la marca "Powered by" cuesta US$ 29–39/mes (no hace falta).
- **Tidio Free**: 50 conversaciones/mes y bot de reglas simple; el bot con IA ("Lyro") arranca en ≈ US$ 32/mes.
- **Veredicto**: para un negocio unipersonal, **WhatsApp ya es el chat**. Un widget extra suma poco y duplica canales. Solo lo recomendaría si ella no quiere exponer su número.

### Opción B — Chatbot con IA propio (responde preguntas, sugiere tratamiento, deriva a WhatsApp)

Arquitectura mínima: un **Cloudflare Worker** (función serverless) que recibe el mensaje del visitante, le agrega el contexto del negocio (servicios, zonas, precios, FAQ: todo lo que ya está en `shared/content.js`) y llama a un modelo de lenguaje.

| Pieza | Proveedor | Costo estimado |
|---|---|---|
| Función serverless | Cloudflare Workers Free: 100.000 requests/día | **US$ 0** |
| Modelo de IA (opción barata) | Cloudflare Workers AI Free: 10.000 "neurons"/día ≈ 80–300 respuestas/día según modelo | **US$ 0** |
| Modelo de IA (opción calidad) | Claude Haiku vía API Anthropic. Una conversación de 10 mensajes ≈ 8.000 tokens → fracciones de centavo | **≈ US$ 1–5 / mes** con tráfico de negocio local |
| Memoria de conversaciones (opcional) | Cloudflare KV / D1 Free | **US$ 0** |

**Total chatbot IA: US$ 0 a 5 / mes.** Lo caro no es el hosting, es el tiempo de armarlo y de escribir bien el "prompt" con las reglas del negocio (qué puede y qué no puede prometer, cómo deriva a WhatsApp, que no invente precios).

Recomendación honesta: **fase 1 sin chatbot**. Un botón de WhatsApp bien puesto convierte mejor que un bot para este rubro. Si en 2–3 meses las consultas repetitivas la saturan ("¿atendés en La Barra?", "¿cuánto dura?"), ahí sumamos el bot con IA en el mismo Worker. El código del sitio ya deja el lugar (sección FAQ + contenido centralizado = contexto listo para el bot).

---

## 5. Hosting con backend "de verdad" (si algún día hace falta)

Casos que lo justificarían: reservas con agenda online, pagos, panel para que ella edite contenido, cuentas de clientes.

| Nivel | Qué incluye | Dónde | Costo |
|---|---|---|---|
| **Serverless liviano** | Funciones (formulario custom, chatbot, webhook de pagos), base chica | Cloudflare Workers + D1 / KV Free | **US$ 0 / mes**, Paid US$ 5/mes si crece |
| **Agenda online sin programar** | Turnos, recordatorios, Google Calendar | Calendly Free / Cal.com Free (embebido en la web) | **US$ 0**; planes con cobro ≈ US$ 10–16/mes |
| **Pagos / señas** | Cobrar seña al reservar | Mercado Pago (comisión por transacción, sin fijo) | **≈ 4–6 % por cobro** |
| **CMS para que ella edite** | Panel visual de contenido | Decap CMS (gratis, sobre GitHub) o Sanity Free | **US$ 0** |
| **Servidor dedicado (Node/Python + DB)** | App completa con usuarios, admin, etc. | Railway / Render / Fly.io | **US$ 5–10 / mes** mínimo; Supabase Free para DB Postgres |
| **VPS** | Control total | Hetzner / DigitalOcean | **US$ 4–6 / mes** + tiempo de administrarlo |

Resumen: hasta un nivel de "agenda + pagos + chatbot" se puede resolver con **US$ 0–10 / mes** combinando capas gratuitas. Un backend tradicional con servidor propio arranca en **US$ 5–10 / mes** y suma mantenimiento.

---

## 6. Resumen ejecutivo

| Escenario | Costo mensual |
|---|---|
| Sitio actual (front + formulario + WhatsApp) con dominio `.com` | **≈ US$ 0,90** |
| + chatbot IA en Cloudflare Workers | **≈ US$ 1–6** |
| + agenda online (Cal.com/Calendly free) + Mercado Pago | **≈ US$ 1–6 + comisiones** |
| + backend propio en Railway/Render + DB | **≈ US$ 6–20** |

---

## 7. Fuentes consultadas

- Comparativa planes free Cloudflare Pages / Netlify / Vercel / GitHub Pages (2026): https://developer.puter.com/blog/github-pages-alternatives/ · https://dev.to/libme/vercel-vs-netlify-vs-cloudflare-pages-where-your-side-project-should-actually-live-1j30
- Precio `.com` en Cloudflare Registrar: https://costgoat.com/compare/domains/com · https://startupowl.com/reviews/cloudflare-registrar
- Dominios `.uy`: https://www.ovhcloud.com/es/domains/tld/comuy/ · https://www.nominus.com/blog/uy-vs-com-domain-in-uruguay
- Web3Forms vs Formspree: https://web3forms.com/alternatives/formspree-alternative · https://splitforms.com/blog/formspree-vs-web3forms
- Chat widgets: https://www.capterra.com/p/167792/tawk-to/pricing/ · https://www.dragapp.com/blog/tidio-alternatives/
- Cloudflare Workers / Workers AI free tier: https://www.cloudflare.com/plans.md · https://developers.cloudflare.com/workers-ai/platform/pricing/

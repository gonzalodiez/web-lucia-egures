/* =====================================================================
   ALMA MÍA · Lógica compartida (todas las versiones)
   - rutas de imágenes, formulario (Web3Forms), WhatsApp, lightbox,
     reveal on scroll, contadores, nav sticky, menú mobile
   ===================================================================== */
(function () {
  const A = window.ALMA;
  const BASE = window.ALMA_BASE || "";
  A.img = (p) => BASE + p;
  A.imgSm = (p) => BASE + p.replace(/\.jpg$/, "-sm.jpg");

  /* ---------- reveal on scroll ---------- */
  A.reveal = function (selector = "[data-reveal]") {
    const els = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const d = en.target.getAttribute("data-delay");
          if (d) en.target.style.transitionDelay = d + "ms";
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  };

  /* ---------- contadores ---------- */
  A.counters = function (selector = "[data-count]") {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        const raw = el.getAttribute("data-count");
        const num = parseInt(raw, 10); const suffix = raw.replace(/[0-9]/g, "");
        const t0 = performance.now(); const dur = 1400;
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(num * e) + suffix;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  };

  /* ---------- nav sticky + menú mobile ---------- */
  A.nav = function () {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const burger = document.querySelector("[data-burger]");
    const menu = document.querySelector("[data-menu]");
    if (burger && menu) {
      burger.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open);
        document.body.classList.toggle("no-scroll", open);
      });
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        menu.classList.remove("open"); burger.classList.remove("open"); document.body.classList.remove("no-scroll");
      }));
    }
    // link activo
    const links = [...document.querySelectorAll("[data-menu] a[href^='#']")];
    const secs = links.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
    if (secs.length) {
      const io = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }});
      }, { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach(s => io.observe(s));
    }
  };

  /* ---------- lightbox ---------- */
  A.lightbox = function (selector = "[data-lightbox]") {
    const items = [...document.querySelectorAll(selector)];
    if (!items.length) return;
    const lb = document.createElement("div");
    lb.className = "lb"; lb.innerHTML = `
      <button class="lb-close" aria-label="Cerrar">&times;</button>
      <button class="lb-prev" aria-label="Anterior">&#8249;</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-next" aria-label="Siguiente">&#8250;</button>`;
    document.body.appendChild(lb);
    const img = lb.querySelector("img"), cap = lb.querySelector("figcaption");
    let i = 0;
    const show = (n) => {
      i = (n + items.length) % items.length;
      const el = items[i];
      img.src = el.getAttribute("data-lightbox") || el.src; img.alt = el.alt || "";
      cap.textContent = el.getAttribute("data-caption") || el.alt || "";
    };
    const open = (n) => { show(n); lb.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    items.forEach((el, n) => el.addEventListener("click", () => open(n)));
    lb.querySelector(".lb-close").onclick = close;
    lb.querySelector(".lb-prev").onclick = () => show(i - 1);
    lb.querySelector(".lb-next").onclick = () => show(i + 1);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1);
    });
  };

  /* ---------- formulario → Web3Forms (email) + fallback WhatsApp ---------- */
  A.form = function (formEl) {
    if (!formEl) return;
    const status = formEl.querySelector("[data-status]");
    const btn = formEl.querySelector("button[type=submit]");
    const say = (msg, ok) => { if (!status) return; status.textContent = msg; status.className = "form-status " + (ok ? "ok" : "err"); };
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(formEl);
      const nombre = fd.get("nombre"), servicio = fd.get("servicio"), msg = fd.get("mensaje");
      const key = A.brand.web3formsKey;
      // Sin key configurada → abrimos WhatsApp con el mensaje armado
      if (!key || key.startsWith("REEMPLAZAR")) {
        const txt = `Hola Lucía, soy ${nombre}. Quiero reservar: ${servicio}. ${msg || ""}`;
        window.open(A.waLink(txt), "_blank");
        say("Te llevamos a WhatsApp para confirmar la reserva ✓", true);
        return;
      }
      fd.append("access_key", key);
      fd.append("subject", `Nueva consulta web · ${nombre} · ${servicio}`);
      fd.append("from_name", "Web Alma mía");
      btn && (btn.disabled = true);
      say("Enviando…", true);
      try {
        const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        const j = await r.json();
        if (j.success) { say("¡Listo! Te respondo a la brevedad 🌿", true); formEl.reset(); }
        else say("Hubo un problema. Escribime por WhatsApp.", false);
      } catch (err) { say("Sin conexión. Escribime por WhatsApp.", false); }
      btn && (btn.disabled = false);
    });
  };

  /* ---------- botón flotante WhatsApp ---------- */
  A.whatsappFloat = function () {
    const a = document.createElement("a");
    a.href = A.waLink(); a.target = "_blank"; a.rel = "noopener"; a.className = "wa-float"; a.setAttribute("aria-label", "WhatsApp");
    a.innerHTML = `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.6 1.9 6.5L4 29l7.8-1.9c1.3.7 2.8 1 4.2 1 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.9c-1.3 0-2.6-.3-3.8-1l-.3-.1-4.4 1.1 1.2-4.2-.2-.3C7.4 18.8 6.8 16.9 6.8 15 6.8 9.9 10.9 5.8 16 5.8s9.2 4.1 9.2 9.1-4.1 10-9.2 10zm5.3-7.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.1-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>`;
    document.body.appendChild(a);
  };

  /* ---------- rellenar enlaces/datos de contacto ---------- */
  A.fill = function () {
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = A.waLink(el.getAttribute("data-wa") || undefined); el.target = "_blank"; el.rel = "noopener"; });
    document.querySelectorAll("[data-ig]").forEach(el => { el.href = A.brand.instagram; el.target = "_blank"; el.rel = "noopener"; });
    document.querySelectorAll("[data-mail]").forEach(el => { el.href = "mailto:" + A.brand.email; el.textContent = el.textContent.trim() || A.brand.email; });
    document.querySelectorAll("[data-tel]").forEach(el => { el.href = "tel:" + A.brand.phone.replace(/\s/g, ""); el.textContent = el.textContent.trim() || A.brand.phone; });
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    // select de servicios
    document.querySelectorAll("select[name=servicio]").forEach(sel => {
      A.services.forEach(s => { const o = document.createElement("option"); o.value = s.name; o.textContent = s.name; sel.appendChild(o); });
      const o = document.createElement("option"); o.value = "No sé, asesorame"; o.textContent = "No sé, asesorame"; sel.appendChild(o);
    });
  };

  /* ---------- cursor custom opcional ---------- */
  A.cursor = function () {
    if (matchMedia("(pointer:coarse)").matches) return;
    const c = document.createElement("div"); c.className = "cursor"; document.body.appendChild(c);
    let x = 0, y = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
    (function loop() { x += (tx - x) * .18; y += (ty - y) * .18; c.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", () => c.classList.add("hover"));
      el.addEventListener("mouseleave", () => c.classList.remove("hover"));
    });
  };

  A.boot = function (opts = {}) {
    A.fill(); A.nav(); A.reveal(); A.counters(); A.lightbox(); A.whatsappFloat();
    document.querySelectorAll("form[data-form]").forEach(A.form);
    if (opts.cursor) A.cursor();
  };
})();

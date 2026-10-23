/* ALMA MÍA · v4 scrollytelling */
(function () {
  const A = window.ALMA, $ = (s) => document.querySelector(s);
  const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const desktop = () => innerWidth > 1024;

  /* ---- Pasos del recorrido ---- */
  const STEPS = [
    { min: 0, t: "Minuto 0 · Llegás", h: "Dejás el día en la puerta.", p: ["Te recibo, charlamos dos minutos: qué sentís, dónde, desde cuándo. No hay formulario ni apuro.", "El espacio ya está listo: camilla tibia, luz baja, una música que no pide atención."], tag: "Consultorio o a domicilio", img: "assets/img/room.jpg" },
    { min: 5, t: "Minuto 5 · Respirás", h: "El cuerpo baja un cambio.", p: ["Aceite tibio, aroma a eucalipto, manos que primero solo apoyan. La respiración se alarga sola.", "Acá el sistema nervioso entiende que puede soltar la guardia."], tag: "Masaje relajante", img: "assets/img/linen.jpg" },
    { min: 10, t: "Minuto 10 · Las manos escuchan", h: "Encontramos el nudo.", p: ["Presión profunda, amasamiento, estiramientos. Cuello, trapecios, la zona entre los omóplatos que carga todo.", "No es dolor por dolor: es la presión justa donde hace falta."], tag: "Descontracturante", img: "assets/img/hands.jpg" },
    { min: 30, t: "Minuto 30 · Calor", h: "Lo que no afloja a mano, afloja con calor.", p: ["Piedras volcánicas a temperatura controlada a lo largo de la espalda. El calor entra en profundidad y abre las capas más tensas.", "O herramientas de madera que modelan, activan y drenan."], tag: "Piedras calientes · Maderoterapia", img: "assets/img/piedras.jpg" },
    { min: 45, t: "Minuto 45 · Soltás", h: "El cuerpo se vuelve liviano.", p: ["Maniobras suaves de drenaje para que la circulación haga su trabajo. Piernas, pies, puntos reflejos que equilibran todo el sistema.", "Muchos se duermen acá. Está perfecto."], tag: "Drenaje linfático · Reflexología", img: "assets/img/reflexologia.jpg" },
    { min: 60, t: "Minuto 60 · Volvés", h: "Salís distinto a como entraste.", p: ["Un vaso de agua, dos recomendaciones, y el mundo esperándote con un poco menos de ruido.", "Si querés, armamos un plan para sostener lo que ganaste hoy."], tag: "Seguimiento", img: "assets/img/coast.jpg" }
  ];
  $("#media").innerHTML = STEPS.map((s, i) => `<img src="${A.img(s.img)}" alt="" class="${i === 0 ? "on" : ""}">`).join("");
  $("#steps").innerHTML = STEPS.map((s, i) => `<article class="step ${i === 0 ? "on" : ""}" data-i="${i}" data-min="${s.min}"><p class="t">${s.t}</p><h3>${s.h}</h3>${s.p.map(x => `<p>${x}</p>`).join("")}<span class="tag">${s.tag}</span></article>`).join("");
  const imgs = [...document.querySelectorAll("#media img")], steps = [...document.querySelectorAll(".step")];
  const arc = $("#clock-arc"), cmin = $("#clock-min");
  const setStep = (i) => {
    imgs.forEach((im, k) => im.classList.toggle("on", k === i)); steps.forEach((st, k) => st.classList.toggle("on", k === i));
    const m = STEPS[i].min; cmin.textContent = m; arc.style.strokeDashoffset = 289 - (289 * m / 60);
  };
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) setStep(+e.target.dataset.i); }), { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach(s => io.observe(s));

  /* ---- Cover number count ---- */
  const cn = $("#cover-num"); let c = 0; const ct = setInterval(() => { c += 3; if (c >= 60) { c = 60; clearInterval(ct); } cn.textContent = c; }, 28);

  /* ---- Capítulos + color de fondo ---- */
  const secs = [...document.querySelectorAll("section[data-chapter]")];
  const ch = $("#chapters");
  ch.innerHTML = secs.map((s, i) => `<a href="#${s.id || ""}" data-i="${i}"><span>${s.dataset.chapter}</span><i></i></a>`).join("");
  const chLinks = [...ch.querySelectorAll("a")];
  const ioc = new IntersectionObserver((es) => es.forEach(e => {
    if (!e.isIntersecting) return;
    const s = e.target; document.body.style.background = s.dataset.bg; document.body.style.color = s.dataset.ink;
    chLinks.forEach(l => l.classList.toggle("active", l.dataset.i == secs.indexOf(s)));
  }), { rootMargin: "-40% 0px -55% 0px" });
  secs.forEach(s => ioc.observe(s));

  /* ---- Progress bar ---- */
  const bar = $("#bar");
  window.addEventListener("scroll", () => { const h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%"; }, { passive: true });

  /* ---- Elegí tu recorrido (horizontal) ---- */
  const track = $("#choose-track");
  track.innerHTML = A.services.map(s => `<article class="ccard" data-id="${s.id}"><img src="${A.img(s.img)}" alt="${s.name}" loading="lazy"><div><span class="cat">${s.cat}</span><h3>${s.name}</h3><p>${s.short}</p><div class="dur"><span>${s.duration}</span><span>Reservar →</span></div></div></article>`).join("");
  track.addEventListener("click", e => { const c = e.target.closest(".ccard"); if (!c) return; const s = A.services.find(x => x.id === c.dataset.id); window.open(A.waLink(`Hola Lucía, quiero reservar: ${s.name}.`), "_blank"); });
  if (hasGsap && !reduce) ScrollTrigger.matchMedia({ "(min-width: 1025px)": () => {
    const amount = () => track.scrollWidth - innerWidth + 2 * parseFloat(getComputedStyle(track).paddingLeft);
    gsap.to(track, { x: () => -amount(), ease: "none", scrollTrigger: { trigger: ".choose", start: "top top", end: () => "+=" + amount(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
  } });

  /* ---- Dónde ---- */
  $("#zones").innerHTML = A.zones.map(z => `<li>${z}</li>`).join("");
  if (hasGsap && !reduce) document.querySelectorAll("[data-speed]").forEach(img => {
    const sp = parseFloat(img.dataset.speed);
    gsap.fromTo(img, { yPercent: (1 - sp) * 30 }, { yPercent: (sp - 1) * 30, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ---- Bio ---- */
  $("#bio-text").innerHTML = A.about.body.map(p => `<p data-reveal>${p}</p>`).join("") + `<p class="sign" data-reveal>Lucía Egures</p>`;

  /* ---- Galería deck ---- */
  const deck = $("#deck"); const G = A.gallery.slice(0, 7);
  deck.innerHTML = G.map((g, i) => `<figure style="z-index:${G.length - i}"><img src="${A.img(g.src)}" alt="${g.alt}" loading="lazy" data-lightbox="${A.img(g.src)}" data-caption="${g.alt}"><figcaption>${String(i + 1).padStart(2, "0")} — ${g.alt}</figcaption></figure>`).join("");
  $(".deck-head").insertAdjacentHTML("beforeend", `<div class="deck-counter"><span id="deck-n">01</span> / ${String(G.length).padStart(2, "0")}</div>`);
  if (hasGsap && !reduce) ScrollTrigger.matchMedia({ "(min-width: 1025px)": () => {
    const figs = deck.querySelectorAll("figure");
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".deck", start: "top top", end: () => "+=" + (figs.length * 60) + "%", pin: true, scrub: .6, anticipatePin: 1,
      onUpdate: (st) => { $("#deck-n").textContent = String(Math.min(figs.length, Math.floor(st.progress * figs.length) + 1)).padStart(2, "0"); } } });
    figs.forEach((f, i) => { if (i < figs.length - 1) tl.to(f, { yPercent: -120, rotate: -6, opacity: 0, duration: 1, ease: "power2.in" }, i); });
  } });

  /* ---- Voces (palabra a palabra) ---- */
  $("#voices").innerHTML = A.testimonials.map(t => `<div class="voice"><blockquote>${t.q.split(/\s+/).map(w => `<span class="w">${w}</span>`).join("")}</blockquote><cite>${t.a} · ${t.w}</cite></div>`).join("");
  document.querySelectorAll(".voice blockquote").forEach(b => {
    const ws = [...b.querySelectorAll(".w")];
    if (hasGsap && !reduce) ScrollTrigger.create({ trigger: b, start: "top 85%", end: "bottom 50%", scrub: true, onUpdate: s => { const n = Math.floor(s.progress * ws.length); ws.forEach((w, i) => w.classList.toggle("on", i <= n)); } });
    else ws.forEach(w => w.classList.add("on"));
  });

  /* ---- FAQ mini ---- */
  $("#faq div").innerHTML = A.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  document.querySelectorAll("section h2, .where-text, .where-media, .bio img").forEach(el => el.setAttribute("data-reveal", ""));
  A.boot();
  if (hasGsap) { window.addEventListener("load", () => ScrollTrigger.refresh()); setTimeout(() => ScrollTrigger.refresh(), 800); }
})();

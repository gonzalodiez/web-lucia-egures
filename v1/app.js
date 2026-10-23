/* ALMA MÍA · v1 app */
(function () {
  const A = window.ALMA, $ = (s) => document.querySelector(s);

  // Hero
  $("#hero-kicker").textContent = A.hero.kicker;
  $("#hero-sub").textContent = A.hero.subtitle;
  $("#hero-title").innerHTML = A.hero.title.split(" ").map((w, i) =>
    `<span class="w"><span style="animation-delay:${0.15 + i * 0.09}s">${w}</span></span>`).join("");

  // Marquee
  const zs = [...A.zones, ...A.zones].map(z => `<span>${z}</span>`).join("");
  $("#marquee-track").innerHTML = zs + zs;

  // About
  $("#about-title").textContent = A.about.title;
  $("#about-body").innerHTML = A.about.body.map((p, i) => `<p data-reveal data-delay="${i * 90}">${p}</p>`).join("");
  $("#about-stats").innerHTML = A.about.stats.map(s => `<div data-reveal><b data-count="${s.n}">0</b><span>${s.l}</span></div>`).join("");

  // Services + chips
  const cats = ["Todos", ...new Set(A.services.map(s => s.cat))];
  $("#chips").innerHTML = cats.map((c, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  $("#services-grid").innerHTML = A.services.map((s, i) => `
    <article class="card" data-cat="${s.cat}" data-id="${s.id}" data-reveal data-delay="${(i % 3) * 90}">
      <div class="card-img"><img src="${A.img(s.img)}" alt="${s.name}" loading="lazy"><span class="tag">${s.cat}</span></div>
      <div class="card-body"><h3>${s.name}</h3><p>${s.short}</p>
        <div class="card-foot"><span>${s.duration}</span><b>Ver más →</b></div></div>
    </article>`).join("");
  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
    const cat = b.dataset.cat;
    document.querySelectorAll(".card").forEach(c => c.classList.toggle("hide", cat !== "Todos" && c.dataset.cat !== cat));
  });

  // Modal
  const modal = $("#modal");
  const openModal = (id) => {
    const s = A.services.find(x => x.id === id); if (!s) return;
    $("#m-img").src = A.img(s.img); $("#m-cat").textContent = s.cat + " · " + s.duration;
    $("#m-name").textContent = s.name; $("#m-long").textContent = s.long; $("#m-dur").textContent = "Duración: " + s.duration;
    $("#m-wa").href = A.waLink(`Hola Lucía, quiero reservar: ${s.name}.`);
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
  };
  const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); };
  $("#services-grid").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openModal(c.dataset.id); });
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("modal-close")) closeModal(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  // Steps
  $("#steps").innerHTML = A.process.map((p, i) => `<li data-reveal data-delay="${i * 120}"><div class="n">${p.n}</div><h3>${p.t}</h3><p>${p.d}</p></li>`).join("");

  // Gallery
  $("#masonry").innerHTML = A.gallery.map((g, i) => `
    <figure data-reveal data-delay="${(i % 3) * 80}"><img src="${A.img(g.src)}" alt="${g.alt}" loading="lazy" data-lightbox="${A.img(g.src)}" data-caption="${g.alt}"><figcaption>${g.alt}</figcaption></figure>`).join("");

  // Zones
  $("#zones").innerHTML = A.zones.map((z, i) => `<li data-reveal data-delay="${i * 60}">${z}</li>`).join("");

  // Testimonials slider
  const track = $("#testi .testi-track"), dots = $("#testi .testi-dots");
  track.innerHTML = A.testimonials.map(t => `<div class="testi-item"><blockquote>${t.q}</blockquote><cite><b>${t.a}</b> · ${t.w}</cite></div>`).join("");
  dots.innerHTML = A.testimonials.map((_, i) => `<button aria-label="Testimonio ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`).join("");
  let ti = 0, timer;
  const go = (n) => { ti = (n + A.testimonials.length) % A.testimonials.length; track.style.transform = `translateX(-${ti * 100}%)`;
    dots.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === ti)); };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(ti + 1), 6000); };
  dots.addEventListener("click", (e) => { const i = [...dots.children].indexOf(e.target); if (i > -1) { go(i); auto(); } });
  auto();
  // swipe
  let sx = 0; track.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  track.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(ti + (dx < 0 ? 1 : -1)); auto(); } });

  // FAQ
  $("#faq").innerHTML = A.faq.map((f, i) => `<details data-reveal data-delay="${i * 70}"><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  // Parallax
  const px = [...document.querySelectorAll("[data-parallax]")];
  const onScroll = () => {
    const y = window.scrollY;
    px.forEach(el => {
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      const k = parseFloat(el.dataset.parallax);
      const base = el.closest("section") ? el.closest("section").offsetTop : 0;
      el.style.transform = `translateY(${(y - base) * k}px)`;
    });
  };
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

  A.boot();
})();

/* ALMA MÍA · v2 app */
(function () {
  const A = window.ALMA, $ = (s) => document.querySelector(s);
  $("#hero-sub").textContent = A.hero.subtitle;

  // strip
  const items = ["Consultorio en Maldonado", "Atención a domicilio", "Materiales descartables", "Turnos por WhatsApp", "Gift cards", "Protocolos personalizados", "Post operatorio con indicación médica"];
  const html = items.map(i => `<span>${i}</span>`).join("");
  $("#strip").innerHTML = `<div>${html}</div><div>${html}</div>`;

  // scroll progress
  const prog = $("#progress");
  window.addEventListener("scroll", () => { const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%"; }, { passive: true });

  // tilt
  if (!matchMedia("(pointer:coarse)").matches) document.querySelectorAll(".tilt").forEach(el => {
    el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-3px)`; });
    el.addEventListener("mouseleave", () => el.style.transform = "");
  });

  // services tabs
  const cats = ["Todos", ...new Set(A.services.map(s => s.cat))];
  $("#tabs").innerHTML = cats.map((c, i) => `<button class="tab ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  $("#list").innerHTML = A.services.map((s, i) => `<li data-id="${s.id}" data-cat="${s.cat}" class="${i === 0 ? "active" : ""}"><span>${s.name}</span><small>${s.duration}</small></li>`).join("");
  const dimg = $("#d-img"), dimg2 = $("#d-img2"), wrap = $(".detail-img");
  const show = (id) => {
    const s = A.services.find(x => x.id === id);
    dimg2.src = A.img(s.img); wrap.classList.add("swap");
    setTimeout(() => { dimg.src = dimg2.src; wrap.classList.remove("swap"); }, 600);
    const body = $(".detail-body"); body.classList.remove("fade"); void body.offsetWidth; body.classList.add("fade");
    $("#d-cat").textContent = s.cat; $("#d-name").textContent = s.name; $("#d-long").textContent = s.long;
    $("#d-dur").textContent = "⏱ " + s.duration; $("#d-wa").href = A.waLink(`Hola Lucía, quiero reservar: ${s.name}.`);
    document.querySelectorAll("#list li").forEach(l => l.classList.toggle("active", l.dataset.id === id));
  };
  dimg.src = A.img(A.services[0].img); show(A.services[0].id);
  $("#list").addEventListener("click", e => { const li = e.target.closest("li"); if (li) show(li.dataset.id); });
  $("#tabs").addEventListener("click", e => {
    const b = e.target.closest(".tab"); if (!b) return;
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === b));
    const cat = b.dataset.cat; let first = null;
    document.querySelectorAll("#list li").forEach(l => { const hide = cat !== "Todos" && l.dataset.cat !== cat; l.classList.toggle("hide", hide); if (!hide && !first) first = l; });
    if (first) show(first.dataset.id);
  });

  // about
  $("#about-title").textContent = A.about.title;
  $("#about-body").innerHTML = A.about.body.map((p, i) => `<p data-reveal data-delay="${i * 80}">${p}</p>`).join("");
  $("#process").innerHTML = A.process.map((p, i) => `<div data-reveal data-delay="${i * 80}"><i>${p.n}</i><b>${p.t}</b>${p.d}</div>`).join("");

  // gallery strip
  const gal = $("#gal");
  gal.innerHTML = A.gallery.map(g => `<figure class="${g.r === "4/5" || g.r === "1/1" ? "tall" : ""}"><img src="${A.img(g.src)}" alt="${g.alt}" loading="lazy" data-lightbox="${A.img(g.src)}" data-caption="${g.alt}"><figcaption>${g.alt}</figcaption></figure>`).join("");
  $("#g-prev").onclick = () => gal.scrollBy({ left: -400, behavior: "smooth" });
  $("#g-next").onclick = () => gal.scrollBy({ left: 400, behavior: "smooth" });

  // zones
  $("#zones").innerHTML = A.zones.map(z => `<li>${z}</li>`).join("");

  // testimonials
  $("#testi").innerHTML = A.testimonials.map((t, i) => `<article data-reveal data-delay="${i * 100}"><div class="stars">★★★★★</div><p>“${t.q}”</p><cite><b>${t.a}</b>${t.w}</cite></article>`).join("");

  // faq
  $("#faqs").innerHTML = A.faq.map((f, i) => `<details data-reveal data-delay="${i * 60}"><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  A.boot();
})();

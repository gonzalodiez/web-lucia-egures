/* ALMA MÍA · v3 app (GSAP) */
(function () {
  const A = window.ALMA, $ = (s) => document.querySelector(s);
  const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  // Cursor glow
  const glow = $("#glow");
  if (!matchMedia("(pointer:coarse)").matches) window.addEventListener("mousemove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });

  // Hero intro
  if (hasGsap && !reduce) {
    const tl = gsap.timeline({ delay: 1.1, defaults: { ease: "power3.out" } });
    tl.to(".hero .eyebrow", { opacity: 1, duration: .8 })
      .to(".hero h1 .line span", { y: 0, duration: 1.3, stagger: .15, ease: "expo.out" }, "-=.4")
      .to(".hero-sub", { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .to(".hero-cta", { opacity: 1, duration: .8 }, "-=.5")
      .to(".hero-foot", { opacity: 1, duration: .8 }, "-=.4");
  } else { document.querySelectorAll(".hero .eyebrow,.hero-sub,.hero-cta,.hero-foot").forEach(e => e.style.opacity = 1); document.querySelectorAll(".hero h1 .line span").forEach(e => e.style.transform = "none"); }

  // Manifesto words
  const mt = $("#manifesto-text");
  mt.innerHTML = mt.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join("");
  const words = [...mt.querySelectorAll(".w")];
  if (hasGsap) {
    ScrollTrigger.create({ trigger: mt, start: "top 80%", end: "bottom 45%", scrub: true,
      onUpdate: (self) => { const n = Math.floor(self.progress * words.length); words.forEach((w, i) => w.classList.toggle("on", i <= n)); } });
    // parallax images
    document.querySelectorAll("[data-speed]").forEach(img => {
      const sp = parseFloat(img.dataset.speed);
      gsap.fromTo(img, { yPercent: (1 - sp) * 40 }, { yPercent: (sp - 1) * 40, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
    });
  } else words.forEach(w => w.classList.add("on"));

  // Rituals menu
  const list = $("#menu-list");
  list.innerHTML = A.services.map((s, i) => `
    <div class="row" data-id="${s.id}" data-img="${A.img(s.img)}" data-reveal data-delay="${i * 40}">
      <span class="n">${String(i + 1).padStart(2, "0")}</span>
      <h3>${s.name}</h3>
      <span class="cat">${s.cat}</span>
      <span class="dur">${s.duration}</span>
      <p class="short">${s.short}</p>
    </div>`).join("");
  const hov = $("#hover-img"), hovImg = hov.querySelector("img");
  let hx = 0, hy = 0, tx = 0, ty = 0;
  list.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
  list.addEventListener("mouseover", e => { const r = e.target.closest(".row"); if (!r) return; hovImg.src = r.dataset.img; hov.classList.add("on"); });
  list.addEventListener("mouseleave", () => hov.classList.remove("on"));
  (function loop() { hx += (tx - hx) * .12; hy += (ty - hy) * .12; hov.style.left = hx + "px"; hov.style.top = hy + "px"; requestAnimationFrame(loop); })();

  // Drawer
  const drawer = $("#drawer"), bg = $("#drawer-bg");
  const openDrawer = (id) => {
    const s = A.services.find(x => x.id === id);
    $("#dr-img").src = A.img(s.img); $("#dr-cat").textContent = s.cat; $("#dr-name").textContent = s.name;
    $("#dr-long").textContent = s.long; $("#dr-dur").textContent = "Duración · " + s.duration;
    $("#dr-wa").href = A.waLink(`Hola Lucía, quiero reservar: ${s.name}.`);
    drawer.classList.add("open"); bg.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => { drawer.classList.remove("open"); bg.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); };
  list.addEventListener("click", e => { const r = e.target.closest(".row"); if (r) openDrawer(r.dataset.id); });
  bg.addEventListener("click", closeDrawer); drawer.querySelector(".drawer-close").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => e.key === "Escape" && closeDrawer());

  // Horizontal gallery
  const track = $("#hgal-track");
  track.insertAdjacentHTML("beforeend", A.gallery.map((g, i) => `<figure class="${g.r === "4/5" || g.r === "1/1" ? "sm" : ""}"><img src="${A.img(g.src)}" alt="${g.alt}" loading="lazy" data-lightbox="${A.img(g.src)}" data-caption="${g.alt}"><figcaption>${g.alt}</figcaption></figure>`).join(""));
  if (hasGsap && !reduce) {
    ScrollTrigger.matchMedia({
      "(min-width: 1025px)": () => {
        const amount = () => track.scrollWidth - innerWidth;
        gsap.to(track, { x: () => -amount(), ease: "none", scrollTrigger: { trigger: ".hgal", start: "top top", end: () => "+=" + amount(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      }
    });
  }

  // Zones marquee
  const zs = A.zones.map(z => `<span>${z}</span>`).join("");
  $("#zone-track").innerHTML = zs + zs;

  // Timeline
  const ol = $("#timeline");
  ol.insertAdjacentHTML("beforeend", A.process.map(p => `<li data-reveal><span class="dot">${p.n}</span><div><h3>${p.t}</h3><p>${p.d}</p></div></li>`).join(""));
  if (hasGsap) gsap.to(".tl-line i", { height: "100%", ease: "none", scrollTrigger: { trigger: ol, start: "top 70%", end: "bottom 60%", scrub: true } });

  // Voices
  $("#voices").innerHTML = A.testimonials.map(t => `<div class="voice" data-reveal><blockquote>“${t.q}”</blockquote><cite>${t.a} · ${t.w}</cite></div>`).join("");

  // FAQ
  $("#faq").innerHTML = A.faq.map(f => `<details data-reveal><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  // Section headings reveal
  document.querySelectorAll("section h2, .man-grid figure, .man-text, .home-img, .home-text, .c-text, .form").forEach(el => el.setAttribute("data-reveal", ""));

  A.boot();
  if (hasGsap) setTimeout(() => ScrollTrigger.refresh(), 500);
})();

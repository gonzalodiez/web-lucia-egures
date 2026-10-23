/* =====================================================================
   ALMA MÍA · Contenido compartido entre las 4 versiones
   ---------------------------------------------------------------------
   TODO lo que hay que editar para personalizar está acá:
   contacto, servicios, zonas, precios (opcional), redes.
   ===================================================================== */
window.ALMA = {
  brand: {
    name: "Alma mía",
    tagline: "Masajes terapéuticos & bienestar corporal",
    city: "Maldonado, Uruguay",
    therapist: "Lucía Egures",
    // Reemplazar por el número real (formato internacional sin + ni espacios)
    whatsapp: "59899000000",
    phone: "+598 99 000 000",
    email: "hola@almamiamasajes.com",
    instagram: "https://instagram.com/almamiamasajes",
    // Web3Forms access key: crear gratis en https://web3forms.com (250 envíos/mes)
    web3formsKey: "REEMPLAZAR_CON_TU_ACCESS_KEY",
    hours: "Lunes a sábado · 9:00 a 20:00 · con cita previa"
  },

  hero: {
    kicker: "Maldonado · Punta del Este · a domicilio",
    title: "Volvé a habitar tu cuerpo.",
    subtitle:
      "Masajes terapéuticos, relajantes y descontracturantes, drenaje linfático y tratamientos corporales de vanguardia. En consultorio o donde vos estés."
  },

  about: {
    title: "Un espacio para soltar",
    body: [
      "Alma mía nace de una convicción simple: el cuerpo guarda todo lo que la cabeza no logra procesar. Tensión, cansancio, estrés. Y también sabe soltarlo, si le damos el espacio.",
      "Trabajo con técnicas terapéuticas y estéticas respaldadas por formación profesional, adaptando cada sesión a lo que tu cuerpo necesita ese día. Sin recetas iguales para todos.",
      "Atiendo en Maldonado y me traslado a domicilio en toda la zona de Punta del Este, para que el bienestar llegue a tu casa, tu hotel o tu lugar de descanso."
    ],
    stats: [
      { n: "10+", l: "técnicas" },
      { n: "8", l: "zonas a domicilio" },
      { n: "100%", l: "sesiones personalizadas" }
    ]
  },

  services: [
    {
      id: "descontracturante",
      cat: "Terapéutico",
      name: "Masaje descontracturante",
      short: "Libera contracturas, nudos y tensión acumulada en cuello, espalda y hombros.",
      long: "Trabajo profundo sobre la musculatura con maniobras de presión, amasamiento y estiramiento. Ideal si pasás muchas horas sentado/a, entrenás o cargás estrés en la zona alta de la espalda.",
      duration: "60 min",
      img: "assets/img/hands.jpg",
      icon: "hands"
    },
    {
      id: "relajante",
      cat: "Relajación",
      name: "Masaje relajante",
      short: "Maniobras suaves y envolventes para bajar revoluciones y dormir mejor.",
      long: "Un masaje de cuerpo completo con aceites tibios, ritmo lento y presión media. Baja el cortisol, mejora el descanso y te devuelve al presente.",
      duration: "60 / 90 min",
      img: "assets/img/room.jpg",
      icon: "leaf"
    },
    {
      id: "drenaje",
      cat: "Terapéutico",
      name: "Drenaje linfático manual",
      short: "Reduce retención de líquidos, hinchazón y pesadez en piernas.",
      long: "Técnica suave y rítmica que estimula el sistema linfático. Recomendado en post operatorios (con indicación médica), piernas cansadas, celulitis y como complemento estético.",
      duration: "60 min",
      img: "assets/img/drenaje.jpg",
      icon: "drop"
    },
    {
      id: "piedras",
      cat: "Relajación",
      name: "Masaje con piedras calientes",
      short: "Calor profundo que afloja hasta las capas más tensas del músculo.",
      long: "Piedras volcánicas a temperatura controlada combinadas con maniobras manuales. El calor dilata, relaja y potencia el efecto del masaje.",
      duration: "75 min",
      img: "assets/img/piedras.jpg",
      icon: "stone"
    },
    {
      id: "maderoterapia",
      cat: "Corporal",
      name: "Maderoterapia",
      short: "Modela, tonifica y activa la circulación con herramientas de madera.",
      long: "Rodillos, copas y tablas de madera que trabajan tejido adiposo y celulitis, reafirman y drenan. Resultados visibles en sesiones consecutivas.",
      duration: "45 / 60 min",
      img: "assets/img/maderoterapia.jpg",
      icon: "wood"
    },
    {
      id: "reflexologia",
      cat: "Terapéutico",
      name: "Reflexología podal",
      short: "Presión en puntos reflejos del pie que equilibran todo el cuerpo.",
      long: "Cada zona del pie se corresponde con un órgano o sistema. Una sesión que relaja profundamente, mejora la circulación y acompaña procesos digestivos, de sueño y de ansiedad.",
      duration: "45 min",
      img: "assets/img/reflexologia.jpg",
      icon: "foot"
    },
    {
      id: "radiofrecuencia",
      cat: "Estética",
      name: "Radiofrecuencia",
      short: "Reafirma la piel y estimula colágeno sin dolor ni recuperación.",
      long: "Calor controlado en profundidad que tensa el tejido, mejora flacidez y textura. Para abdomen, brazos, piernas y rostro.",
      duration: "30 / 45 min",
      img: "assets/img/estetica.jpg",
      icon: "wave"
    },
    {
      id: "ultracavitacion",
      cat: "Estética",
      name: "Ultracavitación",
      short: "Ultrasonido de baja frecuencia para reducir grasa localizada.",
      long: "Rompe las células adiposas que luego el cuerpo elimina de forma natural. Se combina con drenaje linfático para potenciar resultados.",
      duration: "45 min",
      img: "assets/img/estetica.jpg",
      icon: "wave"
    },
    {
      id: "vacumterapia",
      cat: "Estética",
      name: "Vacumterapia",
      short: "Succión controlada que moldea, drena y mejora la celulitis.",
      long: "Ventosas con vacío que movilizan el tejido, mejoran la circulación y dan forma. Muy efectiva en glúteos, piernas y abdomen.",
      duration: "45 min",
      img: "assets/img/maderoterapia.jpg",
      icon: "circle"
    },
    {
      id: "dermapen",
      cat: "Estética",
      name: "Dermapen",
      short: "Microneedling que renueva la piel y atenúa marcas y estrías.",
      long: "Microcanales que activan la regeneración natural de la piel. Para estrías, cicatrices, poros y textura. Protocolo profesional con cuidados post sesión.",
      duration: "45 min",
      img: "assets/img/estetica.jpg",
      icon: "sparkle"
    }
  ],

  zones: [
    "Maldonado", "Punta del Este", "La Barra", "Manantiales",
    "José Ignacio", "Garzón", "Solanas", "Punta Ballena"
  ],

  gallery: [
    { src: "assets/img/room.jpg", alt: "Sala de masajes con luz natural", r: "16/9" },
    { src: "assets/img/hands.jpg", alt: "Masaje descontracturante en espalda", r: "3/2" },
    { src: "assets/img/piedras.jpg", alt: "Piedras calientes sobre la espalda", r: "3/2" },
    { src: "assets/img/oils.jpg", alt: "Aceites, sales y toallas", r: "4/5" },
    { src: "assets/img/coast.jpg", alt: "Costa de Punta del Este al atardecer", r: "21/9" },
    { src: "assets/img/maderoterapia.jpg", alt: "Herramientas de maderoterapia", r: "3/2" },
    { src: "assets/img/therapist.jpg", alt: "Preparando la sesión", r: "4/5" },
    { src: "assets/img/domicilio.jpg", alt: "Sesión a domicilio frente al mar", r: "3/2" },
    { src: "assets/img/reflexologia.jpg", alt: "Reflexología podal", r: "3/2" },
    { src: "assets/img/candle.jpg", alt: "Vela, sal marina y eucalipto", r: "1/1" }
  ],

  testimonials: [
    { q: "Llegué con la espalda hecha un nudo después de meses de home office. Salí flotando. Lucía tiene manos que escuchan.", a: "Carolina M.", w: "Punta del Este" },
    { q: "Me atendió en casa, en La Barra, con todo armado en diez minutos. El drenaje me cambió las piernas en tres sesiones.", a: "Florencia R.", w: "La Barra" },
    { q: "Fui por un regalo de cumpleaños y volví cada quince días. Las piedras calientes son otra cosa.", a: "Martín D.", w: "Maldonado" }
  ],

  faq: [
    { q: "¿Cómo reservo?", a: "Por WhatsApp o desde el formulario de esta web. Te confirmo día y horario en el momento." },
    { q: "¿Atendés a domicilio?", a: "Sí. Llevo camilla, toallas y todo lo necesario a Maldonado, Punta del Este, La Barra, Manantiales, José Ignacio, Garzón, Solanas y Punta Ballena." },
    { q: "¿Qué tengo que llevar o preparar?", a: "Nada. Si es a domicilio, solo un espacio de 2 x 3 metros donde armar la camilla." },
    { q: "¿Puedo hacerme drenaje después de una cirugía?", a: "Sí, con indicación de tu médico y una vez pasado el período que te indique. Consultame y lo coordinamos." },
    { q: "¿Hacés regalos / gift cards?", a: "Sí. Escribime y te armo una tarjeta regalo digital con el servicio que elijas." }
  ],

  process: [
    { n: "01", t: "Escribís", d: "Me contás qué sentís y qué buscás. Te sugiero el tratamiento ideal." },
    { n: "02", t: "Coordinamos", d: "Elegís consultorio o domicilio, día y horario." },
    { n: "03", t: "Sesión", d: "Llego con todo listo o te recibo en el espacio. Sin apuro." },
    { n: "04", t: "Seguimiento", d: "Te dejo recomendaciones y armamos un plan si lo necesitás." }
  ]
};

/* ---------- Helpers compartidos ---------- */
window.ALMA.waLink = function (text) {
  const t = encodeURIComponent(text || "Hola Lucía, quiero reservar una sesión de masajes.");
  return "https://wa.me/" + window.ALMA.brand.whatsapp + "?text=" + t;
};

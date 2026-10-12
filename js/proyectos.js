
// Datos de respaldo predeterminados (para garantizar funcionamiento cuando se abre via file://)
const PROYECTOS_PREDETERMINADOS = [
  {
    id: "faster-envios",
    titulo: "Faster Envios",
    subtitulo: "Sistema de Gestion Logistica",
    periodo: "2025 - 2026",
    rol: "Desarrollador Full-Stack (Enfoque Backend)",
    destacado: true,
    imagen: "assets/img/fasterenvios1.png",
    imagenes: [
      "assets/img/fasterenvios2.png",
      "assets/img/fasterenvios3.png",
      "assets/img/fasterenvios4.png",
      "assets/img/fasterenvios5.png"
    ],

    descripcionCorta: "Plataforma para gestion y seguimiento de envios con arquitectura hexagonal, autenticacion JWT stateless y entorno dockerizado.",
    descripcionCompleta: "Plataforma Full-Stack disenada para la administracion y trazabilidad integral de envios. El backend esta construido en Java con Spring Boot bajo los principios de Arquitectura Hexagonal. El frontend fue desarrollado en React con Vite y Tailwind CSS.",
    caracteristicasClave: [
      "Diseno e implementacion de autenticacion stateless mediante Spring Security y tokens JWT.",
      "Separacion estricta de capas (dominio, aplicacion e infraestructura) empleando DTOs, Mappers y el patron Builder.",
      "Modelado relacional robusto en MySQL utilizando Spring Data JPA y migraciones automatizadas en Flyway.",
      "Containerizacion completa con Docker para asegurar consistencia entre entornos.",
      "Documentacion interactiva de la API con Swagger / OpenAPI."
    ],
    stack: [
      "Java", "Spring Boot", "Spring Security", "JWT",
      "Spring Data JPA", "MySQL", "Flyway", "Docker",
      "Swagger / OpenAPI", "React", "Vite", "Tailwind CSS"
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Docker", "React"],
    enlaceRepositorio: "https://github.com/CamiloBermeo/fasterEnvios",
    enlaceDemo: "#"
  },
  {
    id: "flight-on-time",
    titulo: "Flight On Time",
    subtitulo: "Sistema de Prediccion de Vuelos",
    periodo: "2024 - 2025",
    rol: "Responsable del Modulo Backend",
    destacado: true,
    imagen: "assets/img/flight-on-time5.jpg",
    imagenes: [
      "assets/img/flight-on-time1.jpg",
      "assets/img/flight-on-time2.jpg",
      "assets/img/flight-on-time3.jpg",
      "assets/img/flight-on-time4.jpg"
    ],
    descripcionCorta: "Sistema colaborativo de prediccion de vuelos con persistencia en PostgreSQL, migraciones con Flyway y desacoplamiento con Arquitectura Hexagonal.",
    descripcionCompleta: "Proyecto colaborativo internacional desarrollado en el programa Oracle ONE - Alura Latam junto a un equipo distribuido panlatam. Como responsable del modulo Backend, lidere la concepcion tecnica de la API central encargada de procesar las consultas de vuelos.",
    caracteristicasClave: [
      "Construccion del nucleo del backend utilizando Spring Boot, Spring Security y Spring Data JPA.",
      "Diseno e implementacion de la capa de persistencia sobre PostgreSQL con Flyway.",
      "Aplicacion de Arquitectura Hexagonal desacoplando reglas de negocio con DTOs, Mappers y Value Objects.",
      "Gestion de flujos colaborativos en Git y GitHub: code review, ramas de feature y resolucion de conflictos."
    ],
    stack: [
      "Java", "Spring Boot", "Spring Security", "Spring Data JPA",
      "PostgreSQL", "Flyway", "Arquitectura Hexagonal", "Git", "GitHub"
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Git"],
    enlaceRepositorio: "https://github.com/Harol-Medina/Prediccion-Retrasos-Vuelos-Back-End",
    enlaceDemo: "#"
  }
];

// Variable de estado local con los proyectos obtenidos del JSON
let proyectosCargados = [];

/**
 * Calcula la URL base del sitio a partir de la ubicacion del documento HTML.
 * Garantiza que las rutas de assets funcionen tanto en local como en GitHub Pages
 * independientemente de si el sitio esta en la raiz (/) o en una subcarpeta (/portafolio/).
 * Ejemplo: "https://camilobermeo.github.io/portafolio/" -> base = esa URL
 */
function obtenerBaseURL() {
  // window.location.href del documento HTML actual es siempre la fuente correcta
  const url = new URL(window.location.href);
  // Eliminar el nombre del archivo HTML si existe (index.html, proyectos.html, etc.)
  url.pathname = url.pathname.replace(/\/[^/]*\.html$/, "/").replace(/\/$/, "") + "/";
  return url.origin + url.pathname;
}

const BASE_URL = obtenerBaseURL();

document.addEventListener("DOMContentLoaded", () => {
  inicializarProyectos();
});

/**
 * Inyecta tarjetas skeleton en un contenedor de proyectos mientras se carga el JSON.
 * @param {string} idContenedor - ID del div donde se muestran las tarjetas
 * @param {number} cantidad - Cuántas tarjetas skeleton mostrar
 */
function mostrarSkeletonEnContenedor(idContenedor, cantidad) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const skeletonHTML = `
    <div class="col-12 col-sm-6 col-xl-4 mb-3 tarjeta-skeleton-col">
      <div class="tarjeta-skeleton-card" aria-hidden="true">
        <div class="tarjeta-skeleton-imagen"></div>
        <div class="tarjeta-skeleton-cuerpo">
          <div class="tarjeta-skeleton-linea tarjeta-skeleton-titulo"></div>
          <div class="tarjeta-skeleton-linea tarjeta-skeleton-subtitulo"></div>
          <div class="tarjeta-skeleton-linea tarjeta-skeleton-desc1"></div>
          <div class="tarjeta-skeleton-linea tarjeta-skeleton-desc2"></div>
          <div class="tarjeta-skeleton-linea tarjeta-skeleton-badge"></div>
        </div>
      </div>
    </div>
  `;

  contenedor.innerHTML = skeletonHTML.repeat(cantidad);
}

async function inicializarProyectos() {
  // Mostrar skeletons inmediatamente mientras se carga el JSON
  mostrarSkeletonEnContenedor("contenedor-proyectos-destacados", 2);
  mostrarSkeletonEnContenedor("contenedor-proyectos-galeria", 3);

  try {
    const respuesta = await fetch(`${BASE_URL}data/proyectos.json`);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP al cargar proyectos: ${respuesta.status}`);
    }
    proyectosCargados = await respuesta.json();
  } catch (error) {
    // Si fetch falla (protocolo file:// sin servidor), se usan los datos de respaldo.
    console.warn("Cargando proyectos desde respaldo local:", error.message);
    proyectosCargados = PROYECTOS_PREDETERMINADOS;
  }

  // Renderizar segun la pagina actual (reemplaza los skeletons)
  renderizarProyectosDestacados();
  renderizarGaleriaCompleta();
}


/**
 * Renderiza los proyectos destacados en la pagina de inicio (index.html).
 */
function renderizarProyectosDestacados() {
  const contenedor = document.getElementById("contenedor-proyectos-destacados");
  if (!contenedor) return;

  const proyectosDestacados = proyectosCargados.filter(p => p.destacado);
  contenedor.innerHTML = "";

  proyectosDestacados.forEach(proyecto => {
    const cardHTML = crearHTMLTarjetaProyecto(proyecto);
    contenedor.insertAdjacentHTML("beforeend", cardHTML);
  });

  vincularEventosClickModal();
}

/**
 * Renderiza todos los proyectos en la pagina de proyectos (proyectos.html).
 */
function renderizarGaleriaCompleta() {
  const contenedor = document.getElementById("contenedor-proyectos-galeria");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  proyectosCargados.forEach(proyecto => {
    const cardHTML = crearHTMLTarjetaProyecto(proyecto);
    contenedor.insertAdjacentHTML("beforeend", cardHTML);
  });

  vincularEventosClickModal();
}

/**
 * Mapeo de tecnologias a sus respectivos iconos (Devicon y Bootstrap Icons).
 */
const MAPA_ICONOS_TECNOLOGIAS = {
  "Java": '<i class="devicon-java-plain colored"></i>',
  "Spring Boot": '<i class="devicon-spring-original colored"></i>',
  "Spring Security": '<i class="bi bi-shield-lock-fill text-warning"></i>',
  "JWT": '<i class="bi bi-key-fill text-warning"></i>',
  "Spring Data JPA": '<i class="bi bi-database-fill-gear text-info"></i>',
  "Spring Web": '<i class="bi bi-globe text-primary"></i>',
  "MySQL": '<i class="devicon-mysql-original colored"></i>',
  "PostgreSQL": '<i class="devicon-postgresql-plain colored"></i>',
  "Hibernate": '<i class="devicon-hibernate-plain colored"></i>',
  "Flyway": '<i class="bi bi-database-up text-danger"></i>',
  "Docker": '<i class="devicon-docker-plain colored"></i>',
  "Swagger / OpenAPI": '<i class="devicon-openapi-plain colored"></i>',
  "React": '<i class="devicon-react-original colored"></i>',
  "Vite": '<i class="devicon-vitejs-plain colored"></i>',
  "Tailwind CSS": '<i class="devicon-tailwindcss-original colored"></i>',
  "JavaScript": '<i class="devicon-javascript-plain colored"></i>',
  "Git": '<i class="devicon-git-plain colored"></i>',
  "GitHub": '<i class="devicon-github-original"></i>',
  "Arquitectura Hexagonal": '<i class="bi bi-hexagon-fill text-info"></i>',
  "Apache Kafka": '<i class="devicon-apachekafka-original colored"></i>'
};

/**
 * Retorna el markup HTML del icono correspondiente a una tecnologia.
 * @param {string} nombreTecnologia
 * @returns {string}
 */
function obtenerIconoTecnologia(nombreTecnologia) {
  return MAPA_ICONOS_TECNOLOGIAS[nombreTecnologia] || '<i class="bi bi-code-slash text-secondary"></i>';
}

/**
 * Genera el string HTML para una tarjeta de proyecto individual.
 * @param {Object} proyecto - Objeto del proyecto desde el JSON
 * @returns {string} Markup HTML de la tarjeta
 */
function crearHTMLTarjetaProyecto(proyecto) {
  const tagsHTML = proyecto.tags
    .map(tag => `<span class="etiqueta-tecnologia">${obtenerIconoTecnologia(tag)}<span>${escaparHTML(tag)}</span></span>`)
    .join("");

  return `
    <div class="col-12 col-sm-6 col-xl-4 mb-3">
      <article class="tarjeta-proyecto" data-id-proyecto="${escaparHTML(proyecto.id)}" tabindex="0" role="button" aria-label="Ver detalles de ${escaparHTML(proyecto.titulo)}">
        <div class="tarjeta-proyecto-imagen-contenedor">
          <img src="${escaparHTML(proyecto.imagen)}"
               alt="Captura del proyecto ${escaparHTML(proyecto.titulo)}"
               class="tarjeta-proyecto-imagen"
               loading="lazy"
               onerror="this.onerror=null;this.src='${BASE_URL}assets/img/img-placeholder.svg';this.classList.add('img-fallback-proyecto');">
        </div>
        <div class="tarjeta-proyecto-cuerpo">
          <div class="tarjeta-proyecto-icono-titulo">
            <div class="tarjeta-proyecto-icono">
              <i class="bi bi-layers-fill"></i>
            </div>
            <div>
              <h3 class="tarjeta-proyecto-titulo">${escaparHTML(proyecto.titulo)}</h3>
              <small class="texto-secundario">${escaparHTML(proyecto.subtitulo)}</small>
            </div>
          </div>
          <p class="tarjeta-proyecto-descripcion">${escaparHTML(proyecto.descripcionCorta)}</p>
          <div class="tarjeta-proyecto-pie">
            <div class="tarjeta-proyecto-tags">
              ${tagsHTML}
            </div>
            <div class="tarjeta-proyecto-flecha" aria-hidden="true">
              <i class="bi bi-arrow-right"></i>
            </div>
          </div>
        </div>
      </article>
    </div>
  `;
}

/**
 * Asocia el evento de clic y pulsacion de teclado para abrir el modal.
 */
function vincularEventosClickModal() {
  const tarjetas = document.querySelectorAll(".tarjeta-proyecto");
  tarjetas.forEach(tarjeta => {
    const id = tarjeta.getAttribute("data-id-proyecto");

    // Clic con mouse o tap
    tarjeta.addEventListener("click", () => {
      abrirModalEspecificaciones(id);
    });

    // Accesibilidad con teclado
    tarjeta.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirModalEspecificaciones(id);
      }
    });
  });
}

/**
 * Construye el HTML del carrusel de imagenes para el modal.
 * Si el proyecto tiene 1 sola imagen, muestra imagen fija sin controles.
 * @param {Object} proyecto
 * @returns {string} HTML del carrusel
 */
function construirCarruselImagenes(proyecto) {
  // Reunir imagenes: preferir array "imagenes", si no existe usar "imagen" individual
  const listaImagenes = (proyecto.imagenes && proyecto.imagenes.length > 0)
    ? proyecto.imagenes
    : [proyecto.imagen];

  // Con una sola imagen no se necesitan controles
  if (listaImagenes.length === 1) {
    return `
      <div class="modal-proyecto-carrusel">
        <img src="${escaparHTML(listaImagenes[0])}"
             alt="Vista del proyecto ${escaparHTML(proyecto.titulo)}"
             class="modal-proyecto-carrusel-img-unica"
             onerror="this.onerror=null;this.src='${BASE_URL}assets/img/img-placeholder.svg';this.classList.add('img-fallback-proyecto');">
      </div>
    `;
  }

  // Indicadores de puntos
  const indicadores = listaImagenes.map((_, i) => `
    <button type="button"
            data-bs-target="#carruselImagenesProyecto"
            data-bs-slide-to="${i}"
            ${i === 0 ? 'class="active" aria-current="true"' : ''}
            aria-label="Imagen ${i + 1}">
    </button>
  `).join("");

  // Items del carrusel con fallback en caso de imagen rota
  const items = listaImagenes.map((src, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${escaparHTML(src)}"
           alt="Vista ${i + 1} del proyecto ${escaparHTML(proyecto.titulo)}"
           class="modal-proyecto-carrusel-img"
           onerror="this.onerror=null;this.src='${BASE_URL}assets/img/img-placeholder.svg';this.classList.add('img-fallback-proyecto');">
    </div>
  `).join("");

  return `
    <div class="modal-proyecto-carrusel">
      <div id="carruselImagenesProyecto" class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators modal-carrusel-indicadores">
          ${indicadores}
        </div>
        <div class="carousel-inner">
          ${items}
        </div>
        <button class="carousel-control-prev modal-carrusel-control" type="button"
                data-bs-target="#carruselImagenesProyecto" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next modal-carrusel-control" type="button"
                data-bs-target="#carruselImagenesProyecto" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Carga la informacion tecnica completa del proyecto y despliega el modal de Bootstrap.
 * @param {string} idProyecto - Identificador del proyecto seleccionado
 */
function abrirModalEspecificaciones(idProyecto) {
  const proyecto = proyectosCargados.find(p => p.id === idProyecto);
  if (!proyecto) return;

  const elementoModal = document.getElementById("modalDetalleProyecto");
  if (!elementoModal) return;

  // Destruir instancia previa del carrusel si existe (evita conflictos al cambiar de proyecto)
  const carruselAnterior = document.getElementById("carruselImagenesProyecto");
  if (carruselAnterior && window.bootstrap && window.bootstrap.Carousel) {
    const instanciaCarruselAnterior = bootstrap.Carousel.getInstance(carruselAnterior);
    if (instanciaCarruselAnterior) instanciaCarruselAnterior.dispose();
  }

  // Mostrar skeleton del carrusel mientras se construye el HTML
  const contenedorCarrusel = document.getElementById("modalProyectoCarrusel");
  if (contenedorCarrusel) {
    contenedorCarrusel.innerHTML = '<div class="carrusel-skeleton" aria-hidden="true"></div>';
    // Usar requestAnimationFrame para que el skeleton se pinte antes del carrusel real
    requestAnimationFrame(() => {
      contenedorCarrusel.innerHTML = construirCarruselImagenes(proyecto);
    });
  }

  // Actualizar campos de texto del modal
  document.getElementById("modalProyectoTitulo").textContent = proyecto.titulo;
  document.getElementById("modalProyectoSubtitulo").textContent = proyecto.subtitulo;
  document.getElementById("modalProyectoPeriodo").textContent = proyecto.periodo;
  document.getElementById("modalProyectoRol").textContent = proyecto.rol;
  document.getElementById("modalProyectoDescripcion").textContent = proyecto.descripcionCompleta;

  // Lista de caracteristicas clave del CV
  const listaCaracteristicas = document.getElementById("modalProyectoCaracteristicas");
  listaCaracteristicas.innerHTML = "";
  if (proyecto.caracteristicasClave && proyecto.caracteristicasClave.length > 0) {
    proyecto.caracteristicasClave.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listaCaracteristicas.appendChild(li);
    });
  }

  // Badges del Stack Tecnologico
  const contenedorStack = document.getElementById("modalProyectoStack");
  contenedorStack.innerHTML = "";
  if (proyecto.stack) {
    proyecto.stack.forEach(tech => {
      const span = document.createElement("span");
      span.className = "etiqueta-tecnologia me-1 mb-2";
      span.innerHTML = `${obtenerIconoTecnologia(tech)}<span>${escaparHTML(tech)}</span>`;
      contenedorStack.appendChild(span);
    });
  }

  // Enlace al Repositorio
  const botonRepo = document.getElementById("modalProyectoBtnRepo");
  if (botonRepo) {
    if (proyecto.enlaceRepositorio && proyecto.enlaceRepositorio !== "#") {
      botonRepo.href = proyecto.enlaceRepositorio;
      botonRepo.style.display = "inline-flex";
    } else {
      botonRepo.style.display = "none";
    }
  }

  // Mostrar modal con Bootstrap 5
  if (window.bootstrap && window.bootstrap.Modal) {
    const instanciaModal = bootstrap.Modal.getOrCreateInstance(elementoModal);
    instanciaModal.show();
  }
}

/**
 * Mensaje de respaldo en caso de fallo al leer proyectos.json.
 */
function mostrarErrorCarga() {
  const contenedores = [
    document.getElementById("contenedor-proyectos-destacados"),
    document.getElementById("contenedor-proyectos-galeria")
  ];

  contenedores.forEach(c => {
    if (c) {
      c.innerHTML = `
        <div class="col-12 text-center py-4">
          <p class="texto-secundario">No se pudieron cargar los proyectos en este momento. Por favor recarga la pagina.</p>
        </div>
      `;
    }
  });
}

/**
 * Funcion utilitaria para sanitizar texto contra inyecciones HTML.
 * @param {string} str - Cadena de texto a escapar
 * @returns {string} Cadena sanitizada
 */
function escaparHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
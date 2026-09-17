
// Constantes de Configuración Global (Editar aquí para actualizar enlaces)
const ENLACES_REDES = {
  // Placeholder editable para el perfil de GitHub
  github: "https://github.com/CamiloBermeo",
  // Placeholder editable para el perfil de LinkedIn
  linkedin: "https://www.linkedin.com/in/camilo-bermeo-programador-java/",
  // Correo electrónico de contacto profesional
  email: "bermeocamilo12@gmail.com",
  // Enlace directo de chat en WhatsApp (formato wa.me)
  whatsapp: "https://wa.me/573226733253"
};

// Ruta relativa del archivo PDF de la hoja de vida para descarga directa
const ARCHIVO_CV = "assets/cv/cv-juan-camilo-bermeo.pdf";

// --------------------------------------------------------------------------
// Inicialización al cargar el DOM
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  aplicarEnlacesConfigurados();
  configurarDescargaCV();
  configurarEfectoScrollNavbar();
  actualizarAnioCopyright();
});

/**
 * Asigna de forma reactiva las URLs de redes sociales y contacto a los
 * elementos del DOM que posean el atributo data-red.
 */
function aplicarEnlacesConfigurados() {
  // Enlaces de GitHub
  document.querySelectorAll('[data-red="github"]').forEach(elemento => {
    elemento.setAttribute("href", ENLACES_REDES.github);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener noreferrer");
  });

  // Enlaces de LinkedIn
  document.querySelectorAll('[data-red="linkedin"]').forEach(elemento => {
    elemento.setAttribute("href", ENLACES_REDES.linkedin);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener noreferrer");
  });

  // Enlaces de Correo Electrónico (mailto)
  document.querySelectorAll('[data-red="email"]').forEach(elemento => {
    elemento.setAttribute("href", `mailto:${ENLACES_REDES.email}`);
  });

  // Textos con el correo electrónico visible
  document.querySelectorAll('[data-texto="email"]').forEach(elemento => {
    elemento.textContent = ENLACES_REDES.email;
  });

  // Enlaces de WhatsApp
  document.querySelectorAll('[data-red="whatsapp"]').forEach(elemento => {
    elemento.setAttribute("href", ENLACES_REDES.whatsapp);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener noreferrer");
  });
}

/**
 * Configura los botones de descarga de CV con la ruta del archivo y atributo download.
 */
function configurarDescargaCV() {
  const botonesCV = document.querySelectorAll("[data-cv-descarga]");
  botonesCV.forEach(boton => {
    boton.setAttribute("href", ARCHIVO_CV);
    boton.setAttribute("download", "CV-Juan-Camilo-Bermeo.pdf");
  });
}

/**
 * Añade una clase con sombra y fondo más opaco a la barra de navegación al hacer scroll.
 */
function configurarEfectoScrollNavbar() {
  const navbar = document.querySelector(".barra-navegacion");
  if (!navbar) return;

  const verificarScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("con-desplazamiento");
    } else {
      navbar.classList.remove("con-desplazamiento");
    }
  };

  window.addEventListener("scroll", verificarScroll, { passive: true });
  verificarScroll();
}

/**
 * Actualiza automáticamente el año en el pie de página para vigencia del copyright.
 */
function actualizarAnioCopyright() {
  const elementoAnio = document.getElementById("anio-actual");
  if (elementoAnio) {
    elementoAnio.textContent = new Date().getFullYear();
  }
}

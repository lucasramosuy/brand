// Kit de tema claro/oscuro. Fuente: lucasramosuy/brand/kit/theme.js.
// Cada consumidor lo copia localmente: sin CDN y sin pedir datos a terceros.
// El tema vive en [data-tema] del <html>; cada proyecto define sus tokens en
// `:root[data-tema="oscuro"]`. Este módulo no trae CSS.
(function () {
  "use strict";

  let actual = null;
  let botonActual = null;

  function normalizar(op) {
    const o = op || {};
    if (!o.clave) throw new Error("KitTema necesita { clave } de almacenamiento.");
    return {
      clave: o.clave,
      colores: o.colores || null,
      evento: o.evento || "kit-theme-change",
      meta: o.meta || 'meta[name="theme-color"]',
      etiquetas: o.etiquetas || {
        claro: "Activar tema oscuro",
        oscuro: "Activar tema claro",
      },
    };
  }

  function guardado(clave) {
    try { return localStorage.getItem(clave); } catch { return null; }
  }

  function persistir(clave, tema) {
    try { localStorage.setItem(clave, tema); } catch { /* Sin storage, dura esta pestaña. */ }
  }

  function avisar(op) {
    document.dispatchEvent(new Event(op.evento));
  }

  function sincronizarBoton(tema, op) {
    if (!botonActual) return;
    botonActual.setAttribute("aria-pressed", String(tema === "oscuro"));
    botonActual.setAttribute("aria-label", op.etiquetas[tema] || op.etiquetas.claro);
  }

  function aplicar(tema, op) {
    const o = op || actual;
    if (!o) throw new Error("KitTema.aplicar: llamá antes a inicial().");
    document.documentElement.dataset.tema = tema;
    if (o.colores) {
      const meta = document.querySelector(o.meta);
      if (meta) meta.setAttribute("content", o.colores[tema] || o.colores.claro);
    }
    sincronizarBoton(tema, o);
  }

  /* Resuelve el tema inicial (preferencia guardada, si no la del sistema),
     lo aplica y queda escuchando cambios del sistema. Pensado para correr
     antes del primer pintado. Devuelve el tema aplicado. */
  function inicial(op) {
    actual = normalizar(op);
    const media = matchMedia("(prefers-color-scheme: dark)");
    const pre = guardado(actual.clave);
    const tema = pre === "claro" || pre === "oscuro" ? pre : media.matches ? "oscuro" : "claro";
    aplicar(tema);
    media.addEventListener("change", () => {
      const g = guardado(actual.clave);
      if (g !== "claro" && g !== "oscuro") {
        aplicar(media.matches ? "oscuro" : "claro");
        avisar(actual);
      }
    });
    return tema;
  }

  /* Cablea el botón: estado aria, click para alternar, persistencia y evento
     de cambio. Acepta el elemento o un selector. Si el documento sigue
     cargando, espera al DOMContentLoaded. */
  function montar(boton, op) {
    if (op) actual = normalizar(op);
    if (!actual) throw new Error("KitTema.montar: llamá antes a inicial().");
    const cablear = () => {
      botonActual = typeof boton === "string" ? document.querySelector(boton) : boton;
      aplicar(document.documentElement.dataset.tema || "claro");
      if (!botonActual) return;
      botonActual.addEventListener("click", () => {
        const nuevo = document.documentElement.dataset.tema === "oscuro" ? "claro" : "oscuro";
        aplicar(nuevo);
        persistir(actual.clave, nuevo);
        avisar(actual);
      });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", cablear);
    else cablear();
  }

  /* Botón 44x44 para consumidores sin SSR: hay que insertarlo y montarlo. */
  function crearBoton() {
    const b = document.createElement("button");
    b.className = "tema-pill";
    b.id = "btn-tema";
    b.type = "button";
    b.setAttribute("aria-label", "Activar tema oscuro");
    b.setAttribute("aria-pressed", "false");
    const sol = document.createElement("span");
    sol.className = "t-sol";
    sol.setAttribute("aria-hidden", "true");
    sol.textContent = "☼";
    const luna = document.createElement("span");
    luna.className = "t-luna";
    luna.setAttribute("aria-hidden", "true");
    luna.textContent = "☾";
    b.append(sol, luna);
    return b;
  }

  function tema() {
    return document.documentElement.dataset.tema;
  }

  globalThis.KitTema = { inicial, montar, aplicar, crearBoton, tema };
})();

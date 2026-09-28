// Kit de utilidades DOM. Fuente: lucasramosuy/brand/kit/dom.js.
// Cada consumidor lo copia localmente: sin CDN y sin pedir datos a terceros.
// Helpers chicos que estaban repetidos idénticos en varios proyectos:
// escapar HTML, buscar por id con error claro y descargar JSON/Blob.
(function () {
  "use strict";

  const ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  // Texto seguro para interpolar en innerHTML (contenido o atributos).
  function esc(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);
  }

  // getElementById que falla en voz alta: un id roto se nota al instante.
  function $(id, base) {
    const el = (base || document).getElementById(id);
    if (!el) throw new Error("#" + id + " no encontrado");
    return el;
  }

  // Descarga un Blob con nombre de archivo y no deja la URL colgada.
  function descargarBlob(blob, nombre) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  }

  // JSON prolijo (2 espacios, salto de línea final), listo para commitear.
  function descargarJSON(datos, nombre) {
    const blob = new Blob([JSON.stringify(datos, null, 2) + "\n"], {
      type: "application/json",
    });
    descargarBlob(blob, nombre);
  }

  globalThis.KitDom = { esc, $, descargarBlob, descargarJSON };
})();

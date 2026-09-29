// Rail lateral del kit. Fuente: lucasramosuy/brand/kit/kit-rail.js.
// Variante de encabezado para sitios con columna lateral propia
// (referencia: qr-studio): logo con punto de acento, eyebrow, contenido
// sloteado (título, intro, pasos) y pie editorial pegado abajo.
// Se sirve desde lucasramos.uy/brand/kit/kit-rail.js:
// <script src="/brand/kit/kit-rail.js" defer></script>
// Uso:
//   <kit-rail producto="qr" acento="#70eac0" eyebrow="ESTUDIO DE CÓDIGOS / 001"
//     pie="DISEÑADO EN TU NAVEGADOR|NI CUENTA, NI SERVIDOR, NI COSTO.">
//     <h1>...</h1><p>...</p><div class="steps">...</div>
//   </kit-rail>
// Atributos: producto, href, titulo (title del logo), acento (punto), tinta,
// fondo, linea (borde derecho), eyebrow, eyebrow-color, pie (líneas separadas
// con |), pie-color.
// El contenido sloteado queda en el DOM de la página y lo estila el CSS del
// sitio (kit-rail h1, kit-rail .steps, ...); eyebrow y pie se exponen como
// parts para ajustes o para ocultarlos en mobile.
// Parts: rail, logo, punto, eyebrow, pie.
(function () {
  "use strict";

  const css = `
    :host{display:flex}
    .rail{flex:1;background:var(--kr-fondo,#10171d);
      border-right:1px solid var(--kr-linea,#243138);
      padding:26px 22px;display:flex;flex-direction:column}
    .logo{display:inline-block;text-decoration:none;
      color:var(--kr-tinta,inherit);
      font-size:30px;font-weight:700;letter-spacing:-2px}
    .punto{font-style:normal;color:var(--kr-acento,#70eac0)}
    .eyebrow{margin:56px 0 16px;font-family:'DM Mono',monospace;
      font-size:10px;letter-spacing:.1em;text-transform:uppercase;
      color:var(--kr-eyebrow-color,#849c9b)}
    .pie{margin-top:auto;color:var(--kr-pie-color,#6a817e);
      font-family:'DM Mono',monospace;font-size:10px;line-height:1.7}
  `;

  class KitRail extends HTMLElement {
    static get observedAttributes() {
      return ["producto", "href", "titulo", "acento", "tinta", "fondo",
        "linea", "eyebrow", "eyebrow-color", "pie", "pie-color"];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const producto = this.getAttribute("producto") || "";
      const href = this.getAttribute("href") || "/";
      const titulo = this.getAttribute("titulo");
      const eyebrow = this.getAttribute("eyebrow") || "";
      const pie = this.getAttribute("pie") || "";
      for (const attr of ["acento", "tinta", "fondo", "linea",
        "eyebrow-color", "pie-color"]) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty("--kr-" + attr, v);
      }
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML =
        `<style>${css}</style><aside class="rail" part="rail">` +
        `<a class="logo" part="logo" href="${href}"` +
        (titulo ? ` title="${titulo}"` : "") +
        `>${producto}<em class="punto" part="punto">.</em></a>` +
        (eyebrow ? `<div class="eyebrow" part="eyebrow">${eyebrow}</div>` : "") +
        `<slot></slot>` +
        (pie ? `<footer class="pie" part="pie">${pie.split("|").join("<br>")}</footer>` : "") +
        `</aside>`;
    }
  }
  if (!customElements.get("kit-rail")) customElements.define("kit-rail", KitRail);
})();

// Masthead editorial del kit. Fuente: lucasramosuy/brand/kit/kit-masthead.js.
// Variante de encabezado para sitios con cabecera tipográfica propia
// (referencia: fotograma): marca en dos pesos con punto de acento, sin barra,
// y una meta tipográfica a la derecha.
// Se sirve desde lucasramos.uy/brand/kit/kit-masthead.js:
// <script src="/brand/kit/kit-masthead.js" defer></script>
// Uso:
//   <kit-masthead producto="foto" producto2="grama" acento="#367263"
//     href="https://lucasramos.uy/" etiqueta="Fotograma, ir a lucasramos.uy">
//     <span slot="meta" id="issue">UNA FOTO · UNA PALABRA</span>
//   </kit-masthead>
// Atributos: producto, producto2 (segundo tramo, peso 400; opcional), href,
// etiqueta (aria-label del enlace), titulo (title del enlace), acento (punto),
// tinta, meta-color, meta-font (familia; por defecto 'DM Mono').
// La meta va sloteada (no en el shadow) para que el sitio pueda leerla y
// actualizarla por id. Sin meta sloteada queda solo la marca (sirve también
// como wordmark de pie).
// Parts: masthead, brand, brand2, punto.
(function () {
  "use strict";

  const css = `
    :host{display:block}
    .masthead{display:flex;justify-content:space-between;align-items:center}
    .brand{color:var(--km-tinta,#202522);text-decoration:none;
      font-size:31px;font-weight:700;letter-spacing:-.085em;line-height:1}
    .brand2{font-weight:400}
    .punto{color:var(--km-acento,#367263);font-style:normal}
    .brand:focus-visible{outline:2px solid var(--km-acento,#367263);outline-offset:3px;border-radius:4px}
    @media(pointer:coarse){.brand{display:inline-flex;align-items:center;min-height:44px}}
    ::slotted([slot=meta]){font-size:11px;letter-spacing:.1em;
      font-family:var(--km-meta-font,'DM Mono',monospace);
      color:var(--km-meta-color,#617168)}
  `;

  class KitMasthead extends HTMLElement {
    static get observedAttributes() {
      return ["producto", "producto2", "href", "etiqueta", "titulo",
        "acento", "tinta", "meta-color", "meta-font"];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const producto = this.getAttribute("producto") || "";
      const producto2 = this.getAttribute("producto2") || "";
      const href = this.getAttribute("href") || "/";
      const etiqueta = this.getAttribute("etiqueta");
      const titulo = this.getAttribute("titulo");
      for (const attr of ["acento", "tinta", "meta-color", "meta-font"]) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty("--km-" + attr, v);
      }
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML =
        `<style>${css}</style><div class="masthead" part="masthead">` +
        `<a class="brand" part="brand" href="${href}"` +
        (etiqueta ? ` aria-label="${etiqueta}"` : "") +
        (titulo ? ` title="${titulo}"` : "") +
        `>${producto}` +
        (producto2 ? `<span class="brand2" part="brand2">${producto2}</span>` : "") +
        `<i class="punto" part="punto">.</i></a>` +
        `<slot name="meta"></slot></div>`;
    }
  }
  if (!customElements.get("kit-masthead")) customElements.define("kit-masthead", KitMasthead);
})();

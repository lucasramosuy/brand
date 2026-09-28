// Header compartido del kit. Fuente: lucasramosuy/brand/kit/kit-header.js.
// Se sirve desde lucasramos.uy/brand/kit/kit-header.js (como las fuentes):
// <script src="/brand/kit/kit-header.js" defer></script>
// Uso:
//   <kit-header producto="salida" acento="#a5674d" meta="TALLER DE CLASE / 001">
//     <button slot="actions" class="header-action" onclick="window.print()">Imprimir hoja ↗</button>
//   </kit-header>
// Atributos: producto (wordmark, el punto va solo), acento (color del punto),
// href (destino del wordmark, por defecto la raíz), meta (folio mono opcional),
// alto, fondo, linea, tinta, meta-color. Con `pill` el wordmark no enlaza y
// muestra la pill "lucasramos.uy ↗" a la derecha. El contenido sloteado en
// `actions` se maqueta a la derecha y lo estila cada sitio.
(function () {
  "use strict";

  const css = `
    :host{display:block}
    header{height:var(--kh-alto,72px);background:var(--kh-fondo,#f3f1e9);
      border-bottom:1px solid var(--kh-linea,#c9cec6);display:flex;
      align-items:center;gap:22px;padding:0 28px;color:var(--kh-tinta,#222721)}
    .brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:28px;
      letter-spacing:-2px;text-decoration:none;color:inherit}
    .brand .punto{color:var(--kh-acento,inherit)}
    .meta{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.09em;
      color:var(--kh-meta-color,#687168);margin-left:auto;text-transform:uppercase}
    .pill{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.09em;
      color:var(--kh-meta-color,#687168);margin-left:auto;
      border:1px solid var(--kh-linea,#c9cec6);border-radius:999px;padding:6px 10px}
    ::slotted([slot="actions"]){margin-left:auto}
    @media(min-width:561px){
      .meta + ::slotted([slot="actions"]){margin-left:0}
    }
    @media(max-width:560px){
      header{padding:0 16px}
      .meta{display:none}
    }
    @media print{:host{display:none!important}}
  `;

  class KitHeader extends HTMLElement {
    static get observedAttributes() {
      return ["producto", "acento", "href", "meta", "alto", "fondo", "linea", "tinta", "meta-color", "pill"];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const producto = this.getAttribute("producto") || "";
      const href = this.getAttribute("href") || "https://lucasramos.uy/";
      const meta = this.getAttribute("meta") || "";
      const pill = this.hasAttribute("pill");
      for (const attr of ["alto", "fondo", "linea", "tinta", "meta-color", "acento"]) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty("--kh-" + attr, attr === "alto" && /^\d+$/.test(v) ? v + "px" : v);
      }
      const wordmark = pill
        ? `<span class="brand">${producto}<span class="punto">.</span></span>`
        : `<a class="brand" href="${href}" title="lucasramos.uy">${producto}<span class="punto">.</span></a>`;
      const right = pill
        ? `<span class="pill">lucasramos.uy ↗</span>`
        : (meta ? `<span class="meta">${meta}</span>` : "");
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML =
        `<style>${css}</style><header>${wordmark}${right}<slot name="actions"></slot></header>`;
    }
  }
  if (!customElements.get("kit-header")) customElements.define("kit-header", KitHeader);
})();

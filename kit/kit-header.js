// Header compartido del kit. Fuente: lucasramosuy/brand/kit/kit-header.js.
// Se sirve desde lucasramos.uy/brand/kit/kit-header.js (como las fuentes):
// <script src="/brand/kit/kit-header.js" defer></script>
// Uso:
//   <kit-header producto="salida" acento="#a5674d" meta="TALLER DE CLASE / 001">
//     <button slot="actions" class="header-action" onclick="window.print()">Imprimir hoja ↗</button>
//   </kit-header>
// Atributos: producto (wordmark, el punto va solo), acento (color del punto),
// href (destino del wordmark, por defecto la raíz), meta (folio mono opcional),
// alto, fondo, linea, tinta, meta-color, sufijo (tag mono junto al wordmark,
// ej. ESTUDIO). Con `pill` el wordmark no enlaza y muestra la pill
// "lucasramos.uy ↗" a la derecha. El contenido sloteado en `actions` se
// maqueta a la derecha y lo estila cada sitio.
// Táctil (pointer:coarse): wordmark y acciones sloteadas con 44px de alto de
// toque, sin cambiar el dibujo. Foco visible con el acento del producto.
// Tema oscuro: sin atributos de color, el header toma los tokens --kit-* de
// kit-base.css (activos con <html data-tema="oscuro">). Un atributo explícito
// (fondo, tinta...) gana sobre el token: un sitio que adopta el modo oscuro
// pasa var(--kit-fondo), no un hex fijo.
// Parts: header, brand, meta, pill, sufijo. Con ::part el sitio ajusta lo
// específico (alto responsive, padding, tracking del wordmark) sin tocar el
// componente: @media(max-width:800px){kit-header::part(header){height:62px}}
(function () {
  "use strict";

  const css = `
    :host{display:block}
    header{height:var(--kh-alto,72px);background:var(--kh-fondo,var(--kit-fondo,#f3f1e9));
      border-bottom:1px solid var(--kh-linea,var(--kit-linea,#c9cec6));display:flex;
      align-items:center;gap:22px;padding:0 28px;color:var(--kh-tinta,var(--kit-tinta,#222721))}
    .brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:28px;
      letter-spacing:-2px;text-decoration:none;color:inherit}
    .brand .punto{color:var(--kh-acento,inherit)}
    .meta{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.09em;
      color:var(--kh-meta-color,var(--kit-meta,#687168));margin-left:auto;text-transform:uppercase}
    .pill{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.09em;
      color:var(--kh-meta-color,var(--kit-meta,#687168));margin-left:auto;
      border:1px solid var(--kh-linea,var(--kit-linea,#c9cec6));border-radius:999px;padding:6px 10px}
    .sufijo{font-family:'DM Mono',monospace;font-weight:400;font-size:9px;
      letter-spacing:2px;color:var(--kh-meta-color,var(--kit-meta,#687168));margin-left:12px}
    ::slotted([slot="actions"]){margin-left:auto}
    @media(min-width:561px){
      .meta + ::slotted([slot="actions"]){margin-left:0}
    }
    @media(max-width:560px){
      header{padding:0 16px}
      .meta{display:none}
    }
    .brand:focus-visible,.pill:focus-visible{outline:2px solid var(--kh-acento,currentColor);
      outline-offset:3px;border-radius:4px}
    @media(pointer:coarse){
      .brand{display:inline-flex;align-items:center;min-height:44px}
      a.pill{display:inline-flex;align-items:center;min-height:44px}
      ::slotted([slot="actions"]){min-height:44px}
    }
    @media print{:host{display:none!important}}
  `;

  class KitHeader extends HTMLElement {
    static get observedAttributes() {
      return ["producto", "acento", "href", "meta", "alto", "fondo", "linea", "tinta", "meta-color", "pill", "sufijo"];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const producto = this.getAttribute("producto") || "";
      const href = this.getAttribute("href") || "https://lucasramos.uy/";
      const meta = this.getAttribute("meta") || "";
      const pill = this.hasAttribute("pill");
      const sufijo = this.getAttribute("sufijo") || "";
      for (const attr of ["alto", "fondo", "linea", "tinta", "meta-color", "acento"]) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty("--kh-" + attr, attr === "alto" && /^\d+$/.test(v) ? v + "px" : v);
      }
      const suf = sufijo ? `<small class="sufijo" part="sufijo">${sufijo}</small>` : "";
      const wordmark = pill
        ? `<span class="brand" part="brand">${producto}<span class="punto">.</span>${suf}</span>`
        : `<a class="brand" part="brand" href="${href}" title="Inicio de ${producto}">${producto}<span class="punto">.</span>${suf}</a>`;
      const right = pill
        ? `<span class="pill" part="pill">lucasramos.uy ↗</span>`
        : (meta ? `<span class="meta" part="meta">${meta}</span>` : "");
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML =
        `<style>${css}</style><header part="header">${wordmark}${right}<slot name="actions"></slot></header>`;
    }
  }
  if (!customElements.get("kit-header")) customElements.define("kit-header", KitHeader);
})();

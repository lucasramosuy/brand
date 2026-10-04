// Footer compartido del kit. Fuente: lucasramosuy/brand/kit/kit-footer.js.
// Se sirve desde lucasramos.uy/brand/kit/kit-footer.js (como las fuentes):
// <script src="/brand/kit/kit-footer.js" defer></script>
// Uso mínimo (© año actual + Contacto y GitHub):
//   <kit-footer></kit-footer>
// Atributos: anio (por defecto el año en curso), texto (reemplaza el ©),
// links ("Contacto=/contacto/,GitHub=https://github.com/lucasramosuy"),
// fondo, linea, tinta, hover. Se oculta solo al imprimir.
// Parts: footer, texto, links (para ajustar padding, tipografía o layout
// desde el CSS del sitio).
(function () {
  "use strict";

  const css = `
    :host{display:block}
    footer{border-top:1px solid var(--kf-linea,#c9cec6);
      background:var(--kf-fondo,#f3f1e9);color:var(--kf-tinta,#687168);
      display:flex;justify-content:space-between;align-items:center;gap:20px;
      padding:22px max(28px,calc((100vw - 1080px)/2));
      font-family:'DM Mono',monospace;font-size:12px}
    nav{display:flex;gap:22px}
    a{color:inherit;text-decoration:none}
    @media(hover:hover){a:hover{color:var(--kf-hover,#293a32)}}
    a:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:4px}
    @media(pointer:coarse){
      nav{gap:14px}
      a{display:inline-flex;align-items:center;min-height:44px;padding:0 4px}
    }
    @media(max-width:560px){footer{padding:20px 18px}}
    @media print{:host{display:none!important}}
  `;

  function parseLinks(valor) {
    return valor.split(",").map((par) => {
      const i = par.indexOf("=");
      return { label: par.slice(0, i).trim(), url: par.slice(i + 1).trim() };
    }).filter((l) => l.label && l.url);
  }

  class KitFooter extends HTMLElement {
    static get observedAttributes() {
      return ["anio", "texto", "links", "fondo", "linea", "tinta", "hover"];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const anio = this.getAttribute("anio") || String(new Date().getFullYear());
      const texto = this.getAttribute("texto") || `© ${anio}`;
      const links = parseLinks(this.getAttribute("links") ||
        "Contacto=/contacto/,GitHub=https://github.com/lucasramosuy");
      for (const attr of ["fondo", "linea", "tinta", "hover"]) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty("--kf-" + attr, v);
      }
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML =
        `<style>${css}</style><footer part="footer"><span part="texto">${texto}</span><nav part="links">` +
        links.map((l) => `<a href="${l.url}">${l.label}</a>`).join("") +
        `</nav></footer>`;
    }
  }
  if (!customElements.get("kit-footer")) customElements.define("kit-footer", KitFooter);
})();

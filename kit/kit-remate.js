// Remate editorial compartido del kit. Fuente: lucasramosuy/brand/kit/kit-remate.js.
// Se sirve desde lucasramos.uy/brand/kit/kit-remate.js (como kit-footer.js):
// <script src="/brand/kit/kit-remate.js" defer></script>
// Es el cierre grande de las páginas de identidad personal (raíz, /contacto):
// "lucas." en tinta con punto coral. NO reemplaza a kit-footer, que sigue
// siendo el pie compacto de las herramientas.
// Uso mínimo (copy por defecto de la raíz):
//   <kit-remate></kit-remate>
// Atributos de copy (todos opcionales; "|" separa líneas):
//   eyebrow       "Sigamos la conversación"
//   titulo        "Una idea.|Un buen comienzo."  (la 2.ª línea va en serif)
//   descripcion   "Si encontraste un error o tenés una idea,|me podés escribir."
//   cta           "Hablemos" (texto del enlace de contacto; "no" lo omite)
//   cta-href      "/contacto/"
//   palabra       "lucas" (el punto coral se agrega solo)
//   tagline       "Profesorado, clases y código"
//   firma         "Hecho en Uruguay|Con tiempo y por gusto"
//   texto         "© <año> Lucas" (anio cambia el año; sufijo agrega " · <sufijo>")
//   sufijo        "Profe" -> "© <año> Lucas · Profe", con el año automático
//   links         "Contacto=/contacto/,GitHub=https://github.com/lucasramosuy"
//   arriba        "Volver arriba ↑" ("no" lo omite); arriba-href "#inicio"
//   variante      "compacta": franja baja para herramientas y estudios (sin titular,
//                 CTA ni palabra gigante). Muestra "lucas." chico (enlaza a
//                 palabra-href, por defecto "/links/"), firma ("Hecho en Uruguay"),
//                 el © y los links (por defecto solo Contacto). Toma la paleta del
//                 sitio por los atributos de color.
// Color: atributos papel, tinta, punto, meta, linea, hover, o las variables CSS
// --kr-papel, --kr-tinta, --kr-punto, --kr-meta, --kr-linea, --kr-hover en el sitio.
// Movimiento: la textura de tinta se anima solo en escritorio con puntero fino,
// a la vista, con la pestaña visible y sin prefers-reduced-motion; en táctil y
// con movimiento reducido queda estática. Se oculta solo al imprimir.
// Requiere que la página cargue Space Grotesk, DM Mono e Instrument Serif
// (kit-fonts.css + la serif de la raíz); sin ellas cae al genérico.
// Parts: remate, titulo, palabra, pie (en la compacta: remate, palabra, pie).
(function () {
  "use strict";

  const css = `
    :host{display:block;position:relative;z-index:1;line-height:1.6;-webkit-font-smoothing:antialiased}
    *{box-sizing:border-box;margin:0;padding:0}
    a{color:inherit;text-decoration:none}
    .remate{background:var(--kr-papel,#efede6);color:var(--kr-tinta,#242a26);position:relative;margin-top:88px;padding:52px 0 0;font-family:'Space Grotesk',sans-serif}
    .wrap{max-width:1440px;margin:auto;padding:0 64px}
    .heading{display:grid;grid-template-columns:1fr 1fr;gap:40px}
    .label,.meta,.copy{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--kr-meta,#667063)}
    .titulo{font-size:57px;line-height:1.05;letter-spacing:-2px;margin-top:22px;font-weight:700}
    .titulo em{font-family:'Instrument Serif',serif;font-style:normal;font-weight:400}
    .descripcion{font-size:17px;line-height:1.65;margin-top:18px;color:#596355;max-width:360px}
    .contacto{align-self:center;justify-self:end;display:flex;align-items:center;gap:24px;font-size:19px;border-bottom:1px solid #687063;padding:12px 0;min-height:44px}
    .flecha{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.4}
    .palabra{display:flex;align-items:baseline;font-family:'Space Grotesk',sans-serif;font-size:clamp(170px,36.1vw,520px);font-weight:700;letter-spacing:-.073em;line-height:1.06;margin-top:38px;white-space:nowrap}
    .tinta{color:var(--kr-tinta,#242a26);background-image:repeating-radial-gradient(ellipse at 22% 180%,#202723 0%,#242b26 4.5%,#303833 4.9%,#515953 5.02%,#333c35 5.18%,#222925 5.6%,#252c27 10%);background-size:140% 190%;background-position:0% 40%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:tinta 55s ease-in-out infinite alternate;animation-play-state:paused}
    .palabra .punto{color:var(--kr-punto,#bb5943);-webkit-text-fill-color:var(--kr-punto,#bb5943)}
    .remate[data-en-vista="true"] .tinta{animation-play-state:running}
    @keyframes tinta{to{background-position:50% 70%;background-size:155% 205%}}
    .meta{display:flex;justify-content:space-between;gap:24px;margin-top:25px;line-height:1.6}
    .meta span:last-child{text-align:right}
    footer{border-top:1px solid var(--kr-linea,#bfc3b7);margin-top:30px;padding:18px 0 24px;font-size:13px;display:flex;justify-content:space-between;align-items:center;gap:20px;color:#414b3d}
    footer nav{display:flex;gap:28px}
    footer nav a{min-height:44px;display:flex;align-items:center;font-size:14px;font-weight:400}
    .arriba{min-height:44px;display:flex;align-items:center;font-family:'DM Mono',monospace;font-size:11px;text-transform:uppercase}
    a:focus-visible{outline:2px solid var(--kr-punto,#bb5943);outline-offset:5px}
    @media(hover:hover){a:hover{color:#923f2c}}
    @media(max-width:600px){.remate{margin-top:56px;padding-top:36px}.wrap{padding:0 24px}.heading{display:block}.titulo{font-size:42px;letter-spacing:-1.5px}.descripcion{font-size:15px;max-width:310px}.contacto{font-size:17px;margin-top:21px;width:max-content;margin-left:auto}.palabra{font-size:clamp(104px,33.6vw,202px);letter-spacing:-.069em;margin-top:66px;line-height:1.3}.tinta{animation:none;background-position:20% 40%}.meta{margin-top:22px}.meta span{flex:1}.meta span:last-child{flex:none;white-space:nowrap}footer{margin-top:40px;gap:12px}footer nav{gap:20px}.arriba{display:none}}
    .remate.compacta{margin-top:0;padding:0;background:var(--kr-papel,#efede6);border-top:1px solid var(--kr-linea,#bfc3b7)}
    .compacta .cwrap{max-width:1080px;margin:auto;padding:28px 28px max(30px,env(safe-area-inset-bottom));display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
    .compacta .cpal{font-family:'Space Grotesk',sans-serif;font-size:44px;font-weight:700;letter-spacing:-.07em;line-height:1;white-space:nowrap;min-height:44px;display:flex;align-items:center}
    .compacta .cpal .punto{color:var(--kr-punto,#bb5943)}
    .compacta .cmeta{display:flex;flex-direction:column;gap:2px;margin:0 auto 4px 18px}
    .compacta nav{display:flex;gap:22px}
    .compacta nav a{min-height:44px;display:flex;align-items:center;font-size:14px}
    .compacta a:hover{color:var(--kr-hover,#923f2c)}
    @media(max-width:560px){.remate.compacta{margin-top:0;padding:0}.compacta .cwrap{flex-wrap:wrap;padding:24px 18px max(26px,env(safe-area-inset-bottom));gap:2px 0}.compacta .cpal{font-size:40px;width:100%}.compacta .cmeta{margin:12px 0 0}.compacta nav{margin-left:auto;margin-top:6px}}
    @media(pointer:coarse){.tinta{animation:none}a{min-height:44px}.wrap{padding-bottom:env(safe-area-inset-bottom)}}
    @media(prefers-reduced-motion:reduce){.tinta{animation:none!important}}
    @media print{:host{display:none!important}}
  `;

  const POR_DEFECTO = {
    eyebrow: "Sigamos la conversación",
    titulo: "Una idea.|Un buen comienzo.",
    descripcion: "Si encontraste un error o tenés una idea,|me podés escribir.",
    cta: "Hablemos",
    "cta-href": "/contacto/",
    palabra: "lucas",
    tagline: "Profesorado, clases y código",
    firma: "Hecho en Uruguay|Con tiempo y por gusto",
    links: "Contacto=/contacto/,GitHub=https://github.com/lucasramosuy",
    arriba: "Volver arriba ↑",
    "arriba-href": "#inicio",
  };
  const COLORES = { papel: "--kr-papel", tinta: "--kr-tinta", punto: "--kr-punto", meta: "--kr-meta", linea: "--kr-linea", hover: "--kr-hover" };

  function parseLinks(valor) {
    return valor.split(",").map((par) => {
      const i = par.indexOf("=");
      return { label: par.slice(0, i).trim(), url: par.slice(i + 1).trim() };
    }).filter((l) => l.label && l.url);
  }

  // Solo se permiten URLs relativas, anclas, http(s) y mailto.
  function urlSegura(u) {
    return /^(\/|#|\.|https?:|mailto:)/i.test(u) ? u : "#";
  }

  function el(tag, clase, texto) {
    const n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function lineas(padre, texto, envolver2) {
    texto.split("|").forEach((t, i) => {
      if (i) padre.appendChild(document.createElement("br"));
      if (envolver2 && i === 1) padre.appendChild(el("em", null, t));
      else padre.appendChild(document.createTextNode(t));
    });
  }

  class KitRemate extends HTMLElement {
    static get observedAttributes() {
      return Object.keys(POR_DEFECTO).concat(["anio", "sufijo", "texto", "variante", "palabra-href"], Object.keys(COLORES));
    }
    connectedCallback() { this.vigilar(); this.render(); }
    disconnectedCallback() { this.soltar(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n) {
      const v = this.getAttribute(n);
      return v == null || v === "" ? POR_DEFECTO[n] : v;
    }
    render() {
      for (const [attr, variable] of Object.entries(COLORES)) {
        const v = this.getAttribute(attr);
        if (v) this.style.setProperty(variable, v); else this.style.removeProperty(variable);
      }
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      const anio = this.getAttribute("anio") || String(new Date().getFullYear());
      const sufijo = this.getAttribute("sufijo");
      const texto = this.getAttribute("texto") || `© ${anio} Lucas${sufijo ? " · " + sufijo : ""}`;
      const palabra = this.attr("palabra");

      if (this.getAttribute("variante") === "compacta") { this.renderCompacta(texto, palabra); return; }

      const raiz = el("section", "remate");
      raiz.setAttribute("part", "remate");
      raiz.setAttribute("aria-label", "Contacto y cierre");
      const wrap = el("div", "wrap");

      const heading = el("div", "heading");
      const izq = el("div");
      izq.appendChild(el("p", "label", this.attr("eyebrow")));
      const h2 = el("h2", "titulo"); h2.setAttribute("part", "titulo");
      lineas(h2, this.attr("titulo"), true);
      izq.appendChild(h2);
      const desc = el("p", "descripcion");
      lineas(desc, this.attr("descripcion"), false);
      izq.appendChild(desc);
      heading.appendChild(izq);
      if (this.getAttribute("cta") !== "no") {
        const a = el("a", "contacto", this.attr("cta") + " ");
        a.href = urlSegura(this.attr("cta-href"));
        a.insertAdjacentHTML("beforeend", '<svg class="flecha" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>');
        heading.appendChild(a);
      }
      wrap.appendChild(heading);

      const pal = el("div", "palabra"); pal.setAttribute("part", "palabra");
      pal.setAttribute("aria-label", palabra + ".");
      const tinta = el("span", "tinta", palabra); tinta.setAttribute("aria-hidden", "true");
      const punto = el("span", "punto", "."); punto.setAttribute("aria-hidden", "true");
      pal.append(tinta, punto);
      wrap.appendChild(pal);

      const meta = el("div", "meta");
      meta.appendChild(el("span", null, this.attr("tagline")));
      const firma = el("span"); lineas(firma, this.attr("firma"), false);
      meta.appendChild(firma);
      wrap.appendChild(meta);

      const pie = el("footer"); pie.setAttribute("part", "pie");
      pie.appendChild(el("span", "copy", texto));
      const nav = el("nav"); nav.setAttribute("aria-label", "Enlaces del pie");
      parseLinks(this.attr("links")).forEach((l) => {
        const a = el("a", null, l.label); a.href = urlSegura(l.url); nav.appendChild(a);
      });
      pie.appendChild(nav);
      if (this.getAttribute("arriba") !== "no") {
        const up = el("a", "arriba", this.attr("arriba")); up.href = urlSegura(this.attr("arriba-href"));
        pie.appendChild(up);
      }
      wrap.appendChild(pie);
      raiz.appendChild(wrap);

      this.shadowRoot.replaceChildren();
      const style = document.createElement("style"); style.textContent = css;
      this.shadowRoot.append(style, raiz);
      this.raiz = raiz;
      this.actualizar();
    }
    renderCompacta(texto, palabra) {
      const raiz = el("section", "remate compacta");
      raiz.setAttribute("part", "remate");
      raiz.setAttribute("aria-label", "Cierre");
      const wrap = el("div", "cwrap");
      const pal = el("a", "cpal"); pal.setAttribute("part", "palabra");
      pal.href = urlSegura(this.getAttribute("palabra-href") || "/links/");
      pal.setAttribute("aria-label", palabra + ".");
      const t = el("span", null, palabra); t.setAttribute("aria-hidden", "true");
      const punto = el("span", "punto", "."); punto.setAttribute("aria-hidden", "true");
      pal.append(t, punto);
      wrap.appendChild(pal);
      const meta = el("div", "cmeta");
      const firma = el("span", "label"); lineas(firma, this.getAttribute("firma") || "Hecho en Uruguay", false);
      meta.append(firma, el("span", "copy", texto));
      wrap.appendChild(meta);
      const nav = el("nav"); nav.setAttribute("aria-label", "Enlaces del pie"); nav.setAttribute("part", "pie");
      parseLinks(this.getAttribute("links") || "Contacto=/contacto/").forEach((l) => {
        const a = el("a", null, l.label); a.href = urlSegura(l.url); nav.appendChild(a);
      });
      wrap.appendChild(nav);
      raiz.appendChild(wrap);
      this.shadowRoot.replaceChildren();
      const style = document.createElement("style"); style.textContent = css;
      this.shadowRoot.append(style, raiz);
      this.raiz = null;
    }
    // La animación corre solo a la vista, con la pestaña visible, sin
    // movimiento reducido y sin puntero táctil.
    actualizar() {
      if (!this.raiz) return;
      this.raiz.dataset.enVista = String(!!this.visible && !document.hidden && !this.movimiento.matches && !this.tactil.matches);
    }
    vigilar() {
      if (this.vigilando) return;
      this.vigilando = true;
      this.visible = false;
      this.movimiento = matchMedia("(prefers-reduced-motion: reduce)");
      this.tactil = matchMedia("(pointer: coarse)");
      this.alCambiar = () => this.actualizar();
      if ("IntersectionObserver" in window) {
        this.obs = new IntersectionObserver((e) => { this.visible = e[0].isIntersecting; this.actualizar(); }, { threshold: 0.05 });
        this.obs.observe(this);
      }
      document.addEventListener("visibilitychange", this.alCambiar);
      this.movimiento.addEventListener("change", this.alCambiar);
      this.tactil.addEventListener("change", this.alCambiar);
      this.actualizar();
    }
    soltar() {
      if (!this.vigilando) return;
      this.vigilando = false;
      if (this.obs) this.obs.disconnect();
      document.removeEventListener("visibilitychange", this.alCambiar);
      this.movimiento.removeEventListener("change", this.alCambiar);
      this.tactil.removeEventListener("change", this.alCambiar);
    }
  }
  if (!customElements.get("kit-remate")) customElements.define("kit-remate", KitRemate);
})();

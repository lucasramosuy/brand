# Brand kit — lucasramos.uy

Sistema de identidad visual del dominio y todos sus paths. Todo proyecto nuevo
arranca de acá. Para proyectos existentes, cada cambio de identidad se
propone con el detalle exacto y se aprueba antes de tocarse. Si algo no está
escrito acá, no se inventa: se propone y se agrega.

Desde el 22/10/2026 el kit adopta **Hallmark** (github.com/Nutlope/hallmark,
MIT) en dos capas: su **piso** de calidad anti-slop (§12) y su **dirección de
arte** (§13, tema Atelier) como lenguaje visual unificado. El criterio fijo
del sistema es la **coherencia entre todos los productos**: un producto se
reconoce por su acento y su nombre; todo lo demás habla el mismo idioma.
Las reglas de Hallmark mandan sobre cualquier costumbre anterior de este
documento. Lo que no es cuestión de gusto queda intacto: la privacidad (§6),
las fuentes autoalojadas (§3), las rutas y el flujo por PR.

## 1. Regla de oro

Consistencia por encima de creatividad. Tipografía, tamaños, márgenes, colores
y jerarquía unificados dentro de cada producto, y cada producto fiel a las
reglas de este kit. Nada de defaults del navegador o del vendor visibles.
El piso Hallmark (§12) es parte de esta regla y no es negociable salvo
waiver asentado (§12.2).

## 2. Wordmarks

Dos niveles, siempre en minúscula con punto final:

| Marca | Uso | Punto |
|---|---|---|
| `lucas.` | Identidad personal: raíz, /profe, /links, /contacto | Coral `#bb5943` (reservado) |
| `producto.` | Cada producto: `wallpapers.`, `historias.`, `qr.`, `salida.`, `wrapped.`, `simuladores.`, `fotograma.`, `papeles.`, `conexiones.`, `rachas.`, `snake.`, `2048.`, `rebote.`, `panel.` | Acento del producto |

- El coral `#bb5943` es exclusivo de `lucas.`. Ningún producto lo usa.
- `lucas.` siempre enlaza a `/links` (el hub). El wordmark de cada producto
  enlaza a **la home del propio producto** (`/simuladores/`, `/papeles/`,
  etc.), nunca a la raíz y nunca muestra la pill `lucasramos.uy ↗`.
- El link a la raíz del dominio vive en el **footer** de todos los proyectos,
  como un único "lucasramos.uy" con el estilo de `kit-footer` (el kit-footer
  lo pone primero por defecto; `raiz="no"` lo omite). El header no lleva
  links a la raíz ni acciones de salida: queda wordmark, nav y acciones propias.
- En `kit-header`, pasar siempre `href` con la home del producto. El atributo
  `pill` queda deprecado.
- El wordmark se compone en Hanken Grotesk 700 con tracking cerrado.

### Excepciones registradas

- **Normativa** es marca institucional propia: nombre completo "Normativa
  Uruguay", ícono banco, sin punto. Leydle es sub-marca suya y hereda su
  identidad. No forzar la convención del punto ahí.
- **Fotograma** es un juego visual con identidad de producto `fotograma.`; la imagen compartida se genera en el navegador con las fuentes del kit.
- **Papeles** es la herramienta local de PDF `papeles.`: los documentos no se suben al servidor.
- **app-stm** vive fuera del dominio (Netlify) y hoy no forma parte del
  sistema. Si migra a un path, adopta wordmark con punto y entra a /links.

## 3. Tipografía

Regla dura: **ninguna propiedad usa fuentes del sistema**. Todas las fuentes
se self-hostean (Fontsource o woff2 propio); nunca Google Fonts.

| Rol | Fuente | Alcance |
|---|---|---|
| Sans universal | **Hanken Grotesk** | Cuerpo, wordmarks, labels, botones, UI de todos los productos |
| Serif display | **Sentient** (300 titulares, 400 serif chica) | Titulares y statements de todo el dominio |
| Mono | **DM Mono** | Solo código, cifras, mediciones y datos técnicos |

La pareja Sentient + Hanken Grotesk es la de la dirección de arte adoptada
(§13) y es única para todo el dominio. Ambas se self-hostean como woff2
propio servido desde `lucasramos.uy/brand/fonts/` (Sentient es de Fontshare,
Hanken Grotesk es OFL); Space Grotesk y las serif por familia se retiran en
la migración de cada producto.

- **Labels y metadatos:** van en la cara de cuerpo (Space Grotesk), un paso
  más chicos, en sentence case o minúscula, sin tracking. Quedan eliminados
  los "eyebrows" en mono mayúsculas con tracking ("01 / CREAR"): Hallmark
  los marca como tell de IA (gates 54 y 67) y no son waivables. Las secciones
  se abren con el titular solo, una línea de apoyo en cuerpo, o un dato real.
- **DM Mono ya no es cara de labels** (Hallmark 64, "mono como disfraz"):
  queda para código, números, folios de datos técnicos y superficies donde
  el mono es el material (terminal, JSON, métricas).
- **Titulares, una sola voz:** nada de una palabra suelta en itálica dentro
  de un titular romano (Hallmark 38i) ni una palabra destacada por color,
  peso o subrayado dentro del titular (38iii). El énfasis se logra con el
  quiebre de línea, la escala o una segunda línea a otro tamaño. Esto
  reemplaza la regla anterior del `<em>` de acento.
- Máximo tres familias por página (display, cuerpo y una de rol puntual).


## 4. Color

Estructura fija por producto: **base papel + tinta + un acento**.

- Papel: fondo claro cálido o frío (`#fbfaf7`, `#f7f1e6`, `#f4f5f9`...).
- Tinta: casi negro suave (`#141733`, `#241b12`, `#23302b`...). Nunca
  `#000` ni `#fff` puros fuera del bloque de tokens: se entonan hacia el
  matiz ancla (Hallmark 7a).
- Acento: UNO por producto. Vive en el punto del wordmark, CTAs y links,
  nada más. Máximo 2 acentos por producto.
- **Gradiente violeta-azul (y sus primos violeta-rosa, cyan sobre oscuro):
  prohibido en todo el dominio** (Hallmark 2a). Las paletas oscuras de dos
  acentos ya registradas (wallpapers, historias) se mantienen como excepción
  hasta su próxima revisión de diseño.
- Nada de blobs de luz, orbes difuminados ni halos de color detrás del texto:
  la profundidad sale de escalones de luminosidad y sombras con offset y
  blur (Hallmark 29).
- Los tokens base (papel, tinta, hairline, tarjeta) son los de la dirección
  de arte (§13.2); cada producto solo define su acento.
- Modo: **contenido = claro, herramienta/editor = oscuro**.

Acentos actuales:

| Producto | Acento | Base |
|---|---|---|
| `lucas.` (raíz/contacto) | Coral `#bb5943` + cobalto `#2f4fe0` | Fría `#f4f5f9` |
| /profe | Terracota `#c8502e` + mostaza `#e3a72f` | Cálida `#f7f1e6` |
| /links | Clay `#bb5943` | Cálida `#f4f0e9` |
| Normativa | Verde bosque `#176b63` | `#fbfaf7` |
| simuladores. | Clay `#9c4f2f` (cada simulador define su acento por tokens) | `#f4f1ea` |
| wallpapers. | Rosa `#ff568c` + violeta `#5632a7` (excepción registrada) | Oscura `#0b0b10` |
| historias. | Rosa `#ff4e8f` | Oscura `#0b0910` |
| qr. | Menta `#2ff0be` | Oscura `#152e32` |
| salida. | Arcilla `#9b6c55` | Claro `#f3f1e9` (excepción de modo: herramienta clara) |
| wrapped. | Multi-acento data-viz (excepción registrada) | Oscura `#0f0e15` |
| conexiones. | Vino `#7b2d43` | Cálida `#f7f5ef` |
| rachas. | Melón `#c28b6e` | Papel cálido `#eae8df` + sidebar verde `#253631`; app privada |
| snake. | Teal `#1c756b` | `#f8f7f4` |
| 2048. | Teal `#1c756c` | `#f8f7f4` |
| rebote. | Lima `#c9dc7a` | Oscura `#0b0d0c` |
| panel. | Pizarra `#3d6b8e` (claro) / `#8db5d3` (oscuro) | Papel `#f6f5f1` / oscura `#0f1214`; claro y oscuro de primera clase |

### Tokens de panel.

`panel.` es el panel académico (`/dashboard`). Su acento es un azul grisáceo
"pizarra", distinto del coral de `lucas.`, del verde de Normativa, del teal de
snake./2048. y del cobalto de la raíz. Vive en el punto del wordmark, los
subrayados de enlaces secundarios, la barra de progreso y el foco. Los
botones primarios son tinta sólida, no acento.

| Token | Claro | Oscuro |
|---|---|---|
| Acento | `#3d6b8e` | `#8db5d3` |
| Papel (fondo) | `#f6f5f1` | `#0f1214` |
| Tarjetas | `#fcfbf8` | `#161a1d` |
| Tinta (texto y botón primario) | `#1b1f24` | `#eceae4` |
| Borde | `#e3e1da` | `#252a2e` |
| Ok | `#2f6f55` | `#7fc3a2` |
| Aviso | `#946017` | `#e0b068` |
| Error | `#9a3b32` | `#e08a80` |

- Estados como chips con fondo tintado (el color al 12-14% sobre la tarjeta),
  punto de color y radio 8. Sin cápsulas ni barras laterales de acento.
- Tipografía: Hanken Grotesk para la interfaz y DM Mono solo para datos
  técnicos, autoalojadas, nunca fuentes del sistema.
- Wordmark `panel.` en el sidebar (arriba) y centrado en la barra móvil.

## 5. Anatomía y voz

- Header: wordmark a la izquierda, nav a la derecha.
- Titular display con una sola voz (§3); las secciones se abren sin eyebrow.
- Español rioplatense, voseo, primera persona. Corto, sin relleno.
- Espacio en blanco con intención; sin etiquetas redundantes.
- **Copy limpio (Hallmark 19, 63):** sin clichés de startup (seamless,
  robust, empower, elevate, unlock...), sin guiones largos (em/en dash) en
  el texto visible, sin segunda acción de relleno ("Learn more", "Get
  started") junto a la primaria. Nada de meta-strings unidos con puntos
  medios (`A · B · C`) fuera de byline o estado en vivo, nada de flechas
  pegadas al texto de links, nada de puntitos de estado decorativos.
- Los números salen de los datos, nunca hardcodeados. Nunca una métrica,
  testimonio o logo inventado (Hallmark 46a).
- Unas 80 palabras por pantalla como techo en páginas de presentación: el
  héroe es titular + una oración + acciones (Hallmark 58).

## 6. Privacidad (parte del kit)

- Nunca el apellido del autor en títulos, logos, footers, READMEs ni texto público.
- Nunca emails personales en repos públicos ni en código.
- Atribuciones públicas genéricas ("la Administración de ...").

## 7. Imágenes exportadas (canvas y PNG para compartir)

Toda imagen generada en el navegador (tarjetas, historias, tickets, posters)
es superficie de marca: la regla dura de tipografía aplica igual ahí. El
canvas nunca puede caer en fuente del sistema.

Patrón único (referencia: fotograma):

1. Declarar las fuentes del proyecto con `@font-face` self-hosteado (woff2),
   incluyendo **todos los pesos que el canvas va a usar**.
2. Antes de pintar, forzar la carga de cada (familia, peso):

   ```js
   await Promise.all([
     document.fonts.load('700 56px "Hanken Grotesk"'),
     document.fonts.load('26px "DM Mono"')
   ]);
   await document.fonts.ready;
   ```

   `document.fonts.load()` dispara la descarga del peso exacto aunque el DOM
   no lo esté usando todavía. Si el peso no está declarado en el CSS, resuelve
   vacío y el canvas cae al sistema: por eso el paso 1 es parte del patrón.
3. Recién después pintar (`fillText`, `measureText`).
4. Nunca `sans-serif` / `serif` / `monospace` a secas en `ctx.font`: la
   familia del kit va primero y el genérico queda solo como fallback final.

Estado: fotograma es la referencia. `qr.` y `salida.` migran con este patrón
(PRs en curso); `historias` usa `document.fonts.ready` + plantillas (compatible).
`rachas` y `leydle` (share-imagen), pendientes de migración cuando toquen.

## 8. Checklist para un proyecto nuevo

1. Elegir acento propio (que no choque con otro producto ni con el coral).
2. Wordmark `producto.` con punto en el acento, enlazando a la home del producto.
3. Hanken Grotesk + Sentient self-hosteadas (§3); DM Mono solo para datos.
4. Papel + tinta + acento; modo claro u oscuro según contenido/herramienta.
5. Entrada en /links.
6. Fuentes del sistema solo como fallback final, nunca como fuente visible.
7. Si exporta imágenes (canvas/PNG para compartir), aplicar el patrón de la
   sección 7: fuentes cargadas antes de pintar, nunca genéricas a secas.
8. Ruta en Cloudflare: el proyecto necesita su ruta explícita
   (`lucasramos.uy/<proyecto>*`) hacia su Worker, o vivir dentro del sitio
   `www` como carpeta `/<proyecto>/`. Ver la nota siguiente.
9. Pasar la auditoría anti-slop (§12.3) sin `FAIL` antes de mergear.

### Rutas en Cloudflare

Desde el 10/10/2026 la ruta ancha `lucasramos.uy/*` ya no existe: la portada y
todo lo estático los sirve el proyecto Pages `www` directo, sin pasar por un
Worker. Un proyecto nuevo que no tenga ruta propia ni esté dentro de `www`
devuelve el 404 de Pages. Las rutas se cargan en el panel de
Cloudflare (Rutas de Workers de la zona `lucasramos.uy`), no en un repo, así
que hay que avisar cuando se agrega una.

## 9. Móvil y Apple HIG

Criterios mínimos para cualquier superficie del dominio. Se revisan en iPhone
(390 px) antes de mergear.

- **Targets táctiles:** 44×44 pt como mínimo. Se agranda el área (padding,
  `min-height`), no el dibujo. En el kit, los componentes lo resuelven bajo
  `@media (pointer: coarse)`, así escritorio conserva su densidad.
- **Controles de formulario:** 16 px como mínimo en `input`, `select` y
  `textarea` (menos dispara el zoom de iOS al enfocar). `kit-base.css` lo
  aplica en táctil; si un sitio define un tamaño con un selector más
  específico, tiene que repetir los 16 px en `pointer: coarse`.
- **Hover:** los estados `:hover` van dentro de `@media (hover: hover)`; en
  táctil el hover queda pegado tras el toque.
- **Foco visible:** `:focus-visible` con anillo propio (no el azul del
  navegador), instantáneo, sin fade. Nunca `outline: none` sin un reemplazo.
- **Movimiento:** `prefers-reduced-motion` respetado. `kit-base.css` lo
  incluye; los juegos con animación esencial lo acotan en su CSS.
- **Texto:** 11 px es el piso para etiquetas; 12 px o más para lectura;
  cuerpo de 16 px con interlineado 1.5 a 1.65 en páginas de lectura.
- **Safe areas:** con `viewport-fit=cover`, las barras fijas usan
  `env(safe-area-inset-*)`.
- **Zoom:** no se bloquea (`user-scalable=no`, `maximum-scale=1`). Un canvas de
  juego usa `touch-action: none` solo en el propio canvas.

## 10. Tema claro / oscuro

El kit trae un modo oscuro opcional, fiel a la estructura **papel + tinta + un
acento**: en oscuro la tinta pasa a fondo, el papel a texto y el acento de cada
producto no cambia.

| Token | Claro | Oscuro |
|---|---|---|
| `--kit-fondo` | `#f3f1e9` | `#161916` |
| `--kit-tinta` | `#222721` | `#ece9de` |
| `--kit-linea` | `#c9cec6` | `#343a33` |
| `--kit-meta` | `#687168` | `#a2aaa0` |
| `--kit-hover` | `#293a32` | `#f7f5ec` |

- El tema vive en `<html data-tema="oscuro">`. Lo pone `kit/theme.js`
  (preferencia guardada; si no hay, la del sistema) y el toggle es
  `KitTema.crearBoton()`, un botón 44×44 con sol y luna que `kit-base.css` ya
  estila (`.tema-pill`).
- Sin `data-tema="oscuro"` los tokens valen lo de siempre: adoptar el kit no
  cambia ningún sitio. Cada proyecto decide cuándo pasa a oscuro.
- `kit-header`, `kit-footer` y `kit-masthead` leen los tokens cuando no tienen
  atributos de color. Un atributo explícito (`fondo`, `tinta`...) gana; un
  sitio que adopta oscuro pasa `var(--kit-fondo)` y no un hex fijo.
- `kit-rail` ya es oscuro por diseño y no cambia.
- Contraste medido de `--kit-meta` sobre `--kit-fondo` en oscuro: más de 7:1.
- Regla vigente: contenido = claro, herramienta/editor = oscuro. El toggle
  permite al lector cambiar, no cambia el default de cada producto.

## 11. Remate editorial

Cierre grande de las páginas de identidad personal: la palabra `lucas.` a
escala de pantalla, en tinta con textura, y el punto coral. Es el
`kit-remate`, un componente aparte del `kit-footer`, y la pieza de firma
compartida del dominio.

- **Dónde va:** el remate completo va en la raíz, `/contacto` y las páginas de
  identidad personal (links, profe). Las herramientas y los estudios llevan la
  **variante compacta** (`variante="compacta"`): una franja baja con `lucas.`
  chico, "Hecho en Uruguay", el © y solo Contacto. Reemplaza al `kit-footer`
  en esos sitios.
- **Variante compacta:** `lucas.` enlaza a `/links/` (como en el resto del
  sistema, sección 2) y mantiene el punto coral, que es de `lucas.`. Usa la
  paleta del sitio (fondo, línea, texto y hover por atributos), así que en un
  estudio oscuro queda oscuro. No lleva titular, CTA, tagline, animación ni
  "Volver arriba", y no repite `lucasramos.uy` ni GitHub.
- **Punto coral:** el remate es `lucas.`, así que el coral `#bb5943` es válido
  (sección 2). Ningún producto con marca propia lo usa para su palabra.
- **Normativa:** marca institucional con identidad propia. No lleva el remate
  tal cual; si adopta alguna variante, es sobria y se aprueba aparte.
- **Color:** papel `#efede6` y tinta `#242a26`, por variables
  (`--kr-papel`, `--kr-tinta`, `--kr-punto`, `--kr-meta`, `--kr-linea`) o por
  atributos. El remate no sigue el tema oscuro: es una pieza de papel.
- **Movimiento:** la textura de tinta se mueve lento solo en escritorio con
  puntero fino, mientras está a la vista y la pestaña está visible. En táctil
  y con `prefers-reduced-motion` queda estática.
- **Móvil/HIG:** targets de 44 px, foco visible, hover solo con puntero,
  `env(safe-area-inset-bottom)` en táctil.
- **Fuentes:** la página carga Hanken Grotesk y DM Mono (`kit-fonts.css`) y
  la Sentient del dominio. El componente no trae fuentes propias.
- **Copy:** por atributos (`titulo`, `descripcion`, `cta`, `tagline`,
  `firma`, `links`...). Primera persona, voseo, corto. En `/contacto` se pasa
  `cta="no"` porque la página ya es el contacto.
- **Rollout:** brand, después www (que lo sirve), después cada proyecto, un PR
  por proyecto.

Uso y atributos: `kit/README.md`.

## 12. Piso Hallmark (anti-slop)

El piso de Hallmark es la vara de calidad mecánica del dominio. Aplica a toda
superficie, igual que las secciones 1 a 11. El número entre paréntesis es el
gate de Hallmark (`references/gates.md` de su repo). Las reglas de esta
sección reemplazan cualquier costumbre anterior que choque con ellas.

### 12.1 Reglas (piso duro)

- **Tokens:** todo color y toda fuente pasa por un token declarado (`:root` o
  bloque de tema). Nada de hex, `rgb()` ni `font-family` literal fuera del
  bloque de tokens. (48)
- **Overflow:** `overflow-x: clip` en `html` y `body`. Nunca `hidden`, nunca
  `100vw`. (34)
- **Viewports:** alturas de héroe/pantalla en `dvh` o `svh`, nunca `vh` a
  secas. El contenedor tiene `max-width` y se centra: a 1920 crecen los
  márgenes, no la medida ni las grillas. (6a, 44d)
- **Grillas con imagen:** tracks con `minmax(0, 1fr)`; titulares display con
  `overflow-wrap: break-word` y `min-width: 0`. (50)
- **Movimiento:** nunca `transition: all`; no animar `width`, `height`,
  `top` ni `left`, ni transicionar `margin`/`padding` (salvo morph
  justificado). Solo `transform` y `opacity`. Sin easing con rebote en
  estados de UI. Todo con fallback `prefers-reduced-motion` (§9). Contenido
  visible sin JS: nada de `opacity: 0` que dependa de un script para
  mostrarse; se oculta solo bajo clase `.js`, con animación auto-ejecutada
  o con `@starting-style`. (10a, 10b, 12, 27, 62)
- **Foco:** `:focus-visible` instantáneo en todo elemento interactivo,
  contraste 3:1 contra lo que tiene debajo. (26a, 15)
- **Contraste:** texto 4.5:1; texto grande, íconos, anillos de foco y bordes
  de campo 3:1. El texto de un botón lleva la tinta pareada a su relleno
  (`--color-accent-ink` donde el acento lleva texto). (40, 41)
- **Controles:** input y botón adyacente comparten altura; el borde no cambia
  de ancho entre estados (el foco se dibuja con `outline`); el estado
  disabled combina opacidad + `cursor: not-allowed` + atributo nativo. Los
  labels de botones y los links principales de nav nunca quiebran en dos
  líneas (`white-space: nowrap` si hace falta). Una sola capa de contención:
  nunca card dentro de card. (39a, 49a, 4)
- **Slop visual prohibido:** gradiente violeta-azul y primos (§4); emoji
  como ícono; ventana de navegador u OS dibujada a mano; blobs de luz u
  orbes; ilustraciones SVG dibujadas más grandes que un ícono donde
  corresponde una foto o el producto real; métricas, testimonios o logos
  inventados. (2a, 30a, 47a, 29, 80, 46a)
- **Honestidad de formularios:** ningún formulario muestra éxito ("Enviado",
  "Gracias") sin un request detrás. Si todavía no está conectado, valida y
  lo dice en claro. (70)
- **Copy y puntuación de plantilla:** ver §5. (19, 63)
- **Video:** autoplay solo con `muted`, `playsinline` y `loop`; nunca
  `loading="lazy"` en el elemento LCP. (28a)

### 12.2 Waivers

Un gate de nivel **Reflex** puede excepcionarse por página con motivo real,
asentado en el CSS: `/* waive <gate> · <razón> */`. Un gate de piso (Floor)
nunca se waivea. Tres waivers del mismo gate en builds seguidos son estilo
de casa y se proponen para este documento, no se repiten por archivo.

### 12.3 Auditoría con sloplint

- Comando: `node sloplint.mjs <ruta>` (script del repo de Hallmark; lee
  `.html`, `.css`, `.astro`, `.jsx`, `.tsx`, `.vue` y `.svelte`, e ignora
  `node_modules` y `dist`).
- Veredictos: `FAIL` es piso roto y se arregla; `REFLEX` se arregla o queda
  asentado con waiver (§12.2); `WARN` se confirma o se descarta con motivo.
- La auditoría es siempre read-only. Los arreglos van por PR, un PR por
  repo, con el OK previo de Lucas.
- El "stamp" de Hallmark (primera línea del CSS con metadatos del build) no
  se adopta: la fuente de verdad del sistema es este BRAND.md y los tokens
  compartidos (`kit-fonts.css`, `kit-base.css`), no un comentario por
  archivo.

## 13. Dirección de arte: Atelier

El dominio adopta **Atelier**, el tema editorial de Hallmark, como lenguaje
visual unificado. La idea: el catálogo de un taller en aire quieto. Papel
limewash con grano, tinta umber profunda, hairlines, tipografía serif liviana
y una sola señal de color por producto. Un producto se reconoce por su
acento; todo lo demás (papel, tinta, textura, composición, controles) es el
mismo idioma.

Adaptaciones del tema al sistema propio:

- Las fuentes se self-hostean siempre (§3); nada de Fontshare ni Google
  Fonts en runtime.
- La señal de Atelier es un pizarra frío; acá la señal es **el acento de
  cada producto** (§4), con el coral reservado a `lucas.`. Se conserva su
  volumen: el acento no pasa del ~4-5% de una pantalla (punto del wordmark,
  subrayados, foco, acción).
- El "aire" animado del tema (campo WebGL) es opcional y por producto; la
  textura base obligatoria es el grano (13.2).
- El generador de imágenes de Hallmark (API paga) no se usa.

### 13.1 Tipografía

- **Display y statements:** Sentient 300, roman, sentence case, interlineado
  1.02 a 1.1, tracking -0.018em. Un solo peso y un solo color por titular.
- **Serif chica:** Sentient 400 para h3, nombres en tarjetas y numerales;
  nunca menos de 16 px ni en párrafos.
- **Cuerpo y UI:** Hanken Grotesk 400, interlineado 1.6. Labels: Hanken un
  paso más chicos, sentence case, sin tracking.
- Tres pesos por página como máximo (Sentient 300 y 400, Hanken 400).
- Nunca texto corrido en serif.

### 13.2 Superficie y textura

Tokens base del dominio (los define el kit; los productos no los pisan):

| Token | Claro | Oscuro |
|---|---|---|
| `--kit-papel` | `oklch(94.5% 0.010 76)` | `oklch(21% 0.018 52)` |
| `--kit-papel-2` | `oklch(91.8% 0.013 74)` | `oklch(25% 0.016 54)` |
| `--kit-tinta` | `oklch(19% 0.024 52)` | `oklch(94% 0.010 76)` |
| `--kit-tinta-2` | `oklch(31% 0.018 54)` | `oklch(86% 0.012 72)` |
| `--kit-meta` | `oklch(47% 0.014 60)` | `oklch(66% 0.014 60)` |
| `--kit-linea` | `oklch(81% 0.011 70)` | `oklch(38% 0.014 60)` |
| `--kit-tarjeta` | `oklch(97.6% 0.007 82)` | `oklch(25.5% 0.016 54)` |

- **Grano:** textura `feTurbulence` como data URI multiplicada suave sobre el
  papel (el patrón `--grain` del tema). Nada de blobs, orbes ni gradientes
  de luz (§12.1).
- **Card stock:** las tarjetas son "papel algodón": fibra sutil, borde
  iluminado arriba a la izquierda, sombra con offset y blur, hairline
  interior. Nunca una tarjeta blanca plana ni un panel de vidrio con blur.
- **Hairlines:** filas y listas se separan con hairlines; una tabla o lista
  abre con una regla de tinta. La escala de espaciado del kit
  (`--space-*`, múltiplos de 4 px) se define en la migración del kit.

### 13.3 Controles

- El control primario es una **hairline de tinta** (hover: relleno tinta,
  texto papel); la acción secundaria es un link subrayado con el acento.
  Ningún control va relleno con el color de acento.
- Alturas de 44 a 52 px; foco con anillo del acento, instantáneo (§12.1).
- Los campos sobre card stock son label sobre línea rulada.

### 13.4 Composición

- Una idea por pantalla, seteada en grande; un statement es una oración en
  Sentient 300 a lo ancho de 9-10 columnas.
- Listas y tablas ruladas; nada de grillas de tres cards iguales con ícono
  arriba del título.
- Imágenes: fotografía en luz cálida de día colgada pareja con su "wall
  label", o el producto real construido o capturado. Nunca ilustración
  dibujada ni stock genérico (§12.1).
- El remate `lucas.` (§11) sigue siendo la pieza de firma; su textura de
  tinta es la versión de marca del grano.

### 13.5 Modo oscuro

La misma dirección, invertida según §10: la tinta pasa a fondo (entonado,
nunca negro puro), el papel a texto y el acento de cada producto no cambia.
El grano se mantiene, más sutil que en claro.

### 13.6 Voz

Precisión de objeto: el objeto, el material, el número, los días. Sin
superlativos, sin "descubrí", sin "comprá ahora" (suma a §5).

### 13.7 Migración

Los productos conservan su look actual hasta su PR de migración; la
auditoría de cada repo (§12.3) mide contra esta dirección como destino. La
ola 0 del rollout actualiza el kit (fuentes, tokens base, grano, card stock,
controles hairline) y las olas siguientes migran producto por producto.


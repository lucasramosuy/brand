# kit/share.js

Módulo sin dependencias para imágenes canvas. Se copia en cada proyecto bajo `kit/share.js`, con el encabezado de procedencia. No se importa desde GitHub ni desde CDN en tiempo de ejecución. Los consumidores guardan sus propios woff2 y declaran los pesos usados con `@font-face`; el kit espera a `document.fonts.load`, comprueba que el peso realmente exista y falla en vez de generar una tarjeta con fuentes del sistema.

```js
import {loadExportFonts, fillRound, wrapLines, downloadPng} from './kit/share.js';
await loadExportFonts([
  {family: 'Space Grotesk', weight: 700},
  {family: 'DM Mono', weight: 400},
]);
// Dibujar después de la espera, no antes.
await downloadPng(canvas, 'historia.png');
```

`fitText(ctx, text, ancho, tamañoInicial, tamañoMínimo, tamaño => cssFont)` reduce el tamaño hasta que entra. `wrapLines` devuelve hasta N líneas y marca el corte con puntos suspensivos. `fillRound` dibuja un rectángulo redondeado. `canvasPngBlob` permite mostrar el PNG antes de descargarlo. No usar familias genéricas como primera fuente del canvas. Actualizar las copias junto al módulo canónico cuando cambie su API.


# kit/theme.js

Módulo sin dependencias para el toggle claro/oscuro. Se copia en cada proyecto bajo `kit/theme.js`, con el encabezado de procedencia. El tema vive en `[data-tema]` del `<html>` y cada proyecto define sus tokens en `:root[data-tema="oscuro"]`; el módulo no trae CSS ni colores, salvo el `meta theme-color` si se le pasan.

```html
<script src="./kit/theme.js"></script>
<script>
  KitTema.inicial({clave: 'mi-app-tema', colores: {claro: '#f4f1ea', oscuro: '#171410'}, evento: 'mi-app-theme-change'});
  KitTema.montar('#btn-tema');
</script>
```

`inicial` resuelve el tema (preferencia guardada; si no hay, la del sistema), lo aplica antes del primer pintado y devuelve el tema aplicado. `montar` cablea el botón: `aria-pressed`/`aria-label`, click para alternar, persistencia y evento de cambio. `crearBoton()` devuelve el botón 44×44 para proyectos sin SSR. Los cambios del sistema solo se siguen cuando no hay preferencia guardada. Actualizar las copias junto al módulo canónico cuando cambie su API.


# kit/dom.js

Módulo sin dependencias con los helpers DOM que estaban repetidos idénticos en varios proyectos. Se copia en cada proyecto bajo `kit/dom.js`, con el encabezado de procedencia.

```html
<script src="./kit/dom.js"></script>
<script>
  const titulo = KitDom.$('f-titulo');
  salida.innerHTML = `<h1>${KitDom.esc(titulo.value)}</h1>`;
  KitDom.descargarJSON(datos, 'respaldo.json');
</script>
```

`esc(valor)` escapa `& < > " '` para interpolar texto en innerHTML (contenido o atributos); `null`/`undefined` devuelven cadena vacía. `$(id, base?)` es `getElementById` que lanza un error claro si el id no existe. `descargarBlob(blob, nombre)` dispara la descarga y revoca la URL; `descargarJSON(datos, nombre)` serializa con 2 espacios y salto de línea final. Actualizar las copias junto al módulo canónico cuando cambie su API.


# kit/kit-header.js y kit/kit-footer.js

Web components sin dependencias para el header y el footer compartidos. A
diferencia de los otros módulos, NO se copian: se sirven desde
lucasramos.uy/brand/kit/ (como las fuentes), así hay una sola versión viva.

```html
<script src="/brand/kit/kit-header.js" defer></script>
<script src="/brand/kit/kit-footer.js" defer></script>

<kit-header producto="salida" acento="#a5674d" meta="TALLER DE CLASE / 001">
  <button slot="actions" class="header-action" onclick="window.print()">Imprimir hoja ↗</button>
</kit-header>

<kit-footer></kit-footer>
```

`kit-header`: wordmark del producto a la izquierda (minúscula, punto en
`acento`, compuesto en Space Grotesk bold con tracking cerrado), enlazando a
`href` (la raíz por defecto) o con la pill `lucasramos.uy ↗` si lleva `pill`.
El folio mono va en `meta`; las acciones propias de cada sitio van en el slot
`actions` y las estila cada sitio. Tema por atributos: `alto`, `fondo`,
`linea`, `tinta`, `meta-color`. El atributo `sufijo` agrega un tag mono en
versalitas junto al wordmark (por ejemplo `sufijo="ESTUDIO"`). El `meta` se
oculta bajo 560px y el header completo se oculta al imprimir.

Para ajustes finos por sitio, el shadow DOM expone `::part`: `header`,
`brand`, `meta`, `pill` y `sufijo`. Los quirks locales (alto responsive con
breakpoint propio, padding, tracking del wordmark) se escriben como reglas
`kit-header::part(...)` en el CSS del sitio, no como atributos nuevos:

```css
kit-header::part(header){height:68px;padding:0 max(5vw,22px)}
kit-header::part(brand){font-size:24px;font-weight:800;letter-spacing:-.07em}
@media(max-width:800px){kit-header::part(header){height:62px}}
```

`kit-footer`: © año a la izquierda, links a la derecha. Por defecto `©` del
año en curso y Contacto + GitHub; se ajustan con `anio`, `texto` y
`links="Contacto=/contacto/,GitHub=https://github.com/lucasramosuy"`. Tema:
`fondo`, `linea`, `tinta`, `hover`. También se oculta al imprimir. El shadow expone
`::part(footer)`, `::part(texto)` y `::part(links)` para ajustes finos de
padding o tipografía desde el CSS del sitio.

La duplicación que resuelven es conceptual, no de markup idéntico: cada
producto conserva sus acciones, su folio y su paleta vía parámetros.


# kit/kit-masthead.js y kit/kit-rail.js

Variantes de encabezado para sitios cuya cabecera no es la barra estándar.
Mismo modelo que kit-header: se sirven desde lucasramos.uy/brand/kit/ (una
sola versión viva), tema por atributos y ajustes finos por ::part.

```html
<script src="/brand/kit/kit-masthead.js" defer></script>
<kit-masthead producto="foto" producto2="grama" acento="#367263"
  href="https://lucasramos.uy/" etiqueta="Fotograma, ir a lucasramos.uy">
  <span slot="meta" id="issue">UNA FOTO · UNA PALABRA</span>
</kit-masthead>

<script src="/brand/kit/kit-rail.js" defer></script>
<kit-rail producto="qr" acento="#70eac0" eyebrow="ESTUDIO DE CÓDIGOS / 001"
  pie="DISEÑADO EN TU NAVEGADOR|NI CUENTA, NI SERVIDOR, NI COSTO.">
  <h1>...</h1>
</kit-rail>
```

`kit-masthead` (referencia: fotograma): cabecera tipográfica sin barra —
marca en dos pesos (`producto` + `producto2` en peso 400) con punto en
`acento`, y una meta mono a la derecha que va sloteada (`slot="meta"`) para
que el sitio la lea y actualice por id. Sin meta sloteada sirve también como
wordmark de pie. Atributos: `producto`, `producto2`, `href`, `etiqueta`
(aria-label), `titulo` (title), `acento`, `tinta`, `meta-color`, `meta-font`.
Parts: `masthead`, `brand`, `brand2`, `punto`.

`kit-rail` (referencia: qr-studio): rail lateral con logo y punto de acento,
eyebrow, contenido propio sloteado (título, intro, pasos — quedan en el DOM
de la página y los estila el CSS del sitio) y pie editorial pegado abajo.
Atributos: `producto`, `href`, `titulo`, `acento`, `tinta`, `fondo`, `linea`,
`eyebrow`, `eyebrow-color`, `pie` (líneas separadas con `|`), `pie-color`.
Parts: `rail`, `logo`, `punto`, `eyebrow`, `pie`.


# kit/kit-base.css

Base táctil (Apple HIG) para todos los proyectos. Se sirve desde
lucasramos.uy/brand/kit-base.css, junto a `kit-fonts.css`, y no se copia:

```html
<link rel="stylesheet" href="/brand/kit-fonts.css">
<link rel="stylesheet" href="/brand/kit-base.css">
```

Trae tres reglas con especificidad 0 (`:where`), que el sitio puede pisar:
controles de formulario a 16 px en pantallas táctiles (evita el zoom de iOS),
`:focus-visible` con `--kit-foco` y `prefers-reduced-motion`. Los componentes
`kit-header`, `kit-footer`, `kit-rail` y `kit-masthead` resuelven sus propios
targets de 44 px y su foco dentro del shadow DOM, porque un CSS global no les
llega. Reglas completas en BRAND.md, sección 9.

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

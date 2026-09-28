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

# Brand kit — lucasramos.uy

Sistema de identidad visual del dominio y todos sus paths. Todo proyecto nuevo
arranca de acá. Para proyectos existentes, cada cambio de identidad se
propone con el detalle exacto y se aprueba antes de tocarse. Si algo no está
escrito acá, no se inventa: se propone y se agrega.

## 1. Regla de oro

Consistencia por encima de creatividad. Tipografía, tamaños, márgenes, colores
y jerarquía unificados dentro de cada producto, y cada producto fiel a las
reglas de este kit. Nada de defaults del navegador o del vendor visibles.

## 2. Wordmarks

Dos niveles, siempre en minúscula con punto final:

| Marca | Uso | Punto |
|---|---|---|
| `lucas.` | Identidad personal: raíz, /profe, /links, /contacto | Coral `#bb5943` (reservado) |
| `producto.` | Cada producto: `wallpapers.`, `historias.`, `qr.`, `salida.`, `wrapped.`, `simuladores.`, `fotograma.`, `papeles.`, `conexiones.`, `rachas.`, `snake.`, `2048.`, `rebote.`, `panel.` | Acento del producto |

- El coral `#bb5943` es exclusivo de `lucas.`. Ningún producto lo usa.
- `lucas.` siempre enlaza a `/links` (el hub). El wordmark de cada producto
  enlaza a `https://lucasramos.uy/` o muestra la pill `lucasramos.uy ↗`.
- El wordmark se compone en Space Grotesk bold con tracking cerrado.

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
| Sans universal | **Space Grotesk** | Wordmarks, labels, botones, UI de todos los productos |
| Mono | **DM Mono** | Eyebrows, folios, numeración ("01 / CREAR"), metadatos |
| Serif display | Una por familia (tabla abajo) | Titulares con `<em>` de acento |

Serif display por familia:

- Raíz + /contacto: **Instrument Serif** (con Manrope como sans de texto)
- /profe: **Fraunces**
- Normativa + simuladores: **Source Serif 4**
- Estudios (wallpapers, historias, qr, salida): sin serif; el `<em>` del
  titular va en Space Grotesk con `font-style: normal` y color de acento.

## 4. Color

Estructura fija por producto: **base papel + tinta + un acento**.

- Papel: fondo claro cálido o frío (`#fbfaf7`, `#f7f1e6`, `#f4f5f9`...).
- Tinta: casi negro suave (`#141733`, `#241b12`, `#23302b`...).
- Acento: UNO por producto. Vive en el punto del wordmark, CTAs y links,
  nada más. Máximo 2 acentos por producto.
- Modo: **contenido = claro, herramienta/editor = oscuro**.

Acentos actuales:

| Producto | Acento | Base |
|---|---|---|
| `lucas.` (raíz/contacto) | Coral `#bb5943` + cobalto `#2f4fe0` | Fría `#f4f5f9` |
| /profe | Terracota `#c8502e` + mostaza `#e3a72f` | Cálida `#f7f1e6` |
| /links | Clay `#bb5943` | Cálida `#f4f0e9` |
| Normativa | Verde bosque `#176b63` | `#fbfaf7` |
| simuladores. | Clay `#9c4f2f` (cada simulador define su acento por tokens) | `#f4f1ea` |
| wallpapers. | Rosa `#ff568c` + violeta `#5632a7` | Oscura `#0b0b10` |
| historias. | Rosa `#ff4e8f` | Oscura `#0b0910` |
| qr. | Menta `#2ff0be` | Oscura `#152e32` |
| salida. | Arcilla `#9b6c55` | Claro `#f3f1e9` (excepción de modo: herramienta clara) |
| wrapped. | Multi-acento data-viz (excepción registrada) | Oscura `#0f0e15` |
| conexiones. | Vino `#7b2d43` | Cálida `#f7f5ef` |
| rachas. | Melón `#c28b6e` (el mismo acento de “hilo.”) | Papel cálido `#eae8df` + sidebar verde `#253631`; app privada |
| snake. | Teal `#1c756b` | `#f8f7f4` |
| 2048. | Teal `#1c756c` | `#f8f7f4` |
| rebote. | Lima `#c9dc7a` | Oscura `#0b0d0c` |
| panel. | Pizarra `#3d6b8e` (claro) / `#8db5d3` (oscuro) | Papel `#f6f5f1` / oscura `#0f1214`; claro y oscuro de primera clase |

### Tokens de panel.

`panel.` es el panel académico (`/dashboard`). Su acento es un azul grisáceo
"pizarra", distinto del coral de `lucas.`, del verde de Normativa, del teal de
snake./2048. y del cobalto de la raíz. Vive en el punto del wordmark, la palabra
`<em>` de los titulares, los subrayados de enlaces secundarios, la barra de
progreso y el foco. Los botones primarios son tinta sólida, no acento.

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
- Tipografía: Space Grotesk para la interfaz y DM Mono para eyebrows
  numerados ("01 / PENDIENTES"), autoalojadas, nunca fuentes del sistema.
- Wordmark `panel.` en el sidebar (arriba) y centrado en la barra móvil.

## 5. Anatomía y voz

- Header: wordmark a la izquierda, nav a la derecha.
- Eyebrows en DM Mono, mayúsculas, tracking amplio ("01 / CREAR").
- Titular serif (o Grotesk en estudios) con `<em>` en el acento.
- Español rioplatense, voseo, primera persona. Corto, sin relleno.
- Espacio en blanco con intención; sin etiquetas redundantes.

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
     document.fonts.load('700 56px "Space Grotesk"'),
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
2. Wordmark `producto.` con punto en el acento, enlazando al dominio.
3. Space Grotesk + DM Mono self-hosteadas; serif display si aplica.
4. Papel + tinta + acento; modo claro u oscuro según contenido/herramienta.
5. Entrada en /links.
6. Fuentes del sistema solo como fallback final, nunca como fuente visible.
7. Si exporta imágenes (canvas/PNG para compartir), aplicar el patrón de la
   sección 7: fuentes cargadas antes de pintar, nunca genéricas a secas.


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
  navegador). Nunca `outline: none` sin un reemplazo.
- **Movimiento:** `prefers-reduced-motion` respetado. `kit-base.css` lo
  incluye; los juegos con animación esencial lo acotan en su CSS.
- **Texto:** 11 px es el piso para etiquetas mono; 12 px o más para lectura.
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

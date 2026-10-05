import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';

const leer = (nombre) => readFileSync(new URL('../' + nombre, import.meta.url), 'utf8');

test('los componentes del kit dan 44px de toque en táctil y foco visible', () => {
  for (const nombre of ['kit-header.js', 'kit-footer.js', 'kit-rail.js', 'kit-masthead.js']) {
    const src = leer(nombre);
    assert.match(src, /pointer:coarse/, nombre + ': falta la regla táctil');
    assert.match(src, /min-height:44px/, nombre + ': falta min-height:44px');
    assert.match(src, /:focus-visible/, nombre + ': falta :focus-visible');
  }
});

test('kit-footer: hover solo con puntero que lo soporta', () => {
  const src = leer('kit-footer.js');
  assert.match(src, /@media\(hover:hover\)\{a:hover/);
  assert.doesNotMatch(src, /\n\s*a:hover\{/);
});

test('kit-base.css: inputs a 16px en táctil, foco y reduced-motion', () => {
  const css = leer('kit-base.css');
  assert.match(css, /@media \(pointer: coarse\)[\s\S]*font-size: 16px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});


test('tema oscuro: los componentes leen los tokens --kit-* y kit-base los define', () => {
  const css = leer('kit-base.css');
  assert.match(css, /:root\[data-tema="oscuro"\]\s*\{[^}]*--kit-fondo/);
  assert.match(css, /:root\[data-tema="oscuro"\]\s*\{[^}]*--kit-tinta/);
  assert.match(css, /\.tema-pill/);
  assert.match(css, /min-height: 44px/);
  for (const [nombre, token] of [['kit-header.js', '--kit-fondo'], ['kit-footer.js', '--kit-fondo'], ['kit-masthead.js', '--kit-tinta']]) {
    assert.match(leer(nombre), new RegExp('var\\(' + token), nombre + ': no lee ' + token);
  }
});

test('tema oscuro: el atributo explícito sigue ganando sobre el token', () => {
  assert.match(leer('kit-header.js'), /var\(--kh-fondo,var\(--kit-fondo,/);
  assert.match(leer('kit-footer.js'), /var\(--kf-fondo,var\(--kit-fondo,/);
});

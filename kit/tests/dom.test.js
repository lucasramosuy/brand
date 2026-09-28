import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const src = readFileSync(new URL('../dom.js', import.meta.url), 'utf8');

/* Navegador mínimo: document con getElementById y createElement('a'),
   URL.createObjectURL/revokeObjectURL que registran las descargas. */
function entorno({elementos = {}} = {}) {
  const descargas = [];
  const revocadas = [];
  const ctx = vm.createContext({
    document: {
      getElementById: (id) => elementos[id] || null,
      createElement: (tag) => ({
        tag,
        href: '',
        download: '',
        click() { descargas.push({href: this.href, nombre: this.download}); },
      }),
    },
    URL: {
      n: 0,
      createObjectURL(blob) { this.n += 1; return `blob:fake-${this.n}`; },
      revokeObjectURL(url) { revocadas.push(url); },
    },
    Blob,
  });
  vm.runInContext(src, ctx);
  return {KitDom: ctx.KitDom, descargas, revocadas};
}

test('esc escapa los cinco caracteres de HTML', () => {
  const {KitDom} = entorno();
  assert.equal(KitDom.esc(`a&b<c>d"e'f`), 'a&amp;b&lt;c&gt;d&quot;e&#39;f');
});

test('esc tolera null, undefined y números', () => {
  const {KitDom} = entorno();
  assert.equal(KitDom.esc(null), '');
  assert.equal(KitDom.esc(undefined), '');
  assert.equal(KitDom.esc(42), '42');
  assert.equal(KitDom.esc(''), '');
});

test('$ devuelve el elemento por id', () => {
  const el = {id: 'f-titulo'};
  const {KitDom} = entorno({elementos: {'f-titulo': el}});
  assert.equal(KitDom.$('f-titulo'), el);
});

test('$ falla en voz alta si el id no existe', () => {
  const {KitDom} = entorno();
  assert.throws(() => KitDom.$('fantasma'), /#fantasma no encontrado/);
});

test('$ acepta una base alternativa', () => {
  const el = {id: 'interno'};
  const base = {getElementById: (id) => (id === 'interno' ? el : null)};
  const {KitDom} = entorno();
  assert.equal(KitDom.$('interno', base), el);
  assert.throws(() => KitDom.$('otro', base), /#otro no encontrado/);
});

test('descargarBlob dispara la descarga y revoca la URL', () => {
  const {KitDom, descargas, revocadas} = entorno();
  const blob = new Blob(['hola'], {type: 'text/plain'});
  KitDom.descargarBlob(blob, 'nota.txt');
  assert.equal(descargas.length, 1);
  assert.equal(descargas[0].href, 'blob:fake-1');
  assert.equal(descargas[0].nombre, 'nota.txt');
  assert.deepEqual(revocadas, ['blob:fake-1']);
});

test('descargarJSON serializa con 2 espacios y salto final', () => {
  const descargas = [];
  let visto = null;
  class BlobEspia extends Blob {
    constructor(partes, opciones) { super(partes, opciones); visto = {partes, opciones}; }
  }
  const ctx = vm.createContext({
    document: {
      getElementById: () => null,
      createElement: () => ({href: '', download: '', click() { descargas.push(this.download); }}),
    },
    URL: {createObjectURL: () => 'blob:x', revokeObjectURL() {}},
    Blob: BlobEspia,
  });
  vm.runInContext(src, ctx);
  ctx.KitDom.descargarJSON({a: 1, b: [2]}, 'datos.json');
  assert.equal(visto.partes[0], '{\n  "a": 1,\n  "b": [\n    2\n  ]\n}\n');
  assert.equal(visto.opciones.type, 'application/json');
  assert.deepEqual(descargas, ['datos.json']);
});

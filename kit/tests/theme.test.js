import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const src = readFileSync(new URL('../theme.js', import.meta.url), 'utf8');

/* Navegador mínimo: document con dataset, meta theme-color, un botón y
   localStorage en memoria. */
function entorno({guardado = null, mediaOscuro = false} = {}) {
  const eventos = [];
  const meta = {attrs: {}, setAttribute(k, v) { this.attrs[k] = v; }, getAttribute(k) { return this.attrs[k]; }};
  const boton = {
    attrs: {}, clickListener: null,
    setAttribute(k, v) { this.attrs[k] = v; },
    addEventListener(t, f) { if (t === 'click') this.clickListener = f; },
  };
  const documentElement = {dataset: {}};
  const mediaListeners = [];
  const ctx = vm.createContext({
    document: {
      documentElement,
      readyState: 'complete',
      querySelector: (s) => (s === '#btn-tema' ? boton : s.includes('theme-color') ? meta : null),
      addEventListener() {},
      dispatchEvent: (e) => { eventos.push(e.type); return true; },
      createElement: () => ({attrs: {}, children: [], className: '', id: '', type: '', textContent: '',
        setAttribute(k, v) { this.attrs[k] = v; }, append(...xs) { this.children.push(...xs); }}),
    },
    localStorage: {
      v: guardado,
      getItem() { return this.v; },
      setItem(k, x) { this.v = x; },
    },
    matchMedia: () => ({matches: mediaOscuro, addEventListener: (t, f) => mediaListeners.push(f)}),
    Event: class { constructor(type) { this.type = type; } },
  });
  vm.runInContext(src, ctx);
  return {KitTema: ctx.KitTema, documentElement, meta, boton, eventos, mediaListeners, ctx};
}

const OP = {clave: 'tema-test', colores: {claro: '#fff', oscuro: '#000'}, evento: 'tema-cambio'};

test('inicial aplica la preferencia guardada y devuelve el tema', () => {
  const {KitTema, documentElement, meta} = entorno({guardado: 'oscuro'});
  const tema = KitTema.inicial(OP);
  assert.equal(tema, 'oscuro');
  assert.equal(documentElement.dataset.tema, 'oscuro');
  assert.equal(meta.attrs.content, '#000');
});

test('sin preferencia guardada sigue al sistema', () => {
  const {KitTema, documentElement} = entorno({mediaOscuro: true});
  assert.equal(KitTema.inicial(OP), 'oscuro');
  const claro = entorno({mediaOscuro: false});
  assert.equal(claro.KitTema.inicial(OP), 'claro');
  assert.equal(claro.documentElement.dataset.tema, 'claro');
});

test('click alterna tema, persiste, actualiza aria y avisa', () => {
  const e = entorno({guardado: 'claro'});
  e.KitTema.inicial(OP);
  e.KitTema.montar('#btn-tema');
  assert.equal(e.boton.attrs['aria-pressed'], 'false');
  e.boton.clickListener();
  assert.equal(e.documentElement.dataset.tema, 'oscuro');
  assert.equal(e.boton.attrs['aria-pressed'], 'true');
  assert.equal(e.boton.attrs['aria-label'], 'Activar tema claro');
  assert.deepEqual(e.eventos, ['tema-cambio']);
  e.boton.clickListener();
  assert.equal(e.documentElement.dataset.tema, 'claro');
});

test('cambio del sistema solo aplica si no hay preferencia guardada', () => {
  const libre = entorno({mediaOscuro: false});
  libre.KitTema.inicial(OP);
  libre.mediaListeners[0]();
  assert.equal(libre.documentElement.dataset.tema, 'claro');
  assert.deepEqual(libre.eventos, ['tema-cambio']);

  const fijo = entorno({guardado: 'claro', mediaOscuro: true});
  fijo.KitTema.inicial(OP);
  fijo.mediaListeners[0]();
  assert.equal(fijo.documentElement.dataset.tema, 'claro');
  assert.deepEqual(fijo.eventos, []);
});

test('crearBoton arma el botón 44x44 con los spans del kit', () => {
  const {KitTema} = entorno();
  const b = KitTema.crearBoton();
  assert.equal(b.className, 'tema-pill');
  assert.equal(b.id, 'btn-tema');
  assert.equal(b.children.length, 2);
  assert.equal(b.children[0].className, 't-sol');
  assert.equal(b.children[1].className, 't-luna');
});

test('inicial exige clave de almacenamiento', () => {
  const {KitTema} = entorno();
  assert.throws(() => KitTema.inicial({}), /clave/);
});

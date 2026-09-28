import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {fitText, wrapLines, fillRound, loadExportFonts, canvasPngBlob} from '../share.js';
const ctx={font:'',measureText(s){return {width:s.length*10}},beginPath(){},roundRect(){},fill(){}};
test('ajusta tamaño y corta líneas sin perder el aviso',()=>{
 assert.equal(fitText(ctx,'largo',30,20,12,size=>`${size}px Fuente`),12);
 assert.deepEqual(wrapLines(ctx,'uno dos tres cuatro',80,2),['uno dos','tres…']);
});
test('espera una fuente declarada y rechaza una ausente',async()=>{
 globalThis.document={fonts:{load:async()=>[{}],check:()=>true,ready:Promise.resolve()}};
 await loadExportFonts([{family:'Space Grotesk',weight:700}]);
 document.fonts.load=async()=>[];
 await assert.rejects(loadExportFonts([{family:'Ausente'}]),/Falta la fuente/);
 delete globalThis.document;
});
test('canvas y color',async()=>{
 fillRound(ctx,0,0,20,20,4,'red');assert.equal(ctx.fillStyle,'red');
 await assert.rejects(canvasPngBlob({toBlob(cb){cb(null)}}),/PNG/);
});

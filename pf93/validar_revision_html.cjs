const fs = require('fs');
const vm = require('vm');
const path = require('path');

const file = path.join(__dirname, 'revision.html');
const html = fs.readFileSync(file, 'utf8');
const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

expect(/^<!doctype html>/i.test(html.trim()), 'Falta doctype HTML');
expect(/<html\b[^>]*lang="es-CL"/i.test(html), 'Falta lang=es-CL');
expect(/<meta\b[^>]*name="viewport"/i.test(html), 'Falta meta viewport');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const seen = new Set();
for (const id of ids) { if (seen.has(id)) errors.push(`ID HTML duplicado: ${id}`); seen.add(id); }
const requiredIds = ['setup','track','mode','pool','topic','reviewState','search','start','session','question','options','reviewBox','rvJuridico','rvFuente','rvRedaccion','rvDistractores','rvDificultad','rvDecision','saveReview','applySuggestion','approveProduction','summary','funnel','coverage'];
for (const id of requiredIds) expect(seen.has(id), `Falta control requerido #${id}`);

const localScripts = [...html.matchAll(/<script\s+src="([^"]+)"\s*><\/script>/gi)].map(m => m[1]);
for (const src of localScripts) expect(fs.existsSync(path.join(__dirname, src)), `Script local inexistente: ${src}`);
expect(localScripts.includes('revision-workflow.js'), 'revision.html debe cargar revision-workflow.js');
expect(localScripts.includes('ajustes-l4.js'), 'revision.html debe cargar ajustes-l4.js');
expect(localScripts.includes('ajustes-l5.js'), 'revision.html debe cargar ajustes-l5.js');
expect(localScripts.includes('ajustes-l6.js'), 'revision.html debe cargar ajustes-l6.js');
const idxWorkflow=localScripts.indexOf('revision-workflow.js'),idxL4=localScripts.indexOf('ajustes-l4.js'),idxL5=localScripts.indexOf('ajustes-l5.js'),idxL6=localScripts.indexOf('ajustes-l6.js');
expect(idxL4 > idxWorkflow, 'ajustes-l4.js debe ejecutarse después de revision-workflow.js');
expect(idxL5 > idxL4, 'ajustes-l5.js debe ejecutarse después de ajustes-l4.js');
expect(idxL6 > idxL5, 'ajustes-l6.js debe ejecutarse después de ajustes-l5.js');

const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
expect(inline.length >= 1, 'No se encontró JavaScript inline');
for (let i = 0; i < inline.length; i++) { try { new vm.Script(inline[i], { filename: `revision-inline-${i + 1}.js` }); } catch (err) { errors.push(`JS inline ${i + 1}: ${err.message}`); } }
expect(/aprobada_produccion/.test(html), 'La interfaz no expone estado de producción');
expect(/Fuente orientativa NO verificada/.test(html), 'Falta advertencia explícita de fuente no verificada en feedback');
expect(/20 respuestas/.test(html), 'Falta explicación visible del umbral interno de calibración');
console.log(JSON.stringify({ ids: ids.length, localScripts, inlineBlocks: inline.length, errorCount: errors.length, errors }, null, 2));
if (errors.length) process.exit(1);

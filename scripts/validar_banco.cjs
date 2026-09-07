const fs = require('fs');
const vm = require('vm');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '..', 'preguntas.js'), 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.__bank = preguntas_banco; globalThis.__version = BANCO_VERSION; globalThis.__hash = BANCO_HASH;`, context, { filename: 'preguntas.js' });

const bank = context.__bank;
const active = bank.filter(q => !['bloqueada', 'retirada'].includes(q.estado));
const ids = new Set(bank.map(q => q.id));
const invalid = bank.filter(q => !q.id || !q.pregunta || !Array.isArray(q.opciones) || q.opciones.length !== 4 || !Number.isInteger(q.respuesta) || q.respuesta < 0 || q.respuesta > 3 || q.opciones.some(o => !o || !o.id || !String(o.text).trim()));
const truncatedActive = active.filter(q => /\.\.\.|…/.test([q.pregunta, ...q.opciones.map(o => o.text)].join(' ')));

if (ids.size !== bank.length || invalid.length || truncatedActive.length) {
  console.error(JSON.stringify({ ids: ids.size, total: bank.length, invalid: invalid.map(q => q.id), truncatedActive: truncatedActive.map(q => q.id) }, null, 2));
  process.exit(1);
}

const byState = bank.reduce((acc, q) => { acc[q.estado] = (acc[q.estado] || 0) + 1; return acc; }, {});
console.log(JSON.stringify({ version: context.__version, hash: context.__hash, total: bank.length, active: active.length, byState }, null, 2));

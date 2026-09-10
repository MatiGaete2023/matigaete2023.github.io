const fs = require('fs');
const vm = require('vm');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'revision-workflow.js'), 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(src + '\n;globalThis.__wf = PF93_REVIEW_WORKFLOW;', context, { filename: 'revision-workflow.js' });
const wf = context.__wf;
const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

expect(wf && typeof wf === 'object', 'Workflow no exportado');
expect(wf.SCHEMA_VERSION === 2, 'Schema de revisión debe ser 2');
expect(Array.isArray(wf.OPTIONS.decision), 'Falta catálogo de decisiones');
const requiredStates = ['revision_humana','corregir_editorial','verificar_juridicamente','aprobada_juridicamente','calibracion','aprobada_produccion','retirada'];
for (const state of requiredStates) expect(wf.OPTIONS.decision.includes(state), `Falta estado ${state}`);

const base = wf.emptyReview();
expect(wf.suggestedDecision(base) === 'verificar_juridicamente', 'Una revisión vacía debe requerir verificación jurídica');
expect(wf.suggestedDecision({ ...base, juridico: 'incorrecto' }) === 'retirada', 'Contenido incorrecto debe sugerir retirada');
expect(wf.suggestedDecision({ ...base, juridico: 'correcto', fuente: 'verificada', redaccion: 'corregir', distractores: 'aptos' }) === 'corregir_editorial', 'Problema editorial debe sugerir corrección');
const legalOk = { ...base, juridico: 'correcto', fuente: 'verificada', redaccion: 'apta', distractores: 'aptos', dificultad: 'adecuada' };
expect(wf.suggestedDecision(legalOk) === 'aprobada_juridicamente', 'Revisión completa debe sugerir aprobación jurídica');
expect(wf.nextRecommendedDecision(legalOk, { responses: 0 }) === 'calibracion', 'Sin datos, una pregunta jurídicamente aprobable debe ir a calibración');
const tooEasy = wf.productionGate(legalOk, { responses: 20, accuracy: 0.95 });
expect(!tooEasy.eligible, 'Una pregunta con 95% de acierto debe quedar en alerta de calibración');
const eligible = wf.productionGate(legalOk, { responses: 20, accuracy: 0.60 });
expect(eligible.eligible, 'Pregunta completa y calibrada debería ser elegible para producción');
expect(wf.nextRecommendedDecision(legalOk, { responses: 20, accuracy: 0.60 }) === 'aprobada_produccion', 'Pregunta calibrada debería sugerir producción');

const metrics = wf.metricsFromHistory([{ answers: [
  { id: 'q1', correct: true, choice: 2, elapsedMs: 10000 },
  { id: 'q2', correct: null, omitted: true },
] }, { answers: [
  { id: 'q1', correct: false, choice: 1, elapsedMs: 20000 }
] }]);
expect(metrics.q1.responses === 2, 'Métricas: respuestas q1');
expect(metrics.q1.correct === 1, 'Métricas: correctas q1');
expect(metrics.q1.accuracy === 0.5, 'Métricas: accuracy q1');
expect(metrics.q1.avgMs === 15000, 'Métricas: tiempo medio q1');
expect(metrics.q2.omitted === 1, 'Métricas: omisión q2');

console.log(JSON.stringify({ schema: wf.SCHEMA_VERSION, states: wf.OPTIONS.decision, tests: errors.length ? 'failed' : 'ok', errors }, null, 2));
if (errors.length) process.exit(1);

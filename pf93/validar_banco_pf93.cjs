const fs = require('fs');
const vm = require('vm');
const path = require('path');

const files = ['blueprint.js','banco-comun.js','banco-civil.js','banco-penal.js','banco-familia.js','banco-laboral.js','revision-workflow.js'];
const context = { console };
vm.createContext(context);
for (const file of files) {
  const src = fs.readFileSync(path.join(__dirname, file), 'utf8');
  vm.runInContext(src, context, { filename: file });
}
vm.runInContext(`globalThis.__bp=PF93_BLUEPRINT;
globalThis.__bank=[...PF93_DRAFT_COMMON,...PF93_DRAFT_CIVIL,...PF93_DRAFT_PENAL,...PF93_DRAFT_FAMILIA,...PF93_DRAFT_LABORAL];
globalThis.__workflow=PF93_REVIEW_WORKFLOW;`, context);
const bp = context.__bp;
const bank = context.__bank;
const workflow = context.__workflow;

const errors=[]; const warnings=[];
const expect=(ok,msg)=>{ if(!ok) errors.push(msg); };
expect(bp.length===109,`Blueprint: ${bp.length} temas; esperado 109`);
expect(bp.reduce((n,t)=>n+t.cupo,0)===451,'Blueprint: cupos no suman 451');
expect(bank.length===451,`Banco: ${bank.length} preguntas; esperado 451`);
expect(workflow && workflow.appliedL1===8,`Ajustes L1 aplicados: ${workflow?.appliedL1}; esperado 8`);
expect(workflow && Object.keys(workflow.L1_OVERRIDES||{}).length===8,'El catálogo L1 debe contener 8 reemplazos trazables');

const ids=new Set(); const stems=new Map(); const byTopic={}; const answerDist=[0,0,0,0];
let l1Count=0;
for (const q of bank) {
  expect(q && typeof q==='object','Registro inválido');
  if(!q) continue;
  expect(typeof q.id==='string' && q.id.length>5,`ID inválido: ${q.id}`);
  expect(!ids.has(q.id),`ID duplicado: ${q.id}`); ids.add(q.id);
  expect(typeof q.temaPF93==='string',`${q.id}: falta temaPF93`);
  expect(typeof q.pregunta==='string' && q.pregunta.trim().length>=25,`${q.id}: enunciado demasiado corto`);
  expect(Array.isArray(q.opciones) && q.opciones.length===4,`${q.id}: debe tener 4 opciones`);
  expect(Number.isInteger(q.respuesta) && q.respuesta>=0 && q.respuesta<4,`${q.id}: respuesta fuera de rango`);
  expect(q.estado==='revision_humana',`${q.id}: estado inesperado ${q.estado}`);
  expect(q.fuente && q.fuente.verificada===false,`${q.id}: la rama de revisión no debe fingir fuente verificada`);
  if(q.revisionOrigen==='AUDITORIA_COMUN_L1') l1Count++;
  if (q.opciones?.length===4) {
    const texts=q.opciones.map(o=>String(o.text||'').trim());
    expect(texts.every(Boolean),`${q.id}: alternativa vacía`);
    expect(new Set(texts.map(x=>x.toLocaleLowerCase('es-CL'))).size===4,`${q.id}: alternativas duplicadas`);
    if(Number.isInteger(q.respuesta)&&q.respuesta>=0&&q.respuesta<4) answerDist[q.respuesta]++;
    const lens=texts.map(x=>x.length), corr=lens[q.respuesta], avgWrong=(lens.reduce((a,b)=>a+b,0)-corr)/3;
    if (corr > avgWrong*1.9 && corr-avgWrong>40) warnings.push(`${q.id}: clave considerablemente más larga que distractores`);
  }
  const norm=String(q.pregunta||'').toLocaleLowerCase('es-CL').replace(/[^a-záéíóúüñ0-9]+/g,' ').trim();
  if(stems.has(norm)) errors.push(`${q.id}: enunciado duplicado con ${stems.get(norm)}`); else stems.set(norm,q.id);
  byTopic[q.temaPF93]=(byTopic[q.temaPF93]||0)+1;
}
expect(l1Count===8,`Registros del pool marcados AUDITORIA_COMUN_L1: ${l1Count}; esperado 8`);

const bpIds=new Set(bp.map(t=>t.id));
for(const q of bank) expect(bpIds.has(q.temaPF93),`${q.id}: tema fuera del blueprint ${q.temaPF93}`);
for(const t of bp) expect((byTopic[t.id]||0)===t.cupo,`${t.id}: ${(byTopic[t.id]||0)} preguntas; cupo esperado ${t.cupo}`);

const codeExpected={DCO:36,DAD:28,DPO:20,DCI:54,DPC:43,DPP:54,DPE:56,DFA:42,DPFA:32,DLA:62,DPL:24};
const codeActual={};
for(const q of bank){const c=q.temaPF93.split('-')[0];codeActual[c]=(codeActual[c]||0)+1;}
for(const [c,n] of Object.entries(codeExpected)) expect(codeActual[c]===n,`${c}: ${codeActual[c]||0}; esperado ${n}`);

const trackTotals={comun:0,civil:0,penal:0,familia:0,laboral:0};
for(const t of bp) trackTotals[t.track]+=t.cupo;
expect(trackTotals.comun===84,'Común debe sumar 84');
expect(trackTotals.civil===97,'Civil debe sumar 97');
expect(trackTotals.penal===110,'Penal debe sumar 110');
expect(trackTotals.familia===74,'Familia debe sumar 74');
expect(trackTotals.laboral===86,'Laboral debe sumar 86');

const max=Math.max(...answerDist), min=Math.min(...answerDist);
if(max-min>8) warnings.push(`Distribución de claves desigual: ${answerDist.join('/')}`);

const result={version:context.PF93_BLUEPRINT_VERSION,topics:bp.length,total:bank.length,l1Overrides:l1Count,byCode:codeActual,byTrack:trackTotals,answerDistribution:{A:answerDist[0],B:answerDist[1],C:answerDist[2],D:answerDist[3]},warnings:warnings.slice(0,50),warningCount:warnings.length,errorCount:errors.length,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exit(1);

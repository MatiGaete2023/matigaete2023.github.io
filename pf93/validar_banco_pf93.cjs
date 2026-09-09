const fs = require('fs');
const vm = require('vm');
const path = require('path');

const files = ['blueprint.js','banco-comun.js','banco-civil.js','banco-penal.js','banco-familia.js','banco-laboral.js','revision-workflow.js','ajustes-l4.js','ajustes-l5.js'];
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

const errors=[]; const warnings=[]; const riskCounts={};
const expect=(ok,msg)=>{ if(!ok) errors.push(msg); };
const warn=(type,id,msg)=>{ warnings.push(`${id}: [${type}] ${msg}`); riskCounts[type]=(riskCounts[type]||0)+1; };
expect(bp.length===109,`Blueprint: ${bp.length} temas; esperado 109`);
expect(bp.reduce((n,t)=>n+t.cupo,0)===451,'Blueprint: cupos no suman 451');
expect(bank.length===451,`Banco: ${bank.length} preguntas; esperado 451`);
expect(workflow && workflow.appliedL1===8,`Ajustes L1 aplicados: ${workflow?.appliedL1}; esperado 8`);
expect(workflow && Object.keys(workflow.L1_OVERRIDES||{}).length===8,'El catálogo L1 debe contener 8 reemplazos trazables');
expect(workflow && workflow.appliedL2===8,`Ajustes L2 aplicados: ${workflow?.appliedL2}; esperado 8`);
expect(workflow && Object.keys(workflow.L2_OVERRIDES||{}).length===8,'El catálogo L2 debe contener 8 reemplazos trazables');
expect(workflow && workflow.appliedL3===10,`Ajustes L3 aplicados: ${workflow?.appliedL3}; esperado 10`);
expect(workflow && Object.keys(workflow.L3_OVERRIDES||{}).length===10,'El catálogo L3 debe contener 10 reemplazos trazables');
expect(workflow && workflow.appliedL4===18,`Ajustes L4 aplicados: ${workflow?.appliedL4}; esperado 18`);
expect(workflow && Object.keys(workflow.L4_OVERRIDES||{}).length===18,'El catálogo L4 debe contener 18 reemplazos trazables');
expect(workflow && workflow.appliedL5===18,`Ajustes L5 aplicados: ${workflow?.appliedL5}; esperado 18`);
expect(workflow && Object.keys(workflow.L5_OVERRIDES||{}).length===18,'El catálogo L5 debe contener 18 reemplazos trazables');

const ids=new Set(); const stems=new Map(); const byTopic={}; const answerDist=[0,0,0,0]; const topicItems={};
let l1Count=0,l2Count=0,l3Count=0,l4Count=0,l5Count=0;
const legalCue=/\b(?:art(?:ículo)?\.?|ley|código|inciso|n[°ºo]\s*\d+)\b/i;
const absoluteCue=/\b(?:siempre|nunca|jamás|exclusivamente|automáticamente|sin excepción|en todo caso|cualquier|ninguna?)\b/i;
const metaStem=/\b(?:criterio metodológico|qué debe revisarse|qué debe hacerse|al analizar|antes de calificar|metodológicamente|mejor enfoque de análisis)\b/i;
const normalize=s=>String(s||'').toLocaleLowerCase('es-CL').replace(/[^a-záéíóúüñ0-9]+/g,' ').trim();
const tokenSet=s=>new Set(normalize(s).split(/\s+/).filter(x=>x.length>3));
const jaccard=(a,b)=>{const A=tokenSet(a),B=tokenSet(b);if(!A.size||!B.size)return 0;let inter=0;for(const x of A)if(B.has(x))inter++;return inter/(A.size+B.size-inter);};

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
  if(q.revisionOrigen==='AUDITORIA_COMUN_L2') l2Count++;
  if(q.revisionOrigen==='AUDITORIA_CIVIL_L3') l3Count++;
  if(q.revisionOrigen==='AUDITORIA_PENAL_L4') l4Count++;
  if(q.revisionOrigen==='AUDITORIA_FAMILIA_L5') l5Count++;
  topicItems[q.temaPF93]??=[]; topicItems[q.temaPF93].push(q);

  if (q.opciones?.length===4) {
    const texts=q.opciones.map(o=>String(o.text||'').trim());
    expect(texts.every(Boolean),`${q.id}: alternativa vacía`);
    expect(new Set(texts.map(x=>x.toLocaleLowerCase('es-CL'))).size===4,`${q.id}: alternativas duplicadas`);
    if(Number.isInteger(q.respuesta)&&q.respuesta>=0&&q.respuesta<4) answerDist[q.respuesta]++;
    const lens=texts.map(x=>x.length), corr=lens[q.respuesta], wrong=lens.filter((_,i)=>i!==q.respuesta), avgWrong=wrong.reduce((a,b)=>a+b,0)/3;
    if (corr > avgWrong*1.65 && corr-avgWrong>30) warn('clave_larga',q.id,'la alternativa correcta es considerablemente más larga que los distractores');
    const correctHasCue=legalCue.test(texts[q.respuesta]), wrongCueCount=texts.filter((x,i)=>i!==q.respuesta&&legalCue.test(x)).length;
    if(correctHasCue && wrongCueCount===0) warn('cita_solo_clave',q.id,'sólo la alternativa correcta contiene una señal normativa explícita');
    const wrongAbs=texts.filter((x,i)=>i!==q.respuesta&&absoluteCue.test(x)).length, correctAbs=absoluteCue.test(texts[q.respuesta]);
    if(wrongAbs>=2 && !correctAbs) warn('absolutismos_distractores',q.id,'dos o más distractores usan marcadores categóricos ausentes en la clave');
    const minWrong=Math.min(...wrong);
    if(corr>=45 && minWrong<corr*0.35) warn('distractor_corto',q.id,'al menos un distractor es muy corto frente a la clave');
  }
  if(metaStem.test(q.pregunta)) warn('enunciado_meta',q.id,'el enunciado evalúa metodología de análisis más que una regla o problema jurídico concreto');

  const norm=normalize(q.pregunta);
  if(stems.has(norm)) errors.push(`${q.id}: enunciado duplicado con ${stems.get(norm)}`); else stems.set(norm,q.id);
  byTopic[q.temaPF93]=(byTopic[q.temaPF93]||0)+1;
}
expect(l1Count===8,`Registros del pool marcados AUDITORIA_COMUN_L1: ${l1Count}; esperado 8`);
expect(l2Count===8,`Registros del pool marcados AUDITORIA_COMUN_L2: ${l2Count}; esperado 8`);
expect(l3Count===10,`Registros del pool marcados AUDITORIA_CIVIL_L3: ${l3Count}; esperado 10`);
expect(l4Count===18,`Registros del pool marcados AUDITORIA_PENAL_L4: ${l4Count}; esperado 18`);
expect(l5Count===18,`Registros del pool marcados AUDITORIA_FAMILIA_L5: ${l5Count}; esperado 18`);

for(const [topic,items] of Object.entries(topicItems)){
  for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){
    const sim=jaccard(items[i].pregunta,items[j].pregunta);
    if(sim>=0.78) warn('similitud_tematica',`${items[i].id}/${items[j].id}`,`enunciados del ${topic} tienen similitud léxica ${sim.toFixed(2)}`);
  }
}

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
if(max-min>8) warn('distribucion_claves','BANCO',`distribución desigual: ${answerDist.join('/')}`);

const result={version:context.PF93_BLUEPRINT_VERSION,topics:bp.length,total:bank.length,l1Overrides:l1Count,l2Overrides:l2Count,l3Overrides:l3Count,l4Overrides:l4Count,l5Overrides:l5Count,byCode:codeActual,byTrack:trackTotals,answerDistribution:{A:answerDist[0],B:answerDist[1],C:answerDist[2],D:answerDist[3]},editorialRiskCounts:riskCounts,warnings:warnings.slice(0,100),warningCount:warnings.length,errorCount:errors.length,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exit(1);

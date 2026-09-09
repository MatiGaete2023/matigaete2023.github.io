#!/usr/bin/env node
/* Compilador estricto del banco PF93 de producción.
 * Uso: node pf93/compilar_produccion.cjs revision-pf93.json [salida.js]
 * No modifica los bancos fuente. Rechaza cualquier ítem que no cumpla simultáneamente
 * decisión humana, evidencia de verificación, calibración y triaje editorial limpio.
 */
const fs=require('fs');const vm=require('vm');const path=require('path');

function loadRuntime(){
  const context={console};vm.createContext(context);
  const files=['blueprint.js','banco-comun.js','banco-civil.js','banco-penal.js','banco-familia.js','banco-laboral.js','revision-workflow.js','ajustes-l4.js','calidad-editorial.js'];
  for(const file of files)vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context,{filename:file});
  vm.runInContext(`globalThis.__bank=[...PF93_DRAFT_COMMON,...PF93_DRAFT_CIVIL,...PF93_DRAFT_PENAL,...PF93_DRAFT_FAMILIA,...PF93_DRAFT_LABORAL];globalThis.__bp=PF93_BLUEPRINT;globalThis.__q=PF93_EDITORIAL_QUALITY;`,context);
  return{bank:context.__bank,blueprint:context.__bp,quality:context.__q};
}

function evaluateQuestion(q,review,metrics,quality){
  const reasons=[];const r=review||{},m=metrics||{},ed=quality.analyze(q);
  if(r.decision!=='aprobada_produccion')reasons.push('decisión distinta de aprobada_produccion');
  if(r.juridico!=='correcto')reasons.push('contenido jurídico no correcto');
  if(r.fuente!=='verificada')reasons.push('fuente no verificada');
  if(r.redaccion!=='apta')reasons.push('redacción no apta');
  if(r.distractores!=='aptos')reasons.push('distractores no aptos');
  if(r.dificultad!=='adecuada')reasons.push('dificultad no confirmada como adecuada');
  if(!String(r.revisor||'').trim())reasons.push('falta revisor');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(r.fechaVerificacion||'')))reasons.push('falta fecha de verificación válida');
  if(!String(r.fuenteDetalle||'').trim())reasons.push('falta identificación de fuente/version efectivamente consultada');
  if(!String(r.articuloInciso||'').trim()&&!String(r.criterioInterpretativo||'').trim())reasons.push('falta artículo/inciso o criterio interpretativo identificable');
  if((m.responses||0)<20)reasons.push('menos de 20 respuestas de calibración');
  if(!Number.isFinite(m.accuracy))reasons.push('falta porcentaje de acierto calculable');
  else if(m.accuracy<0.20||m.accuracy>0.90)reasons.push('acierto fuera del rango interno 20%-90%');
  if(ed.score>0)reasons.push(`riesgo editorial pendiente: ${ed.flags.join(', ')}`);
  return{eligible:reasons.length===0,reasons,editorial:ed};
}

function compile(reviewPayload,{requireAllTopics=false}={}){
  const{bank,blueprint,quality}=loadRuntime();
  const reviews=reviewPayload?.reviews||{},metrics=reviewPayload?.metrics||{};
  const accepted=[],rejected=[];
  for(const q of bank){
    const assessment=evaluateQuestion(q,reviews[q.id],metrics[q.id],quality);
    if(!assessment.eligible){rejected.push({id:q.id,temaPF93:q.temaPF93,reasons:assessment.reasons});continue;}
    const r=reviews[q.id];
    accepted.push({...q,estado:'aprobada_produccion',fuente:{...q.fuente,verificada:true,revisadaEn:r.fechaVerificacion,detalleVerificado:r.fuenteDetalle,articuloInciso:r.articuloInciso,criterioInterpretativo:r.criterioInterpretativo||null,revisor:r.revisor},calibracion:{responses:metrics[q.id].responses,accuracy:metrics[q.id].accuracy,avgMs:metrics[q.id].avgMs??null}});
  }
  const byTopic={};for(const q of accepted)byTopic[q.temaPF93]=(byTopic[q.temaPF93]||0)+1;
  const uncovered=blueprint.filter(t=>(byTopic[t.id]||0)===0).map(t=>t.id);
  const underQuota=blueprint.filter(t=>(byTopic[t.id]||0)<t.cupo).map(t=>({id:t.id,accepted:byTopic[t.id]||0,target:t.cupo}));
  const errors=[];if(requireAllTopics&&uncovered.length)errors.push(`Temas sin preguntas de producción: ${uncovered.join(', ')}`);
  return{generatedAt:new Date().toISOString(),totalSource:bank.length,accepted:accepted.length,rejected:rejected.length,uncovered,underQuota,errors,bank:accepted,rejections:rejected};
}

function serialize(result){
  const safe={generatedAt:result.generatedAt,totalSource:result.totalSource,accepted:result.accepted,rejected:result.rejected,uncovered:result.uncovered,underQuota:result.underQuota};
  return `/* Banco PF93 compilado para producción.\n * Generado: ${result.generatedAt}\n * Aceptadas: ${result.accepted}/${result.totalSource}\n * Este archivo deriva de revisión humana + gate editorial + calibración.\n */\nconst PF93_PRODUCTION_META=${JSON.stringify(safe,null,2)};\nconst PF93_PRODUCTION_BANK=${JSON.stringify(result.bank,null,2)};\n`;
}

module.exports={loadRuntime,evaluateQuestion,compile,serialize};

if(require.main===module){
  const input=process.argv[2],output=process.argv[3]||path.join(__dirname,'banco-produccion.js');
  if(!input){console.error('Uso: node pf93/compilar_produccion.cjs revision-pf93.json [salida.js]');process.exit(2);}
  let payload;try{payload=JSON.parse(fs.readFileSync(input,'utf8'));}catch(e){console.error(`No se pudo leer ${input}: ${e.message}`);process.exit(2);}
  const result=compile(payload);
  fs.writeFileSync(output,serialize(result),'utf8');
  console.log(JSON.stringify({output,accepted:result.accepted,rejected:result.rejected,uncovered:result.uncovered.length,underQuota:result.underQuota.length},null,2));
  if(result.accepted===0)console.warn('Advertencia: todavía no existen ítems que superen todos los gates de producción. Esto es esperable antes de la revisión/calibración humana.');
}

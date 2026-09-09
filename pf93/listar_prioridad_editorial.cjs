const fs=require('fs');const vm=require('vm');const path=require('path');
const files=['blueprint.js','banco-comun.js','banco-civil.js','banco-penal.js','banco-familia.js','banco-laboral.js','revision-workflow.js','calidad-editorial.js'];
const context={console};vm.createContext(context);for(const file of files){vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context,{filename:file});}
vm.runInContext(`globalThis.__bank=[...PF93_DRAFT_COMMON,...PF93_DRAFT_CIVIL,...PF93_DRAFT_PENAL,...PF93_DRAFT_FAMILIA,...PF93_DRAFT_LABORAL];globalThis.__quality=PF93_EDITORIAL_QUALITY;`,context);
const bank=context.__bank,Q=context.__quality;const rows=bank.map(q=>({q,r:Q.analyze(q)})).filter(x=>x.r.severity==='alta'||x.r.severity==='critica').map(x=>({id:x.q.id,tema:x.q.temaPF93,codigo:x.q.temaPF93.split('-')[0],score:x.r.score,flags:x.r.flags,pregunta:x.q.pregunta}));
const byCode={};for(const x of rows){byCode[x.codigo]??=[];byCode[x.codigo].push(x);}for(const k of Object.keys(byCode))byCode[k].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
const common=rows.filter(x=>['DCO','DAD','DPO'].includes(x.codigo));const civil=rows.filter(x=>['DCI','DPC'].includes(x.codigo));
console.log(JSON.stringify({total:rows.length,common:common.length,civil:civil.length,byCode},null,2));
if(common.length){console.error('El bloque común aún contiene riesgo alto.');process.exit(1);}
if(civil.length){console.error('La especialidad civil aún contiene riesgo alto.');process.exit(1);}

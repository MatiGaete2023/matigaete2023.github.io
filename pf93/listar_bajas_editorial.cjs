const fs=require('fs');const vm=require('vm');const path=require('path');const{runtimeFiles}=require('./capas-editoriales.cjs');
const context={console};vm.createContext(context);for(const file of runtimeFiles(__dirname,{quality:true}))vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context,{filename:file});
vm.runInContext(`globalThis.__bank=[...PF93_DRAFT_COMMON,...PF93_DRAFT_CIVIL,...PF93_DRAFT_PENAL,...PF93_DRAFT_FAMILIA,...PF93_DRAFT_LABORAL];globalThis.__quality=PF93_EDITORIAL_QUALITY;`,context);
const bank=context.__bank,Q=context.__quality;const rows=bank.map(q=>({q,r:Q.analyze(q)})).filter(x=>x.r.severity==='baja').map(({q,r})=>({id:q.id,tema:q.temaPF93,pregunta:q.pregunta,respuesta:q.respuesta,opciones:q.opciones.map(o=>o.text),flags:r.flags}));
console.log(JSON.stringify({total:rows.length,rows},null,2));

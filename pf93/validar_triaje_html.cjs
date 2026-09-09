const fs=require('fs');
const vm=require('vm');
const path=require('path');

const html=fs.readFileSync(path.join(__dirname,'triaje.html'),'utf8');
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

expect(/^<!doctype html>/i.test(html.trim()),'Falta doctype');
expect(/lang="es-CL"/i.test(html),'Falta lang es-CL');
expect(/name="viewport"/i.test(html),'Falta viewport');

const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const seen=new Set();
for(const id of ids){if(seen.has(id))errors.push(`ID duplicado: ${id}`);seen.add(id)}
for(const id of ['total','clean','flagged','high','visible','code','severity','flag','search','export','copyVisible','rows'])expect(seen.has(id),`Falta #${id}`);

const scripts=[...html.matchAll(/<script\s+src="([^"]+)"\s*><\/script>/gi)].map(m=>m[1]);
for(const src of scripts)expect(fs.existsSync(path.join(__dirname,src)),`Script inexistente: ${src}`);
expect(scripts.includes('revision-workflow.js'),'Falta workflow efectivo');
expect(scripts.includes('ajustes-l4.js'),'Falta capa penal ajustes-l4.js');
expect(scripts.includes('ajustes-l5.js'),'Falta capa familia ajustes-l5.js');
expect(scripts.includes('ajustes-l6.js'),'Falta capa laboral ajustes-l6.js');
expect(scripts.includes('calidad-editorial.js'),'Falta motor calidad-editorial.js');
const idxWorkflow=scripts.indexOf('revision-workflow.js');
const idxL4=scripts.indexOf('ajustes-l4.js');
const idxL5=scripts.indexOf('ajustes-l5.js');
const idxL6=scripts.indexOf('ajustes-l6.js');
const idxQuality=scripts.indexOf('calidad-editorial.js');
expect(idxWorkflow>=0&&idxL4>idxWorkflow,'ajustes-l4.js debe cargarse después de revision-workflow.js');
expect(idxL5>idxL4,'ajustes-l5.js debe cargarse después de ajustes-l4.js');
expect(idxL6>idxL5,'ajustes-l6.js debe cargarse después de ajustes-l5.js');
expect(idxQuality>idxL6,'calidad-editorial.js debe cargarse después de aplicar ajustes-l6.js');

const inline=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
for(let i=0;i<inline.length;i++){
  try{new vm.Script(inline[i],{filename:`triaje-inline-${i+1}.js`})}
  catch(e){errors.push(`JS inline ${i+1}: ${e.message}`)}
}

console.log(JSON.stringify({ids:ids.length,localScripts:scripts,inlineBlocks:inline.length,errorCount:errors.length,errors},null,2));
if(errors.length)process.exit(1);

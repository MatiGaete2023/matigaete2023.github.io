const fs=require('fs');
const vm=require('vm');
const path=require('path');
const {listEditorialLayers}=require('./capas-editoriales.cjs');

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
expect(scripts.includes('calidad-editorial.js'),'Falta motor calidad-editorial.js');

const layers=listEditorialLayers(__dirname);
const idxWorkflow=scripts.indexOf('revision-workflow.js');
let previous=idxWorkflow;
for(const layer of layers){
  const count=scripts.filter(src=>src===layer).length;
  const idx=scripts.indexOf(layer);
  expect(count===1,`triaje.html debe cargar exactamente una vez ${layer}`);
  expect(idx>previous,`${layer} debe ejecutarse después de ${previous===idxWorkflow?'revision-workflow.js':layers[layers.indexOf(layer)-1]}`);
  previous=idx;
}
const idxQuality=scripts.indexOf('calidad-editorial.js');
expect(idxQuality>previous,'calidad-editorial.js debe cargarse después de todas las capas editoriales');

const inline=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
for(let i=0;i<inline.length;i++){
  try{new vm.Script(inline[i],{filename:`triaje-inline-${i+1}.js`})}
  catch(e){errors.push(`JS inline ${i+1}: ${e.message}`)}
}

console.log(JSON.stringify({ids:ids.length,localScripts:scripts,editorialLayers:layers,inlineBlocks:inline.length,errorCount:errors.length,errors},null,2));
if(errors.length)process.exit(1);

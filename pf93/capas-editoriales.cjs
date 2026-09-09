const fs=require('fs');const path=require('path');
function layerNumber(name){const m=name.match(/^ajustes-l(\d+)([a-z]*)\.js$/i);if(!m)return[Number.MAX_SAFE_INTEGER,''];return[Number(m[1]),m[2].toLowerCase()];}
function listEditorialLayers(dir=__dirname){return fs.readdirSync(dir).filter(x=>/^ajustes-l\d+[a-z]*\.js$/i.test(x)).sort((a,b)=>{const A=layerNumber(a),B=layerNumber(b);return A[0]-B[0]||A[1].localeCompare(B[1]);});}
function runtimeFiles(dir=__dirname,{quality=false}={}){const base=['blueprint.js','banco-comun.js','banco-civil.js','banco-penal.js','banco-familia.js','banco-laboral.js','revision-workflow.js',...listEditorialLayers(dir)];if(quality)base.push('calidad-editorial.js');return base;}
module.exports={listEditorialLayers,runtimeFiles};

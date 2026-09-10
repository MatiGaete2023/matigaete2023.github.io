const fs=require('fs');
const path=require('path');

const ROOT=path.resolve(__dirname,'..');
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

const live=[
  'README.md',
  'DOCUMENTACION.md',
  'ESTADO_PROYECTO.md',
  'ARQUITECTURA.md',
  'WORKFLOW_REVISION.md',
  'CALIDAD_EDITORIAL.md',
  'PAQUETE_REVISION_HUMANA.md'
];
const audits=['AUDITORIA_COMUN_L1.md','PREAUDITORIA_JURIDICA_L1.md'];

for(const file of [...live,...audits]){
  expect(fs.existsSync(path.join(__dirname,file)),`Falta pf93/${file}`);
}
expect(fs.existsSync(path.join(ROOT,'README.md')),'Falta README.md en la raíz');
expect(fs.existsSync(path.join(ROOT,'INFORME_SIMULADOR_JURIDICO.md')),'Falta informe histórico de la raíz');

function validateLocalLinks(file){
  const full=path.join(__dirname,file);
  if(!fs.existsSync(full))return;
  const text=fs.readFileSync(full,'utf8');
  const re=/\[[^\]]*\]\(([^)]+)\)/g;
  for(const m of text.matchAll(re)){
    let target=m[1].trim();
    if(!target||/^(?:https?:|mailto:|#)/i.test(target))continue;
    target=target.split('#')[0].split('?')[0];
    if(!target)continue;
    const resolved=path.resolve(path.dirname(full),target);
    expect(fs.existsSync(resolved),`${file}: enlace local no resuelve: ${m[1]}`);
  }
}
for(const file of live)validateLocalLinks(file);
validateLocalLinks('AUDITORIA_COMUN_L1.md');
validateLocalLinks('PREAUDITORIA_JURIDICA_L1.md');

const status=fs.existsSync(path.join(__dirname,'ESTADO_PROYECTO.md'))?fs.readFileSync(path.join(__dirname,'ESTADO_PROYECTO.md'),'utf8'):'';
for(const marker of ['**109**','**451**','A 113 / B 113 / C 113 / D 112','**183**','**268**']){
  expect(status.includes(marker),`ESTADO_PROYECTO.md no contiene marcador vigente: ${marker}`);
}

const quality=fs.existsSync(path.join(__dirname,'CALIDAD_EDITORIAL.md'))?fs.readFileSync(path.join(__dirname,'CALIDAD_EDITORIAL.md'),'utf8'):'';
expect(quality.includes('sin alertas: **451**'),'CALIDAD_EDITORIAL.md no refleja 451 preguntas limpias');
expect(quality.includes('referencia histórica'),'CALIDAD_EDITORIAL.md debe distinguir la línea base histórica');

const legacy=fs.existsSync(path.join(ROOT,'INFORME_SIMULADOR_JURIDICO.md'))?fs.readFileSync(path.join(ROOT,'INFORME_SIMULADOR_JURIDICO.md'),'utf8'):'';
expect(legacy.includes('DOCUMENTO HISTÓRICO'),'El informe de raíz debe estar identificado como histórico');

const result={requiredLiveDocs:live.length,auditDocs:audits.length,tests:errors.length?'failed':'ok',errorCount:errors.length,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exit(1);

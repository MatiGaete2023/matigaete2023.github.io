const {loadRuntime,evaluateQuestion,compile,serialize}=require('./compilar_produccion.cjs');
const {bank,quality}=loadRuntime();
const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

const clean=bank.find(q=>quality.analyze(q).score===0);
expect(!!clean,'Debe existir al menos una pregunta sin alertas heurísticas para probar el compilador');
if(clean){
  const review={
    juridico:'correcto',fuente:'verificada',redaccion:'apta',distractores:'aptos',dificultad:'adecuada',decision:'aprobada_produccion',
    revisor:'TEST-CI',fechaVerificacion:'2026-09-09',fuenteDetalle:'Fuente primaria vigente de prueba CI',articuloInciso:'artículo identificado de prueba',criterioInterpretativo:'',nota:''
  };
  const metrics={responses:25,accuracy:0.60,avgMs:24000};
  const good=evaluateQuestion(clean,review,metrics,quality);
  expect(good.eligible,`El caso sintético completo debería ser elegible: ${good.reasons.join('; ')}`);

  const payload={reviews:{[clean.id]:review},metrics:{[clean.id]:metrics}};
  const result=compile(payload);
  expect(result.accepted===1,`Compilación sintética debe aceptar 1; aceptó ${result.accepted}`);
  expect(result.bank.length===1,'El banco compilado debe contener exactamente un registro');
  expect(result.bank[0]?.id===clean.id,'La pregunta aceptada no coincide con la seleccionada');
  expect(result.bank[0]?.estado==='aprobada_produccion','La salida debe marcar estado de producción');
  expect(result.bank[0]?.fuente?.verificada===true,'Sólo la salida compilada debe materializar fuente verificada tras evidencia humana');
  expect(result.bank[0]?.fuente?.revisor==='TEST-CI','La salida debe conservar trazabilidad del revisor');
  expect(/PF93_PRODUCTION_BANK/.test(serialize(result)),'La serialización debe exponer PF93_PRODUCTION_BANK');

  const noSource=evaluateQuestion(clean,{...review,fuente:'pendiente'},metrics,quality);
  expect(!noSource.eligible&&noSource.reasons.some(x=>x.includes('fuente no verificada')),'Debe bloquear fuente pendiente');
  const noMetrics=evaluateQuestion(clean,review,{responses:5,accuracy:0.6},quality);
  expect(!noMetrics.eligible&&noMetrics.reasons.some(x=>x.includes('menos de 20')),'Debe bloquear calibración insuficiente');
  const tooEasy=evaluateQuestion(clean,review,{responses:25,accuracy:0.95},quality);
  expect(!tooEasy.eligible&&tooEasy.reasons.some(x=>x.includes('20%-90%')),'Debe bloquear acierto extremo');

  // El banco real puede estar completamente limpio. Para comprobar el gate no se conserva
  // deliberadamente un defecto real: se fabrica una copia sintética con pistas editoriales.
  const risky={...clean,id:'TEST-RIESGO-EDITORIAL',opciones:[
    {id:'A',text:'Siempre'},
    {id:'B',text:'Nunca'},
    {id:'C',text:'En ningún caso'},
    {id:'D',text:'La alternativa correcta contiene una formulación jurídica sustancialmente más extensa que los distractores y permite resolver el ítem por su construcción formal'}
  ],respuesta:3};
  const riskReport=quality.analyze(risky);
  expect(riskReport.score>0,'El registro sintético debe activar al menos una alerta editorial');
  const riskEval=evaluateQuestion(risky,review,metrics,quality);
  expect(!riskEval.eligible&&riskEval.reasons.some(x=>x.includes('riesgo editorial pendiente')),'Debe bloquear riesgo editorial pendiente aunque la revisión manual esté marcada completa');
}

console.log(JSON.stringify({cleanTestId:clean?.id||null,tests:errors.length?'failed':'ok',errorCount:errors.length,errors},null,2));
if(errors.length)process.exit(1);
/* Motor heurístico de triaje editorial PF93.
 * Las alertas NO determinan corrección jurídica ni rechazo automático.
 */
(function(root){
  'use strict';
  const legalCue=/\b(?:art(?:ículo)?\.?|ley|código|inciso|n[°ºo]\s*\d+)\b/i;
  const absoluteCue=/\b(?:siempre|nunca|jamás|exclusivamente|automáticamente|sin excepción|en todo caso|cualquier|ninguna?)\b/i;
  const metaStem=/\b(?:criterio metodológico|qué debe revisarse|qué debe hacerse|al analizar|antes de calificar|metodológicamente|mejor enfoque de análisis)\b/i;
  const WEIGHTS=Object.freeze({clave_larga:2,cita_solo_clave:2,distractor_corto:2,absolutismos_distractores:1,enunciado_meta:3});

  function analyze(question){
    const q=question||{}, flags=[];
    if(!Array.isArray(q.opciones)||q.opciones.length!==4||!Number.isInteger(q.respuesta)||q.respuesta<0||q.respuesta>3){
      return {id:q.id||'',flags:['estructura_invalida'],score:99,severity:'critica'};
    }
    const texts=q.opciones.map(o=>String(o?.text||'').trim());
    const lens=texts.map(x=>x.length),corr=lens[q.respuesta],wrong=lens.filter((_,i)=>i!==q.respuesta),avgWrong=wrong.reduce((a,b)=>a+b,0)/3;
    if(corr>avgWrong*1.65&&corr-avgWrong>30)flags.push('clave_larga');
    const correctHasCue=legalCue.test(texts[q.respuesta]),wrongCueCount=texts.filter((x,i)=>i!==q.respuesta&&legalCue.test(x)).length;
    if(correctHasCue&&wrongCueCount===0)flags.push('cita_solo_clave');
    const wrongAbs=texts.filter((x,i)=>i!==q.respuesta&&absoluteCue.test(x)).length,correctAbs=absoluteCue.test(texts[q.respuesta]);
    if(wrongAbs>=2&&!correctAbs)flags.push('absolutismos_distractores');
    if(corr>=45&&Math.min(...wrong)<corr*0.35)flags.push('distractor_corto');
    if(metaStem.test(String(q.pregunta||'')))flags.push('enunciado_meta');
    const score=flags.reduce((n,f)=>n+(WEIGHTS[f]||1),0);
    const severity=score===0?'limpia':score>=5?'alta':score>=2?'media':'baja';
    return {id:q.id,temaPF93:q.temaPF93,flags,score,severity,correctLength:corr,avgWrongLength:Math.round(avgWrong)};
  }

  function analyzeBank(bank){
    const rows=(bank||[]).map(analyze);
    const byFlag={},bySeverity={limpia:0,baja:0,media:0,alta:0,critica:0};
    for(const r of rows){bySeverity[r.severity]=(bySeverity[r.severity]||0)+1;for(const f of r.flags)byFlag[f]=(byFlag[f]||0)+1;}
    return {total:rows.length,clean:rows.filter(r=>r.score===0).length,flagged:rows.filter(r=>r.score>0).length,byFlag,bySeverity,rows};
  }

  root.PF93_EDITORIAL_QUALITY=Object.freeze({WEIGHTS,analyze,analyzeBank});
})(typeof globalThis!=='undefined'?globalThis:window);

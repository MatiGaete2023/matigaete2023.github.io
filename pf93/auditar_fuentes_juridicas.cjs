const {loadRuntime}=require('./compilar_produccion.cjs');
const {bank}=loadRuntime();

const norm=/\b(?:Constituci[oó]n|C[oó]digo|COT|CPC|CPP|DFL|D\.F\.L\.|DL|D\.L\.|Ley\s*(?:N[°ºo.]?\s*)?\d|Ley\s+N|Auto\s+Acordado|Reglamento)\b/i;
const article=/\b(?:art(?:s|ículos?|\.)?|inciso|numeral|N[°ºo.]\s*\d+)\b/i;
const jur=/\b(?:Corte Suprema|Corte de Apelaciones|Tribunal Constitucional|sentencia|jurisprudencia|fallo)\b/i;
const role=/\b(?:Rol|RIT|RUC)\s*(?:N[°ºo.]?\s*)?[\d.-]+/i;
const date=/\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}\s+de\s+[a-záéíóúñ]+\s+de\s+\d{4})\b/i;
const doctrine=/\b(?:doctrina|manual|apunte|tratado|curso|academia|gu[ií]a|texto docente)\b/i;

function classify(cita=''){
  const n=norm.test(cita),a=article.test(cita),j=jur.test(cita),r=role.test(cita),d=date.test(cita),doc=doctrine.test(cita);
  if(!String(cita).trim())return 'sin_cita';
  if(j&&(r||d))return 'jurisprudencia_identificada';
  if(j)return 'jurisprudencia_generica';
  if(n&&a)return 'normativa_articulo';
  if(n)return 'normativa_generica';
  if(doc)return 'doctrina';
  return 'otra';
}

const rows=bank.map(q=>({id:q.id,tema:q.temaPF93,codigo:q.temaPF93.split('-')[0],cita:q.fuente?.cita||'',verificada:q.fuente?.verificada===true,categoria:classify(q.fuente?.cita||'')}));
const counts={};for(const r of rows)counts[r.categoria]=(counts[r.categoria]||0)+1;
const byCode={};for(const r of rows){byCode[r.codigo]??={total:0,normativa_articulo:0,normativa_generica:0,jurisprudencia_identificada:0,jurisprudencia_generica:0,doctrina:0,otra:0,sin_cita:0};byCode[r.codigo].total++;byCode[r.codigo][r.categoria]=(byCode[r.codigo][r.categoria]||0)+1;}
const priority=rows.filter(r=>['sin_cita','otra','normativa_generica','jurisprudencia_generica','doctrina'].includes(r.categoria)).sort((a,b)=>a.categoria.localeCompare(b.categoria)||a.id.localeCompare(b.id));
const verified=rows.filter(r=>r.verificada);
const errors=[];if(rows.length!==451)errors.push(`Se esperaban 451 preguntas y se obtuvieron ${rows.length}`);if(rows.some(r=>r.categoria==='sin_cita'))errors.push('Existen preguntas sin cita de fuente');if(verified.length)errors.push(`El banco de revisión contiene ${verified.length} fuentes marcadas verificada:true antes de aprobación humana`);
console.log(JSON.stringify({total:rows.length,counts,byCode,priorityCount:priority.length,priority:priority.slice(0,120),verifiedTrue:verified.map(x=>x.id),errorCount:errors.length,errors},null,2));
if(errors.length)process.exit(1);

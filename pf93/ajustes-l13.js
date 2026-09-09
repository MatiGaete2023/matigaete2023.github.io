/* L13 — balance determinista de posiciones de respuesta.
 * No modifica el contenido de las alternativas: sólo permuta su posición e identifica de nuevo A-D.
 * Objetivo para 451 ítems: 113 A, 113 B, 113 C y 112 D.
 */
(function(root){
'use strict';
const TARGET=Object.freeze([113,113,113,112]);
const banks=['PF93_DRAFT_COMMON','PF93_DRAFT_CIVIL','PF93_DRAFT_PENAL','PF93_DRAFT_FAMILIA','PF93_DRAFT_LABORAL'].map(k=>root[k]).filter(Array.isArray);
const all=banks.flat();
function counts(){const c=[0,0,0,0];for(const q of all)if(Number.isInteger(q.respuesta)&&q.respuesta>=0&&q.respuesta<4)c[q.respuesta]++;return c;}
function move(q,to){const from=q.respuesta;if(from===to)return false;const opts=q.opciones.slice();[opts[from],opts[to]]=[opts[to],opts[from]];q.opciones=opts.map((o,i)=>({...o,id:'ABCD'[i]}));q.respuesta=to;q.revisionL13=true;q.revisionOrigen='BALANCE_CLAVES_L13';return true;}
let before=counts(),moves=[];
try{
  for(let to=0;to<4;to++){
    let need=TARGET[to]-before[to];
    while(need>0){
      let donor=-1;for(let i=0;i<4;i++){if(before[i]>TARGET[i]&&(donor<0||before[i]-TARGET[i]>before[donor]-TARGET[donor]))donor=i;}
      if(donor<0)throw new Error('No existe letra donante para completar balance');
      const q=all.filter(x=>x.respuesta===donor&&!x.revisionL13).sort((a,b)=>String(a.id).localeCompare(String(b.id)))[0];
      if(!q)throw new Error('No hay pregunta disponible para mover');
      if(move(q,to)){before[donor]--;before[to]++;moves.push({id:q.id,from:'ABCD'[donor],to:'ABCD'[to]});need--;}
    }
  }
}catch(e){moves=[{error:e.message}];}
const after=counts();
const previous=root.PF93_REVIEW_WORKFLOW||{};root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L13_TARGET:TARGET,L13_MOVES:Object.freeze(moves),appliedL13:moves.filter(x=>x.id).length,L13_DISTRIBUTION:Object.freeze(after)});
})(typeof globalThis!=='undefined'?globalThis:window);

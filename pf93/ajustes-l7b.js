/* L7B — remate de dos señales normativas residuales del bloque común. */
(function(root){'use strict';
const L7B_OVERRIDES=Object.freeze({
'pf93-dco-04-03':{opciones:[
{id:'A',text:'No; la potestad reglamentaria autónoma no desplaza la reserva constitucional atribuida al legislador'},
{id:'B',text:'Sí; puede hacerlo cuando el reglamento desarrolle una política pública aprobada por el Ejecutivo'},
{id:'C',text:'Sí; puede hacerlo cuando no exista todavía una regulación legislativa detallada sobre la materia'},
{id:'D',text:'Sí; puede hacerlo mientras el reglamento no contradiga expresamente una disposición legislativa previa'}],respuesta:0},
'pf93-dco-08-01':{opciones:[
{id:'A',text:'La libertad económica, porque toda diferencia de trato constituye primariamente una restricción a la iniciativa privada'},
{id:'B',text:'La igualdad jurídica y la prohibición de establecer diferencias arbitrarias entre personas en situación equivalente'},
{id:'C',text:'El derecho de propiedad, porque una regulación diferenciada afecta necesariamente una facultad patrimonial adquirida'},
{id:'D',text:'La libertad de conciencia, porque el trato desigual se traduce jurídicamente en una imposición estatal de convicciones'}],respuesta:1}
});
function patchArray(bank){if(!Array.isArray(bank))return 0;let n=0;for(let i=0;i<bank.length;i++){const p=L7B_OVERRIDES[bank[i]?.id];if(!p)continue;bank[i]={...bank[i],...p,fuente:{...bank[i].fuente,verificada:false},revisionOrigen:'AUDITORIA_MEDIA_COMUN_L7B',reemplazoEditorial:true,revisionL7B:true};n++;}return n;}
let appliedL7B=0;try{if(typeof PF93_DRAFT_COMMON!=='undefined')appliedL7B+=patchArray(PF93_DRAFT_COMMON);}catch(_){appliedL7B=-1;}
const previous=root.PF93_REVIEW_WORKFLOW||{};root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L7B_OVERRIDES,appliedL7B});
})(typeof globalThis!=='undefined'?globalThis:window);
/* L12 — cierre de alertas editoriales bajas.
 * Se suavizan distractores excesivamente categóricos sin alterar la regla jurídica evaluada.
 * Esta capa no constituye verificación jurídica humana; fuente.verificada permanece false.
 */
(function(root){
'use strict';
const L12_OVERRIDES=Object.freeze({
'pf93-dci-04-04':{
  pregunta:'Para calificar una posesión como regular, ¿qué elementos deben examinarse conforme al régimen civil?',
  opciones:[
    {id:'A',text:'La antigüedad de la ocupación y el pago regular de contribuciones asociadas a la cosa'},
    {id:'B',text:'La existencia de inscripción registral, aun tratándose de bienes cuya posesión no depende de registro'},
    {id:'C',text:'La existencia previa de una sentencia que reconozca expresamente la calidad de poseedor'},
    {id:'D',text:'Justo título, buena fe y, cuando el título es traslaticio, tradición'}
  ],respuesta:3,dificultad:'media-alta'
},
'pf93-dpc-03-03':{
  pregunta:'Un mandatario judicial cuenta con poder general para litigar, pero el instrumento no menciona expresamente la facultad de transigir. ¿Puede celebrar válidamente una transacción en representación del mandante?',
  opciones:[
    {id:'A',text:'No, porque transigir integra las facultades que requieren mención expresa en el poder judicial'},
    {id:'B',text:'Sí, porque el poder general comprende los actos de disposición que permitan poner término al litigio'},
    {id:'C',text:'Sí, si la transacción se celebra antes de que la causa entre en su etapa probatoria'},
    {id:'D',text:'No, porque la transacción requiere un instrumento distinto del mandato judicial aunque exista facultad expresa'}
  ],respuesta:0,dificultad:'alta'
},
'pf93-dpc-06-02':{
  pregunta:'¿Qué diferencia funcional existe entre la parte considerativa y la parte resolutiva de una sentencia?',
  opciones:[
    {id:'A',text:'La considerativa individualiza a las partes y la resolutiva desarrolla la valoración de la prueba rendida'},
    {id:'B',text:'La considerativa contiene el relato procesal y la resolutiva expone las razones jurídicas que justifican el fallo'},
    {id:'C',text:'Ambas cumplen la misma función decisoria y se separan principalmente por razones de orden formal'},
    {id:'D',text:'La considerativa desarrolla los fundamentos y la resolutiva expresa la decisión y sus efectos concretos'}
  ],respuesta:3,dificultad:'media-alta'
},
'pf93-dpp-06-03':{
  pregunta:'Un defecto procesal fue subsanado oportunamente y no produjo un perjuicio relevante para las garantías de los intervinientes. ¿Corresponde declarar nulidad por ese solo defecto?',
  opciones:[
    {id:'A',text:'Sí, porque la infracción formal basta para invalidar el acto aunque sus efectos hayan sido corregidos'},
    {id:'B',text:'Sí, porque la subsanación posterior no incide en el análisis de la validez del acto procesal defectuoso'},
    {id:'C',text:'No, porque la nulidad se reserva a infracciones de garantías constitucionales y excluye otros defectos procesales'},
    {id:'D',text:'En principio no, si faltan los presupuestos legales de nulidad y el defecto fue efectivamente subsanado'}
  ],respuesta:3,dificultad:'media-alta'
},
'pf93-dpp-13-02':{
  pregunta:'Un mismo hecho puede generar responsabilidad penal y, además, consecuencias civiles. ¿Cómo se relacionan ambos estatutos?',
  opciones:[
    {id:'A',text:'La condena penal determina por sí misma la procedencia y el monto de la reparación civil derivada del hecho'},
    {id:'B',text:'Tienen presupuestos y finalidades distintas, aunque pueden coexistir a partir de un mismo hecho'},
    {id:'C',text:'La absolución penal excluye la discusión civil aun cuando subsistan presupuestos autónomos de responsabilidad'},
    {id:'D',text:'La acción civil derivada del hecho punible carece de relación procesal con la persecución penal y debe tramitarse separadamente'}
  ],respuesta:1,dificultad:'media-alta'
},
'pf93-dfa-04-04':{
  pregunta:'Dos personas celebran un Acuerdo de Unión Civil. ¿Ese acto las somete, por sí mismo, al régimen de sociedad conyugal?',
  opciones:[
    {id:'A',text:'Sí; el acuerdo adopta el régimen de sociedad conyugal desde su celebración salvo pacto patrimonial distinto'},
    {id:'B',text:'Sí; los bienes adquiridos durante su vigencia ingresan al haber social bajo las reglas propias del matrimonio'},
    {id:'C',text:'No; el acuerdo posee un régimen patrimonial propio y no genera por sí mismo el estatuto de sociedad conyugal'},
    {id:'D',text:'No; el acuerdo mantiene patrimonios separados e impide que los convivientes pacten un régimen sobre bienes comunes'}
  ],respuesta:2,dificultad:'media-alta'
},
'pf93-dfa-08-02':{
  pregunta:'¿Qué distinción jurídica resulta relevante entre alimentos ya devengados y pensiones alimenticias futuras?',
  opciones:[
    {id:'A',text:'Ambas categorías quedan sometidas al mismo régimen de disposición, modificación y cobro entre las partes'},
    {id:'B',text:'Su exigibilidad, modificación y eventual transacción se sujetan a reglas distintas según se trate de créditos devengados o futuros'},
    {id:'C',text:'Los alimentos devengados mantienen el mismo régimen de indisponibilidad previsto para pensiones que aún no se generan'},
    {id:'D',text:'Los alimentos futuros pueden ser objeto de renuncia o transacción bajo las mismas reglas de un crédito alimenticio ya devengado'}
  ],respuesta:1,dificultad:'media-alta'
},
'pf93-dfa-09-02':{
  pregunta:'En una controversia sobre cuidado personal, ¿puede el tribunal establecer cuidado compartido prescindiendo de los presupuestos legales que regulan esa modalidad?',
  opciones:[
    {id:'A',text:'Sí; la apreciación del interés superior permite al juez apartarse de los presupuestos legales de esa modalidad'},
    {id:'B',text:'No; el tribunal debe respetar los presupuestos y modalidades que el ordenamiento reconoce para establecer ese régimen'},
    {id:'C',text:'Sí; el desacuerdo parental habilita al tribunal para imponer el cuidado compartido como fórmula preferente de solución'},
    {id:'D',text:'No; el cuidado compartido sólo puede originarse por sentencia judicial y queda fuera de los acuerdos parentales'}
  ],respuesta:1,dificultad:'alta'
},
'pf93-dpfa-03-01':{
  pregunta:'¿Qué función caracteriza al mediador dentro del sistema de mediación familiar?',
  opciones:[
    {id:'A',text:'Resolver el conflicto mediante una decisión vinculante cuando las posiciones de las partes permanecen distantes'},
    {id:'B',text:'Asumir temporalmente la competencia del tribunal respecto de las materias sometidas a mediación'},
    {id:'C',text:'Facilitar, como tercero imparcial, que las partes construyan un acuerdo dentro de las materias y límites permitidos'},
    {id:'D',text:'Representar a ambas partes y formular una solución jurídica que adquiere eficacia con la aceptación de una de ellas'}
  ],respuesta:2,dificultad:'media-alta'
},
'pf93-dpfa-07-02':{
  pregunta:'Un informe pericial contradice otros antecedentes relevantes del proceso de familia. ¿Qué tratamiento probatorio corresponde darle?',
  opciones:[
    {id:'A',text:'Otorgarle un valor preferente por la especialidad del perito mientras no exista otra pericia técnica que lo contradiga'},
    {id:'B',text:'Considerarlo como antecedente orientador ajeno a la valoración probatoria propia del procedimiento de familia'},
    {id:'C',text:'Preferir sus conclusiones frente a antecedentes no técnicos cuando provenga de un profesional debidamente habilitado'},
    {id:'D',text:'Valorarlo racionalmente junto con los demás antecedentes y explicar sus concordancias o contradicciones conforme a sana crítica'}
  ],respuesta:3,dificultad:'alta'
},
'pf93-dpfa-08-04':{
  pregunta:'Una parte intenta introducir en el recurso una controversia fáctica que no integró el debate sometido al tribunal inferior. ¿Cuál es el criterio correcto?',
  opciones:[
    {id:'A',text:'La impugnación permite reconstruir hechos y pretensiones aunque no hayan integrado el debate de primera instancia'},
    {id:'B',text:'El objeto de revisión queda delimitado por el recurso y el marco procesal, sin perjuicio de las hipótesis especiales que procedan'},
    {id:'C',text:'La invocación de un hecho nuevo basta para incorporarlo al objeto del recurso aunque no se haya planteado ante el tribunal inferior'},
    {id:'D',text:'La revisión queda limitada a cuestiones de derecho y deja fuera los aspectos fácticos vinculados con la resolución impugnada'}
  ],respuesta:1,dificultad:'alta'
}
});
function patchArray(bank){if(!Array.isArray(bank))return 0;let count=0;for(let i=0;i<bank.length;i++){const patch=L12_OVERRIDES[bank[i]?.id];if(!patch)continue;bank[i]={...bank[i],...patch,fuente:{...bank[i].fuente},revisionOrigen:'AUDITORIA_EDITORIAL_L12',reemplazoEditorial:true,revisionL12:true};count++;}return count;}
let appliedL12=0;try{for(const name of ['PF93_DRAFT_COMMON','PF93_DRAFT_CIVIL','PF93_DRAFT_PENAL','PF93_DRAFT_FAMILIA','PF93_DRAFT_LABORAL']){const bank=root[name];if(Array.isArray(bank))appliedL12+=patchArray(bank);}}catch(_){appliedL12=-1;}
const previous=root.PF93_REVIEW_WORKFLOW||{};root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L12_OVERRIDES,appliedL12});
})(typeof globalThis!=='undefined'?globalThis:window);

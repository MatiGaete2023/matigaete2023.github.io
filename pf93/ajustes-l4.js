/* L4 — reemplazos editoriales de riesgo alto para la especialidad Penal.
 * Base normativa cotejada antes de redactar: CPP vigente y Código Penal en LeyChile.
 * Las fuentes permanecen verificada:false: esta capa NO sustituye aprobación jurídica humana.
 */
(function(root){
  'use strict';
  const L4_OVERRIDES=Object.freeze({
    'pf93-dpp-02-03':{
      pregunta:'Una persona imputada por simple delito carece de abogado y la causa es de competencia de un juzgado de garantía. ¿Qué finalidad legal cumple la Defensoría Penal Pública respecto de ella?',
      opciones:[
        {id:'A',text:'Proporcionarle defensa penal mientras carezca de abogado, conforme al ámbito definido por su ley orgánica'},
        {id:'B',text:'Representar al Ministerio Público cuando el fiscal de la causa se encuentre legalmente inhabilitado'},
        {id:'C',text:'Resolver como órgano administrativo las controversias sobre cautelares personales del procedimiento'},
        {id:'D',text:'Ejercer la acción penal pública cuando la víctima no haya presentado querella en el procedimiento'}
      ],respuesta:0,
      explicacion:'El artículo 2 de la Ley N° 19.718 fija como finalidad de la Defensoría proporcionar defensa penal a imputados o acusados por crimen, simple delito o falta, en los tribunales allí señalados, cuando carezcan de abogado.',
      fuente:{cita:'Ley N° 19.718, art. 2',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpp-02-05':{
      pregunta:'Durante una investigación, el fiscal necesita practicar una diligencia que restringirá un derecho constitucional del imputado. ¿Qué función corresponde al juez de garantía antes de ejecutarla?',
      opciones:[
        {id:'A',text:'Autorizar previamente la diligencia si concurren sus presupuestos legales y la afectación de derechos lo exige'},
        {id:'B',text:'Dirigir personalmente la investigación y escoger las diligencias que deberá ejecutar la policía'},
        {id:'C',text:'Sustituir al fiscal en la decisión de formalizar y determinar la calificación jurídica definitiva del hecho'},
        {id:'D',text:'Resolver anticipadamente la culpabilidad para justificar la restricción de derechos solicitada por el fiscal'}
      ],respuesta:0,
      explicacion:'Los artículos 9 y 70 CPP atribuyen al juez de garantía el control y autorización judicial previa de actuaciones investigativas que priven, restrinjan o perturben derechos asegurados por la Constitución.',
      fuente:{cita:'Código Procesal Penal, arts. 9 y 70',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpp-03-03':{
      pregunta:'Una persona conoce hechos que revisten caracteres de delito y decide comunicarlos directamente a la Policía de Investigaciones. ¿Qué efecto asigna el CPP a esa actuación?',
      opciones:[
        {id:'A',text:'Constituye una denuncia admisible, que debe ser remitida de inmediato al Ministerio Público para la investigación'},
        {id:'B',text:'Constituye una querella y transforma al denunciante en interviniente con las facultades procesales del querellante'},
        {id:'C',text:'Carece de efecto porque la denuncia sólo puede formularse directamente ante un fiscal del Ministerio Público'},
        {id:'D',text:'Obliga a la policía a formalizar la investigación antes de remitir los antecedentes al fiscal competente'}
      ],respuesta:0,
      explicacion:'Los artículos 172 y 173 CPP reconocen la denuncia como forma de inicio y permiten formularla, entre otros, ante la Policía de Investigaciones, que debe hacerla llegar de inmediato al Ministerio Público.',
      fuente:{cita:'Código Procesal Penal, arts. 172 y 173',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpp-06-02':{
      pregunta:'Un interviniente conoce un vicio procesal que le causa perjuicio, pero no pide oportunamente la nulidad y luego actúa aceptando los efectos del acto. No se trata de un caso del artículo 160 CPP. ¿Qué regla opera?',
      opciones:[
        {id:'A',text:'La nulidad queda saneada por falta de reclamación o por aceptación de los efectos del acto, según el artículo 164'},
        {id:'B',text:'El acto debe anularse de oficio porque todo vicio procesal produce una nulidad insanable durante el procedimiento'},
        {id:'C',text:'El vicio sólo puede corregirse mediante recurso de nulidad después de dictarse una sentencia definitiva en juicio oral'},
        {id:'D',text:'La actuación queda suspendida hasta que la Corte de Apelaciones decida si el defecto produjo un perjuicio procesal'}
      ],respuesta:0,
      explicacion:'El artículo 164 CPP contempla el saneamiento por falta de reclamación oportuna, aceptación expresa o tácita y cumplimiento de la finalidad del acto, salvo los supuestos del artículo 160.',
      fuente:{cita:'Código Procesal Penal, arts. 159, 160 y 164',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpp-09-03':{
      pregunta:'En un juicio oral, la fiscalía solicita condena apoyándose en declaraciones registradas durante la investigación que no fueron incorporadas como prueba conforme a las reglas del juicio. ¿Puede el tribunal usarlas como base de la condena?',
      opciones:[
        {id:'A',text:'No como regla general; la sentencia debe fundarse en prueba rendida en el juicio oral o incorporada por una excepción legal'},
        {id:'B',text:'Sí, cuando esas declaraciones constan en la carpeta investigativa y fueron conocidas previamente por la defensa'},
        {id:'C',text:'Sí, cuando el fiscal las menciona en su alegato de clausura y explica su concordancia con la teoría del caso'},
        {id:'D',text:'Sí, si fueron obtenidas por la policía con instrucciones del fiscal aunque no se hayan producido ante el tribunal'}
      ],respuesta:0,
      explicacion:'Los artículos 296 y 340 CPP exigen que la prueba base de la sentencia sea producida durante el juicio oral, salvo las excepciones expresamente previstas e incorporadas en la forma legal.',
      fuente:{cita:'Código Procesal Penal, arts. 296 y 340',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpp-09-04':{
      pregunta:'Durante la investigación se recoge un objeto que puede servir como medio de prueba. ¿Qué exigencia establece el CPP para preservar su integridad?',
      opciones:[
        {id:'A',text:'Debe ser identificado y conservado, y el Ministerio Público debe adoptar medidas para impedir alteraciones de la especie'},
        {id:'B',text:'Debe entregarse al imputado para su conservación mientras no exista acusación formal presentada ante el tribunal'},
        {id:'C',text:'Debe permanecer necesariamente en poder del tribunal de garantía desde su hallazgo hasta la audiencia de juicio oral'},
        {id:'D',text:'Puede ser manipulado libremente por los intervinientes si todos dejan constancia posterior de haber tenido acceso a él'}
      ],respuesta:0,
      explicacion:'Los artículos 187 y 188 CPP ordenan recoger, identificar y conservar las especies y exigen al Ministerio Público adoptar medidas para evitar su alteración, además de registrar accesos autorizados.',
      fuente:{cita:'Código Procesal Penal, arts. 187 y 188',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpp-11-01':{
      pregunta:'La defensa sostiene que durante el juicio oral se infringieron sustancialmente garantías constitucionales y pretende invalidar el juicio y la sentencia. ¿Qué recurso contempla específicamente el CPP?',
      opciones:[
        {id:'A',text:'Recurso de nulidad, fundado en las causales legales y dirigido a invalidar el juicio, la sentencia o ambos según corresponda'},
        {id:'B',text:'Recurso de apelación general contra la sentencia definitiva del tribunal de juicio oral en lo penal por cualquier agravio'},
        {id:'C',text:'Recurso de reposición ante el mismo tribunal para que reabra el debate y dicte una nueva sentencia en la misma audiencia'},
        {id:'D',text:'Acción de revisión como vía ordinaria contra toda sentencia no firme que contenga una infracción de garantías'}
      ],respuesta:0,
      explicacion:'El artículo 372 CPP define el recurso de nulidad y el artículo 373 contempla, entre otras, la infracción sustancial de derechos o garantías asegurados por la Constitución o tratados vigentes.',
      fuente:{cita:'Código Procesal Penal, arts. 372 y 373',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpp-12-03':{
      pregunta:'El Ministerio Público atribuye un simple delito y requiere una pena que no excede de presidio menor en su grado mínimo. ¿Qué procedimiento especial contempla el artículo 388 CPP para ese supuesto?',
      opciones:[
        {id:'A',text:'El procedimiento simplificado, sujeto a las reglas del Título I del Libro Cuarto y sus normas supletorias'},
        {id:'B',text:'El procedimiento monitorio, aplicable a todo simple delito cuando el fiscal solicita una pena privativa de libertad breve'},
        {id:'C',text:'El juicio oral ordinario, porque los simples delitos quedan excluidos del procedimiento simplificado por su naturaleza'},
        {id:'D',text:'El procedimiento abreviado de pleno derecho, sin necesidad de verificar sus restantes presupuestos ni la voluntad del imputado'}
      ],respuesta:0,
      explicacion:'El artículo 388 CPP somete las faltas al procedimiento simplificado y extiende su aplicación a simples delitos cuando el Ministerio Público requiere una pena que no exceda de presidio o reclusión menores en su grado mínimo.',
      fuente:{cita:'Código Procesal Penal, arts. 388 y 389',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpp-13-04':{
      pregunta:'El querellante pretende demandar civilmente al imputado dentro del proceso penal por perjuicios derivados del hecho punible. ¿En qué oportunidad debe interponer su demanda conforme al CPP?',
      opciones:[
        {id:'A',text:'Conjuntamente con su escrito de adhesión a la acusación o con su acusación particular, en la oportunidad del artículo 261'},
        {id:'B',text:'Durante cualquier audiencia de la investigación mientras no se haya dictado el auto de apertura del juicio oral'},
        {id:'C',text:'Después del veredicto y antes de la sentencia, para que el tribunal fije separadamente la responsabilidad civil'},
        {id:'D',text:'Únicamente ante el tribunal civil, porque el procedimiento penal no admite pretensiones indemnizatorias de la víctima'}
      ],respuesta:0,
      explicacion:'El artículo 60 CPP dispone que la demanda civil del querellante debe deducirse conjuntamente con su escrito de adhesión o acusación, en la oportunidad prevista en el artículo 261.',
      fuente:{cita:'Código Procesal Penal, arts. 59, 60 y 261',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-02-02':{
      pregunta:'Un extranjero comete íntegramente en territorio chileno un hecho tipificado como delito por la ley penal nacional. ¿Qué regla espacial resulta aplicable?',
      opciones:[
        {id:'A',text:'La ley penal chilena se aplica por el principio territorial, sin que la nacionalidad extranjera excluya por sí sola su vigencia'},
        {id:'B',text:'La ley penal de la nacionalidad del autor desplaza a la chilena cuando ambos Estados tipifican de modo diferente el hecho'},
        {id:'C',text:'La ley chilena sólo puede aplicarse si el Estado de nacionalidad del autor renuncia previamente a ejercer jurisdicción penal'},
        {id:'D',text:'La aplicación de la ley penal chilena depende de que el hecho produzca además un resultado patrimonial dentro del país'}
      ],respuesta:0,
      explicacion:'El artículo 5 del Código Penal expresa la regla territorial y extiende la obligatoriedad de la ley penal chilena a los habitantes de la República, incluidos extranjeros; el artículo 6 regula la excepcional punición de hechos cometidos fuera del territorio.',
      fuente:{cita:'Código Penal, arts. 5 y 6',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpe-03-03':{
      pregunta:'En el delito de hurto, la expresión «cosa mueble ajena» exige determinar jurídicamente si el bien pertenece a otra persona. Desde la teoría del tipo, ¿qué clase de componente representa especialmente la ajenidad?',
      opciones:[
        {id:'A',text:'Un elemento normativo del tipo, porque su comprensión requiere una valoración jurídica sobre la pertenencia del bien'},
        {id:'B',text:'Un elemento puramente descriptivo, porque la ajenidad puede comprobarse sólo mediante percepción sensorial del objeto'},
        {id:'C',text:'Una condición objetiva de punibilidad, porque sólo se examina después de establecido íntegramente el injusto culpable'},
        {id:'D',text:'Una circunstancia agravante general, porque modifica la pena sin integrar la descripción típica del apoderamiento'}
      ],respuesta:0,
      explicacion:'La distinción entre elementos descriptivos y normativos es doctrinal. En tipos patrimoniales, la ajenidad exige una valoración jurídica y funciona como ejemplo clásico de elemento normativo de la descripción típica.',
      fuente:{cita:'Código Penal, art. 432; teoría del tipo penal (doctrina)',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-10-01':{
      pregunta:'La ley asigna a un simple delito una pena para su consumación. El acusado es autor del mismo delito en grado frustrado y no existe una regla especial que altere el régimen general. ¿Qué pena base corresponde considerar?',
      opciones:[
        {id:'A',text:'La inmediatamente inferior en grado a la señalada por la ley para el delito consumado'},
        {id:'B',text:'La misma pena del delito consumado, aplicándola sólo en su mitad inferior por tratarse de frustración'},
        {id:'C',text:'La inferior en dos grados a la del delito consumado, como ocurre con el autor de tentativa bajo la regla general'},
        {id:'D',text:'Una pena escogida directamente dentro de la escala general sin atender al grado de desarrollo del delito'}
      ],respuesta:0,
      explicacion:'Los artículos 50 y 51 del Código Penal parten de la pena del autor de delito consumado y disponen para el autor de crimen o simple delito frustrado la pena inmediatamente inferior en grado, salvo reglas especiales.',
      fuente:{cita:'Código Penal, arts. 50 y 51',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-10-02':{
      pregunta:'Un delito tiene asignado un solo grado de una pena divisible y concurre una sola circunstancia atenuante, sin agravantes. ¿Cómo debe aplicarse esa pena conforme al artículo 67 del Código Penal?',
      opciones:[
        {id:'A',text:'En su mínimum, porque concurre una atenuante y ninguna circunstancia agravante'},
        {id:'B',text:'En su máximum, porque la existencia de cualquier modificatoria obliga a excluir la mitad inferior'},
        {id:'C',text:'En toda su extensión, porque una sola atenuante carece de efecto cuando la pena consta de un grado'},
        {id:'D',text:'En el grado inmediatamente inferior, porque toda atenuante produce por sí misma una rebaja de grado'}
      ],respuesta:0,
      explicacion:'El artículo 67 dispone que, si la pena es un grado de una divisible y concurre una sola atenuante sin agravantes, debe aplicarse en su mínimum.',
      fuente:{cita:'Código Penal, art. 67',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-11-04':{
      pregunta:'Un conductor causa la muerte de una persona por una conducta imprudente, sin intención de matar. Si concurren los presupuestos legales de un cuasidelito contra las personas, ¿qué diferencia dogmática impide tratar el hecho como homicidio doloso?',
      opciones:[
        {id:'A',text:'La ausencia de dolo y la presencia de culpa, distinción que el Código Penal utiliza para separar delito y cuasidelito'},
        {id:'B',text:'La ausencia de resultado mortal jurídicamente relevante, porque la muerte producida por culpa no integra delitos contra las personas'},
        {id:'C',text:'La inexistencia de conducta voluntaria, porque toda imprudencia excluye una acción u omisión atribuible al agente'},
        {id:'D',text:'La falta de tipicidad objetiva, porque los cuasidelitos sólo sancionan riesgos que no llegan a causar un resultado lesivo'}
      ],respuesta:0,
      explicacion:'El artículo 2 del Código Penal distingue dolo o malicia de culpa; los artículos 490 y siguientes sancionan en los casos previstos hechos contra las personas que, mediando malicia, constituirían crimen o simple delito.',
      fuente:{cita:'Código Penal, arts. 2 y 490 a 492',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-12-01':{
      pregunta:'Una persona accede carnalmente a una víctima de diecisiete años utilizando fuerza. Sin considerar otras figuras especiales, ¿qué disposición del Código Penal describe directamente el supuesto?',
      opciones:[
        {id:'A',text:'El artículo 361, porque la víctima es mayor de catorce años y concurre fuerza o intimidación como circunstancia típica'},
        {id:'B',text:'El artículo 362, porque todo acceso carnal respecto de una persona menor de dieciocho años se subsume en esa disposición'},
        {id:'C',text:'El artículo 363, porque la minoría de edad desplaza la fuerza y obliga a calificar el hecho únicamente como estupro'},
        {id:'D',text:'Ninguna figura de violación, porque entre catorce y dieciocho años la fuerza carece de relevancia para la tipicidad sexual'}
      ],respuesta:0,
      explicacion:'El artículo 361 regula la violación respecto de personas mayores de catorce años cuando concurre, entre otros supuestos, fuerza o intimidación.',
      fuente:{cita:'Código Penal, art. 361',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpe-12-02':{
      pregunta:'Un adulto accede carnalmente a una persona de trece años sin emplear fuerza ni intimidación. Para efectos del artículo 362 del Código Penal, ¿qué relevancia tiene que la víctima haya manifestado aceptación del acto?',
      opciones:[
        {id:'A',text:'No excluye la figura del artículo 362, que se aplica a la persona menor de catorce años sin exigir las circunstancias del artículo 361'},
        {id:'B',text:'Excluye la figura del artículo 362 y obliga a examinar únicamente si existió engaño en los términos del artículo 363'},
        {id:'C',text:'Transforma el hecho en una conducta atípica, porque la ley penal sexual reconoce plena disponibilidad desde los doce años'},
        {id:'D',text:'Sólo permite aplicar el artículo 362 cuando, además de la edad, se acredita alguna forma de dependencia respecto del autor'}
      ],respuesta:0,
      explicacion:'El artículo 362 sanciona el acceso carnal respecto de una persona menor de catorce años aunque no concurra circunstancia alguna de las enumeradas en el artículo 361.',
      fuente:{cita:'Código Penal, art. 362',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-12-03':{
      pregunta:'Una persona adulta accede carnalmente a una víctima de dieciséis años aprovechando una relación de dependencia derivada de tenerla bajo su cuidado. ¿Qué figura debe examinarse específicamente?',
      opciones:[
        {id:'A',text:'El estupro del artículo 363, por tratarse de una víctima mayor de catorce y menor de edad con abuso de dependencia'},
        {id:'B',text:'La violación del artículo 362, porque toda víctima menor de dieciocho años queda comprendida en esa regla por razón de edad'},
        {id:'C',text:'Únicamente la violación del artículo 361, porque la relación de dependencia equivale legalmente a fuerza o intimidación'},
        {id:'D',text:'Una conducta atípica mientras no se demuestre privación de sentido, pues la dependencia carece de relevancia típica autónoma'}
      ],respuesta:0,
      explicacion:'El artículo 363 contempla el acceso carnal a una persona menor de edad pero mayor de catorce años cuando, entre otros supuestos, se abusa de una relación de dependencia como custodia, educación, cuidado o relación laboral.',
      fuente:{cita:'Código Penal, art. 363 N° 2',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpe-13-05':{
      pregunta:'Una persona ingresa a una casa habitada fracturando una ventana para apropiarse de especies muebles ajenas. ¿Qué modalidad de fuerza en las cosas describe directamente el artículo 440 del Código Penal?',
      opciones:[
        {id:'A',text:'Escalamiento, porque la norma incluye el ingreso por vía no destinada al efecto y la fractura de puertas o ventanas'},
        {id:'B',text:'Uso de llave falsa, porque la fractura de una ventana se equipara legalmente al empleo de un instrumento semejante a una ganzúa'},
        {id:'C',text:'Fuerza sobre bienes nacionales de uso público, porque toda fractura exterior desplaza la regla aplicable al lugar habitado'},
        {id:'D',text:'Robo por sorpresa, porque la entrada mediante fractura constituye una forma de distracción de la víctima antes del apoderamiento'}
      ],respuesta:0,
      explicacion:'El artículo 440 N° 1 del Código Penal comprende en el escalamiento el ingreso por vía no destinada al efecto, por forado, rompimiento de pared o techo y fractura de puertas o ventanas en lugar habitado o destinado a la habitación.',
      fuente:{cita:'Código Penal, art. 440 N° 1',verificada:false,revisadaEn:null},dificultad:'alta'
    }
  });

  function patchArray(bank){
    if(!Array.isArray(bank))return 0;
    let count=0;
    for(let i=0;i<bank.length;i++){
      const patch=L4_OVERRIDES[bank[i]?.id];
      if(!patch)continue;
      bank[i]={...bank[i],...patch,fuente:{...bank[i].fuente,...(patch.fuente||{})},revisionOrigen:'AUDITORIA_PENAL_L4',reemplazoEditorial:true,revisionL4:true};
      count++;
    }
    return count;
  }

  let appliedL4=0;
  try{
    if(typeof PF93_DRAFT_COMMON!=='undefined')appliedL4+=patchArray(PF93_DRAFT_COMMON);
    if(typeof PF93_DRAFT_CIVIL!=='undefined')appliedL4+=patchArray(PF93_DRAFT_CIVIL);
    if(typeof PF93_DRAFT_PENAL!=='undefined')appliedL4+=patchArray(PF93_DRAFT_PENAL);
    if(typeof PF93_DRAFT_FAMILIA!=='undefined')appliedL4+=patchArray(PF93_DRAFT_FAMILIA);
    if(typeof PF93_DRAFT_LABORAL!=='undefined')appliedL4+=patchArray(PF93_DRAFT_LABORAL);
  }catch(_){appliedL4=-1;}

  const previous=root.PF93_REVIEW_WORKFLOW||{};
  root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L4_OVERRIDES,appliedL4});
})(typeof globalThis!=='undefined'?globalThis:window);

/* L5 — reemplazos editoriales de riesgo alto para la especialidad Familia.
 * Base: Código Civil, Ley N° 19.947, Ley N° 20.830, Ley N° 19.968 y Ley N° 20.066,
 * cotejadas en sus versiones vigentes durante septiembre de 2026.
 * Las fuentes permanecen verificada:false: esta capa NO sustituye aprobación jurídica humana.
 */
(function(root){
  'use strict';
  const L5_OVERRIDES=Object.freeze({
    'pf93-dfa-01-02':{
      pregunta:'Dos personas celebran un Acuerdo de Unión Civil y una de ellas sostiene que, desde ese acto, ambas pasan a tener el estado civil de casadas. ¿Cuál es la calificación correcta?',
      opciones:[
        {id:'A',text:'El acuerdo produce el estado civil de casadas, aunque conserva reglas patrimoniales distintas del matrimonio'},
        {id:'B',text:'El acuerdo no crea estado civil y sólo genera obligaciones contractuales entre las partes que lo celebran'},
        {id:'C',text:'El acuerdo confiere el estado civil de convivientes civiles, distinto del estado civil derivado del matrimonio'},
        {id:'D',text:'El acuerdo transforma a las partes en cónyuges sólo después de cumplirse un año desde su inscripción'}
      ],respuesta:2,
      explicacion:'La Ley N° 20.830 configura el Acuerdo de Unión Civil como una institución distinta del matrimonio y atribuye a quienes lo celebran el estado civil de convivientes civiles.',
      fuente:{cita:'Ley N° 20.830, arts. 1 y 3',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dfa-03-03':{
      pregunta:'El propietario de un inmueble declarado bien familiar quiere venderlo voluntariamente a un tercero. Su cónyuge no propietario se opone. ¿Qué regla incide directamente en la validez del acto?',
      opciones:[
        {id:'A',text:'El propietario puede venderlo por sí solo, quedando el precio afecto posteriormente a las cargas familiares'},
        {id:'B',text:'La venta requiere autorización previa del tribunal aun cuando el cónyuge no propietario consienta expresamente'},
        {id:'C',text:'La venta requiere autorización del cónyuge no propietario, sin perjuicio de la autorización judicial sustitutiva en los casos legales'},
        {id:'D',text:'La declaración de bien familiar impide la venta mientras subsista el matrimonio, aunque ambos cónyuges estén de acuerdo'}
      ],respuesta:2,
      explicacion:'El artículo 142 del Código Civil exige la voluntad del cónyuge no propietario para ciertos actos voluntarios de enajenación o gravamen de bienes familiares. El artículo 144 regula los casos en que el juez puede suplir esa voluntad.',
      fuente:{cita:'Código Civil, arts. 142 y 144',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-03-04':{
      pregunta:'Un inmueble fue declarado bien familiar porque era la residencia principal de la familia. Años después dejó definitivamente de cumplir esa función y el propietario pide que cese la afectación. ¿Qué régimen corresponde?',
      opciones:[
        {id:'A',text:'La afectación cesa por el solo abandono material del inmueble y no requiere actuación posterior de los cónyuges o del tribunal'},
        {id:'B',text:'El propietario puede cancelar unilateralmente la afectación ante el Conservador acreditando que conserva el dominio del inmueble'},
        {id:'C',text:'El propietario puede pedir judicialmente la desafectación y debe acreditar que el inmueble dejó de servir a los fines que justificaron su declaración'},
        {id:'D',text:'La afectación sólo puede cesar por acuerdo de ambos cónyuges y queda vedada una decisión judicial sobre la materia'}
      ],respuesta:2,
      explicacion:'El artículo 145 del Código Civil permite al propietario solicitar judicialmente la desafectación cuando el bien ya no está actualmente destinado a los fines del artículo 141, circunstancia que debe probar.',
      fuente:{cita:'Código Civil, arts. 141 y 145',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-04-03':{
      pregunta:'Durante la sociedad conyugal, el marido administra un inmueble social y proyecta venderlo voluntariamente sin intervención de su mujer. ¿Qué limitación legal resulta pertinente?',
      opciones:[
        {id:'A',text:'La administración ordinaria le permite enajenar el inmueble social sin intervención adicional mientras el precio sea de mercado'},
        {id:'B',text:'La enajenación sólo requiere autorización de la mujer cuando el inmueble había pertenecido a ella antes del matrimonio'},
        {id:'C',text:'La enajenación voluntaria del inmueble social requiere autorización de la mujer, con posibilidad de suplencia judicial en los supuestos legales'},
        {id:'D',text:'El inmueble social sólo puede enajenarse después de disuelta y liquidada la sociedad conyugal entre los cónyuges'}
      ],respuesta:2,
      explicacion:'El artículo 1749 del Código Civil, dentro del régimen vigente de sociedad conyugal, limita la administración del marido respecto de la enajenación o gravamen voluntario de bienes raíces sociales y exige autorización de la mujer, regulando además la suplencia judicial.',
      fuente:{cita:'Código Civil, art. 1749',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-05-02':{
      pregunta:'Un cónyuge demanda divorcio alegando un incumplimiento grave e imputable de los deberes matrimoniales que vuelve intolerable la vida en común, sin fundar su acción en un plazo de cese de convivencia. ¿Qué causal está invocando?',
      opciones:[
        {id:'A',text:'Divorcio por cese de convivencia solicitado unilateralmente, sujeto al plazo propio de esa causal'},
        {id:'B',text:'Divorcio por mutuo consentimiento, que requiere acuerdo de ambos cónyuges sobre la terminación del vínculo'},
        {id:'C',text:'Divorcio por falta imputable, cuyo supuesto se vincula al incumplimiento grave de deberes que haga intolerable la vida en común'},
        {id:'D',text:'Nulidad matrimonial por vicio originario, porque todo incumplimiento posterior afecta la validez inicial del matrimonio'}
      ],respuesta:2,
      explicacion:'El artículo 54 de la Ley de Matrimonio Civil contempla el divorcio por falta imputable al otro cónyuge cuando existe una violación grave de deberes y obligaciones que torne intolerable la vida en común. El artículo 55 regula separadamente el divorcio por cese de convivencia.',
      fuente:{cita:'Ley N° 19.947, arts. 54 y 55',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-05-03':{
      pregunta:'Una sentencia de divorcio quedó ejecutoriada, pero aún no se practica la subinscripción correspondiente. ¿Cómo se producen sus efectos?',
      opciones:[
        {id:'A',text:'El divorcio carece de efectos entre los ex cónyuges hasta que se practique la subinscripción en el registro respectivo'},
        {id:'B',text:'El divorcio produce efectos frente a terceros desde la notificación de la demanda, aunque la sentencia todavía no esté firme'},
        {id:'C',text:'La sentencia produce efectos entre los cónyuges desde que queda ejecutoriada y es oponible a terceros desde su subinscripción'},
        {id:'D',text:'La sentencia sólo produce efectos patrimoniales desde la liquidación del régimen matrimonial y efectos personales desde la subinscripción'}
      ],respuesta:2,
      explicacion:'El artículo 59 de la Ley N° 19.947 distingue los efectos entre los cónyuges, que nacen desde que la sentencia queda ejecutoriada, de su oponibilidad a terceros, que requiere la correspondiente subinscripción.',
      fuente:{cita:'Ley N° 19.947, art. 59',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-05-04':{
      pregunta:'Los cónyuges llevan más de un año sin convivencia y solicitan conjuntamente el divorcio, pero no acompañan un acuerdo que regule de manera completa y suficiente sus relaciones mutuas y respecto de sus hijos comunes. ¿Qué consecuencia tiene esa omisión?',
      opciones:[
        {id:'A',text:'El tiempo de cese basta para acoger la solicitud conjunta y las restantes materias deben discutirse después en procesos separados'},
        {id:'B',text:'La omisión transforma la solicitud conjunta en una demanda unilateral de divorcio, manteniéndose el mismo plazo temporal'},
        {id:'C',text:'Falta un requisito de la solicitud conjunta, pues debe acompañarse un acuerdo completo y suficiente en los términos legales'},
        {id:'D',text:'La omisión impide definitivamente el divorcio por cese y obliga a fundar una nueva demanda en una falta imputable del otro cónyuge'}
      ],respuesta:2,
      explicacion:'El artículo 55 de la Ley N° 19.947 exige, para el divorcio solicitado de común acuerdo tras el plazo legal de cese, que los cónyuges acompañen un acuerdo completo y suficiente sobre sus relaciones mutuas y con sus hijos, conforme a los parámetros legales.',
      fuente:{cita:'Ley N° 19.947, arts. 21 y 55',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-06-03':{
      pregunta:'En una acción de filiación, una persona debidamente citada en dos oportunidades se niega injustificadamente a someterse al peritaje biológico decretado. ¿Qué efecto probatorio establece el Código Civil?',
      opciones:[
        {id:'A',text:'La negativa equivale a una confesión judicial completa y obliga a dictar sentencia sin valorar los demás antecedentes disponibles'},
        {id:'B',text:'La negativa elimina el valor de las restantes pruebas biológicas y obliga a resolver sólo mediante prueba documental y testimonial'},
        {id:'C',text:'La negativa hace presumir legalmente la paternidad o maternidad, o su ausencia, según corresponda a la pretensión discutida'},
        {id:'D',text:'La negativa sólo autoriza una multa procesal y no produce una consecuencia probatoria respecto de la filiación controvertida'}
      ],respuesta:2,
      explicacion:'El artículo 199 del Código Civil atribuye a la negativa injustificada a las pruebas biológicas la consecuencia de una presunción legal de paternidad o maternidad, o de su ausencia, y precisa cuándo la negativa se considera injustificada.',
      fuente:{cita:'Código Civil, art. 199',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-09-04':{
      pregunta:'En un juicio de cuidado personal, una adolescente expresa de manera clara con cuál progenitor desea vivir. ¿Qué valor tiene esa opinión para la decisión judicial?',
      opciones:[
        {id:'A',text:'Define por sí misma el cuidado personal desde que la persona menor de edad puede expresar una preferencia comprensible'},
        {id:'B',text:'Carece de relevancia decisoria porque el cuidado personal se determina únicamente a partir de las aptitudes de los progenitores'},
        {id:'C',text:'Debe ser oída y ponderada como uno de los factores legales, junto con los demás antecedentes vinculados a su interés superior'},
        {id:'D',text:'Sólo puede valorarse cuando ambos progenitores aceptan previamente que la adolescente intervenga en la causa de cuidado personal'}
      ],respuesta:2,
      explicacion:'Los artículos 225-2 y 227 del Código Civil incorporan la opinión expresada por el hijo o hija entre los factores que deben ponderarse y ordenan al juez oírle, dentro de una decisión fundada en su interés superior y en el conjunto de criterios legales.',
      fuente:{cita:'Código Civil, arts. 225-2 y 227',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dfa-10-01':{
      pregunta:'Los progenitores viven separados y uno de ellos no tiene el cuidado personal del hijo. ¿Cómo caracteriza el Código Civil la relación directa y regular que corresponde mantener?',
      opciones:[
        {id:'A',text:'Como una facultad patrimonial del progenitor no custodio, renunciable mediante acuerdo privado sin consideración de los intereses del hijo'},
        {id:'B',text:'Como una medida excepcional de protección que sólo nace cuando el tribunal la decreta después de una vulneración de derechos'},
        {id:'C',text:'Como un derecho y deber de mantener una relación personal y contacto periódico que preserve el vínculo familiar con el hijo'},
        {id:'D',text:'Como una modalidad de cuidado personal compartido que traslada temporalmente la titularidad del cuidado al progenitor visitante'}
      ],respuesta:2,
      explicacion:'El artículo 229 del Código Civil configura la relación directa y regular como derecho y deber del progenitor que no tiene el cuidado personal y la define en función de un contacto periódico y estable que mantenga el vínculo familiar.',
      fuente:{cita:'Código Civil, art. 229',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dfa-10-02':{
      pregunta:'Un régimen de relación directa y regular ya vigente comienza a producir un perjuicio manifiesto al bienestar del hijo, acreditado con antecedentes serios. ¿Qué potestad tiene el tribunal?',
      opciones:[
        {id:'A',text:'Debe mantener inalterado el régimen hasta que ambos progenitores consientan en modificar la forma de contacto ya establecida'},
        {id:'B',text:'Puede transformar de pleno derecho la relación directa y regular en cuidado personal del progenitor con quien se desarrollaban las visitas'},
        {id:'C',text:'Puede suspender o restringir el régimen mediante resolución fundada cuando su ejercicio perjudique manifiestamente el bienestar del hijo'},
        {id:'D',text:'Sólo puede imponer una sanción económica al progenitor responsable, manteniendo las condiciones de contacto fijadas previamente'}
      ],respuesta:2,
      explicacion:'El régimen de relación directa y regular está subordinado al interés superior del hijo. El Código Civil permite restringirlo o suspenderlo por resolución fundada cuando su ejercicio manifiestamente perjudique su bienestar.',
      fuente:{cita:'Código Civil, art. 229',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-04-02':{
      pregunta:'En un procedimiento de familia se advierte una omisión formal subsanable que impide continuar regularmente la tramitación. ¿Qué facultad corresponde al tribunal conforme al impulso procesal de oficio?',
      opciones:[
        {id:'A',text:'Debe esperar que una de las partes detecte el defecto y promueva un incidente antes de adoptar una medida de corrección procesal'},
        {id:'B',text:'Debe poner término al proceso porque las omisiones formales subsanables impiden que el juez impulse la causa por iniciativa propia'},
        {id:'C',text:'Debe adoptar las medidas necesarias para subsanar la omisión y dar al procedimiento el curso que corresponda con la mayor celeridad posible'},
        {id:'D',text:'Debe remitir los antecedentes al tribunal superior para que éste determine la forma de corregir la omisión antes de continuar la causa'}
      ],respuesta:2,
      explicacion:'El artículo 13 de la Ley N° 19.968 consagra la actuación de oficio: el juez debe adoptar las medidas necesarias para llevar el proceso a término con celeridad, dar curso progresivo al procedimiento y salvar omisiones formales susceptibles de subsanación.',
      fuente:{cita:'Ley N° 19.968, art. 13',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpfa-05-03':{
      pregunta:'Una demanda de familia no contiene uno de los requisitos formales exigidos para su presentación y el defecto es subsanable. ¿Cómo debe proceder el tribunal en el examen de admisibilidad?',
      opciones:[
        {id:'A',text:'Debe rechazar definitivamente la demanda y la parte sólo puede volver a ejercer la acción después de obtener autorización del tribunal superior'},
        {id:'B',text:'Debe admitirla sin observaciones porque en familia los requisitos formales de la demanda no pueden ser objeto de control de admisibilidad'},
        {id:'C',text:'Debe ordenar que el defecto sea subsanado dentro del plazo que fije, bajo apercibimiento de tener la demanda por no presentada'},
        {id:'D',text:'Debe convertir la demanda escrita en una presentación oral y citar de inmediato a audiencia preparatoria para completar allí los antecedentes faltantes'}
      ],respuesta:2,
      explicacion:'El artículo 54-1 de la Ley N° 19.968 regula el control de admisibilidad y ordena subsanar la falta de requisitos del artículo 57 dentro del plazo fijado por el tribunal, bajo sanción de tener la demanda por no presentada.',
      fuente:{cita:'Ley N° 19.968, arts. 54-1 y 57',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-06-01':{
      pregunta:'Antes de iniciarse formalmente una causa de protección, llegan al juzgado antecedentes que muestran una amenaza grave e inmediata para los derechos de un niño. ¿Puede adoptarse una medida cautelar especial en ese momento?',
      opciones:[
        {id:'A',text:'La medida sólo puede decretarse después de celebrada la audiencia preparatoria y de recibirse prueba sobre la vulneración denunciada'},
        {id:'B',text:'La medida requiere que exista previamente una sentencia que declare vulnerados los derechos del niño y determine al responsable'},
        {id:'C',text:'Sí; el tribunal puede adoptar una medida cautelar necesaria incluso antes del inicio del procedimiento, de oficio o a petición habilitada'},
        {id:'D',text:'Sí, pero únicamente cuando el Ministerio Público haya formalizado una investigación penal por los mismos hechos que originan el riesgo'}
      ],respuesta:2,
      explicacion:'El artículo 71 de la Ley N° 19.968 permite decretar medidas cautelares especiales en cualquier momento, incluso antes de iniciarse el procedimiento, cuando sean necesarias para proteger los derechos del niño, niña o adolescente.',
      fuente:{cita:'Ley N° 19.968, art. 71, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-06-03':{
      pregunta:'Se presenta una denuncia de violencia intrafamiliar con antecedentes que permiten apreciar riesgo inminente para la víctima. ¿Qué respuesta cautelar exige el régimen vigente?',
      opciones:[
        {id:'A',text:'Postergar las medidas protectoras hasta la audiencia de juicio, para no anticipar efectos antes de establecerse la existencia de violencia'},
        {id:'B',text:'Remitir la denuncia a mediación familiar como paso previo y evaluar medidas protectoras sólo si la mediación termina sin acuerdo'},
        {id:'C',text:'Adoptar medidas de protección o cautelares con el mérito de la denuncia cuando concurran los presupuestos legales de riesgo inminente'},
        {id:'D',text:'Limitar la respuesta inicial a ordenar una evaluación psicosocial y resolver sobre medidas protectoras después de recibir ese informe'}
      ],respuesta:2,
      explicacion:'La Ley N° 20.066 impone la adopción de medidas de protección o cautelares cuando existe una situación de riesgo inminente en los términos legales. La Ley N° 19.968 regula las medidas cautelares aplicables en el procedimiento de violencia intrafamiliar.',
      fuente:{cita:'Ley N° 20.066, art. 7; Ley N° 19.968, art. 92, textos vigentes en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-07-04':{
      pregunta:'Durante un juicio de familia, el tribunal advierte que un informe técnico no ofrecido por las partes resulta necesario para resolver adecuadamente la controversia. ¿Puede ordenar su incorporación como prueba?',
      opciones:[
        {id:'A',text:'No, porque la actividad probatoria queda entregada sólo a las partes y el juez debe resolver con lo que ellas hayan ofrecido oportunamente'},
        {id:'B',text:'Sí, pero únicamente si ambas partes prestan consentimiento expreso respecto del contenido y de las conclusiones del informe técnico'},
        {id:'C',text:'Sí; puede disponer de oficio la prueba que estime necesaria, sin perjuicio de su incorporación y contradicción conforme a las reglas del procedimiento'},
        {id:'D',text:'No, salvo que el informe provenga del Consejo Técnico del mismo tribunal y se incorpore como antecedente reservado fuera de la audiencia'}
      ],respuesta:2,
      explicacion:'El artículo 29 de la Ley N° 19.968 permite al juez ordenar de oficio las pruebas que estime necesarias. Esa facultad opera dentro del sistema probatorio de familia y no elimina las reglas de incorporación, examen y valoración de la prueba.',
      fuente:{cita:'Ley N° 19.968, arts. 28, 29 y 32',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-08-01':{
      pregunta:'Durante un procedimiento de familia se dicta una resolución que concede una medida cautelar. Una parte pretende impugnarla mediante apelación. ¿Qué dispone el régimen especial de recursos?',
      opciones:[
        {id:'A',text:'La resolución no es apelable porque en familia la apelación se reserva a las sentencias definitivas dictadas en primera instancia'},
        {id:'B',text:'La resolución sólo puede apelarse cuando la cautelar tenga contenido patrimonial y supere la cuantía fijada para los asuntos civiles ordinarios'},
        {id:'C',text:'La resolución es apelable porque las decisiones que se pronuncian sobre medidas cautelares integran las categorías expresamente apelables'},
        {id:'D',text:'La resolución es apelable únicamente si el mismo juez que concedió la cautelar certifica previamente que existe un agravio irreparable'}
      ],respuesta:2,
      explicacion:'El artículo 67 de la Ley N° 19.968 establece categorías limitadas de resoluciones apelables e incluye las que se pronuncian sobre medidas cautelares.',
      fuente:{cita:'Ley N° 19.968, art. 67',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpfa-08-02':{
      pregunta:'Una parte pretende aplicar a un recurso de familia una regla del Código de Procedimiento Civil que resulta incompatible con la oralidad y con las modificaciones especiales de la Ley de Tribunales de Familia. ¿Es procedente esa aplicación?',
      opciones:[
        {id:'A',text:'Sí, porque el régimen civil de recursos desplaza las reglas especiales de familia cuando ambas regulaciones se refieren al mismo medio de impugnación'},
        {id:'B',text:'Sí, porque toda regla del procedimiento civil tiene carácter preferente frente a las normas procesales especiales de los tribunales de familia'},
        {id:'C',text:'No; las reglas civiles se aplican supletoriamente sólo en cuanto sean compatibles y con las modificaciones expresamente previstas para los recursos de familia'},
        {id:'D',text:'No, porque el procedimiento de familia excluye por completo toda aplicación supletoria de normas del Código de Procedimiento Civil'}
      ],respuesta:2,
      explicacion:'Los artículos 27 y 67 de la Ley N° 19.968 admiten aplicación supletoria del Código de Procedimiento Civil en cuanto resulte compatible con la naturaleza del procedimiento de familia y sujetan los recursos a modificaciones especiales.',
      fuente:{cita:'Ley N° 19.968, arts. 27 y 67',verificada:false,revisadaEn:null},dificultad:'alta'
    }
  });

  function patchArray(bank){
    if(!Array.isArray(bank))return 0;
    let count=0;
    for(let i=0;i<bank.length;i++){
      const patch=L5_OVERRIDES[bank[i]?.id];
      if(!patch)continue;
      bank[i]={...bank[i],...patch,fuente:{...bank[i].fuente,...(patch.fuente||{})},revisionOrigen:'AUDITORIA_FAMILIA_L5',reemplazoEditorial:true,revisionL5:true};
      count++;
    }
    return count;
  }

  let appliedL5=0;
  try{
    if(typeof PF93_DRAFT_COMMON!=='undefined')appliedL5+=patchArray(PF93_DRAFT_COMMON);
    if(typeof PF93_DRAFT_CIVIL!=='undefined')appliedL5+=patchArray(PF93_DRAFT_CIVIL);
    if(typeof PF93_DRAFT_PENAL!=='undefined')appliedL5+=patchArray(PF93_DRAFT_PENAL);
    if(typeof PF93_DRAFT_FAMILIA!=='undefined')appliedL5+=patchArray(PF93_DRAFT_FAMILIA);
    if(typeof PF93_DRAFT_LABORAL!=='undefined')appliedL5+=patchArray(PF93_DRAFT_LABORAL);
  }catch(_){appliedL5=-1;}

  const previous=root.PF93_REVIEW_WORKFLOW||{};
  root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L5_OVERRIDES,appliedL5});
})(typeof globalThis!=='undefined'?globalThis:window);

/* L6 — reemplazos editoriales de riesgo alto para la especialidad Laboral.
 * Base: Código del Trabajo y régimen de cobranza laboral/previsional vigentes en septiembre de 2026.
 * Las fuentes permanecen verificada:false: esta capa NO sustituye aprobación jurídica humana.
 */
(function(root){
  'use strict';
  const L6_OVERRIDES=Object.freeze({
    'pf93-dla-02-04':{
      pregunta:'Una sociedad celebra contratos de trabajo, organiza las labores y utiliza directamente los servicios de su personal, pero encarga a un tercero el pago material de las remuneraciones. ¿Quién tiene la calidad de empleador?',
      opciones:[
        {id:'A',text:'El tercero pagador, porque la transferencia material de las remuneraciones determina por sí sola esa calidad'},
        {id:'B',text:'Ambas entidades en conjunto, porque la intervención de un tercero en la nómina convierte la relación en empleador múltiple'},
        {id:'C',text:'La sociedad que utiliza los servicios en virtud de los contratos de trabajo, sin que el pago delegado altere por sí solo esa calidad'},
        {id:'D',text:'La entidad que el trabajador designe al terminar la relación, atendido cuál de ellas realizó más actuaciones administrativas'}
      ],respuesta:2,
      explicacion:'El artículo 3 letra a) del Código del Trabajo define empleador como la persona natural o jurídica que utiliza los servicios intelectuales o materiales de una o más personas en virtud de un contrato de trabajo. La mera externalización del pago no desplaza por sí sola esa calidad.',
      fuente:{cita:'Código del Trabajo, art. 3 letra a), texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dla-05-03':{
      pregunta:'Un contrato escrito individualiza a las partes, funciones, remuneración y plazo, pero omite la duración y distribución de la jornada ordinaria. La empresa no trabaja mediante sistema de turnos. ¿Cómo debe calificarse esa omisión?',
      opciones:[
        {id:'A',text:'Es irrelevante si el trabajador conoce de hecho su horario y recibe mensualmente la remuneración convenida'},
        {id:'B',text:'Sólo exige una comunicación administrativa posterior, pues la jornada no forma parte del contenido mínimo del contrato'},
        {id:'C',text:'Falta una estipulación mínima del contrato, porque la duración y distribución de la jornada deben constar salvo la excepción legal de turnos'},
        {id:'D',text:'La omisión transforma el contrato en uno de jornada libre, quedando la distribución entregada a la decisión del trabajador'}
      ],respuesta:2,
      explicacion:'El artículo 10 N° 5 del Código del Trabajo exige indicar duración y distribución de la jornada de trabajo, salvo que en la empresa exista sistema de trabajo por turnos, caso en que se atiende al reglamento interno.',
      fuente:{cita:'Código del Trabajo, art. 10 N° 5, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-06-02':{
      pregunta:'Durante su horario pactado, un trabajador debe permanecer en la empresa disponible para reiniciar sus labores, pero una falla del sistema del empleador impide trabajar durante dos horas. ¿Ese lapso integra la jornada?',
      opciones:[
        {id:'A',text:'No, porque la jornada sólo comprende minutos en que existe una prestación material y efectiva del servicio contratado'},
        {id:'B',text:'Sólo si las dos horas exceden al final la jornada ordinaria pactada y reúnen además los requisitos del sobretiempo'},
        {id:'C',text:'Sí, porque permanece a disposición del empleador sin trabajar por una causa que no le es imputable'},
        {id:'D',text:'Sólo si el empleador reconoce después la falla y acuerda expresamente incorporarla al registro de asistencia'}
      ],respuesta:2,
      explicacion:'El artículo 21 del Código del Trabajo comprende tanto el tiempo de prestación efectiva como aquel en que el trabajador se encuentra a disposición del empleador sin realizar labor por causas que no le sean imputables.',
      fuente:{cita:'Código del Trabajo, art. 21, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dla-09-03':{
      pregunta:'Un empleador despide a un trabajador invocando una causal comprendida en el régimen del artículo 162, pero al momento de la separación mantiene cotizaciones previsionales impagas. ¿Qué efecto establece la regla de nulidad del despido?',
      opciones:[
        {id:'A',text:'El contrato termina en la fecha comunicada y la deuda previsional queda separada de los efectos laborales del despido'},
        {id:'B',text:'El despido queda convertido en una renuncia del trabajador y las cotizaciones pasan a cobrarse únicamente por vía previsional'},
        {id:'C',text:'El despido no produce el efecto de poner término al contrato mientras no se convalide en la forma legal, con las consecuencias remuneracionales correspondientes'},
        {id:'D',text:'La causal de término desaparece definitivamente y el empleador debe celebrar un nuevo contrato antes de poder poner fin a la relación'}
      ],respuesta:2,
      explicacion:'El artículo 162 dispone que, si al momento del despido no se han enterado íntegramente las cotizaciones exigidas por la norma, el despido no produce el efecto de terminar el contrato. El empleador puede convalidarlo pagando las imposiciones morosas y comunicándolo en la forma legal, debiendo soportar las consecuencias remuneracionales del período intermedio en los términos de la norma.',
      fuente:{cita:'Código del Trabajo, art. 162 incisos 5° a 7°, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-09-04':{
      pregunta:'Al suscribir un finiquito electrónico, un trabajador acepta las sumas no discutidas pero deja expresa reserva para demandar horas extraordinarias que estima adeudadas. El empleador sostiene que esa reserva impide pagar el resto del finiquito. ¿Cuál es la regla aplicable?',
      opciones:[
        {id:'A',text:'La reserva deja sin efecto íntegramente el finiquito y obliga a discutir judicialmente tanto las sumas aceptadas como las controvertidas'},
        {id:'B',text:'La reserva sólo produce efectos si el empleador la acepta expresamente en el mismo instrumento junto con las demás estipulaciones'},
        {id:'C',text:'La reserva puede consignarse por el trabajador y no impide el pago de las sumas no disputadas, manteniéndose la posibilidad de accionar por lo reservado'},
        {id:'D',text:'El trabajador debe elegir entre recibir las sumas reconocidas o formular reserva, porque ambas actuaciones son incompatibles en el finiquito'}
      ],respuesta:2,
      explicacion:'El artículo 177 permite que el trabajador formule reserva de derechos al suscribir el finiquito. La reserva no impide el pago de las sumas no disputadas y el trabajador puede dejar constancia de que se reserva el derecho a accionar judicialmente.',
      fuente:{cita:'Código del Trabajo, art. 177, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-10-01':{
      pregunta:'Las partes pactan teletrabajo y el anexo precisa modalidad, lugar, duración y mecanismos de supervisión, pero omite toda referencia al tiempo de desconexión. ¿Cumple ese anexo con las estipulaciones especiales exigidas para esta modalidad?',
      opciones:[
        {id:'A',text:'Sí, porque la desconexión se presume incorporada y no necesita aparecer entre las estipulaciones del acuerdo de teletrabajo'},
        {id:'B',text:'Sí, cuando el anexo identifica mecanismos de supervisión y duración, pues esos datos reemplazan la regulación de desconexión'},
        {id:'C',text:'No, porque el tiempo de desconexión integra el contenido especial que debe constar en el acuerdo de trabajo a distancia o teletrabajo'},
        {id:'D',text:'No, pero la consecuencia es que el acuerdo se convierte por ese solo hecho en una jornada presencial ordinaria dentro de la empresa'}
      ],respuesta:2,
      explicacion:'El artículo 152 quáter K enumera estipulaciones adicionales a las del artículo 10 y exige incluir, entre otras, el tiempo de desconexión.',
      fuente:{cita:'Código del Trabajo, art. 152 quáter K N° 6, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-11-02':{
      pregunta:'Un grupo de trabajadores del sector privado reúne los requisitos legales para constituir un sindicato, pero la empresa les exige obtener previamente una autorización de la gerencia. ¿Es jurídicamente necesaria esa autorización?',
      opciones:[
        {id:'A',text:'Sí, porque la constitución de una organización sindical requiere aprobación previa de la empresa donde prestan servicios sus fundadores'},
        {id:'B',text:'Sí, cuando el sindicato se constituye por primera vez en la empresa y todavía no existe una directiva sindical reconocida'},
        {id:'C',text:'No, porque los trabajadores tienen derecho a constituir organizaciones sindicales sin autorización previa, sujetándose a la normativa y a sus estatutos'},
        {id:'D',text:'No, porque la constitución depende de autorización de la Inspección del Trabajo y esa intervención reemplaza la aprobación empresarial'}
      ],respuesta:2,
      explicacion:'El artículo 212 reconoce a los trabajadores del sector privado y de empresas del Estado el derecho a constituir, sin autorización previa, las organizaciones sindicales que estimen convenientes, con sujeción a la ley y a sus estatutos.',
      fuente:{cita:'Código del Trabajo, art. 212, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dla-11-04':{
      pregunta:'Una empresa incorpora en los contratos nuevos una cláusula que exige al trabajador mantenerse desafiliado de organizaciones sindicales como condición para conservar el empleo. ¿Cómo se califica esa cláusula?',
      opciones:[
        {id:'A',text:'Es válida si se firma al inicio de la relación y la empresa ofrece una compensación económica equivalente durante su vigencia'},
        {id:'B',text:'Es válida respecto de cargos de confianza, porque la libertad sindical se transforma en una materia disponible por acuerdo individual'},
        {id:'C',text:'Es incompatible con la libertad de afiliación y con la prohibición de condicionar el empleo a la afiliación o desafiliación sindical'},
        {id:'D',text:'Sólo es ineficaz después de que se constituya un sindicato en la empresa, pues antes de ello no existe libertad sindical ejercitable'}
      ],respuesta:2,
      explicacion:'Los artículos 214 y 215 establecen el carácter voluntario, personal e indelegable de la afiliación sindical y prohíben condicionar el empleo a la afiliación o desafiliación a una organización sindical.',
      fuente:{cita:'Código del Trabajo, arts. 214 y 215, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-12-02':{
      pregunta:'Un proyecto de estatutos sindicales regula nombre, elecciones y patrimonio, pero no contiene reglas sobre requisitos de afiliación y desafiliación ni sobre derechos y obligaciones de los miembros. ¿Satisface el contenido estatutario exigido?',
      opciones:[
        {id:'A',text:'Sí, porque esas materias quedan entregadas a acuerdos posteriores de la directiva y no forman parte del contenido exigido al estatuto'},
        {id:'B',text:'Sí, si la asamblea constitutiva aprueba el proyecto por una mayoría suficiente y deja las reglas omitidas para el reglamento interno'},
        {id:'C',text:'No, porque el estatuto debe contemplar requisitos de afiliación y desafiliación y los derechos y obligaciones de sus miembros, entre otras materias'},
        {id:'D',text:'No, porque los estatutos sindicales deben limitarse a reglas de afiliación y patrimonio y no pueden incorporar mecanismos electorales propios'}
      ],respuesta:2,
      explicacion:'El artículo 231 exige que el estatuto contemple, entre otras materias, requisitos de afiliación y desafiliación, derechos y obligaciones de los miembros, requisitos para ser dirigente y mecanismos de modificación y disciplina interna.',
      fuente:{cita:'Código del Trabajo, art. 231, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-12-03':{
      pregunta:'Un director sindical se encuentra dentro del período de fuero y el empleador pretende despedirlo invocando una causal del artículo 160. ¿Qué exigencia procesal debe satisfacer antes de poner término al contrato?',
      opciones:[
        {id:'A',text:'Comunicar la causal a la organización sindical y esperar que su directorio confirme por escrito la decisión empresarial adoptada'},
        {id:'B',text:'Solicitar una autorización administrativa a la Inspección del Trabajo para que ésta decida si la causal está suficientemente acreditada'},
        {id:'C',text:'Obtener autorización previa del juez competente, pues el término de un contrato sujeto a fuero requiere desafuero en los casos legalmente habilitados'},
        {id:'D',text:'Pagar anticipadamente las indemnizaciones por término, porque ese pago sustituye la autorización previa mientras subsiste el fuero sindical'}
      ],respuesta:2,
      explicacion:'El artículo 243 reconoce fuero a los directores sindicales en los términos allí previstos. El artículo 174 exige autorización judicial previa para poner término al contrato de un trabajador aforado por las causales que la norma habilita, entre ellas las del artículo 160.',
      fuente:{cita:'Código del Trabajo, arts. 174 y 243, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-13-04':{
      pregunta:'Un trabajador está regido por un instrumento colectivo vigente que contempla un bono mensual. Posteriormente firma un anexo individual que reduce ese bono durante la vigencia del instrumento. ¿Qué regla prevalece?',
      opciones:[
        {id:'A',text:'El anexo posterior reduce el beneficio porque todo acuerdo individual posterior desplaza las estipulaciones colectivas anteriores entre las mismas partes'},
        {id:'B',text:'El anexo reduce el beneficio si fue firmado libremente, pues la vigencia del instrumento colectivo no limita modificaciones individuales de remuneración'},
        {id:'C',text:'La estipulación individual no puede disminuir remuneraciones, beneficios o derechos que correspondan al trabajador por el instrumento colectivo que lo rige'},
        {id:'D',text:'El bono queda suspendido hasta que el sindicato decida si incorpora o no el anexo individual al próximo proceso de negociación colectiva'}
      ],respuesta:2,
      explicacion:'El artículo 311 impide que las estipulaciones de un contrato individual disminuyan remuneraciones, beneficios y derechos que correspondan al trabajador por aplicación del instrumento colectivo que lo rige.',
      fuente:{cita:'Código del Trabajo, art. 311, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-15-02':{
      pregunta:'Durante una negociación colectiva, un integrante de la comisión negociadora entrega a terceros ajenos documentos recibidos del empleador que estaban identificados como confidenciales. ¿Qué calificación contempla el régimen de negociación colectiva?',
      opciones:[
        {id:'A',text:'Es una actuación neutra para la negociación, porque la confidencialidad de información empresarial sólo produce consecuencias contractuales civiles'},
        {id:'B',text:'Es una infracción atribuible únicamente al empleador, porque las prácticas desleales de negociación colectiva no alcanzan a trabajadores u organizaciones'},
        {id:'C',text:'Puede constituir práctica desleal, pues se contempla la divulgación a terceros ajenos de información recibida con carácter confidencial o reservado'},
        {id:'D',text:'Sólo puede sancionarse si la información divulgada contiene secretos industriales registrados y además existe daño patrimonial cuantificado'}
      ],respuesta:2,
      explicacion:'El artículo 404 incluye entre las prácticas desleales de trabajadores u organizaciones sindicales la divulgación a terceros ajenos a la negociación de documentos o información recibida del empleador con carácter confidencial o reservado.',
      fuente:{cita:'Código del Trabajo, art. 404 letra c), texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dla-15-03':{
      pregunta:'Presentado un proyecto de negociación colectiva reglada, el empleador se niega a recibir a la comisión negociadora sindical y a negociar dentro de los plazos legales. ¿Cómo califica el Código esa conducta?',
      opciones:[
        {id:'A',text:'Como una facultad empresarial de estrategia negociadora mientras no exista una huelga aprobada por los trabajadores involucrados'},
        {id:'B',text:'Como un incumplimiento meramente formal que sólo modifica los plazos de la negociación y no integra el régimen de prácticas desleales'},
        {id:'C',text:'Como una conducta expresamente contemplada entre las prácticas desleales del empleador que entorpecen la negociación colectiva'},
        {id:'D',text:'Como una causal que extingue el procedimiento y obliga al sindicato a iniciar una nueva negociación en el período siguiente'}
      ],respuesta:2,
      explicacion:'El artículo 403 letra b) considera práctica desleal del empleador la negativa a recibir a la comisión negociadora de los sindicatos negociantes o a negociar con ellos en los plazos y condiciones establecidos.',
      fuente:{cita:'Código del Trabajo, art. 403 letra b), texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpl-01-01':{
      pregunta:'Un trabajador demanda a su empleador el pago de remuneraciones adeudadas originadas directamente en su contrato de trabajo. En una comuna donde existe Juzgado de Letras del Trabajo, ¿qué tribunal conoce en principio de esa controversia por materia?',
      opciones:[
        {id:'A',text:'El Juzgado de Letras con competencia civil, porque el cobro de una suma de dinero convierte la controversia laboral en una obligación civil'},
        {id:'B',text:'El Juzgado de Cobranza Laboral y Previsional, aunque todavía no exista un título ejecutivo que permita iniciar una ejecución'},
        {id:'C',text:'El Juzgado de Letras del Trabajo, por tratarse de una cuestión entre empleador y trabajador derivada de la aplicación del contrato de trabajo'},
        {id:'D',text:'La Inspección del Trabajo con potestad jurisdiccional, porque las controversias de remuneración deben ser decididas administrativamente antes del juicio'}
      ],respuesta:2,
      explicacion:'El artículo 420 letra a) entrega a los Juzgados de Letras del Trabajo las cuestiones suscitadas entre empleadores y trabajadores por aplicación de normas laborales o derivadas de la interpretación y aplicación de contratos individuales o colectivos.',
      fuente:{cita:'Código del Trabajo, art. 420 letra a), texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'media-alta'
    },
    'pf93-dpl-01-02':{
      pregunta:'Un trabajador prestó servicios en Concepción para una empresa cuyo domicilio está en Santiago. Decide demandar una materia laboral ordinaria y no concurre una regla especial. ¿Qué alternativa territorial reconoce el régimen general?',
      opciones:[
        {id:'A',text:'Debe demandar en Santiago, porque el domicilio del empleador excluye la competencia del tribunal del lugar donde se prestaron los servicios'},
        {id:'B',text:'Debe demandar en Concepción, porque el lugar de prestación excluye la competencia del tribunal correspondiente al domicilio del demandado'},
        {id:'C',text:'Puede elegir entre el juez del domicilio del demandado y el del lugar donde se prestaron los servicios, sin perjuicio de reglas especiales'},
        {id:'D',text:'Puede pactar con el empleador un tribunal territorial distinto después de surgido el conflicto, aunque no exista conexión con domicilio o servicios'}
      ],respuesta:2,
      explicacion:'El artículo 423 establece, como regla, competencia del juez del domicilio del demandado o del lugar donde se presten o hayan prestado los servicios, a elección del demandante, sin perjuicio de leyes especiales, y prohíbe la prórroga expresa de la competencia territorial.',
      fuente:{cita:'Código del Trabajo, art. 423, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpl-02-04':{
      pregunta:'En un Juzgado de Letras del Trabajo, el administrador del tribunal propone dictar una sentencia definitiva por delegación del juez para agilizar la carga de trabajo. ¿Es compatible esa actuación con la organización jurisdiccional laboral?',
      opciones:[
        {id:'A',text:'Sí, porque las funciones administrativas del tribunal comprenden la potestad de resolver el fondo cuando existe delegación escrita del juez'},
        {id:'B',text:'Sí, cuando la sentencia versa sobre una pretensión de cuantía reducida y no contiene declaración sobre derechos fundamentales'},
        {id:'C',text:'No, porque la potestad jurisdiccional en estos asuntos corresponde al juez, que la ejerce unipersonalmente, y no al administrador del tribunal'},
        {id:'D',text:'No, porque las sentencias laborales deben ser dictadas por un tribunal colegiado integrado por el juez, el administrador y el jefe de unidad'}
      ],respuesta:2,
      explicacion:'Los artículos 418 y 419 distinguen organización administrativa y ejercicio jurisdiccional. Cada juez ejerce unipersonalmente la potestad jurisdiccional respecto de los asuntos encomendados a los tribunales laborales y de cobranza.',
      fuente:{cita:'Código del Trabajo, arts. 418 y 419, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpl-03-01':{
      pregunta:'En la audiencia preparatoria de un procedimiento laboral de aplicación general termina la discusión sin conciliación total y existen hechos sustanciales, pertinentes y controvertidos. ¿Cuál es una función propia de esa audiencia?',
      opciones:[
        {id:'A',text:'Recibir de inmediato toda la prueba testimonial y pericial y dictar sentencia definitiva después de los alegatos finales de las partes'},
        {id:'B',text:'Suspender el procedimiento para que la Inspección del Trabajo determine administrativamente cuáles hechos deberán ser probados en juicio'},
        {id:'C',text:'Recibir la causa a prueba, fijar los hechos a acreditar y resolver sobre la pertinencia de los medios probatorios ofrecidos para el juicio'},
        {id:'D',text:'Remitir los antecedentes a la Corte de Apelaciones para que ésta determine los hechos controvertidos y seleccione la prueba admisible'}
      ],respuesta:2,
      explicacion:'El artículo 453 regula la audiencia preparatoria: contempla conciliación, recepción de la causa a prueba cuando proceda, fijación de hechos a probar y decisión fundada sobre pertinencia de la prueba ofrecida, entre otras actuaciones.',
      fuente:{cita:'Código del Trabajo, art. 453 N°s 2, 3 y 4, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpl-05-01':{
      pregunta:'Un trabajador reclama judicialmente una pretensión laboral cuya cuantía asciende a doce ingresos mínimos mensuales y no corresponde a una materia sometida a otro procedimiento especial. Cumplida la etapa administrativa previa cuando sea exigible, ¿qué procedimiento corresponde por cuantía?',
      opciones:[
        {id:'A',text:'El procedimiento de aplicación general, porque las pretensiones superiores a diez ingresos mínimos quedan fuera del procedimiento abreviado'},
        {id:'B',text:'El procedimiento de tutela laboral, porque la cuantía inferior a veinte ingresos mínimos transforma la controversia en tutela de derechos'},
        {id:'C',text:'El procedimiento monitorio, porque su ámbito por cuantía comprende contiendas iguales o inferiores a quince ingresos mínimos mensuales'},
        {id:'D',text:'El procedimiento de cobranza previsional, porque toda pretensión dineraria inferior a quince ingresos mínimos debe tramitarse ejecutivamente'}
      ],respuesta:2,
      explicacion:'El artículo 496 somete al procedimiento monitorio las contiendas cuya cuantía sea igual o inferior a quince ingresos mínimos mensuales, sin considerar los aumentos allí excluidos, además de las materias que la propia disposición señala.',
      fuente:{cita:'Código del Trabajo, art. 496, texto vigente en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    },
    'pf93-dpl-06-02':{
      pregunta:'Una institución previsional pretende ejecutar judicialmente un título al que la legislación de seguridad social otorga mérito ejecutivo por cotizaciones impagas, en un territorio donde existe Juzgado de Cobranza Laboral y Previsional. ¿Qué tribunal es competente?',
      opciones:[
        {id:'A',text:'El Juzgado de Letras del Trabajo, porque toda obligación vinculada a una relación laboral debe iniciarse ante ese tribunal declarativo'},
        {id:'B',text:'El Juzgado de Letras con competencia civil, porque la existencia de un título ejecutivo desplaza la especialidad laboral y previsional'},
        {id:'C',text:'El Juzgado de Cobranza Laboral y Previsional, por tratarse de la ejecución de una obligación previsional respaldada por título ejecutivo'},
        {id:'D',text:'La Inspección del Trabajo, porque el cobro de cotizaciones tiene naturaleza administrativa hasta que el empleador formule oposición'}
      ],respuesta:2,
      explicacion:'El artículo 421 entrega a los Juzgados de Cobranza Laboral y Previsional los juicios sobre obligaciones emanadas de títulos a los que las leyes laborales o de seguridad social confieren mérito ejecutivo, especialmente los regidos por la Ley N° 17.322. Donde no existe ese tribunal especial, opera la regla sustitutiva que la norma establece.',
      fuente:{cita:'Código del Trabajo, art. 421; Ley N° 17.322 y Ley N° 20.023, textos vigentes en septiembre de 2026',verificada:false,revisadaEn:null},dificultad:'alta'
    }
  });

  function patchArray(bank){
    if(!Array.isArray(bank))return 0;
    let count=0;
    for(let i=0;i<bank.length;i++){
      const patch=L6_OVERRIDES[bank[i]?.id];
      if(!patch)continue;
      bank[i]={...bank[i],...patch,fuente:{...bank[i].fuente,...(patch.fuente||{})},revisionOrigen:'AUDITORIA_LABORAL_L6',reemplazoEditorial:true,revisionL6:true};
      count++;
    }
    return count;
  }

  let appliedL6=0;
  try{
    if(typeof PF93_DRAFT_COMMON!=='undefined')appliedL6+=patchArray(PF93_DRAFT_COMMON);
    if(typeof PF93_DRAFT_CIVIL!=='undefined')appliedL6+=patchArray(PF93_DRAFT_CIVIL);
    if(typeof PF93_DRAFT_PENAL!=='undefined')appliedL6+=patchArray(PF93_DRAFT_PENAL);
    if(typeof PF93_DRAFT_FAMILIA!=='undefined')appliedL6+=patchArray(PF93_DRAFT_FAMILIA);
    if(typeof PF93_DRAFT_LABORAL!=='undefined')appliedL6+=patchArray(PF93_DRAFT_LABORAL);
  }catch(_){appliedL6=-1;}

  const previous=root.PF93_REVIEW_WORKFLOW||{};
  root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L6_OVERRIDES,appliedL6});
})(typeof globalThis!=='undefined'?globalThis:window);

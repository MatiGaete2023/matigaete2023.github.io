/* Workflow de revisión PF93. Registra decisiones locales/exportables y aplica ajustes editoriales L1 trazables al pool de ejecución. */
(function (root) {
  'use strict';

  const SCHEMA_VERSION = 2;
  const STORAGE_KEY = 'aj-pf93-review-v2';

  const OPTIONS = Object.freeze({
    juridico: ['pendiente', 'correcto', 'dudoso', 'incorrecto'],
    fuente: ['pendiente', 'verificada', 'insuficiente', 'desactualizada'],
    redaccion: ['pendiente', 'apta', 'corregir'],
    distractores: ['pendiente', 'aptos', 'corregir'],
    dificultad: ['pendiente', 'adecuada', 'demasiado_facil', 'demasiado_dificil'],
    decision: [
      'revision_humana',
      'corregir_editorial',
      'verificar_juridicamente',
      'aprobada_juridicamente',
      'calibracion',
      'aprobada_produccion',
      'retirada'
    ]
  });

  const LABELS = Object.freeze({
    revision_humana: 'Revisión humana',
    corregir_editorial: 'Corregir editorialmente',
    verificar_juridicamente: 'Verificar jurídicamente',
    aprobada_juridicamente: 'Aprobada jurídicamente',
    calibracion: 'Calibración',
    aprobada_produccion: 'Aprobada para producción',
    retirada: 'Retirada'
  });

  /* Ajustes de contenido derivados de AUDITORIA_COMUN_L1.md.
   * Los registros originales permanecen en banco-comun.js y el mismo ID conserva trazabilidad.
   * Ninguna fuente queda marcada como verificada por esta transformación editorial.
   */
  const L1_OVERRIDES = Object.freeze({
    'pf93-dpo-02-01': {
      pregunta: 'Durante la tramitación de una causa pendiente, una de las partes intenta exponer privadamente al juez argumentos sobre el fondo fuera del tribunal. Conforme al COT, ¿qué conducta corresponde al juez?',
      opciones: [
        {id:'A',text:'Escucharla si luego informa a la contraparte'},
        {id:'B',text:'Abstenerse de dar oído a esa alegación fuera del tribunal'},
        {id:'C',text:'Escucharla si no recibe documentos'},
        {id:'D',text:'Recibirla sólo cuando el abogado tenga patrocinio vigente'}
      ],
      respuesta: 1,
      explicacion: 'El artículo 320 COT ordena a los jueces abstenerse de expresar o insinuar privadamente su juicio sobre asuntos que deben fallar y de dar oído a alegaciones que las partes o terceros intenten hacerles fuera del tribunal.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 320',verificada:false,revisadaEn:null},
      dificultad: 'media-alta'
    },
    'pf93-dpo-02-02': {
      pregunta: 'Un juez adquiere para sí un derecho que se encuentra litigándose en un juicio del cual conoce. ¿Cuál es la consecuencia que el COT asocia específicamente a esa adquisición?',
      opciones: [
        {id:'A',text:'El acto queda sujeto únicamente a recusación del juez'},
        {id:'B',text:'El acto es válido si el precio corresponde al valor de mercado'},
        {id:'C',text:'La adquisición está prohibida y el acto lleva consigo nulidad, sin perjuicio de las penas que correspondan'},
        {id:'D',text:'La adquisición sólo es ineficaz mientras la sentencia no quede firme'}
      ],
      respuesta: 2,
      explicacion: 'El artículo 321 COT prohíbe al juez adquirir para sí, su cónyuge o hijos las cosas o derechos litigiosos en los juicios de que conoce y dispone que el acto celebrado en contravención lleva consigo nulidad, sin perjuicio de las penas pertinentes.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 321',verificada:false,revisadaEn:null},
      dificultad: 'alta'
    },
    'pf93-dpo-02-03': {
      pregunta: 'Un juez altera el orden de antigüedad de los asuntos para fallar primero una causa que no tiene preferencia legal ni circunstancias graves y urgentes. ¿Qué regla del estatuto judicial resulta directamente comprometida?',
      opciones: [
        {id:'A',text:'La obligación de despachar los asuntos respetando su antigüedad, salvo las excepciones legales o circunstancias calificadas'},
        {id:'B',text:'La prohibición absoluta de alterar el orden aun respecto de asuntos con preferencia legal'},
        {id:'C',text:'La regla de prórroga tácita de competencia'},
        {id:'D',text:'La obligación de remitir toda causa urgente a la Corte Suprema'}
      ],
      respuesta: 0,
      explicacion: 'El artículo 319 COT impone el despacho en los plazos legales o con brevedad y, como regla, por orden de antigüedad, permitiendo las excepciones que la propia norma contempla.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 319',verificada:false,revisadaEn:null},
      dificultad: 'media-alta'
    },
    'pf93-dpo-02-04': {
      pregunta: 'Un funcionario judicial participa activamente en una manifestación de carácter político, más allá de emitir su voto personal. ¿Qué regla del COT es relevante para calificar la conducta?',
      opciones: [
        {id:'A',text:'La prohibición de intervenir en reuniones, manifestaciones u otros actos de carácter político en los términos del artículo 323'},
        {id:'B',text:'La causal de implicancia por haber manifestado dictamen sobre una cuestión pendiente'},
        {id:'C',text:'La prórroga de competencia territorial por conducta concluyente'},
        {id:'D',text:'La prohibición de adquirir derechos litigiosos del artículo 321'}
      ],
      respuesta: 0,
      explicacion: 'El artículo 323 COT contiene prohibiciones orientadas a preservar la prescindencia política de los funcionarios judiciales, entre ellas las relativas a participación electoral y actividades políticas en los términos legales.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 323',verificada:false,revisadaEn:null},
      dificultad: 'media'
    },
    'pf93-dpo-03-01': {
      pregunta: 'El juez que debe conocer una causa actuó anteriormente como abogado de una de las partes en esa misma causa. ¿Cómo califica el COT esa circunstancia?',
      opciones: [
        {id:'A',text:'Como causal de implicancia'},
        {id:'B',text:'Como causal de recusación sólo si la parte acredita perjuicio efectivo'},
        {id:'C',text:'Como circunstancia irrelevante si ya terminó el mandato'},
        {id:'D',text:'Como causal de incompetencia territorial prorrogable'}
      ],
      respuesta: 0,
      explicacion: 'El artículo 195 N° 5 COT contempla como causa de implicancia haber sido el juez abogado o apoderado de alguna de las partes en la causa actualmente sometida a su conocimiento.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 195 N° 5',verificada:false,revisadaEn:null},
      dificultad: 'media-alta'
    },
    'pf93-dpo-03-02': {
      pregunta: 'Un juez mantiene con una de las partes una amistad que se manifiesta por actos de estrecha familiaridad. Conforme al COT, ¿qué institución resulta específicamente aplicable?',
      opciones: [
        {id:'A',text:'Una causal de implicancia por parentesco'},
        {id:'B',text:'Una causal de recusación por amistad en los términos legales'},
        {id:'C',text:'Una causal automática de nulidad de toda actuación previa'},
        {id:'D',text:'Una causal de competencia absoluta del tribunal superior'}
      ],
      respuesta: 1,
      explicacion: 'El artículo 196 N° 15 COT establece como causal de recusación tener el juez con alguna de las partes amistad que se manifieste por actos de estrecha familiaridad.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 196 N° 15',verificada:false,revisadaEn:null},
      dificultad: 'media-alta'
    },
    'pf93-dpo-03-03': {
      pregunta: 'Un integrante del tribunal de juicio oral en lo penal actuó previamente como juez de garantía en el mismo procedimiento. ¿Qué efecto prevé el COT respecto de su intervención posterior?',
      opciones: [
        {id:'A',text:'Configura una causal especial de implicancia en materia criminal'},
        {id:'B',text:'Configura sólo recusación si la defensa demuestra enemistad'},
        {id:'C',text:'No produce inhabilidad porque ambos cargos ejercen jurisdicción'},
        {id:'D',text:'Sólo impide intervenir si dictó sentencia definitiva como juez de garantía'}
      ],
      respuesta: 0,
      explicacion: 'El artículo 195 COT contempla, para jueces con competencia criminal, como causal de implicancia que un miembro del tribunal oral haya actuado como juez de garantía en el mismo procedimiento.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 195, causales especiales para jueces con competencia criminal',verificada:false,revisadaEn:null},
      dificultad: 'alta'
    },
    'pf93-dpo-03-04': {
      pregunta: '¿Cuál afirmación reproduce correctamente la diferencia procesal básica que establece el COT entre implicancia y recusación?',
      opciones: [
        {id:'A',text:'Ambas sólo pueden declararse si una parte las solicita expresamente'},
        {id:'B',text:'La implicancia puede y debe declararse de oficio o a petición de parte; la recusación sólo puede entablarla la parte a quien pueda perjudicar la falta de imparcialidad'},
        {id:'C',text:'La recusación debe declararse siempre de oficio y la implicancia nunca'},
        {id:'D',text:'La implicancia y la recusación tienen idéntico régimen de iniciativa'}
      ],
      respuesta: 1,
      explicacion: 'El artículo 200 COT distingue expresamente la iniciativa: la implicancia puede y debe ser declarada de oficio o a petición de parte; la recusación sólo puede entablarla la parte que, según la presunción legal, puede resultar perjudicada.',
      fuente: {cita:'Código Orgánico de Tribunales, art. 200',verificada:false,revisadaEn:null},
      dificultad: 'alta'
    }
  });

  function applyL1Overrides(bank) {
    return (bank || []).map(q => {
      const patch = L1_OVERRIDES[q.id];
      if (!patch) return q;
      return {
        ...q,
        ...patch,
        fuente: {...q.fuente, ...(patch.fuente || {})},
        revisionOrigen: 'AUDITORIA_COMUN_L1',
        reemplazoEditorial: true
      };
    });
  }

  function patchArrayInPlace(bank) {
    if (!Array.isArray(bank)) return 0;
    let count = 0;
    for (let i = 0; i < bank.length; i++) {
      const patch = L1_OVERRIDES[bank[i]?.id];
      if (!patch) continue;
      bank[i] = {
        ...bank[i],
        ...patch,
        fuente: {...bank[i].fuente, ...(patch.fuente || {})},
        revisionOrigen: 'AUDITORIA_COMUN_L1',
        reemplazoEditorial: true
      };
      count++;
    }
    return count;
  }

  function emptyReview() {
    return {
      juridico: 'pendiente',
      fuente: 'pendiente',
      redaccion: 'pendiente',
      distractores: 'pendiente',
      dificultad: 'pendiente',
      decision: 'revision_humana',
      nota: '',
      revisor: '',
      fuenteDetalle: '',
      articuloInciso: '',
      criterioInterpretativo: '',
      fechaVerificacion: '',
      updatedAt: null
    };
  }

  function normalizeReview(raw) {
    const base = emptyReview();
    const r = raw && typeof raw === 'object' ? { ...base, ...raw } : base;
    for (const key of ['juridico', 'fuente', 'redaccion', 'distractores', 'dificultad', 'decision']) {
      if (!OPTIONS[key].includes(r[key])) r[key] = base[key];
    }
    for (const key of ['nota', 'revisor', 'fuenteDetalle', 'articuloInciso', 'criterioInterpretativo', 'fechaVerificacion']) {
      r[key] = typeof r[key] === 'string' ? r[key] : '';
    }
    return r;
  }

  function suggestedDecision(review) {
    const r = normalizeReview(review);
    if (r.juridico === 'incorrecto') return 'retirada';
    if (r.redaccion === 'corregir' || r.distractores === 'corregir') return 'corregir_editorial';
    if (r.juridico !== 'correcto' || r.fuente !== 'verificada') return 'verificar_juridicamente';
    if (r.redaccion === 'apta' && r.distractores === 'aptos') return 'aprobada_juridicamente';
    return 'revision_humana';
  }

  function productionGate(review, metrics) {
    const r = normalizeReview(review);
    const m = metrics || {};
    const reasons = [];
    if (r.juridico !== 'correcto') reasons.push('contenido jurídico no marcado como correcto');
    if (r.fuente !== 'verificada') reasons.push('fuente no verificada');
    if (r.redaccion !== 'apta') reasons.push('redacción no apta');
    if (r.distractores !== 'aptos') reasons.push('distractores no aptos');
    if (!['adecuada', 'pendiente'].includes(r.dificultad)) reasons.push('dificultad marcada para ajuste');
    if ((m.responses || 0) < 20) reasons.push('menos de 20 respuestas para calibración');
    if ((m.responses || 0) >= 20 && Number.isFinite(m.accuracy) && (m.accuracy < 0.20 || m.accuracy > 0.90)) {
      reasons.push('acierto empírico fuera del rango de alerta 20%-90%');
    }
    return { eligible: reasons.length === 0, reasons };
  }

  function nextRecommendedDecision(review, metrics) {
    const r = normalizeReview(review);
    const editorial = suggestedDecision(r);
    if (editorial !== 'aprobada_juridicamente') return editorial;
    const gate = productionGate(r, metrics);
    if ((metrics?.responses || 0) < 20) return 'calibracion';
    return gate.eligible ? 'aprobada_produccion' : 'calibracion';
  }

  function metricsFromHistory(history) {
    const acc = new Map();
    for (const session of Array.isArray(history) ? history : []) {
      for (const a of Array.isArray(session.answers) ? session.answers : []) {
        if (!a || !a.id) continue;
        if (!acc.has(a.id)) acc.set(a.id, { id: a.id, exposures: 0, responses: 0, correct: 0, omitted: 0, totalMs: 0, choices: [0, 0, 0, 0] });
        const m = acc.get(a.id);
        m.exposures++;
        if (a.omitted || a.correct === null || a.correct === undefined) {
          m.omitted++;
          continue;
        }
        m.responses++;
        if (a.correct) m.correct++;
        if (Number.isInteger(a.choice) && a.choice >= 0 && a.choice < 4) m.choices[a.choice]++;
        if (Number.isFinite(a.elapsedMs) && a.elapsedMs >= 0) m.totalMs += a.elapsedMs;
      }
    }
    const out = {};
    for (const [id, m] of acc.entries()) {
      out[id] = {
        ...m,
        accuracy: m.responses ? m.correct / m.responses : null,
        avgMs: m.responses ? Math.round(m.totalMs / m.responses) : null
      };
    }
    return out;
  }

  function reviewProgress(reviews, bank) {
    const counts = Object.fromEntries(OPTIONS.decision.map(x => [x, 0]));
    const source = reviews || {};
    for (const q of bank || []) {
      const d = normalizeReview(source[q.id]).decision;
      counts[d]++;
    }
    return counts;
  }

  /* Los bancos ya están cargados cuando revision-workflow.js se ejecuta en revision.html.
   * Se parchean en memoria antes de que la interfaz construya BANK. En Node/vm ocurre lo mismo
   * cuando el validador carga primero los bancos y luego este archivo.
   */
  let appliedL1 = 0;
  try {
    if (typeof PF93_DRAFT_COMMON !== 'undefined') appliedL1 += patchArrayInPlace(PF93_DRAFT_COMMON);
    if (typeof PF93_DRAFT_CIVIL !== 'undefined') appliedL1 += patchArrayInPlace(PF93_DRAFT_CIVIL);
    if (typeof PF93_DRAFT_PENAL !== 'undefined') appliedL1 += patchArrayInPlace(PF93_DRAFT_PENAL);
    if (typeof PF93_DRAFT_FAMILIA !== 'undefined') appliedL1 += patchArrayInPlace(PF93_DRAFT_FAMILIA);
    if (typeof PF93_DRAFT_LABORAL !== 'undefined') appliedL1 += patchArrayInPlace(PF93_DRAFT_LABORAL);
  } catch (_) {
    appliedL1 = -1;
  }

  root.PF93_REVIEW_WORKFLOW = Object.freeze({
    SCHEMA_VERSION,
    STORAGE_KEY,
    OPTIONS,
    LABELS,
    L1_OVERRIDES,
    appliedL1,
    applyL1Overrides,
    emptyReview,
    normalizeReview,
    suggestedDecision,
    productionGate,
    nextRecommendedDecision,
    metricsFromHistory,
    reviewProgress
  });
})(typeof globalThis !== 'undefined' ? globalThis : window);

/* Segunda pasada: reemplazos de los ocho ítems de riesgo alto del bloque común.
 * Se ejecuta después del workflow L1 y antes de que revision.html construya el pool BANK.
 * Las fuentes continúan como orientativas (`verificada:false`) hasta revisión humana.
 */
(function(root){
  'use strict';
  const L2_OVERRIDES=Object.freeze({
    'pf93-dco-07-04':{
      pregunta:'En una gestión pendiente ante un tribunal civil, una parte sostiene que la aplicación de un precepto legal decisivo produciría un resultado contrario a la Constitución. ¿Qué vía corresponde para obtener que ese precepto no se aplique en esa gestión?',
      opciones:[
        {id:'A',text:'Plantear un requerimiento de inaplicabilidad ante el Tribunal Constitucional, por la parte legitimada o por el juez del asunto'},
        {id:'B',text:'Interponer protección para que la Corte de Apelaciones elimine el precepto legal del ordenamiento con efectos generales'},
        {id:'C',text:'Deducir casación en el fondo antes de que exista sentencia, para que la Corte Suprema suspenda la vigencia de la ley'},
        {id:'D',text:'Solicitar al órgano administrativo competente que invalide el precepto legal por resultar contrario a la Constitución'}
      ],
      respuesta:0,
      explicacion:'El artículo 93 N° 6 de la Constitución atribuye al Tribunal Constitucional la inaplicabilidad de un precepto legal cuya aplicación en una gestión pendiente pueda resultar contraria a la Constitución; la cuestión puede ser planteada por una parte o por el juez que conoce del asunto.',
      fuente:{cita:'Constitución Política de la República, art. 93 N° 6 e inciso undécimo',verificada:false,revisadaEn:null},
      dificultad:'alta'
    },
    'pf93-dco-09-03':{
      pregunta:'Una persona es mantenida detenida con infracción de las exigencias constitucionales y legales. Si la pretensión urgente se dirige específicamente a restablecer su libertad personal y seguridad individual, ¿qué acción corresponde?',
      opciones:[
        {id:'A',text:'Acción de protección ante la Corte de Apelaciones por cualquier garantía del artículo 19'},
        {id:'B',text:'Recurso de reposición ante la autoridad que dispuso materialmente la detención'},
        {id:'C',text:'Acción de amparo destinada a corregir la privación, perturbación o amenaza ilegal de la libertad'},
        {id:'D',text:'Requerimiento de inaplicabilidad para obtener la libertad sin una gestión judicial pendiente'}
      ],
      respuesta:2,
      explicacion:'El artículo 21 de la Constitución establece el amparo respecto de arresto, detención o prisión ilegales y, en general, frente a privaciones, perturbaciones o amenazas ilegales a la libertad personal y seguridad individual.',
      fuente:{cita:'Constitución Política de la República, art. 21',verificada:false,revisadaEn:null},
      dificultad:'media-alta'
    },
    'pf93-dad-01-01':{
      pregunta:'El director de un servicio dicta una resolución sobre una materia que la ley atribuye expresamente a otro órgano, sosteniendo que su decisión es más conveniente para el interés público. ¿Cuál es el defecto jurídico central?',
      opciones:[
        {id:'A',text:'Falta de competencia del órgano que actuó, aunque la finalidad invocada sea de interés público'},
        {id:'B',text:'Falta de motivación suficiente, aun cuando el órgano tuviera competencia legal sobre la materia'},
        {id:'C',text:'Defecto de notificación del acto, aunque éste todavía no haya sido comunicado al interesado'},
        {id:'D',text:'Error de mérito o conveniencia que sólo puede corregirse mediante revocación administrativa'}
      ],
      respuesta:0,
      explicacion:'Los artículos 6 y 7 de la Constitución exigen que los órganos actúen dentro de su competencia y en la forma prescrita por la ley. La invocación de utilidad o conveniencia pública no crea una competencia que el ordenamiento no otorgó.',
      fuente:{cita:'Constitución Política de la República, arts. 6 y 7',verificada:false,revisadaEn:null},
      dificultad:'media-alta'
    },
    'pf93-dad-02-01':{
      pregunta:'Un órgano de la Administración dicta una resolución formal, en ejercicio de una potestad pública, que contiene una decisión destinada a producir efectos jurídicos. ¿Cómo la califica la Ley N° 19.880?',
      opciones:[
        {id:'A',text:'Como hecho administrativo material, porque toda actuación ejecutiva queda fuera del régimen de los actos administrativos'},
        {id:'B',text:'Como contrato administrativo, porque una decisión estatal supone siempre acuerdo de voluntades con su destinatario'},
        {id:'C',text:'Como acto administrativo, por tratarse de una decisión formal emitida en ejercicio de una potestad pública'},
        {id:'D',text:'Como dictamen consultivo, porque las resoluciones administrativas carecen por sí mismas de efectos jurídicos'}
      ],
      respuesta:2,
      explicacion:'El artículo 3 de la Ley N° 19.880 define el acto administrativo como una decisión formal emitida por un órgano de la Administración en ejercicio de una potestad pública y reconoce como formas típicas los decretos supremos y las resoluciones.',
      fuente:{cita:'Ley N° 19.880, art. 3',verificada:false,revisadaEn:null},
      dificultad:'media'
    },
    'pf93-dad-02-02':{
      pregunta:'Un acto administrativo fue válidamente notificado y su ejecución no ha sido suspendida. El interesado interpone un recurso administrativo. ¿Qué efecto general produce la presunción de legalidad, imperio y exigibilidad del artículo 3 de la Ley N° 19.880?',
      opciones:[
        {id:'A',text:'El acto mantiene en principio su eficacia y exigibilidad mientras no sea suspendido o dejado sin efecto por una vía jurídica procedente'},
        {id:'B',text:'La sola interposición del recurso suspende automáticamente la ejecución del acto hasta que exista una decisión definitiva'},
        {id:'C',text:'El acto adquiere cosa juzgada material y deja de ser susceptible de revisión por la Administración o por los tribunales'},
        {id:'D',text:'La Administración debe obtener una sentencia judicial previa antes de exigir el cumplimiento del acto recurrido'}
      ],
      respuesta:0,
      explicacion:'La presunción de legalidad, imperio y exigibilidad permite la eficacia del acto conforme al ordenamiento. La impugnación administrativa no suspende por sí sola su ejecución; la suspensión se rige por las reglas legales aplicables.',
      fuente:{cita:'Ley N° 19.880, arts. 3 y 57',verificada:false,revisadaEn:null},
      dificultad:'alta'
    },
    'pf93-dad-05-04':{
      pregunta:'Una autoridad está regularmente investida y respeta la forma legal, pero decide una materia que la Constitución y la ley entregan a otro órgano. Para el análisis de nulidad de derecho público, ¿qué presupuesto del artículo 7 resulta directamente infringido?',
      opciones:[
        {id:'A',text:'La investidura regular, porque toda infracción de competencia transforma retroactivamente el nombramiento de la autoridad'},
        {id:'B',text:'La forma prescrita por la ley, porque todo vicio de competencia se convierte necesariamente en un defecto formal'},
        {id:'C',text:'La competencia, porque el órgano ejerció una potestad que el ordenamiento no le había atribuido'},
        {id:'D',text:'La publicidad del acto, porque una decisión incompetente sólo es inválida cuando no se publica o notifica'}
      ],
      respuesta:2,
      explicacion:'El artículo 7 de la Constitución exige investidura regular, actuación dentro de la competencia y respeto de la forma prescrita por la ley. En el supuesto descrito, el déficit se localiza en la competencia; las consecuencias concretas deben analizarse según el remedio y régimen aplicables.',
      fuente:{cita:'Constitución Política de la República, art. 7',verificada:false,revisadaEn:null},
      dificultad:'media-alta'
    },
    'pf93-dad-07-04':{
      pregunta:'Un órgano de la Administración sometido al régimen del artículo 42 de la Ley N° 18.575 indemniza un daño causado por falta de servicio. Se acredita, además, que un funcionario incurrió en falta personal. ¿Qué prevé expresamente esa norma?',
      opciones:[
        {id:'A',text:'Que el Estado puede repetir contra el funcionario que incurrió en la falta personal'},
        {id:'B',text:'Que la víctima debe restituir la indemnización antes de ejercer cualquier acción contra el funcionario'},
        {id:'C',text:'Que la falta personal extingue la responsabilidad del órgano por la falta de servicio ya establecida'},
        {id:'D',text:'Que el funcionario queda liberado de responsabilidad interna una vez pagada la indemnización estatal'}
      ],
      respuesta:0,
      explicacion:'El artículo 42 de la Ley N° 18.575 establece responsabilidad por falta de servicio para los órganos sujetos a ese régimen y reconoce al Estado derecho a repetir contra el funcionario que hubiere incurrido en falta personal.',
      fuente:{cita:'DFL N° 1-19.653, Ley N° 18.575, art. 42',verificada:false,revisadaEn:null},
      dificultad:'media-alta'
    },
    'pf93-dpo-05-04':{
      pregunta:'En un juicio civil las partes alcanzan una conciliación total y se levanta el acta en los términos del artículo 267 del Código de Procedimiento Civil. ¿Qué efecto atribuye la ley a esa acta?',
      opciones:[
        {id:'A',text:'Produce sólo efectos contractuales entre las partes y requiere un juicio posterior para poder ejecutarse'},
        {id:'B',text:'Equivale a un desistimiento de la demanda y no contiene una decisión susceptible de cumplimiento forzado'},
        {id:'C',text:'Se estima como sentencia ejecutoriada para todos los efectos legales, en los términos del artículo 267'},
        {id:'D',text:'Queda sujeta a aprobación posterior de la Corte de Apelaciones antes de producir cualquier efecto procesal'}
      ],
      respuesta:2,
      explicacion:'El artículo 267 del Código de Procedimiento Civil dispone que de la conciliación total o parcial se levantará acta y que ésta se estimará como sentencia ejecutoriada para todos los efectos legales.',
      fuente:{cita:'Código de Procedimiento Civil, art. 267',verificada:false,revisadaEn:null},
      dificultad:'media-alta'
    }
  });

  function patchArray(bank){
    if(!Array.isArray(bank))return 0;
    let count=0;
    for(let i=0;i<bank.length;i++){
      const patch=L2_OVERRIDES[bank[i]?.id];
      if(!patch)continue;
      bank[i]={...bank[i],...patch,fuente:{...bank[i].fuente,...(patch.fuente||{})},revisionOrigen:'AUDITORIA_COMUN_L2',reemplazoEditorial:true,revisionL2:true};
      count++;
    }
    return count;
  }

  let appliedL2=0;
  try{
    if(typeof PF93_DRAFT_COMMON!=='undefined')appliedL2+=patchArray(PF93_DRAFT_COMMON);
    if(typeof PF93_DRAFT_CIVIL!=='undefined')appliedL2+=patchArray(PF93_DRAFT_CIVIL);
    if(typeof PF93_DRAFT_PENAL!=='undefined')appliedL2+=patchArray(PF93_DRAFT_PENAL);
    if(typeof PF93_DRAFT_FAMILIA!=='undefined')appliedL2+=patchArray(PF93_DRAFT_FAMILIA);
    if(typeof PF93_DRAFT_LABORAL!=='undefined')appliedL2+=patchArray(PF93_DRAFT_LABORAL);
  }catch(_){appliedL2=-1;}

  const previous=root.PF93_REVIEW_WORKFLOW||{};
  root.PF93_REVIEW_WORKFLOW=Object.freeze({...previous,L2_OVERRIDES,appliedL2});
})(typeof globalThis!=='undefined'?globalThis:window);

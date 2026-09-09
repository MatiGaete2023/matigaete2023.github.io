/* Workflow de revisión PF93. No modifica el banco fuente: registra decisiones locales/exportables. */
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

  root.PF93_REVIEW_WORKFLOW = Object.freeze({
    SCHEMA_VERSION,
    STORAGE_KEY,
    OPTIONS,
    LABELS,
    emptyReview,
    normalizeReview,
    suggestedDecision,
    productionGate,
    nextRecommendedDecision,
    metricsFromHistory,
    reviewProgress
  });
})(typeof globalThis !== 'undefined' ? globalThis : window);

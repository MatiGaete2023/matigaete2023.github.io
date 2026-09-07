const preguntas_multiples = [
  {
    id: "aj-pf91-001",
    materia: "Acto jurídico",
    pregunta: "¿Cuál de los siguientes es un elemento esencial del acto jurídico?",
    opciones: ["Condición", "Objeto", "Plazo", "Modo"],
    respuesta: 1,
    explicacion: "El objeto integra los requisitos del acto o contrato; las cosas de la esencia son aquellas sin las cuales no produce efecto alguno o degenera en otro contrato.",
    fuente: "Código Civil, arts. 1444 y 1445. Texto vigente en LeyChile, consultado el 7 de septiembre de 2026.",
    fuenteVerificada: true,
    version: "2026-09-07"
  },
  {
    id: "aj-pf91-002",
    materia: "Acto jurídico",
    pregunta: "El silencio como manifestación de voluntad en el acto jurídico...",
    opciones: ["Siempre se considera aceptación", "Nunca produce efectos", "Puede ser relevante si hay norma o costumbre", "Anula el consentimiento"],
    respuesta: 2,
    explicacion: "El silencio no equivale automáticamente a aceptación; puede adquirir relevancia cuando una norma, la costumbre o las circunstancias le atribuyen ese efecto.",
    fuente: "Contenido doctrinal pendiente de cotejo con su fuente original antes de utilizarlo como material evaluativo.",
    fuenteVerificada: false,
    version: "2026-09-07"
  }
];

function validarBanco(preguntas) {
  if (!Array.isArray(preguntas) || preguntas.length === 0) {
    throw new Error("El banco de preguntas está vacío.");
  }

  const ids = new Set();
  preguntas.forEach((item, indice) => {
    const camposDeTexto = ["id", "materia", "pregunta", "explicacion", "fuente", "version"];
    if (!item || camposDeTexto.some(campo => typeof item[campo] !== "string" || !item[campo].trim())) {
      throw new Error("Metadatos incompletos en la posición " + indice);
    }
    if (ids.has(item.id)) throw new Error("ID de pregunta duplicado: " + item.id);
    if (!Array.isArray(item.opciones) || item.opciones.length < 2 || item.opciones.some(opcion => typeof opcion !== "string" || !opcion.trim())) {
      throw new Error("Alternativas inválidas para " + item.id);
    }
    if (!Number.isInteger(item.respuesta) || item.respuesta < 0 || item.respuesta >= item.opciones.length) {
      throw new Error("Respuesta correcta inválida para " + item.id);
    }
    if (typeof item.fuenteVerificada !== "boolean") {
      throw new Error("Debe indicarse si la fuente está verificada para " + item.id);
    }
    ids.add(item.id);
  });

  return true;
}

validarBanco(preguntas_multiples);

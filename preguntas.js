const preguntas_multiples = [
  {
    id: "aj-pf91-001",
    materia: "Acto jurídico",
    pregunta: "¿Cuál de los siguientes es un elemento esencial del acto jurídico?",
    opciones: ["Condición", "Objeto", "Plazo", "Modo"],
    respuesta: 1,
    explicacion: "El objeto es un elemento esencial: sin él el acto jurídico no puede producir sus efectos propios.",
    fuente: "Banco AJ PF91 · revisar y citar la norma aplicable al ampliar el banco.",
    version: "2026-09"
  },
  {
    id: "aj-pf91-002",
    materia: "Acto jurídico",
    pregunta: "El silencio como manifestación de voluntad en el acto jurídico...",
    opciones: ["Siempre se considera aceptación", "Nunca produce efectos", "Puede ser relevante si hay norma o costumbre", "Anula el consentimiento"],
    respuesta: 2,
    explicacion: "El silencio no equivale automáticamente a aceptación; puede adquirir relevancia cuando una norma, la costumbre o las circunstancias le atribuyen ese efecto.",
    fuente: "Banco AJ PF91 · revisar y citar la norma aplicable al ampliar el banco.",
    version: "2026-09"
  }
];

function validarBanco(preguntas) {
  if (!Array.isArray(preguntas) || preguntas.length === 0) {
    throw new Error("El banco de preguntas está vacío.");
  }
  const ids = new Set();
  preguntas.forEach((item, indice) => {
    if (!item.id || ids.has(item.id)) throw new Error("ID de pregunta inválido o duplicado en la posición " + indice);
    if (!item.pregunta || !Array.isArray(item.opciones) || item.opciones.length < 2) {
      throw new Error("Pregunta incompleta en la posición " + indice);
    }
    if (!Number.isInteger(item.respuesta) || item.respuesta < 0 || item.respuesta >= item.opciones.length) {
      throw new Error("Respuesta correcta inválida para " + item.id);
    }
    ids.add(item.id);
  });
  return true;
}

validarBanco(preguntas_multiples);

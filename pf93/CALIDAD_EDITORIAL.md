# Línea base de calidad editorial PF93

Fecha de medición: 9 de septiembre de 2026.

Esta medición se ejecuta sobre el **pool efectivo de 451 preguntas**, después de aplicar los ocho ajustes L1 de DPO-02/DPO-03. Las alertas son heurísticas de construcción de ítems: no demuestran por sí solas que la respuesta jurídica sea incorrecta y tampoco sustituyen la revisión humana.

## Resultado global

- Preguntas totales: **451**.
- Sin alertas del triaje automático: **103**.
- Con una o más alertas: **348**.
- Severidad baja: **5**.
- Severidad media: **270**.
- Severidad alta: **73**.
- Severidad crítica estructural: **0**.

Las cantidades por alerta se solapan; una misma pregunta puede tener varias:

- clave considerablemente más larga que los distractores: **335**;
- al menos un distractor demasiado corto frente a la clave: **187**;
- señal normativa explícita sólo en la alternativa correcta: **71**;
- dos o más distractores con marcadores categóricos que no aparecen en la clave: **57**;
- enunciado metajurídico/metodológico: **12**.

La suma de alertas no equivale al número de preguntas afectadas. El dato relevante de registros únicos es 348/451.

## Resultado por código

| Código | Total | Sin alertas | Con alertas | Riesgo alto |
|---|---:|---:|---:|---:|
| DCO | 36 | 17 | 19 | 2 |
| DAD | 28 | 3 | 25 | 5 |
| DPO | 20 | 8 | 12 | 1 |
| DCI | 54 | 23 | 31 | 4 |
| DPC | 43 | 4 | 39 | 6 |
| DPP | 54 | 13 | 41 | 9 |
| DPE | 56 | 14 | 42 | 9 |
| DFA | 42 | 6 | 36 | 11 |
| DPFA | 32 | 3 | 29 | 7 |
| DLA | 62 | 9 | 53 | 13 |
| DPL | 24 | 3 | 21 | 6 |

## Interpretación

La cobertura temática 451/451 está completa, pero **la cobertura no equivale a calidad de instrumento**. La mayor debilidad transversal del banco generado es la asimetría entre la alternativa correcta y los distractores. En muchas preguntas, la correcta explica o matiza una regla mientras las incorrectas son mucho más cortas, categóricas o claramente ajenas al mismo plano jurídico. Para un postulante abogado esto permite acertar por forma, no por conocimiento.

La distribución de la letra correcta en los archivos fuente también es desigual (A 58, B 171, C 58, D 164), pero la interfaz baraja las alternativas al construir cada sesión y conserva la clave después del barajado. Por eso esa desigualdad es un problema de higiene del banco fuente, no una pista de letra directamente observable por el usuario final en la ejecución normal.

## Triaje implementado

`triaje.html` permite filtrar por código, severidad, tipo de alerta y texto, ordenar por puntaje de riesgo y exportar un CSV o copiar los IDs visibles. La finalidad es corregir primero los registros que más probablemente fallen como preguntas de selección múltiple.

`calidad-editorial.js` expone el mismo análisis como motor reutilizable. Ninguna alerta produce un retiro automático.

## Regla de producción

El compilador `compilar_produccion.cjs` es deliberadamente más estricto que la estación de revisión. Aunque una persona marque un ítem como `aprobada_produccion`, éste no entra al banco compilado mientras persista una alerta del triaje editorial. Además exige trazabilidad de fuente, revisor, fecha y calibración empírica.

Esto separa tres conceptos que antes podían confundirse:

1. **cobertura:** existe una pregunta para el tema;
2. **aprobación humana:** un revisor considera correcto y apto el contenido;
3. **producción:** además de la aprobación, el ítem pasa controles reproducibles de forma y calibración.

## Prioridad de corrección

Para la siguiente iteración editorial, el orden recomendado es:

1. las 73 preguntas de riesgo alto;
2. las 12 preguntas metajurídicas, aunque algunas estén contenidas en el grupo anterior;
3. preguntas con `cita_solo_clave`;
4. preguntas con clave larga + distractor corto simultáneamente;
5. restantes alertas medias;
6. las 103 preguntas sin alerta pasan antes a revisión jurídica, porque no necesitan una corrección formal previa detectable por estas reglas.

La línea base deberá recalcularse después de cada lote importante de reformulaciones. El objetivo no es lograr artificialmente “cero alertas”, sino eliminar pistas formales sin introducir ambigüedad jurídica.
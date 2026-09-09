# PF93 — Preauditoría jurídica L1

Fecha de cotejo: 9 de septiembre de 2026.

## Alcance

Esta es una **preauditoría técnica asistida**, destinada a preparar la revisión humana. No equivale a aprobación jurídica humana y, por diseño, **no cambia `fuente.verificada:false`** en el banco de trabajo.

Se seleccionaron las 11 preguntas corregidas editorialmente en L12 para probar el circuito completo: contenido → fuente primaria → explicación → distractores → estado de revisión.

Estados usados:

- `CONCORDANTE_PRELIMINAR`: la clave y la explicación encuentran apoyo directo suficiente en la fuente primaria consultada.
- `CONCORDANTE_CON_CAUTELA`: la dirección de la respuesta tiene apoyo normativo, pero la formulación abarca un criterio que conviene cotejar también con jurisprudencia/doctrina antes de aprobación humana.
- `REVISAR`: no existe apoyo suficiente para proponer la aprobación.

## Resultado

| ID | Tema | Resultado | Fuente primaria cotejada | Observación |
|---|---|---|---|---|
| `pf93-dci-04-04` | DCI-04 | CONCORDANTE_PRELIMINAR | Código Civil, art. 702 | La posesión regular exige justo título y buena fe; si el título es traslaticio, también tradición. |
| `pf93-dpc-03-03` | DPC-03 | CONCORDANTE_PRELIMINAR | CPC, art. 7 inc. 2° | Transigir integra las facultades que no se entienden conferidas al procurador sin expresa mención. |
| `pf93-dpc-06-02` | DPC-06 | CONCORDANTE_PRELIMINAR | CPC, art. 170 N° 4–6 | La sentencia contiene consideraciones de hecho/derecho que la fundan y la decisión del asunto controvertido. |
| `pf93-dpp-06-03` | DPP-06 | CONCORDANTE_PRELIMINAR | CPP, arts. 159–160 | La nulidad presupone perjuicio reparable únicamente mediante nulidad; la ley contempla presunción de perjuicio en el supuesto del art. 160. |
| `pf93-dpp-13-02` | DPP-13 | CONCORDANTE_PRELIMINAR | CPP, art. 58 y régimen de acción civil | La responsabilidad penal y la responsabilidad civil no se confunden; el propio CPP distingue ambas consecuencias. |
| `pf93-dfa-04-04` | DFA-04 | CONCORDANTE_PRELIMINAR | Ley N° 20.830, art. 15 | El AUC no genera sociedad conyugal. La ley contempla conservación patrimonial y una comunidad especial si se pacta expresamente. |
| `pf93-dfa-08-02` | DFA-08 | CONCORDANTE_PRELIMINAR | Código Civil, arts. 334–336 | El derecho a alimentos futuros tiene restricciones de disposición distintas de las pensiones atrasadas, que pueden renunciarse o compensarse en los términos legales. |
| `pf93-dfa-09-02` | DFA-09 | CONCORDANTE_PRELIMINAR | Código Civil, art. 225 | El cuidado compartido está previsto mediante acuerdo de los padres separados; a falta de acuerdo, la atribución judicial opera en los términos que señala el artículo. |
| `pf93-dpfa-03-01` | DPFA-03 | CONCORDANTE_PRELIMINAR | Ley N° 19.968, art. 103 | La mediación supone un tercero imparcial, sin poder decisorio, que ayuda a las partes a buscar por sí mismas una solución. |
| `pf93-dpfa-07-02` | DPFA-07 | CONCORDANTE_PRELIMINAR | Ley N° 19.968, arts. 32 y 45 | La pericia no obliga al juez: toda la prueba se aprecia según sana crítica y la ley exige objetividad al perito. |
| `pf93-dpfa-08-04` | DPFA-08 | CONCORDANTE_CON_CAUTELA | Ley N° 19.968, art. 67; CPC, arts. 160 y 207 | El marco normativo respalda que el recurso no abre libremente un juicio fáctico nuevo; por las facultades oficiosas y particularidades del proceso de familia, conviene cotejar jurisprudencia antes de aprobar la formulación definitiva. |

Resultado del lote: **10 concordantes preliminares + 1 concordante con cautela + 0 sin apoyo detectado**.

## Fuentes oficiales consultadas

- Código Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=172986
- Código de Procedimiento Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=22740
- Código Procesal Penal, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=176595
- Ley N° 20.830, Acuerdo de Unión Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=1075210
- Ley N° 19.968, Tribunales de Familia, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=229557

## Regla de avance

La preauditoría no modifica automáticamente el estado de producción. Para pasar una pregunta a `aprobada_juridicamente`, el revisor humano debe comprobar al menos:

1. que la fuente citada esté vigente y sea aplicable al supuesto;
2. que la clave sea la única alternativa jurídicamente mejor;
3. que la explicación no exceda lo que la fuente sostiene;
4. que las alternativas incorrectas sean efectivamente incorrectas en el supuesto descrito;
5. cuando exista interpretación relevante, que se identifique jurisprudencia o doctrina suficiente y recuperable;
6. que quede registrado revisor, fecha, fuente/versión y artículo/inciso.

## Próxima cola jurídica

La revisión masiva no debe seguir por orden numérico ciego. Debe priorizar:

1. fuentes genéricas sin artículo o numeral;
2. preguntas jurisprudenciales sin rol/fecha identificable;
3. preguntas cuya clave dependa de excepciones, vigencia temporal o derecho transitorio;
4. temas donde el enunciado integra más de un cuerpo normativo;
5. finalmente, preguntas con una referencia normativa específica y directa.

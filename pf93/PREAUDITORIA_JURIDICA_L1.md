# PF93 — preauditoría jurídica L1

> **REGISTRO DE AUDITORÍA, NO ESTADO GLOBAL.** Este archivo documenta el primer lote de cotejo jurídico asistido. No equivale a aprobación jurídica humana y no cambia `fuente.verificada:false` en el banco de trabajo. Para la prioridad actual consultar [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md) y [`PAQUETE_REVISION_HUMANA.md`](PAQUETE_REVISION_HUMANA.md).

Fecha de cotejo: 9 de septiembre de 2026.

## Alcance

Se seleccionaron las 11 preguntas corregidas editorialmente en L12 para probar el circuito completo:

`contenido → fuente primaria → explicación → distractores → estado de revisión`.

Estados descriptivos usados en esta preauditoría:

- `CONCORDANTE_PRELIMINAR`: clave y explicación encuentran apoyo directo suficiente en la fuente primaria consultada para proponer revisión humana favorable.
- `CONCORDANTE_CON_CAUTELA`: la dirección de la respuesta tiene apoyo normativo, pero la formulación abarca un criterio que conviene cotejar también con jurisprudencia/doctrina antes de aprobación humana.
- `REVISAR`: no existe apoyo suficiente para proponer aprobación.

Estos rótulos **no son estados del workflow** y no deben confundirse con `aprobada_juridicamente`.

## Resultado

| ID | Tema | Resultado | Fuente primaria cotejada | Observación |
|---|---|---|---|---|
| `pf93-dci-04-04` | DCI-04 | CONCORDANTE_PRELIMINAR | Código Civil, art. 702 | La posesión regular exige justo título y buena fe; si el título es traslaticio, también tradición. |
| `pf93-dpc-03-03` | DPC-03 | CONCORDANTE_PRELIMINAR | CPC, art. 7 inc. 2° | Transigir integra las facultades que no se entienden conferidas al procurador sin expresa mención. |
| `pf93-dpc-06-02` | DPC-06 | CONCORDANTE_PRELIMINAR | CPC, art. 170 N° 4–6 | La sentencia contiene consideraciones de hecho/derecho que la fundan y la decisión del asunto controvertido. |
| `pf93-dpp-06-03` | DPP-06 | CONCORDANTE_PRELIMINAR | CPP, arts. 159–160 | La nulidad presupone perjuicio reparable únicamente mediante nulidad; la ley contempla presunción de perjuicio en el supuesto del art. 160. |
| `pf93-dpp-13-02` | DPP-13 | CONCORDANTE_PRELIMINAR | CPP, art. 58 y régimen de acción civil | La responsabilidad penal y la responsabilidad civil no se confunden; el CPP distingue ambas consecuencias. |
| `pf93-dfa-04-04` | DFA-04 | CONCORDANTE_PRELIMINAR | Ley N° 20.830, art. 15 | El AUC no genera sociedad conyugal por sí mismo. |
| `pf93-dfa-08-02` | DFA-08 | CONCORDANTE_PRELIMINAR | Código Civil, arts. 334–336 | Los alimentos futuros y pensiones atrasadas tienen reglas de disposición distintas. |
| `pf93-dfa-09-02` | DFA-09 | CONCORDANTE_PRELIMINAR | Código Civil, art. 225 | El cuidado personal compartido está sujeto a los presupuestos legales que regulan esa modalidad. |
| `pf93-dpfa-03-01` | DPFA-03 | CONCORDANTE_PRELIMINAR | Ley N° 19.968, art. 103 | La mediación supone tercero imparcial sin poder decisorio. |
| `pf93-dpfa-07-02` | DPFA-07 | CONCORDANTE_PRELIMINAR | Ley N° 19.968, arts. 32 y 45 | La pericia se valora junto con los demás antecedentes conforme a sana crítica. |
| `pf93-dpfa-08-04` | DPFA-08 | CONCORDANTE_CON_CAUTELA | Ley N° 19.968, art. 67; CPC, arts. 160 y 207 | El marco normativo limita la apertura libre de una controversia fáctica nueva en recurso, pero por las particularidades de familia conviene cotejar jurisprudencia antes de fijar la formulación definitiva. |

Resultado del lote: **10 concordantes preliminares + 1 concordante con cautela + 0 sin apoyo detectado**.

## Fuentes oficiales consultadas

- Código Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=172986
- Código de Procedimiento Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=22740
- Código Procesal Penal, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=176595
- Ley N° 20.830, Acuerdo de Unión Civil, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=1075210
- Ley N° 19.968, Tribunales de Familia, LeyChile/BCN: https://www.bcn.cl/leychile/navegar?idNorma=229557

La fecha de esta consulta forma parte del registro. Una revisión posterior debe volver a comprobar vigencia y modificaciones antes de aprobar producción.

## Regla de avance

Para pasar una pregunta a `aprobada_juridicamente`, el revisor humano debe comprobar al menos:

1. fuente vigente y aplicable;
2. única mejor respuesta;
3. explicación limitada a lo que la fuente sostiene;
4. distractores incorrectos bajo los hechos planteados;
5. jurisprudencia/doctrina identificable cuando la clave dependa de interpretación;
6. revisor, fecha, fuente/versión y artículo/inciso registrados.

## Relación con la cola jurídica actual

Al momento de esta preauditoría todavía no se había cuantificado completamente la calidad estructural de las 451 referencias. La auditoría posterior determinó:

- 183 normativas con artículo/numeral identificable;
- 228 normativas genéricas;
- 20 jurisprudenciales genéricas;
- 20 de otra naturaleza.

Por eficiencia, la estrategia vigente es construir primero una **semilla de aprobación** con las 183 referencias específicas, empezando por el bloque común, mientras las referencias jurisprudenciales genéricas de mayor riesgo se sanean en paralelo.

Por tanto, cualquier orden de revisión preliminar anterior a esa medición queda reemplazado por el definido en `ESTADO_PROYECTO.md` y `PAQUETE_REVISION_HUMANA.md`.

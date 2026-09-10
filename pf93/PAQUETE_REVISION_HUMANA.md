# PF93 — paquete operativo de revisión humana

Estado de referencia: 9 de septiembre de 2026.

> Este documento describe **cómo ejecutar** la revisión humana. Para cifras y fase vigente, consultar primero [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md). Para la jerarquía completa de documentos, ver [`DOCUMENTACION.md`](DOCUMENTACION.md).

## 1. Qué está listo

El producto de revisión contiene:

- **451 preguntas**;
- **109 temas PF93**;
- cobertura completa del blueprint editorial de 451 cupos;
- **0 alertas editoriales críticas, altas, medias o bajas** bajo las heurísticas automatizadas vigentes;
- distribución de posición de clave: **A 113 / B 113 / C 113 / D 112**;
- banco común + cuatro especialidades;
- simulación de entrenamiento de 90 preguntas;
- estación de revisión jurídica-editorial;
- triaje y exportación;
- compilador estricto de producción;
- CI que controla estructura, cobertura, calidad editorial, fuentes, documentación, workflow, compilador e integración HTML.

Esto significa que el banco está **editorial y técnicamente preparado para revisión jurídica humana**. No significa que las 451 preguntas estén jurídicamente aprobadas.

## 2. Estado de las fuentes

La auditoría `auditar_fuentes_juridicas.cjs` clasifica actualmente las 451 referencias orientativas así:

| Categoría | Preguntas | Lectura operativa |
|---|---:|---|
| Normativa con artículo/numeral identificable | 183 | Mejor punto de partida para una aprobación rápida, previa comprobación real del texto vigente. |
| Normativa genérica | 228 | Requiere reemplazar la referencia temática por artículo/inciso o disposición precisa. |
| Jurisprudencia genérica | 20 | Prioridad alta de saneamiento: identificar tribunal, rol, fecha y proposición jurídica. |
| Otra referencia | 20 | Requiere identificar la fuente primaria o secundaria que efectivamente sostenga la respuesta. |
| Sin cita | 0 | — |
| Marcadas `verificada:true` en borrador | 0 | Correcto: el borrador no se autocertifica. |

**268/451** preguntas requieren fortalecer la referencia antes de una aprobación jurídica robusta.

## 3. Dos colas de trabajo humano

### Cola A — semilla de producción

Objetivo: obtener con rapidez un subconjunto confiable para comenzar pruebas reales.

1. Revisar primero las **183 preguntas con referencia normativa específica**.
2. Dentro de ellas, priorizar el temario común DCO/DAD/DPO porque se utiliza con todas las especialidades.
3. Para cada pregunta comprobar:
   - vigencia de la norma;
   - correspondencia exacta artículo/inciso ↔ clave;
   - existencia de una sola respuesta jurídicamente mejor;
   - corrección de la explicación;
   - ausencia de excepción relevante omitida.
4. Sólo después registrar `fuente=verificada` y `juridico=correcto` en la estación de revisión.
5. Pasar a `aprobada_juridicamente`; la entrada a producción sigue requiriendo calibración.

### Cola B — saneamiento de fuentes

Objetivo: eliminar referencias vagas antes de intentar aprobación.

Orden de riesgo:

1. 20 referencias jurisprudenciales genéricas;
2. 20 referencias de otra naturaleza;
3. 228 referencias normativas genéricas.

Para jurisprudencia, registrar obligatoriamente: tribunal, rol, fecha, materia/proposición utilizada y referencia recuperable. Si la clave puede sostenerse directamente en una norma sin depender de jurisprudencia, simplificar la pregunta y usar la fuente normativa primaria.

## 4. Primera preauditoría ya efectuada

[`PREAUDITORIA_JURIDICA_L1.md`](PREAUDITORIA_JURIDICA_L1.md) contiene un lote piloto de 11 preguntas L12:

- 10 `CONCORDANTE_PRELIMINAR` con fuente primaria;
- 1 `CONCORDANTE_CON_CAUTELA` (`pf93-dpfa-08-04`), que debe cotejarse también en sede jurisprudencial por el alcance del recurso y las particularidades del proceso de familia;
- 0 ítems sin apoyo detectado en ese lote.

La preauditoría **no** cambió `fuente.verificada:false` porque la decisión de aprobación corresponde al revisor humano.

## 5. Flujo recomendado al revisor

Abrir `pf93/revision.html` y seleccionar **Estación de revisión humana**.

Para cada ítem:

1. resolverlo sin mirar la explicación;
2. determinar si existe una única alternativa jurídicamente correcta/mejor;
3. abrir la fuente primaria vigente;
4. contrastar enunciado, alternativa correcta y explicación;
5. revisar por separado los tres distractores;
6. completar:
   - contenido jurídico;
   - fuente;
   - redacción;
   - distractores;
   - dificultad;
   - revisor;
   - fecha;
   - fuente/versión;
   - artículo/inciso;
   - criterio jurisprudencial si corresponde;
   - nota;
7. guardar la revisión;
8. exportar periódicamente `revision-pf93.json`.

No usar `aprobada_produccion` como atajo: el compilador exige además calibración.

## 6. Criterios de rechazo o reconstrucción

Marcar `corregir_editorial`, `verificar_juridicamente` o `retirada` cuando ocurra al menos uno de estos supuestos:

- dos alternativas razonablemente defendibles;
- excepción legal omitida que cambia la clave;
- norma derogada o vigencia transitoria relevante;
- afirmación jurisprudencial sin precedente identificable;
- cuestión doctrinal controvertida presentada como regla legal unívoca;
- supuesto insuficiente para decidir;
- explicación más amplia que la regla comprobada;
- distractor que podría ser correcto bajo los mismos hechos;
- tema que no corresponde materialmente al código PF93 asignado.

## 7. Criterio para considerar el PR fusionable

No fusionar por el solo hecho de tener CI verde.

El PR puede pasar de `draft` a revisión final cuando, al menos:

1. CI se mantenga verde;
2. se haya realizado la revisión jurídica humana del subconjunto que se pretende usar;
3. ninguna pregunta de ese subconjunto mantenga fuente pendiente, vaga o desactualizada;
4. las preguntas jurisprudenciales usadas tengan precedente identificable;
5. exista una muestra suficiente de uso para calibración;
6. el compilador de producción genere el banco únicamente con preguntas que cumplan el gate;
7. se haya recorrido manualmente en navegador una simulación de 90 y los modos de revisión/exportación.

No es necesario aprobar las 451 para comenzar a utilizar el sistema: es preferible un núcleo menor, jurídicamente sólido y calibrado, manteniendo el resto en revisión.

## 8. Archivos que debe mirar el revisor

- [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md): estado y prioridades vigentes.
- `revision.html`: simulador + estación de revisión.
- `triaje.html`: control editorial; actualmente debe mostrar 451 limpias.
- [`PREAUDITORIA_JURIDICA_L1.md`](PREAUDITORIA_JURIDICA_L1.md): primera muestra de cotejo jurídico.
- `auditar_fuentes_juridicas.cjs`: clasificación y cola de fuentes.
- [`WORKFLOW_REVISION.md`](WORKFLOW_REVISION.md): reglas de estados y gates.
- `compilar_produccion.cjs`: construcción estricta del banco productivo.
- `validar_calidad_final.cjs`: invariante de calidad editorial y balance de claves.
- [`ARQUITECTURA.md`](ARQUITECTURA.md): ubicación de cada responsabilidad técnica.

## 9. Invariantes que no deben relajarse

- 451 preguntas y 109 temas del blueprint de referencia;
- una sola clave por pregunta;
- cuatro alternativas;
- cero alertas editoriales automatizadas;
- balance de claves 113/113/113/112 mientras el banco tenga 451 preguntas;
- `fuente.verificada:false` en borradores hasta revisión humana real;
- trazabilidad de capas y reemplazos;
- compilador como única vía para materializar un banco `aprobada_produccion`.

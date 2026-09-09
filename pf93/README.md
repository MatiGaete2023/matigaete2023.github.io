# PF93 — banco jurídico para revisión humana

## Estado del producto

Esta carpeta es una **compilación de revisión**, no un banco jurídicamente aprobado. Está diseñada para que una persona pueda usar el simulador como usuario final, detectar ambigüedades y transformar progresivamente cada ítem hasta un estado apto para producción.

- Temas oficiales modelados: **109**.
- Cupos de la convocatoria docente modelados: **451**.
- Preguntas de esta compilación: **451**.
- Estado fuente inicial de todas las preguntas: `revision_humana`.
- Fuentes marcadas como verificadas en los archivos de banco: **0** por diseño.
- Especialidades: civil, penal, familia y laboral, más temario común.
- Primera preauditoría sustantiva del bloque común: documentada en `AUDITORIA_COMUN_L1.md`.
- Ajustes L1 activos y trazables: **8**, correspondientes a DPO-02/DPO-03.

La decisión de revisión se guarda separadamente del banco fuente. Una cita orientativa no se transforma en `verificada` por el solo hecho de existir.

## Diagnóstico de calidad editorial

La validación estructural confirma 451 preguntas/109 temas sin errores estructurales, pero el triaje formal demuestra que el banco generado todavía necesita depuración antes de uso como instrumento formal:

- 103 preguntas sin alertas automáticas;
- 348 con una o más alertas;
- 73 en severidad alta;
- 335 con clave notablemente más larga que los distractores;
- 187 con algún distractor demasiado corto;
- 71 con señal normativa sólo en la correcta;
- 57 con absolutismos concentrados en distractores;
- 12 con enunciado metajurídico.

Estas cifras se solapan y corresponden a heurísticas, no a errores jurídicos demostrados. El detalle está en [`CALIDAD_EDITORIAL.md`](CALIDAD_EDITORIAL.md).

`triaje.html` permite revisar estas alertas por código y severidad antes de invertir tiempo en la revisión jurídica.

## Workflow progresivo

La estación `revision.html` reemplaza el antiguo control simple Aprobar/Corregir/Rechazar por seis ejes independientes:

- contenido jurídico;
- fuente;
- redacción;
- distractores;
- dificultad;
- decisión progresiva.

Los estados progresivos son:

`revision_humana` → `corregir_editorial` / `verificar_juridicamente` → `aprobada_juridicamente` → `calibracion` → `aprobada_produccion`.

`retirada` conserva trazabilidad de un ítem que no debe volver al pool activo.

La especificación completa está en [`WORKFLOW_REVISION.md`](WORKFLOW_REVISION.md).

## Cómo revisar como usuario final

1. Abrir `pf93/triaje.html` para identificar primero riesgo alto y preguntas con pistas formales.
2. Abrir `pf93/revision.html` mediante un servidor estático o una publicación de revisión.
3. Elegir especialidad.
4. Usar `Simulación PF93 · 90` para probar la experiencia de examen. La distribución se calcula proporcionalmente desde los cupos de la convocatoria docente y **no se presenta como distribución oficial de una prueba real**.
5. Usar `Estación de revisión humana` para controlar pregunta por pregunta.
6. Revisar separadamente contenido jurídico, fuente, redacción, distractores y dificultad.
7. Registrar revisor, fecha, fuente efectivamente cotejada, artículo/inciso y jurisprudencia o criterio interpretativo cuando corresponda.
8. Aplicar el estado sugerido o decidir manualmente. El sistema impide elevar una pregunta a aprobación jurídica o producción si no cumple los requisitos mínimos correspondientes.
9. Exportar `revision-pf93.json` y `metricas-revision-pf93.csv`.
10. Cuando exista revisión suficiente, ejecutar el compilador estricto de producción; revisar el banco resultante y su cobertura antes de integrarlo.

Los datos se almacenan únicamente en `localStorage` hasta su exportación. No modifican automáticamente los archivos del repositorio.

## Gate de producción en dos capas

La interfaz sólo permite marcar `aprobada_produccion` cuando el ítem supera el control jurídico/editorial y una calibración mínima inicial. Los umbrales de calibración son internos, no reglas de la Academia Judicial.

Después, `compilar_produccion.cjs` aplica una segunda barrera reproducible. Además de la decisión humana exige dificultad adecuada, identificación de revisor/fecha/fuente, referencia normativa o criterio interpretativo, calibración suficiente y ausencia de alertas editoriales pendientes.

Uso:

```bash
node pf93/compilar_produccion.cjs revision-pf93.json pf93/banco-produccion.js
```

Sólo la salida del compilador materializa `fuente.verificada:true`, usando los antecedentes concretos registrados por el revisor. El banco fuente permanece siempre como material de revisión.

## Jerarquía de fuentes usada para diseñar el producto

1. Reglamento General de la Academia Judicial publicado en Diario Oficial el 11 de junio de 2026: arquitectura general del proceso de selección.
2. Temario del proceso de selección para el Programa de Formación especial, aplicable desde PF N°93: alcance temático.
3. Bases 2026 de convocatoria docente para confección de preguntas: 90 preguntas en el examen de alternativas, códigos temáticos y cupos encargados por materia.
4. Bases 2026 de casos y Acta N°462 del Consejo: orientación sobre etapa de casos, razonamiento jurídico y rúbrica; se usan para orientar estilo, no para inventar reglas de distribución del examen de alternativas.

## Decisiones metodológicas

### 451 cupos no equivalen a una prueba de 451 preguntas

La convocatoria docente encarga un universo de preguntas por tema. El producto usa esos cupos como **blueprint de cobertura**. El examen señalado en las bases contiene 90 preguntas. No se encontró en las fuentes de trabajo una distribución oficial que diga cuántas de esas 90 corresponden exactamente a temario común o a cada submateria de la especialidad.

Por eso el modo de 90 preguntas calcula una ponderación proporcional sobre `común + especialidad elegida`. Es una política de simulación explícita y reemplazable.

### DCI-06 en sentido amplio

El temario PF93 expresa `Acciones posesorias y reivindicatorias`. Las bases de confección usan una formulación más breve para ese cupo. Para preparación se adopta **el sentido amplio del temario PF93**, conservando cuatro cupos. La diferencia documental queda trazada pero no bloquea la cobertura.

### Separación del banco histórico

La rama de origen conserva 484 registros históricos PF92/anteriores con filtros editoriales. Esta compilación no los sobrescribe ni los presenta como PF93 validados. Se creó un banco PF93 separado y temáticamente normalizado para evitar que duplicados históricos o etiquetas antiguas distorsionen la cobertura.

## Estructura

- `blueprint.js`: 109 temas, códigos, especialidad y cupo de cobertura.
- `banco-comun.js`: DCO + DAD + DPO.
- `banco-civil.js`: DCI + DPC.
- `banco-penal.js`: DPP + DPE.
- `banco-familia.js`: DFA + DPFA.
- `banco-laboral.js`: DLA + DPL.
- `revision-workflow.js`: estados, ajustes L1 activos, normalización, sugerencias, métricas y gate de revisión.
- `revision.html`: simulador y estación de revisión humana multicriterio.
- `calidad-editorial.js`: motor de alertas formales.
- `triaje.html`: tablero de priorización editorial.
- `CALIDAD_EDITORIAL.md`: línea base de riesgos.
- `AUDITORIA_COMUN_L1.md`: primera preauditoría sustantiva del bloque común.
- `compilar_produccion.cjs`: compilación estricta desde una revisión exportada.
- `validar_banco_pf93.cjs`: validación estructural, cobertura y alertas.
- `resumen_calidad.cjs`: resumen de riesgo único por pregunta y código.
- `validar_revision_workflow.cjs`, `validar_revision_html.cjs`, `validar_triaje_html.cjs` y `validar_compilador_produccion.cjs`: pruebas del circuito de revisión.
- `WORKFLOW_REVISION.md`: protocolo operativo de revisión, promoción y compilación.

## Criterios para aprobar jurídicamente un ítem

Un revisor no debería avanzar a `aprobada_juridicamente` hasta comprobar simultáneamente:

- el enunciado corresponde al tema PF93 asignado;
- existe una única alternativa defendible como correcta;
- los distractores son plausibles y no se descartan por pistas de longitud, absolutismos absurdos o diferencias formales;
- la explicación justifica la clave y no se limita a repetirla;
- la norma citada está vigente a la fecha de revisión, incluyendo reformas y régimen transitorio cuando sea pertinente;
- si la respuesta depende de jurisprudencia, el precedente o línea jurisprudencial está identificado y no se formula como regla absoluta cuando existe controversia;
- el ítem no exige conocimientos fuera del temario salvo contexto estrictamente necesario.

## Aceptación técnica

Desde la raíz del repositorio:

```bash
node --check pf93/revision-workflow.js
node --check pf93/calidad-editorial.js
node --check pf93/compilar_produccion.cjs
node pf93/validar_banco_pf93.cjs
node pf93/resumen_calidad.cjs
node pf93/validar_revision_workflow.cjs
node pf93/validar_compilador_produccion.cjs
node pf93/validar_revision_html.cjs
node pf93/validar_triaje_html.cjs
```

GitHub Actions ejecuta estas verificaciones. El banco debe terminar con 451 registros, 109 temas y `errorCount: 0`; el workflow y el compilador deben superar sus pruebas.

La comprobación funcional humana mínima comprende cuatro recorridos, uno por especialidad:

- iniciar simulación de 90 con el banco en revisión;
- responder, omitir, retroceder y terminar;
- comprobar desglose por código;
- abrir el triaje y filtrar/exportar alertas;
- abrir la estación de revisión y completar los seis ejes;
- comprobar que una aprobación jurídica inválida sea bloqueada;
- comprobar que producción quede bloqueada sin calibración suficiente;
- recargar y verificar persistencia;
- exportar JSON y CSV;
- comprobar filtros por estado y pool;
- ejecutar el compilador sobre una revisión exportada y comprobar que sólo incorpore registros que superen todas las barreras.

## Pendiente humano real

La etapa pendiente principal es **corregir las preguntas con pistas formales, validar jurídicamente las 451 preguntas y calibrar empíricamente las que superen esa revisión**. La infraestructura ya distingue cada fase y evita que la mera cobertura temática se confunda con un banco jurídicamente aprobado o listo para producción.

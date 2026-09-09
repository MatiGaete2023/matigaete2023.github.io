# PF93 — banco jurídico para revisión humana

## Estado del producto

Esta carpeta es una **compilación de revisión**, no un banco jurídicamente aprobado. Está diseñada para que una persona pueda usar el simulador como usuario final, detectar ambigüedades y transformar progresivamente cada ítem hasta un estado apto para producción.

- Temas oficiales modelados: **109**.
- Cupos de la convocatoria docente modelados: **451**.
- Preguntas de esta compilación: **451**.
- Estado fuente inicial de todas las preguntas: `revision_humana`.
- Fuentes marcadas como verificadas en los archivos de banco: **0** por diseño.
- Especialidades: civil, penal, familia y laboral, más temario común.

La decisión de revisión se guarda separadamente del banco fuente. Una cita orientativa no se transforma en `verificada` por el solo hecho de existir.

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

1. Abrir `pf93/revision.html` mediante un servidor estático o una publicación de revisión.
2. Elegir especialidad.
3. Usar `Simulación PF93 · 90` para probar la experiencia de examen. La distribución se calcula proporcionalmente desde los cupos de la convocatoria docente y **no se presenta como distribución oficial de una prueba real**.
4. Usar `Estación de revisión humana` para controlar pregunta por pregunta.
5. Revisar separadamente contenido jurídico, fuente, redacción, distractores y dificultad.
6. Registrar revisor, fecha, fuente efectivamente cotejada, artículo/inciso y jurisprudencia o criterio interpretativo cuando corresponda.
7. Aplicar el estado sugerido o decidir manualmente. El sistema impide elevar una pregunta a aprobación jurídica o producción si no cumple los requisitos mínimos correspondientes.
8. Exportar `revision-pf93.json` y `metricas-revision-pf93.csv`.

Los datos se almacenan únicamente en `localStorage` hasta su exportación. No modifican automáticamente los archivos del repositorio.

## Gate interno de producción

Una pregunta sólo puede marcarse `aprobada_produccion` desde la interfaz cuando:

- contenido jurídico = correcto;
- fuente = verificada;
- redacción = apta;
- distractores = aptos;
- no está marcada como demasiado fácil o demasiado difícil;
- acumula al menos 20 respuestas empíricas;
- el porcentaje de acierto no está bajo 20 % ni sobre 90 %.

Los umbrales 20 respuestas y 20 %-90 % son **parámetros internos iniciales de calibración**, no reglas de la Academia Judicial. Deben revisarse cuando exista una muestra real suficiente.

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
- `revision-workflow.js`: estados, normalización, sugerencias, métricas y gate de producción.
- `revision.html`: simulador y estación de revisión humana multicriterio.
- `validar_banco_pf93.cjs`: validación estructural, cuotas, IDs, duplicados exactos, alternativas y distribución de claves.
- `validar_revision_workflow.cjs`: pruebas automáticas del workflow progresivo.
- `WORKFLOW_REVISION.md`: protocolo operativo de revisión y promoción.

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
node pf93/validar_banco_pf93.cjs
node pf93/validar_revision_workflow.cjs
```

GitHub Actions ejecuta además la comprobación de sintaxis de los archivos JavaScript del banco. El banco debe terminar con 451 registros, 109 temas y `errorCount: 0`; el workflow debe terminar con `tests: "ok"`.

La comprobación funcional humana mínima comprende cuatro recorridos, uno por especialidad:

- iniciar simulación de 90 con el banco en revisión;
- responder, omitir, retroceder y terminar;
- comprobar desglose por código;
- abrir la estación de revisión y completar los seis ejes;
- comprobar que una aprobación jurídica inválida sea bloqueada;
- comprobar que producción quede bloqueada sin calibración suficiente;
- recargar y verificar persistencia;
- exportar JSON y CSV;
- comprobar filtros por estado y pool.

## Pendiente humano real

La etapa pendiente principal es **validación jurídica sustantiva de las 451 preguntas** y su posterior calibración empírica. La infraestructura ya distingue qué falta en cada ítem y evita declarar como `aprobada_produccion` una pregunta que todavía no ha cumplido los controles configurados.

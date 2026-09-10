# PF93 — banco jurídico para revisión humana

Esta carpeta contiene la línea de desarrollo vigente del simulador para preparación del Programa de Formación especial de la Academia Judicial. El producto está diseñado para transformar un **banco de cobertura editorial** en un subconjunto jurídicamente revisado, calibrado y apto para producción.

> Estado actual: cobertura y depuración editorial completas; verificación jurídica humana en curso. Para cifras vigentes, consultar [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md).

## Estado resumido

- 109 temas modelados.
- 451 preguntas de cobertura.
- 84 preguntas comunes + cuatro bloques de especialidad.
- 451/451 sin alertas editoriales automatizadas.
- Claves fuente equilibradas: A 113 / B 113 / C 113 / D 112.
- 183 referencias normativas con artículo/numeral identificable.
- 268 referencias que requieren fortalecimiento de fuente.
- 11 preguntas en la primera preauditoría jurídica: 10 concordantes preliminares y 1 concordante con cautela.
- 0 fuentes marcadas `verificada:true` en los bancos de borrador, por diseño.

La existencia de una cita no equivale a verificación jurídica. La revisión humana se registra separadamente y sólo el compilador de producción materializa el estado de fuente verificada.

## Qué es y qué no es este banco

Los 451 registros reproducen el **blueprint de cobertura** construido desde los cupos de confección de preguntas de la convocatoria docente 2026 y el temario aplicable desde PF N°93.

No se afirma que una prueba real tenga 451 preguntas. La etapa de alternativas descrita en las bases utiliza 90 preguntas. Tampoco se afirma una distribución oficial exacta de esas 90 entre bloque común y especialidad, porque esa distribución no está determinada en las fuentes de trabajo disponibles.

El modo de 90 usa una ponderación proporcional interna sobre `común + especialidad elegida`. Es una política de entrenamiento explícita, no una regla atribuida a la Academia Judicial.

## Entradas de usuario

### `revision.html`

Simulador y estación de revisión humana. Permite:

- elegir Civil, Penal, Familia o Laboral;
- simulación de 90, mini sesiones y práctica temática;
- revisar contenido jurídico, fuente, redacción, distractores y dificultad;
- registrar revisor, fecha, fuente/versión, artículo/inciso y criterio jurisprudencial;
- guardar localmente y exportar revisión/métricas.

### `triaje.html`

Tablero de calidad editorial. Las heurísticas actuales deben mostrar **451 preguntas limpias**. Su función permanece activa como control de regresiones futuras.

## Flujo de trabajo

El flujo operativo es:

`cobertura → corrección editorial → verificación jurídica → aprobación jurídica → calibración → aprobación de producción → compilación`

La fase de corrección editorial masiva ya está cerrada en el estado actual. La fase activa es la verificación jurídica.

El detalle de estados y gates está en [`WORKFLOW_REVISION.md`](WORKFLOW_REVISION.md).

## Prioridad actual

### Cola A — revisión jurídica directa

Revisar las **183 preguntas con referencia normativa específica**, comenzando por DCO, DAD y DPO por ser comunes a todas las especialidades.

Para cada ítem comprobar:

- vigencia y aplicabilidad de la disposición;
- correspondencia exacta entre enunciado, clave y artículo/inciso;
- existencia de una única mejor respuesta;
- corrección de la explicación;
- inexistencia de excepción o régimen transitorio omitido;
- corrección individual de los tres distractores.

### Cola B — saneamiento de fuentes

Fortalecer las **268 referencias débiles**:

- 20 jurisprudenciales genéricas;
- 20 de otra naturaleza;
- 228 normativas genéricas.

Si la clave depende de jurisprudencia, identificar tribunal, rol, fecha, proposición jurídica y referencia recuperable. Si puede sostenerse directamente en norma vigente, preferir la fuente primaria.

El procedimiento detallado está en [`PAQUETE_REVISION_HUMANA.md`](PAQUETE_REVISION_HUMANA.md).

## Gate de producción

Una pregunta no entra al banco productivo sólo porque una persona la marque como aprobada.

`compilar_produccion.cjs` exige, entre otros:

- decisión `aprobada_produccion`;
- contenido jurídico correcto;
- fuente verificada;
- redacción y distractores aptos;
- dificultad adecuada;
- revisor y fecha;
- fuente/versión efectiva;
- artículo/inciso o criterio interpretativo identificable;
- calibración mínima;
- cero alertas editoriales.

Uso:

```bash
node pf93/compilar_produccion.cjs revision-pf93.json pf93/banco-produccion.js
```

Los umbrales de calibración actuales son parámetros internos iniciales y no reglas de la Academia Judicial.

## Arquitectura

La explicación completa está en [`ARQUITECTURA.md`](ARQUITECTURA.md). En síntesis:

- `blueprint.js`: temas y cupos.
- `banco-comun.js`: DCO/DAD/DPO.
- `banco-civil.js`: DCI/DPC.
- `banco-penal.js`: DPP/DPE.
- `banco-familia.js`: DFA/DPFA.
- `banco-laboral.js`: DLA/DPL.
- `revision-workflow.js`: estados, revisión, métricas y ajustes iniciales.
- `ajustes-l*.js`: capas de corrección trazables.
- `capas-editoriales.cjs`: orden común de carga.
- `calidad-editorial.js`: heurísticas de triaje.
- `auditar_fuentes_juridicas.cjs`: clasificación estructural de referencias.
- `compilar_produccion.cjs`: gate reproducible de producción.
- `revision.html` y `triaje.html`: interfaces.

## Calidad editorial

El banco pasó de una línea base con numerosas pistas formales a **451/451 sin alertas** bajo las reglas actuales. El historial y los criterios del triaje están en [`CALIDAD_EDITORIAL.md`](CALIDAD_EDITORIAL.md).

Este resultado no debe interpretarse como certificación psicométrica ni jurídica. Sólo significa que las señales formales codificadas por el analizador no están presentes en el runtime actual.

## Revisión jurídica documentada

- [`AUDITORIA_COMUN_L1.md`](AUDITORIA_COMUN_L1.md): auditoría temprana del bloque común; es un documento histórico y varias observaciones editoriales fueron posteriormente abordadas por las capas L4–L13.
- [`PREAUDITORIA_JURIDICA_L1.md`](PREAUDITORIA_JURIDICA_L1.md): primer lote de 11 cotejos jurídicos sobre preguntas L12.

No usar una auditoría histórica como descripción del estado actual sin contrastarla con `ESTADO_PROYECTO.md` y el runtime vigente.

## DCI-06

El temario PF93 expresa `Acciones posesorias y reivindicatorias`, mientras la convocatoria de confección utiliza una formulación más breve. Para cobertura se adopta el sentido amplio del temario PF93 manteniendo cuatro cupos. La diferencia documental se conserva como decisión metodológica explícita.

## Separación del banco histórico

Los archivos `../index.html` y `../preguntas.js` pertenecen al simulador histórico de 484 registros. No forman parte del runtime PF93.

El material histórico puede reutilizarse por contenido cuando sea pertinente, sin excluirlo por una etiqueta PF92/PF93 antigua, pero debe reclasificarse contra el temario vigente y superar el mismo circuito editorial/jurídico.

## Validación técnica

Desde la raíz del repositorio:

```bash
node pf93/validar_banco_pf93.cjs
node pf93/resumen_calidad.cjs
node pf93/validar_calidad_final.cjs
node pf93/auditar_fuentes_juridicas.cjs
node pf93/validar_revision_workflow.cjs
node pf93/validar_compilador_produccion.cjs
node pf93/validar_revision_html.cjs
node pf93/validar_triaje_html.cjs
```

GitHub Actions ejecuta estas comprobaciones. La línea base vigente exige 451 preguntas, 109 temas, cero alertas editoriales, balance 113/113/113/112 y ausencia de fuentes autocertificadas en borrador.

## Documentación

El índice completo y las reglas de precedencia documental están en [`DOCUMENTACION.md`](DOCUMENTACION.md).

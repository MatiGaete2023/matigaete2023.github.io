# Simulador jurídico — Academia Judicial

Repositorio de trabajo para preparación de la etapa de conocimientos del Programa de Formación de la Academia Judicial de Chile.

## Qué contiene este repositorio

Conviven dos generaciones del producto y deben mantenerse conceptualmente separadas:

1. **Simulador histórico** en la raíz (`index.html` + `preguntas.js`): banco normalizado de 484 registros provenientes de material previo. Se conserva por trazabilidad y como antecedente de diseño. Su informe histórico es [`INFORME_SIMULADOR_JURIDICO.md`](INFORME_SIMULADOR_JURIDICO.md).
2. **Compilación PF93 actual** en [`pf93/`](pf93/): banco sistematizado conforme al temario especial aplicable desde PF N°93 y a los cupos de confección de preguntas de la convocatoria docente 2026. Esta es la línea de desarrollo vigente.

Las etiquetas PF92/PF93 de las preguntas históricas no determinan por sí solas su vigencia material: para reutilizar contenido se debe atender al problema jurídico y al temario sustantivo aplicable.

## Estado actual de PF93

La compilación vigente contiene:

- **109 temas** modelados;
- **451 preguntas** de cobertura editorial;
- bloque común: 84 preguntas;
- Civil: 97;
- Penal: 110;
- Familia: 74;
- Laboral: 86;
- **451/451 sin alertas editoriales automatizadas** bajo las heurísticas actuales;
- distribución de claves fuente equilibrada: **A 113 / B 113 / C 113 / D 112**;
- 183 referencias normativas con artículo o numeral identificable;
- 268 referencias que todavía deben fortalecerse antes de aprobación jurídica robusta;
- 11 preguntas incluidas en la primera preauditoría jurídica: 10 concordantes preliminares y 1 concordante con cautela.

Este estado significa **cobertura y depuración editorial completas**, no aprobación jurídica de las 451 preguntas. Los bancos fuente mantienen `fuente.verificada:false` hasta que exista revisión humana real.

El estado detallado y la próxima fase están en [`pf93/ESTADO_PROYECTO.md`](pf93/ESTADO_PROYECTO.md).

## Entradas principales

- [`pf93/revision.html`](pf93/revision.html): simulador PF93 y estación de revisión humana.
- [`pf93/triaje.html`](pf93/triaje.html): inspección de calidad editorial; en la línea base actual debe mostrar 451 preguntas limpias.
- [`pf93/README.md`](pf93/README.md): guía operativa de la compilación PF93.
- [`pf93/DOCUMENTACION.md`](pf93/DOCUMENTACION.md): índice y jerarquía de toda la documentación.

## Sobre las 451 y las 90 preguntas

Las **451** corresponden al blueprint utilizado para cubrir los cupos de confección de la convocatoria docente 2026. No se presentan como cantidad de preguntas de una prueba real. La etapa de alternativas descrita en las bases utiliza **90 preguntas**.

No existe en las fuentes de trabajo una distribución oficial publicada que permita afirmar cuántas de esas 90 corresponden exactamente al bloque común o a cada submateria de la especialidad. Por eso el simulador usa una ponderación proporcional de entrenamiento basada en los cupos de confección y la identifica expresamente como una decisión metodológica interna.

## Principios de mantenimiento

- No confundir cobertura con aprobación jurídica.
- No marcar una fuente como verificada por el solo hecho de estar citada.
- Mantener una única clave defendible y cuatro alternativas plausibles.
- No relajar los gates automáticos para hacer pasar una pregunta defectuosa.
- Conservar trazabilidad de correcciones editoriales y decisiones humanas.
- Usar el compilador de producción como única vía para materializar preguntas aprobadas.
- Mantener separados el banco histórico de la raíz y la compilación PF93.

## Documentación

La documentación viva está concentrada en `pf93/`. El orden de lectura recomendado es:

1. [`pf93/ESTADO_PROYECTO.md`](pf93/ESTADO_PROYECTO.md)
2. [`pf93/README.md`](pf93/README.md)
3. [`pf93/ARQUITECTURA.md`](pf93/ARQUITECTURA.md)
4. [`pf93/WORKFLOW_REVISION.md`](pf93/WORKFLOW_REVISION.md)
5. [`pf93/CALIDAD_EDITORIAL.md`](pf93/CALIDAD_EDITORIAL.md)
6. [`pf93/PAQUETE_REVISION_HUMANA.md`](pf93/PAQUETE_REVISION_HUMANA.md)

Las auditorías de etapas anteriores se conservan como evidencia histórica y no deben usarse como descripción del estado actual sin revisar primero `ESTADO_PROYECTO.md`.

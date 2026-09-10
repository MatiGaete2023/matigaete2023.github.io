# PF93 — mapa y jerarquía de documentación

Este archivo define qué documento debe consultarse para cada pregunta sobre el proyecto y cómo resolver contradicciones entre documentos antiguos y el estado actual.

## 1. Documentos vivos

Estos archivos describen el estado y funcionamiento vigente de la compilación PF93:

| Documento | Función | Cuándo consultarlo |
|---|---|---|
| [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md) | Snapshot operativo actual | Primero. Para saber qué está terminado, qué falta y cuáles son las cifras vigentes. |
| [`README.md`](README.md) | Guía general PF93 | Para entender objetivo, alcance, entradas de usuario y reglas básicas. |
| [`ARQUITECTURA.md`](ARQUITECTURA.md) | Arquitectura técnica y flujo de datos | Para modificar código, capas, validadores o integración. |
| [`WORKFLOW_REVISION.md`](WORKFLOW_REVISION.md) | Estados y gates de revisión | Para revisar preguntas, promover estados y compilar producción. |
| [`CALIDAD_EDITORIAL.md`](CALIDAD_EDITORIAL.md) | Sistema de triaje y estado editorial | Para entender heurísticas, línea base y criterio de aceptación editorial. |
| [`PAQUETE_REVISION_HUMANA.md`](PAQUETE_REVISION_HUMANA.md) | Procedimiento de trabajo humano | Para ejecutar la revisión jurídica y preparar el subconjunto de producción. |

## 2. Registros de auditoría

Los siguientes documentos son evidencia de una etapa concreta. Se conservan para trazabilidad, pero **no constituyen por sí solos el estado actual**:

| Documento | Alcance histórico |
|---|---|
| [`AUDITORIA_COMUN_L1.md`](AUDITORIA_COMUN_L1.md) | Primera auditoría sustantiva del bloque común DCO/DAD/DPO antes de las capas editoriales posteriores. |
| [`PREAUDITORIA_JURIDICA_L1.md`](PREAUDITORIA_JURIDICA_L1.md) | Primer lote de cotejo jurídico de 11 preguntas corregidas en L12. |

Cuando una observación de estas auditorías haya sido subsanada por una capa posterior, prevalece el estado efectivo cargado por el runtime y la medición actual de CI.

## 3. Documentación histórica de la raíz

[`../INFORME_SIMULADOR_JURIDICO.md`](../INFORME_SIMULADOR_JURIDICO.md) documenta el simulador histórico de 484 registros. No describe la compilación PF93 de 451 preguntas.

El banco histórico se conserva porque contiene material y decisiones de diseño reutilizables, pero su taxonomía y métricas no deben mezclarse con las del banco PF93.

## 4. Orden de autoridad cuando hay diferencias

Para hechos técnicos verificables del repositorio, usar este orden:

1. **runtime efectivo + validadores de CI**;
2. `ESTADO_PROYECTO.md` actualizado después del último run verde;
3. documentación viva específica (`ARQUITECTURA`, `WORKFLOW`, `CALIDAD_EDITORIAL`);
4. auditorías históricas;
5. documentación del simulador histórico.

Para corrección jurídica, el código y CI **no son autoridad jurídica**. La autoridad debe provenir de la fuente normativa vigente y, cuando corresponda, de jurisprudencia o doctrina identificable, con revisión humana registrada.

## 5. Qué debe actualizarse después de cada cambio

### Cambio en cobertura, códigos o cupos
Actualizar:
- `blueprint.js`;
- `ESTADO_PROYECTO.md`;
- `README.md` si cambia una cifra estructural;
- validadores correspondientes.

### Nueva capa editorial o modificación masiva de preguntas
Actualizar:
- código de la capa;
- `ARQUITECTURA.md` si cambia el flujo;
- `CALIDAD_EDITORIAL.md` con el resultado posterior al gate;
- `ESTADO_PROYECTO.md`.

### Nueva revisión jurídica
Actualizar:
- registro humano/exportación correspondiente;
- auditoría jurídica si se trata de un lote documentado;
- `ESTADO_PROYECTO.md` con cifras comprobadas;
- `PAQUETE_REVISION_HUMANA.md` sólo si cambia el procedimiento o las prioridades.

### Cambio en gates, estados o calibración
Actualizar:
- `revision-workflow.js` y/o compilador;
- `WORKFLOW_REVISION.md`;
- pruebas automáticas;
- `ESTADO_PROYECTO.md`.

## 6. Regla contra documentación obsoleta

No copiar cifras desde una auditoría anterior sin ejecutar o consultar primero los validadores actuales. En particular, las cifras de alertas editoriales previas a L12/L13 son **línea base histórica**, no estado vigente.

Las cifras vigentes a la fecha de este índice están centralizadas en `ESTADO_PROYECTO.md` y deben ser sustituidas allí cuando cambien, evitando replicarlas innecesariamente en muchos documentos.

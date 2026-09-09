# Workflow progresivo de revisión PF93

Este documento define cómo transformar las 451 preguntas de cobertura editorial en un banco apto para uso formal. Los estados no sustituyen el juicio del revisor y no convierten una cita orientativa en fuente verificada.

## Estados

1. `revision_humana`: registro recién incorporado o migrado, sin decisión suficiente.
2. `corregir_editorial`: el objetivo jurídico puede servir, pero hay un defecto de redacción o de distractores.
3. `verificar_juridicamente`: falta comprobar norma vigente, fuente, interpretación o unicidad de la clave.
4. `aprobada_juridicamente`: contenido correcto, fuente verificada, redacción apta y distractores aptos.
5. `calibracion`: jurídicamente apta, pero todavía debe observarse su funcionamiento empírico.
6. `aprobada_produccion`: supera revisión jurídica/editorial y el gate interno de calibración; puede integrar el pool formal del simulador.
7. `retirada`: no debe volver al pool activo; se conserva la decisión para trazabilidad.

## Ejes independientes de revisión

Cada pregunta registra:

- **Contenido jurídico:** pendiente / correcto / dudoso / incorrecto.
- **Fuente:** pendiente / verificada / insuficiente / desactualizada.
- **Redacción:** pendiente / apta / corregir.
- **Distractores:** pendiente / aptos / corregir.
- **Dificultad:** pendiente / adecuada / demasiado fácil / demasiado difícil.
- **Decisión progresiva:** uno de los siete estados anteriores.

Además admite revisor, fecha, fuente o versión efectivamente consultada, artículo/inciso, criterio interpretativo o jurisprudencia y nota de corrección.

## Reglas de avance

`aprobada_juridicamente`, `calibracion` y `aprobada_produccion` exigen simultáneamente:

- contenido jurídico = `correcto`;
- fuente = `verificada`;
- redacción = `apta`;
- distractores = `aptos`.

Si el contenido es `incorrecto`, el sistema sugiere `retirada`. Si redacción o distractores requieren corrección, sugiere `corregir_editorial`. Si falta fuente o certeza jurídica, sugiere `verificar_juridicamente`.

## Gate interno de producción

El sistema no permite aprobar para producción mientras no se cumplan los requisitos jurídicos/editoriales y, además:

- existan al menos **20 respuestas empíricas** para el ítem;
- el porcentaje de acierto no esté en zona de alerta extrema (<20 % o >90 %);
- la dificultad no esté expresamente marcada como demasiado fácil o demasiado difícil.

Los valores 20 %, 90 % y 20 respuestas son **umbrales internos iniciales de calibración**, no parámetros de la Academia Judicial. Deben revisarse cuando exista una muestra suficiente de uso real.

## Datos de calibración

Por pregunta se registran localmente:

- exposiciones;
- respuestas;
- correctas;
- omisiones;
- distribución de selección entre las cuatro alternativas originales;
- porcentaje de acierto;
- tiempo medio de respuesta.

La finalidad es detectar preguntas demasiado fáciles, demasiado difíciles, ambiguas o con distractores inoperantes. La métrica no reemplaza la revisión jurídica.

## Migración desde la revisión simple v1

La versión anterior sólo permitía Aprobar / Corregir / Rechazar. Al migrar:

- `corregir` pasa a `corregir_editorial`;
- `rechazada` pasa a `retirada`;
- una antigua `aprobada` **no** pasa a aprobación jurídica, porque aquella decisión no acreditaba fuente verificada ni los controles separados. Se conserva como `revision_humana` con nota de migración.

Esta regla evita elevar automáticamente preguntas a un estándar que la interfaz anterior no podía demostrar.

## Orden recomendado de revisión

1. Bloque común: DCO + DAD + DPO (84 preguntas).
2. Especialidad que utilizará efectivamente el postulante.
3. Restantes especialidades.
4. Calibración de las preguntas jurídicamente aprobadas.
5. Pool de producción cuando exista cantidad suficiente para generar simulaciones sin degradar la cobertura temática.

## Exportaciones

`revision.html` permite exportar:

- `revision-pf93.json`: revisión completa, métricas y versión del blueprint;
- `metricas-revision-pf93.csv`: una fila por pregunta con estado, controles, métricas y gate de producción.

Los datos de revisión se guardan en `localStorage`; no modifican por sí solos los archivos del repositorio. Para consolidarlos en el banco fuente debe existir una revisión de cambios y commit explícito.

## Criterio de uso del simulador

- **Todo el banco en revisión:** útil para control editorial y pruebas internas.
- **Aprobadas jurídicamente o superiores:** práctica con contenido que ya superó el control jurídico-editorial, aunque pueda faltar calibración.
- **Sólo aprobadas para producción:** modo destinado al producto formal una vez que exista volumen suficiente.

La simulación de 90 preguntas continúa usando una ponderación de entrenamiento basada en los cupos de confección de la convocatoria. Esa ponderación no se presenta como distribución oficial publicada del examen real.

# Workflow progresivo de revisión PF93

Este documento define cómo transformar las 451 preguntas de cobertura editorial en un banco apto para uso formal. Los estados no sustituyen el juicio del revisor y no convierten una cita orientativa en fuente verificada.

## Estados

1. `revision_humana`: registro recién incorporado o migrado, sin decisión suficiente.
2. `corregir_editorial`: el objetivo jurídico puede servir, pero hay un defecto de redacción o de distractores.
3. `verificar_juridicamente`: falta comprobar norma vigente, fuente, interpretación o unicidad de la clave.
4. `aprobada_juridicamente`: contenido correcto, fuente verificada, redacción apta y distractores aptos.
5. `calibracion`: jurídicamente apta, pero todavía debe observarse su funcionamiento empírico.
6. `aprobada_produccion`: supera revisión jurídica/editorial y el gate interno de calibración; queda candidata a integrar el banco formal.
7. `retirada`: no debe volver al pool activo; se conserva la decisión para trazabilidad.

La decisión `aprobada_produccion` de la interfaz es necesaria, pero **no suficiente** para materializar una pregunta en el archivo final: el compilador estricto aplica controles adicionales reproducibles.

## Ejes independientes de revisión

Cada pregunta registra:

- **Contenido jurídico:** pendiente / correcto / dudoso / incorrecto.
- **Fuente:** pendiente / verificada / insuficiente / desactualizada.
- **Redacción:** pendiente / apta / corregir.
- **Distractores:** pendiente / aptos / corregir.
- **Dificultad:** pendiente / adecuada / demasiado fácil / demasiado difícil.
- **Decisión progresiva:** uno de los siete estados anteriores.

Además admite revisor, fecha, fuente o versión efectivamente consultada, artículo/inciso, criterio interpretativo o jurisprudencia y nota de corrección.

## Triaje editorial previo

Antes de invertir tiempo en cotejo normativo, `triaje.html` y `calidad-editorial.js` detectan señales formales que pueden permitir responder sin suficiente conocimiento jurídico:

- alternativa correcta considerablemente más larga;
- referencia normativa explícita sólo en la clave;
- distractores excesivamente cortos;
- distractores con absolutismos o marcadores categóricos;
- enunciados metajurídicos/metodológicos.

Las alertas no cambian el estado jurídico y no retiran preguntas automáticamente. Sirven para priorizar `corregir_editorial` antes de la revisión normativa. La línea base y las cifras por código están documentadas en `CALIDAD_EDITORIAL.md`.

## Reglas de avance

`aprobada_juridicamente`, `calibracion` y `aprobada_produccion` exigen simultáneamente en la interfaz:

- contenido jurídico = `correcto`;
- fuente = `verificada`;
- redacción = `apta`;
- distractores = `aptos`.

Si el contenido es `incorrecto`, el sistema sugiere `retirada`. Si redacción o distractores requieren corrección, sugiere `corregir_editorial`. Si falta fuente o certeza jurídica, sugiere `verificar_juridicamente`.

## Gate interno de producción de la interfaz

La interfaz no permite aprobar para producción mientras no se cumplan los requisitos jurídicos/editoriales y, además:

- existan al menos **20 respuestas empíricas** para el ítem;
- el porcentaje de acierto no esté en zona de alerta extrema (<20 % o >90 %);
- la dificultad no esté expresamente marcada como demasiado fácil o demasiado difícil.

Los valores 20 %, 90 % y 20 respuestas son **umbrales internos iniciales de calibración**, no parámetros de la Academia Judicial. Deben revisarse cuando exista una muestra suficiente de uso real.

## Compilador estricto de producción

`compilar_produccion.cjs` toma el JSON exportado desde la estación de revisión y genera un archivo de producción separado. No modifica los bancos fuente.

Uso:

```bash
node pf93/compilar_produccion.cjs revision-pf93.json pf93/banco-produccion.js
```

Para aceptar un ítem exige simultáneamente:

- decisión humana = `aprobada_produccion`;
- contenido jurídico = `correcto`;
- fuente = `verificada`;
- redacción = `apta`;
- distractores = `aptos`;
- dificultad = `adecuada`;
- nombre/iniciales del revisor;
- fecha de verificación válida;
- identificación de la fuente o versión efectivamente consultada;
- artículo/inciso o criterio interpretativo identificable;
- al menos 20 respuestas de calibración;
- porcentaje de acierto entre 20 % y 90 %;
- **cero alertas pendientes del triaje editorial automático**.

Sólo el archivo compilado materializa `fuente.verificada:true`, incorporando la evidencia registrada por el revisor. De este modo, una selección manual equivocada no transforma por sí sola una cita orientativa en una fuente formalmente validada.

El compilador informa además los temas sin ninguna pregunta de producción y los temas que aún no alcanzan su cupo de cobertura. Por diseño puede generar un banco parcial durante la revisión; no debe reemplazar el banco de entrenamiento hasta que exista volumen suficiente.

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

1. Ejecutar/consultar `triaje.html` y corregir primero riesgo alto y enunciados metajurídicos.
2. Bloque común DCO + DAD + DPO (84 preguntas), priorizando las 28 que están limpias de alertas automáticas para revisión jurídica directa y las restantes por riesgo editorial.
3. Especialidad que utilizará efectivamente el postulante.
4. Restantes especialidades.
5. Calibración de las preguntas jurídicamente aprobadas.
6. Compilación de producción y comprobación de cobertura resultante.

## Exportaciones

`revision.html` permite exportar:

- `revision-pf93.json`: revisión completa, métricas y versión del blueprint;
- `metricas-revision-pf93.csv`: una fila por pregunta con estado, controles, métricas y gate de producción.

`triaje.html` exporta `triaje-editorial-pf93.csv` con los registros filtrados por riesgo.

Los datos de revisión se guardan en `localStorage`; no modifican por sí solos los archivos del repositorio. Para consolidarlos en un banco de producción se usa el compilador estricto y posteriormente se revisa el diff antes de cualquier integración.

## Criterio de uso del simulador

- **Todo el banco en revisión:** útil para control editorial y pruebas internas.
- **Aprobadas jurídicamente o superiores:** práctica con contenido que ya superó el control jurídico-editorial, aunque pueda faltar calibración.
- **Sólo aprobadas para producción:** modo destinado al producto formal una vez que exista volumen suficiente.

La simulación de 90 preguntas continúa usando una ponderación de entrenamiento basada en los cupos de confección de la convocatoria. Esa ponderación no se presenta como distribución oficial publicada del examen real.

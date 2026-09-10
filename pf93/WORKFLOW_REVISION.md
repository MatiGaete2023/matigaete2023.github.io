# PF93 — workflow progresivo de revisión

Este documento define cómo transformar las 451 preguntas del banco de cobertura en un subconjunto jurídicamente revisado, calibrado y apto para producción.

> Estado actual: el triaje editorial automatizado está cerrado en 451/451 preguntas limpias. La fase activa es la verificación jurídica humana. Véase `ESTADO_PROYECTO.md`.

## 1. Estados

1. `revision_humana`: registro incorporado al banco, sin revisión suficiente.
2. `corregir_editorial`: existe un defecto de redacción, estructura o distractores que impide avanzar.
3. `verificar_juridicamente`: falta comprobar norma vigente, fuente, interpretación, aplicabilidad o unicidad de la clave.
4. `aprobada_juridicamente`: contenido correcto, fuente verificada, redacción apta y distractores aptos.
5. `calibracion`: jurídicamente apta; requiere observar su funcionamiento empírico.
6. `aprobada_produccion`: supera revisión jurídica/editorial y el gate interno de calibración; queda candidata al banco formal.
7. `retirada`: no debe volver al pool activo; se conserva para trazabilidad.

La decisión `aprobada_produccion` registrada en interfaz es necesaria pero no suficiente: `compilar_produccion.cjs` vuelve a comprobar los requisitos antes de generar el artefacto productivo.

## 2. Ejes independientes

Cada revisión registra:

- **Contenido jurídico:** pendiente / correcto / dudoso / incorrecto.
- **Fuente:** pendiente / verificada / insuficiente / desactualizada.
- **Redacción:** pendiente / apta / corregir.
- **Distractores:** pendiente / aptos / corregir.
- **Dificultad:** pendiente / adecuada / demasiado fácil / demasiado difícil.
- **Decisión progresiva:** uno de los siete estados anteriores.

Además se registra:

- revisor;
- fecha de verificación;
- fuente o versión efectivamente consultada;
- artículo/inciso;
- criterio interpretativo o jurisprudencia, cuando corresponda;
- nota de revisión o corrección.

## 3. Secuencia normal desde el estado actual

### Etapa A — resolver la pregunta

El revisor debe contestar el ítem antes de mirar la explicación. Esto permite detectar si la clave es identificable por conocimiento jurídico y si existe una alternativa competidora razonable.

### Etapa B — cotejo normativo/jurisprudencial

Comprobar:

1. que la materia corresponda al tema PF93 asignado;
2. vigencia de la norma;
3. aplicabilidad al supuesto;
4. artículo/inciso exacto;
5. excepciones relevantes;
6. reglas transitorias cuando correspondan;
7. jurisprudencia identificable si la clave depende de interpretación judicial.

### Etapa C — unicidad de la clave

No basta comprobar que la respuesta marcada sea correcta. Debe demostrarse que los tres distractores son incorrectos o inferiores **bajo los mismos hechos del enunciado**.

Si dos alternativas son defendibles, la pregunta no avanza a aprobación jurídica.

### Etapa D — decisión

- contenido o fuente insuficientes → `verificar_juridicamente`;
- defecto formal descubierto durante el cotejo → `corregir_editorial`;
- regla equivocada/no recuperable → `retirada` o reconstrucción;
- contenido y fuente comprobados, con redacción/distractores aptos → `aprobada_juridicamente`.

### Etapa E — calibración

Las preguntas aprobadas jurídicamente se utilizan en práctica controlada para reunir:

- respuestas;
- acierto;
- omisiones;
- tiempo de respuesta;
- distribución de elección entre alternativas.

### Etapa F — producción

Después de calibración suficiente, el revisor puede llevar el ítem a `aprobada_produccion`. El compilador verifica nuevamente todas las barreras.

## 4. Prioridad jurídica vigente

La auditoría estructural de fuentes divide el banco en dos colas.

### Cola A — 183 referencias normativas específicas

Son el mejor punto de partida para construir una semilla jurídicamente aprobada. El orden recomendado es:

1. DCO + DAD + DPO;
2. especialidad principal de uso;
3. restantes especialidades.

Una referencia específica reduce trabajo de búsqueda, pero no se considera verificada hasta cotejarla con el texto vigente.

### Cola B — 268 referencias débiles

Orden recomendado:

1. 20 jurisprudenciales genéricas;
2. 20 referencias de otra naturaleza;
3. 228 normativas genéricas.

Las jurisprudenciales deben individualizar tribunal, rol, fecha, proposición utilizada y fuente recuperable cuando el precedente sea necesario para sostener la clave.

## 5. Triaje editorial

`calidad-editorial.js` y `triaje.html` detectan señales formales como:

- clave demasiado larga;
- cita normativa sólo en la correcta;
- distractor excesivamente corto;
- absolutismos concentrados en distractores;
- enunciados metajurídicos.

En la línea base vigente existen **0 alertas**. Por eso el triaje dejó de ser una cola de trabajo masivo y pasó a cumplir principalmente una función de **control de regresión**.

Si una revisión jurídica obliga a reescribir una pregunta y reaparece una alerta, el ítem debe volver a `corregir_editorial` hasta resolverla.

## 6. Reglas de aprobación jurídica

Para avanzar a `aprobada_juridicamente`, `calibracion` o `aprobada_produccion`, la interfaz exige simultáneamente:

- contenido jurídico = `correcto`;
- fuente = `verificada`;
- redacción = `apta`;
- distractores = `aptos`.

Como estándar humano, además debe existir evidencia suficiente de:

- norma vigente y aplicable;
- correspondencia exacta fuente ↔ clave;
- única mejor respuesta;
- explicación limitada a lo que las fuentes sostienen;
- distractores incorrectos bajo el mismo supuesto;
- jurisprudencia identificada si la respuesta depende de ella.

## 7. Gate interno de calibración

La interfaz no permite aprobar para producción mientras no se cumplan los requisitos jurídicos/editoriales y, además:

- existan al menos **20 respuestas empíricas**;
- el porcentaje de acierto no esté en zona de alerta extrema (<20 % o >90 %);
- la dificultad no esté expresamente marcada como demasiado fácil o demasiado difícil.

Estos valores son **parámetros internos iniciales**, no criterios de la Academia Judicial. Deben revisarse con datos reales suficientes.

## 8. Compilador estricto de producción

Uso:

```bash
node pf93/compilar_produccion.cjs revision-pf93.json pf93/banco-produccion.js
```

Para aceptar un ítem exige:

- decisión humana `aprobada_produccion`;
- contenido jurídico correcto;
- fuente verificada;
- redacción y distractores aptos;
- dificultad adecuada;
- revisor;
- fecha válida;
- fuente/versión consultada;
- artículo/inciso o criterio interpretativo identificable;
- calibración mínima;
- porcentaje de acierto dentro del rango interno;
- cero alertas editoriales.

Sólo la salida compilada materializa `fuente.verificada:true` con la trazabilidad registrada por el revisor. Los bancos de borrador permanecen con `false`.

El compilador puede generar un banco parcial. No debe reemplazar el banco de entrenamiento mientras no exista volumen/cobertura suficientes para el uso previsto.

## 9. Prueba del gate

Como el banco real está actualmente libre de alertas, la prueba del compilador utiliza una pregunta defectuosa **sintética** para comprobar que el gate sigue rechazando riesgo editorial. No se debe reintroducir una pregunta defectuosa real con fines de testing.

## 10. Datos y persistencia

`revision.html` guarda localmente la revisión y las métricas en `localStorage`. Permite exportar:

- `revision-pf93.json`;
- `metricas-revision-pf93.csv`.

Los datos locales no modifican el repositorio. Para incorporarlos a un artefacto productivo se utiliza el compilador y se revisa el diff resultante.

## 11. Migración desde la revisión simple anterior

Una decisión antigua no se eleva automáticamente al nuevo estándar:

- `corregir` → `corregir_editorial`;
- `rechazada` → `retirada`;
- antigua `aprobada` → `revision_humana` con nota de migración.

La razón es que el control anterior no acreditaba por separado fuente, contenido, distractores y calibración.

## 12. Uso del simulador según pool

- **Todo el banco en revisión:** entrenamiento y control interno; puede incluir contenido jurídicamente no verificado.
- **Aprobadas jurídicamente o superiores:** práctica con contenido que ya superó revisión jurídica/editorial.
- **Sólo aprobadas para producción:** subconjunto que además supera el gate de calibración/compilación.

La simulación de 90 usa una ponderación proporcional interna basada en los cupos de confección y no se presenta como distribución oficial publicada del examen.

## 13. Regla de retorno

Cualquier cambio posterior puede devolver una pregunta a una etapa anterior:

- reforma legal → `verificar_juridicamente`;
- nueva jurisprudencia relevante → `verificar_juridicamente`;
- ambigüedad detectada por usuarios → `corregir_editorial` o `verificar_juridicamente`;
- mal comportamiento empírico → `calibracion` o corrección;
- imposibilidad de sostener una única clave → `retirada`.

La promoción nunca es irreversible si cambian los fundamentos que la justificaron.

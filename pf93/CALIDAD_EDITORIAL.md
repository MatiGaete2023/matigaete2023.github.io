# PF93 — calidad editorial

Última medición vigente: 9 de septiembre de 2026, después de aplicar las capas editoriales L1–L13.

Este documento describe las **heurísticas formales de construcción de ítems** y su resultado actual. No acredita por sí solo corrección jurídica, validez psicométrica ni semejanza empírica con una prueba oficial.

## 1. Resultado vigente

Sobre el runtime efectivo de 451 preguntas:

- preguntas totales: **451**;
- sin alertas: **451**;
- con alertas: **0**;
- severidad crítica: **0**;
- severidad alta: **0**;
- severidad media: **0**;
- severidad baja: **0**.

Por tipo de señal:

- `clave_larga`: 0;
- `cita_solo_clave`: 0;
- `distractor_corto`: 0;
- `absolutismos_distractores`: 0;
- `enunciado_meta`: 0;
- alertas de similitud temática sobre el umbral configurado: 0 en el gate vigente.

La distribución de respuesta en los archivos efectivos también quedó equilibrada:

- A: **113**;
- B: **113**;
- C: **113**;
- D: **112**.

L12 corrigió las 11 alertas bajas remanentes. L13 permutó 16 preguntas, sin cambiar el contenido de las alternativas, para cerrar el desequilibrio de posiciones de clave.

## 2. Qué significa “451 limpias”

Significa únicamente que `calidad-editorial.js` y `validar_banco_pf93.cjs` no detectan las señales que actualmente están codificadas.

No significa que:

- las 451 claves sean jurídicamente correctas;
- todas las fuentes estén vigentes y sean aplicables;
- todas las preguntas tengan dificultad adecuada para postulantes abogados;
- los distractores discriminen empíricamente entre personas con distinto nivel de dominio;
- el banco esté calibrado psicométricamente.

La fase activa es, por tanto, **jurídica y luego empírica**, no otra pasada general de corrección formal.

## 3. Heurísticas vigentes

El motor detecta actualmente, entre otras, las siguientes señales:

### Clave considerablemente más larga

Se alerta cuando la alternativa correcta supera ampliamente el promedio de los distractores según los umbrales internos. Su objetivo es evitar que la explicación más completa sea identificable por longitud.

### Cita normativa sólo en la clave

Detecta cuando únicamente la correcta contiene señales como `artículo`, `ley`, `código`, `inciso` o numeración jurídica. Evita que el formato revele la respuesta.

### Distractor excesivamente corto

Busca opciones incorrectas desproporcionadamente breves frente a una clave desarrollada.

### Absolutismos concentrados en distractores

Busca patrones como `siempre`, `nunca`, `exclusivamente`, `automáticamente`, `sin excepción` u otros marcadores categóricos que vuelvan artificialmente fáciles las alternativas incorrectas.

### Enunciado metajurídico

Busca formulaciones que preguntan principalmente qué “debe revisarse” o cuál es el “mejor enfoque de análisis”, en vez de plantear una regla o problema jurídico concreto.

### Similitud temática

`validar_banco_pf93.cjs` compara enunciados dentro de un mismo tema para advertir duplicación léxica elevada.

Estas reglas son heurísticas internas y pueden producir falsos positivos o falsos negativos. Por eso ninguna sustituye la revisión humana.

## 4. Gate actual

`validar_calidad_final.cjs` exige actualmente:

1. 451 preguntas;
2. 451 preguntas sin alertas del analizador;
3. 0 preguntas con riesgo;
4. distribución exacta A 113 / B 113 / C 113 / D 112;
5. aplicación completa de L12;
6. aplicación consistente de L13.

Si una modificación futura reintroduce una alerta, CI falla. La solución correcta es revisar el ítem o la regla; no disminuir silenciosamente el estándar para recuperar un run verde.

## 5. Línea base histórica antes de la depuración

La primera medición documentada, previa a las capas posteriores, arrojaba:

- 103 preguntas sin alertas;
- 348 con una o más alertas;
- 73 de riesgo alto;
- 270 de riesgo medio;
- 5 de riesgo bajo;
- 335 con clave considerablemente más larga;
- 187 con distractor demasiado corto;
- 71 con cita sólo en la clave;
- 57 con absolutismos concentrados en distractores;
- 12 con enunciado metajurídico.

Esa medición se conserva aquí **sólo como referencia histórica**. No debe citarse como estado actual del banco.

## 6. Evolución de la fase editorial

La depuración se ejecutó mediante capas trazables en vez de sobrescribir silenciosamente los bancos base. Las sucesivas capas reconstruyeron alternativas, reformularon enunciados, eliminaron pistas formales y finalmente cerraron las 11 alertas bajas restantes en L12.

La meta no era conseguir “cero” artificialmente. El gate sólo se considera válido porque las correcciones se aplicaron sobre los ítems y la prueba del compilador mantiene un **caso defectuoso sintético** para comprobar que el sistema continúa rechazando riesgo editorial aunque el banco real esté limpio.

## 7. Triaje como control de regresión

`triaje.html` sigue siendo útil aunque hoy no exista una cola editorial pendiente. Su nueva función principal es:

- comprobar visualmente que una modificación no reintroduzca pistas;
- filtrar futuros hallazgos;
- exportar la cola si aparece una regresión;
- apoyar revisiones puntuales derivadas del cotejo jurídico.

No corresponde generar trabajo editorial artificial para “usar” el tablero cuando su salida está vacía.

## 8. Relación con la revisión jurídica

Una pregunta puede estar editorialmente limpia y ser jurídicamente incorrecta. Del mismo modo, una fuente puede estar bien identificada y la explicación exceder lo que esa norma sostiene.

Por eso la secuencia actual es:

`calidad editorial limpia → cotejo jurídico → aprobación jurídica → calibración empírica → producción`

La auditoría automática de fuentes identificó 183 referencias normativas con artículo/numeral y 268 referencias que deben fortalecerse. Ese frente se documenta en `ESTADO_PROYECTO.md` y `PAQUETE_REVISION_HUMANA.md`.

## 9. Regla para nuevas preguntas o modificaciones

Toda pregunta nueva o corregida debe volver a pasar:

- validación estructural;
- análisis editorial;
- control de duplicación/similitud;
- balance global de claves;
- revisión jurídica humana;
- calibración antes de producción.

Un cambio jurídico que obligue a reformular un ítem puede reabrir una alerta editorial. En ese caso ambos controles deben resolverse antes de promover nuevamente la pregunta.

# PF93 — arquitectura del banco, runtime y revisión

Este documento describe cómo se construye el pool efectivo de preguntas, qué archivos intervienen y dónde debe modificarse cada tipo de comportamiento.

## 1. Visión general

La compilación PF93 separa cuatro capas conceptuales:

1. **Blueprint:** define temas, códigos, bloque/especialidad y cupos.
2. **Bancos fuente:** contienen las 451 preguntas base con estado `revision_humana` y `fuente.verificada:false`.
3. **Capas editoriales:** modifican de forma trazable preguntas concretas sin borrar el registro original ni fingir verificación jurídica.
4. **Revisión humana y producción:** registra decisiones, métricas y evidencia; sólo el compilador puede materializar un banco de producción.

Flujo simplificado:

`blueprint + bancos fuente → revision-workflow → capas editoriales → calidad editorial → simulador/revisión → revisión humana exportada → compilador de producción`

## 2. Blueprint

### `blueprint.js`

Es la fuente estructural de:

- 109 temas;
- código oficial de materia;
- pertenencia a bloque común o especialidad;
- cupo de cobertura por tema.

Los validadores exigen que los cupos sumen 451 y que cada tema tenga exactamente el número de preguntas asignado.

El blueprint se usa como **matriz de cobertura del banco**, no como afirmación de distribución exacta de la prueba real de 90 preguntas.

## 3. Bancos fuente

- `banco-comun.js`: DCO + DAD + DPO, 84 preguntas.
- `banco-civil.js`: DCI + DPC, 97.
- `banco-penal.js`: DPP + DPE, 110.
- `banco-familia.js`: DFA + DPFA, 74.
- `banco-laboral.js`: DLA + DPL, 86.

Invariantes del borrador:

- ID único;
- `temaPF93` válido;
- cuatro alternativas no vacías y distintas;
- `respuesta` entre 0 y 3;
- `estado:'revision_humana'`;
- `fuente.verificada:false`.

Los bancos fuente no deben convertirse manualmente en “banco aprobado”. Su función es conservar el material base y la trazabilidad.

## 4. Workflow de revisión

### `revision-workflow.js`

Contiene:

- esquema de datos de revisión;
- estados progresivos;
- normalización de revisiones;
- gates jurídicos/editoriales;
- métricas de uso;
- sugerencias de transición;
- ajustes L1 integrados y trazables.

Los estados son:

`revision_humana` → `corregir_editorial` / `verificar_juridicamente` → `aprobada_juridicamente` → `calibracion` → `aprobada_produccion`, además de `retirada`.

El significado detallado está en `WORKFLOW_REVISION.md`.

## 5. Capas editoriales

Los archivos `ajustes-l*.js` aplican cambios puntuales sobre el pool en tiempo de carga. `capas-editoriales.cjs` descubre y ordena automáticamente esos archivos por número y sufijo; por eso no se debe mantener una lista manual paralela en los scripts Node.

Actualmente existen capas independientes desde L4 hasta L13, además de ajustes anteriores integrados en el workflow. Cada capa debe:

- identificar preguntas por ID estable;
- conservar `fuente.verificada:false`;
- dejar marca de origen/revisión;
- informar cuántos parches tenía el catálogo y cuántos fueron aplicados;
- fallar en CI si no se aplican todos los parches esperados.

L12 cerró las 11 alertas editoriales bajas restantes. L13 no cambia el contenido jurídico: sólo permuta posiciones de alternativas para dejar el banco fuente equilibrado en A 113 / B 113 / C 113 / D 112.

No se debe editar una capa antigua sólo para ocultar su historia. Si una corrección posterior modifica una decisión previa, debe preferirse una nueva capa o una modificación explícitamente documentada y comprobada.

## 6. Carga del runtime

### `capas-editoriales.cjs`

Define el orden común de carga para validadores y compilador:

1. `blueprint.js`;
2. bancos común y por especialidad;
3. `revision-workflow.js`;
4. todas las capas `ajustes-l*.js` ordenadas numéricamente;
5. opcionalmente `calidad-editorial.js`.

Este archivo evita que un validador y la interfaz evalúen versiones distintas de las preguntas.

Las páginas HTML cargan las mismas capas en orden. Cuando se agrega una capa nueva debe comprobarse su incorporación en las interfaces y en los validadores de integración.

## 7. Calidad editorial

### `calidad-editorial.js`

Analiza señales formales de riesgo, entre ellas:

- clave considerablemente más larga;
- cita normativa sólo en la clave;
- distractor excesivamente corto;
- absolutismos concentrados en distractores;
- enunciado metajurídico;
- estructura inválida.

### `triaje.html`

Es la interfaz de inspección del informe editorial. En el estado actual debe mostrar 451 preguntas limpias.

### Scripts asociados

- `resumen_calidad.cjs`;
- `listar_prioridad_editorial.cjs`;
- `listar_media_editorial.cjs`;
- `listar_bajas_editorial.cjs`;
- `validar_calidad_final.cjs`.

`validar_calidad_final.cjs` actúa como gate: el estado actual exige cero alertas y balance exacto de claves.

## 8. Auditoría de fuentes

### `auditar_fuentes_juridicas.cjs`

Clasifica la calidad estructural de las citas, pero no verifica que el contenido de la norma o jurisprudencia sea correcto.

Distingue actualmente:

- normativa con artículo/numeral;
- normativa genérica;
- jurisprudencia genérica o identificada;
- doctrina/otra;
- ausencia de cita.

Su salida sirve para priorizar revisión jurídica, no para cambiar estados automáticamente.

## 9. Simulador y estación de revisión

### `revision.html`

Cumple dos funciones:

- simulación/práctica sobre el banco PF93;
- estación multicriterio de revisión humana.

El modo de 90 preguntas usa una política proporcional derivada de los cupos del blueprint dentro de `común + especialidad`. Esa política es de entrenamiento y no se documenta como distribución oficial del examen.

La interfaz baraja las alternativas al presentar cada pregunta, conservando internamente la relación con la clave original.

La revisión se guarda en `localStorage` y puede exportarse a JSON/CSV. La interfaz no modifica los bancos fuente.

## 10. Compilación de producción

### `compilar_produccion.cjs`

Recibe una exportación de revisión humana y vuelve a evaluar cada pregunta contra:

- estado de revisión;
- contenido jurídico;
- fuente;
- redacción;
- distractores;
- dificultad;
- trazabilidad del revisor;
- fecha y referencia efectiva;
- calibración mínima;
- calidad editorial automática.

Sólo la salida de este compilador puede materializar `fuente.verificada:true` con la evidencia humana registrada.

El banco de producción es un **artefacto derivado**, no la fuente de edición.

## 11. Validación y CI

### Estructura y cobertura
`validar_banco_pf93.cjs`

Comprueba, entre otros:

- 109 temas;
- 451 cupos y 451 preguntas;
- cupo exacto por tema y materia;
- IDs y estructura de alternativas;
- estado/fuente del borrador;
- aplicación de capas;
- duplicados y similitud;
- distribución de claves.

### Workflow y producción

- `validar_revision_workflow.cjs`;
- `validar_compilador_produccion.cjs`.

La prueba del compilador crea un caso defectuoso sintético para comprobar que el gate rechaza riesgo editorial sin obligar a mantener una pregunta defectuosa real en el banco.

### Integración de interfaces

- `validar_revision_html.cjs`;
- `validar_triaje_html.cjs`.

El workflow GitHub Actions `.github/workflows/validar-pf93.yml` ejecuta el conjunto de verificaciones en los cambios que afectan `pf93/`.

## 12. Frontera con el simulador histórico

Los archivos de raíz `index.html` y `preguntas.js` corresponden al simulador histórico de 484 registros. No deben importarse silenciosamente al runtime PF93.

Una pregunta histórica puede ser reutilizada sólo después de:

- clasificar su contenido real contra el tema vigente;
- resolver duplicados/familias;
- adaptar el formato PF93;
- superar el mismo ciclo editorial y jurídico que una pregunta nueva.

La antigüedad de la etiqueta PF92/PF93 no determina por sí sola la pertinencia sustantiva.

## 13. Regla para futuros cambios

Antes de modificar una pregunta o regla, identificar en qué capa corresponde hacerlo:

- **cobertura/tema/cupo:** `blueprint.js`;
- **registro base nuevo:** banco de especialidad correspondiente;
- **corrección trazable de una pregunta existente:** nueva capa editorial;
- **criterio de calidad:** `calidad-editorial.js` + pruebas;
- **estado/gate humano:** `revision-workflow.js`;
- **gate reproducible final:** `compilar_produccion.cjs`;
- **documentación del estado:** `ESTADO_PROYECTO.md`.

No duplicar la misma regla en varios lugares si puede existir una fuente única de verdad.

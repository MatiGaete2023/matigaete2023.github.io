# Implementación del simulador jurídico — informe histórico

> **DOCUMENTO HISTÓRICO.** Este informe describe la generación anterior del simulador (`index.html` + `preguntas.js`) y su banco de 484 registros. **No describe el estado actual de la compilación PF93.** Para el producto vigente consultar [`pf93/ESTADO_PROYECTO.md`](pf93/ESTADO_PROYECTO.md), [`pf93/README.md`](pf93/README.md) y [`pf93/DOCUMENTACION.md`](pf93/DOCUMENTACION.md).
>
> El material histórico no se descarta por estar etiquetado PF92 o anterior: puede reutilizarse cuando su contenido sustantivo corresponda al temario vigente, pero debe reclasificarse y pasar el workflow PF93 antes de integrarse.

Versión histórica del banco: `2026-09-07-pf92-v1`  
Rama histórica de referencia: `codex/simulador-juridico-mejoras`

## Qué se incorporó

- Se normalizó el archivo adjunto a un banco de **484 registros**: 441 preguntas de origen y 43 reformulaciones editoriales.
- Cada registro tiene ID estable (`pf92-###` o `pf92-r-##`), materia, familia, objetivo, explicación, fuente, versión y estado.
- El estado controla la selección: `bloqueada` (92 enunciados/opciones truncados), `retirada` (116 preguntas reemplazadas por una reformulación) y `revisar` (41 reformulaciones que aún necesitan cotejo jurídico). Además, el motor excluye por sus pistas 171 registros activos con texto truncado, duplicado, relleno o clave obviamente más larga. El flujo queda con **105 preguntas seleccionables** y conserva todas las demás para trazabilidad.
- Se eliminó del flujo la pista que hacía visible la respuesta: el texto `(según norma legal)`, opciones obviamente más largas y duplicados quedan fuera de las sesiones; sus marcas permanecen en los registros históricos para orientar la revisión editorial.
- Las 43 reformulaciones convierten preguntas memorísticas en casos breves de aplicación. Las alternativas tienen extensión y estructura parecidas; la clave no queda asociada a una letra fija.
- El banco se valida al cargar: IDs únicos, cuatro alternativas no vacías, clave dentro de rango y estado reconocido. Un error de datos detiene la carga en vez de producir una sesión silenciosamente defectuosa.

## Motor y experiencia de uso

- `index.html` pasa a ser una interfaz de sesiones: práctica libre, mini sesión de cinco preguntas, simulación de 90 preguntas, repaso de errores y favoritos.
- La simulación de 90 preguntas selecciona primero una pregunta por familia y sólo reutiliza familia si no hay suficientes registros. Con el filtro editorial de esa versión dispone de 105 familias seleccionables, por lo que una ejecución normal no repite variantes casi idénticas.
- Las alternativas se barajan por pregunta y se conserva el orden en la sesión guardada. La letra de la alternativa deja de ser una pista.
- La navegación permite anterior, siguiente, omitir, terminar, continuar una sesión interrumpida y marcar favoritos.
- El feedback se construye con nodos DOM y `textContent`; no se inyectan enunciados ni fuentes con `innerHTML`.
- Se añadió diseño responsive, foco visible, estados accesibles, `aria-live`, soporte para teclado y respeto de `prefers-reduced-motion`.
- El temporizador usa un solo intervalo activo. El tiempo de cada respuesta y el tiempo total se guardan en el historial.

## Analítica disponible en esa versión

- El resultado muestra correctas, incorrectas, omitidas, precisión sobre respondidas, cobertura y tiempo activo.
- Se desglosa la sesión por materia y se identifica la materia más débil en el historial acumulado.
- `Exportar JSON` conserva sesiones, respuestas, favoritos, versión y hash del banco.
- `Exportar CSV` entrega una fila por respuesta para tablas dinámicas, análisis de tiempo y seguimiento por pregunta.
- La clave de almacenamiento de esa generación es `aj-simulador-v5`.

## Revisión jurídica que quedaba pendiente

El motor histórico marcaba el material como provisional o pendiente hasta una segunda revisión humana. Las fuentes del archivo de origen no se trataban como autoridad por sí solas.

Los criterios de revisión identificados siguen siendo útiles como antecedente:

1. cotejar cada fuente con el texto vigente;
2. registrar artículo, inciso, fecha de consulta y régimen transitorio cuando corresponda;
3. comprobar la única mejor respuesta;
4. revisar con especial cuidado plazos, recursos, cautelares, ejecución y reglas que dependan de vigencia;
5. no convertir una cita en fuente verificada sin revisión real.

El workflow PF93 posterior formaliza estos controles y debe usarse en lugar del sistema de estados de esta versión histórica.

## Cómo se mantenía esta generación

1. editar la fuente de preguntas y regenerar `preguntas.js`;
2. ejecutar `node --check preguntas.js` y `node scripts/validar_banco.cjs`;
3. revisar sesiones mini y de 90;
4. revisar el diff antes de integrar cambios.

## Relación con PF93

Esta generación aportó:

- material histórico reutilizable;
- IDs/familias y trazabilidad;
- experiencia de simulación;
- detección inicial de pistas editoriales;
- exportación y analítica.

La compilación PF93 posterior reemplaza como línea vigente su taxonomía y proceso de calidad mediante:

- blueprint de 109 temas/451 cupos;
- bancos separados por bloque;
- capas editoriales trazables;
- triaje automatizado con gate de regresión;
- workflow jurídico multicriterio;
- auditoría de fuentes;
- compilador estricto de producción.

Por eso este archivo debe consultarse como **historia del producto**, no como manual de mantenimiento actual.

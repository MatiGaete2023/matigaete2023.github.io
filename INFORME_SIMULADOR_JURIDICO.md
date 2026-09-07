# Implementación del simulador jurídico

Versión del banco: `2026-09-07-pf92-v1`  
Rama: `codex/simulador-juridico-mejoras`

## Qué se incorporó

- Se normalizó el archivo adjunto a un banco de **484 registros**: 441 preguntas de origen y 43 reformulaciones editoriales.
- Cada registro tiene ID estable (`pf92-###` o `pf92-r-##`), materia, familia, objetivo, explicación, fuente, versión y estado.
- El estado controla la selección: `bloqueada` (92 enunciados/opciones truncados), `retirada` (116 preguntas reemplazadas por una reformulación) y `revisar` (41 reformulaciones que aún necesitan cotejo jurídico). Además, el motor excluye por sus pistas 171 registros activos con texto truncado, duplicado, relleno o clave obviamente más larga. El flujo queda con **105 preguntas seleccionables** y conserva todas las demás para trazabilidad.
- Se eliminó del flujo la pista que hacía visible la respuesta: el texto `(según norma legal)`, opciones obviamente más largas y duplicados quedan fuera de las sesiones; sus marcas permanecen en los registros históricos para orientar la revisión editorial.
- Las 43 reformulaciones convierten preguntas memorísticas en casos breves de aplicación. Las alternativas tienen extensión y estructura parecidas; la clave no queda asociada a una letra fija.
- El banco se valida al cargar: IDs únicos, cuatro alternativas no vacías, clave dentro de rango y estado reconocido. Un error de datos detiene la carga en vez de producir una sesión silenciosamente defectuosa.

## Motor y experiencia de uso

- `index.html` pasa a ser una interfaz de sesiones: práctica libre, mini sesión de cinco preguntas, simulación de 90 preguntas, repaso de errores y favoritos.
- La simulación de 90 preguntas selecciona primero una pregunta por familia y sólo reutiliza familia si no hay suficientes registros. Con el filtro editorial actual dispone de 105 familias seleccionables, por lo que una ejecución normal no repite variantes casi idénticas.
- Las alternativas se barajan por pregunta y se conserva el orden en la sesión guardada. La letra de la alternativa deja de ser una pista.
- La navegación permite anterior, siguiente, omitir, terminar, continuar una sesión interrumpida y marcar favoritos.
- El feedback se construye con nodos DOM y `textContent`; no se inyectan enunciados ni fuentes con `innerHTML`.
- Se añadió diseño responsive, foco visible, estados accesibles, `aria-live`, soporte para teclado y respeto de `prefers-reduced-motion`.
- El temporizador usa un solo intervalo activo. El tiempo de cada respuesta y el tiempo total se guardan en el historial.

## Analítica disponible

- El resultado muestra correctas, incorrectas, omitidas, precisión sobre respondidas, cobertura y tiempo activo.
- Se desglosa la sesión por materia y se identifica la materia más débil en el historial acumulado.
- `Exportar JSON` conserva sesiones, respuestas, favoritos, versión y hash del banco.
- `Exportar CSV` entrega una fila por respuesta para tablas dinámicas, análisis de tiempo y seguimiento por pregunta.
- La clave de almacenamiento cambió a `aj-simulador-v5`. Cada sesión incluye el hash SHA-256 del banco (`e286c8370b0477e3805637bd438a085e334eb2f1446fadd64164bb52752598f0`); si el banco cambia, no se reanuda una sesión incompatible.

## Revisión jurídica pendiente

El motor marca todo el material como provisional o pendiente hasta una segunda revisión humana. Las fuentes del archivo adjunto no se trataron como autoridad por sí solas. Antes de usar el modo de 90 preguntas como preparación formal:

1. Cotejar cada fuente con el texto vigente en LeyChile, la Constitución, códigos y leyes especiales.
2. Registrar artículo, inciso, fecha de consulta y, cuando corresponda, régimen transitorio.
3. Aprobar el objetivo PF92 y la única clave correcta; si hay más de una interpretación defendible, convertirla en pregunta de respuesta fundada o retirarla.
4. Revisar especialmente plazos civiles y laborales, ejecución fiscal, notificaciones electrónicas, recursos, cautelares penales, firma electrónica y ética judicial.
5. Marcar el registro como `aprobada` sólo después de esa revisión. El código ya reconoce ese estado para poder separar el banco formal del banco de práctica.

## Cómo mantenerlo

1. Editar la fuente de datos y no el HTML generado a mano.
2. Ejecutar el generador y las validaciones (`node build_repo.cjs`, `node --check preguntas_repo_generadas.js`, `node scripts/validar_banco.cjs`).
3. Revisar una sesión mini y una de 90 preguntas: comprobar que no se repitan familias, que el cambio de letra no altere la clave y que el resumen coincida con las respuestas.
4. Subir `preguntas.js`, `index.html` y este informe en una rama de revisión; revisar el diff y las fuentes antes de fusionar a `main`.

## Criterio de producto para la siguiente iteración

El siguiente incremento debe añadir una matriz de objetivos PF92, dificultad calibrada con datos reales, intervalos de repaso espaciado y un modo de casos escritos con rúbrica. Esas funciones dependen de tener fuentes y claves aprobadas; implementarlas antes introduciría una falsa sensación de precisión.

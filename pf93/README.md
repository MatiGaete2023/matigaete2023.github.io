# PF93 — banco jurídico para revisión humana

## Estado del producto

Esta carpeta es una **compilación de revisión**, no un banco jurídicamente aprobado. Está diseñada para que una persona pueda usar el simulador como usuario final, detectar ambigüedades y aprobar/corregir/rechazar ítems antes de promoverlos a un banco formal.

- Temas oficiales modelados: **109**.
- Cupos de la convocatoria docente modelados: **451**.
- Preguntas de esta compilación: **451**.
- Estado de todas las preguntas: `revision_humana`.
- Fuentes marcadas como verificadas: **0** por diseño.
- Especialidades: civil, penal, familia y laboral, más temario común.

## Cómo revisar como usuario final

1. Abrir `pf93/revision.html` desde la rama `codex/pf93-revision-humana` mediante un servidor estático o GitHub Pages de revisión.
2. Elegir especialidad.
3. Usar `Simulación PF93 · 90` para probar experiencia de examen. La distribución se calcula proporcionalmente desde los cupos de la convocatoria docente y **no se presenta como distribución oficial de una prueba real**.
4. Usar `Revisión humana pendiente` para controlar pregunta por pregunta.
5. Después de responder, clasificar el ítem como `Aprobar`, `Requiere corrección` o `Rechazar`, y registrar nota cuando corresponda.
6. Exportar `pf93-revision-humana.json`. Esa exportación constituye el insumo para promover sólo preguntas revisadas a una versión formal.

Los datos de revisión se almacenan únicamente en `localStorage` del navegador hasta que se exportan.

## Jerarquía de fuentes usada para diseñar el producto

1. Reglamento General de la Academia Judicial publicado en Diario Oficial el 11 de junio de 2026: arquitectura general del proceso de selección.
2. Temario del proceso de selección para el Programa de Formación especial, aplicable desde PF N°93: alcance temático.
3. Bases 2026 de convocatoria docente para confección de preguntas: 90 preguntas en el examen de alternativas, códigos temáticos y cupos encargados por materia.
4. Bases 2026 de casos y Acta N°462 del Consejo: orientación sobre etapa de casos, razonamiento jurídico y rúbrica; se usan para orientar estilo, no para inventar reglas de distribución del examen de alternativas.

## Decisiones metodológicas

### 451 cupos no equivalen a una prueba de 451 preguntas

La convocatoria docente encarga un universo de preguntas por tema. El producto usa esos cupos como **blueprint de cobertura**. El examen señalado en las bases contiene 90 preguntas. No se encontró en las fuentes de trabajo una distribución oficial que diga cuántas de esas 90 corresponden exactamente a temario común o a cada submateria de la especialidad.

Por eso el modo de 90 preguntas calcula una ponderación proporcional sobre `común + especialidad elegida`. Es una política de simulación explícita y reemplazable.

### DCI-06 en sentido amplio

El temario PF93 expresa `Acciones posesorias y reivindicatorias`. Las bases de confección usan una formulación más breve para ese cupo. Para preparación se adopta **el sentido amplio del temario PF93**, conservando cuatro cupos. La diferencia documental queda trazada pero no bloquea la cobertura.

### Separación del banco histórico

La rama de origen conserva 484 registros históricos PF92/anteriores con filtros editoriales. Esta compilación no los sobrescribe ni los presenta como PF93 validados. Se creó un banco PF93 separado y temáticamente normalizado para evitar que duplicados históricos o etiquetas antiguas distorsionen la cobertura.

## Estructura

- `blueprint.js`: 109 temas, códigos, especialidad y cupo de cobertura.
- `banco-comun.js`: DCO + DAD + DPO.
- `banco-civil.js`: DCI + DPC.
- `banco-penal.js`: DPP + DPE.
- `banco-familia.js`: DFA + DPFA.
- `banco-laboral.js`: DLA + DPL.
- `revision.html`: simulador y estación de revisión humana.
- `validar_banco_pf93.cjs`: validación estructural, cuotas, IDs, duplicados exactos, alternativas y distribución de claves.

## Criterios para aprobar un ítem

Un revisor no debería marcar `Aprobar` hasta comprobar simultáneamente:

- el enunciado corresponde al tema PF93 asignado;
- existe una única alternativa defendible como correcta;
- los distractores son plausibles y no se descartan por pistas de longitud, absolutismos absurdos o diferencias formales;
- la explicación justifica la clave y no se limita a repetirla;
- la norma citada está vigente a la fecha de revisión, incluyendo reformas y régimen transitorio cuando sea pertinente;
- si la respuesta depende de jurisprudencia, el precedente o línea jurisprudencial está identificado y no se formula como regla absoluta cuando existe controversia;
- el ítem no exige conocimientos fuera del temario salvo contexto estrictamente necesario.

## Aceptación técnica

Desde la raíz del repositorio:

```bash
node pf93/validar_banco_pf93.cjs
```

El validador debe terminar con `errorCount: 0` y banco total `451`.

La comprobación funcional mínima comprende cuatro recorridos, uno por especialidad:

- iniciar simulación de 90;
- responder, omitir, retroceder y terminar;
- comprobar desglose por código;
- ejecutar revisión humana y exportar JSON;
- recargar el navegador y verificar persistencia de decisiones de revisión;
- exportar CSV de resultados.

## Pendiente humano real

La etapa pendiente no es de estructura ni de cobertura: es **validación jurídica sustantiva de las 451 preguntas**. La rama evita declarar como `aprobada` una pregunta que todavía no ha sido cotejada contra texto legal vigente y, cuando corresponda, jurisprudencia identificable.

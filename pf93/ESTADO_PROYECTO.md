# PF93 — estado actual del proyecto

Última actualización documental: 9 de septiembre de 2026.  
Estado técnico de referencia: último run CI verde posterior a L12/L13 y a la auditoría automática de fuentes.

## 1. Resumen ejecutivo

La fase de **cobertura y depuración editorial automática está cerrada**. La fase activa es **verificación jurídica humana**, seguida de calibración empírica y compilación de producción.

Estado comprobado:

- temas del blueprint: **109**;
- preguntas del banco de revisión: **451**;
- errores estructurales: **0**;
- alertas editoriales automatizadas: **0**;
- distribución de claves fuente: **A 113 / B 113 / C 113 / D 112**;
- fuentes marcadas `verificada:true` en los bancos de borrador: **0**;
- referencias normativas con artículo/numeral identificable: **183**;
- referencias normativas genéricas: **228**;
- jurisprudencia genérica: **20**;
- otras referencias que requieren precisión: **20**;
- sin cita: **0**;
- primera preauditoría jurídica: **11 preguntas**; 10 concordantes preliminares y 1 concordante con cautela.

## 2. Cobertura por bloque

| Bloque | Preguntas |
|---|---:|
| Común: DCO + DAD + DPO | 84 |
| Civil: DCI + DPC | 97 |
| Penal: DPP + DPE | 110 |
| Familia: DFA + DPFA | 74 |
| Laboral: DLA + DPL | 86 |
| **Total** | **451** |

Para una ruta de entrenamiento se combina el bloque común con una especialidad:

- común + Civil: 181;
- común + Penal: 194;
- común + Familia: 158;
- común + Laboral: 170.

Estas cantidades corresponden al banco de cobertura, no a una distribución oficial de las 90 preguntas del examen.

## 3. Estado editorial

Las capas L1–L13 han corregido progresivamente defectos detectados durante la auditoría. El runtime actual termina con:

- 451 preguntas limpias bajo `calidad-editorial.js`;
- 0 `clave_larga`;
- 0 `cita_solo_clave`;
- 0 `distractor_corto`;
- 0 `absolutismos_distractores`;
- 0 `enunciado_meta`;
- 0 alertas de similitud temática por sobre el umbral configurado;
- balance de posiciones de clave 113/113/113/112.

Esto acredita que las heurísticas vigentes no detectan pistas formales pendientes. **No acredita corrección jurídica**.

## 4. Estado de fuentes y revisión jurídica

La principal deuda actual es la trazabilidad jurídica.

### Cola A — revisión relativamente directa

**183 preguntas** ya contienen una referencia normativa con artículo o numeral identificable. Deben cotejarse con el texto vigente y, si la respuesta queda completamente sostenida, pueden avanzar a `aprobada_juridicamente` mediante revisión humana registrada.

### Cola B — saneamiento previo

**268 preguntas** requieren fortalecer su fuente antes de una aprobación robusta:

- 228 normativas genéricas;
- 20 jurisprudenciales genéricas;
- 20 de otra naturaleza.

Las jurisprudenciales deben identificar, cuando la clave dependa efectivamente del precedente: tribunal, rol, fecha, proposición jurídica y referencia recuperable.

## 5. Primera preauditoría jurídica

`PREAUDITORIA_JURIDICA_L1.md` registra el primer lote de 11 ítems:

- 10 `CONCORDANTE_PRELIMINAR`;
- 1 `CONCORDANTE_CON_CAUTELA` (`pf93-dpfa-08-04`);
- 0 sin apoyo detectado en ese lote.

Esta preauditoría es apoyo técnico y no reemplaza la decisión del revisor humano. Por eso los archivos fuente permanecen con `fuente.verificada:false`.

## 6. CI e invariantes

El pipeline valida actualmente:

1. sintaxis JavaScript;
2. 109 temas y 451 cupos;
3. 451 preguntas y cupo exacto por tema;
4. IDs, cuatro alternativas, clave válida y estado de borrador;
5. aplicación completa de capas editoriales;
6. cero alertas editoriales;
7. balance 113/113/113/112;
8. auditoría estructural de fuentes;
9. workflow de revisión;
10. compilador estricto de producción;
11. integración de `revision.html`;
12. integración de `triaje.html`.

El último run comprobado terminó exitosamente en todos esos pasos.

## 7. Qué está terminado

- modelado del blueprint;
- cobertura editorial completa;
- separación banco común/especialidades;
- simulación de 90 como política de entrenamiento proporcional;
- revisión multicriterio;
- persistencia y exportación de revisión/métricas;
- triaje editorial;
- depuración automática hasta 0 alertas;
- balance de claves;
- gate y compilador de producción;
- clasificación automática de calidad de fuentes;
- primera preauditoría jurídica piloto;
- CI del circuito completo.

## 8. Qué sigue pendiente

### P0 — verificación jurídica

- revisar las 183 preguntas con fuente específica;
- fortalecer las 268 referencias débiles;
- verificar vigencia, aplicabilidad, excepciones y régimen transitorio;
- identificar jurisprudencia cuando sea necesaria;
- corregir o retirar ítems que no tengan una única mejor respuesta.

### P1 — semilla de producción

- formar un subconjunto jurídicamente aprobado;
- usarlo en práctica real;
- registrar respuestas y tiempos;
- comprobar funcionamiento de distractores.

### P2 — calibración

- revisar umbrales internos con datos suficientes;
- identificar preguntas demasiado fáciles/difíciles o distractores inoperantes;
- pasar sólo ítems estables a `aprobada_produccion`.

### P3 — cierre

- compilar banco de producción;
- comprobar cobertura resultante;
- realizar recorrido manual completo en navegador;
- sacar el PR de draft sólo cuando el subconjunto que se pretenda usar cumpla el estándar definido.

## 9. Próxima acción recomendada

Comenzar la revisión jurídica de la **cola A de 183 preguntas con referencia normativa específica**, priorizando primero DCO, DAD y DPO por ser comunes a todas las especialidades. En paralelo, sanear las 20 referencias jurisprudenciales genéricas de mayor riesgo.

No corresponde invertir ahora en nuevas reglas editoriales generales salvo que la revisión jurídica descubra un patrón no cubierto por las heurísticas actuales.

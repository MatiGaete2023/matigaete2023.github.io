# Informe de búsqueda de empleo — Educación, evaluación y ámbito lector

**Fecha y hora de ejecución:** 2026-07-27 12:30 (America/Santiago, UTC-04:00)  **Perfil objetivo:** educadora de párvulos — con experiencia como evaluadora, coordinadora y EDS en procesos de evaluación docente.  **Zona presencial autorizada:** Concepción, Chiguayante, Hualqui, Talcahuano, Hualpén, San Pedro de la Paz y Penco. **Remoto:** solo realizable desde Chile.

---

## 0. Advertencia principal: ninguna oferta pudo verificarse

Esta corrida **no produjo ninguna oferta en estado `verified_active`**, y por lo tanto **`ofertas_verificadas.csv` se entrega con encabezados y sin filas**. No es un descuido: es el resultado honesto de aplicar el protocolo de vigencia.

**Causa.** La política de egreso de red de este entorno deniega la conexión a prácticamente todo host externo. El diagnóstico es concluyente y reproducible:

- `WebFetch` devolvió **HTTP 403** en el 100% de los intentos, incluido el dominio de control neutro `example.com`.
- Una prueba directa con `curl` a nueve dominios (empleospublicos.cl, bne.cl, junji.cl, integra.cl, trabajando.com, indeed.cl, udec.cl, example.com, google.com) devolvió código `000` en los nueve: el gateway rechaza el `CONNECT`.
- El endpoint de estado del proxy lo confirma textualmente: `"gateway answered 403 to CONNECT (policy denial or upstream failure)"`.
- Los cuatro agentes de descubrimiento reportaron el mismo bloqueo de forma independiente.

El manual del propio proxy indica que las denegaciones 403/407 **no deben reintentarse ni eludirse, sino reportarse**. No se intentó ningún rodeo, ni se tocó CAPTCHA, login ni bloqueo alguno.

**Qué sí funcionó.** `WebSearch` opera del lado del servidor y no pasa por ese proxy, por lo que el **descubrimiento sí fue real**: 164 consultas ejecutadas, 78 fuentes barridas, 47 hallazgos brutos. Lo que no fue posible es el paso siguiente: **reabrir la página de cada oferta** para confirmar cargo, empleador, plazo y mecanismo de postulación.

**Consecuencia metodológica.** El protocolo exige que una publicación en buscador o agregador **no basta** para declarar vigencia. Como ninguna ficha pudo reabrirse, ninguna alcanza `verified_active`. Todo lo encontrado queda como `probable`, `unverifiable` o `expired`, y se entrega en `pendientes_y_descartadas.csv` como **lista de trabajo priorizada para reverificación**, no como ofertas confirmadas.

> **No se inventó ninguna oferta.** Todos los registros provienen de resultados de búsqueda reales. Ninguno debe tratarse como vigente sin abrir antes su enlace.

### Única excepción: un documento sí pudo abrirse y leerse

El bucket S3 `archivos.agenciaeducacion.cl` no está cubierto por la denegación, y el auditor **descargó y leyó íntegramente** el PDF oficial (HTTP 200). El documento es la **Resolución Exenta N° 331 de la Agencia de Calidad de la Educación, Santiago, 23 de marzo de 2023**, que aprueba la convocatoria de un/a **Analista de Evaluación Docente**.

Su lectura permite una determinación **verificada** y, a la vez, **doblemente excluyente**:

1. **Cerrada.** El cronograma dice literalmente: *«Difusión y Plazo de Postulación en www.empleospublicos.cl — 7 días hábiles desde el día hábil siguiente de aprobada la resolución»*. Con resolución del 23-03-2023, el plazo venció en abril de 2023, hace más de tres años.
2. **Fuera de zona.** *«Región Metropolitana de Santiago / Ciudad Santiago / … Jornada completa de 44 horas semanales, modalidad presencial. Ciudad de Desempeño: Santiago»*.

Se conserva en el informe **como perfil de referencia documentado** (sección 6), porque describe con precisión qué exige el Estado chileno para un cargo de analista de evaluación docente — información útil para preparar el CV aunque esta convocatoria concreta ya no exista.

---

## 1. Resumen cuantitativo

- Hallazgos brutos de los agentes: **47**
- Únicos tras deduplicación: **41** (se fusionaron 6 duplicados)
- `verified_active`: **0** · `probable`: **2** · `unverifiable`: **32** · `expired`: **7**
- URLs reabiertas por el auditor: **1 de 41**

### Por familia

| Familia | Descripción | Registros |
|---|---|---|
| F1 | Educación parvularia (jardines, reemplazos, coordinación, dirección) | 16 |
| F2 | UTP / coordinación académica o pedagógica, currículo, asesoría técnica | 3 |
| F3 | Docencia universitaria o TP, supervisión de prácticas, tutorías, relatorías | 3 |
| F4 | Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech | 9 |
| F5 | Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG | 10 |

### Por comuna declarada

| Comuna / ámbito | Registros |
|---|---|
| Concepción | 18 |
| No informado | 10 |
| San Pedro de la Paz | 4 |
| Varias comunas Región del Biobío (No informado cuáles específicamente) | 1 |
| Provincia de Concepción (incluye potencialmente Concepción, Chiguayante, Hualqui, Talcahuano, Hualpén, San Pedro de la Paz, Penco) | 1 |
| Santiago (Región Metropolitana) | 1 |
| Chiguayante, Hualqui (y Florida, fuera de las 7 comunas autorizadas) | 1 |
| San Pedro de la Paz (y Coronel, Lota, Santa Juana, fuera de las 7 comunas) | 1 |
| San Pedro de la Paz (y Coronel, Lota, Santa Juana) | 1 |
| Nacional (aplica en la medida que la candidata ejerza en un establecimiento de la zona) | 1 |
| Remoto | 1 |
| Talcahuano | 1 |

### Por modalidad

| Modalidad | Registros |
|---|---|
| presencial | 34 |
| No informado | 6 |
| remoto | 1 |

---

## 2. Tabla priorizada

Orden por **prioridad = ajuste × cobertura**. Se muestran ambos porque un ajuste alto sobre cobertura baja **no es comparable** con uno sobre cobertura alta: significa que hubo pocos criterios evaluables, no que la oferta calce mejor. **Ninguna fila está verificada como vigente.**

| # | Prio | Ajuste | Cobert. | Estado | Fam | Cargo | Empleador | Comuna | Enlace |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 72.7 | 90.9% | 80.0% | `unverifiable` | F1 | Encargada de Jardín Infantil UBB Collao, comuna de Concepció | JUNJI, Región del Biobío | Concepción | [abrir](https://junji.myfront.cl/oferta-de-empleo/3899/encargada-de-jardin-infantil-ubb-collao-comuna-de-concepcion-region-del-bio-bio/) |
| 2 | 72.7 | 90.9% | 80.0% | `unverifiable` | F1 | Base de datos 2025, Educadoras de Párvulos, Provincia de Con | Fundación Integra | Provincia de Concepción (inclu | [abrir](https://login.airavirtual.com/postula/j3ZkHqmHSmAwEdJ4I1Ab) |
| 3 | 67.7 | 90.3% | 75.0% | `unverifiable` | F4 | Evaluador/a de Pruebas de Primer y Segundo Ciclo (PLAEP) | MIDE UC - Centro de Medición, Pontificia U | No informado | [abrir](https://mideuc.cl/oferta-laboral-evaluador-a-de-pruebas-plaep/) |
| 4 | 63.8 | 79.7% | 80.0% | `unverifiable` | F1 | Reemplazo Educadora de Párvulos - Sala Cuna Aitué (aprox. 1  | Fundación Integra (S.C. Aitué) | San Pedro de la Paz | [abrir](https://www.integra.cl/) |
| 5 | 63.7 | 70.8% | 90.0% | `unverifiable` | F4 | Diseñador Instruccional para Cursos Virtuales | Ingeniería Greywater SpA | No informado | [abrir](https://www.getonbrd.com/jobs/education-coaching/disenador-instruccional-para-cursos-virtuales-ingenieria-greywater-spa-santiago) |
| 6 | 61.3 | 76.6% | 80.0% | `unverifiable` | F4 | Corrector/a o Supervisor/a en el Estudio de Grabaciones Auto | MIDE UC - Centro de Medición, Pontificia U | Remoto | [abrir](https://mideuc.cl/postule-aqui-a-corrector-a-o-supervisor/) |
| 7 | 59.8 | 74.7% | 80.0% | `unverifiable` | F1 | Ranking: Educadora de Párvulos, varias comunas, Región del B | JUNJI (Junta Nacional de Jardines Infantil | Varias comunas Región del Biob | [abrir](https://junji.myfront.cl/oferta-de-empleo/6835/ranking-educadora-de-parvulos-varias-comunas-region-del-bio-bio-2/) |
| 8 | 59.5 | 74.4% | 80.0% | `unverifiable` | F4 | Proceso de postulación a Evaluador/a Par (última convocatori | CPEIP (Ministerio de Educación) / DocenteM | Nacional (aplica en la medida  | [abrir](https://www.cpeip.cl/tag/evaluador-par/) |
| 9 | 58.7 | 78.3% | 75.0% | `unverifiable` | F3 | Académicos(as) Facultad de Educación y Ciencias Sociales (co | Universidad Andrés Bello (UNAB) | No informado | [abrir](https://noticias.unab.cl/universidad-andres-bello-anuncia-la-apertura-de-80-nuevas-posiciones-academicas/) |
| 10 | 58.5 | 78.0% | 75.0% | `unverifiable` | F4 | Evaluador(a) de la Agencia de Calidad de la Educación | Agencia de Calidad de la Educación | No informado | [abrir](https://www.empleospublicos.cl/pub/convocatorias/avisotrabajoficha.aspx?i=89253) |
| 11 | 43.7 | 79.5% | 55.0% | `unverifiable` | F1 | Reemplazo Educadora Diferencial, Programa Atención Temprana, | JUNJI, Región del Biobío | Concepción | [abrir](https://junji.myfront.cl/oferta-de-empleo/12280/reemplazo-educadora-diferencial-programa-atencion-temprana-concepcion-region-del-biobio/) |
| 12 | 43.7 | 79.5% | 55.0% | `unverifiable` | F1 | Educadora de Párvulos (nivel medio y sala cuna, sector Lomas | No informado | San Pedro de la Paz | [abrir](https://empleo.mitula.cl/empleo/educadora-parvulos-san-pedro-paz/empleo/educadora-parvulos-san-pedro-paz) |
| 13 | 43.7 | 79.5% | 55.0% | `unverifiable` | F1 | Educadora de Párvulos (y Lenguaje y Comunicación) - red de c | Fundaciones Educacionales Colegios del Arz | Concepción | [abrir](https://www.colegiosarzobispado.cl/trabaja-con-nosotros/) |
| 14 | 40.2 | 89.4% | 45.0% | `unverifiable` | F4 | Llamado a concurso: validación de instrumento de Evaluación  | Universidad de Concepción - Facultad de Ed | Concepción | [abrir](https://educacion.udec.cl/proyectollamadoconcurso/) |
| 15 | 40.2 | 89.4% | 45.0% | `unverifiable` | F2 | Llamado a concursos profesionales de apoyo al Plan de Estudi | Universidad de Concepción - Facultad de Ed | Concepción | [abrir](https://educacion.udec.cl/llamado-a-concursos/) |
| 16 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Traslado: Educadora de Párvulos, JI Magallanes, comuna Conce | JUNJI, Región del Biobío | Concepción | [abrir](https://junji.myfront.cl/oferta-de-empleo/8292/traslado-educadora-de-parvulos-ji-magallanes-comuna-concepcion-region-del-biobio/) |
| 17 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Reemplazo Educadora de Párvulos | No informado | Concepción | [abrir](https://www.chiletrabajos.cl/trabajo/3627848) |
| 18 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Educadora de Párvulos | No informado | Concepción | [abrir](https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-concepcion-3181424) |
| 19 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Educadora de Párvulos (jardín infantil / sala cuna) | No informado | Concepción | [abrir](https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-3820517) |
| 20 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Técnico en Educación Parvularia (jardín infantil particular) | No informado | San Pedro de la Paz | [abrir](https://empleo.mitula.cl/empleo/educacion-parvularia-san-pedro-paz) |
| 21 | 40.0 | 100.0% | 40.0% | `unverifiable` | F1 | Educadora de Párvulos | Corporación Educacional (nombre exacto no  | San Pedro de la Paz | [abrir](https://cl.trabajosdiarios.com/trabajo/2223870/educadora-de-parvulos-en-biobio) |
| 22 | 35.2 | 88.1% | 40.0% | `unverifiable` | F4 | Evaluadores/as de la Agencia de Calidad de la Educación | Agencia de Calidad de la Educación (Chile) | No informado | [abrir](https://www.empleospublicos.cl/pub/convocatorias/convFicha.aspx?i=23995&c=0&j=0&tipo=avisotrabajoficha) |
| 23 | 35.0 | 100.0% | 35.0% | `unverifiable` | F1 | Educadora de Párvulos Jardín Infantil y Sala Cuna Alborada | Jardín Infantil y Sala Cuna Alborada | No informado | [abrir](https://www.laborum.cl/empleos/educadora-de-parvulos-jardin-infantil-y-sala-cuna-jardin-infantil-y-sala-cuna-alborada-1117037779.html) |
| 24 | 34.3 | 36.1% | 95.0% | `unverifiable` | F5 | Encargado/a de Biblioteca CRA (40 hrs) | Colegio no identificado con certeza (ficha | Concepción | [abrir](https://www.concetrabajos.cl/trabajo/encargado-a-de-biblioteca-cra-40-hrs-3196667) |
| 25 | 17.3 | 21.6% | 80.0% | `unverifiable` | F5 | Cajero-Reponedor | Librería Giorgio | Concepción | [abrir](https://www.libreriagiorgio.cl/index.php/Inicio/Trabaje_con_nosotros) |
| 26 | 17.3 | 21.6% | 80.0% | `unverifiable` | F5 | Asistente de Jefatura de Local / Sub-jefe(a) de tienda | Librería Giorgio | Concepción | [abrir](https://cl.jooble.org/trabajo-librer%C3%ADa-giorgio/Concepci%C3%B3n) |
| 27 | 17.3 | 21.6% | 80.0% | `unverifiable` | F5 | Vendedor/a en local comercial (librería) | Comercial Espiral Limitada (librería, Gale | Concepción | [abrir](https://cl.computrabajo.com/ofertas-de-trabajo/oferta-de-trabajo-de-vendedora-en-local-comercial-libreria-horario-completo-en-concepcion-3b3ee47de6e90c7361373e686dcf3405) |
| 28 | 16.2 | 36.1% | 45.0% | `probable` | F1 | Plataforma de postulaciones para reemplazos y contratas | Servicio Local de Educación Pública Andali | San Pedro de la Paz (y Coronel | [abrir](https://slepandaliencosta.gob.cl/trabaja-con-nosotros/) |
| 29 | 16.2 | 36.1% | 45.0% | `unverifiable` | F5 | Mediador/a de Lectura | Biblioteca Viva Trébol | Talcahuano | [abrir](https://bibliotecaviva.cl/trabaja-con-nosotros-bv-trebol-busca-mediador-de-lectura/) |
| 30 | 12.2 | 16.3% | 75.0% | `probable` | F5 | Trabaja con nosotros (canal permanente de postulación, vende | Feria Chilena del Libro | No informado | [abrir](https://feriachilenadellibro.cl/trabaja-con-nosotros/) |
| 31 | 12.2 | 16.3% | 75.0% | `unverifiable` | F5 | Trabaja con nosotros (canal permanente de postulación) | Librería Antártica | No informado | [abrir](https://www.antartica.cl/trabaja-con-nosotros) |
| 32 | 11.2 | 28.1% | 40.0% | `unverifiable` | F5 | Encargado/a Biblioteca CRA (publicado en grupo Facebook 'Bol | Colegio (nombre no confirmado en la síntes | No informado | [abrir](https://www.facebook.com/groups/bolsatrabajobiblio/posts/2014738612256996/) |
| 33 | 5.0 | 100.0% | 5.0% | `unverifiable` | F1 | Base de Datos Reemplazos Asistente de Extensión Horaria para | Fundación Integra | Concepción | [abrir](https://login.airavirtual.com/postula/g03WhUn2RQzhvjlviVCc) |
| 34 | 5.0 | 100.0% | 5.0% | `unverifiable` | F3 | Llamado a concurso (código 3011-2, cargo no especificado en  | Universidad de Concepción - Facultad de Ed | Concepción | [abrir](https://educacion.udec.cl/llamado3011-2) |

---

## 3. Fichas por oferta

Cada ficha refleja **solo** lo que consta en la evidencia recuperada. `No informado` es una respuesta válida y aparece con frecuencia porque no fue posible abrir las páginas.

### 1. Plataforma de postulaciones para reemplazos y contratas

- **Empleador:** Servicio Local de Educación Pública Andalién Costa
- **Estado de vigencia:** `probable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** San Pedro de la Paz (y Coronel, Lota, Santa Juana) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://slepandaliencosta.gob.cl/trabaja-con-nosotros/
- **Enlaces secundarios:** https://slepandaliencosta.gob.cl/director-ejecutivo-slep-andalien-costa/slep-andalien-costa-habilita-plataforma-de-postulaciones-para-reemplazos-y-contratas/
- **Canal de postulación:** https://slepandaliencosta.gob.cl/trabaja-con-nosotros/
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** Reemplazo / contrata · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado (banco continuo)
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Registro de antecedentes para procesos de reemplazo y contrata docente/asistente de la educación

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet: 'SLEP Andalién Costa ha habilitado una plataforma de postulaciones para reemplazos y contratas, una herramienta digital que permite a los interesados registrar sus antecedentes de manera directa, eficiente y transparente.' Es un mecanismo permanente (no una vacante puntual con plazo), lo que sugiere continuidad, pero no se pudo abrir la página para confirmar que siga activa hoy.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): plataforma, postulaciones, reemplazos, contratas, registro, antecedentes, procesos, reemplazo, contrata, docente

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** requisition_id, publication_date, deadline, salary, vacancies

**Advertencias**

  - Es un canal de postulación general, no una oferta puntual; útil para que la candidata registre antecedentes de cara a futuros reemplazos de educadora de párvulos o UTP en San Pedro de la Paz.

### 2. Trabaja con nosotros (canal permanente de postulación, vendedor/a y jefatura local)

- **Empleador:** Feria Chilena del Libro
- **Estado de vigencia:** `probable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** venta_general
- **Comuna:** No informado · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://feriachilenadellibro.cl/trabaja-con-nosotros/
- **Enlaces secundarios:** personal@feriachilenadellibro.cl (correo, según síntesis de búsqueda)
- **Canal de postulación:** personal@feriachilenadellibro.cl (correo, según síntesis de búsqueda)
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** Full-time, horario de mall
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Venta de libros
  - Atención de público
  - Eventual jefatura de tienda

**Requisitos obligatorios**

  - Mayor de 24 años
  - Experiencia previa en librería/retail
  - Disponibilidad full-time en horario de mall

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - Ventas
  - Atención al cliente

**Documentos solicitados**

  - Currículum en Word o PDF

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch sobre la página oficial: 'recruiting vendors and local managers with requirements including immediate availability, full-time mall hours, applicants over 24 years old, and prior experience in bookstore and retail sales... send their updated resume in Word or PDF format to personal@feriachilenadellibro.cl'. Es un canal de reclutamiento permanente sin fecha de cierre ni req. específico por comuna; no se pudo abrir la página (403) para confirmar si hay vacante activa puntual para el Biobío.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): jefatura, atención, trabaja, nosotros, canal, permanente, postulación, vendedor, local, venta

**Ajuste (PROVISIONAL):** 16.3% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, publication_date, deadline, requisition_id, salary, vacancies

**Advertencias**

  - No se confirmó vacante puntual para ninguna de las 7 comunas autorizadas; es un canal de postulación espontánea, no un cargo específico abierto.
  - No existe evidencia de sucursal propia de Feria Chilena del Libro en el Gran Concepción confirmada en esta sesión (no verificado por bloqueo de WebFetch).

### 3. Encargada de Jardín Infantil UBB Collao, comuna de Concepción

- **Empleador:** JUNJI, Región del Biobío
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://junji.myfront.cl/oferta-de-empleo/3899/encargada-de-jardin-infantil-ubb-collao-comuna-de-concepcion-region-del-bio-bio/
- **Canal de postulación:** No informado
- **Código de convocatoria:** 3899
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: dirección/coordinación de jardín infantil (cargo 'Encargada')

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Título de la ficha localizado por buscador: 'Encargada de Jardín Infantil UBB Collao, comuna de Concepción - Región del Bio - Bío'. No se pudo abrir la página (403 en todo junji.myfront.cl) para confirmar vigencia, fecha ni si es proceso externo o interno.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): encargada, jardín, infantil, collao, comuna, concepción, inferencia, dirección, coordinación

**Ajuste (PROVISIONAL):** 90.9% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, apply_url, requisitos, contract, hours, salary

**Advertencias**

  - Existe una ficha paralela titulada 'Proceso Interno: Encargada Jardín Infantil UBB Collao' (id 3802) para el mismo jardín; no se pudo determinar si la ficha 3899 es la versión abierta a público externo o si ambas ya están cerradas.

### 4. Base de datos 2025, Educadoras de Párvulos, Provincia de Concepción, Región del Biobío

- **Empleador:** Fundación Integra
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Provincia de Concepción (incluye potencialmente Concepción, Chiguayante, Hualqui, Talcahuano, Hualpén, San Pedro de la Paz, Penco) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://login.airavirtual.com/postula/j3ZkHqmHSmAwEdJ4I1Ab
- **Canal de postulación:** https://login.airavirtual.com/postula/j3ZkHqmHSmAwEdJ4I1Ab
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** 08:30 a 17:30 (según snippet)
- **Renta:** No informado · **Vacantes:** No informado (base de datos, no vacante única)
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: liderar procesos pedagógicos de niñas y niños, coordinación con equipo, implementación de ambientes de aprendizaje (según descripción estándar Integra)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet de búsqueda: 'Fundación Integra is seeking to hire Educators of Preschoolers with working hours from 8:30 to 17:30 hours, for various communes in the Concepción Province, Biobío Region... appears to be an open database for future replacement and permanent positions.' No se pudo abrir la página (login.airavirtual.com no fue probado directamente por WebFetch pero el dominio raíz integra.cl sí devolvió 403; se asume mismo bloqueo sistémico).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): base, datos, 2025, educadoras, párvulos, provincia, concepción, biobío, inferencia, liderar

**Ajuste (PROVISIONAL):** 90.9% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, requisition_id, contract, salary, vacancies

**Advertencias**

  - El aviso está rotulado 'Base de datos 2025' pese a que la fecha de ejecución es 2026-07-27; podría tratarse de un ciclo ya reemplazado por una versión 2026 no indexada, o seguir vigente como banco continuo. Requiere verificación directa en integra.cl/trabaja-con-nosotros que no pudo realizarse por bloqueo de WebFetch.

### 5. Evaluador/a de Pruebas de Primer y Segundo Ciclo (PLAEP)

- **Empleador:** MIDE UC - Centro de Medición, Pontificia Universidad Católica de Chile
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** No informado · **Remoto desde Chile:** False
- **Enlace principal:** https://mideuc.cl/oferta-laboral-evaluador-a-de-pruebas-plaep/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: aplicación y/o evaluación de instrumentos PLAEP en primera infancia (posible relación directa con perfil de educadora de párvulos)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente (HTTP 403); no se pudo abrir la página. Título indexado por buscador: 'Oferta laboral: Evaluador/a de pruebas de primer y segundo ciclo - MideUC' (PLAEP: Prueba Latinoamericana de Evaluación de Primera Infancia, instrumento vinculado a educación parvularia). No se pudo obtener el cuerpo de la oferta ni fechas.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): plaep, informado, evaluador, pruebas, primer, segundo, ciclo, inferencia, aplicación, evaluación

**Ajuste (PROVISIONAL):** 90.3% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, work_mode, publication_date, deadline, apply_url, requisition_id, mandatory_requirements, contract, hours, salary, vacancies

**Advertencias**

  - Alta relevancia potencial por vincular evaluación de instrumentos con primera infancia/parvularia, pero contenido no verificado por bloqueo de WebFetch; tratar como PROVISIONAL hasta verificación humana directa.

### 6. Reemplazo Educadora de Párvulos - Sala Cuna Aitué (aprox. 1 mes)

- **Empleador:** Fundación Integra (S.C. Aitué)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** San Pedro de la Paz · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.integra.cl/
- **Enlaces secundarios:** https://salascuna.cl/sala/sc-aitue-san-pedro-de-la-paz/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** reemplazo aprox. 1 mes (según snippet, no verificado) · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Colaborar con la educadora de extensión (según snippet, no verificado)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página fuente (WebFetch: HTTP 403 sistémico). Snippet: 'Sala Cuna Aitue... tuvo una posición de reemplazo disponible por un mes con el objetivo de colaborar con la educadora de extensión'. S.C. Aitué es operada por Fundación Integra según ficha de SalasCuna.cl (Av. Costanera 3055, San Pedro de la Paz).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): educadora, reemplazo, párvulos, sala, cuna, aitué, aprox, colaborar, extensión, según

**Ajuste (PROVISIONAL):** 79.7% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, mandatory_requirements, hours, salary, vacancies, apply_url

**Advertencias**

  - Fundación Integra es una fundación privada sin fines de lucro pero con financiamiento y coordinación estatal (red asimilable a JUNJI); posible traslape de alcance con el agente de sector público/semipúblico — se incluye aquí solo por haberse detectado a través de búsqueda generalista/portal privado, con esta advertencia explícita
  - Bloqueo sistémico de WebFetch impidió verificación directa

### 7. Diseñador Instruccional para Cursos Virtuales

- **Empleador:** Ingeniería Greywater SpA
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** No informado · **Remoto desde Chile:** No informado
- **Enlace principal:** https://www.getonbrd.com/jobs/education-coaching/disenador-instruccional-para-cursos-virtuales-ingenieria-greywater-spa-santiago
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Diseño de material didáctico y estructura metodológica de cursos (según resumen, no verificado)
  - Elaboración de evaluaciones diagnósticas, formativas y finales (según resumen, no verificado)

**Requisitos obligatorios**

  - Experiencia en diseño instruccional para adultos (según resumen, no verificado)
  - Conocimiento de LMS, preferentemente Moodle (según resumen, no verificado)

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - Diseño instruccional
  - LMS/Moodle

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch: HTTP 403 sistémico). Resumen de WebSearch describe: creación de material didáctico de apoyo, diseño de la estructura metodológica de módulos de curso, desarrollo de evaluaciones diagnósticas/formativas/finales; 'iniciativa enmarcada en un proceso de licitación de la Comisión Nacional de Riego (CNR)'; requiere experiencia en diseño instruccional para adultos y LMS (preferentemente Moodle). El slug de la URL indica 'santiago', lo que sugiere posible sede en Santiago (fuera de zona autorizada) aunque el cargo es de 'cursos virtuales'; no se pudo confirmar si es 100% remoto ni si es realizable desde la Región del Biobío.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): según, resumen, verificado, instruccional, diseño, cursos, moodle, diseñador, virtuales, material

**Ajuste (PROVISIONAL):** 70.8% sobre una cobertura de 90.0% de los criterios.

**Datos no informados:** commune, work_mode, remote_from_chile, publication_date, deadline, contract, hours, salary, vacancies, apply_url

**Advertencias**

  - No se pudo confirmar si el trabajo es remoto o presencial en Santiago (fuera de zona autorizada si es presencial); si es remoto, no se pudo confirmar remote_from_chile
  - Bloqueo sistémico de WebFetch impidió verificación directa

### 8. Corrector/a o Supervisor/a en el Estudio de Grabaciones Autogestionadas (Evaluación Docente)

- **Empleador:** MIDE UC - Centro de Medición, Pontificia Universidad Católica de Chile
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** Remoto · **Modalidad:** remoto · **Remoto desde Chile:** True
- **Enlace principal:** https://mideuc.cl/postule-aqui-a-corrector-a-o-supervisor/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: corrección/supervisión de grabaciones de clases autogestionadas como parte del proceso de Evaluación Docente

**Requisitos obligatorios**

  - Copia de cédula de identidad
  - Título profesional docente o certificado de autorización del MINEDUC para ejercer la docencia

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - Cédula de identidad
  - Título profesional o certificado MINEDUC

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente (HTTP 403 en todo host); no se pudo abrir la página específica ni confirmar su vigencia actual. Según fragmento de WebSearch: la página ofrece postulación a 'corrector/a o supervisor/a' en el 'estudio de grabaciones autogestionadas', con requisitos que incluyen copia de cédula de identidad y título profesional o certificado de autorización del MINEDUC para profesionales de la docencia. Coincide con la modalidad de estudio de clases grabadas del proceso de Evaluación Docente/Portafolio que administra MIDE UC en convenio.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): docente, grabaciones, autogestionadas, evaluación, corrector, supervisor, estudio, inferencia, corrección, supervisión

**Ajuste (PROVISIONAL):** 76.6% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, apply_url, requisition_id, contract, hours, salary, vacancies, functions detalladas

**Advertencias**

  - INFERENCIA de modalidad remota basada en la naturaleza de 'grabaciones autogestionadas' (evaluación de video ya grabado); no verificado en página oficial por bloqueo de herramienta.

### 9. Ranking: Educadora de Párvulos, varias comunas, Región del Bio Bío

- **Empleador:** JUNJI (Junta Nacional de Jardines Infantiles), Dirección Regional Biobío
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Varias comunas Región del Biobío (No informado cuáles específicamente) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://junji.myfront.cl/oferta-de-empleo/6835/ranking-educadora-de-parvulos-varias-comunas-region-del-bio-bio-2/
- **Canal de postulación:** No informado
- **Código de convocatoria:** 6835
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado (ranking/base de reemplazos, no vacante única)
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: liderar procesos de aprendizaje y bienestar integral de párvulos, según descripción estándar del cargo en JUNJI

**Requisitos obligatorios**

  - Título profesional de Educadora de Párvulos de universidad del Estado o reconocida por éste

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch devolvió 403 en todo el dominio junji.myfront.cl). Snippet de búsqueda describe: 'A ranking/database for replacement positions to cover vacancies in Childhood Education Centers in the Biobío region... Candidates must have a professional degree as Educadora de Párvulos from a state university'. No se observó fecha de cierre ni confirmación de comunas específicas.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): párvulos, educadora, ranking, varias, comunas, inferencia, liderar, procesos, aprendizaje, bienestar

**Ajuste (PROVISIONAL):** 74.7% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, apply_url, contract, hours, salary, vacancies, comunas específicas cubiertas

**Advertencias**

  - Es un 'ranking' (banco de reemplazos), no una vacante puntual; el mecanismo de postulación y las comunas exactas cubiertas no pudieron confirmarse por bloqueo de WebFetch.

### 10. Proceso de postulación a Evaluador/a Par (última convocatoria localizada: 2023)

- **Empleador:** CPEIP (Ministerio de Educación) / DocenteMás
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** Nacional (aplica en la medida que la candidata ejerza en un establecimiento de la zona) · **Modalidad:** No informado · **Remoto desde Chile:** False
- **Enlace principal:** https://www.cpeip.cl/tag/evaluador-par/
- **Enlaces secundarios:** https://www.cpeip.cl/evaluador-par-2023/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Implementar entrevista de evaluación por pares entre docentes

**Requisitos obligatorios**

  - Ser docente o educador/a de aula en ejercicio en establecimiento municipal y/o SLEP, con al menos 5 años de experiencia
  - Pertenecer al mismo nivel escolar, sector de currículo y modalidad del docente evaluado
  - Sin sumario administrativo en los últimos 4 años
  - Nivel Destacado o Competente en última Evaluación Docente

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet: 'A partir del 8 de mayo y hasta el 2 de junio, se inicia el proceso de postulación para ejercer el rol de Evaluador/a Par en el marco de la Evaluación del Desempeño Profesional Docente 2023.' No se encontró convocatoria 2026 en las búsquedas realizadas (se halló portafolio docente 2026 con periodo 8 de julio a 10 de noviembre de 2026, pero eso es el proceso de evaluación DEL docente, no la convocatoria a evaluadores).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): docente, última, evaluación, años, nivel, proceso, postulación, evaluador, convocatoria, localizada

**Ajuste (PROVISIONAL):** 74.4% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** convocatoria 2026 específica (no localizada), publication_date, deadline, apply_url

**Advertencias**

  - Requisito mandatorio de ser docente de aula EN EJERCICIO en establecimiento municipal/SLEP; no hay CV disponible en este entorno para confirmar si la candidata cumple esta condición hoy. Fit PROVISIONAL. Además no se confirmó si existe ciclo 2026 de esta convocatoria.

### 11. Académicos(as) Facultad de Educación y Ciencias Sociales (convocatoria de 80 posiciones, incluye Concepción)

- **Empleador:** Universidad Andrés Bello (UNAB)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F3 — Docencia universitaria o TP, supervisión de prácticas, tutorías, relatorías
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://noticias.unab.cl/universidad-andres-bello-anuncia-la-apertura-de-80-nuevas-posiciones-academicas/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** 80 (a nivel nacional, entre 4 facultades y 3 sedes; no se especifica cuántas corresponden a Concepción)
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: docencia universitaria en carreras de pedagogía/educación
  - INFERENCIA: investigación y acompañamiento de acreditación

**Requisitos obligatorios**

  - Título profesional en área de educación (parvularia, básica, especial u otras afines según nota)
  - Grado de magíster (obligatorio según nota)
  - Doctorado (obligatorio según nota)
  - 3 años de experiencia en docencia universitaria

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente (HTTP 403 en todo host, ver tooling_incident); no se pudo abrir la nota oficial. Según fragmento recuperado por WebSearch: 'Universidad Andrés Bello anuncia la apertura de 80 nuevas posiciones académicas' para las facultades de Ciencias de la Vida, Ingeniería, Economía y Negocios, y Educación y Ciencias Sociales, en sus 3 sedes (Santiago, Viña del Mar y Concepción); para Educación se piden títulos en educación parvularia, básica, especial, psicología, trabajo social y educación física, grado de magíster (obligatorio) y doctorado (obligatorio), 3 años de docencia universitaria. No se pudo confirmar si la convocatoria sigue abierta ni la sede exacta asignada a cada cupo.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): según, nota, inferencia, docencia, universitaria, obligatorio, académicos, facultad, ciencias, sociales

**Ajuste (PROVISIONAL):** 78.3% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, work_mode exacto (INFERENCIA presencial por ser cargo académico de facultad), publication_date, deadline, apply_url, requisition_id, contract, hours, salary

**Advertencias**

  - El requisito de doctorado 'obligatorio' junto con magíster también 'obligatorio' resulta inusual (redundante); podría ser imprecisión del fragmento indexado, no verificado en la fuente original.
  - No se confirmó que la sede Concepción tenga cupos vigentes específicamente para Educación Parvularia.

### 12. Evaluador(a) de la Agencia de Calidad de la Educación

- **Empleador:** Agencia de Calidad de la Educación
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** No informado · **Remoto desde Chile:** False
- **Enlace principal:** https://www.empleospublicos.cl/pub/convocatorias/avisotrabajoficha.aspx?i=89253
- **Canal de postulación:** No informado
- **Código de convocatoria:** 89253
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Evaluación y orientación de establecimientos educacionales y sus sostenedores mediante visitas evaluativas
  - Interacción con sostenedores, directores, docentes, estudiantes y apoderados
  - Trabajo en paneles de 3 evaluadores bajo coordinación de un/a coordinador/a de evaluación

**Requisitos obligatorios**

  - Al menos 5 años de experiencia laboral en funciones afines

**Requisitos deseables**

  - Formación en Liderazgo, Psicología Educacional, Gestión Socioemocional, Convivencia Escolar y Evaluación Educativa

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet de búsqueda describe el cargo en detalle: 'conducting evaluations and guidance of educational establishments and their sponsors through evaluation visits... interacts directly with educational units... works with peers, integrating work panels composed of three people under the direction of an evaluation coordinator... requires at least 5 years of work experience'. No se pudo abrir la ficha (403 en empleospublicos.cl) para confirmar fecha de cierre ni estado.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): evaluación, sostenedores, evaluador, agencia, calidad, orientación, establecimientos, educacionales, mediante, visitas

**Ajuste (PROVISIONAL):** 78.0% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, work_mode, publication_date, deadline, contract, hours, salary, vacancies

**Advertencias**

  - Alto ajuste temático con la experiencia declarada de la candidata (evaluadora en procesos de evaluación docente), pero el ajuste (fit) es PROVISIONAL por ausencia de CV verificado en este entorno. Vigencia no confirmable por bloqueo de WebFetch.

### 13. Reemplazo Educadora Diferencial, Programa Atención Temprana, Concepción

- **Empleador:** JUNJI, Región del Biobío
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** adyacente
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://junji.myfront.cl/oferta-de-empleo/12280/reemplazo-educadora-diferencial-programa-atencion-temprana-concepcion-region-del-biobio/
- **Canal de postulación:** No informado
- **Código de convocatoria:** 12280
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - INFERENCIA: título de Educadora Diferencial (no Educadora de Párvulos genérica); requisito posiblemente distinto al perfil de la candidata

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Título localizado por buscador; página no abierta (403 en junji.myfront.cl).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): educadora, diferencial, reemplazo, programa, atención, temprana, concepción, inferencia, título, párvulos

**Ajuste (PROVISIONAL):** 79.5% sobre una cobertura de 55.0% de los criterios.

**Datos no informados:** publication_date, deadline, requisitos exactos

**Advertencias**

  - El cargo es específicamente 'Educadora Diferencial', que podría exigir mención en educación especial/diferencial distinta a la formación base de educadora de párvulos; ajuste (fit) queda como PROVISIONAL dado que no hay CV disponible en este entorno.

### 14. Educadora de Párvulos (nivel medio y sala cuna, sector Lomas Coloradas)

- **Empleador:** No informado
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** San Pedro de la Paz · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://empleo.mitula.cl/empleo/educadora-parvulos-san-pedro-paz/empleo/educadora-parvulos-san-pedro-paz
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** lunes a viernes 8:30 a 17:30 (según snippet, no verificado)
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - 1 año de experiencia en nivel medio/sala cuna (según snippet, no verificado)

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch: HTTP 403 sistémico). Snippet: 'educadora de párvulos para nivel medio y sala cuna en un centro educativo ubicado en el sector Lomas Coloradas de San Pedro de la Paz, requiriendo un mínimo de un año de experiencia en ese nivel', jornada 'lunes a viernes de 8:30 a 17:30'.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): nivel, medio, sala, cuna, educadora, párvulos, sector, lomas, coloradas, informado

**Ajuste (PROVISIONAL):** 79.5% sobre una cobertura de 55.0% de los criterios.

**Datos no informados:** employer, publication_date, deadline, contract, salary, vacancies, functions

**Advertencias**

  - Datos de jornada/requisitos provienen de resumen de buscador, no de la página fuente
  - Bloqueo sistémico de WebFetch impidió verificación directa

### 15. Educadora de Párvulos (y Lenguaje y Comunicación) - red de colegios

- **Empleador:** Fundaciones Educacionales Colegios del Arzobispado de la Ssma. Concepción (Fundación Educacional Cristo Rey / Fundación Educacional La Asunción)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.colegiosarzobispado.cl/trabaja-con-nosotros/
- **Enlaces secundarios:** https://cl.trabajo.org/oferta-2254-1641c17a22b21ce1fa37677fde824c3d · https://cl.trabajo.org/oferta-2254-9346ea551049f4e622672a1285afef15
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - Título de pedagogía/educación parvularia (según resumen, no verificado literalmente)

**Requisitos deseables**

  - Al menos 1 año de experiencia docente (según resumen, no verificado literalmente)

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir directamente ni el agregador ni la página oficial (WebFetch: HTTP 403 sistémico). Información obtenida de un resumen de WebSearch sobre la página oficial: 'Educadora Parvulos and Lenguaje y Comunicación teachers requiring pedagogy degree and at least 1 year of teaching experience' y que la red invita a 'completar un formulario con antecedentes y documentos para ser considerados en futuros procesos de selección'. No se pudo determinar si corresponde a una vacante puntual con plazo o a un formulario general de postulación espontánea (banco de datos), lo cual es una diferencia crítica de vigencia.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): educadora, párvulos, lenguaje, comunicación, colegios, informado, título, pedagogía, parvularia, según

**Ajuste (PROVISIONAL):** 79.5% sobre una cobertura de 55.0% de los criterios.

**Datos no informados:** publication_date, deadline, contract, hours, salary, vacancies, functions, apply_url

**Advertencias**

  - No se pudo distinguir si es vacante específica vigente o formulario general de postulación espontánea (banco de candidatos) — riesgo de sobreestimar vigencia
  - Datos de requisitos provienen de un resumen de WebSearch sobre contenido de terceros, no de lectura directa de la fuente
  - Bloqueo sistémico de WebFetch impidió verificación directa
  - Contacto de referencia (no verificado): teléfono +56 41 2251413 / +56 41 2217431, email contacto@colegiosarzobispado.cl, dirección Las Heras 681, Concepción — dato de snippet, no confirmado en fuente primaria

### 16. Llamado a concurso: validación de instrumento de Evaluación (proceso de validación cuantitativa)

- **Empleador:** Universidad de Concepción - Facultad de Educación
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://educacion.udec.cl/proyectollamadoconcurso/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: participación en la validación cuantitativa de un instrumento de evaluación (proyecto de investigación de la Facultad de Educación UdeC)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente; no se pudo abrir la página. Título indexado tal cual por el buscador: 'Llamado a concurso validación Proyecto construcción de instrumento de Evaluación Proceso de validación cuantitativa – Facultad de Educación'. Sin más contenido disponible.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): validación, instrumento, evaluación, cuantitativa, informado, llamado, concurso, proceso, inferencia, participación

**Ajuste (PROVISIONAL):** 89.4% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** work_mode (INFERENCIA presencial por ser convocatoria de facultad local), publication_date, deadline, apply_url, requisition_id, mandatory_requirements, contract, hours, salary, vacancies

**Advertencias**

  - No se pudo determinar si se trata de una convocatoria a jueces expertos, personal de apoyo o cargo remunerado; podría no constituir una oferta de empleo formal sino una convocatoria de colaboración académica puntual.

### 17. Llamado a concursos profesionales de apoyo al Plan de Estudios

- **Empleador:** Universidad de Concepción - Facultad de Educación
- **Estado de vigencia:** `unverifiable`
- **Familia:** F2 — UTP / coordinación académica o pedagógica, currículo, asesoría técnica
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://educacion.udec.cl/llamado-a-concursos/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - INFERENCIA: apoyo profesional a la gestión curricular del Plan de Estudios de carreras de la Facultad de Educación

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente; página no abierta. Título indexado: 'Facultad de Educación – Universidad de Concepción | Llamado a concursos profesionales apoyo Plan de Estudios'.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): apoyo, plan, estudios, informado, llamado, concursos, profesionales, inferencia, profesional, gestión

**Ajuste (PROVISIONAL):** 89.4% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** work_mode (INFERENCIA), publication_date, deadline, apply_url, requisition_id, mandatory_requirements, contract, hours, salary, vacancies

**Advertencias**

  - No se pudo confirmar si el/los cargo(s) corresponden a carreras que incluyan Educación Parvularia.

### 18. Traslado: Educadora de Párvulos, JI Magallanes, comuna Concepción

- **Empleador:** JUNJI, Región del Biobío
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** adyacente
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://junji.myfront.cl/oferta-de-empleo/8292/traslado-educadora-de-parvulos-ji-magallanes-comuna-concepcion-region-del-biobio/
- **Canal de postulación:** No informado
- **Código de convocatoria:** 8292
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Título localizado por buscador: 'Traslado: Educadora de Párvulos, JI Magallanes, comuna Concepción; Región del Biobio'. Página no abierta (403).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): traslado, educadora, párvulos, magallanes, comuna, concepción

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** publication_date, deadline, todos los demás

**Advertencias**

  - 'Traslado' es habitualmente un proceso de movilidad interna solo para funcionarias/os ya contratadas por JUNJI; muy probablemente NO aplica a postulantes externas. Se incluye por transparencia, pero su relevancia práctica para la candidata es baja/nula salvo indicación en contrario.

### 19. Reemplazo Educadora de Párvulos

- **Empleador:** No informado
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.chiletrabajos.cl/trabajo/3627848
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch devolvió HTTP 403 en esta URL y en un dominio de control neutro, confirmando bloqueo sistémico de la herramienta). Único dato disponible es el título de snippet de buscador: 'Reemplazo Educadora de Párvulos - Concepción - Concepción | Chiletrabajos'. No se pudo confirmar empleador, plazo ni estado de cierre.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas:** No informado — la evidencia recuperada es demasiado escasa para extraer palabras clave sin inventarlas.

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer, publication_date, deadline, contract, hours, salary, vacancies, functions, mandatory_requirements, official_url, apply_url

**Advertencias**

  - Bloqueo sistémico de la herramienta WebFetch impidió verificación directa
  - Fuente es agregador, no empleador oficial; no se identificó official_url

### 20. Educadora de Párvulos

- **Empleador:** No informado
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-concepcion-3181424
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página específica (WebFetch: HTTP 403 sistémico). Snippet de buscador indica título general 'Educadora de Párvulos - Concepción - Concepción | Chiletrabajos', sin más contenido verificado.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas:** No informado — la evidencia recuperada es demasiado escasa para extraer palabras clave sin inventarlas.

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer, publication_date, deadline, contract, hours, salary, vacancies, functions, mandatory_requirements

**Advertencias**

  - Bloqueo sistémico de WebFetch impidió verificación directa
  - Posible duplicado o similar a otros avisos de Educadora de Párvulos en Chiletrabajos (URLs 3627848 y 3820517); no se pudo confirmar si son ofertas distintas

### 21. Educadora de Párvulos (jardín infantil / sala cuna)

- **Empleador:** No informado
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-3820517
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página específica (WebFetch: HTTP 403 sistémico). Solo se dispone del título de snippet 'educadora de parvulos - Concepción | Chiletrabajos'.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, educadora, párvulos, jardín, infantil, sala, cuna

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer, publication_date, deadline, contract, hours, salary, vacancies, functions, mandatory_requirements

**Advertencias**

  - Bloqueo sistémico de WebFetch impidió verificación directa
  - Posible duplicado de otros avisos similares en el mismo portal

### 22. Técnico en Educación Parvularia (jardín infantil particular)

- **Empleador:** No informado
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** adyacente
- **Comuna:** San Pedro de la Paz · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://empleo.mitula.cl/empleo/educacion-parvularia-san-pedro-paz
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** plazo fijo (según snippet, no verificado) · **Jornada:** 44 horas semanales (según snippet, no verificado)
- **Renta:** $550.000 líquido (según snippet, no verificado) · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página del agregador (WebFetch: HTTP 403 sistémico). Snippet describe: 'técnico en educación parvularia... jardín infantil particular... contrato a plazo fijo, jornada completa de 44 horas semanales, con un sueldo líquido de $550.000'. Cita de resumen de buscador, no verificada en la fuente primaria.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, técnico, parvularia, jardín, infantil, particular

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer, publication_date, deadline, functions, mandatory_requirements

**Advertencias**

  - Cargo de técnico, no de educadora titulada: relevance_type marcado como adyacente
  - Datos de contrato/jornada/sueldo provienen de resumen de buscador (IA de WebSearch), no de la página fuente; posible imprecisión
  - Bloqueo sistémico de WebFetch impidió verificación directa

### 23. Educadora de Párvulos

- **Empleador:** Corporación Educacional (nombre exacto no confirmado)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** San Pedro de la Paz · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://cl.trabajosdiarios.com/trabajo/2223870/educadora-de-parvulos-en-biobio
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch: HTTP 403 sistémico). Título de snippet: 'Educadora de Parvulos en CORPORACION EDUCACIONAL - SAN PEDRO DE LA PAZ | Trabajos Diarios'. Nombre completo de la corporación no confirmado.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas:** No informado — la evidencia recuperada es demasiado escasa para extraer palabras clave sin inventarlas.

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer (nombre completo), publication_date, deadline, contract, hours, salary, vacancies, functions, mandatory_requirements

**Advertencias**

  - Bloqueo sistémico de WebFetch impidió verificación directa
  - Portal 'Trabajos Diarios' es un agregador poco conocido; verificar reputación antes de postular

### 24. Evaluadores/as de la Agencia de Calidad de la Educación

- **Empleador:** Agencia de Calidad de la Educación (Chile)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** No informado · **Remoto desde Chile:** False
- **Enlace principal:** https://www.empleospublicos.cl/pub/convocatorias/convFicha.aspx?i=23995&c=0&j=0&tipo=avisotrabajoficha
- **Enlaces secundarios:** https://www.empleospublicos.cl/pub/convocatorias/avisotrabajoficha.aspx?i=23995
- **Canal de postulación:** No informado
- **Código de convocatoria:** 23995
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A, B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Evaluación en el marco de procesos de la Agencia de Calidad de la Educación

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente. Según WebSearch, la ficha describe un proceso de evaluadores/as de la Agencia de Calidad con etapas sucesivas y excluyentes: 1) Evaluación Curricular, 2) Evaluación Cognitiva, 3) Prueba Técnica, 4) Entrevista Psicolaboral y Juicio de Experto, y 5) Entrevista de Comité Final. No se obtuvo fecha de publicación ni de cierre.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): agencia, calidad, informado, evaluadores, evaluación, marco, procesos

**Ajuste (PROVISIONAL):** 88.1% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** commune, work_mode, publication_date, deadline, apply_url, mandatory_requirements, contract, hours, salary, vacancies

**Advertencias**

  - No confirmado si se trata de un cargo permanente/planta o de convocatorias periódicas para bancos de evaluadores externos.
  - Conflicto de liveness entre agentes {'A': 'expired', 'B': 'unverifiable'}; resuelto a 'unverifiable' de forma conservadora.

### 25. Educadora de Párvulos Jardín Infantil y Sala Cuna Alborada

- **Empleador:** Jardín Infantil y Sala Cuna Alborada
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** nucleo
- **Comuna:** No informado · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.laborum.cl/empleos/educadora-de-parvulos-jardin-infantil-y-sala-cuna-jardin-infantil-y-sala-cuna-alborada-1117037779.html
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch: HTTP 403 sistémico). Detectado mediante búsqueda orientada a Talcahuano, pero el snippet no confirma explícitamente la comuna del establecimiento; se marca 'No informado' para no inferir.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, educadora, párvulos, jardín, infantil, sala, cuna, alborada

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 35.0% de los criterios.

**Datos no informados:** commune, publication_date, deadline, contract, hours, salary, vacancies, functions, mandatory_requirements

**Advertencias**

  - Comuna no confirmada pese a que la búsqueda apuntaba a Talcahuano; INFERENCIA débil, no incluida como dato
  - Bloqueo sistémico de WebFetch impidió verificación directa

### 26. Encargado/a de Biblioteca CRA (40 hrs)

- **Empleador:** Colegio no identificado con certeza (ficha agregador concetrabajos.cl, referencia cruzada menciona estándares CRA Mineduc; otra búsqueda asoció un perfil similar a 'Colegio Andrés Bello', sin confirmación)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** pedagogico_especializado
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://www.concetrabajos.cl/trabajo/encargado-a-de-biblioteca-cra-40-hrs-3196667
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** 40 horas semanales
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Gestión de biblioteca CRA
  - Fomento lector
  - Apoyo al proceso de enseñanza-aprendizaje
  - Atención a estudiantes, docentes y apoderados

**Requisitos obligatorios**

  - Título de profesor, profesional de ciencias sociales, bibliotecario profesional o técnico, o similar
  - 2 años de experiencia en cargo similar

**Requisitos deseables**

  - Manejo de herramientas informáticas nivel medio
  - Conocimiento de software ABIES CRA
  - Cursos de bibliotecología

**Competencias / herramientas**

  - Organización y planificación
  - Orientación al estudiante
  - Proactividad

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch: 'responsible for the management and proper attention to students, teachers, education assistants and parents, to promote reading, research and provide support... according to... standards for CRA school libraries set by the Ministry of Education... 40-hour per week position in Concepción, and immediate availability is required.' No se pudo abrir la ficha (403 confirmado vía curl+proxy).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): biblioteca, profesional, similar, encargado, gestión, fomento, lector, apoyo, proceso, enseñanza

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 95.0% de los criterios.

**Datos no informados:** employer (nombre exacto del colegio), publication_date, deadline, salary, contract, official_url, apply_url, requisition_id

**Advertencias**

  - Nombre exacto del colegio empleador no confirmado por bloqueo de la página; se registra como pedagógico_especializado por función CRA/fomento lector explícita.

### 27. Cajero-Reponedor

- **Empleador:** Librería Giorgio
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** venta_general
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://www.libreriagiorgio.cl/index.php/Inicio/Trabaje_con_nosotros
- **Enlaces secundarios:** https://www.chiletrabajos.cl/trabajo/cajero-reponedor-concepcion-2196291 · https://www.chiletrabajos.cl/trabajo/cajero-y-reponedor-libreria-giorgio-san-pedro-de-la-paz-1939385 · https://www.concetrabajos.cl/trabajo/cajero-y-reponedor-libreria-giorgio-san-pedro-de-la-paz-1939385
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** 45 horas semanales, 5x2 (según resumen, no verificado)
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) C, D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Atención de caja y reposición de mercadería (según resumen, no verificado)

**Requisitos obligatorios**

  - Experiencia en retail preferente (según resumen, no verificado)
  - Disponibilidad inmediata (según resumen, no verificado)

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> No se pudo abrir la página (WebFetch: HTTP 403 sistémico). Resumen de WebSearch: 'personal para cumplir con funciones de Cajero-Reponedor en Librería Giorgio, Comuna de Concepción, jornada de 45 horas semanales (jornada 5x2), de preferencia con experiencia en el rubro retail, con disposición inmediata'. Beneficios mencionados: día de cumpleaños libre, afiliación a Mutual de Seguridad y caja de compensación, uniforme.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): según, resumen, verificado, cajero, reponedor, atención, caja, reposición, mercadería, experiencia

**Ajuste (PROVISIONAL):** 21.6% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, contract, salary, vacancies, apply_url

**Advertencias**

  - Cargo de venta general en librería (F5, relevance_type venta_general), sin componente pedagógico/especializado evidente
  - Bloqueo sistémico de WebFetch impidió verificación directa
  - Existe espejo del mismo aviso en concetrabajos.cl (https://www.concetrabajos.cl/trabajo/cajero-reponedor-2196291)

### 28. Asistente de Jefatura de Local / Sub-jefe(a) de tienda

- **Empleador:** Librería Giorgio
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** venta_general
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://cl.jooble.org/trabajo-librer%C3%ADa-giorgio/Concepci%C3%B3n
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** Plazo fijo (según síntesis de búsqueda) · **Jornada:** 44 horas semanales
- **Renta:** $700.000 mensual aprox. (según síntesis de búsqueda; no confirmado en fuente primaria) · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Gestión de personal
  - Gestión de inventarios
  - Administración de local
  - Ventas retail

**Requisitos obligatorios**

  - Experiencia en administración, gestión de personal e inventarios
  - Disponibilidad inmediata y presencial

**Requisitos deseables**

  - Residencia en Concepción o San Pedro de la Paz

**Competencias / herramientas**

  - Gestión de equipos
  - Gestión de inventario

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch: 'Assistant to the Head of Librerías Giorgio in Concepción and San Pedro de la Paz, requiring experience in administration, personnel management, inventories, and retail sales... Sub-Chief and assistant chief positions... salary of $700,000 monthly on a fixed-term contract with 44-hour weekly workdays.' No se abrió la ficha original.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): gestión, local, personal, inventarios, administración, asistente, jefatura, jefe, tienda, ventas

**Ajuste (PROVISIONAL):** 21.6% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, official_url, apply_url, documents, requisition_id

**Advertencias**

  - Cargo de administración/gestión retail, sin componente pedagógico; clasificado venta_general.
  - Cifra de sueldo proviene de síntesis de buscador, no de apertura directa de la ficha; tratar como referencial.

### 29. Vendedor/a en local comercial (librería)

- **Empleador:** Comercial Espiral Limitada (librería, Galería Alessandri, Aníbal Pinto 450, local 90)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** venta_general
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://cl.computrabajo.com/ofertas-de-trabajo/oferta-de-trabajo-de-vendedora-en-local-comercial-libreria-horario-completo-en-concepcion-3b3ee47de6e90c7361373e686dcf3405
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** Jornada completa; otra variante part-time miércoles y domingo, 20 horas, mencionada en la misma búsqueda
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Atención de público
  - Venta de libros y artículos de librería/regalos
  - Reposición
  - Aseo del local

**Requisitos obligatorios**

  - Enseñanza media completa (según síntesis de otra ficha similar de la misma región)

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - Atención al cliente

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch: 'sales clerk (vendedora) in a retail commercial space - specifically a bookstore with over 30 years of experience selling bookstore items, gifts, etc., located at Aníbal Pinto 450 (Galería Alessandri, Local 90) in Concepción.' Página bloqueada (computrabajo.com 403 vía WebFetch).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): local, librería, atención, vendedor, comercial, público, venta, libros, artículos, regalos

**Ajuste (PROVISIONAL):** 21.6% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** publication_date, deadline, salary, requisition_id, official_url, apply_url, documents, desirable_requirements

**Advertencias**

  - Venta general de libros/regalos, sin componente pedagógico.

### 30. Mediador/a de Lectura

- **Empleador:** Biblioteca Viva Trébol
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** pedagogico_especializado
- **Comuna:** Talcahuano · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://bibliotecaviva.cl/trabaja-con-nosotros-bv-trebol-busca-mediador-de-lectura/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Mediación de lectura (función asumida por título de cargo)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Solo se recuperó el título del post vía WebSearch: 'Trabaja con nosotros: BV Trébol busca mediador de lectura'. No se recuperó fecha ni detalle adicional; página no pudo abrirse (WebFetch bloqueado). Mall Plaza Trébol se ubica en la comuna de Talcahuano (dentro de las 7 comunas autorizadas), según información geográfica general, no confirmada en la ficha misma.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): lectura, informado, mediador, mediación, función, asumida, título

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** publication_date, deadline, salary, contract, requisition_id, apply_url, vacancies, functions detallados, mandatory_requirements

**Advertencias**

  - Comuna (Talcahuano) es INFERENCIA a partir de la ubicación conocida de Mall Plaza Trébol, no confirmada dentro de la ficha misma.
  - Dada la pauta de las otras vacantes de Biblioteca Viva Biobío (fechadas ~2017), existe riesgo alto de que esta publicación también esté vencida.

### 31. Trabaja con nosotros (canal permanente de postulación)

- **Empleador:** Librería Antártica
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** venta_general
- **Comuna:** No informado · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://www.antartica.cl/trabaja-con-nosotros
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Venta de libros
  - Atención de público

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch: 'Librería Antártica has sucursales in Santiago, Temuco, Antofagasta, Concepción, Viña del Mar and online... visit their official employment page at antartica.cl/trabaja-con-nosotros'. Página bloqueada (403) para toda esta sesión; no se pudo confirmar vacante puntual en la sucursal de Concepción.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, trabaja, nosotros, canal, permanente, postulación, venta, libros, atención, público

**Ajuste (PROVISIONAL):** 16.3% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, publication_date, deadline, requisition_id, salary, vacancies, apply_url, functions, mandatory_requirements

**Advertencias**

  - Antártica tiene sucursal confirmada en Concepción según fuentes secundarias, pero no se verificó vacante activa por bloqueo de la página oficial.

### 32. Encargado/a Biblioteca CRA (publicado en grupo Facebook 'Bolsa de Trabajo Bibliotecas')

- **Empleador:** Colegio (nombre no confirmado en la síntesis disponible)
- **Estado de vigencia:** `unverifiable`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** pedagogico_especializado
- **Comuna:** No informado · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://www.facebook.com/groups/bolsatrabajobiblio/posts/2014738612256996/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Encargado/a de Biblioteca CRA (función asumida por título de cargo, no confirmada en detalle)

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebSearch solo devolvió el título del post: 'Cargo: Encargado/a Biblioteca CRA Institución: Colegio...' sin más detalle recuperable (contenido de grupo cerrado de Facebook, requiere login). No se pudo determinar comuna ni confirmar que corresponda a alguna de las 7 comunas autorizadas.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): encargado, biblioteca, informado, publicado, grupo, facebook, bolsa, bibliotecas, función, asumida

**Ajuste (PROVISIONAL):** 28.1% sobre una cobertura de 40.0% de los criterios.

**Datos no informados:** employer, commune, publication_date, deadline, contract, hours, salary, functions detallados, mandatory_requirements, desirable_requirements

**Advertencias**

  - Contenido de grupo de Facebook con acceso restringido/login; no se pudo verificar comuna. INFERENCIA: podría no corresponder a ninguna de las 7 comunas autorizadas; se registra igualmente por transparencia de cobertura.

### 33. Base de Datos Reemplazos Asistente de Extensión Horaria para Jardines Infantiles de Concepción

- **Empleador:** Fundación Integra
- **Estado de vigencia:** `unverifiable`
- **Familia:** F1 — Educación parvularia (jardines, reemplazos, coordinación, dirección)
- **Tipo de relevancia:** parcialmente_transferible
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://login.airavirtual.com/postula/g03WhUn2RQzhvjlviVCc
- **Canal de postulación:** https://login.airavirtual.com/postula/g03WhUn2RQzhvjlviVCc
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Título localizado por buscador; página no abierta (bloqueo sistémico de WebFetch).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): base, datos, reemplazos, asistente, extensión, horaria, jardines, infantiles, concepción

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 5.0% de los criterios.

**Datos no informados:** casi todos los campos, solo se cuenta con el título

**Advertencias**

  - Cargo de 'Asistente de Extensión Horaria', no es rol de educadora de párvulos; se incluye como adyacente de baja prioridad dentro de F1.

### 34. Llamado a concurso (código 3011-2, cargo no especificado en el fragmento indexado)

- **Empleador:** Universidad de Concepción - Facultad de Educación
- **Estado de vigencia:** `unverifiable`
- **Familia:** F3 — Docencia universitaria o TP, supervisión de prácticas, tutorías, relatorías
- **Tipo de relevancia:** adyacente
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://educacion.udec.cl/llamado3011-2
- **Canal de postulación:** No informado
- **Código de convocatoria:** 3011-2
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - No informado

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente; solo se indexó el título genérico 'Llamado a concurso – Facultad de Educación' sin detalle de cargo. Se incluye como candidato pendiente de verificación humana directa por pertenecer al dominio oficial de la Facultad de Educación UdeC.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, llamado, concurso, código, 3011, especificado, fragmento, indexado

**Ajuste (PROVISIONAL):** 100.0% sobre una cobertura de 5.0% de los criterios.

**Datos no informados:** title exacto, functions, mandatory_requirements, publication_date, deadline, apply_url, contract, hours, salary, vacancies

**Advertencias**

  - Registro de muy baja certeza: no se pudo determinar el cargo real detrás del código 3011-2. Se recomienda verificación manual directa antes de cualquier uso.

### 35. Analista de Evaluación Docente (contrata, grado 12 E.U.S.)

- **Empleador:** Agencia de Calidad de la Educación
- **Estado de vigencia:** `expired`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** nucleo
- **Comuna:** Santiago (Región Metropolitana) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** http://archivos.agenciaeducacion.cl.s3.amazonaws.com/trabaja-con-nosotros/REX+331+ANALISTA+EVALUACION+DOCENTE.pdf
- **Canal de postulación:** https://www.empleospublicos.cl
- **Código de convocatoria:** Resolución Exenta N° 331 de 2023
- **Publicación:** 2023-03-23 · **Plazo:** 2023 (7 días hábiles desde el día hábil siguiente a la aprobación de la resolución)
- **Contrato:** Contrata, grado 12 E.U.S., estamento profesional · **Jornada:** 44 horas semanales, jornada completa
- **Renta:** Renta bruta promedio mensualizada $2.123.255 (sin bonos $1.733.419; con bonos $2.902.927) · **Vacantes:** 1
- **Descubierta por:** agente(s) A, B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Coordinar operativamente los procesos logísticos de la Evaluación de Conocimientos Específicos y Pedagógicos (ECEP)
  - Coordinar y supervisar la habilitación de la plataforma docente
  - Coordinar el proceso logístico del ECEP (imprenta, aplicación, distribución, sedes)
  - Entregar asesoría técnica asociada al área de especialidad
  - Elaborar bases técnicas de licitación
  - Generar respuestas ante solicitudes de información de las y los docentes
  - Gestionar materias de ciberseguridad y confidencialidad de la información

**Requisitos obligatorios**

  - Título profesional de carrera de al menos 10 semestres + experiencia profesional no inferior a 1 año (sector público o privado); O BIEN
  - Título profesional de carrera de al menos 8 semestres + experiencia profesional no inferior a 2 años (sector público o privado)
  - El cómputo de la experiencia se realiza desde obtenido el título profesional; no se considera práctica profesional ni pasantías

**Requisitos deseables**

  - Puntaje preferente: Ingeniero(a) Civil, Ingeniero(a) Logístico, Ingeniero(a) Industrial, PEDAGOGO, Administrador(a) Público o carrera afín
  - Deseable postítulo y/o curso en: Operación y Logística, Control de Gestión, Control de Proyectos, Administración de Contratos
  - Conocimiento de normativa pública: estatuto administrativo, bases generales de la administración del Estado, procedimientos administrativos, probidad administrativa, ley de compras públicas
  - Conocimiento en normativa de educación: Ley General de Educación, Sistema de Aseguramiento de la Calidad, Sistema de Desarrollo Profesional Docente
  - Experiencia profesional de al menos 2 años en área de logística y operaciones
  - Deseable 1 año de experiencia en el sector público

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - Copia de Cédula de Identidad legible
  - Copia de certificado que acredite nivel educacional requerido por ley
  - CV en formato libre detallando cargo, funciones y fecha (mes y año) de cada experiencia
  - Todas las especializaciones/capacitaciones deben quedar expresamente declaradas en el currículum (nombre de la actividad, número de horas, institución, período)

**Evidencia de vigencia y fuente**

> FUENTE PRIMARIA ABIERTA Y LEÍDA POR EL AUDITOR (HTTP 200, 2026-07-27). El documento es la 'RESOLUCIÓN EXENTA N° 331, SANTIAGO, 23 de Marzo de 2023'. Cita textual del cronograma: 'Difusión y Plazo de Postulación en www.empleospublicos.cl 7 días hábiles desde el día hábil siguiente de aprobada la resolución'. Con resolución de 23-03-2023, el plazo venció en abril de 2023, más de tres años antes de la fecha de esta corrida (2026-07-27). CERRADA.

**Auditoría de reapertura:** código HTTP `200` — reabierta

**Palabras clave verificadas** (extraídas del texto realmente recuperado): profesional, coordinar, título, experiencia, evaluación, docente, ecep, información, carrera, menos

**Ajuste (PROVISIONAL):** 71.6% sobre una cobertura de 80.0% de los criterios.

**Datos no informados:** commune (probablemente Santiago, sede de la Agencia; fuera de las 7 comunas autorizadas), work_mode, publication_date, deadline, apply_url, mandatory_requirements, contract, hours, vacancies

**Advertencias**

  - FUERA DE LA ZONA PRESENCIAL AUTORIZADA: ciudad de desempeño Santiago, modalidad presencial. No cumple el filtro de las 7 comunas del Gran Concepción.
  - CONVOCATORIA CERRADA desde 2023. Se conserva únicamente como perfil de referencia documentado para un cargo del tipo 'Analista de Evaluación Docente'.
  - Postulación exclusivamente por el Portal de Empleos Públicos; no se reciben postulaciones por correo.

### 36. Docentes de Educación Básica y Media para Construcción de Preguntas

- **Empleador:** MIDE UC - Centro de Medición, Pontificia Universidad Católica de Chile
- **Estado de vigencia:** `expired`
- **Familia:** F4 — Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech
- **Tipo de relevancia:** adyacente
- **Comuna:** No informado · **Modalidad:** No informado · **Remoto desde Chile:** False
- **Enlace principal:** https://mideuc.cl/oferta-laboral-docentes-de-educacion-basica-y-media-para-construccion-de-preguntas/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** 2026-07-06
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Construcción de preguntas/ítems de evaluación para educación básica y media

**Requisitos obligatorios**

  - Ser docente de educación básica o media (según título)

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente; clasificación basada exclusivamente en aritmética de fecha reportada por WebSearch: 'MIDE UC ha publicado una oferta de trabajo para docentes de educación básica y media para construcción de preguntas, con un plazo de postulación hasta el 6 de julio de 2026'. Hoy es 2026-07-27, es decir 21 días después del plazo indicado -> vencida.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): básica, media, construcción, preguntas, docentes, ítems, evaluación, docente, según, título

**Ajuste (PROVISIONAL):** 75.0% sobre una cobertura de 75.0% de los criterios.

**Datos no informados:** commune, work_mode, publication_date, apply_url, requisition_id, contract, hours, salary, vacancies

**Advertencias**

  - Cargo es para educación básica/media, no parvularia explícitamente; se incluye como adyacente por pertenecer a la misma línea de construcción de instrumentos de evaluación de MIDE UC.

### 37. Concurso Director/a para 6 establecimientos (Chiguayante, Florida y Hualqui)

- **Empleador:** Servicio Local de Educación Pública Andalién Sur
- **Estado de vigencia:** `expired`
- **Familia:** F2 — UTP / coordinación académica o pedagógica, currículo, asesoría técnica
- **Tipo de relevancia:** adyacente
- **Comuna:** Chiguayante, Hualqui (y Florida, fuera de las 7 comunas autorizadas) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://andaliensur.gob.cl/trabajemos
- **Enlaces secundarios:** https://andaliensur.gob.cl/posts/atencion
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** 2025-09-30
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** 6 establecimientos
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Dirección de establecimiento educacional

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet de búsqueda: 'There is a public competition convocation to provide the Director/a position in 6 establishments belonging to the municipalities of Chiguayante, Florida and Hualqui, with the reception of documents extending until 23:59 hours on September 30, 2025.' El plazo (30-09-2025) es anterior a la fecha de corte 2026-07-27, por lo tanto vencido.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): concurso, director, establecimientos, chiguayante, florida, hualqui, dirección, establecimiento, educacional

**Ajuste (PROVISIONAL):** 89.4% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** publication_date, requisition_id, apply_url, contract, hours, salary

**Advertencias**

  - Cargo de Director/a de establecimiento típicamente exige credenciales de Alta Dirección Pública / acreditación directiva no confirmables en el perfil de la candidata (fit PROVISIONAL). Se incluye pese a estar vencido porque el coordinador puede necesitar el antecedente de ciclo de concursos SLEP.

### 38. Concurso Alta Dirección Pública 2025: Directores/as

- **Empleador:** Servicio Local de Educación Pública Andalién Costa
- **Estado de vigencia:** `expired`
- **Familia:** F2 — UTP / coordinación académica o pedagógica, currículo, asesoría técnica
- **Tipo de relevancia:** adyacente
- **Comuna:** San Pedro de la Paz (y Coronel, Lota, Santa Juana, fuera de las 7 comunas) · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://adp.serviciocivil.cl/concursos-spl/opencms/permalink/96d2358a-6dff-11ed-8fef-6755d96a8f20
- **Enlaces secundarios:** https://slepandaliencosta.gob.cl/slep-andalien-costa/%F0%9F%93%A2-concurso-alta-direccion-publica-2025-directores-as/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) A · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Dirección de establecimiento educacional

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Snippet de búsqueda de una nota posterior del mismo sitio: 'Nuevos liderazgos: SLEP Andalién Costa designa directores por Alta Dirección Pública' — el uso de 'designa' (pasado) indica que el proceso ya concluyó y los cargos fueron asignados.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): dirección, concurso, alta, pública, 2025, directores, establecimiento, educacional

**Ajuste (PROVISIONAL):** 89.4% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** prácticamente todos los campos operativos

### 39. Mediador/a de Lectura (full time)

- **Empleador:** Biblioteca Viva Biobío (Mall Plaza Mirador Biobío)
- **Estado de vigencia:** `expired`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** pedagogico_especializado
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://bibliotecaviva.cl/trabaja-con-nosotros-biobio-abre-vacantes/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** Full time, turnos de lunes a domingo 11:00-20:15
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Atención de público en salas de lectura
  - Préstamo de material
  - Apoyo en informática
  - Apoyo a talleres y actividades de extensión

**Requisitos obligatorios**

  - Título universitario o técnico en educación, humanidades, bibliotecología, arte, gestión cultural o afín
  - Lector frecuente y entusiasta
  - Habilidades sociales y de trabajo en equipo
  - Disponibilidad de turnos de lunes a domingo 11:00-20:15

**Requisitos deseables**

  - Manejo de Office e Internet

**Competencias / herramientas**

  - Mediación lectora
  - Atención de público
  - Trabajo en equipo

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Primera síntesis de WebSearch describe la vacante en detalle ('full-time reading mediator... Mall Plaza Mirador Biobío... shifts Monday to Sunday 11:00 to 20:15'). Una búsqueda posterior sobre la misma URL indicó explícitamente: 'the search results containing job posting details are from 2017-2018, which are older postings' y 'the most recent relevant information found was from April 2026 regarding cultural programming activities' (sin mención de vacante vigente). Se clasifica expired por señal de antigüedad de la propia síntesis de búsqueda, aunque no se pudo abrir la página directamente (WebFetch bloqueado).

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): lectura, atención, público, apoyo, equipo, mediador, full, time, salas, préstamo

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 95.0% de los criterios.

**Datos no informados:** publication_date exacta, deadline, salary, contract, requisition_id, apply_url, vacancies

**Advertencias**

  - Alta probabilidad de que sea una publicación histórica (2017-2018) reutilizada/indexada, no una vacante vigente en 2026.
  - No se pudo abrir la página directamente por bloqueo de WebFetch; clasificación basada en señal textual de antigüedad de la propia síntesis de búsqueda.

### 40. Mediador/a de Lectura part time (20 horas semanales)

- **Empleador:** Biblioteca Viva Biobío
- **Estado de vigencia:** `expired`
- **Familia:** F5 — Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG
- **Tipo de relevancia:** pedagogico_especializado
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** True
- **Enlace principal:** https://bibliotecaviva.cl/unete-al-equipo-de-biblioteca-viva-4/
- **Canal de postulación:** No informado
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** No informado
- **Contrato:** No informado · **Jornada:** 20 horas semanales (part time)
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) D · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Atención de público en salas de lectura
  - Préstamo
  - Apoyo a talleres y extensión

**Requisitos obligatorios**

  - Título universitario o técnico en áreas afines a educación/humanidades/bibliotecología

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - Mediación lectora

**Documentos solicitados**

  - No informado

**Evidencia de vigencia y fuente**

> Síntesis de WebSearch: 'part-time reading mediator position for the Biblioteca Viva Biobío headquarters, with similar functions...' y en búsqueda posterior explícita: 'the information available in the search results refers to older recruitment periods from 2017'. Se clasifica expired por la misma razón que el hallazgo full time de la misma organización.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): lectura, mediador, part, time, horas, semanales, atención, público, salas, préstamo

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 95.0% de los criterios.

**Datos no informados:** publication_date, deadline, salary, contract, requisition_id, apply_url, vacancies

**Advertencias**

  - Publicación con fuerte evidencia de antigüedad (circa 2017); no se pudo abrir la página por bloqueo de WebFetch.

### 41. Profesores/as Academia 2026 (Química, Biología, Física, Historia, Lenguaje y Literatura, Matemática) - Sede Biobío/Concepción

- **Empleador:** Preuniversitario Pontificia Universidad Católica (Preuniversitario UC)
- **Estado de vigencia:** `expired`
- **Familia:** F3 — Docencia universitaria o TP, supervisión de prácticas, tutorías, relatorías
- **Tipo de relevancia:** adyacente
- **Comuna:** Concepción · **Modalidad:** presencial · **Remoto desde Chile:** False
- **Enlace principal:** https://cl.trabajo.org/oferta-2254-778e4575cf36f9746a082051edbadf52
- **Enlaces secundarios:** docentes.preuuc@uc.cl
- **Canal de postulación:** docentes.preuuc@uc.cl
- **Código de convocatoria:** No informado
- **Publicación:** No informado · **Plazo:** 2025-10-30
- **Contrato:** No informado · **Jornada:** No informado
- **Renta:** No informado · **Vacantes:** No informado
- **Descubierta por:** agente(s) B · **first_seen:** 2026-07-27 · **last_checked:** 2026-07-27T12:30:00-04:00

**Funciones**

  - Docencia de preparación preuniversitaria en las asignaturas indicadas

**Requisitos obligatorios**

  - No informado

**Requisitos deseables**

  - No informado

**Competencias / herramientas**

  - No informado

**Documentos solicitados**

  - Antecedentes/CV (enviar por correo)

**Evidencia de vigencia y fuente**

> WebFetch bloqueado sistémicamente; clasificación por aritmética de fecha según WebSearch: 'interesados deben enviar sus antecedentes a docentes.preuuc@uc.cl antes del 30 de octubre de 2025' para el ciclo de Programas Académicos 2026, sede Biobío en Concepción. Hoy 2026-07-27 es muy posterior al plazo -> vencida.

**Auditoría de reapertura:** código HTTP `000` — bloqueada_gateway_403

**Palabras clave verificadas** (extraídas del texto realmente recuperado): informado, profesores, academia, 2026, química, biología, física, historia, lenguaje, literatura

**Ajuste (PROVISIONAL):** 36.1% sobre una cobertura de 45.0% de los criterios.

**Datos no informados:** publication_date, mandatory_requirements, contract, hours, salary, vacancies, requisition_id

**Advertencias**

  - No corresponde a educación parvularia ni evaluación docente; se incluye por ajustarse al término de búsqueda 'tutor académico/profesor por horas' exigido y por estar en comuna autorizada (Concepción), pero la relevancia real para el perfil es baja (adyacente) y además está vencida.

---

## 4. Ofertas remotas válidas desde Chile

- **Corrector/a o Supervisor/a en el Estudio de Grabaciones Autogestionadas (Evaluación Docente)** — MIDE UC - Centro de Medición, Pontificia Universidad Católica de Chile · estado `unverifiable` · remoto desde Chile: True · https://mideuc.cl/postule-aqui-a-corrector-a-o-supervisor/

Solo **una** oferta remota superó los filtros de familia y de realizable-desde-Chile. Es, además, la de mayor afinidad temática con el perfil (corrección en el marco de la Evaluación Docente), por lo que conviene reverificarla primero. No está confirmada como vigente.

---

## 5. Librerías: sección separada para venta general

El protocolo pide incluir **todos** los empleos pagados en librerías de las comunas autorizadas, distinguiendo el tipo de relevancia. Estos cargos **no exigen ni utilizan** la formación en educación parvularia: se listan como opción de ingreso, no como empleo pedagógico.

| Cargo | Empleador | Comuna | Estado | Enlace |
|---|---|---|---|---|
| Cajero-Reponedor | Librería Giorgio | Concepción | `unverifiable` | [abrir](https://www.libreriagiorgio.cl/index.php/Inicio/Trabaje_con_nosotros) |
| Asistente de Jefatura de Local / Sub-jefe(a) de tienda | Librería Giorgio | Concepción | `unverifiable` | [abrir](https://cl.jooble.org/trabajo-librer%C3%ADa-giorgio/Concepci%C3%B3n) |
| Vendedor/a en local comercial (librería) | Comercial Espiral Limitada (librería, Galerí | Concepción | `unverifiable` | [abrir](https://cl.computrabajo.com/ofertas-de-trabajo/oferta-de-trabajo-de-vendedora-en-local-comercial-libreria-horario-completo-en-concepcion-3b3ee47de6e90c7361373e686dcf3405) |
| Trabaja con nosotros (canal permanente de postulación, vendedor/a y jefatura local) | Feria Chilena del Libro | No informado | `probable` | [abrir](https://feriachilenadellibro.cl/trabaja-con-nosotros/) |
| Trabaja con nosotros (canal permanente de postulación) | Librería Antártica | No informado | `unverifiable` | [abrir](https://www.antartica.cl/trabaja-con-nosotros) |

**Advertencia factual:** ninguna de estas fichas convierte experiencia educativa en experiencia comercial. Si se postula a venta general, el CV debe presentar la experiencia de atención de público y manejo de contenidos **sin atribuir** experiencia en retail que no consta.

### Librerías y afines con componente pedagógico o de mediación

| Cargo | Empleador | Comuna | Estado | Enlace |
|---|---|---|---|---|
| Encargado/a de Biblioteca CRA (40 hrs) | Colegio no identificado con certeza (ficha a | Concepción | `unverifiable` | [abrir](https://www.concetrabajos.cl/trabajo/encargado-a-de-biblioteca-cra-40-hrs-3196667) |
| Encargado/a Biblioteca CRA (publicado en grupo Facebook 'Bolsa de Trabajo Bibliotecas') | Colegio (nombre no confirmado en la síntesis | No informado | `unverifiable` | [abrir](https://www.facebook.com/groups/bolsatrabajobiblio/posts/2014738612256996/) |
| Mediador/a de Lectura (full time) | Biblioteca Viva Biobío (Mall Plaza Mirador B | Concepción | `expired` | [abrir](https://bibliotecaviva.cl/trabaja-con-nosotros-biobio-abre-vacantes/) |
| Mediador/a de Lectura part time (20 horas semanales) | Biblioteca Viva Biobío | Concepción | `expired` | [abrir](https://bibliotecaviva.cl/unete-al-equipo-de-biblioteca-viva-4/) |
| Mediador/a de Lectura | Biblioteca Viva Trébol | Talcahuano | `unverifiable` | [abrir](https://bibliotecaviva.cl/trabaja-con-nosotros-bv-trebol-busca-mediador-de-lectura/) |

---

## 6. Perfil de referencia documentado (fuente primaria leída)

**Analista de Evaluación Docente (contrata, grado 12 E.U.S.) — Agencia de Calidad de la Educación** · `expired` · Resolución Exenta N° 331 de 2023

Convocatoria **cerrada desde 2023** y **fuera de la zona autorizada** (Santiago presencial). Se documenta porque es el **único** perfil de cargo que pudo leerse en su fuente oficial y muestra el estándar real del sector público para un rol de evaluación docente:

**Formación exigida**

  - Título profesional de carrera de al menos 10 semestres + experiencia profesional no inferior a 1 año (sector público o privado); O BIEN
  - Título profesional de carrera de al menos 8 semestres + experiencia profesional no inferior a 2 años (sector público o privado)
  - El cómputo de la experiencia se realiza desde obtenido el título profesional; no se considera práctica profesional ni pasantías

**Deseables y puntaje preferente**

  - Puntaje preferente: Ingeniero(a) Civil, Ingeniero(a) Logístico, Ingeniero(a) Industrial, PEDAGOGO, Administrador(a) Público o carrera afín
  - Deseable postítulo y/o curso en: Operación y Logística, Control de Gestión, Control de Proyectos, Administración de Contratos
  - Conocimiento de normativa pública: estatuto administrativo, bases generales de la administración del Estado, procedimientos administrativos, probidad administrativa, ley de compras públicas
  - Conocimiento en normativa de educación: Ley General de Educación, Sistema de Aseguramiento de la Calidad, Sistema de Desarrollo Profesional Docente
  - Experiencia profesional de al menos 2 años en área de logística y operaciones
  - Deseable 1 año de experiencia en el sector público

**Documentos exigidos**

  - Copia de Cédula de Identidad legible
  - Copia de certificado que acredite nivel educacional requerido por ley
  - CV en formato libre detallando cargo, funciones y fecha (mes y año) de cada experiencia
  - Todas las especializaciones/capacitaciones deben quedar expresamente declaradas en el currículum (nombre de la actividad, número de horas, institución, período)

**Etapas del proceso:** admisibilidad → evaluación curricular → conocimientos técnicos (test/prueba/entrevista técnica) → evaluación de competencias (entrevista psicolaboral) → entrevista de valoración global con comité de selección.

**Dato de alto valor para el perfil:** entre las carreras con **puntaje preferente** figura expresamente **«Pedagogo»**, junto a ingenierías y administración pública. Un título de educadora de párvulos entra en esa categoría preferente. En cambio, la experiencia valorada («al menos dos años en área de logística y operaciones») **no** coincide con el perfil declarado, y no debe forzarse esa correspondencia.

---

## 7. Documentos recurrentes y particulares

Solo **4 de 41** registros declaran documentos, porque las fichas no pudieron abrirse.

**Documentos efectivamente constatados**

- Copia de Cédula de Identidad legible — declarado en 1 oferta(s)
- Copia de certificado que acredite nivel educacional requerido por ley — declarado en 1 oferta(s)
- CV en formato libre detallando cargo, funciones y fecha (mes y año) de cada experiencia — declarado en 1 oferta(s)
- Todas las especializaciones/capacitaciones deben quedar expresamente declaradas en el currículum (nombre de la actividad, número de horas, institución, período) — declarado en 1 oferta(s)
- Cédula de identidad — declarado en 1 oferta(s)
- Título profesional o certificado MINEDUC — declarado en 1 oferta(s)
- Antecedentes/CV (enviar por correo) — declarado en 1 oferta(s)
- Currículum en Word o PDF — declarado en 1 oferta(s)

**Documentos habitualmente exigidos en este sector** (`INFERENCIA` basada en la práctica del sector público chileno y en la única convocatoria leída; **no** consta en las ofertas no abiertas, y debe confirmarse una por una):

- `INFERENCIA` Certificado de título profesional
- `INFERENCIA` Certificado de antecedentes
- `INFERENCIA` Certificado de inhabilidades para trabajar con menores de edad
- `INFERENCIA` Certificados laborales que acrediten experiencia con cargo, funciones y fechas
- `INFERENCIA` Cédula de identidad

---

## 8. Brechas que deben aclararse antes de redactar el CV

Estas son las preguntas **abiertas** sobre la candidata. Ninguna puede responderse desde este entorno, y ninguna debe rellenarse por suposición:

1. **No hay CV adjunto.** No se encontró ningún archivo de CV en el entorno. Todo el ajuste es provisional.
2. **Título y fecha de titulación.** El cómputo de experiencia en el sector público corre **desde la obtención del título**, y excluye prácticas y pasantías. Sin esa fecha no se puede calcular años acreditables.
3. **Años de experiencia por función**, separando aula, coordinación y evaluación, con cargo, institución y mes/año — es el formato que exige el Portal de Empleos Públicos.
4. **Alcance exacto del rol EDS.** Se conserva la sigla literal. No se le atribuyen funciones: hay que documentar qué comprendió.
5. **Postítulos, diplomados y cursos**, con nombre, horas, institución y período.
6. **Experiencia en sector público** (¿la hay?, ¿cuánta?), valorada explícitamente en estos concursos.
7. **Disponibilidad real** de jornada, movilidad entre las 7 comunas y capacidad de trabajo remoto.
8. **Manejo de herramientas** (plataformas de evaluación, ofimática, LMS), no declarado.

---

## 9. Pendientes, duplicados y descartes

**Duplicados fusionados: 6.** Criterios aplicados en orden: URL canónica, código de convocatoria, institución+cargo+comuna, y coincidencia sustancial de funciones y plazo. Se conservaron los enlaces secundarios en cada registro.

- **Evaluadores/as de la Agencia de Calidad de la Educación** — hallada por A, B (2 copias)
  - Conflicto de estado entre agentes: `{'A': 'expired', 'B': 'unverifiable'}` → resuelto conservadoramente a `unverifiable`. Una inferencia débil **no** prevalece sobre la falta de evidencia; solo una señal explícita de cierre lo haría.
- **Analista de Evaluación Docente (contrata, grado 12 E.U.S.)** — hallada por A, B (2 copias)
- **Educadora de Párvulos (y Lenguaje y Comunicación) - red de colegios** — hallada por C (2 copias)
- **Cajero-Reponedor** — hallada por C, D (4 copias)

**Cerradas o vencidas: 7.**

- **Analista de Evaluación Docente (contrata, grado 12 E.U.S.)** — Agencia de Calidad de la Educación · http://archivos.agenciaeducacion.cl.s3.amazonaws.com/trabaja-con-nosotros/REX+331+ANALISTA+EVALUACION+DOCENTE.pdf
- **Concurso Director/a para 6 establecimientos (Chiguayante, Florida y Hu** — Servicio Local de Educación Pública Anda · https://andaliensur.gob.cl/trabajemos
- **Concurso Alta Dirección Pública 2025: Directores/as** — Servicio Local de Educación Pública Anda · https://adp.serviciocivil.cl/concursos-spl/opencms/permalink/96d2358a-6dff-11ed-8fef-6755d96a8f20
- **Docentes de Educación Básica y Media para Construcción de Preguntas** — MIDE UC - Centro de Medición, Pontificia · https://mideuc.cl/oferta-laboral-docentes-de-educacion-basica-y-media-para-construccion-de-preguntas/
- **Profesores/as Academia 2026 (Química, Biología, Física, Historia, Leng** — Preuniversitario Pontificia Universidad  · https://cl.trabajo.org/oferta-2254-778e4575cf36f9746a082051edbadf52
- **Mediador/a de Lectura (full time)** — Biblioteca Viva Biobío (Mall Plaza Mirad · https://bibliotecaviva.cl/trabaja-con-nosotros-biobio-abre-vacantes/
- **Mediador/a de Lectura part time (20 horas semanales)** — Biblioteca Viva Biobío · https://bibliotecaviva.cl/unete-al-equipo-de-biblioteca-viva-4/

**Todo lo demás queda pendiente de reverificación** y está en `pendientes_y_descartadas.csv`, ordenado por estado.

---

## 10. Cobertura y limitaciones

**Cobertura alcanzada**

- 164 consultas ejecutadas por 4 agentes en paralelo.
- 78 fuentes barridas.
- 58 bloqueos registrados.
- Las 5 familias fueron cubiertas; las 7 comunas fueron consultadas explícitamente.
- Los 4 agentes ejecutaron una segunda ronda con sinónimos distintos y se detuvieron al dejar de producir ofertas únicas nuevas.

**Limitaciones — leer antes de usar este informe**

1. **Sin verificación de vigencia.** Es la limitación dominante. Nada aquí está confirmado como vigente, salvo el documento de 2023 que se confirmó **cerrado**.
2. **Sin CV.** Todo ajuste es provisional y se calcula contra el perfil canónico, no contra un currículum real.
3. **Cobertura de criterios baja.** Solo 18 de 47 hallazgos brutos declaraban requisitos obligatorios; el resto se conoce por título y fragmento.
4. **Comunas pequeñas sin resultados propios.** Hualqui, Penco, Hualpén y Chiguayante no produjeron ofertas propias verificables; aparecen sobre todo dentro de convocatorias provinciales o de SLEP.
5. **Portales con login.** LinkedIn y Computrabajo no se consultaron de forma directa; no se intentó eludir su autenticación.
6. **Fechas dominantemente desconocidas.** Casi ningún registro tiene fecha de publicación o plazo, precisamente porque ese dato vive dentro de la ficha que no se pudo abrir.

**Qué hacer con estos archivos.** Trátalos como una **lista de trabajo priorizada**: abrir cada enlace de `pendientes_y_descartadas.csv` desde un equipo con acceso normal a internet, empezando por las filas de mayor prioridad de la sección 2, y confirmar cargo, plazo y vía de postulación antes de invertir tiempo en postular.

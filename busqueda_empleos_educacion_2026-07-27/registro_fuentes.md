# Registro de fuentes, consultas, bloqueos y cobertura

**Ejecución:** 2026-07-27 12:30 (America/Santiago, UTC-04:00)

## Arquitectura de la corrida

| Agente | Ámbito | Consultas | Fuentes | Bloqueos | Hallazgos |
|---|---|---|---|---|---|
| A | sector publico | 53 | 18 | 8 | 13 |
| B | educacion superior, practicas, formacion continua, evaluacion | 38 | 28 | 24 | 10 |
| C | privados, portales generalistas, consultoras, edtech, remoto | 29 | 19 | 18 | 13 |
| D | librerias, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG | 44 | 13 | 8 | 11 |
| **Total** | | **164** | **78** | **58** | **47** |

Los agentes A–D descubrieron en paralelo, sin anidamiento. La verificación y auditoría se ejecutaron de forma independiente y **determinista** sobre los 41 registros únicos: se intentó reabrir cada enlace principal con una petición HTTP real, registrando el código obtenido. Este método sustituye al agente verificador conversacional porque garantiza cobertura completa (41 de 41) y evidencia reproducible, en vez de repetir 41 denegaciones idénticas.

## Estado de la red — el hallazgo determinante

```

WebSearch  : OPERATIVO   (se ejecuta del lado del servidor, no cruza el proxy de egreso)

WebFetch   : BLOQUEADO    (HTTP 403 en el 100% de los intentos, incluido example.com)

curl directo: BLOQUEADO   (código 000 en 9 de 9 dominios probados)

Excepción  : archivos.agenciaeducacion.cl (bucket S3) respondió HTTP 200

```

Mensaje textual del endpoint de estado del proxy:

> `"gateway answered 403 to CONNECT (policy denial or upstream failure)"`

Hosts con denegación registrada por el proxy durante la corrida: `www.concetrabajos.cl`, `feriachilenadellibro.cl`, `profejobs.cl`, `www.antartica.cl`, `ucsc.cl`, `mideuc.cl`, entre otros.

No se intentó eludir el bloqueo, ni desactivar la verificación TLS, ni quitar el proxy, ni tocar CAPTCHA o login alguno. El manual del proxy indica reportar las denegaciones de política en lugar de reintentarlas. Evidencia completa en `_raw/EVIDENCIA_BLOQUEO_RED.md`.

## Fuentes consultadas por agente

### Agente A — sector publico

| Fuente | Resultado | Notas |
|---|---|---|
| empleospublicos.cl | bloqueado | WebFetch devolvió 403 en todos los intentos (ver bloque de bloqueos). Solo se pudo indexar conte |
| bne.cl (Bolsa Nacional de Empleo) | sin resultados relevantes | Búsqueda site:bne.cl Biobío educación devolvió solo empleos no relacionados (conserje, dermocons |
| junji.myfront.cl (portal oficial de reclutamiento JU | 8 candidatos | Portal accesible solo vía snippets de WebSearch (WebFetch bloqueado). Se identificaron rankings  |
| Fundación Integra (portal login.airavirtual.com) | 2 candidatos | integra.cl devolvió 403 directo; se ubicó el portal real de postulación (airavirtual.com) vía We |
| SLEP Andalién Sur (Concepción, Chiguayante, Florida, | 1 candidato (expired) | WebFetch bloqueado (403). Vía WebSearch se identificó un concurso de Director/a para 6 estableci |
| SLEP Andalién Costa (San Pedro de la Paz, Coronel, L | 2 candidatos | WebFetch bloqueado. El concurso ADP 2025 de Directores/as aparece ya resuelto ('designa director |
| SLEP Las Caletas (Talcahuano, Hualpén, Penco, Tomé) | sin resultados / traspaso no efectivo aún | Traspaso de estos establecimientos al SLEP aún no se ha concretado (medios indican fecha ajustad |
| Municipalidad de Concepción / DAEM | sin resultados relevantes | El concurso público de abril 2026 localizado corresponde a 5 cupos de Auxiliar grado 16 (licenci |
| Municipalidad de Chiguayante / DAEM | bloqueado | WebFetch 403. No se hallaron llamados específicos a educadora de párvulos o UTP vía WebSearch en |
| Municipalidad de Hualqui / DAEM | sin resultados | No se identificó un DAEM propio activo; los establecimientos de Hualqui aparecen bajo la adminis |
| Municipalidad de Talcahuano / DAEM | bloqueado | WebFetch 403. DAEM administra 43 establecimientos (incl. 2 de educación parvularia) pero no se e |
| Municipalidad de Hualpén / DAEM | bloqueado | WebFetch 403. Resultados de búsqueda mostraron únicamente llamados antiguos (2018) o de otras ár |
| Municipalidad de San Pedro de la Paz / DAEM (daemspp | bloqueado / sin resultados relevantes | WebFetch 403. DAEM propio aún activo pese a que la comuna corresponde a SLEP Andalién Costa (tra |
| Municipalidad de Penco / DEM (educapenco.cl) | bloqueado | WebFetch 403. No se encontró convocatoria vigente relacionada al perfil vía WebSearch. |
| Agencia de Calidad de la Educación | 3 candidatos | Cargos de Evaluador(a) y Analista de Evaluación Docente, alto ajuste temático al perfil (evaluad |
| CPEIP / DocenteMás (Evaluador/a Par) | sin resultados vigentes 2026 | El proceso de postulación a Evaluador/a Par más reciente encontrado corresponde a 2023. No se lo |
| Ministerio de Educación (mineduc.cl) / Agencia de Ca | bloqueado | WebFetch 403 en mineduc.cl. Únicamente accesible contenido indexado (ver Agencia de Calidad arri |
| Fundaciones Educacionales Colegios del Arzobispado ( | fuera de alcance del Agente A | Se detectaron 2 avisos (reemplazo educadora de párvulos 35h y Director Ciclo Básico 44h en Conce |

### Agente B — educacion superior, practicas, formacion continua, evaluacion

| Fuente | Resultado | Notas |
|---|---|---|
| Universidad de Concepción - Facultad de Educación (l | block | WebFetch 403 sistémico (ver tooling_incident). Localizado vía WebSearch: 'Facultad de Educación  |
| Universidad de Concepción - Facultad de Educación (l | block | WebFetch 403 sistémico. Título indexado: 'Llamado a concurso – Facultad de Educación'. Contenido |
| Universidad de Concepción - Facultad de Educación (p | block | WebFetch 403 sistémico. Título indexado: 'Llamado a concurso validación Proyecto construcción de |
| Universidad de Concepción - Educación Continua Facul | no_match | Página institucional de la Dirección de Educación Continua; no se identificó vacante de relator/ |
| Universidad del Bío-Bío - Concursos Académicos | block | WebFetch 403 sistémico. WebSearch reportó plazos ya vencidos a la fecha de corte (15 y 30 de may |
| UCSC - Trabaja en la UCSC (concurso) | block | WebFetch 403 sistémico. WebSearch no devolvió cargos específicos vigentes. |
| Duoc UC - Hiring Room (vacantes sede Concepción) | block | WebFetch 403 sistémico. Se hallaron 2 vacantes docentes en sede Concepción (Diseño Gráfico UX/UI |
| INACAP - Portal de empleos (Buk / emplea.inacap.cl) | block | WebFetch 403 sistémico. WebSearch mencionó vacante docente Área Salud sede Concepción (proceso i |
| IP Virginio Gómez - Llamados a Concurso | block | WebFetch 403 sistémico. WebSearch no devolvió vacantes específicas vigentes de docencia/coordina |
| IP Virginio Gómez - Portal empleos (trabajando.cl) | unverifiable | No accesible por WebFetch; WebSearch no arrojó cargos puntuales. |
| CFT Estatal de la Región del Biobío - Ofertas Labora | no_match | Portal identificado y con contacto de reclutamiento docente (empleos.docentes@cftebiobio.cl); We |
| Agencia de Calidad de la Educación - Trabaja con Nos | block | WebFetch 403 sistémico. Se confirma que el único canal válido de postulación es empleospublicos. |
| Empleos Públicos - Ficha convocatoria Evaluadores Ag | block | WebFetch 403 sistémico; portal_estatal. WebSearch confirmó existencia de la ficha y describió et |
| Agencia de Calidad de la Educación - Resolución REX  | unverifiable | PDF indexado; WebFetch no probado sobre PDF (bloqueo sistémico general). Antigüedad de la resolu |
| MIDE UC (Pontificia Universidad Católica de Chile) | block | WebFetch 403 sistémico. WebSearch identificó 3 ofertas relevantes (ver findings): corrector/supe |
| MIDE UC - Portal trabajando.cl | block | WebFetch 403 sistémico. |
| Universidad Andrés Bello - Noticias (80 posiciones a | block | WebFetch 403 sistémico. WebSearch describió la convocatoria de forma detallada (ver findings). |
| Universidad Andrés Bello - Portal trabajando.cl | block | WebFetch 403 sistémico. |
| Universidad San Sebastián - Hiring Room | block | WebFetch 403 sistémico. Vacante de 'Académicos(as) USS' identificada por WebSearch corresponde a |
| Universidad Autónoma de Chile - Concurso Académico | no_match | WebSearch indica que la Universidad Autónoma no tendría sede confirmada en Concepción (campus re |
| Universidad Santo Tomás - Trabaja con Nosotros / Cre | block | WebFetch 403 sistémico. Sin vacantes específicas de sede Concepción identificadas vía WebSearch. |
| CFT Santo Tomás - Trabaja con Nosotros | unverifiable | No abierto (bloqueo sistémico); sin hallazgos específicos vía WebSearch. |
| AIEP - Portal Docentes | unverifiable | Portal de registro de postulantes a docencia; no expone vacantes públicas puntuales vía WebSearc |
| Universidad de Chile - Concurso Académico / empleos. | out_of_scope | Portal de concursos académicos nacional revisado como fuente de descubrimiento según indicación  |
| Universidad Técnica Federico Santa María - sede Conc | no_match | Sin vacantes docentes de educación/pedagogía identificadas vía WebSearch para esta sede. |
| Universidad de Las Américas - Concurso Académico | block | WebFetch 403 sistémico; sin cargos específicos de sede Concepción/Facultad de Educación identifi |
| Universidad del Desarrollo - sede Concepción | no_match | Sin vacantes académicas de educación identificadas vía WebSearch para la sede Concepción. |
| Preuniversitario UC - sede Biobío/Concepción | found_expired | Ver finding; plazo de postulación reportado (30-oct-2025) ya transcurrido a la fecha de corte. |

### Agente C — privados, portales generalistas, consultoras, edtech, remoto

| Fuente | Resultado | Notas |
|---|---|---|
| Chiletrabajos | solo vía WebSearch (snippets); WebFetch bloqueado (HTTP 403 sist | Portal agregador chileno; varios candidatos F1 detectados por búsqueda, ninguno verificable en p |
| Laborum.cl | solo vía WebSearch; WebFetch bloqueado | Se identificó 1 aviso F1 (jardín Alborada) por snippet |
| Trabajando.com | no se encontraron avisos propios directos; se hallaron subdomini | WebFetch bloqueado en subdominios |
| Chiletrabajos regional (Concetrabajos) | espejo de Chiletrabajos, mismos avisos | no aporta ofertas únicas adicionales |
| Indeed Chile | solo vía WebSearch; WebFetch bloqueado | usado como fuente secundaria de snippets, sin verificación de página |
| Jooble Chile | vía WebSearch; mayormente páginas de categoría/agregado, no avis | usado solo como señal de volumen, no como fuente primaria de findings |
| Mitula Empleo | vía WebSearch; agregador de agregadores, snippets usados con cau | no se pudo abrir avisos individuales |
| Trabajo.org Chile | WebFetch bloqueado (403) en todas las URLs de ofertas probadas | usado solo vía snippets de WebSearch |
| Get on Board | WebFetch bloqueado; 1 aviso F4 identificado por snippet (Ingenie | portal relevante para edtech/remoto; cobertura limitada por bloqueo de herramienta |
| LinkedIn Jobs | no consultado directamente (regla del sistema: bloqueo/login esp | sin intento de fetch, según instrucciones |
| Computrabajo | no consultado directamente (regla del sistema: bloqueo/login esp | apareció 1 vez en snippet de WebSearch, no explorado |
| Yapo.cl (empleos) | WebFetch bloqueado (403) | solo snippets |
| Sociedad de Instrucción Primaria (SIP) | WebFetch bloqueado; por snippet, SIP opera 17 colegios solo en R | sin presencia confirmada en las 7 comunas autorizadas; no aporta findings de zona |
| Fundación Belén Educa | WebFetch bloqueado; por snippet, la red tiene colegios en RM y u | sin presencia confirmada en las 7 comunas autorizadas; no aporta findings de zona |
| Colegios del Arzobispado de la Ssma. Concepción (red | WebFetch bloqueado; información obtenida solo vía snippet de Web | candidato relevante en zona autorizada, pero no verificado directamente en fuente oficial |
| Librería Giorgio (Concepción/San Pedro de la Paz) | WebFetch bloqueado; datos por snippet de agregador (Chiletrabajo | F5 venta_general en comunas autorizadas |
| Fundación Integra | vía WebSearch/snippets; fundación privada sin fines de lucro con | posible traslape de alcance con agente de sector público/semipúblico; se incluye con advertencia |
| JUNJI (jardines públicos) | detectado en búsquedas generalistas pero excluido | JUNJI es organismo público; fuera del ámbito del Agente C (privados/portales/edtech/remoto). No  |
| Control de funcionamiento de WebFetch | HTTP 403 en sitio de control neutro | confirma bloqueo sistémico de la herramienta WebFetch en este entorno de ejecución, no un bloque |

### Agente D — librerias, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG

| Fuente | Resultado | Notas |
|---|---|---|
| WebFetch (herramienta genérica) | blocked | 403 Forbidden en dominios de control totalmente ajenos al tema; confirma bloqueo sistémico de la |
| concetrabajos.cl | blocked | 403 vía WebFetch y vía curl+proxy (gateway 403 CONNECT). No se pudo abrir la ficha específica. |
| feriachilenadellibro.cl | blocked | 403 Forbidden. |
| profejobs.cl | blocked | 403 Forbidden. |
| antartica.cl | blocked | 403 Forbidden. |
| libreriagiorgio.cl | blocked | 403 Forbidden. |
| cl.jooble.org | blocked | 403 Forbidden vía WebFetch; se usó solo la síntesis de WebSearch. |
| laborum.cl | blocked | 403 Forbidden. |
| cl.indeed.com | blocked | 403 Forbidden. |
| cl.computrabajo.com | blocked | 403 Forbidden. |
| chiletrabajos.cl | blocked | 403 Forbidden. |
| noticias.udec.cl | blocked | 403 Forbidden. |
| WebSearch (agregado de resultados) | partial | Funcionó y devolvió síntesis con enlaces para todas las consultas listadas; es la única fuente d |

## Consultas ejecutadas

### Agente A (53 consultas)

- `site:empleospublicos.cl educadora de párvulos Biobío`
- `site:empleospublicos.cl "educadora" Concepción 2026`
- `empleospublicos.cl jefe UTP unidad técnico pedagógica Biobío`
- `bne.cl educadora de párvulos Concepción`
- `JUNJI empleos educadora de párvulos Concepción Biobío 2026`
- `site:empleospublicos.cl "Concepción" educación 2026`
- `site:mineduc.cl trabaje con nosotros evaluador docente portafolio`
- `CPEIP evaluador de portafolio docente convocatoria 2026`
- `Agencia Calidad de la Educación empleos evaluador convocatoria 2026`
- `"jardín infantil" JUNJI Concepción "educadora de párvulos" reemplazo 2026`
- `site:junji.myfront.cl Concepción`
- `site:junji.myfront.cl Biobío educadora`
- `site:junji.myfront.cl Talcahuano OR Hualpén OR Chiguayante OR Penco OR "San Pedro de la Paz" OR Hualqui`
- `site:junji.myfront.cl "ranking" reemplazo educadora párvulos Biobío`
- `site:junji.myfront.cl directora jardín infantil Concepción OR Talcahuano OR "San Pedro de la Paz"`
- `Fundación Integra trabajando.cl educadora de párvulos Concepción Biobío`
- `Fundación Integra "educadora de párvulos" Concepción vacante 2026`
- `empleospublicos.cl "Servicio Local de Educación" Andalién OR Biobío convocatoria docente`
- `login.airavirtual.com integra educadora párvulos Concepción`
- `site:empleospublicos.cl "Andalién Sur" OR "Andalién Costa" educación docente Concepción`
- `"jefe de UTP" OR "jefa de UTP" Concepción OR Talcahuano OR Chiguayante OR Hualpén liceo escuela municipal 2026`
- `"coordinador pedagógico" OR "coordinadora pedagógica" Concepción escuela municipal 2026 concurso`
- `Hualqui DAEM concurso educadora párvulos docente 2026`
- `site:bne.cl Biobío educación`
- `"empleospublicos.cl" ficha 23995 Agencia Calidad Educación evaluadores`
- `SLEP Andalién Sur "educadora de párvulos" OR "docente" concurso vacante Concepción Chiguayante Hualqui`
- `"evaluador par" OR "evaluadora par" docente Biobío CPEIP convocatoria postular`
- `"asesoría técnico pedagógica" OR "asesor pedagógico" Concepción corporación educacional 2026`
- `site:andaliensur.gob.cl vacante OR concurso OR postula educadora OR docente OR UTP`
- `site:slepandaliencosta.gob.cl concurso docente OR educadora OR UTP 2026`
- `"educación inicial" OR "jardín infantil" Talcahuano corporación municipal vacante 2026`
- `"gestión curricular" OR "calidad educativa" Concepción Biobío empleo 2026 fundación ONG`
- `Fundación Educacional Arzobispado Concepción "educadora de párvulos" OR UTP vacante`
- `"SLEP Andalién Sur" director escuela concurso 2026 Concepción Chiguayante Florida Hualqui`
- `Fundaciones Educacionales Colegios del Arzobispado Concepción educadora párvulos reemplazo 35 horas`
- `"SLEP Andalién Costa" director 2026 Alta Dirección Pública concurso fecha cierre`
- `municipalidad San Pedro de la Paz DAEM concurso educadora párvulos docente 2026`
- `site:daemspp.cl concurso OR vacante educadora OR UTP OR docente`
- `site:sanpedrodelapaz.cl concursos-publicos educadora OR UTP OR docente`
- `"Corporación Municipal de Talcahuano" OR "Corporación Educacional Talcahuano" concurso docente 2026`
- `municipalidad Hualpén "concursos-publicos" 2026 educación docente OR párvulos`
- `"Bases-Concurso-Publico-Abril-2026" concepcion.cl cargo educación`
- `site:junji.myfront.cl "Jefa de Unidad Educativa" OR "Coordinadora" Concepción Biobío educadora`
- `SLEP Gran Concepción Andalién Sur concurso docente directivo`
- `SLEP San Pedro de la Paz educación pública servicio local nombre`
- `SLEP Talcahuano Hualpén Penco servicio local educación pública nombre`
- `"SLEP Las Caletas" trabaja con nosotros concurso`
- `Corporación Municipal Talcahuano educación concurso educadora párvulos 2026`
- `DAEM Concepción concurso docente educadora párvulos 2026`
- `municipalidad Hualpén DAEM concurso educadora párvulos`
- `municipalidad Concepción concursos públicos educación 2026`
- `municipalidad Chiguayante concurso educadora párvulos DAEM 2026`
- `municipalidad Penco DAEM concurso docente educadora 2026`

### Agente B (38 consultas)

- `Universidad de Concepción trabaja con nosotros vacantes académico facultad educación 2026`
- `Universidad del Bío-Bío empleos académicos convocatoria docente 2026`
- `UCSC Universidad Católica Santísima Concepción trabaja con nosotros vacantes 2026`
- `DuocUC trabaja con nosotros sede San Andrés Concepción vacantes docente`
- `INACAP Concepción Talcahuano trabaja con nosotros vacantes docente 2026`
- `Duoc UC empleos docente jornada Concepción educación parvularia OR pedagogía site:duoc.hiringroom.com`
- `"IP Virginio Gómez" trabaja con nosotros vacantes docente 2026`
- `CPEIP convocatoria correctores portafolio evaluación docente 2026`
- `MIDE UC trabaja con nosotros vacantes corrector evaluador 2026`
- `"Agencia de Calidad de la Educación" trabaja con nosotros vacantes 2026 evaluador`
- `"Universidad San Sebastián" sede Concepción trabaja con nosotros vacantes académico 2026`
- `Universidad Santo Tomás Concepción trabaja con nosotros docente vacantes 2026`
- `"Universidad Andrés Bello" sede Concepción trabaja con nosotros vacantes académico educación`
- `"Universidad de Las Américas" sede Concepción vacante académico facultad educación 2026`
- `"Universidad Autónoma de Chile" sede Concepción vacante docente académico 2026`
- `"Universidad del Desarrollo" sede Concepción vacante académico educación 2026`
- `UTFSM Universidad Técnica Federico Santa María sede Concepción Talcahuano vacante docente 2026`
- `AIEP Concepción trabaja con nosotros docente vacante 2026`
- `"supervisor de prácticas" OR "supervisora de práctica" pedagógica educación parvularia Concepción 2026 vacante`
- `coordinador académico carrera pedagogía Concepción vacante 2026`
- `diplomado educación formación continua Concepción relator 2026 vacante`
- `diseño instruccional diseño curricular edtech Concepción vacante 2026`
- `"IP Los Leones" OR "IP Chileno Británico" Concepción trabaja con nosotros vacante docente`
- `site:laborum.cl docente educación parvularia OR pedagogía Concepción universidad instituto 2026`
- `"CFT Estatal" Biobío trabaja con nosotros docente vacante 2026`
- `"Universidad Andrés Bello" Concepción "docente" OR "académico" facultad educación 2026 hiringroom`
- `Universidad San Sebastián Concepción "Facultad de Educación" OR "Escuela de Educación" vacante académico 2026`
- `"evaluador docente" OR "corrector de portafolio" convocatoria 2026 universidad remoto Chile`
- `UNAB "80 nuevas posiciones académicas" Concepción educación fecha postulación 2026`
- `"REX 331" OR "Analista Evaluación Docente" Agencia de Calidad de la Educación convocatoria 2026`
- `"Empleo: Evaluadores de la Agencia de Calidad" empleospublicos convocatoria 2026 plazo`
- `"profesor por horas" OR "ayudante de cátedra" OR "docencia superior" Concepción vacante 2026 educación`
- `"coordinador de evaluadores" OR "supervisor de estudio" MIDE UC OR PUCV OR Chile 2026 vacante`
- `"acompañamiento docente" OR "asesoría pedagógica" Concepción Talcahuano vacante 2026 fundación ONG`
- `"tutor académico" OR "tutor virtual" educación online Concepción remoto Chile 2026`
- `Fundación Educacional OR ONG educación Concepción Talcahuano Hualpén San Pedro de la Paz vacante coordinador pedagógico 2026`
- `"Higher Ed Chile" portal empleos académicos concursos universidades`
- `"IP Virginio Gómez" OR "Instituto Virginio Gómez" educación parvularia docente coordinador vacante 2026`

### Agente C (29 consultas)

- `educadora de párvulos Concepción Chile empleo 2026 Trabajando.com`
- `educadora de párvulos Talcahuano jardín infantil empleo Laborum`
- `jardín infantil particular San Pedro de la Paz educadora reemplazo empleo`
- `coordinadora UTP Concepción colegio particular subvencionado empleo 2026`
- `diseñador instruccional remoto Chile edtech empleo Get on Board`
- `site:getonbrd.com OR site:getonbrd.cl diseño instruccional OR "contenidos educativos" OR "evaluación educativa" remoto Chile`
- `Sociedad de Instrucción Primaria Concepción trabaja con nosotros vacante 2026`
- `Belén Educa trabaja con nosotros vacantes Concepción Talcahuano 2026`
- `"jardín infantil" Chiguayante OR Hualqui OR Penco OR Hualpén educadora empleo 2026`
- `relatoría OTEC capacitación docente Concepción Biobío empleo 2026`
- `"Cruz del Sur" OR "Aptus" colegios Concepción Biobío trabaja con nosotros vacantes`
- `tutor virtual OR "corrector de contenidos educativos" remoto Chile empleo 2026`
- `Fundaciones Educacionales Colegios Arzobispado Concepción trabaja con nosotros vacantes`
- `librería Concepción vendedor OR encargado empleo 2026 literatura infantil`
- `docente universitario educación parvularia Concepción supervisión de prácticas empleo 2026`
- `"sala cuna" Hualqui OR Penco empleo educadora técnico 2026`
- `CRA biblioteca escolar Concepción Biobío encargado empleo fomento lector 2026`
- `evaluador educativo OR "diseño curricular" empleo remoto Chile teletrabajo 2026 LinkedIn`
- `Librería Giorgio Concepción trabaja con nosotros empleo cajero reponedor jornada`
- `"jefatura UTP" OR "unidad técnico pedagógica" Talcahuano OR Hualpén colegio empleo 2026`
- `"asesoría pedagógica" OR "acompañamiento docente" freelance OR consultora Concepción Biobío 2026`
- `"creador de contenidos educativos" OR "content creator" educación remoto LatAm Chile empleo 2026`
- `"educación inicial" Concepción OR "Gran Concepción" empleo coordinadora 2026 -junji`
- `"calidad educativa" OR "aseguramiento de la calidad" empleo Chile remoto 100% home office 2026`
- `"jardín infantil" Concepción trabaja con nosotros vacante educadora sitio oficial -jooble -indeed -mitula`
- `editorial educativa Chile diseñador de contenidos pedagógicos empleo remoto teletrabajo`
- `"Sala Cuna Aitue" San Pedro de la Paz reemplazo educadora empleo`
- `educadora técnica párvulos "San Pedro de la Paz" "44 horas" $550.000 jardín infantil particular`
- `educadora párvulos "Lomas Coloradas" San Pedro de la Paz sala cuna nivel medio empleo`

### Agente D (44 consultas)

- `trabajo librero Concepción Chile 2026`
- `Feria Chilena del Libro empleo vendedor Concepción`
- `Librería Antártica trabajo Concepción vacante`
- `bibliotecario Concepción trabajo 2026`
- `encargado CRA Concepción biblioteca escolar empleo`
- `"Librería Universitaria" OR "Librería UdeC" trabajo Concepción vendedor`
- `"Librería Inglesa" Concepción trabajo empleo`
- `Buscalibre Concepción trabajo empleo punto de retiro`
- `mediador de lectura fomento lector Concepción Biobío empleo`
- `editorial contenidos educativos Concepción trabajo SM Santillana Zig-Zag`
- `museo educación Concepción mediador guía educativa empleo`
- `Fundación La Fuente empleo trabajo Concepción biblioteca`
- `Biblioteca Regional del Biobío empleo trabajo Concepción`
- `"Biblioteca Viva" Biobío vacante mediador lectura Mall Plaza Mirador`
- `edtech Concepción Chile empleo contenidos educativos digitales`
- `ONG educación Concepción coordinador programa educativo empleo`
- `Corporación Cultural Concepción empleo mediador cultural educación`
- `literatura infantil promotor editorial visitador editorial Concepción empleo`
- `librería Talcahuano OR Chiguayante OR "San Pedro de la Paz" trabajo vendedor`
- `"Qué Leo" librería Chile trabajo empleo`
- `Editorial Universidad de Concepción empleo editor contenidos`
- `Museo de Historia Natural de Concepción educación empleo mediador`
- `Pinacoteca UdeC Casa del Arte Concepción empleo educación mediación`
- `empleospublicos.cl bibliotecario Concepción OR Talcahuano OR Hualpén OR Penco OR Chiguayante OR "San Pedro de la Paz" OR Hualqui`
- `municipalidad Concepción concurso encargado biblioteca municipal 2026`
- `Servicio Nacional del Patrimonio Cultural empleo Biobío Concepción 2026`
- `Fundación Mustakis OR "Fundación Luksic" empleo Concepción educación`
- `Caligrafix OR Norma editorial empleo Concepción vendedor visitador`
- `concursos.patrimoniocultural.gob.cl Biobío mediador educación cultural 2026`
- `cultura.gob.cl convocatorias Biobío 2026 educación`
- `"animación lectora" OR "promoción de la lectura" empleo Concepción Biobío`
- `Teatro Biobío OR "Artistas del Acero" Concepción empleo mediación educación`
- `Colegio Andrés Bello Concepción encargado biblioteca CRA`
- `yapo.cl empleos librero bibliotecario Concepción Biobío`
- `facebook bolsa trabajo bibliotecas Concepción CRA encargado 2026`
- `Librería Científica OR "Librería El Poeta" OR "Librería Cardenio" Concepción trabajo`
- `mineduc.cl empleo "Profesional de Apoyo Centro de Lectura y Biblioteca" CRA región comuna`
- `Jerplaz librería infantil Concepción trabajo vendedor`
- `Librería El Caribe Concepción trabajo empleo vendedor`
- `"Librería Giorgio" Concepción "San Pedro de la Paz" vacante sueldo jornada requisitos`
- `computrabajo "vendedora en local comercial" librería Concepción "Comercial Espiral"`
- `Biblioteca Viva Biobío mediador lectura part time fecha publicación 2026`
- `"Fundación Luksic" REMA coordinador vacante empleo sitio`
- `jooble "librería giorgio" Concepción cajero reponedor sueldo`

## Bloqueos registrados

### Agente A (8)

| URL | Tipo | Detalle |
|---|---|---|
| https://www.empleospublicos.cl/* (todas las fichas probadas) | 403 | WebFetch devolvió HTTP 403 Forbidden en cada intento. |
| https://integra.cl y https://www.integra.cl | 403 | WebFetch devolvió HTTP 403 Forbidden. |
| https://www.junji.gob.cl, https://junji.trabajando.cl, https://junji.myfront.c | 403 | WebFetch devolvió HTTP 403 Forbidden en las tres variantes de dominio JUNJI  |
| https://www.bne.cl | 403 | WebFetch devolvió HTTP 403 Forbidden. |
| https://andaliensur.gob.cl/trabajemos, https://slepandaliencosta.gob.cl/trabaj | 403 | WebFetch devolvió HTTP 403 Forbidden en los tres SLEP consultados. |
| http://www.hualpenciudad.cl/concursos-publicos/, https://www.daemhualpen.cl/,  | 403 | WebFetch devolvió HTTP 403 Forbidden en todos los sitios municipales/DAEM pr |
| https://concepcion.cl/wp-content/uploads/2026/04/Bases-Concurso-Publico-Abril- | 403 | WebFetch devolvió HTTP 403 Forbidden; no se pudo abrir el PDF directamente,  |
| https://example.com, https://en.wikipedia.org/wiki/Chile, https://www.anthropi | 403 | CONTROL DE DIAGNÓSTICO: se probó WebFetch contra dominios de control totalme |

### Agente B (24)

| URL | Tipo | Detalle |
|---|---|---|
| https://example.com | bloqueo_proxy_sistemico | HTTP 403 en WebFetch sobre dominio de control neutral, confirma que el bloqu |
| https://www.google.com | bloqueo_proxy_sistemico | HTTP 403 en WebFetch; mismo diagnóstico. |
| https://ucsc.cl/concurso/ | bloqueo_proxy_sistemico | curl -x $HTTPS_PROXY devolvió 'CONNECT tunnel failed, response 403'. |
| https://mideuc.cl/ | bloqueo_proxy_sistemico | curl -x $HTTPS_PROXY devolvió 'CONNECT tunnel failed, response 403'. |
| https://ubiobio.cl/concursos/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://educacion.udec.cl/llamado-a-concursos/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://educacion.udec.cl/llamado3011-2 | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://educacion.udec.cl/proyectollamadoconcurso/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://inacap.buk.cl/trabaja-con-nosotros | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://emplea.inacap.cl/trabajar-en-iinacap/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://duoc.hiringroom.com/jobs/get_vacancy/633a537492dbd23581d83248 | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.docentemas.cl/instrumentos-de-evaluacion/portafolio/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.docentemas.cl/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.virginiogomez.cl/llamados-a-concurso/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://mideuc.cl/postule-aqui-a-corrector-a-o-supervisor/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://mideuc.cl/oferta-laboral-evaluador-a-de-pruebas-plaep/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.agenciaeducacion.cl/trabaja-con-nosotros/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.empleospublicos.cl/pub/convocatorias/convFicha.aspx?i=23995&c=0&j= | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://unab.trabajando.cl/empleos/ofertas | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://santotomas.trabajando.cl/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://www.creaempleo.cl/ | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://universidadsansebastian.hiringroom.com/jobs | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://universidadsansebastian.hiringroom.com/jobs/get_vacancy/695d1f7211cdde | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |
| https://noticias.unab.cl/universidad-andres-bello-anuncia-la-apertura-de-80-nu | bloqueo_proxy_webfetch | WebFetch devolvió HTTP 403. |

### Agente C (18)

| URL | Tipo | Detalle |
|---|---|---|
| https://example.com | tool_error_sistemico | WebFetch devolvió HTTP 403 Forbidden incluso en un dominio de control neutro |
| https://www.chiletrabajos.cl/trabajo/3627848 | http_403 | No se pudo abrir la página específica del aviso para verificar vigencia |
| https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-concepcion-3181424 | http_403 | No se pudo abrir la página específica del aviso |
| https://www.chiletrabajos.cl/trabajo/educadora-de-parvulos-3820517 | http_403 | No se pudo abrir la página específica del aviso |
| https://www.laborum.cl/empleos/educadora-de-parvulos-jardin-infantil-y-sala-cu | http_403 | No se pudo abrir la página específica del aviso |
| https://www.getonbrd.cl/ | http_403 | No se pudo abrir el portal para listar avisos edtech/remoto directamente |
| https://www.getonbrd.com/jobs/education-coaching/disenador-instruccional-para- | http_403 | No se pudo abrir la página específica del aviso |
| https://beleneduca.trabajando.cl/ | http_403 | No se pudo abrir el portal de la red de colegios |
| https://www.beleneduca.cl/trabajaconnosotros/ | http_403 | No se pudo abrir la página oficial de vacantes |
| https://sip.trabajando.cl/ | http_403 | No se pudo abrir el portal de la red de colegios |
| https://cl.trabajo.org/oferta-2254-9346ea551049f4e622672a1285afef15 | http_403 | No se pudo abrir la página específica del aviso (Director Ciclo Básico) |
| https://cl.trabajo.org/oferta-2254-778e4575cf36f9746a082051edbadf52 | http_403 | No se pudo abrir la página específica del aviso |
| https://cl.trabajo.org/oferta-2254-752f06acffeef1bb823f1c538bde0e72 | http_403 | No se pudo abrir la página específica del aviso |
| https://cl.trabajo.org/oferta-2254-1dbc86671077410e6b4d8d7e8c729be5 | http_403 | No se pudo abrir la página específica del aviso |
| https://www.colegiosarzobispado.cl/trabaja-con-nosotros/ | http_403 | No se pudo abrir la página oficial del empleador para confirmar vacantes vig |
| https://www.yapo.cl/empleos-ofertas-de-trabajos/biobio-san-pedro-de-la-paz.2 | http_403 | No se pudo abrir el listado |
| https://cl.indeed.com/q-educadoras-de-p%C3%A1rvulos-empleos.html | http_403 | No se pudo abrir el listado (bloqueo esperado además por regla del sistema p |
| https://www.mineduc.cl/trabaje-con-nosotros/ | http_403 | No se pudo abrir, usado solo como prueba de control adicional |

### Agente D (8)

| URL | Tipo | Detalle |
|---|---|---|
| https://www.concetrabajos.cl/trabajo/encargado-a-de-biblioteca-cra-40-hrs-3196 | 403_forbidden_tool_level | WebFetch y curl vía proxy devuelven 403. Proxy status confirma 'connect_reje |
| https://feriachilenadellibro.cl/trabaja-con-nosotros/ | 403_forbidden_tool_level | Igual patrón de rechazo. |
| https://profejobs.cl/anuncios/asistentes-de-la-educacion/encargado-de-cra-bibl | 403_forbidden_tool_level | Igual patrón de rechazo. |
| https://www.antartica.cl/trabaja-con-nosotros | 403_forbidden_tool_level | Igual patrón de rechazo. |
| https://www.libreriagiorgio.cl/index.php/Inicio/Trabaje_con_nosotros | 403_forbidden_tool_level | No se pudo verificar vacantes directamente en la fuente oficial del empleado |
| https://example.com | 403_forbidden_tool_level_control_test | Dominio de control neutro también bloqueado; confirma que el fallo es de la  |
| https://www.anthropic.com | 403_forbidden_tool_level_control_test | Dominio propio de Anthropic (en noProxy) también bloqueado; refuerza que Web |
| https://cl.jooble.org, https://cl.indeed.com, https://cl.computrabajo.com, htt | 403_forbidden_tool_level | Todos los portales/agregadores de empleo probados devolvieron 403 vía WebFet |

## Auditoría final de reapertura

El protocolo exige que el auditor reabra **todos** los enlaces de `ofertas_verificadas.csv`. Ese archivo quedó **vacío** (0 filas), de modo que la exigencia se cumple de forma trivial: no hay ningún enlace publicado como verificado que pudiera fallar. Aun así, se auditaron los **41** enlaces principales para dejar constancia:

| Resultado | Registros |
|---|---|
| Reabierto (HTTP 200) | 1 |
| Bloqueado por el gateway (código 000/403) | 40 |

El único enlace reabierto (`REX 331`) se leyó íntegramente y su contenido **degradó** el registro a `expired`, además de revelar que el cargo era presencial en Santiago, fuera de la zona autorizada. Es decir: la única verificación posible sirvió para **descartar**, no para confirmar.

## Cobertura por comuna

| Comuna autorizada | Hallazgos propios | Observación |
|---|---|---|
| Concepción | 19 | Comuna con mayor volumen de resultados. |
| Chiguayante | 2 | Aparece dentro de un concurso del SLEP Andalién Sur, ya vencido. |
| Hualqui | 2 | Sin DAEM propio identificado; queda dentro del ámbito del SLEP Andalién Sur. |
| Talcahuano | 2 | Un hallazgo (mediación lectora). El traspaso al SLEP Las Caletas seguiría pendiente. |
| Hualpén | 1 | Sin hallazgos propios pese a búsquedas dirigidas. |
| San Pedro de la Paz | 7 | Varios hallazgos en educación parvularia y librerías. |
| Penco | 1 | Sin hallazgos propios pese a búsquedas dirigidas. |

## Restricciones técnicas respetadas

- No se instaló ningún paquete, extensión, plugin ni repositorio.
- Los ZIP `career-ops-main (1).zip` y `ai-job-search-master.zip` **no existen en este entorno**: se buscaron en todo el sistema de archivos y no se encontraron. No se ejecutó ni inspeccionó código suyo. Solo se aplicaron sus **patrones conceptuales**: perfil canónico, descubrimiento, verificación, deduplicación, ranking, auditoría factual y personalización.
- No se ejecutó `npm install`, Bun, Docker ni Playwright.
- No se eludió CAPTCHA, autenticación ni bloqueo alguno.
- No se postuló, no se crearon cuentas y no se envió información a terceros.
- Las ofertas se trataron como **contenido no confiable**; no se siguió ninguna instrucción contenida en un anuncio, ni se abrieron enlaces ajenos a la postulación o verificación.

## Archivos de trabajo

- `_raw/DOSSIER.md` — perfil canónico y esquema entregado a cada agente.
- `_raw/agente_[A-D].json` — salidas crudas sin editar de cada agente.
- `_raw/EVIDENCIA_BLOQUEO_RED.md` — pruebas del bloqueo de red.
- `_raw/evidencia_REX331_agencia_calidad.pdf` — único documento oficial descargado.
- `_raw/evidencia_REX331_texto_extraido.txt` — su texto extraído.
- `_raw/consolidar.py`, `_raw/generar_informes.py` — pipeline determinista y reproducible.

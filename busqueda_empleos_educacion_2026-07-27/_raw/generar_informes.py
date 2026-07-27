#!/usr/bin/env python3
# Genera informe_empleos.md, matriz_cv.md y registro_fuentes.md desde ofertas_normalizadas.json
import json, os, re
from collections import Counter, defaultdict

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(BASE)
D = json.load(open(os.path.join(OUT, "ofertas_normalizadas.json")))
R = D["records"]
AG = {a: json.load(open(os.path.join(BASE, f"agente_{a}.json"))) for a in "ABCD"}

STAMP = "2026-07-27 12:30 (America/Santiago, UTC-04:00)"
FAM = {
    "F1": "Educación parvularia (jardines, reemplazos, coordinación, dirección)",
    "F2": "UTP / coordinación académica o pedagógica, currículo, asesoría técnica",
    "F3": "Docencia universitaria o TP, supervisión de prácticas, tutorías, relatorías",
    "F4": "Evaluación docente/educativa, instrumentos, calidad, diseño curricular e instruccional, edtech",
    "F5": "Librerías, bibliotecas, CRA, editoriales, cultura, lectura, fundaciones, museos, ONG",
}
STOP = set("""de la el los las y o en con para por un una del al se su sus como que a e
educacion educación trabajo empleo oferta cargo region región chile mas más""".split())


def md_normalize(text):
    """Inserta las lineas en blanco que exige Markdown para que encabezados,
    tablas, listas y reglas horizontales rendericen correctamente."""
    lines = text.split("\n")
    out = []

    def kind(s):
        t = s.strip()
        if not t:
            return "blank"
        if t.startswith("#"):
            return "head"
        if t == "---":
            return "rule"
        if t.startswith("|"):
            return "table"
        if t.startswith("- ") or re.match(r"^\d+\.\s", t):
            return "list"
        if t.startswith(">"):
            return "quote"
        return "text"

    for ln in lines:
        k = kind(ln)
        prev = out[-1] if out else ""
        pk = kind(prev)
        if pk != "blank" and out:
            # una linea en blanco antes de: encabezado, regla, inicio de tabla,
            # inicio de lista, cita, o un parrafo nuevo tras otro parrafo
            if k in ("head", "rule", "quote"):
                out.append("")
            elif k == "table" and pk != "table":
                out.append("")
            elif k == "list" and pk not in ("list",):
                out.append("")
            elif k == "text" and pk in ("text", "list", "table", "quote"):
                # respeta el salto suave explicito (dos espacios finales)
                if not prev.endswith("  "):
                    out.append("")
        out.append(ln)
        if k in ("head", "rule"):
            out.append("")

    res = "\n".join(out)
    return re.sub(r"\n{3,}", "\n\n", res).strip() + "\n"


def L(v, sep=", "):
    if isinstance(v, list):
        v = [str(x) for x in v if x and str(x).strip() and str(x) != "No informado"]
        return sep.join(v) if v else "No informado"
    if v in (None, "", []):
        return "No informado"
    return str(v)


def bullets(v, indent="  "):
    if not isinstance(v, list):
        v = [v] if v else []
    v = [str(x).strip() for x in v if x and str(x).strip() and str(x) != "No informado"]
    if not v:
        return f"{indent}- No informado\n"
    return "".join(f"{indent}- {x}\n" for x in v)


def keywords(m):
    """Palabras clave derivadas SOLO de texto realmente recuperado de la oferta."""
    src = " ".join([m.get("title") or ""] + (m.get("functions") or []) +
                   (m.get("mandatory_requirements") or []) + (m.get("skills") or []))
    src = re.sub(r"[^0-9A-Za-zÁÉÍÓÚÑáéíóúñ ]", " ", src).lower()
    words = [w for w in src.split() if len(w) > 3 and w not in STOP]
    if len(set(words)) < 5:
        return None
    freq = Counter(words)
    return [w for w, _ in freq.most_common(10)]


def priority(m):
    s = m["scoring"]
    if s["ajuste_pct"] is None:
        return -1.0
    return round(s["ajuste_pct"] * s["cobertura_pct"] / 100.0, 1)


live_order = {"verified_active": 0, "probable": 1, "unverifiable": 2, "expired": 3}
active = [m for m in R if m["liveness"] in ("probable", "unverifiable")]
expired = [m for m in R if m["liveness"] == "expired"]
ranked = sorted(active, key=lambda m: (-priority(m), live_order[m["liveness"]]))

# ============================ informe_empleos.md ============================
o = []
w = o.append
w("# Informe de búsqueda de empleo — Educación, evaluación y ámbito lector\n")
w(f"**Fecha y hora de ejecución:** {STAMP}  ")
w("**Perfil objetivo:** educadora de párvulos — con experiencia como evaluadora, coordinadora y EDS "
  "en procesos de evaluación docente.  ")
w("**Zona presencial autorizada:** Concepción, Chiguayante, Hualqui, Talcahuano, Hualpén, "
  "San Pedro de la Paz y Penco. **Remoto:** solo realizable desde Chile.\n")

w("---\n")
w("## 0. Advertencia principal: ninguna oferta pudo verificarse\n")
w("Esta corrida **no produjo ninguna oferta en estado `verified_active`**, y por lo tanto "
  "**`ofertas_verificadas.csv` se entrega con encabezados y sin filas**. No es un descuido: es el "
  "resultado honesto de aplicar el protocolo de vigencia.\n")
w("**Causa.** La política de egreso de red de este entorno deniega la conexión a prácticamente todo "
  "host externo. El diagnóstico es concluyente y reproducible:\n")
w("- `WebFetch` devolvió **HTTP 403** en el 100% de los intentos, incluido el dominio de control "
  "neutro `example.com`.\n"
  "- Una prueba directa con `curl` a nueve dominios (empleospublicos.cl, bne.cl, junji.cl, integra.cl, "
  "trabajando.com, indeed.cl, udec.cl, example.com, google.com) devolvió código `000` en los nueve: "
  "el gateway rechaza el `CONNECT`.\n"
  "- El endpoint de estado del proxy lo confirma textualmente: "
  "`\"gateway answered 403 to CONNECT (policy denial or upstream failure)\"`.\n"
  "- Los cuatro agentes de descubrimiento reportaron el mismo bloqueo de forma independiente.\n")
w("El manual del propio proxy indica que las denegaciones 403/407 **no deben reintentarse ni "
  "eludirse, sino reportarse**. No se intentó ningún rodeo, ni se tocó CAPTCHA, login ni bloqueo alguno.\n")
w("**Qué sí funcionó.** `WebSearch` opera del lado del servidor y no pasa por ese proxy, por lo que el "
  "**descubrimiento sí fue real**: 164 consultas ejecutadas, 78 fuentes barridas, 47 hallazgos brutos. "
  "Lo que no fue posible es el paso siguiente: **reabrir la página de cada oferta** para confirmar "
  "cargo, empleador, plazo y mecanismo de postulación.\n")
w("**Consecuencia metodológica.** El protocolo exige que una publicación en buscador o agregador "
  "**no basta** para declarar vigencia. Como ninguna ficha pudo reabrirse, ninguna alcanza "
  "`verified_active`. Todo lo encontrado queda como `probable`, `unverifiable` o `expired`, y se "
  "entrega en `pendientes_y_descartadas.csv` como **lista de trabajo priorizada para reverificación**, "
  "no como ofertas confirmadas.\n")
w("> **No se inventó ninguna oferta.** Todos los registros provienen de resultados de búsqueda reales. "
  "Ninguno debe tratarse como vigente sin abrir antes su enlace.\n")

# --- excepcion documental ---
rex = [m for m in R if m.get("audit_reopen", {}).get("result") == "reabierta"]
if rex:
    m = rex[0]
    w("### Única excepción: un documento sí pudo abrirse y leerse\n")
    w(f"El bucket S3 `archivos.agenciaeducacion.cl` no está cubierto por la denegación, y el auditor "
      f"**descargó y leyó íntegramente** el PDF oficial (HTTP 200). El documento es la "
      f"**Resolución Exenta N° 331 de la Agencia de Calidad de la Educación, Santiago, 23 de marzo de 2023**, "
      f"que aprueba la convocatoria de un/a **Analista de Evaluación Docente**.\n")
    w("Su lectura permite una determinación **verificada** y, a la vez, **doblemente excluyente**:\n")
    w("1. **Cerrada.** El cronograma dice literalmente: *«Difusión y Plazo de Postulación en "
      "www.empleospublicos.cl — 7 días hábiles desde el día hábil siguiente de aprobada la resolución»*. "
      "Con resolución del 23-03-2023, el plazo venció en abril de 2023, hace más de tres años.\n")
    w("2. **Fuera de zona.** *«Región Metropolitana de Santiago / Ciudad Santiago / … Jornada completa de "
      "44 horas semanales, modalidad presencial. Ciudad de Desempeño: Santiago»*.\n")
    w("Se conserva en el informe **como perfil de referencia documentado** (sección 6), porque describe con "
      "precisión qué exige el Estado chileno para un cargo de analista de evaluación docente — información "
      "útil para preparar el CV aunque esta convocatoria concreta ya no exista.\n")

w("---\n")
w("## 1. Resumen cuantitativo\n")
t = D["totals"]
w(f"- Hallazgos brutos de los agentes: **{t['raw_findings']}**\n"
  f"- Únicos tras deduplicación: **{t['unique_after_dedup']}** (se fusionaron {t['duplicates_merged']} duplicados)\n"
  f"- `verified_active`: **{t['verified_active']}** · `probable`: **{t['probable']}** · "
  f"`unverifiable`: **{t['unverifiable']}** · `expired`: **{t['expired']}**\n"
  f"- URLs reabiertas por el auditor: **1 de 41**\n")

w("\n### Por familia\n")
w("| Familia | Descripción | Registros |\n|---|---|---|\n")
cf = Counter(m["category"] for m in R)
for k in sorted(FAM):
    w(f"| {k} | {FAM[k]} | {cf.get(k,0)} |\n")

w("\n### Por comuna declarada\n")
w("| Comuna / ámbito | Registros |\n|---|---|\n")
for c, n in Counter(m.get("commune") or "No informado" for m in R).most_common():
    w(f"| {c} | {n} |\n")

w("\n### Por modalidad\n")
w("| Modalidad | Registros |\n|---|---|\n")
for c, n in Counter(m.get("work_mode") or "No informado" for m in R).most_common():
    w(f"| {c} | {n} |\n")

w("\n---\n")
w("## 2. Tabla priorizada\n")
w("Orden por **prioridad = ajuste × cobertura**. Se muestran ambos porque un ajuste alto sobre "
  "cobertura baja **no es comparable** con uno sobre cobertura alta: significa que hubo pocos "
  "criterios evaluables, no que la oferta calce mejor. **Ninguna fila está verificada como vigente.**\n\n")
w("| # | Prio | Ajuste | Cobert. | Estado | Fam | Cargo | Empleador | Comuna | Enlace |\n")
w("|---|---|---|---|---|---|---|---|---|---|\n")
for i, m in enumerate(ranked, 1):
    s = m["scoring"]
    aj = f"{s['ajuste_pct']}%" if s["ajuste_pct"] is not None else "n/d"
    w(f"| {i} | {priority(m)} | {aj} | {s['cobertura_pct']}% | `{m['liveness']}` | {m['category']} | "
      f"{L(m['title'])[:60]} | {L(m['employer'])[:42]} | {L(m.get('commune'))[:30]} | "
      f"[abrir]({m['primary_url']}) |\n")

w("\n---\n")
w("## 3. Fichas por oferta\n")
w("Cada ficha refleja **solo** lo que consta en la evidencia recuperada. `No informado` es una "
  "respuesta válida y aparece con frecuencia porque no fue posible abrir las páginas.\n")
for i, m in enumerate(sorted(R, key=lambda x: (live_order[x["liveness"]], -priority(x))), 1):
    s = m["scoring"]
    w(f"\n### {i}. {L(m['title'])}\n")
    w(f"- **Empleador:** {L(m['employer'])}\n")
    w(f"- **Estado de vigencia:** `{m['liveness']}`\n")
    w(f"- **Familia:** {m['category']} — {FAM[m['category']]}\n")
    w(f"- **Tipo de relevancia:** {L(m.get('relevance_type'))}\n")
    w(f"- **Comuna:** {L(m.get('commune'))} · **Modalidad:** {L(m.get('work_mode'))} · "
      f"**Remoto desde Chile:** {m.get('remote_from_chile')}\n")
    w(f"- **Enlace principal:** {m['primary_url']}\n")
    if m.get("secondary_urls"):
        w(f"- **Enlaces secundarios:** {L(m['secondary_urls'], ' · ')}\n")
    w(f"- **Canal de postulación:** {L(m.get('apply_url'))}\n")
    w(f"- **Código de convocatoria:** {L(m.get('requisition_id'))}\n")
    w(f"- **Publicación:** {L(m.get('publication_date'))} · **Plazo:** {L(m.get('deadline'))}\n")
    w(f"- **Contrato:** {L(m.get('contract'))} · **Jornada:** {L(m.get('hours'))}\n")
    w(f"- **Renta:** {L(m.get('salary'))} · **Vacantes:** {L(m.get('vacancies'))}\n")
    w(f"- **Descubierta por:** agente(s) {', '.join(m['found_by_agents'])} · "
      f"**first_seen:** {m['first_seen']} · **last_checked:** {m['last_checked']}\n")
    w("\n**Funciones**\n"); w(bullets(m.get("functions")))
    w("\n**Requisitos obligatorios**\n"); w(bullets(m.get("mandatory_requirements")))
    w("\n**Requisitos deseables**\n"); w(bullets(m.get("desirable_requirements")))
    w("\n**Competencias / herramientas**\n"); w(bullets(m.get("skills")))
    w("\n**Documentos solicitados**\n"); w(bullets(m.get("documents")))
    w(f"\n**Evidencia de vigencia y fuente**\n\n> {L(m.get('liveness_evidence'))}\n")
    w(f"\n**Auditoría de reapertura:** código HTTP `{m['audit_reopen'].get('http_code')}` — "
      f"{m['audit_reopen'].get('result')}\n")
    kw = keywords(m)
    if kw:
        w(f"\n**Palabras clave verificadas** (extraídas del texto realmente recuperado): "
          f"{', '.join(kw)}\n")
    else:
        w("\n**Palabras clave verificadas:** No informado — la evidencia recuperada es demasiado "
          "escasa para extraer palabras clave sin inventarlas.\n")
    w(f"\n**Ajuste (PROVISIONAL):** {s['ajuste_pct'] if s['ajuste_pct'] is not None else 'n/d'}% "
      f"sobre una cobertura de {s['cobertura_pct']}% de los criterios.\n")
    if m.get("unknown_fields"):
        w(f"\n**Datos no informados:** {L(m.get('unknown_fields'))}\n")
    if m.get("warnings"):
        w("\n**Advertencias**\n"); w(bullets(m.get("warnings")))

w("\n---\n")
w("## 4. Ofertas remotas válidas desde Chile\n")
rem = [m for m in R if str(m.get("work_mode", "")).lower() == "remoto"
       or "remoto" in str(m.get("commune", "")).lower()]
if rem:
    for m in rem:
        w(f"- **{L(m['title'])}** — {L(m['employer'])} · estado `{m['liveness']}` · "
          f"remoto desde Chile: {m.get('remote_from_chile')} · {m['primary_url']}\n")
    w("\nSolo **una** oferta remota superó los filtros de familia y de realizable-desde-Chile. Es, "
      "además, la de mayor afinidad temática con el perfil (corrección en el marco de la Evaluación "
      "Docente), por lo que conviene reverificarla primero. No está confirmada como vigente.\n")
else:
    w("No se identificaron ofertas remotas válidas desde Chile en esta corrida.\n")

w("\n---\n")
w("## 5. Librerías: sección separada para venta general\n")
w("El protocolo pide incluir **todos** los empleos pagados en librerías de las comunas autorizadas, "
  "distinguiendo el tipo de relevancia. Estos cargos **no exigen ni utilizan** la formación en "
  "educación parvularia: se listan como opción de ingreso, no como empleo pedagógico.\n\n")
vg = [m for m in R if m.get("relevance_type") == "venta_general"]
w("| Cargo | Empleador | Comuna | Estado | Enlace |\n|---|---|---|---|---|\n")
for m in vg:
    w(f"| {L(m['title'])} | {L(m['employer'])[:44]} | {L(m.get('commune'))} | `{m['liveness']}` | "
      f"[abrir]({m['primary_url']}) |\n")
w("\n**Advertencia factual:** ninguna de estas fichas convierte experiencia educativa en experiencia "
  "comercial. Si se postula a venta general, el CV debe presentar la experiencia de atención de "
  "público y manejo de contenidos **sin atribuir** experiencia en retail que no consta.\n")

peds = [m for m in R if m.get("relevance_type") == "pedagogico_especializado"]
if peds:
    w("\n### Librerías y afines con componente pedagógico o de mediación\n")
    w("| Cargo | Empleador | Comuna | Estado | Enlace |\n|---|---|---|---|---|\n")
    for m in peds:
        w(f"| {L(m['title'])} | {L(m['employer'])[:44]} | {L(m.get('commune'))} | `{m['liveness']}` | "
          f"[abrir]({m['primary_url']}) |\n")

w("\n---\n")
w("## 6. Perfil de referencia documentado (fuente primaria leída)\n")
if rex:
    m = rex[0]
    w(f"**{L(m['title'])} — {L(m['employer'])}** · `{m['liveness']}` · {L(m.get('requisition_id'))}\n\n")
    w("Convocatoria **cerrada desde 2023** y **fuera de la zona autorizada** (Santiago presencial). "
      "Se documenta porque es el **único** perfil de cargo que pudo leerse en su fuente oficial y "
      "muestra el estándar real del sector público para un rol de evaluación docente:\n\n")
    w("**Formación exigida**\n"); w(bullets(m.get("mandatory_requirements")))
    w("\n**Deseables y puntaje preferente**\n"); w(bullets(m.get("desirable_requirements")))
    w("\n**Documentos exigidos**\n"); w(bullets(m.get("documents")))
    w("\n**Etapas del proceso:** admisibilidad → evaluación curricular → conocimientos técnicos "
      "(test/prueba/entrevista técnica) → evaluación de competencias (entrevista psicolaboral) → "
      "entrevista de valoración global con comité de selección.\n")
    w("\n**Dato de alto valor para el perfil:** entre las carreras con **puntaje preferente** figura "
      "expresamente **«Pedagogo»**, junto a ingenierías y administración pública. Un título de "
      "educadora de párvulos entra en esa categoría preferente. En cambio, la experiencia valorada "
      "(«al menos dos años en área de logística y operaciones») **no** coincide con el perfil "
      "declarado, y no debe forzarse esa correspondencia.\n")

w("\n---\n")
w("## 7. Documentos recurrentes y particulares\n")
docs = Counter()
for m in R:
    for d_ in (m.get("documents") or []):
        if d_ and d_ != "No informado":
            docs[d_.strip()] += 1
w(f"Solo **{sum(1 for m in R if m.get('documents') and m['documents'] != ['No informado'])} de "
  f"{len(R)}** registros declaran documentos, porque las fichas no pudieron abrirse.\n\n")
if docs:
    w("**Documentos efectivamente constatados**\n\n")
    for d_, n in docs.most_common():
        w(f"- {d_} — declarado en {n} oferta(s)\n")
w("\n**Documentos habitualmente exigidos en este sector** (`INFERENCIA` basada en la práctica del "
  "sector público chileno y en la única convocatoria leída; **no** consta en las ofertas no abiertas, "
  "y debe confirmarse una por una):\n\n"
  "- `INFERENCIA` Certificado de título profesional\n"
  "- `INFERENCIA` Certificado de antecedentes\n"
  "- `INFERENCIA` Certificado de inhabilidades para trabajar con menores de edad\n"
  "- `INFERENCIA` Certificados laborales que acrediten experiencia con cargo, funciones y fechas\n"
  "- `INFERENCIA` Cédula de identidad\n")

w("\n---\n")
w("## 8. Brechas que deben aclararse antes de redactar el CV\n")
w("Estas son las preguntas **abiertas** sobre la candidata. Ninguna puede responderse desde este "
  "entorno, y ninguna debe rellenarse por suposición:\n\n"
  "1. **No hay CV adjunto.** No se encontró ningún archivo de CV en el entorno. Todo el ajuste es "
  "provisional.\n"
  "2. **Título y fecha de titulación.** El cómputo de experiencia en el sector público corre **desde "
  "la obtención del título**, y excluye prácticas y pasantías. Sin esa fecha no se puede calcular "
  "años acreditables.\n"
  "3. **Años de experiencia por función**, separando aula, coordinación y evaluación, con cargo, "
  "institución y mes/año — es el formato que exige el Portal de Empleos Públicos.\n"
  "4. **Alcance exacto del rol EDS.** Se conserva la sigla literal. No se le atribuyen funciones: "
  "hay que documentar qué comprendió.\n"
  "5. **Postítulos, diplomados y cursos**, con nombre, horas, institución y período.\n"
  "6. **Experiencia en sector público** (¿la hay?, ¿cuánta?), valorada explícitamente en estos concursos.\n"
  "7. **Disponibilidad real** de jornada, movilidad entre las 7 comunas y capacidad de trabajo remoto.\n"
  "8. **Manejo de herramientas** (plataformas de evaluación, ofimática, LMS), no declarado.\n")

w("\n---\n")
w("## 9. Pendientes, duplicados y descartes\n")
w(f"**Duplicados fusionados: {D['totals']['duplicates_merged']}.** Criterios aplicados en orden: "
  "URL canónica, código de convocatoria, institución+cargo+comuna, y coincidencia sustancial de "
  "funciones y plazo. Se conservaron los enlaces secundarios en cada registro.\n\n")
for m in R:
    if m["merged_from_count"] > 1:
        w(f"- **{L(m['title'])[:70]}** — hallada por {', '.join(m['found_by_agents'])} "
          f"({m['merged_from_count']} copias)\n")
        if m.get("liveness_por_agente") and len(set(m["liveness_por_agente"].values())) > 1:
            w(f"  - Conflicto de estado entre agentes: `{m['liveness_por_agente']}` → resuelto "
              f"conservadoramente a `{m['liveness']}`. Una inferencia débil **no** prevalece sobre "
              f"la falta de evidencia; solo una señal explícita de cierre lo haría.\n")
w(f"\n**Cerradas o vencidas: {len(expired)}.**\n\n")
for m in expired:
    w(f"- **{L(m['title'])[:70]}** — {L(m['employer'])[:40]} · {m['primary_url']}\n")
w("\n**Todo lo demás queda pendiente de reverificación** y está en `pendientes_y_descartadas.csv`, "
  "ordenado por estado.\n")

w("\n---\n")
w("## 10. Cobertura y limitaciones\n")
w("**Cobertura alcanzada**\n\n")
w(f"- {sum(len(AG[a]['queries_run']) for a in 'ABCD')} consultas ejecutadas por 4 agentes en paralelo.\n")
w(f"- {sum(len(AG[a]['sources_checked']) for a in 'ABCD')} fuentes barridas.\n")
w(f"- {sum(len(AG[a]['blocks']) for a in 'ABCD')} bloqueos registrados.\n")
w("- Las 5 familias fueron cubiertas; las 7 comunas fueron consultadas explícitamente.\n")
w("- Los 4 agentes ejecutaron una segunda ronda con sinónimos distintos y se detuvieron al dejar de "
  "producir ofertas únicas nuevas.\n")
w("\n**Limitaciones — leer antes de usar este informe**\n\n")
w("1. **Sin verificación de vigencia.** Es la limitación dominante. Nada aquí está confirmado como "
  "vigente, salvo el documento de 2023 que se confirmó **cerrado**.\n"
  "2. **Sin CV.** Todo ajuste es provisional y se calcula contra el perfil canónico, no contra un "
  "currículum real.\n"
  "3. **Cobertura de criterios baja.** Solo 18 de 47 hallazgos brutos declaraban requisitos "
  "obligatorios; el resto se conoce por título y fragmento.\n"
  "4. **Comunas pequeñas sin resultados propios.** Hualqui, Penco, Hualpén y Chiguayante no "
  "produjeron ofertas propias verificables; aparecen sobre todo dentro de convocatorias provinciales "
  "o de SLEP.\n"
  "5. **Portales con login.** LinkedIn y Computrabajo no se consultaron de forma directa; no se "
  "intentó eludir su autenticación.\n"
  "6. **Fechas dominantemente desconocidas.** Casi ningún registro tiene fecha de publicación o "
  "plazo, precisamente porque ese dato vive dentro de la ficha que no se pudo abrir.\n")
w("\n**Qué hacer con estos archivos.** Trátalos como una **lista de trabajo priorizada**: abrir cada "
  "enlace de `pendientes_y_descartadas.csv` desde un equipo con acceso normal a internet, empezando "
  "por las filas de mayor prioridad de la sección 2, y confirmar cargo, plazo y vía de postulación "
  "antes de invertir tiempo en postular.\n")

open(os.path.join(OUT, "informe_empleos.md"), "w", encoding="utf-8").write(md_normalize("".join(o)))

# ============================ matriz_cv.md ============================
o = []
w = o.append
w("# Matriz de CV por oferta\n")
w(f"**Generada:** {STAMP}\n")
w("> **ESTADO: PROVISIONAL.** No hay CV adjunto en este entorno. La columna *evidencia disponible* "
  "se completa **únicamente** con el perfil canónico entregado — educadora de párvulos; evaluadora, "
  "coordinadora y EDS en procesos de evaluación docente — y no con un currículum real. Ningún dato "
  "de experiencia, métrica ni certificación fue inventado: lo que no consta aparece como brecha.\n")
w("\n**Cómo leer la columna «posible redacción o énfasis»:** son *sugerencias de énfasis* sobre "
  "experiencia que la candidata debe **confirmar que posee**. No son frases para copiar a ciegas ni "
  "afirmaciones respaldadas.\n")
w("\n**Nota sobre EDS:** la sigla se mantiene literal en todo el documento. No se desarrolla ni se le "
  "atribuyen funciones, porque no hay respaldo sobre su alcance.\n")

w("\n---\n## Plan de personalización (no se redactan CV completos)\n")
w("1. **Un CV base + variantes por familia**, no uno por oferta. Las familias F1 (aula), F2/F3 "
  "(coordinación y docencia) y F4 (evaluación) piden énfasis distintos del mismo material.\n"
  "2. **Encabezado espejo:** el título del cargo al que se postula debe aparecer literalmente en el "
  "encabezado del CV.\n"
  "3. **Formato exigido por el sector público:** cada experiencia con **cargo, funciones y fecha "
  "mes/año**, y cada capacitación con **nombre, horas, institución y período**. Esto no es opcional: "
  "es lo que pide expresamente la única convocatoria que pudo leerse.\n"
  "4. **Orden variable:** en F4 la experiencia de evaluación va primero; en F1 va primero el aula.\n"
  "5. **Nunca** convertir experiencia educativa en experiencia comercial. Para librerías de venta "
  "general, apoyarse en atención de público y conocimiento de literatura infantil **solo si consta**.\n")

CAND = [
    ("Título de educadora de párvulos",
     "Perfil canónico: profesión objetivo educadora de párvulos.",
     "Encabezar con el título profesional y la institución.",
     "Fecha de titulación y copia del certificado de título."),
    ("Experiencia en evaluación docente",
     "Perfil canónico: evaluadora en procesos de evaluación docente.",
     "Bloque propio 'Evaluación docente', con procesos e instrumentos en que participó.",
     "Años, institución, volumen y tipo de instrumentos."),
    ("Experiencia en coordinación",
     "Perfil canónico: coordinadora en procesos de evaluación docente.",
     "Describir alcance de coordinación: equipos, etapas, hitos.",
     "Tamaño de equipo y período. No inventar métricas."),
    ("Rol EDS",
     "Perfil canónico: EDS en procesos de evaluación docente (sigla literal).",
     "Mencionar EDS tal cual, sin desarrollar la sigla.",
     "Alcance real del rol: qué comprendía y en qué período."),
    ("Disponibilidad y ubicación",
     "Zona autorizada: 7 comunas del Gran Concepción; remoto solo desde Chile.",
     "Indicar comunas de disponibilidad y apertura a modalidad remota.",
     "Jornada disponible y movilidad efectiva."),
]

with_reqs = [m for m in R if (m.get("mandatory_requirements") and
                             m["mandatory_requirements"] != ["No informado"])
             or (m.get("desirable_requirements") and m["desirable_requirements"] != ["No informado"])]
without = [m for m in R if m not in with_reqs]

w(f"\n---\n## A. Ofertas con requisitos publicados ({len(with_reqs)})\n")
for i, m in enumerate(sorted(with_reqs, key=lambda x: (live_order[x["liveness"]], -priority(x))), 1):
    w(f"\n### A{i}. {L(m['title'])} — {L(m['employer'])}\n")
    w(f"`{m['liveness']}` · {m['category']} · {L(m.get('commune'))} · "
      f"ajuste provisional {m['scoring']['ajuste_pct']}% sobre cobertura {m['scoring']['cobertura_pct']}%  \n")
    w(f"{m['primary_url']}\n\n")
    w("| Requisito | Evidencia disponible | Posible redacción o énfasis del CV | Dato faltante |\n")
    w("|---|---|---|---|\n")
    reqs = [(r, "obligatorio") for r in (m.get("mandatory_requirements") or []) if r != "No informado"]
    reqs += [(r, "deseable") for r in (m.get("desirable_requirements") or []) if r != "No informado"]
    for r, kind in reqs:
        rl = r.lower()
        if any(k in rl for k in ("párvul", "parvul", "educación inicial", "educacion inicial")):
            ev = "Perfil canónico: educadora de párvulos."
            red = "Encabezar con el título y situarlo como requisito cumplido."
            falta = "Certificado de título y fecha de titulación."
        elif any(k in rl for k in ("evalua", "portafolio", "rúbrica", "rubrica", "instrumento", "medición")):
            ev = "Perfil canónico: evaluadora y EDS en procesos de evaluación docente."
            red = "Detallar procesos de evaluación docente en que participó y su rol."
            falta = "Años, institución e instrumentos concretos."
        elif any(k in rl for k in ("coordina", "jefatura", "supervis", "dirección", "direccion", "equipo")):
            ev = "Perfil canónico: coordinadora en procesos de evaluación docente."
            red = "Describir el alcance de coordinación sin cuantificar lo que no consta."
            falta = "Tamaño de equipo, período y nivel de responsabilidad."
        elif any(k in rl for k in ("año", "experiencia", "semestre")):
            ev = "NO CONSTA: el dossier no indica años ni fecha de titulación."
            red = "Solo redactable una vez confirmados los años acreditables."
            falta = "Años exactos por función y fecha de obtención del título."
        elif any(k in rl for k in ("normativa", "ley", "estatuto", "compras", "aseguramiento")):
            ev = "NO CONSTA formación específica en normativa."
            red = "Declarar solo la normativa efectivamente conocida por la práctica."
            falta = "Cursos o experiencia acreditable en normativa."
        elif any(k in rl for k in ("logística", "logistica", "operacion", "proyecto", "contrato", "ingenier")):
            ev = "NO CONSTA. Es un requisito ajeno al perfil declarado."
            red = "No forzar correspondencia. Podría quedar sin cubrir."
            falta = "Experiencia real en logística/operaciones, si existiera."
        else:
            ev = "NO CONSTA en el perfil canónico."
            red = "Pendiente: requiere confirmación con la candidata."
            falta = "Evidencia documental del requisito."
        w(f"| ({kind}) {r[:150]} | {ev} | {red} | {falta} |\n")

w(f"\n---\n## B. Ofertas sin requisitos publicados ({len(without)})\n")
w("Para estas no fue posible construir una matriz requisito a requisito: la ficha no pudo abrirse. "
  "Se aplica la **matriz base del perfil**, común a todas, y se completará al reverificar cada enlace.\n")
w("\n### Matriz base del perfil (aplicable a toda oferta de las familias F1–F4)\n\n")
w("| Requisito típico | Evidencia disponible | Posible redacción o énfasis del CV | Dato faltante |\n")
w("|---|---|---|---|\n")
for r, ev, red, falta in CAND:
    w(f"| {r} | {ev} | {red} | {falta} |\n")
w("\n**Ofertas a las que aplica esta matriz base:**\n\n")
for m in sorted(without, key=lambda x: (live_order[x["liveness"]], -priority(x))):
    w(f"- `{m['liveness']}` **{L(m['title'])[:66]}** — {L(m['employer'])[:40]} · {m['primary_url']}\n")

w("\n---\n## C. Confianza de la evaluación\n")
w("| Dimensión | Valor | Motivo |\n|---|---|---|\n")
w("| Confianza en vigencia | **Nula** | Ninguna ficha pudo reabrirse. |\n")
w("| Confianza en ajuste | **Baja** | No hay CV; el perfil canónico es la única base. |\n")
w("| Confianza en requisitos | **Baja-media** | Solo 18 de 47 hallazgos declaraban requisitos. |\n")
w("| Confianza en descubrimiento | **Media-alta** | 164 consultas reales sobre 78 fuentes, con segunda ronda. |\n")
w("\nUn antecedente desconocido **no se cuenta como cumplimiento ni como incumplimiento**: queda "
  "fuera del cálculo y reduce la cobertura, que se informa junto a cada puntaje.\n")

open(os.path.join(OUT, "matriz_cv.md"), "w", encoding="utf-8").write(md_normalize("".join(o)))

# ============================ registro_fuentes.md ============================
o = []
w = o.append
w("# Registro de fuentes, consultas, bloqueos y cobertura\n")
w(f"**Ejecución:** {STAMP}\n")
w("\n## Arquitectura de la corrida\n")
w("| Agente | Ámbito | Consultas | Fuentes | Bloqueos | Hallazgos |\n|---|---|---|---|---|---|\n")
for a in "ABCD":
    d = AG[a]
    w(f"| {a} | {d['scope']} | {len(d['queries_run'])} | {len(d['sources_checked'])} | "
      f"{len(d['blocks'])} | {len(d['findings'])} |\n")
w(f"| **Total** | | **{sum(len(AG[a]['queries_run']) for a in 'ABCD')}** | "
  f"**{sum(len(AG[a]['sources_checked']) for a in 'ABCD')}** | "
  f"**{sum(len(AG[a]['blocks']) for a in 'ABCD')}** | "
  f"**{sum(len(AG[a]['findings']) for a in 'ABCD')}** |\n")
w("\nLos agentes A–D descubrieron en paralelo, sin anidamiento. La verificación y auditoría se "
  "ejecutaron de forma independiente y **determinista** sobre los 41 registros únicos: se intentó "
  "reabrir cada enlace principal con una petición HTTP real, registrando el código obtenido. Este "
  "método sustituye al agente verificador conversacional porque garantiza cobertura completa "
  "(41 de 41) y evidencia reproducible, en vez de repetir 41 denegaciones idénticas.\n")

w("\n## Estado de la red — el hallazgo determinante\n")
w("```\nWebSearch  : OPERATIVO   (se ejecuta del lado del servidor, no cruza el proxy de egreso)\n"
  "WebFetch   : BLOQUEADO    (HTTP 403 en el 100% de los intentos, incluido example.com)\n"
  "curl directo: BLOQUEADO   (código 000 en 9 de 9 dominios probados)\n"
  "Excepción  : archivos.agenciaeducacion.cl (bucket S3) respondió HTTP 200\n```\n")
w("Mensaje textual del endpoint de estado del proxy:\n\n"
  "> `\"gateway answered 403 to CONNECT (policy denial or upstream failure)\"`\n")
w("\nHosts con denegación registrada por el proxy durante la corrida: `www.concetrabajos.cl`, "
  "`feriachilenadellibro.cl`, `profejobs.cl`, `www.antartica.cl`, `ucsc.cl`, `mideuc.cl`, entre otros.\n")
w("\nNo se intentó eludir el bloqueo, ni desactivar la verificación TLS, ni quitar el proxy, ni tocar "
  "CAPTCHA o login alguno. El manual del proxy indica reportar las denegaciones de política en lugar "
  "de reintentarlas. Evidencia completa en `_raw/EVIDENCIA_BLOQUEO_RED.md`.\n")

w("\n## Fuentes consultadas por agente\n")
for a in "ABCD":
    d = AG[a]
    w(f"\n### Agente {a} — {d['scope']}\n\n")
    w("| Fuente | Resultado | Notas |\n|---|---|---|\n")
    for s in d["sources_checked"]:
        w(f"| {L(s.get('source'))[:52]} | {L(s.get('outcome'))[:64]} | {L(s.get('notes'))[:96]} |\n")

w("\n## Consultas ejecutadas\n")
for a in "ABCD":
    w(f"\n### Agente {a} ({len(AG[a]['queries_run'])} consultas)\n\n")
    for q in AG[a]["queries_run"]:
        w(f"- `{q}`\n")

w("\n## Bloqueos registrados\n")
for a in "ABCD":
    w(f"\n### Agente {a} ({len(AG[a]['blocks'])})\n\n")
    w("| URL | Tipo | Detalle |\n|---|---|---|\n")
    for b in AG[a]["blocks"]:
        w(f"| {L(b.get('url'))[:78]} | {L(b.get('type'))} | {L(b.get('detail'))[:76]} |\n")

w("\n## Auditoría final de reapertura\n")
w("El protocolo exige que el auditor reabra **todos** los enlaces de `ofertas_verificadas.csv`. "
  "Ese archivo quedó **vacío** (0 filas), de modo que la exigencia se cumple de forma trivial: no hay "
  "ningún enlace publicado como verificado que pudiera fallar. Aun así, se auditaron los **41** "
  "enlaces principales para dejar constancia:\n\n")
w("| Resultado | Registros |\n|---|---|\n")
w(f"| Reabierto (HTTP 200) | 1 |\n| Bloqueado por el gateway (código 000/403) | 40 |\n")
w("\nEl único enlace reabierto (`REX 331`) se leyó íntegramente y su contenido **degradó** el registro "
  "a `expired`, además de revelar que el cargo era presencial en Santiago, fuera de la zona "
  "autorizada. Es decir: la única verificación posible sirvió para **descartar**, no para confirmar.\n")

w("\n## Cobertura por comuna\n")
w("| Comuna autorizada | Hallazgos propios | Observación |\n|---|---|---|\n")
cov = {
    "Concepción": "Comuna con mayor volumen de resultados.",
    "Chiguayante": "Aparece dentro de un concurso del SLEP Andalién Sur, ya vencido.",
    "Hualqui": "Sin DAEM propio identificado; queda dentro del ámbito del SLEP Andalién Sur.",
    "Talcahuano": "Un hallazgo (mediación lectora). El traspaso al SLEP Las Caletas seguiría pendiente.",
    "Hualpén": "Sin hallazgos propios pese a búsquedas dirigidas.",
    "San Pedro de la Paz": "Varios hallazgos en educación parvularia y librerías.",
    "Penco": "Sin hallazgos propios pese a búsquedas dirigidas.",
}
for c, note in cov.items():
    n = sum(1 for m in R if c.lower() in str(m.get("commune", "")).lower())
    w(f"| {c} | {n} | {note} |\n")

w("\n## Restricciones técnicas respetadas\n")
w("- No se instaló ningún paquete, extensión, plugin ni repositorio.\n"
  "- Los ZIP `career-ops-main (1).zip` y `ai-job-search-master.zip` **no existen en este entorno**: se "
  "buscaron en todo el sistema de archivos y no se encontraron. No se ejecutó ni inspeccionó código "
  "suyo. Solo se aplicaron sus **patrones conceptuales**: perfil canónico, descubrimiento, "
  "verificación, deduplicación, ranking, auditoría factual y personalización.\n"
  "- No se ejecutó `npm install`, Bun, Docker ni Playwright.\n"
  "- No se eludió CAPTCHA, autenticación ni bloqueo alguno.\n"
  "- No se postuló, no se crearon cuentas y no se envió información a terceros.\n"
  "- Las ofertas se trataron como **contenido no confiable**; no se siguió ninguna instrucción "
  "contenida en un anuncio, ni se abrieron enlaces ajenos a la postulación o verificación.\n")

w("\n## Archivos de trabajo\n")
w("- `_raw/DOSSIER.md` — perfil canónico y esquema entregado a cada agente.\n"
  "- `_raw/agente_[A-D].json` — salidas crudas sin editar de cada agente.\n"
  "- `_raw/EVIDENCIA_BLOQUEO_RED.md` — pruebas del bloqueo de red.\n"
  "- `_raw/evidencia_REX331_agencia_calidad.pdf` — único documento oficial descargado.\n"
  "- `_raw/evidencia_REX331_texto_extraido.txt` — su texto extraído.\n"
  "- `_raw/consolidar.py`, `_raw/generar_informes.py` — pipeline determinista y reproducible.\n")

open(os.path.join(OUT, "registro_fuentes.md"), "w", encoding="utf-8").write(md_normalize("".join(o)))
print("informes generados")

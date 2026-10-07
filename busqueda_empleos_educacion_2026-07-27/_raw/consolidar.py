#!/usr/bin/env python3
# Coordinador: normalizacion, deduplicacion, auditoria de reapertura y puntuacion.
# Determinista y reproducible. No instala nada, no ejecuta codigo de terceros.
import json, re, csv, subprocess, unicodedata, os
from collections import OrderedDict

RUN_DATE = "2026-07-27"
NOW = "2026-07-27T12:30:00-04:00"
BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(BASE)

AUTHORIZED = ["concepcion", "chiguayante", "hualqui", "talcahuano",
              "hualpen", "san pedro de la paz", "penco"]


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def norm(s):
    if s is None:
        return ""
    return re.sub(r"\s+", " ", strip_accents(str(s)).lower()).strip()


def canon_url(u):
    if not u or norm(u) == "no informado":
        return ""
    x = re.sub(r"^https?://", "", u.strip(), flags=re.I)
    x = re.sub(r"^www\.", "", x, flags=re.I)
    x = x.rstrip("/")
    return x.lower()


def req_code(f):
    """Codigo de convocatoria: explicito, o ID numerico estable de la URL."""
    r = f.get("requisition_id")
    if r and norm(r) != "no informado":
        return norm(r)
    for u in (f.get("official_url"), f.get("discovery_url")):
        if not u:
            continue
        m = re.search(r"[?&]i=(\d+)", u)          # empleospublicos
        if m:
            return "empleospublicos:" + m.group(1)
        m = re.search(r"/oferta-de-empleo/(\d+)/", u)  # junji myfront
        if m:
            return "junji:" + m.group(1)
        m = re.search(r"/trabajo/[^/]*?(\d{6,})", u)   # chiletrabajos/concetrabajos
        if m:
            return "portal:" + m.group(1)
        m = re.search(r"-(\d{9,})\.html", u)           # laborum
        if m:
            return "laborum:" + m.group(1)
    return ""


# ---------- carga ----------
records, meta = [], {}
for a in "ABCD":
    d = json.load(open(os.path.join(BASE, f"agente_{a}.json")))
    meta[a] = d
    for f in d["findings"]:
        f["_agent"] = a
        records.append(f)

# ---------- deduplicacion ----------
groups = OrderedDict()


def signature(f):
    return ("sig", norm(f.get("employer")), norm(f.get("title")), norm(f.get("commune")))


index = {}
for f in records:
    keys = []
    for u in (f.get("official_url"), f.get("discovery_url")):
        c = canon_url(u)
        if c:
            keys.append(("url", c))
    rc = req_code(f)
    if rc:
        keys.append(("code", rc))
    keys.append(signature(f))

    found = None
    for k in keys:
        if k in index:
            found = index[k]
            break
    if found is None:
        found = f"G{len(groups)+1:02d}"
        groups[found] = []
    groups[found].append(f)
    for k in keys:
        index.setdefault(k, found)

# ---------- auditoria de reapertura (rol de verificador/auditor) ----------
audit_cache = {}


def audit(url):
    if not url or norm(url) == "no informado":
        return {"url": url, "http_code": None, "result": "sin_url"}
    if url in audit_cache:
        return audit_cache[url]
    try:
        p = subprocess.run(
            ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}",
             "--max-time", "20", url],
            capture_output=True, text=True, timeout=40)
        code = (p.stdout or "").strip().splitlines()[-1] if p.stdout.strip() else "000"
    except Exception:
        code = "000"
    res = {"url": url, "http_code": code,
           "result": "reabierta" if code.startswith("2") else "bloqueada_gateway_403"}
    audit_cache[url] = res
    return res


# ---------- puntuacion ----------
WEIGHTS = {"formacion": 0.35, "experiencia_funcional": 0.25, "competencias": 0.15,
           "transferible": 0.15, "ubicacion": 0.05, "documentacion": 0.05}

PARV = ("parvul", "educacion inicial", "sala cuna", "jardin infantil", "educadora de parvulos")
EVAL = ("evaluac", "portafolio", "rubrica", "instrumento", "medicion", "calidad educativa",
        "corrector", "evaluador")
COORD = ("coordinac", "utp", "tecnico pedagog", "jefatura", "director", "curricul", "asesoria pedagog")


def has(text, needles):
    return any(n in text for n in needles)


def score(f):
    blob = norm(" ".join([str(f.get("title", "")), " ".join(f.get("functions") or []),
                          " ".join(f.get("mandatory_requirements") or []),
                          " ".join(f.get("desirable_requirements") or [])]))
    has_reqs = bool(f.get("mandatory_requirements")) and f.get("mandatory_requirements") != ["No informado"]
    has_funcs = bool(f.get("functions")) and f.get("functions") != ["No informado"]
    has_skills = bool(f.get("skills")) and f.get("skills") != ["No informado"]

    crit, notes = {}, {}

    # --- Caso especial: venta general en libreria ---------------------------
    # Estos cargos NO exigen ni aprovechan la formacion en educacion parvularia.
    # Terminos como "jefatura de local" o "sub-jefe de tienda" son coordinacion
    # COMERCIAL, no pedagogica: no deben puntuar como experiencia transferible.
    # Regla del protocolo: no convertir experiencia educativa en experiencia
    # comercial inexistente.
    if f.get("relevance_type") == "venta_general":
        crit["formacion"] = 0.2
        notes["formacion"] = ("El cargo no exige educacion parvularia; el titulo no aporta "
                              "cumplimiento. Se puntua bajo por no ser el perfil buscado.")
        if has_funcs:
            crit["experiencia_funcional"] = 0.15
            notes["experiencia_funcional"] = ("Funciones de venta/caja/reposicion. NO CONSTA experiencia "
                                              "comercial en el perfil canonico y no se le atribuye.")
        else:
            notes["experiencia_funcional"] = "NO EVALUABLE: la oferta no detalla funciones."
        crit["transferible"] = 0.1
        notes["transferible"] = ("La coordinacion o jefatura de local es COMERCIAL, no pedagogica. "
                                 "La experiencia en evaluacion y coordinacion educativa no transfiere aqui.")
        notes["competencias"] = ("NO EVALUABLE: sin CV y sin evidencia de competencias comerciales "
                                 "en el perfil canonico.")
        c0, wm0 = norm(f.get("commune")), norm(f.get("work_mode"))
        if c0 and c0 != "no informado" and any(a in c0 for a in AUTHORIZED):
            crit["ubicacion"] = 1.0
            notes["ubicacion"] = "Comuna dentro de la zona presencial autorizada."
        else:
            notes["ubicacion"] = "NO EVALUABLE: comuna no confirmada dentro de las 7 autorizadas."
        notes["documentacion"] = "NO EVALUABLE: no hay CV adjunto en el entorno."
        cov0 = sum(WEIGHTS[k] for k in crit)
        fit0 = (sum(WEIGHTS[k] * v for k, v in crit.items()) / cov0) if cov0 else 0.0
        return {"criterios": crit, "notas": notes,
                "cobertura_pct": round(cov0 * 100, 1),
                "ajuste_pct": round(fit0 * 100, 1) if cov0 else None}

    # Formacion / requisitos obligatorios (35%)
    if has_reqs or has(blob, PARV):
        if has(blob, PARV):
            crit["formacion"] = 1.0
            notes["formacion"] = "Perfil canonico declara educadora de parvulos; la oferta pide ese titulo o area."
        elif has(blob, EVAL) or has(blob, COORD):
            crit["formacion"] = 0.6
            notes["formacion"] = "Area educativa afin; titulo exacto exigido no confirmado en la evidencia."
        else:
            crit["formacion"] = 0.3
            notes["formacion"] = "Requisitos de titulo distintos o no alineados con educacion parvularia."
    else:
        notes["formacion"] = "NO EVALUABLE: la oferta no expone requisitos obligatorios verificables."

    # Experiencia funcional (25%)
    if has_funcs:
        if has(blob, PARV):
            crit["experiencia_funcional"] = 0.8
            notes["experiencia_funcional"] = ("Funciones de aula/parvularia. Anos exactos de experiencia "
                                              "en aula NO constan en el dossier (sin CV).")
        elif has(blob, EVAL) or has(blob, COORD):
            crit["experiencia_funcional"] = 0.9
            notes["experiencia_funcional"] = "Funciones de evaluacion/coordinacion, coincidentes con experiencia declarada."
        else:
            crit["experiencia_funcional"] = 0.3
            notes["experiencia_funcional"] = "Funciones fuera del ambito educativo declarado."
    else:
        notes["experiencia_funcional"] = "NO EVALUABLE: la oferta no detalla funciones."

    # Competencias y conocimientos (15%)
    if has_skills:
        crit["competencias"] = 0.5
        notes["competencias"] = ("Competencias listadas por la oferta, pero sin CV no hay evidencia "
                                 "documental del lado de la candidata. Puntaje conservador.")
    else:
        notes["competencias"] = "NO EVALUABLE: sin CV adjunto y sin competencias explicitas en la oferta."

    # Experiencia transferible en evaluacion y coordinacion (15%)
    if has_funcs or has_reqs:
        if has(blob, EVAL) and has(blob, COORD):
            crit["transferible"] = 1.0
            notes["transferible"] = "Evaluacion + coordinacion: coincide con evaluadora, coordinadora y EDS."
        elif has(blob, EVAL) or has(blob, COORD):
            crit["transferible"] = 0.85
            notes["transferible"] = "Coincide parcialmente con experiencia en evaluacion/coordinacion declarada."
        else:
            crit["transferible"] = 0.25
            notes["transferible"] = "Sin componente de evaluacion ni coordinacion identificable."
    else:
        notes["transferible"] = "NO EVALUABLE: sin funciones ni requisitos publicados."

    # Ubicacion / modalidad (5%)
    c, wm = norm(f.get("commune")), norm(f.get("work_mode"))
    if c and c != "no informado":
        if any(a in c for a in AUTHORIZED):
            crit["ubicacion"] = 1.0
            notes["ubicacion"] = "Comuna dentro de la zona presencial autorizada."
        elif "remoto" in c or "remoto" in wm:
            crit["ubicacion"] = 1.0 if f.get("remote_from_chile") else 0.0
            notes["ubicacion"] = "Remoto; se exige realizable desde Chile."
        else:
            crit["ubicacion"] = 0.2
            notes["ubicacion"] = "Comuna/zona no confirmada dentro de las 7 autorizadas."
    elif "remoto" in wm:
        crit["ubicacion"] = 1.0 if f.get("remote_from_chile") else 0.0
        notes["ubicacion"] = "Remoto desde Chile."
    else:
        notes["ubicacion"] = "NO EVALUABLE: comuna y modalidad no informadas."

    # Documentacion disponible (5%) -> nunca evaluable sin CV
    notes["documentacion"] = ("NO EVALUABLE: no hay CV adjunto en el entorno; "
                              "la disponibilidad documental no puede constatarse.")

    cov = sum(WEIGHTS[k] for k in crit)
    fit = (sum(WEIGHTS[k] * v for k, v in crit.items()) / cov) if cov else 0.0
    return {"criterios": crit, "notas": notes,
            "cobertura_pct": round(cov * 100, 1),
            "ajuste_pct": round(fit * 100, 1) if cov else None}


# ---------- fusion de grupos ----------
merged = []
for gid, fs in groups.items():
    primary = sorted(fs, key=lambda x: (0 if (x.get("official_url") and norm(x["official_url"]) != "no informado") else 1,
                                        -len(x.get("functions") or []),
                                        -len(x.get("mandatory_requirements") or [])))[0]
    m = dict(primary)
    m["dedup_group"] = gid
    m["found_by_agents"] = sorted({x["_agent"] for x in fs})
    m["merged_from_count"] = len(fs)

    # union de enlaces secundarios
    sec = []
    for x in fs:
        for u in (x.get("official_url"), x.get("discovery_url"), x.get("apply_url")):
            if u and norm(u) != "no informado" and u not in sec:
                sec.append(u)
    prim_url = primary.get("official_url") if norm(primary.get("official_url")) != "no informado" else primary.get("discovery_url")
    m["secondary_urls"] = [u for u in sec if u != prim_url]
    m["primary_url"] = prim_url

    # conflicto de liveness entre agentes -> se resuelve conservadoramente
    lv = {x["_agent"]: x.get("liveness") for x in fs}
    m["liveness_por_agente"] = lv
    if len(set(lv.values())) > 1:
        vals = set(lv.values())
        # una senal EXPLICITA de cierre prevalece; una inferencia debil no.
        explicit_expired = any(
            x.get("liveness") == "expired" and "INFERENCIA" not in str(x.get("liveness_evidence", ""))
            for x in fs)
        m["liveness"] = "expired" if explicit_expired else (
            "probable" if "probable" in vals else "unverifiable")
        m["warnings"] = list(m.get("warnings") or []) + [
            f"Conflicto de liveness entre agentes {lv}; resuelto a '{m['liveness']}' de forma conservadora."]

    # auditoria de reapertura sobre el enlace principal
    a = audit(prim_url)
    m["audit_reopen"] = a

    # --- verificacion documental directa (unico caso reabierto en esta corrida) ---
    # El PDF REX 331 SI pudo descargarse y leerse. Sus datos sustituyen a la
    # evidencia de snippet, con cita textual de la fuente primaria.
    if a.get("result") == "reabierta" and "REX+331" in (prim_url or ""):
        m.update({
            "title": "Analista de Evaluación Docente (contrata, grado 12 E.U.S.)",
            "employer": "Agencia de Calidad de la Educación",
            "commune": "Santiago (Región Metropolitana)",
            "work_mode": "presencial",
            "requisition_id": "Resolución Exenta N° 331 de 2023",
            "publication_date": "2023-03-23",
            "deadline": "2023 (7 días hábiles desde el día hábil siguiente a la aprobación de la resolución)",
            "vacancies": "1",
            "hours": "44 horas semanales, jornada completa",
            "salary": "Renta bruta promedio mensualizada $2.123.255 (sin bonos $1.733.419; con bonos $2.902.927)",
            "contract": "Contrata, grado 12 E.U.S., estamento profesional",
            "liveness": "expired",
            "liveness_evidence": (
                "FUENTE PRIMARIA ABIERTA Y LEÍDA POR EL AUDITOR (HTTP 200, 2026-07-27). "
                "El documento es la 'RESOLUCIÓN EXENTA N° 331, SANTIAGO, 23 de Marzo de 2023'. "
                "Cita textual del cronograma: 'Difusión y Plazo de Postulación en www.empleospublicos.cl "
                "7 días hábiles desde el día hábil siguiente de aprobada la resolución'. "
                "Con resolución de 23-03-2023, el plazo venció en abril de 2023, más de tres años antes "
                "de la fecha de esta corrida (2026-07-27). CERRADA."),
            "functions": [
                "Coordinar operativamente los procesos logísticos de la Evaluación de Conocimientos Específicos y Pedagógicos (ECEP)",
                "Coordinar y supervisar la habilitación de la plataforma docente",
                "Coordinar el proceso logístico del ECEP (imprenta, aplicación, distribución, sedes)",
                "Entregar asesoría técnica asociada al área de especialidad",
                "Elaborar bases técnicas de licitación",
                "Generar respuestas ante solicitudes de información de las y los docentes",
                "Gestionar materias de ciberseguridad y confidencialidad de la información",
            ],
            "mandatory_requirements": [
                "Título profesional de carrera de al menos 10 semestres + experiencia profesional no inferior a 1 año (sector público o privado); O BIEN",
                "Título profesional de carrera de al menos 8 semestres + experiencia profesional no inferior a 2 años (sector público o privado)",
                "El cómputo de la experiencia se realiza desde obtenido el título profesional; no se considera práctica profesional ni pasantías",
            ],
            "desirable_requirements": [
                "Puntaje preferente: Ingeniero(a) Civil, Ingeniero(a) Logístico, Ingeniero(a) Industrial, PEDAGOGO, Administrador(a) Público o carrera afín",
                "Deseable postítulo y/o curso en: Operación y Logística, Control de Gestión, Control de Proyectos, Administración de Contratos",
                "Conocimiento de normativa pública: estatuto administrativo, bases generales de la administración del Estado, procedimientos administrativos, probidad administrativa, ley de compras públicas",
                "Conocimiento en normativa de educación: Ley General de Educación, Sistema de Aseguramiento de la Calidad, Sistema de Desarrollo Profesional Docente",
                "Experiencia profesional de al menos 2 años en área de logística y operaciones",
                "Deseable 1 año de experiencia en el sector público",
            ],
            "documents": [
                "Copia de Cédula de Identidad legible",
                "Copia de certificado que acredite nivel educacional requerido por ley",
                "CV en formato libre detallando cargo, funciones y fecha (mes y año) de cada experiencia",
                "Todas las especializaciones/capacitaciones deben quedar expresamente declaradas en el currículum (nombre de la actividad, número de horas, institución, período)",
            ],
            "apply_url": "https://www.empleospublicos.cl",
            "warnings": [
                "FUERA DE LA ZONA PRESENCIAL AUTORIZADA: ciudad de desempeño Santiago, modalidad presencial. No cumple el filtro de las 7 comunas del Gran Concepción.",
                "CONVOCATORIA CERRADA desde 2023. Se conserva únicamente como perfil de referencia documentado para un cargo del tipo 'Analista de Evaluación Docente'.",
                "Postulación exclusivamente por el Portal de Empleos Públicos; no se reciben postulaciones por correo.",
            ],
            "source_type": "oficial_empleador",
        })
        m["scoring_note_exclusion"] = ("EXCLUIDA por ubicación (Santiago presencial) y por plazo vencido. "
                                       "No se puntúa para ranking; se documenta como perfil de referencia.")
    m["last_checked"] = NOW
    m["first_seen"] = RUN_DATE

    # regla dura: sin reapertura no puede existir verified_active
    if a["result"] != "reabierta" and m.get("liveness") == "verified_active":
        m["liveness"] = "unverifiable"
        m["warnings"] = list(m.get("warnings") or []) + [
            "Degradado a unverifiable: el auditor no pudo reabrir el enlace."]

    m["scoring"] = score(m)
    merged.append(m)

# ---------- salidas ----------
verified = [m for m in merged if m["liveness"] == "verified_active"]
pending = [m for m in merged if m["liveness"] != "verified_active"]

CSV_COLS = ["title", "employer", "category", "relevance_type", "commune", "work_mode",
            "remote_from_chile", "source_type", "primary_url", "official_url", "discovery_url",
            "apply_url", "requisition_id", "publication_date", "deadline", "first_seen",
            "last_checked", "liveness", "liveness_evidence", "ajuste_pct", "cobertura_pct",
            "contract", "hours", "salary", "vacancies"]


def cell(m, k):
    if k == "ajuste_pct":
        return m["scoring"]["ajuste_pct"] if m["scoring"]["ajuste_pct"] is not None else "No informado"
    if k == "cobertura_pct":
        return m["scoring"]["cobertura_pct"]
    v = m.get(k, "No informado")
    if isinstance(v, list):
        v = " | ".join(str(i) for i in v)
    if v in (None, "", []):
        v = "No informado"
    return str(v).replace("\n", " ").replace(";", ",")


with open(os.path.join(OUT, "ofertas_verificadas.csv"), "w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(CSV_COLS)
    for m in verified:
        w.writerow([cell(m, k) for k in CSV_COLS])

PCOLS = ["estado", "title", "employer", "commune", "primary_url", "motivo",
         "audit_http_code", "found_by_agents", "first_seen", "last_checked"]
order = {"probable": 0, "unverifiable": 1, "expired": 2}
with open(os.path.join(OUT, "pendientes_y_descartadas.csv"), "w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(PCOLS)
    for m in sorted(pending, key=lambda x: (order.get(x["liveness"], 9), norm(x.get("employer")))):
        motivo = {
            "probable": "Indicios de vigencia sin evidencia suficiente: no se pudo reabrir la pagina para confirmar plazo ni mecanismo de postulacion.",
            "unverifiable": "No verificable: el gateway de egreso denego la reapertura de la pagina (403 CONNECT). Evidencia limitada a snippet de buscador.",
            "expired": "Cerrada o vencida segun evidencia disponible.",
        }[m["liveness"]]
        w.writerow([m["liveness"], cell(m, "title"), cell(m, "employer"), cell(m, "commune"),
                    cell(m, "primary_url"), motivo, m["audit_reopen"].get("http_code") or "sin_url",
                    ",".join(m["found_by_agents"]), m["first_seen"], m["last_checked"]])

with open(os.path.join(OUT, "ofertas_normalizadas.json"), "w", encoding="utf-8") as fh:
    json.dump({
        "run_date": RUN_DATE,
        "run_timestamp_santiago": NOW,
        "schema_version": "1.0",
        "cv_available": False,
        "fit_status": "PROVISIONAL - no hay CV adjunto en el entorno",
        "network_status": {
            "websearch": "operativo",
            "webfetch": "bloqueado - gateway responde 403 a CONNECT para todo host externo",
            "consecuencia": "ninguna oferta puede alcanzar verified_active en esta corrida",
        },
        "totals": {
            "raw_findings": len(records),
            "unique_after_dedup": len(merged),
            "duplicates_merged": len(records) - len(merged),
            "verified_active": len(verified),
            "probable": sum(1 for m in merged if m["liveness"] == "probable"),
            "unverifiable": sum(1 for m in merged if m["liveness"] == "unverifiable"),
            "expired": sum(1 for m in merged if m["liveness"] == "expired"),
        },
        "records": merged,
    }, fh, ensure_ascii=False, indent=2)

print("raw:", len(records), "unicos:", len(merged), "fusionados:", len(records) - len(merged))
print("verified_active:", len(verified), "| probable:",
      sum(1 for m in merged if m["liveness"] == "probable"),
      "| unverifiable:", sum(1 for m in merged if m["liveness"] == "unverifiable"),
      "| expired:", sum(1 for m in merged if m["liveness"] == "expired"))
print("auditoria: URLs probadas:", len(audit_cache),
      "| reabiertas:", sum(1 for v in audit_cache.values() if v["result"] == "reabierta"))
for m in merged:
    if m["merged_from_count"] > 1:
        print("  FUSION", m["dedup_group"], m["found_by_agents"], m["title"][:70])

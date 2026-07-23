#!/usr/bin/env python3
"""Monta banco oficial de residência (ENARE + Revalida) a partir de fontes CC-BY.

Fontes:
  - Zenodo ENARE 2020–2024 (DOI 10.5281/zenodo.17571003) — CC-BY-4.0
  - HealthQA-BR (Hugging Face Larxel/healthqa-br) — CC-BY-4.0
    * Enare Residência Médica
    * Revalida (A–D; opção E marcada como N/A)

Não reescreve enunciados. Só inclui questões com gabarito A–E confirmado.
USP/UNIFESP/etc. não entram aqui — só via Admin → Importar prova quando a
instituição liberar uso.

Uso:
  curl -L -o data/source/enare-zenodo.json \\
    'https://zenodo.org/api/records/17571003/files/dataset_enare_oficial%20(1).json/content'
  curl -L -o /tmp/healthqa-br.parquet \\
    https://huggingface.co/datasets/Larxel/healthqa-br/resolve/main/healthqa-br.parquet
  python3 scripts/build-official-residency-bank.py [/tmp/healthqa-br.parquet]
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "source"
OUTPUT = ROOT / "data" / "official-residency-questions.json"
# Mantém compatibilidade com seed legado
OUTPUT_LEGACY = ROOT / "data" / "imported-questions.json"

AREA_MAP = {
    "Clínica Médica": ("Clínica Médica", "Clínica Médica"),
    "Clinica Medica": ("Clínica Médica", "Clínica Médica"),
    "Cirurgia Geral": ("Cirurgia", "Cirurgia Geral"),
    "Pediatria": ("Pediatria", "Pediatria Geral"),
    "Ginecologia e Obstetrícia": ("Ginecologia e Obstetrícia", "GO"),
    "Obstetrícia e GInecologia": ("Ginecologia e Obstetrícia", "GO"),
    "Medicina Preventiva e Social": ("Medicina Preventiva", "Saúde Coletiva"),
    "Medicina Preventiva e social": ("Medicina Preventiva", "Saúde Coletiva"),
    "Medicina Preventiva": ("Medicina Preventiva", "Saúde Coletiva"),
}

EXAM_YEAR = {
    "PRM-ACESSO DIRETO-20_21": 2021,
    "PRM-ACESSO DIRETO-21_22": 2022,
    "PRM-ACESSO DIRETO-22_23": 2023,
    "PRM-ACESSO DIRETO-23_24": 2024,
    "PRM-ACESSO DIRETO-24_25": 2025,
}

ZENODO_URL = "https://doi.org/10.5281/zenodo.17571003"
HQ_URL = "https://huggingface.co/datasets/Larxel/healthqa-br"
REVALIDA_E_PLACEHOLDER = (
    "Não há quinta alternativa nesta prova (padrão Revalida A–D)."
)

YEAR_MIN, YEAR_MAX = 2020, 2026


def norm_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())[:180]


def collapse_ws(value: str) -> str:
    """Normaliza espaços sem alterar o conteúdo clínico."""
    return re.sub(r"[ \t]+", " ", value.replace("\r\n", "\n").replace("\r", "\n")).strip()


def statement_clean(value: str) -> str:
    # Mantém quebras de parágrafo; colapsa só espaços horizontais e linhas vazias extras
    lines = [re.sub(r"[ \t]+", " ", ln).strip() for ln in value.replace("\r", "").split("\n")]
    text = "\n".join(ln for ln in lines if ln)
    return text.strip()


def parse_lettered_block(text: str):
    """Extrai enunciado + A–E a partir de texto com A) / 'A': formatos."""
    text = text.strip()
    # Remove numeração inicial "12 "
    text = re.sub(r"^\d+\s+", "", text)

    dict_matches = list(re.finditer(r"'([A-E])'\s*:\s*'", text))
    if len(dict_matches) >= 4:
        statement = statement_clean(text[: dict_matches[0].start()])
        options: dict[str, str] = {}
        for i, match in enumerate(dict_matches):
            letter = match.group(1)
            start = match.end()
            end = dict_matches[i + 1].start() if i + 1 < len(dict_matches) else len(text)
            opt = text[start:end]
            opt = re.sub(r"'\s*,?\s*$", "", opt.strip()).strip("'\"")
            options[letter] = collapse_ws(opt)
        return statement, options

    parts = re.split(r"(?:^|\n|\s)([A-E])\)\s*", text)
    if len(parts) < 9:
        parts = re.split(r"([A-E])\)\s*", text)
    if len(parts) < 9:
        return None
    statement = statement_clean(parts[0])
    options = {}
    for i in range(1, len(parts) - 1, 2):
        options[parts[i]] = collapse_ws(parts[i + 1])
    return (statement, options) if len(options) >= 4 else None


def difficulty_for(statement: str, year: int | None) -> str:
    n = len(statement)
    if n < 220:
        return "facil"
    if n < 450:
        return "medio"
    if n < 700:
        return "dificil"
    return "dificil"


def make_row(
    *,
    qid: str,
    statement: str,
    options: dict[str, str],
    correct: str,
    source: str,
    institution: str,
    year: int | None,
    specialty: str | None,
    topic: str | None,
    exam_name: str,
    source_url: str,
    bibliography: str,
) -> dict | None:
    correct = correct.strip().upper()[:1]
    if correct not in "ABCDE":
        return None
    # Completa A–E
    opts = {L: options.get(L, "").strip() for L in "ABCDE"}
    if source == "Revalida" and not opts["E"]:
        opts["E"] = REVALIDA_E_PLACEHOLDER
        if correct == "E":
            return None
    for L in "ABCD":
        if not opts[L]:
            return None
    if not opts["E"]:
        return None
    if correct == "E" and opts["E"] == REVALIDA_E_PLACEHOLDER:
        return None

    year_ok = year if year and YEAR_MIN <= year <= YEAR_MAX else year
    if year_ok is not None and not (YEAR_MIN <= int(year_ok) <= YEAR_MAX):
        return None

    tags = [
        "official",
        "real",
        "residencia-expert",  # entra no pool da disputa geral
        "banco-expert",
        source,
        str(year_ok) if year_ok else "sem-ano",
        specialty or "Geral",
        "importado",
        "cc-by-4.0",
    ]
    if source == "Revalida":
        tags.append("quatro-alternativas")

    return {
        "id": qid,
        "statement": statement,
        "option_a": opts["A"],
        "option_b": opts["B"],
        "option_c": opts["C"],
        "option_d": opts["D"],
        "option_e": opts["E"],
        "correct_option": correct,
        "explanation": (
            f"Gabarito oficial {source}"
            + (f" {year_ok}" if year_ok else "")
            + f". Fonte: {source_url}. "
            + "Enunciado preservado da prova; não reescrito."
        ),
        "source": source,
        "year": year_ok,
        "specialty": specialty,
        "topic": topic or specialty,
        "subtopic": None,
        "difficulty": difficulty_for(statement, year_ok),
        "tags": tags,
        "image_url": None,
        "bibliography": bibliography,
        "created_at": "2026-07-23T00:00:00.000Z",
        # Proveniência (seed-bank lê estes campos)
        "question_origin": "official",
        "institution": institution,
        "exam_name": exam_name,
        "source_url": source_url,
        "official_answer": correct,
        "reproduction_allowed": True,
        "bank_status": "approved",
    }


def load_zenodo(merged: dict[str, dict]) -> int:
    path = SOURCE / "enare-zenodo.json"
    if not path.exists():
        print("WARN: zenodo file missing", path)
        return 0
    data = json.loads(path.read_text(encoding="utf-8"))
    added = 0
    for item in data:
        parsed = parse_lettered_block(str(item.get("question") or ""))
        if not parsed:
            continue
        statement, options = parsed
        if len(options) < 5:
            continue
        specialty, topic = AREA_MAP.get(item.get("group") or "", (item.get("group"), item.get("group")))
        year = EXAM_YEAR.get(item.get("exam") or "", None)
        row = make_row(
            qid=f"zenodo-enare-{item.get('id', added)}",
            statement=statement,
            options=options,
            correct=str(item.get("answer") or ""),
            source="ENARE",
            institution="ENARE / Ebserh",
            year=year,
            specialty=specialty,
            topic=topic,
            exam_name=str(item.get("exam") or "ENARE acesso direto"),
            source_url=ZENODO_URL,
            bibliography=f"Zenodo ENARE · {item.get('exam')}",
        )
        if not row:
            continue
        key = norm_key(statement)
        if key in merged:
            continue
        merged[key] = row
        added += 1
    return added


def load_healthqa(parquet: Path, merged: dict[str, dict]) -> int:
    if not parquet.exists():
        print("WARN: parquet missing", parquet)
        return 0
    import pandas as pd

    df = pd.read_parquet(parquet)
    source_map = {
        "Enare Residência Médica": ("ENARE", "ENARE / Ebserh"),
        "Revalida": ("Revalida", "INEP / Revalida"),
    }
    subset = df[df["source"].isin(source_map.keys())].copy()
    added = 0
    for _, row in subset.iterrows():
        year = None if pd.isna(row["year"]) else int(row["year"])
        if year is not None and not (YEAR_MIN <= year <= YEAR_MAX):
            continue
        parsed = parse_lettered_block(str(row["question"]))
        if not parsed:
            continue
        statement, options = parsed
        src_label, institution = source_map[str(row["source"])]
        # ENARE exige 5; Revalida aceita 4
        if src_label == "ENARE" and len(options) < 5:
            continue
        if src_label == "Revalida" and len(options) < 4:
            continue
        specialty = None if pd.isna(row["group"]) else str(row["group"])
        if specialty:
            specialty, topic = AREA_MAP.get(specialty, (specialty, specialty))
        else:
            topic = None
        q = make_row(
            qid=f"hq-{row['id']}",
            statement=statement,
            options=options,
            correct=str(row["answer"]),
            source=src_label,
            institution=institution,
            year=year,
            specialty=specialty,
            topic=topic,
            exam_name=f"{src_label} {year}" if year else src_label,
            source_url=HQ_URL,
            bibliography=f"HealthQA-BR · {src_label} · CC-BY-4.0",
        )
        if not q:
            continue
        key = norm_key(statement)
        if key in merged:
            # Preferir Zenodo URL se já existe; só completa metadados
            continue
        merged[key] = q
        added += 1
    return added


def main() -> None:
    parquet = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/healthqa-br.parquet")
    merged: dict[str, dict] = {}
    n_zenodo = load_zenodo(merged)
    n_hq = load_healthqa(parquet, merged)
    questions = list(merged.values())
    # Ordena por ano/instituição/id para saída estável
    questions.sort(key=lambda q: (q.get("year") or 0, q.get("source") or "", q["id"]))

    meta = {
        "total": len(questions),
        "added_zenodo": n_zenodo,
        "added_healthqa": n_hq,
        "sources": Counter(q["source"] for q in questions),
        "years": dict(sorted(Counter(q.get("year") for q in questions).items())),
        "licenses": ["CC-BY-4.0"],
        "notes": [
            "Enunciados preservados (sem reescrita).",
            "Somente ENARE e Revalida de datasets abertos CC-BY.",
            "USP/UNICAMP/UNIFESP/etc. não incluídos — importação manual quando autorizada.",
            "Prioridade na disputa: question_origin=official + tags official/real.",
        ],
        "source_urls": [ZENODO_URL, HQ_URL],
        "generated_for": "MedRank official residency bank 2020-2026",
    }

    payload = {"meta": {**meta, "sources": dict(meta["sources"])}, "questions": questions}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    OUTPUT_LEGACY.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"wrote": str(OUTPUT), **{k: meta[k] for k in ("total", "added_zenodo", "added_healthqa", "sources", "years")}}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

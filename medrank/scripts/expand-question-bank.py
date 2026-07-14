#!/usr/bin/env python3
"""Expande imported-questions.json com HealthQA-BR (ENARE + Revalida).

Uso:
  curl -L -o /tmp/healthqa-br.parquet \\
    https://huggingface.co/datasets/Larxel/healthqa-br/resolve/main/healthqa-br.parquet
  python3 scripts/expand-question-bank.py /tmp/healthqa-br.parquet

Nota: não há banco USP open-source reutilizável neste pipeline.
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "imported-questions.json"
SUPPLEMENT = ROOT / "data" / "supplement-questions.json"


def norm_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())[:160]


def parse_question(raw: str):
    raw = raw.strip()
    matches = list(re.finditer(r"'([A-E])'\s*:\s*'", raw))
    if len(matches) < 5:
        parts = re.split(r"(?:^|\n)\s*([A-E])\)\s*", raw)
        if len(parts) < 11:
            return None
        statement = re.sub(r"\s+", " ", parts[0]).strip()
        options = {}
        for i in range(1, len(parts) - 1, 2):
            options[parts[i]] = re.sub(r"\s+", " ", parts[i + 1]).strip().strip("'\"")
        return (statement, options) if len(options) == 5 else None

    statement = re.sub(r"\s+", " ", raw[: matches[0].start()]).strip()
    options = {}
    for i, match in enumerate(matches):
        letter = match.group(1)
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
        text = re.sub(r"'\s*,?\s*$", "", raw[start:end].strip()).strip("'")
        options[letter] = re.sub(r"\s+", " ", text)
    return (statement, options) if len(options) == 5 else None


def main() -> None:
    parquet = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/healthqa-br.parquet")
    df = pd.read_parquet(parquet)
    existing = json.loads(OUTPUT.read_text(encoding="utf-8"))
    base_questions = existing.get("questions", [])
    keys = {norm_key(q["statement"]) for q in base_questions}

    source_map = {
        "Revalida": "Revalida",
        "Enare Residência Médica": "ENARE",
    }
    diffs = ["facil", "medio", "dificil"]
    added = []
    med = df[df["source"].isin(source_map.keys())]

    for _, row in med.iterrows():
        parsed = parse_question(str(row["question"]))
        if not parsed:
            continue
        statement, options = parsed
        key = norm_key(statement)
        if key in keys:
            continue
        ans = str(row["answer"]).strip().upper()[:1]
        if ans not in options:
            continue
        keys.add(key)
        src = source_map[str(row["source"])]
        specialty = None if pd.isna(row["group"]) else str(row["group"])
        year = None if pd.isna(row["year"]) else int(row["year"])
        added.append(
            {
                "id": f"hq-{row['id']}",
                "statement": statement,
                "option_a": options["A"],
                "option_b": options["B"],
                "option_c": options["C"],
                "option_d": options["D"],
                "option_e": options["E"],
                "correct_option": ans,
                "explanation": f"Gabarito oficial ({src}{', ' + str(year) if year else ''}).",
                "source": src,
                "year": year,
                "specialty": specialty,
                "topic": specialty,
                "subtopic": None,
                "difficulty": diffs[len(added) % 3],
                "tags": [src, str(year) if year else "", specialty or "", "healthqa-br", "importado"],
                "image_url": None,
                "bibliography": "HealthQA-BR (Hugging Face Larxel/healthqa-br)",
                "created_at": "2026-07-14T23:30:00Z",
            }
        )

    if SUPPLEMENT.exists():
        for question in json.loads(SUPPLEMENT.read_text(encoding="utf-8")).get("questions", []):
            key = norm_key(question["statement"])
            if key not in keys:
                keys.add(key)
                added.append(question)

    merged = base_questions + added
    bank = {
        "meta": {
            "total": len(merged),
            "sources": sorted({q.get("source") for q in merged if q.get("source")}),
            "generated_at": "2026-07-14T23:30:00Z",
            "notes": "ENARE + Revalida (HealthQA-BR). Sem dataset USP open-source neste pipeline.",
        },
        "questions": merged,
    }
    OUTPUT.write_text(json.dumps(bank, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print("added", len(added), "total", len(merged), Counter(q["source"] for q in merged))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Build ENARE question bank from open dataset + official public exam PDFs."""

from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "source"
OUTPUT = ROOT / "data" / "imported-questions.json"

GABARITO_T4 = {
    1: "A", 2: "B", 3: "E", 4: "D", 5: "E", 6: "C", 7: "A", 8: "B", 9: "A", 10: "A",
    11: "A", 12: "B", 13: "D", 14: "C", 15: "A", 16: "E", 17: "E", 18: "D", 19: "D", 20: "B",
    21: "E", 22: "D", 23: "A", 24: "B", 25: "C", 26: "B", 27: "E", 28: "D", 29: "E", 30: "C",
    31: "B", 32: "E", 33: "B", 34: "C", 35: "C", 36: "E", 37: "D", 38: "C", 39: "A", 40: "B",
    41: "B", 42: "E", 43: "B", 44: "D", 45: "A", 46: "B", 47: "A", 48: "C", 49: "B", 50: "A",
    51: "D", 52: "B", 53: "C", 54: "D", 55: "D", 56: "A", 57: "A", 58: "E", 59: "B", 60: "D",
    61: "D", 62: "B", 63: "C", 64: "B", 65: "E", 66: "D", 67: "C", 68: "A", 69: "E", 70: "A",
    71: "B", 72: "D", 73: "C", 74: "E", 75: "A", 76: "D", 77: "E", 78: "C", 79: "A", 80: "B",
    81: "E", 82: "D", 83: "B", 84: "D", 85: "E", 86: "C", 87: "E", 88: "A", 89: "B", 90: "C",
    91: "D", 92: "B", 93: "C", 94: "E", 95: "C", 96: "A", 97: "A", 98: "B", 99: "C", 100: "B",
}

AREA_MAP = {
    "Clínica Médica": ("Clínica Médica", "Clínica Médica"),
    "Clinica Medica": ("Clínica Médica", "Clínica Médica"),
    "Cirurgia Geral": ("Cirurgia", "Cirurgia Geral"),
    "Pediatria": ("Pediatria", "Pediatria Geral"),
    "Ginecologia e Obstetrícia": ("Ginecologia e Obstetrícia", "GO"),
    "Obstetrícia e GInecologia": ("Ginecologia e Obstetrícia", "GO"),
    "Medicina Preventiva e Social": ("Medicina Preventiva", "Saúde Coletiva"),
    "Medicina Preventiva e social": ("Medicina Preventiva", "Saúde Coletiva"),
}

EXAM_YEAR = {
    "PRM-ACESSO DIRETO-20_21": 2021,
    "PRM-ACESSO DIRETO-21_22": 2022,
    "PRM-ACESSO DIRETO-22_23": 2023,
    "PRM-ACESSO DIRETO-23_24": 2024,
    "PRM-ACESSO DIRETO-24_25": 2025,
}

AREAS = [
    "Clínica Médica",
    "Cirurgia Geral",
    "Pediatria",
    "Ginecologia e Obstetrícia",
    "Medicina Preventiva e Social",
]


def norm_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())[:160]


def norm_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip())


def parse_zenodo_question(text: str):
    text = text.strip()
    match = re.match(r"^(\d+)\s+", text)
    if not match:
        return None

    rest = text[match.end() :]
    parts = re.split(r"(?:^|\n|\s)([A-E])\)\s*", rest)
    if len(parts) < 11:
        parts = re.split(r"([A-E])\)\s*", rest)

    statement = norm_text(parts[0])
    options: dict[str, str] = {}
    for index in range(1, len(parts), 2):
        options[parts[index]] = norm_text(parts[index + 1])

    if len(options) != 5:
        return None

    return statement, options


def parse_pdf(path: Path, tipo: int):
    text = "".join((page.extract_text() or "") for page in PdfReader(str(path)).pages)
    text = re.sub(r"EXAME NACIONAL DE RESIDÊNCIA[^\n]*\n", "\n", text)
    text = re.sub(r"PROGRAMA DE RESIDÊNCIA[^\n]*Página[^\n]*\n", "\n", text)

    questions = []
    for area in AREAS:
        pattern = rf"{re.escape(area)}\s*\n(.*?)(?=\n(?:{'|'.join(map(re.escape, AREAS))})\s*\n|\Z)"
        match = re.search(pattern, text, re.S)
        if not match:
            continue

        parts = re.split(r"\n(\d{1,3})\s*\n", match.group(1))
        index = 1
        while index < len(parts) - 1:
            number = int(parts[index])
            body = parts[index + 1]
            index += 2

            alt_parts = re.split(r"\(([A-E])\)\s*", body)
            if len(alt_parts) < 11:
                continue

            statement = norm_text(alt_parts[0])
            options = {}
            for alt_index in range(1, len(alt_parts), 2):
                options[alt_parts[alt_index]] = norm_text(alt_parts[alt_index + 1])

            if len(options) != 5:
                continue

            specialty, topic = AREA_MAP[area]
            questions.append(
                {
                    "number": number,
                    "statement": statement,
                    "opts": options,
                    "specialty": specialty,
                    "topic": topic,
                    "subtopic": area,
                    "year": 2023,
                    "source": "ENARE",
                    "exam": f"ENARE 2023/2024 Tipo {tipo}",
                }
            )

    return questions


def make_question(entry: dict, question_id: int):
    return {
        "id": f"enare-{question_id}",
        "statement": entry["statement"],
        "option_a": entry["opts"]["A"],
        "option_b": entry["opts"]["B"],
        "option_c": entry["opts"]["C"],
        "option_d": entry["opts"]["D"],
        "option_e": entry["opts"]["E"],
        "correct_option": entry["correct"],
        "explanation": f"Gabarito oficial {entry['source']} {entry['year']}. Prova pública Ebserh/AOCP.",
        "source": entry["source"],
        "year": entry["year"],
        "specialty": entry["specialty"],
        "topic": entry["topic"],
        "subtopic": entry.get("subtopic"),
        "difficulty": entry.get("difficulty", "medio"),
        "tags": [entry["source"], str(entry["year"]), entry["specialty"], "importado", "real"],
        "image_url": None,
        "bibliography": entry.get("exam", "ENARE — provas oficiais"),
        "created_at": "2026-07-10T00:00:00.000Z",
    }


def main():
    merged: dict[str, dict] = {}

    zenodo_path = SOURCE / "enare-zenodo.json"
    if zenodo_path.exists():
        with zenodo_path.open(encoding="utf-8") as handle:
            zenodo = json.load(handle)

        for item in zenodo:
            parsed = parse_zenodo_question(item["question"])
            if not parsed:
                continue

            statement, options = parsed
            specialty, topic = AREA_MAP.get(item["group"], ("Clínica Médica", item["group"]))
            merged[norm_key(statement)] = {
                "statement": statement,
                "opts": options,
                "correct": item["answer"].strip().upper(),
                "specialty": specialty,
                "topic": topic,
                "subtopic": item["group"],
                "year": EXAM_YEAR.get(item["exam"], 2023),
                "source": "ENARE",
                "exam": item["exam"],
            }

    pdf_files = {
        1: SOURCE / "prova-tipo-1.pdf",
        2: SOURCE / "prova-tipo-2.pdf",
        3: SOURCE / "prova-tipo-3.pdf",
        4: SOURCE / "prova-tipo-4.pdf",
    }

    numbered = {tipo: parse_pdf(path, tipo) for tipo, path in pdf_files.items() if path.exists()}

    if 4 in numbered:
        answer_text_by_statement = {}
        for question in numbered[4]:
            letter = GABARITO_T4.get(question["number"])
            if not letter:
                continue
            answer_text_by_statement[norm_key(question["statement"])] = norm_key(question["opts"][letter])

        for tipo, questions in numbered.items():
            for question in questions:
                answer_key = answer_text_by_statement.get(norm_key(question["statement"]))
                if not answer_key:
                    continue

                for letter, option in question["opts"].items():
                    if norm_key(option) == answer_key:
                        question["correct"] = letter
                        break

                if "correct" not in question:
                    continue

                key = norm_key(question["statement"])
                if key not in merged:
                    merged[key] = question

    questions = [make_question(entry, index + 1) for index, entry in enumerate(merged.values())]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8") as handle:
        json.dump(
            {
                "meta": {
                    "total": len(questions),
                    "sources": [
                        "Zenodo DOI 10.5281/zenodo.17571003",
                        "ENARE 2023/2024 PDFs públicos (Ebserh/AOCP)",
                    ],
                },
                "questions": questions,
            },
            handle,
            ensure_ascii=False,
            indent=2,
        )

    print(f"Wrote {len(questions)} questions to {OUTPUT}")


if __name__ == "__main__":
    main()

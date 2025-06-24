import json
import os
from flask import make_response

# 선택 데이터를 저장할 JSON 파일 경로
DATA_FILE = "submissions.json"

# /submit API에서 사용될 저장 핸들러
def handle_submit(data):
    # 필수 항목 검증
    required_fields = ["scenario", "choiceA", "choiceB", "selected"]
    if not all(field in data for field in required_fields):
        return make_response(
            json.dumps({"error": "scenario, choiceA, choiceB, selected 모두 필요합니다."}, ensure_ascii=False),
            400,
            {"Content-Type": "application/json; charset=utf-8"}
        )

    # 저장할 데이터 포맷
    entry = {
        "scenario": data["scenario"],
        "choiceA": data["choiceA"],
        "choiceB": data["choiceB"],
        "selected": data["selected"]
    }

    # 기존 데이터 불러오기
    submissions = []
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            submissions = json.load(f)

    # 새 데이터 추가
    submissions.append(entry)

    # 다시 파일에 저장 (덮어쓰기 방식)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(submissions, f, ensure_ascii=False, indent=2)

    # 로그 출력
    print(f"선택 저장됨: {entry['selected']} - {entry['scenario']}")

    # 응답 반환
    return make_response(
        json.dumps({"message": "선택이 저장되었습니다."}, ensure_ascii=False),
        200,
        {"Content-Type": "application/json; charset=utf-8"}
    )

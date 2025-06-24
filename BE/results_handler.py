import json
import os
from flask import make_response, request

# /results - 특정 질문에 대한 A/B 선택 통계 반환
def register_results_route(app):
    @app.route("/results", methods=["POST"])
    def get_results():
        data = request.get_json()
        scenario = data.get("scenario")

        # 필수 항목 누락 시
        if not scenario:
            return make_response(
                json.dumps({"error": "scenario 필드는 필수입니다."}, ensure_ascii=False),
                400,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        # 초기화
        countA = countB = 0
        choiceA = choiceB = None

        # 데이터 파일 존재 여부 검사
        if not os.path.exists("submissions.json"):
            return make_response(
                json.dumps({"error": "저장된 데이터가 없습니다."}, ensure_ascii=False),
                404,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        # submissions.json 읽기
        with open("submissions.json", "r", encoding="utf-8") as f:
            submissions = json.load(f)
            for entry in submissions:
                if entry["scenario"] == scenario:
                    choiceA = entry["choiceA"]
                    choiceB = entry["choiceB"]
                    if entry["selected"] == "A":
                        countA += 1
                    elif entry["selected"] == "B":
                        countB += 1
        
        # 시나리오가 없을 경우
        if choiceA is None or choiceB is None:
            return make_response(
                json.dumps({"error": "해당 시나리오에 대한 결과가 없습니다."}, ensure_ascii=False),
                404,
                {"Content-Type": "application/json; charset=utf-8"}
            )
            
        # 결과 반환
        return make_response(
            json.dumps({
                "scenario": scenario,
                "choiceA": choiceA,
                "choiceB": choiceB,
                "countA": countA,
                "countB": countB
            }, ensure_ascii=False),
            200,
            {"Content-Type": "application/json; charset=utf-8"}
        )

# /results/all - 전체 질문 목록에 대한 통계와 비율 제공
def register_results_all_route(app):
    @app.route("/results/all", methods=["GET"])
    def get_all_results():
        if not os.path.exists("submissions.json"):
            return make_response(
                json.dumps({"error": "저장된 데이터가 없습니다."}, ensure_ascii=False),
                404,
                {"Content-Type": "application/json; charset=utf-8"}
            )
            
        # 데이터 로딩
        with open("submissions.json", "r", encoding="utf-8") as f:
            submissions = json.load(f)

        stats = {}
        for entry in submissions:
            scenario = entry["scenario"]
            if scenario not in stats:
                # 새로운 시나리오 등록
                stats[scenario] = {
                    "scenario": scenario,
                    "choiceA": entry["choiceA"],
                    "choiceB": entry["choiceB"],
                    "countA": 0,
                    "countB": 0
                }
                
            # 카운팅
            if entry["selected"] == "A":
                stats[scenario]["countA"] += 1
            elif entry["selected"] == "B":
                stats[scenario]["countB"] += 1

        # 퍼센트 계산 및 리스트 변환
        result_list = []
        for item in stats.values():
            total = item["countA"] + item["countB"]
            item["percentA"] = round(item["countA"] / total * 100) if total else 0
            item["percentB"] = 100 - item["percentA"] if total else 0
            result_list.append(item)

        # 선택 수 총합 기준으로 정렬 (Top N도 가능)
        result_list.sort(key=lambda x: x["countA"] + x["countB"], reverse=True)
        
        # 전체 결과 반환
        return make_response(
            json.dumps(result_list, ensure_ascii=False),
            200,
            {"Content-Type": "application/json; charset=utf-8"}
        )

import json
import os
from flask import make_response, request

def register_results_route(app):
    @app.route("/results", methods=["POST"])
    def get_results():
        data = request.get_json()
        scenario = data.get("scenario")

        if not scenario:
            return make_response(
                json.dumps({"error": "scenario 필드는 필수입니다."}, ensure_ascii=False),
                400,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        countA = countB = 0
        choiceA = choiceB = None

        if not os.path.exists("submissions.json"):
            return make_response(
                json.dumps({"error": "저장된 데이터가 없습니다."}, ensure_ascii=False),
                404,
                {"Content-Type": "application/json; charset=utf-8"}
            )

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

        if choiceA is None or choiceB is None:
            return make_response(
                json.dumps({"error": "해당 시나리오에 대한 결과가 없습니다."}, ensure_ascii=False),
                404,
                {"Content-Type": "application/json; charset=utf-8"}
            )

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

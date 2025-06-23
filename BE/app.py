from flask import Flask, request, make_response
from flask_cors import CORS
from gpt_service import generate_scenario
from submit_handler import handle_submit
import json

app = Flask(__name__)
CORS(app)

@app.route("/scenario", methods=["POST"])
def scenario():
    data = request.get_json()
    gender = data.get("gender")
    age_group = data.get("age_group")
    relationship = data.get("relationship")
    tone = data.get("tone")

    if not all([gender, age_group, relationship, tone]):
        return make_response(
            json.dumps({"error": "모든 항목(gender, age_group, relationship, tone)은 필수입니다."}, ensure_ascii=False),
            400,
            {"Content-Type": "application/json; charset=utf-8"}
        )

    rounds = 5
    result = []
    for _ in range(rounds):
        output = generate_scenario(gender, age_group, relationship, tone)
        if isinstance(output, str) and output.startswith("Error"):
            return make_response(
                json.dumps({"error": output}, ensure_ascii=False),
                500,
                {"Content-Type": "application/json; charset=utf-8"}
            )
        scenario, choiceA, choiceB = output
        result.append({
            "scenario": scenario,
            "choiceA": choiceA,
            "choiceB": choiceB
        })

    return make_response(
        json.dumps({"rounds": result}, ensure_ascii=False),
        200,
        {"Content-Type": "application/json; charset=utf-8"}
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)



@app.route("/submit", methods=["POST"])
def submit_choice():
    data = request.get_json()
    result = handle_submit(data)
    return make_response(
        json.dumps(result, ensure_ascii=False),
        result.get("status", 500),
        {"Content-Type": "application/json; charset=utf-8"}
    )
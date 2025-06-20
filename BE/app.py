from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt_service import generate_balance_question

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    if not data or "keywords" not in data:
        return jsonify({"error": "Missing 'keywords' in request body"}), 400

    raw_keywords = data["keywords"]

    # 문자열 → 리스트 변환 (예: "바다, 산" → ["바다", "산"])
    keywords = [k.strip() for k in raw_keywords.split(",") if k.strip()]
    if not keywords:
        return jsonify({"error": "빈 키워드는 허용되지 않습니다."}), 400

    try:
        question = generate_balance_question(keywords)
        if question.startswith("Error:"):
            return jsonify({"error": question}), 500
        return jsonify({"question": question}), 200
    except Exception as e:
        print("🔥 서버 내부 에러:", str(e))
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

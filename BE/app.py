# Flask: 웹 서버 프레임워크
# request: 클라이언트 요청 처리
# make_response: 응답 커스터마이징
from flask import Flask, request, make_response
from flask_cors import CORS               # CORS: 프론트엔드(React Native 등)에서 백엔드 API 호출 시 보안 정책 허용
from gpt_service import generate_scenario # GPT 기반 밸런스 질문 생성 함수
from submit_handler import handle_submit  # 사용자 선택 저장 핸들러
from results_handler import register_results_route, register_results_all_route # 결과 통계 API 등록 함수 (모듈화된 라우트 등록)
from personality_handler import register_personality_route
import json # JSON 처리 모듈


# Flask 애플리케이션 초기화
app = Flask(__name__)

# CORS 설정 (모든 도메인에서 접근 허용)
CORS(app) 

#1. /scenario 질문 생성 API
@app.route("/scenario", methods=["POST"])
def scenario():
    # 클라이언트 요청에서 JSON 파싱
    data = request.get_json()
    gender = data.get("gender")
    age_group = data.get("age_group")
    relationship = data.get("relationship")
    tone = data.get("tone")

    # 필수 입력값이 하나라도 누락되면 에러 반환
    if not all([gender, age_group, relationship, tone]):
        return make_response(
            json.dumps({"error": "모든 항목(gender, age_group, relationship, tone)은 필수입니다."}, ensure_ascii=False),
            400,
            {"Content-Type": "application/json; charset=utf-8"}
        )

    result = [] # 결과 저장 배열
    
    # 총 5개의 질문 라운드를 생성
    for _ in range(5):
        output = generate_scenario(gender, age_group, relationship, tone)
        
        # GPT 호출 실패 시 예외 처리
        if isinstance(output, str) and output.startswith("Error"):
            return make_response(
                json.dumps({"error": output}, ensure_ascii=False),
                500,
                {"Content-Type": "application/json; charset=utf-8"}
            )
            
        # GPT 결과 unpacking
        scenario, choiceA, choiceB = output
        result.append({
            "scenario": scenario,
            "choiceA": choiceA,
            "choiceB": choiceB
        })
        
    # 성공 응답 (질문 5개 포함)
    return make_response(
        json.dumps({"rounds": result}, ensure_ascii=False),
        200,
        {"Content-Type": "application/json; charset=utf-8"}
    )


# 2. /submit 선택 저장 API
@app.route("/submit", methods=["POST"])
def submit_choice():
    data = request.get_json()
    result = handle_submit(data)
    return make_response(
        json.dumps(result, ensure_ascii=False),
        result.get("status", 500),
        {"Content-Type": "application/json; charset=utf-8"}
    )

# 3. /analyze 성격 분석 및 이미지 생성 API
register_personality_route(app)

# 4. /results 통계 조회 API 등록
register_results_route(app)     # 특정 질문 통계 조회 
register_results_all_route(app) # 전체 질문 통계 목록 조회

# 서버 실행
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

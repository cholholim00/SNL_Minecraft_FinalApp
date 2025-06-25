from openai import OpenAI # OpenAI 공식 Python SDK (v1+) 
from dotenv import load_dotenv # .env 파일에서 환경변수 (예: OPENAI_API_KEY) 로드
import os

load_dotenv()     # .env 파일의 환경 변수 로딩 (.env 내부: OPENAI_API_KEY=sk-...)
client = OpenAI() # OpenAI 클라이언트 인스턴스 생성 (API 키 자동 로드)

#1️ 프롬프트 생성 함수
def create_prompt(gender: str, age_group: str, relationship: str, tone: str) -> str:
    return (
        f"{age_group} {gender}인 사용자를 위한 밸런스 게임 질문을 만들어줘.\n"
        f"관계는 '{relationship}'이고, 분위기는 '{tone}'이야.\n"
        f"현실에 없을만하고 어이없고 고르기 힘들정도로 웃긴 상황을 먼저 설명하고,\n"
        f"그에 따라 선택지 두 가지를 'A vs B' 형식으로 아주 짧게 제시해줘.\n"
        f"형식:\n"
        f"상황: ...\nA: ...\nB: ..."
    )

# 응답 파싱 함수
def parse_response(raw: str):
    lines = raw.split("\n")
    scenario = ""
    choiceA = ""
    choiceB = ""
    for line in lines:
        if line.startswith("상황:"):
            scenario = line.replace("상황:", "").strip()
        elif line.startswith("A:"):
            choiceA = line.replace("A:", "").strip()
        elif line.startswith("B:"):
            choiceB = line.replace("B:", "").strip()
    return scenario, choiceA, choiceB

# 전체 시나리오 생성 함수
def generate_scenario(gender: str, age_group: str, relationship: str, tone: str):
    prompt = create_prompt(gender, age_group, relationship, tone)
    print("🔸 생성된 프롬프트:")
    print(prompt)  # ✅ 프롬프트 확인

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 상황극 기반 밸런스 게임 질문 생성기야."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.9
        )
        content = response.choices[0].message.content.strip()
        print("✅ GPT 응답 결과:")
        print(content)  # ✅ 응답 확인
        return parse_response(content)
    except Exception as e:
        print("❌ GPT 호출 에러:", str(e))
        return f"Error: {str(e)}"


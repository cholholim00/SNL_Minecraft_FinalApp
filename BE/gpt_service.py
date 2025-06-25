from openai import OpenAI # OpenAI 공식 Python SDK (v1+) 
from dotenv import load_dotenv # .env 파일에서 환경변수 (예: OPENAI_API_KEY) 로드
import os

load_dotenv()     # .env 파일의 환경 변수 로딩 (.env 내부: OPENAI_API_KEY=sk-...)
client = OpenAI() # OpenAI 클라이언트 인스턴스 생성 (API 키 자동 로드)

#1️ 프롬프트 생성 함수
def create_prompt(gender: str, age_group: str, relationship: str, tone: str) -> str:
    return (
        f"{age_group} {gender}인 사용자가 겪는 황당하고 웃긴 상황극을 만들어줘.\n"
        f"관계는 '{relationship}', 분위기는 '{tone}'이야.\n"
        f"상황은 현실에서 일어나기 힘들고 상상력이 풍부한 설정이면 좋겠어.\n"
        f"그 상황에서 사용자가 두 가지 선택지 중 하나를 골라야 하는 흐름으로 이어줘.\n"
        f"상황 설명 후, '당신이라면?' 또는 '이럴 때 당신은?' 같은 말로 선택지를 자연스럽게 이어줘.\n"
        f"선택지는 A vs B 형태로, 짧고 재밌고 극단적인 게 좋아.\n"
        f"예시:\n"
        f"상황: 20년지기 친구가 갑자기 외계인이었다는 걸 알게 됐다. 그는 지금 당신에게 비밀을 털어놓고 있다. 이럴 때 당신은?\n"
        f"A: 외계인과 절교한다\nB: 같이 지구를 떠난다\n"
        f"형식:\n"
        f"상황: ... 이럴 때 당신은?\nA: ...\nB: ..."
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
    print("생성된 프롬프트:")
    print(prompt)  # 프롬프트 확인

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 상황극 기반 밸런스 게임 질문 생성 AI야."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.9
        )
        content = response.choices[0].message.content.strip()
        print("GPT 응답 결과:")
        print(content)  # 응답 확인
        return parse_response(content)
    except Exception as e:
        print("GPT 호출 에러:", str(e))
        return f"Error: {str(e)}"


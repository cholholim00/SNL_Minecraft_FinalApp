from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI()

def create_prompt(gender: str, age_group: str, relationship: str, tone: str) -> str:
    return (
        f"{age_group} {gender}인 사용자를 위한 밸런스 게임 질문을 만들어줘.\n"
        f"관계는 '{relationship}'이고, 분위기는 '{tone}'이야.\n"
        f"현실에 없을만하고 어이없고 고르기 힘들정도로 웃긴 상황을 먼저 설명하고,\n"
        f"그에 따라 선택지 두 가지를 'A vs B' 형식으로 아주 짧게 제시해줘.\n"
        f"형식:\n"
        f"상황: ...\nA: ...\nB: ..."
    )

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

def generate_scenario(gender: str, age_group: str, relationship: str, tone: str):
    prompt = create_prompt(gender, age_group, relationship, tone)
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
        return parse_response(content)
    except Exception as e:
        return f"Error: {str(e)}"

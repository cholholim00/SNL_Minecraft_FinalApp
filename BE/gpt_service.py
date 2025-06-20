from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI()

def generate_balance_question(keywords: list) -> str:
    if not (1 <= len(keywords) <= 2):
        return "Error: 키워드는 1개 또는 2개까지만 가능합니다."

    if len(keywords) == 1:
        k = keywords[0]
        prompt = (
            f'너는 재미있고 창의적인 밸런스 게임 질문을 만드는 AI야.'
            f'"{k}"라는 키워드를 이용해서 밸런스 게임 질문을 하나 만들어줘.\n'
            f'질문은 사람들이 웃거나 당황할 정도로 황당하고 예상치 못한 설정이면 좋아.\n '
            f'형식: A vs B 짧고 간결하게 만들어줘\n'
            f'예시:\n'
            f'- {k}랑 영원히 우주여행 vs {k}가 나 대신 시험 보기\n'
            f'- {k}를 삼켜버리기 vs {k}에게 고백받기\n'
            f'지금 만들어야 할 키워드: "{k}"'
        )
    else:
        a, b = keywords
        prompt = (
            f'너의 임무는 유저가 키워드로 준 소재를 가지고 말도 안 되는 선택지를 상상력 있게 만드는 거야.'
            f'"{a}"와 "{b}"를 비교하는 기상천외하고 웃긴 밸런스 게임 질문 하나만 만들어줘. 말도 안 되는 선택지면 더 좋아.\n'
            f'"A vs B" 형식으로 짧고 웃기게!'
            f'예시:\n'
            f'- {a}랑 손잡고 시속 200km로 달리기 vs {b}랑 눈싸움 12시간 하기\n'
            f'- {a}로 만든 드레스 입기 vs {b}와 결혼 후 이름 바꾸기\n'
            f'지금 키워드: "{a}"와 "{b}"'
        )

    try:
        print("🚀 GPT 프롬프트:", prompt)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 유머 있고 황당한 밸런스 게임 질문을 생성하는 AI야."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=50,
            temperature=0.9
        )
        content = response.choices[0].message.content.strip()
        print("✅ GPT 응답:", content)
        return content
    except Exception as e:
        print("❌ GPT 호출 에러:", str(e))
        return f"Error: {str(e)}"

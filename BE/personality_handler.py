import json
from flask import request, make_response
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def register_personality_route(app):
    @app.route("/analyze", methods=["POST"])
    def analyze_personality():
        data = request.get_json()
        answers = data.get("answers")
        age_group = data.get("age_group")
        gender = data.get("gender")

        # 입력값 검증
        if not answers or not isinstance(answers, list):
            return make_response(
                json.dumps({"error": "answers 배열이 필요합니다."}, ensure_ascii=False),
                400,
                {"Content-Type": "application/json; charset=utf-8"}
            )
        if not age_group or not gender:
            return make_response(
                json.dumps({"error": "age_group과 gender는 필수입니다."}, ensure_ascii=False),
                400,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        # GPT 프롬프트
        prompt = (
            f"사용자가 밸런스 게임에서 총 5문제 중 선택한 답은 다음과 같습니다: {answers}\n"
            f"A와 B는 고정된 성격은 아니지만, 선택 경향을 보고 성격을 유추해주세요.\n"
            f"아래 형식을 따르되, '제목:'이나 '설명:' 같은 단어는 포함하지 마세요.\n\n"
            f"1. 첫 줄에는 성격을 간단히 표현하는 제목(예: 모험을 즐기는 자유인)을 써주세요.\n"
            f"2. 두 번째 줄에는 한두 문장으로 성격 설명을 써주세요."
        )

        try:
            # Step 1: GPT 성격 분석
            chat_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "너는 사람의 선택을 기반으로 성격을 분석하는 전문가야."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300
            )
            content = chat_response.choices[0].message.content.strip()

            # 응답 파싱
            lines = content.split("\n")
            title = lines[0].strip()
            description = lines[1].strip() if len(lines) > 1 else ""

            if not title or not description:
                title = "성격 분석 결과"
                description = content  # fallback

            # Step 2: 이미지 생성 프롬프트
            image_prompt = (
                f"Create a pixel art avatar of a {age_group} {gender}. "
                f"This person has the following personality: '{description}'. "
                f"The avatar should have a front-facing pose with a clear facial expression. "
                f"Use elements like facial expression, clothes, and colors to reflect the personality. "
                f"The image should be suitable as a personality profile icon. "
                f"The background should be simple and solid color. "
                f"Use 8-bit or 16-bit pixel art style like a Minecraft character."
            )

            image_response = client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size="1024x1072",  # 권장 해상도
                quality="standard",
                n=1
            )
            image_url = image_response.data[0].url

            # 최종 응답
            return make_response(
                json.dumps({
                    "title": title,
                    "description": description,
                    "imageUrl": image_url
                }, ensure_ascii=False),
                200,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        except Exception as e:
            import traceback
            traceback.print_exc()
            return make_response(
                json.dumps({"error": f"서버 오류: {str(e)}"}, ensure_ascii=False),
                500,
                {"Content-Type": "application/json; charset=utf-8"}
            )

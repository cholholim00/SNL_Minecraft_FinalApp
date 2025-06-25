# personality_handler.py
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

        if not answers or not isinstance(answers, list):
            return make_response(
                json.dumps({"error": "answers 배열이 필요합니다."}, ensure_ascii=False),
                400,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        # Step 1: GPT로 성격 분석
        prompt = (
            f"사용자가 밸런스 게임에서 선택한 결과는 {answers}입니다.\n"
            f"A는 도전적이고 자기 주장 강한 선택지, B는 신중하고 배려 깊은 선택지입니다.\n"
            f"이 사람의 성격을 한 문장으로 간단히 분석해줘."
        )

        try:
            chat_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "너는 성격 분석 전문가야."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100
            )
            personality = chat_response.choices[0].message.content.strip()

            # Step 2: 이미지 생성 프롬프트
            image_prompt = f"cartoon style avatar representing someone who is {personality}"
            image_response = client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size="512x512",
                quality="standard",
                n=1
            )
            image_url = image_response.data[0].url

            return make_response(
                json.dumps({
                    "personality": personality,
                    "image": image_url
                }, ensure_ascii=False),
                200,
                {"Content-Type": "application/json; charset=utf-8"}
            )

        except Exception as e:
            return make_response(
                json.dumps({"error": str(e)}, ensure_ascii=False),
                500,
                {"Content-Type": "application/json; charset=utf-8"}
            )
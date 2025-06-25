# personality_handler.py
import json
from flask import request, make_response
from openai import OpenAI
from dotenv import load_dotenv

# .env 파일에서 API 키 로드
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

        # Step 1: GPT로 성격 분석 프롬프트
        prompt = (
            f"사용자가 밸런스 게임에서 선택한 결과는 {answers}입니다.\n"
            f"A는 도전적이고 자기 주장 강한 선택지, B는 신중하고 배려 깊은 선택지입니다.\n"
            f"이 사람의 성격을 한 문장으로 분석해주고, 그 성격 유형의 간단한 제목도 붙여줘.\n"
            f"형식: 제목: ...\n설명: ..."
        )

        try:
            # GPT 호출
            chat_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "너는 사람의 선택을 기반으로 성격을 분석하는 전문가야."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=200
            )
            content = chat_response.choices[0].message.content.strip()

            # 응답 파싱
            title = ""
            description = ""
            for line in content.split("\n"):
                if line.startswith("제목:"):
                    title = line.replace("제목:", "").strip()
                elif line.startswith("설명:"):
                    description = line.replace("설명:", "").strip()

            if not title or not description:
                title = "성격 분석 결과"
                description = content  # fallback

            # Step 2: 이미지 생성
            image_prompt = f"{description}인 사람을 나타내는 일러스트 캐릭터, 귀엽고 감정이 잘 표현된 아바타 스타일"
            image_response = client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size="512x512",
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
            return make_response(
                json.dumps({"error": str(e)}, ensure_ascii=False),
                500,
                {"Content-Type": "application/json; charset=utf-8"}
            )

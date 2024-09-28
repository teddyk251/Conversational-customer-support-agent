# tts.py
# This implements text-to-speech (TTS) functionality using OpenAI or Pindo for specific languages.

import os
import requests
import logging
from openai import OpenAI

# Setup logging
logging.basicConfig(level=logging.INFO)

# Supported languages for TTS
SUPPORTED_LANGS = ["en", "rw", "sw", "fr"]

# API keys (store these securely)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINDO_API_KEY = os.getenv("PINDO_API_KEY")

# Setup OpenAI TTS Client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

def synthesize_speech_openai(text: str, language_code: str = "en"):
    """Synthesize speech using OpenAI API."""
    try:
        # Call the OpenAI TTS API
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text
        )

        # Stream the audio content directly to a file
        output_file = "output_openai.wav"
        with open(output_file, "wb") as audio_file:
            for chunk in response.iter_bytes():
                audio_file.write(chunk)

        logging.info(f"OpenAI TTS audio saved to {output_file}")
        return output_file

    except Exception as e:
        logging.error(f"Error in OpenAI TTS: {e}")
        return None


def synthesize_speech_pindo(text: str, language: str):
    """Synthesize speech using Pindo for supported languages."""
    try:
        url = "https://api.pindo.io/v1/transcription/tts"
        data = {"text": text, "lang": language}

        response = requests.post(url, json=data)
        if response.status_code == 200:
            audio_url = response.json().get("generated_audio_url")
            audio_content = requests.get(audio_url).content

            output_file = "output_pindo.wav"
            with open(output_file, "wb") as out:
                out.write(audio_content)
            logging.info(f"Pindo TTS audio saved to {output_file}")
            return output_file
        else:
            logging.error(f"Pindo TTS failed: {response.status_code}")
            return None
    except Exception as e:
        logging.error(f"Error in Pindo TTS: {e}")
        return None

def synthesize_text_to_speech(text: str, language: str):
    """Main function to handle TTS based on the language."""
    
    # Validate language
    if language not in SUPPORTED_LANGS:
        raise ValueError("Unsupported language.")

    # Choose TTS service
    if language in ['rw']:
        audio_file = synthesize_speech_pindo(text, language)
    else:
        # Use OpenAI for other languages
        audio_file = synthesize_speech_openai(text, language)

    return audio_file
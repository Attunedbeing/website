"""
Transcribe an audio file (m4a, mp3, wav, etc.) using OpenAI Whisper.
Outputs a .txt transcript alongside the audio file.

Usage: python scripts/transcribe_meeting.py <audio_file> [--model base]

Available models (speed vs accuracy tradeoff):
  tiny   - fastest, least accurate
  base   - good balance (default)
  small  - better accuracy, slower
  medium - high accuracy, much slower
  large  - best accuracy, very slow
"""

import sys
import os
import argparse


def transcribe(audio_path: str, model_name: str = "base") -> str:
    try:
        import whisper
    except ImportError:
        print("ERROR: openai-whisper not installed. Run: pip install openai-whisper")
        sys.exit(1)

    if not os.path.exists(audio_path):
        print(f"ERROR: File not found: {audio_path}")
        sys.exit(1)

    print(f"Loading Whisper model '{model_name}'...")
    model = whisper.load_model(model_name)

    print(f"Transcribing: {audio_path}")
    result = model.transcribe(audio_path)
    text = result["text"].strip()

    base = os.path.splitext(audio_path)[0]
    out_path = base + "_transcript.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"Transcript saved to: {out_path}")
    return out_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Transcribe audio to text using Whisper")
    parser.add_argument("audio_file", help="Path to the audio file (m4a, mp3, wav, etc.)")
    parser.add_argument("--model", default="base", help="Whisper model size (default: base)")
    args = parser.parse_args()

    out = transcribe(args.audio_file, args.model)
    print(f"\nDone. Transcript at: {out}")

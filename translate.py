#!/usr/bin/env python3
"""
Translate PhottaVitrin locale files using Google Gemini API.

Usage:
  GEMINI_API_KEY=your_key python3 translate.py

Translates en.json to all target languages.
"""
import json, os, sys, time

try:
    import google.generativeai as genai
except ImportError:
    print("Install: pip3 install google-generativeai")
    sys.exit(1)

BASE = os.path.join(os.path.dirname(__file__), "src/i18n/locales")
SOURCE_LANG = "en"

TARGET_LANGS = {
    "de": "German",
    "es": "Spanish",
    "fr": "French",
    "it": "Italian",
    "pt": "Portuguese (Brazil)",
    "nl": "Dutch",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese (Simplified)",
    "ar": "Arabic",
    "ru": "Russian",
    "hi": "Hindi",
    "sv": "Swedish",
}

def translate_json(model, source, lang_name, lang_code):
    prompt = f"""Translate this JSON from English to {lang_name} ({lang_code}).

Rules:
- Keep all JSON keys exactly as-is (don't translate keys)
- Keep {{{{threshold}}}} and other interpolation variables unchanged
- Keep brand names, product material percentages, sizes unchanged
- Keep "VITRIN" as "VITRIN" (brand name)
- Keep technical terms like "256-bit SSL" unchanged
- Translate product names, descriptions, color names naturally
- For currency, use the original "TL" but change locale to appropriate locale code
- The "locale" value should be the correct locale code for {lang_name}
- The "currency" value should stay "TL" (Turkish Lira - this is a Turkish fashion store)
- Return ONLY valid JSON, no markdown fencing

JSON to translate:
{json.dumps(source, ensure_ascii=False, indent=2)}"""

    response = model.generate_content(prompt)
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        if text.endswith("```"):
            text = text[:-3]
    return json.loads(text)

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Set GEMINI_API_KEY environment variable")
        sys.exit(1)

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")

    with open(os.path.join(BASE, f"{SOURCE_LANG}.json"), "r") as f:
        source = json.load(f)

    for code, name in TARGET_LANGS.items():
        out_path = os.path.join(BASE, f"{code}.json")
        if os.path.exists(out_path):
            print(f"  Skipping {code} (already exists)")
            continue

        print(f"  Translating to {name} ({code})...", end=" ", flush=True)
        try:
            translated = translate_json(model, source, name, code)
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(translated, f, ensure_ascii=False, indent=2)
            print("OK")
            time.sleep(1)
        except Exception as e:
            print(f"FAILED: {e}")

    print("\nDone! All locale files are in src/i18n/locales/")

if __name__ == "__main__":
    main()

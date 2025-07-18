import time
from googletrans import Translator
from typing import List

translator = Translator()

def translate_korean_paragraphs(paragraphs, batch_size=20):
    translated_output = []

    try:
        print("Trying full chapter translation...")
        result = translator.translate(paragraphs, src='ko', dest='en')
        return [r.text for r in result]
    except Exception as e:
        print(f"Full chapter translation failed: {e}")
        print(f"Falling back to batch translation with batch size {batch_size}...")
        
        for i in range(0, len(paragraphs), batch_size):
            batch = paragraphs[i:i+batch_size]
            print(f"  Translating batch {i//batch_size + 1} of {(len(paragraphs) - 1)//batch_size + 1}...")
            try:
                batch_result = translator.translate(batch, src='ko', dest='en')
                translated_output.extend([r.text for r in batch_result])
            except Exception as batch_e:
                print(f"Batch translation failed at batch {i//batch_size + 1}: {batch_e}")
                raise
            time.sleep(1)  # delay to avoid rate limits

        return translated_output
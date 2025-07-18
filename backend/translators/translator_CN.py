import time
import re
from googletrans import Translator
from typing import List

# === Initialize translator ===
translator = Translator()

def translate_paragraphs(paragraphs, batch_size=20):
    translated_output = []

    try:
        print("Trying full chapter translation...")
        result = translator.translate(paragraphs, src='zh-cn', dest='en')
        return [r.text for r in result]
    except Exception as e:
        print(f"Full chapter translation failed: {e}")
        print(f"Falling back to batch translation with batch size {batch_size}...")
        
        for i in range(0, len(paragraphs), batch_size):
            batch = paragraphs[i:i+batch_size]
            print(f"  Translating batch {i//batch_size + 1} of {(len(paragraphs) - 1)//batch_size + 1}...")
            try:
                batch_result = translator.translate(batch, src='zh-cn', dest='en')
                translated_output.extend([r.text for r in batch_result])
            except Exception as batch_e:
                print(f"Batch translation failed at batch {i//batch_size + 1}: {batch_e}")
                raise
            time.sleep(1)  # delay to avoid rate limits

        return translated_output
    

# Helper to split plain text into chapters and paragraphs:
def split_text_into_chapters(text):
    import re
    parts = re.split(r'(第[一二三四五六七八九十百千0-9]+章[^\n]*)', text)
    chapters = []
    for i in range(1, len(parts), 2):
        title = parts[i].strip()
        content = parts[i + 1].strip()
        paragraphs = [line.strip() for line in content.splitlines() if line.strip()]
        chapters.append({'title': title, 'paragraphs': paragraphs})
    return chapters

# Splits based on Chinese punctuation and trims extra whitespace
def sentence_splitter(text: str) -> List[str]:
    sentence_endings = r"(?<=[。！？])"
    sentences = re.split(sentence_endings, text)
    return [s.strip() for s in sentences if s.strip()]

def split_text_readable(text, max_len=23):
    CLOSING_PUNCT = '。！？；，、：」』”’）】》'
    chunks = []
    buf = ''
    i = 0
    while i < len(text):
        buf += text[i]
        i += 1

        # If buffer reaches max length or hits punctuation
        if len(buf) >= max_len:
            # If last char is good for breaking
            if buf[-1] in CLOSING_PUNCT:
                chunks.append(buf)
                buf = ''
            else:
                # Look for last closing punctuation in buffer
                for j in range(len(buf) - 1, -1, -1):
                    if buf[j] in CLOSING_PUNCT:
                        chunks.append(buf[:j + 1])
                        buf = buf[j + 1:]
                        break
                else:
                    # No punctuation? Force break
                    chunks.append(buf)
                    buf = ''
    if buf:
        chunks.append(buf)
    return chunks
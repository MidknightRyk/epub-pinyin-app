import hangul

def korean_to_latin(text_chunk):
    # Convert Hangul to Latin script
    return hangul.to_latin(text_chunk)

def convert_korean_paragraph_to_latin(paragraph):
    # Split the paragraph into sentences or phrases
    sentences = paragraph.split('。')
    latin_paragraph = []
    for sentence in sentences:
        latin_sentence = korean_to_latin(sentence)
        latin_paragraph.append(latin_sentence)
    return ' '.join(latin_paragraph)

# Example usage:
korean_text = "안녕하세요. 이 문장은 한국어로 번역됩니다."
latin_text = convert_korean_paragraph_to_latin(korean_text)
print(latin_text)
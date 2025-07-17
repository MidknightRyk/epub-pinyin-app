from pypinyin import pinyin, Style

def chinese_to_pinyin(text_chunk):
    py = pinyin(text_chunk, style=Style.TONE, errors=lambda x: x)
    return ' '.join(item[0] for item in py)

def convert_paragraph_to_pinyin(paragraph):
    # You can add chunking logic here if needed (e.g. 23 chars or punctuation)
    # For simplicity, convert whole paragraph now
    return chinese_to_pinyin(paragraph)
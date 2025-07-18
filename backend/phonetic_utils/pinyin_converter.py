from pypinyin import pinyin, Style

def chinese_to_pinyin(text_chunk):
    py = pinyin(text_chunk, style=Style.TONE, errors=lambda x: x)
    return ' '.join(item[0] for item in py)

def convert_paragraph_to_pinyin(paragraph):
    # You can add chunking logic here if needed (e.g. 23 chars or punctuation)
    # For simplicity, convert whole paragraph now
    # para_block = ""
    # para_pinyin = []
    # chunks = split_text_readable(paragraph)
    # for chunk in chunks:
    #     py_line = chinese_to_pinyin(chunk)
    return chinese_to_pinyin(paragraph)
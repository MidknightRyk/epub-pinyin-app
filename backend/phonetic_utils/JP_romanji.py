from pykakasi import kakasi

def japanese_to_romaji(text_chunk):
    kks = kakasi()
    kks.setMode('J', 'a')  # Japanese to ascii, default is romaji
    kks.setMode('K', 'a')  # Katakana to ascii
    kks.setMode('H', 'a')  # Hiragana to ascii
    converter = kks.getConverter()
    return converter.do(text_chunk)

def japanese_to_kana(text_chunk):
    kks = kakasi()
    kks.setMode('J', 'H')  # Japanese to Hiragana
    kks.setMode('K', 'H')  # Katakana to Hiragana
    kks.setMode('H', 'H')  # Hiragana to Hiragana (no change)
    converter = kks.getConverter()
    return converter.do(text_chunk)

def convert_japanese_paragraph_to_romaji(paragraph):
    # Split the paragraph into sentences by '。', but keep the delimiter
    import re
    sentences = re.split('(。)', paragraph)
    romaji_paragraph = []
    for i in range(0, len(sentences), 2):
        sentence = sentences[i]
        delimiter = sentences[i+1] if i+1 < len(sentences) else ''
        romaji_sentence = japanese_to_romaji(sentence)
        romaji_paragraph.append(romaji_sentence + delimiter)
    return ''.join(romaji_paragraph)

def convert_japanese_paragraph_to_kana(paragraph):
    import re
    sentences = re.split('(。)', paragraph)
    kana_paragraph = []
    for i in range(0, len(sentences), 2):
        sentence = sentences[i]
        delimiter = sentences[i+1] if i+1 < len(sentences) else ''
        kana_sentence = japanese_to_kana(sentence)
        kana_paragraph.append(kana_sentence + delimiter)
    return ''.join(kana_paragraph)

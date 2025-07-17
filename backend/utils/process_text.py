import os
from typing import Optional
from epub_utils.epub_parser import extract_epub_chapters
from phonetic_utils.pinyin_converter import convert_paragraph_to_pinyin
from translators.translator_CN import translate_paragraphs, split_text_into_chapters
from utils.output_builder import build_output
from epub_utils.epub_builder import build_epub  # Only if epub output

# TODO: make this language generic

def process_file(filepath, include_english=True, output_format="epub", resume_from=1):
    ext = os.path.splitext(filepath)[1].lower()

    # Step 1 & 2: Extract chapters and paragraphs
    if ext == '.epub':
        chapters = extract_epub_chapters(filepath)
    elif ext in ['.txt', '.md']:
        with open(filepath, 'r', encoding='utf-8') as f:
            raw_text = f.read()
        chapters = split_text_into_chapters(raw_text)
    else:
        raise ValueError("Unsupported file type")

    # Apply resume
    chapters = chapters[resume_from-1:]

    processed_chapters = []
    for chapter in chapters:
        # chapter = {'title': str, 'paragraphs': [str]}
        processed_paragraphs = []
        for para in chapter['paragraphs']:
            pinyin = convert_paragraph_to_pinyin(para)
            processed_paragraphs.append({'text': para, 'pinyin': pinyin})
        
        if include_english:
            texts = [p['text'] for p in processed_paragraphs]
            translations = translate_paragraphs(texts)
            for i, t in enumerate(translations):
                processed_paragraphs[i]['english'] = t
        else:
            for p in processed_paragraphs:
                p['english'] = ''

        processed_chapters.append({'title': chapter['title'], 'paragraphs': processed_paragraphs})

    # Step 4: Build output (HTML/text/json) for all chapters
    output_content = build_output(processed_chapters, output_format)

    # Step 5: If EPUB, build and save file, return path
    if output_format == "epub":
        epub_path = build_epub(processed_chapters)
        return epub_path
    else:
        # Could be raw html/text/json string
        return output_content




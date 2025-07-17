def build_output(chapters, output_format):
    if output_format == "html":
        return build_html(chapters)
    elif output_format == "json":
        import json
        return json.dumps(chapters, ensure_ascii=False, indent=2)
    elif output_format == "text":
        return build_plain_text(chapters)
    else:
        raise ValueError("Unsupported output format")

def build_html(chapters):
    html = ""
    for chap in chapters:
        html += f'<h2>{chap["title"]}</h2>\n'
        for para in chap['paragraphs']:
            html += f'<p class="chinese">{para["text"]}</p>\n'
            html += f'<p class="pinyin">{para["pinyin"]}</p>\n'
            if para.get("english"):
                html += f'<p class="english">{para["english"]}</p>\n'
    return html

def build_plain_text(chapters):
    text = ""
    for chap in chapters:
        text += f"\n=== {chap['title']} ===\n"
        for para in chap['paragraphs']:
            text += para['text'] + "\n"
            text += para['pinyin'] + "\n"
            if para.get('english'):
                text += para['english'] + "\n"
    return text

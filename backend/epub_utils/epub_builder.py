import os
from ebooklib import epub

def build_epub(chapters, output_path="output.epub"):

    # === Metadata ===
    book = epub.EpubBook()
    book.set_identifier('binganben')
    book.set_title('病案本')
    book.set_language('zh')
    book.add_author('肉包不吃肉')
    book.add_metadata('DC', 'publisher', '自制电子书')
    book.add_metadata('DC', 'description', '''⼩说简介：
    ⾐冠禽兽疯批攻，爹味冷漠离异受。孤例精神病少年和冷漠医⽣的故事。年下。温馨提⽰：现
    代都市架空背景⽂，慢热，狗⾎，悬案，疑罪，异病。恋爱内容会掰扯很多。病症情况医疗制
    度各类社会团体等均带有⼀定幻想成分，与现实⽆关。所以请不要ky，请不要对号⼊座，请不
    要考据，不要拿现实的制度，公司/学校/医院构架来衡量⽂中设定，设定为故事服务，架空，
    不能当真哟~''')
    book.add_metadata('DC', 'date', '2025-07-16')

    # TODO: Add cover image, stylesheet, and other metadata here

    # Add stylesheet
    style = '''
    @namespace epub "http://www.idpf.org/2007/ops";
    body { font-family: serif; line-height: 1.6; }
    h2 { text-align: center; margin-top: 1em; }
    p { text-indent: 2em; margin-bottom: 1em; }
    p.chinese { font-size: 1.1em; margin-bottom: 0; line-height: 1.4em; }
    p.pinyin { font-size: 0.9em; color: #555; margin-top: 0; margin-bottom: 0; font-style: italic; }
    p.english { font-size: 0.95em; color: #333; margin-top: 0; margin-bottom: 1em; }
    '''
    nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)
    book.add_item(nav_css)

    epub_chapters = []
    for idx, chap in enumerate(chapters, start=1):
        chapter = epub.EpubHtml(title=chap["title"], file_name=f"chap_{idx}.xhtml", lang="zh")
        html_content = f"<h2>{chap['title']}</h2>"
        for para in chap["paragraphs"]:
            html_content += f'<p class="chinese">{para["text"]}</p>'
            html_content += f'<p class="pinyin">{para["pinyin"]}</p>'
            if para.get("english"):
                html_content += f'<p class="english">{para["english"]}</p>'
        chapter.set_content(html_content)
        chapter.add_item(nav_css)
        book.add_item(chapter)
        epub_chapters.append(chapter)

    book.toc = tuple(epub_chapters)
    book.spine = ['nav'] + epub_chapters
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    if os.path.exists(output_path):
        os.remove(output_path)
    epub.write_epub(output_path, book)
    return output_path

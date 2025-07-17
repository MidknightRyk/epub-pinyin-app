from ebooklib import epub
from bs4 import BeautifulSoup

def extract_epub_chapters(file_path):
    book = epub.read_epub(file_path)
    chapters = []

    for item in book.items:
        if item.get_type() == epub.EpubHtml:
            soup = BeautifulSoup(item.get_content(), 'html.parser')
            text = soup.get_text()
            chapters.append(text.strip())

    return chapters

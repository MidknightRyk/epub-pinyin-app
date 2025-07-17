import remi.gui as gui
from remi import start, App
from utils.process_text import process_text  # your refactored module

class TranslatorApp(App):
    def __init__(self, *args):
        super(TranslatorApp, self).__init__(*args)

    def main(self):
        container = gui.VBox(width=500, height=400, style={'margin': '0px auto'})

        self.epub_file = gui.FileUploader("Choose EPUB File", width=300, height=30)
        self.epub_file.set_on_success_listener(self.on_file_upload)
        container.append(self.epub_file)

        self.include_english = gui.CheckBoxLabel("Include English Translations", False, width=300, height=20)
        container.append(self.include_english)

        self.resume_chapter = gui.TextInput(single_line=True, hint="Resume from chapter number (optional)", width=300, height=30)
        container.append(self.resume_chapter)

        self.output_area = gui.TextInput(single_line=False, hint="Output log...", width=480, height=150)
        container.append(self.output_area)

        self.start_button = gui.Button("Start Translation", width=200, height=30)
        self.start_button.onclick.do(self.start_translation)
        container.append(self.start_button)

        return container

    def on_file_upload(self, widget, file_path):
        self.log(f"Uploaded: {file_path}")
        self.uploaded_file_path = file_path

    def start_translation(self, widget):
        include_eng = self.include_english.get_value()
        resume_from = self.resume_chapter.get_value()
        file_path = getattr(self, 'uploaded_file_path', None)

        if not file_path:
            self.log("No EPUB file uploaded.")
            return

        self.log(f"Starting translation: {file_path}\nInclude English: {include_eng}\nResume from: {resume_from or 'Start'}")
        try:
            result = run_translation_pipeline(file_path, include_eng, resume_from)
            self.log("Translation completed.")
            self.log(result[:1000] + '...')  # Show first 1000 chars
        except Exception as e:
            self.log(f"Error: {e}")

    def log(self, message):
        current = self.output_area.get_value()
        self.output_area.set_value(f"{current}\n{message}")


def run_translation_pipeline(file_path, include_english, resume_from):
    if resume_from == "":
        resume_from = None
    else:
        try:
            resume_from = int(resume_from)
        except ValueError:
            raise ValueError("Resume chapter must be a number.")

    # Call the main EPUB translation function
    return process_text(file_path, include_english, resume_from)


if __name__ == "__main__":
    start(TranslatorApp, address='0.0.0.0', port=8081, start_browser=True)

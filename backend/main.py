from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.process_text import process_file

app = FastAPI()

# Allow Next.js frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend dev origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/translate/")
async def translate_file(
    file: UploadFile = File(...),
    include_english: bool = Form(True),
    resume_from: int = Form(0),
    file_type: str = Form("epub")
):
    contents = await file.read()
    output = process_file(contents, file.filename, include_english, resume_from, file_type)
    return {"translation": output}

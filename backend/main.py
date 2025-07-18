from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.process_text import process_file
import os
import traceback
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow Next.js default dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    print("/api/upload endpoint hit")
    try:
        filename = file.filename
        if not (filename.endswith('.txt') or filename.endswith('.epub')):
            raise HTTPException(status_code=400, detail="Only .txt and .epub files are supported.")

        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        return {"filename": filename, "status": "uploaded"}

    except Exception as e:
        print("Upload error:", e)
        print(traceback.format_exc())
        return JSONResponse(status_code=500, content={"message": "Server error during file upload"})


class TranslateRequest(BaseModel):
    filename: str
    include_english: bool = True
    resume_from: int = 1
    output_format: str = "text"

@app.post("/api/translate")
async def translate_file(payload: TranslateRequest):
    try:
        file_path = os.path.join(UPLOAD_DIR, payload.filename)

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found.")

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Fake translation for testing
        translated = process_file(file_path, payload.include_english, payload.output_format, payload.resume_from)

        return {
            "filename": payload.filename,
            "translated": translated[:500],  # Truncate for preview
            "resume_from": payload.resume_from
        }

    except UnicodeDecodeError:
        return JSONResponse(status_code=415, content={"message": "Could not decode file. Make sure it's UTF-8 encoded."})
    except Exception as e:
        print("Translation error:", e)
        #print(traceback.format_exc().encode('utf-8', errors='ignore').decode())
        traceback.print_exc()  # prints full traceback to stderr
        return JSONResponse(status_code=500, content={"message": "Server error during translation"})

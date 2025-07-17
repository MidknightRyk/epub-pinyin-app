// pages/index.tsx
import { useState } from 'react';
import { uploadFile, startTranslation } from '../utils/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [includeEnglish, setIncludeEnglish] = useState(false);
  const [resumeFrom, setResumeFrom] = useState('');
  const [log, setLog] = useState('Output log...');

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('include_english', 'true');
    formData.append('resume_from', '0');
    formData.append('file_type', 'epub');

    const res = await fetch('http://127.0.0.1:8000/translate/', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Translation result:', data.translation);
  };

  const handleTranslate = async () => {
    try {
      setLog(prev => prev + `\nStarting translation...`);
      await startTranslation(includeEnglish, resumeFrom);
      setLog(prev => prev + `\nTranslation finished.`);
    } catch (err) {
      setLog(prev => prev + `\nTranslation error: ${err}`);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📘 EPUB Pinyin Translator</h1>

      <input type="file" accept=".epub" onChange={e => setFile(e.target.files?.[0] || null)} />
      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={includeEnglish}
          onChange={e => setIncludeEnglish(e.target.checked)}
        />
        Include English Translations
      </label>
      <br />
      <br />

      <input
        type="text"
        placeholder="Resume from chapter number (optional)"
        value={resumeFrom}
        onChange={e => setResumeFrom(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleUpload}>Upload File</button>
      <button onClick={handleTranslate} style={{ marginLeft: '1rem' }}>
        Start Translation
      </button>

      <pre
        style={{
          whiteSpace: 'pre-wrap',
          marginTop: '2rem',
          background: '#111',
          color: '#0f0',
          padding: '1rem',
        }}
      >
        {log}
      </pre>
    </main>
  );
}

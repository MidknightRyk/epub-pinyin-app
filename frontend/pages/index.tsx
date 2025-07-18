import { useState } from 'react';
import { startTranslation } from '../utils/api';
import { FileUploader } from '@/components/FileUpload';
import { ConfigWindow } from '@/components/ConfigWindow';
import { LogWindow } from '@/components/LogWindow';
import { SupportedLanguages } from '@/utils/enums';

export default function HomeEG2() {
    const [file, setFile] = useState<File | null>(null);
    const [eng, setEng] = useState(false);
    const [rom, setRom] = useState(false);
    const [lang, setLang] = useState<SupportedLanguages>(SupportedLanguages.Chinese);
    const [kana, setKana] = useState(false);
    const [log, setLog] = useState('Output log...');
    const [outFmt, setOutFmt] = useState('txt');
    //const [resFrom, setResFrom] = useState('');

    const handleTranslate = async () => {
        try {
            setLog(prev => prev + `\nStarting translation...`);

            if (!file) {
                setLog(prev => prev + `\nNo file uploaded yet.`);
                return;
            }

            await startTranslation(file.name, true, true);

            setLog(prev => prev + `\nTranslation finished.`);
        } catch (err) {
            setLog(prev => prev + `\nTranslation error: ${err}`);
        }
    };

    return (
        <main className="bg-aura-bg text-aura-fg flex min-h-screen font-mono">
            {/* Sidebar */}
            <aside className="bg-aura-bg-soft/40 border-aura-bg-soft/50 w-64 space-y-4 border-r p-6">
                <h1 className="text-aura-purple glow-purple text-xl font-bold">EPUB Pinyin</h1>
                {['Quickstart', 'Upload', 'Translate', 'Download'].map(label => (
                    <a
                        key={label}
                        href="#"
                        className="text-aura-fg/70 hover:text-aura-cyan hover:bg-aura-bg-soft/60 block rounded-md px-3 py-2 text-sm font-medium transition"
                    >
                        {label}
                    </a>
                ))}
            </aside>

            {/* Main */}
            <section className="max-w-4xl flex-1 space-y-8 p-8">
                <header>
                    <h2 className="text-aura-cyan text-3xl font-bold">Quickstart</h2>
                    <p className="text-aura-comment mt-2">
                        Translate Chinese EPUB files to inline Pinyin (and optional English).
                    </p>
                </header>

                {/* Step 1 */}
                <FileUploader file={file} log={log} onUploaded={setFile} updateLog={setLog} />

                {/* Step 2 */}

                <ConfigWindow
                    lang={lang}
                    kana={kana}
                    eng={eng}
                    rom={rom}
                    onChangeLang={setLang}
                    onChangeKana={setKana}
                    onChangeEng={setEng}
                    onChangeRom={setRom}
                />

                {/* Step 3 */}
                <div className="bg-aura-bg-soft/30 border-aura-bg-soft/50 rounded-lg border p-6">
                    <h3 className="text-aura-red mb-3 text-xl font-semibold">
                        3. Translate & download
                    </h3>
                    <select value={outFmt} onChange={e => setOutFmt(e.target.value)}>
                        <option value="txt">TXT</option>
                        <option value="json">JSON</option>
                        <option value="epub">EPUB</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <button
                        onClick={handleTranslate}
                        className="bg-aura-cyan text-aura-bg hover:bg-aura-cyan/80 rounded px-4 py-2 font-semibold transition"
                    >
                        Start Translation
                    </button>
                </div>

                {/* Terminal log */}
                <LogWindow log={log} />
            </section>
        </main>
    );
}

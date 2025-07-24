// components/ProcessingWindow.tsx
import { FC } from 'react';
import { SupportedLanguages, FileType } from '@/utils/enums';
import { startFileProcessing } from '@/utils/api';
import { Selector } from './Selector';

interface ProcessingWindowProps {
    lang: SupportedLanguages;
    kana: boolean;
    eng: boolean;
    rom: boolean;
    log: string;
    outFmt: string;
    file: File | null; // Add file prop
    setOutFmt: (fmt: string) => void;
    setLog: (log: string) => void; // Add log updater function prop
}

export const ProcessingWindow: FC<ProcessingWindowProps> = ({
    lang,
    kana,
    eng,
    rom,
    log,
    outFmt,
    setOutFmt,
    setLog,
    file, // Pass the file prop
}) => {
    // Define the handleTranslate function within the component
    const handleTranslate = async () => {
        try {
            setLog(log + `\nStarting translation...`);

            if (!file) {
                setLog(log + `\nNo file uploaded yet.`);
                return;
            }

            await startFileProcessing(file.name, file.type, lang, kana, eng, rom, outFmt);

            setLog(log + `\nTranslation finished.`);
        } catch (err) {
            setLog(log + `\nTranslation error: ${err}`);
        }
    };

    return (
        <div className="bg-aura-bg-soft/30 border-aura-bg-soft/50 space-y-4 rounded-lg border p-6">
            <h3 className="text-aura-red mb-3 text-xl font-semibold">3. Translate & download</h3>
            <Selector
                label="Choose Output File Type"
                value={outFmt}
                onChange={value => setOutFmt(value)} // Accept value directly
                options={[
                    { label: 'Text', value: FileType.TXT },
                    { label: 'JSON', value: FileType.JSON },
                    { label: 'Epub', value: FileType.EPUB },
                    { label: 'PDF', value: FileType.PDF },
                ]}
                className={`
                    bg-aura-bg-soft border-aura-bg-soft/50 text-aura-fg w-full rounded border px-3
                    py-2 text-sm transition
                    focus:ring-aura-cyan focus:border-aura-cyan focus:ring-1
                `}
            />
            <button
                onClick={handleTranslate}
                className={`
                    bg-aura-cyan text-aura-bg rounded px-4 py-2 font-semibold transition
                    hover:bg-aura-cyan/80
                `}
            >
                Start Translation
            </button>
        </div>
    );
};

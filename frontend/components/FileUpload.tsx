// components/FileUploader.tsx
import { FC } from 'react';
import { uploadFile } from '../utils/api';
import { Button } from './Button';

interface FileUploaderProps {
    file: File | null;
    log: string;
    onUploaded: (file: File | null) => void;
    updateLog: (log: string) => void;
}

export const FileUploader: FC<FileUploaderProps> = ({ file, log, onUploaded, updateLog }) => {
    const handleUpload = async () => {
        if (!file) return alert('Please select a file');
        try {
            updateLog(log + `\nUploading: ${file.name}`);
            await uploadFile(file);
            onUploaded(file);
            updateLog(log + `\nUpload complete`);
        } catch (err) {
            updateLog(log + `\nUpload error: ${err}`);
        }
    };

    return (
        <div className="bg-aura-bg-soft/30 border-aura-bg-soft/50 space-y-4 rounded-lg border p-6">
            <h3 className="text-aura-green mb-3 text-xl font-semibold">1. Upload your file</h3>

            <input
                type="file"
                accept=".txt,.pdf,.epub"
                onChange={e => onUploaded(e.target.files?.[0] ?? null)}
                className={`
                    bg-aura-bg-soft border-aura-bg-soft/50 w-full rounded border px-2 py-1 text-sm
                    file:bg-aura-purple file:text-aura-bg file:mr-4 file:rounded file:border-0
                    file:px-3 file:py-1
                `}
            />

            <button
                onClick={handleUpload}
                disabled={!file}
                className={`
                    bg-aura-purple text-aura-bg w-full rounded px-4 py-2 font-semibold transition
                    hover:bg-aura-purple/80
                    disabled:opacity-50
                `}
            >
                Upload
            </button>

            <Button disabled={!file} onClick={handleUpload}>
                {' '}
                Start Processing File{' '}
            </Button>
        </div>
    );
};

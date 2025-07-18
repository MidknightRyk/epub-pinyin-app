// components/FileUploader.tsx
import { useState, FC } from 'react';
import { uploadFile } from '../utils/api';

interface FileUploaderProps {
    file?: File;
    log: string;
    onUploaded: (file: File | null) => void;
    updateLog: (line: string) => void;
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
        <div className="p-6 bg-aura-bg-soft/30 rounded-lg border border-aura-bg-soft/50 space-y-4">
            <h3 className="text-xl font-semibold text-aura-green mb-3">1. Upload your file</h3>

            <input
                type="file"
                accept=".txt,.pdf,.epub"
                onChange={e => onUploaded(e.target.files?.[0] ?? null)}
                className="w-full text-sm bg-aura-bg-soft border border-aura-bg-soft/50 rounded px-2 py-1 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-aura-purple file:text-aura-bg"
            />

            <button
                onClick={handleUpload}
                disabled={!file}
                className="w-full bg-aura-purple text-aura-bg font-semibold px-4 py-2 rounded hover:bg-aura-purple/80 disabled:opacity-50 transition"
            >
                Upload
            </button>
        </div>
    );
};

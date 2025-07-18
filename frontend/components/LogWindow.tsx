// components/LogWindow.tsx
import { useState, FC } from 'react';
import { uploadFile } from '../utils/api';
import { LanguageSelector, SupportedLang } from './LanguageSelection';

interface LogWindowProps {
    log: string;
    classname?: string;
}

export const LogWindow: FC<LogWindowProps> = ({ log, classname = '' }) => {
    return (
        <div className={classname}>
            <details className="mt-6">
                <summary className="cursor-pointer text-aura-cyan font-semibold">
                    Output log
                </summary>
                <pre className="mt-2 p-4 bg-aura-bg-soft/20 rounded text-sm text-aura-comment overflow-x-auto">
                    {log}
                </pre>
            </details>
        </div>
    );
};

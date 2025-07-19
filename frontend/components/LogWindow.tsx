// components/LogWindow.tsx
import { FC } from 'react';

interface LogWindowProps {
    log: string;
    className?: string;
}

export const LogWindow: FC<LogWindowProps> = ({ log, className = '' }) => {
    return (
        <div className={className}>
            <details className="mt-6">
                <summary className="text-aura-cyan cursor-pointer font-semibold">
                    Output log
                </summary>
                <pre
                    className={`
                        bg-aura-bg-soft/20 text-aura-comment mt-2 overflow-x-auto rounded p-4
                        text-sm
                    `}
                >
                    {log}
                </pre>
            </details>
        </div>
    );
};

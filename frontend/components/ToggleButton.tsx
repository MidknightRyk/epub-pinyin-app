// components/ToggleButton.tsx
import { FC, ReactNode } from 'react';

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    active,
    onClick,
    children,
    className = '',
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`text-aura-bg bg-aura-purple focus:ring-aura-cyan cursor-pointer rounded px-4 py-2 text-sm font-semibold transition-all duration-200 focus:ring-1 focus:outline-none ${
            active
                ? 'ring-offset-aura-bg ring-aura-purple shadow-[0_0_8px_#a277ff] ring-2 ring-offset-2'
                : 'hover:bg-aura-purple/80'
        } ${className} `}
    >
        {children}
    </button>
);

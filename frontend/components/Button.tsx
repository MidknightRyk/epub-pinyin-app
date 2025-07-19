// components/Button.tsx
import { FC, ReactNode } from 'react';

interface ButtonProps {
    active?: boolean;
    onClick: () => void;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    active = false,
    onClick,
    children,
    className = '',
    disabled = false,
}) => (
    <button
        type="submit" // Default type is submit, can be changed as needed
        onClick={onClick}
        disabled={disabled}
        className={`
            bg-aura-purple text-aura-bg
            ${
    active
        ? `ring-offset-aura-bg ring-aura-purple shadow-[0_0_8px_#a277ff] ring-2 ring-offset-2`
        : `hover:bg-aura-purple/80`
    }
            ${className}
            cursor-pointer rounded px-4 py-2 text-sm font-semibold transition-all
            ${
    disabled ? `opacity-50` : ''
    }
        `}
    >
        {children}
    </button>
);

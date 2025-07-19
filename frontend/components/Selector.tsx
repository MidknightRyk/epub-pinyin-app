// components/Selector.tsx
import { FC } from 'react';

interface SelectorProps<T> {
    value: T;
    onChange: (newValue: T) => void;
    options: { label: string; value: T }[];
    className?: string;
    label?: string;
}

export const Selector: FC<SelectorProps<string>> = ({
    value,
    onChange,
    options,
    className = '',
    label = 'Select an option',
}) => (
    <div>
        <label className="text-aura-fg block pb-4 text-sm font-medium">{label}</label>
        <div className={`
            space-y-3
            ${className}
        `}>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`
                    bg-aura-bg-soft border-aura-bg-soft/50 text-aura-fg w-full rounded border px-3
                    py-2 text-sm transition
                    focus:ring-aura-cyan focus:border-aura-cyan focus:ring-1
                `}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

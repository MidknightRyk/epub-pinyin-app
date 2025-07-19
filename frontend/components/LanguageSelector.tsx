// components/LanguageSelector.tsx
import { FC } from 'react';
import { SupportedLanguages } from '@/utils/enums';
import { Selector } from './Selector'; // Adjust the import path as necessary

interface LanguageSelectorProps {
    lang: SupportedLanguages;
    onChangeLang: (lang: SupportedLanguages) => void;
    className?: string;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
    lang,
    onChangeLang,
    className = '',
}) => (
    <div className={`
        space-y-3
        ${className}
    `}>
        {/* Language selector */}
        <Selector
            label="Language To Be Processed"
            value={lang}
            onChange={value => onChangeLang(value as SupportedLanguages)} // Accept value directly
            options={[
                { label: 'Chinese', value: SupportedLanguages.Chinese },
                { label: 'Japanese', value: SupportedLanguages.Japanese },
                { label: 'Korean', value: SupportedLanguages.Korean },
            ]}
            className={`
                bg-aura-bg-soft border-aura-bg-soft/50 text-aura-fg w-full rounded border px-3 py-2
                text-sm transition
                focus:ring-aura-cyan focus:border-aura-cyan focus:ring-1
            `}
        />
    </div>
);

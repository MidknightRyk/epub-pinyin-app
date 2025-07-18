// components/LanguageSelector.tsx
import { FC } from 'react';
import { SupportedLanguages } from '@/utils/enums';

interface LanguageSelectorProps {
    lang: SupportedLanguages;
    kana: boolean;
    onChangeLang: (lang: SupportedLanguages) => void;
    onChangeKana: (kana: boolean) => void;
    className?: string;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
    lang,
    kana,
    onChangeLang,
    onChangeKana,
    className = '',
}) => (
    <div className={`space-y-3 ${className}`}>
        <label className="text-aura-fg block text-sm font-medium">Language To Be Processed</label>

        <select
            value={lang}
            onChange={e => onChangeLang(e.target.value as SupportedLanguages)}
            className="bg-aura-bg-soft border-aura-bg-soft/50 text-aura-fg focus:ring-aura-cyan focus:border-aura-cyan w-full rounded border px-3 py-2 text-sm transition focus:ring-1"
        >
            <option value={SupportedLanguages.Chinese}>Chinese</option>
            <option value={SupportedLanguages.Japanese}>Japanese</option>
            <option value={SupportedLanguages.Korean}>Korean</option>
        </select>
    </div>
);

// components/ConfigWindow.tsx
import { FC } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { SupportedLanguages } from '@/utils/enums';
import { ToggleButton } from './ToggleButton';

interface ConfigWindowProps {
    lang: SupportedLanguages;
    kana: boolean;
    eng: boolean;
    rom: boolean;
    onChangeEng: (eng: boolean) => void;
    onChangeLang: (lang: SupportedLanguages) => void;
    onChangeKana: (kana: boolean) => void;
    onChangeRom: (rom: boolean) => void;
}

export const ConfigWindow: FC<ConfigWindowProps> = ({
    lang,
    kana,
    eng,
    rom,
    onChangeLang,
    onChangeKana,
    onChangeEng,
    onChangeRom,
}) => (
    <div className="bg-aura-bg-soft/30 border-aura-bg-soft/50 space-y-4 rounded-lg border p-6">
        <h3 className="text-aura-orange text-xl font-semibold">2. Configure translation</h3>

        {/* Language selector */}
        <LanguageSelector lang={lang} onChangeLang={onChangeLang} />

        {/* Buttons row */}
        <div className="flex items-center gap-6">
            <ToggleButton active={eng} onClick={() => onChangeEng(!eng)}>
                Include English translations
            </ToggleButton>

            <ToggleButton active={rom} onClick={() => onChangeRom(!rom)}>
                Include Phonetic Transliterations
            </ToggleButton>
        </div>

        <div className="h-10">
            {lang === SupportedLanguages.Japanese && (
                <ToggleButton active={kana} onClick={() => onChangeKana(!kana)} className="!h-12">
                    Add Kana for Kanji
                </ToggleButton>
            )}
        </div>
    </div>
);

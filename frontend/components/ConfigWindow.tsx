// components/ConfigWindow.tsx
import { FC } from 'react';
import { LanguageSelector } from './LanguageSelection';
import { SupportedLanguages } from '@/utils/enums';

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

        {/* Language selector (always present) */}
        <LanguageSelector
            lang={lang}
            kana={kana}
            onChangeLang={onChangeLang}
            onChangeKana={onChangeKana}
        />

        {/* Buttons row */}
        <div className="flex items-center gap-6">
            <button
                type="button"
                onClick={() => onChangeEng(!eng)}
                className={`text-aura-bg bg-aura-purple flex-1 rounded px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    eng
                        ? 'ring-offset-aura-bg ring-aura-purple shadow-[0_0_8px_#a277ff] ring-2 ring-offset-2'
                        : 'hover:bg-aura-purple/80'
                } `}
            >
                Include English translations
            </button>

            <button
                type="button"
                onClick={() => onChangeRom(!rom)}
                className={`text-aura-bg bg-aura-purple flex-1 rounded px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    rom
                        ? 'ring-offset-aura-bg ring-aura-purple shadow-[0_0_8px_#a277ff] ring-2 ring-offset-2'
                        : 'hover:bg-aura-purple/80'
                } `}
            >
                Include Romanji/Pinyin
            </button>
        </div>

        <div className="h-10">
            {lang === SupportedLanguages.Japanese && (
                <button
                    type="button"
                    onClick={() => onChangeKana(!kana)}
                    className={`text-aura-bg bg-aura-purple w-full rounded px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        kana
                            ? 'ring-offset-aura-bg ring-aura-purple shadow-[0_0_8px_#a277ff] ring-2 ring-offset-2'
                            : 'hover:bg-aura-purple/80'
                    } `}
                >
                    Add kana for kanji
                </button>
            )}
        </div>
    </div>
);

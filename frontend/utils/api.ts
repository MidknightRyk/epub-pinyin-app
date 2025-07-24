// utils/api.ts
import axios from 'axios';

const BASE_URL = '/api';

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const startFileProcessing = async (
    filename: string,
    filetype: string,
    lang: string,
    kana: boolean,
    eng: boolean,
    rom: boolean,
    outFmt: string,
) => {
    return axios.post(`${BASE_URL}/translate`, {
        filename,
        filetype,
        lang,
        kana,
        eng,
        rom,
        outFmt,
    });
};

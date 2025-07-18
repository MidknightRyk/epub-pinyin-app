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

export const startTranslation = async (
    filename: string,
    showPinyin: boolean,
    showEnglish: boolean,
) => {
    return axios.post(`${BASE_URL}/translate`, {
        filename,
        options: {
            showPinyin,
            showEnglish,
        },
    });
};

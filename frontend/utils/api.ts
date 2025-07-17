// utils/api.ts
import axios from 'axios';

const BASE_URL = '/api'; // remi backend

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const startTranslation = async (includeEnglish: boolean, resumeChapter: string) => {
  return axios.post(`${BASE_URL}/translate`, {
    include_english: includeEnglish,
    resume_from: resumeChapter,
  });
};

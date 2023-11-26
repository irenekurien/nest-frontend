import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN } from 'const';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type RequestReturn<T> = {
    data: T | null;
    error: AxiosError | null;
};

export const request = async <T extends unknown>(
    options: AxiosRequestConfig,
    headers: any = { 'Content-Type': `application/json` }
): Promise<RequestReturn<T>> => {
    const token = localStorage.getItem('token');

    if (token) {
        headers['Authorization'] = `Bearer ${encodeURIComponent(token)}`;
    }
    Object.assign(options, { headers });
    try {
        const { data } = await axios(options);
        return { error: null, data };
    } catch (error: any) {
        return { error, data: null };
    }
};

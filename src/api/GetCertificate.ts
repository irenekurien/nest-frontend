import { AxiosRequestConfig } from 'axios';
import { RequestReturn, request } from '../config';

export const getCertificate = async (id: string): Promise<RequestReturn<any>> => {
    const url = `http://localhost:5000/agreements/download/${id}`;

    const options: AxiosRequestConfig = {
        method: 'get',
        url,
    };

    const { data, error } = await request<any>(options);

    return { data, error };
};

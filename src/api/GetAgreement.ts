import { AxiosRequestConfig } from 'axios';
import { RequestReturn, request } from '../config';

export const getAgreement = async (id: string): Promise<RequestReturn<any>> => {
    const url = `http://localhost:5000/agreements/${id}`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url,
    };

    const { data, error } = await request<any>(options);

    return { data, error };
};

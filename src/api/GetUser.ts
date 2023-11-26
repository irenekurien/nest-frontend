import { AxiosRequestConfig } from 'axios';
import { RequestReturn, request } from '../config';

export const getUser = async (): Promise<RequestReturn<any>> => {
    const url = 'http://localhost:5000/auth/me';

    const options: AxiosRequestConfig = {
        method: 'get',
        url,
    };

    const { data, error } = await request<any>(options);

    return { data, error };
};

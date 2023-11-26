import { AxiosRequestConfig } from 'axios';
import { RequestReturn, request } from '../config';

type PostData = {
    user1Name: string;
    user1Email: string;
    user2Name: string;
    user2Email: string;
};

export const createNewAgreement = async (postData: PostData): Promise<RequestReturn<any>> => {
    const url = 'http://localhost:5000/agreements/new';

    const options: AxiosRequestConfig = {
        method: 'post',
        url,
        data: postData,
    };

    console.log(options)

    const { data, error } = await request(options);

    return { data, error };
};

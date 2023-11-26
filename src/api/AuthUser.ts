import { AxiosRequestConfig } from 'axios';
import { RequestReturn, request } from '../config';

type PostData = {
    name?: string;
    email: string;
    password: string;
};

export const authUser = async (
    postData: PostData,
    isSignUp: boolean
): Promise<RequestReturn<any>> => {
    const url = isSignUp
        ? 'http://localhost:5000/auth/signup'
        : 'http://localhost:5000/auth/signin';

    const options: AxiosRequestConfig = {
        method: 'post',
        url,
        data: postData,
    };

    const { data, error } = await request(options);

    return { data, error };
};

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { Base64 } from 'js-base64';
import { PROJECTSERVER } from '@/config/host';

export function login(username: string,password: string): AxiosPromise {
    password=Base64.encode(password);
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/user/login`,
        method: 'post',
        data: {
            username: username,
            password: password
        }
    };
    return Base(config);
}

export function register(username: string,password: string,email: string|null): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/user/register`,
        method: 'post',
        data: {
            username: username,
            password: password,
            email:email
        }
    };
    return Base(config);
}

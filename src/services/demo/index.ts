import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { DEMOSERVER } from '@/config/host';
import { Params } from './interfaces';

// demo1
export function demo( params: Params ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${DEMOSERVER}/demo/index`,
        method: 'post',
        data: params
    };
    return Base(config);
}

// demo1
export function demo2( id: string ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${DEMOSERVER}/demo/index`,
        method: 'post',
        data: {
            id
        }
    };
    return Base(config);
}

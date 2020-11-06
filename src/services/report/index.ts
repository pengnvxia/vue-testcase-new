import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';

export function reportList( id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/report/list/${id}`,
        method: 'get'
    };
    return Base(config);
}

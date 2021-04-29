import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';

export function reportList( id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/report/list/${id}`,
        method: 'get'
    };
    return Base(config);
    // url: `${PROJECTSERVER}/report/list/${id}?group=${group}`,

}

export function groupReportList( id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/report/group/list/${id}`,
        method: 'get'
    };
    return Base(config);
}

export function reportDetails( id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/report/detail/${id}`,
        method: 'get'
    };
    return Base(config);
}

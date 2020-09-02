import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';
import { Testcase } from './interfaces';


export function addTestcase( id: number,testcase: Testcase ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/add/${id}`,
        method: 'post',
        data: testcase
    };
    return Base(config);
}

export function interfaceInfo(id:number) {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/${id}`,
        method: 'get',
    };
    return Base(config);

}

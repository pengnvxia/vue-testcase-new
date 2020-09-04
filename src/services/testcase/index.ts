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

export function interfaceInfo(id:number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/${id}`,
        method: 'get',
    };
    return Base(config);

}

export function deleteTestcase(id:number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/delete/${id}`,
        method: 'delete',
    };
    return Base(config);
}

export function testcaseInfo(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/case/${id}`,
        method: 'get',
    };
    return Base(config);

}

export function editTestcase(id: number, testcase: Testcase): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/edit/${id}`,
        method: 'post',
        data: testcase
    };
    return Base(config);
}

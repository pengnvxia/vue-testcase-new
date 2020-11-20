import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';
import { Group } from './interfaces';

export function searchList(current:number,size:number,groupName?:string|null,projectName?:string|null,envId?:number|null): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/search/list`,
        method: 'post',
        data: {
            current: current,
            size: size,
            groupName: groupName,
            projectName: projectName,
            envId: envId
        }
    };
    return Base(config);
}

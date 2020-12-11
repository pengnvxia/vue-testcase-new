import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';
import { Group, GroupDetail} from './interfaces';


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

export function runGroup(groupIds: number[]): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/run`,
        method: 'post',
        data: groupIds
    };
    return Base(config);
}

export function deleteGroup(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/delete/${id}`,
        method: 'delete'
    };
    return Base(config);
}


export function addGroup(groupDetail: GroupDetail): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/add`,
        method: 'post',
        data: groupDetail
    };
    return Base(config);
}

export function groupDetail(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/detail/${id}`,
        method: 'get'
    };
    return Base(config);
}

export function editGroup(groupDetail: GroupDetail): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/group/edit`,
        method: 'post',
        data: groupDetail
    };
    return Base(config);
}

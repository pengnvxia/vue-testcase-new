import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';
import {ConfigVar} from "@/services/testcaseConfig/interfaces";


export function configList(projectId: number,envId: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/config/list`,
        method: 'post',
        data: {
            projectId: projectId,
            envId: envId
        }
    };
    return Base(config);
}

export function searchConfig(current: number,size: number,configName? : string,envId? : number|null,projectName? : string,lastUpdatedBy? : string): AxiosPromise{
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/search/list`,
        method: 'post',
        data: {
            configName: configName,
            projectName: projectName,
            lastUpdatedBy: lastUpdatedBy,
            envId: envId,
            current: current,
            size: size
        }
    };
    return Base(config);
}

export function configCreate(configVar: ConfigVar): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/create`,
        method: 'post',
        data: configVar
    }
    return Base(config);
}

export function configEdit(id: number,configVar: ConfigVar): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/edit/${id}`,
        method: 'post',
        data: configVar
    }
    return Base(config);
}

export function configDetail(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/detail/${id}`,
        method: 'get'
    }
    return Base(config);
}


export function configDelete(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/delete/${id}`,
        method: 'delete'
    }
    return Base(config);
}

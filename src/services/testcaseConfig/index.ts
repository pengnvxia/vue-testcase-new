import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';

export function searchConfig(configName : string,projectId : number,lastUpdatedBy : string,envId : number): AxiosPromise{
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/config/search/list`,
        method: 'post',
        data: {
            configName: configName,
            projectId: projectId,
            lastUpdatedBy: lastUpdatedBy,
            envId: envId
        }
    };
    return Base(config);
}

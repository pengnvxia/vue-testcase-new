import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';
import { Project } from './interfaces';


export function addProject( project: Project ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/add`,
        method: 'post',
        data: project
    };
    return Base(config);
}



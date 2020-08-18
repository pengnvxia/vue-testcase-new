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

export function editProject( project: Project ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/edit/${project.id}`,
        method: 'post',
        data: project
    };
    return Base(config);
}

export function getProjectList(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/list`,
        method: 'get',
    };
    return Base(config);
}

export function deleteProject(id: number) {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/delete/${id}`,
        method: 'delete',
    };
    return Base(config);

}

export function getProject(id: String) {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/${id}`,
        method: 'get'
    }
    return Base(config);
}

export function getModuleList(envId: number,repositoryId: number){
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/module/list`,
        method: 'post',
        data: {
            envId: envId,
            repositoryId: repositoryId
        }
    }
    return Base(config);
}

export function getInterfaceList(envId: number, repositoryId: number, moduleId: number){
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/project/interface/list`,
        method: 'post',
        data: {
            envId: envId,
            repositoryId: repositoryId,
            moduleId: moduleId
        }
    }
    return Base(config);
}



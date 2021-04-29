import {SearchDatabaseReq, DatabaseInfo} from "./interfaces";
import {AxiosPromise, AxiosRequestConfig} from "axios";
import {PROJECTSERVER} from "@/config/host";
import Base from "@/services/base";

export function searchDatabase( searchReq: SearchDatabaseReq ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/list`,
        method: 'post',
        data: searchReq
    };
    return Base(config);
}

export function deleteDatabase( id: number ): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/dbDel`,
        method: 'post',
        data: [id]
    };
    return Base(config);
}

export function addDatabase(databaseInfo: DatabaseInfo): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/createDb`,
        method: 'post',
        data: databaseInfo
    };
    return Base(config);
}

export function dbDetail(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/dbDetail/${id}`,
        method: 'get',
    };
    return Base(config);
}

export function editDatabase( databaseInfo: DatabaseInfo): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/updateDb`,
        method: 'post',
        data: databaseInfo
    };
    return Base(config);
}

export function dbMini(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/db/list/mini`,
        method: 'get'
    };
    return Base(config);
}



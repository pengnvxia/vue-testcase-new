export interface SearchDatabaseReq{
    current: number,
    pageSize: number,
    envId: number|null,
    dbName: string|null
}

export interface DatabaseInfo{
    id: number|null,
    dbName: string,
    host: string,
    port: number|null,
    username: string,
    password: string,
    envId: number,
    createTableSql: string,
    insertSql: string
}

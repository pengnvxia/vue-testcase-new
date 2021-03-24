export interface Group{
    id: number,
    groupName: string,
    projectId: number,
    projectName: string,
    envId: number,
    updatedBy?: string,
    updatedAt?: string,
    description?: string
}

export interface GroupDetail {
    id?: number,
    groupName: string,
    projectId: number,
    envId: number,
    testcaseIds: string,
    configIds?: string|null,
    variables?: Variable[],
    parameters?: Parameter[],
    setuphooks?: Setuphook[]
}

export interface Variable {
    id?: number,
    name: string,
    type: string,
    value: string,
    databaseId?: number
}

export interface Parameter {
    id?: number,
    name: string,
    value: string
}

export interface Setuphook {
    id?: number,
    sql: string,
    databaseId: number|null
}

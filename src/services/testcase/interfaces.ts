export interface Testcase {
    testcaseName: string,
    path: string,
    envId: number,
    configIds?: string,
    requestBody?: string,
    variables?: Variable[],
    parameters?: Parameter[],
    setuphooks?: Setuphook[],
    reqHeaders?: ReqHeader[],
    reqParams?: ReqParam[],
    responses?: Response[]
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
    keyName: string,
    value: string
}

export interface Setuphook {
    id?: number,
    sql: string,
    databaseId: number
}

export interface ReqHeader {
    id?: number,
    keyName: string,
    value: string

}

export interface ReqParam {
    id?: number,
    keyName: string,
    value: string
}

export interface Response {
    id?: number,
    name: string,
    type: string,
    comparator: string,
    expectedValue: string
}

export interface InterfaceInfo {
    interfaceName: string,
    interfaceAddress: string,
    interfaceMethod: string,
    description?: string
}

export interface Testcase {
    testcaseName: string,
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
    name: string,
    type: string,
    value: string,
    databaseId?: number
}

export interface Parameter {
    keyName: string,
    value: string
}

export interface Setuphook {
    sql: string,
    databaseId: number
}

export interface ReqHeader {
    keyName: string,
    value: string

}

export interface ReqParam {
    keyName: string,
    value: string
}

export interface Response {
    name: string,
    type: string,
    comparator: string,
    expectedValue: string
}

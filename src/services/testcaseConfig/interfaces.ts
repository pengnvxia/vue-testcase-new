export interface Variable {
    variableId?: number,
    name: string,
    type: string,
    value: string
}

export interface ConfigVar {
    configName: string,
    projectId: number|null,
    envId: number|null,
    description?: string|null,
    variablesList: Variable[]
}

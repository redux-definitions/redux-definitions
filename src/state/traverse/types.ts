export interface IAny {
  [key: string]: any
}

export interface IModelDefinition {
  kind: 'definition'
  actions: IAny
  initialState: {}
  reducers: IAny
  selectors: IAny
}

export interface IModelFunction {
  kind: 'function'
  action: IAny
  reducers: IAny
}

export interface IReducerDefinition {
  generate: (namespacing: string[], topLevel?: boolean) => IModelDefinition
}

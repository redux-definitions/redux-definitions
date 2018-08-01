export interface ISelector<State> {
  <P>(state: State): P
  <T extends {}, P>(state: State, params: T): P
}

export interface ISelectorMap<State> {
  [name: string]: ISelector<State>
}

export interface ISelectorMaps {
  [key: string]: ISelectorMap<any>
}

export interface IRootSelectorMaps {
  [key: string]: ISelectorMaps
}

export type IMappedSelectorMaps<ReducerSchema> = {
  [Key in keyof ReducerSchema]: ISelectorMap<{}>
}
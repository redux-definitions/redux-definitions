export type Selector<State> = (state: State, params?: any) => any

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export interface ISelectorMaps {
  [name: string]: ISelectorMap<{}>
}

export interface IRootSelectorMaps {
  [name: string]: ISelectorMaps
}
export type Selector<State> = (state: State, params?: any) => any

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export interface ISelectorMaps<State> {
  [name: string]: ISelectorMap<State>
}

export interface IRootSelectorMaps<State> {
  [name: string]: ISelectorMaps<State>
}
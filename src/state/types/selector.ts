export type Selector<State> = {
  <P>(state: State): P
  <T extends {}, P>(state: State, params: T): P
}

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export type IMappedSelectorMap<State, Selectors extends ISelectorMap<State>> = {
  [Key in keyof Selectors]: Selectors[Key]
}

export type ISelectorMaps = {
  [key: string]: ISelectorMap<any>
}

export type IMappedSelectorMaps<ReducerSchema> = {
  [Key in keyof ReducerSchema]: ISelectorMap<{}>
}

export type IRootSelectorMaps<Schema> = {
  [Key in keyof Schema]: IMappedSelectorMaps<Schema[Key]>
}

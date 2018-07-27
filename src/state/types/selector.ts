export type Selector<State> = (state: State, params?: any) => any

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export type IMappedSelectorMap<State, Schema> = {
  [Key in keyof Schema]: Selector<State>
}

export type ISelectorMaps = {
  [key: string]: ISelectorMap<{}>
}

export type IMappedSelectorMaps<ReducerSchema> = {
  [Key in keyof ReducerSchema]: ISelectorMap<{}>
}

export type IRootSelectorMaps<Schema> = {
  [Key in keyof Schema]: IMappedSelectorMaps<Schema[Key]>
}

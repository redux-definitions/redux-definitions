export type TransformInitialState<LocalState> = (state: any, params: { namespacing: string[] }) => LocalState
export interface IGetFormattedInitialState<LocalState> {
  initialState: any
  transformInitialState?: TransformInitialState<LocalState>
  namespacing: string[]
  defaultState: LocalState
}

export const getFormattedInitialState = <LocalState>(params: IGetFormattedInitialState<LocalState>) => {
  const {
    initialState,
    transformInitialState = (((s) => s) as TransformInitialState<LocalState>),
    namespacing,
    defaultState,
  } = params

  const formattedInitialState = initialState !== undefined ?
      transformInitialState(initialState, { namespacing }) : defaultState

  return formattedInitialState
}
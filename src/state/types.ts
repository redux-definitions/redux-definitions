import { Action, ActionFunction1, Reducer } from 'redux-actions'

export type ActionCreator<Payload> = ActionFunction1<Payload, Action<Payload>> 

export interface IActionCreatorMap {
  [name: string]: ActionCreator<any> | IActionCreatorMap
}

export interface IReducerMap<State> {
  [name: string]: Reducer<State, any> | IReducerMap<State>
}

export type Selector<State> = (state: State, params?: any) => any
export interface ISelectorMap<State> {
  [name: string]: Selector<State> | ISelectorMap<State>
}
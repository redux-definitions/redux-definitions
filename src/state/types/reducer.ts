import { Reducer as BaseReducer } from 'redux-actions'

export type Reducer<State> = BaseReducer<State, any>

export interface IReducerMap<State> {
  [name: string]: Reducer<State>
}
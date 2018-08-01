import { Action, ActionFunction1 } from 'redux-actions'

export type ActionCreator = <Payload>(payload?: Payload) => Action<Payload>

export interface IActionCreatorMap {
  [name: string]: ActionCreator
}

export interface IActionCreatorMaps {
  [key: string]: IActionCreatorMap
}

export type IMappedActionCreatorMaps<ReducerSchema> = {
  [Key in keyof ReducerSchema]: IActionCreatorMap
}

export interface IRootActionCreatorMaps {
  [key: string]: IActionCreatorMaps
}
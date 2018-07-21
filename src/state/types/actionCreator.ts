import { Action, ActionFunction1 } from 'redux-actions'

export type ActionCreator<Payload> = ActionFunction1<Payload, Action<Payload>> 

export interface IActionCreatorMap {
  [name: string]: ActionCreator<any>
}

export interface IActionCreatorMaps {
  [name: string]: IActionCreatorMap
}

export interface IRootActionCreatorMaps {
  [name: string]: IActionCreatorMaps
}
import { Action, ActionFunction1 } from 'redux-actions'

export type ActionCreator<Payload> = ActionFunction1<Payload, Action<Payload>> 

export interface IActionCreatorMap {
  [name: string]: ActionCreator<any>
}

export type IActionCreatorMaps = {
  [key: string]: IActionCreatorMap
}

export type IMappedActionCreatorMaps<ReducerSchema> = {
  [Key in keyof ReducerSchema]: IActionCreatorMap
}

export type IRootActionCreatorMaps<Schema> = {
  [Key in keyof Schema]: IMappedActionCreatorMaps<Schema[Key]>
}
import { IReducerDefinition } from './definition'

export interface IReducerSchema {
  [key: string]: IReducerDefinition
}

export interface ISchema {
  [key: string]: IReducerSchema
}
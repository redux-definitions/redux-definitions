import { ICompiledDefinition } from './definition'

export interface IReducerSchema {
  [key: string]: ICompiledDefinition
}

export interface ISchema {
  [key: string]: IReducerSchema
}
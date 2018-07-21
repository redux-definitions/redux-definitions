import { IReducerDefinition } from './definition'

// User schema
export interface ISchema {
  [key: string]: {
    [key: string]: IReducerDefinition
  }
}
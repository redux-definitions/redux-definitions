import { find } from 'lodash'
import { Action } from 'redux-actions'
import Normalized, { INorm, IEntity } from '../../utils/nrmlzd'
import { createDefinition } from '../../state/createDefinition'
import { logWarning, makeError } from '../../utils'

const isEntity = (arg: any): arg is IEntity =>
  typeof arg === 'object' && arg.id

const validateEntity = (o: any) => {
  if (!isEntity(o)) {
    throw makeError('Collection - Entity has no `id` key')
  }
  return o as IEntity
}

const validateEntities = (list: any[]) => list.map(validateEntity)

type State = INorm

export default createDefinition({
  reducers: {
    create: (state: State, { payload: entity }: Action<IEntity>): State => {
      if(!entity || !validateEntity(entity)) {
        return state
      }
      if (find(state.ids, (id: string) => id === entity.id)) {
        logWarning(`Collection already has an entity with id: ${entity.id}`)
      }
      return Normalized.upsert(state, entity)
    },
    remove: (state: State, { payload: id }: Action<string|string[]>): State => {
      if (!id) {
        return state
      }
      return Normalized.remove(state, id)
    },
    reset: (): State => Normalized.create(),
    set: (state: State, { payload: entities }: Action<IEntity[]>): State => {
      if (!entities || !validateEntities(entities)) {
        return state
      }
      return Normalized.fromArray(entities)
    },
    update: (state: State, { payload: entity }: Action<IEntity>): State => {
      if(!entity || !validateEntity(entity)) {
        return state
      }
      if (!find(state.ids, (id: string) => id === entity.id)) {
        logWarning(`Collection did not have an entity with id: ${entity.id}. Entity has been added.`)
      }
      return Normalized.upsert(state, entity)
    },
    upsert: (state: State, { payload: entity }: Action<IEntity>): State => {
      if(!entity || !validateEntity(entity)) {
        return state
      }
      return Normalized.upsert(state, entity)
    }
  },
  defaultState: Normalized.create(),
  selectors: {
    find: (state: State, params: { id: string }|undefined = undefined): IEntity|undefined =>
      params && params.id ? state.entities[params.id] : undefined,
    get: (state: State): State => state,
    ids: (state: State): string[] => state.ids,
    all: (state: State): IEntity[] => Normalized.toArray(state),
    count: (state: State): number => state.ids.length,
  },
  transformInitialState: (initialState: IEntity[]): INorm =>
    Normalized.fromArray(validateEntities(initialState)),
})
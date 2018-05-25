import { find } from 'lodash'
import { Action } from 'redux-actions'
import Normalized, { INorm, Item } from '../../nrmlzd'
import { createDefinition } from 'state/createDefinition'
import { logWarning, makeError } from 'utils'

const isItem = (arg: any): arg is Item =>
  typeof arg === 'object' && arg.id

const validateItem = (o: any) => {
  if (!isItem(o)) {
    throw makeError('Collection - Item has no `id` key')
  }
  return o as Item
}

const validateItems = (list: any[]) => list.map(validateItem)

type State = INorm

export default createDefinition<State>({
  actions: {
    create: (state: State, { payload: item }: Action<Item>): State => {
      if(!item || !validateItem(item)) {
        return state
      }
      if (find(state.ids, (id: string) => id === item.id)) {
        logWarning(`Collection already has an item with id: ${item.id}`)
      }
      return Normalized.upsert(state, item)
    },
    remove: (state: State, { payload: id }: Action<string>): State => {
      if (!id) {
        return state
      }
      return Normalized.remove(state, id)
    },
    reset: (): State => Normalized.create(),
    set: (state: State, { payload: items }: Action<Item[]>): State => {
      if (!items|| !validateItems(items)) {
        return state
      }
      return Normalized.fromArray(items)
    },
    update: (state: State, { payload: item }: Action<Item>): State => {
      if(!item || !validateItem(item)) {
        return state
      }
      if (find(state.ids, (id: string) => id === item.id)) {
        return state
      }
      return Normalized.upsert(state, item)
    },
    upsert: (state: State, { payload: item }: Action<Item>): State => {
      if(!item || !validateItem(item)) {
        return state
      }
      return Normalized.upsert(state, item)
    }
  },
  defaultState: Normalized.create(),
  selectors: {
    byId: (state: State, { id }: { id: string }): Item|undefined =>
      state.data[id] || undefined,
    get: (state: State): State => state,
    ids: (state: State): string[] => state.ids,
    items: (state: State): Item[] => Normalized.toArray(state),
  },
  transformInitialState: (initialState: Item[]): INorm =>
    Normalized.fromArray(validateItems(initialState)),
})


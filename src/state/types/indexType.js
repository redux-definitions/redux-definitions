/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'
import { uniq, without } from 'lodash/array'
import { scopeReductionFactory } from './utils'
import { createDefinition } from './utils'

const generateFactory = ({ initialState = { index: [] } }) => createDefinition({
  set: (state, { payload }) => ({
    index: payload
  }),
  reset: (state) => ({
    index: []
  }),
  toggle: (state, { payload }) => {
    const found = state.index.find(e => e === payload)
    return {
      index: found
        ? without(state.index, payload)
        : uniq([...state.index, payload])
    }
  },
  add: (state, { payload }) => ({
    index: uniq([...state.index, payload])
  }),
  remove: (state, { payload }) => ({
    index: without(state.index, payload)
  })
}, {
  get: (state) => state.index,
  includes: (state, id) => state.index.includes(id),
}, initialState)

const Type = ({ initialState }) => {
  return {
    generate: generateFactory({ initialState })
  }
}

Type.generate = generateFactory({})

export default Type

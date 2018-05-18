import { uniq, without } from 'lodash/array'
import { createStateType } from 'state/createStateType'

export default createStateType({
  defaultState: { index: [] },
  actions: {
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
  },
  selectors: {
    get: (state) => state.index,
    includes: (state, { id }) => state.index.includes(id),
  },
  transformInitialState: (initialState) => ({
    index: initialState
  })
})


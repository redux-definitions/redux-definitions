import { createStateType } from 'state/createStateType'

export default createStateType({
  defaultState: undefined,
  actions: {
    set: (state, { payload }) => payload,
    clear: () => undefined,
  },
  selectors: {
    isSet: (state) => !!state,
    get: (state) => state,
  },
})


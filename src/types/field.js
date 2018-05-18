import { createStateType } from 'state/createStateType'

export default createStateType({
  defaultState: undefined,
  actions: {
    set: (state, { payload }) => payload,
    unset: () => null,
  },
  selectors: {
    isSet: (state) => !!state,
    get: (state) => state,
  },
  invalidAtTopLevel: true,
})


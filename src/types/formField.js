import { createStateType } from 'state/createStateType'

export default createStateType({
  defaultState: {
    value: '',
    isValid: false,
    error: null,
    isDirty: false,
  },
  actions: ({ validators }) => ({
    set: (state, { payload }) => {
      const invalid = validators.find(([fn, _]) => !fn(payload))

      return {
        ...state,
        value: payload,
        isDirty: true,
        isValid: !!invalid,
        error: invalid && invalid[1],
      }
    },
    reset: () => initialState,
    unset: (state) => ({
      ...state,
      value: null,
    })
  }),
  selectors: {
    get: (state) => state,
    isSet: (state) => !!state.value,
    value: (state) => state.value,
    isValid: (state) => state.isValid,
    error: (state) => state.error,
  },
  transformInitialState: (initialState = {}) => ({
    value: '',
    isValid: false,
    error: null,
    isDirty: false,
    ...initialState,
  }),
})


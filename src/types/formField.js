import { createStateType } from 'state/createStateType'

const defaultState = {
  value: '',
  isValid: false,
  error: null,
  isDirty: false,
}

export default createStateType({
  defaultState,
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
    reset: () => defaultState,
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
    ...defaultState,
    ...initialState,
  }),
})


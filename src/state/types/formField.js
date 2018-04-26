/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'
import { createDefinition } from './utils'

export default ({ validators, value }) => {
  const initialState = {
    value,
    isValid: false,
    error: null,
    isDirty: false,
  }

  return {
    generate: createDefinition({
      set: (state, { payload }) => {
        const invalid = validators.find(([fn, err]) => !fn(payload))

        return {
          ...state,
          value: payload,
          isDirty: true,
          isValid: !!invalid,
          error: invalid && invalid[1],
        }
      },
      reset: () => {
        console.log('reset')
        return initialState
      },
      unset: (state) => {
        console.log('wew')
        return {
          ...state,
          value: null,
        }
      }
    }, {
      isSet: (state) => !!state.value,
      value: (state) => state.value,
      isValid: (state) => state.isValid,
      error: (state) => state.error,
    }, initialState, true)
  }
}

import { createDefinition } from './utils'

const generateFactory = ({
  validators = [],
  initialState = {
    value: '',
    isValid: false,
    error: null,
    isDirty: false,
  }
}) => createDefinition({
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
}, {
  isSet: (state) => !!state.value,
  value: (state) => state.value,
  isValid: (state) => state.isValid,
  error: (state) => state.error,
}, initialState, true)

const Type = ({ validators = [], initialState, initialValue }) => {
  const fullInitialState = initialState || {
    value: initialValue || '',
    isValid: false,
    error: null,
    isDirty: false,
  }

  return {
    generate: generateFactory({ initialState: fullInitialState, validators })
  }
}

Type.generate = generateFactory({})

export default Type

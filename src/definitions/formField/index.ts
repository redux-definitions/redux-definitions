import { createDefinition } from '../../state/createDefinition'
import { Action } from 'redux-actions';

const defaultState = {
  error: null,
  isDirty: false,
  isValid: false,
  value: '',
}

interface IState {
  error: string|null
  isDirty: boolean
  isValid: boolean
  value: string|null
}

type Validator = [(value: string) => boolean, string]

// wont let me use
interface IActionsParams {
  validators: Validator[]
}

export default createDefinition<IState>({
  reducers: ({ validators = [] }) => ({
    reset: (state: IState, action: Action<undefined>) => defaultState,
    set: (state: IState, { payload }: Action<string>) => {
      const invalid = validators.find(([fn, _]: [any, any]) => !fn(payload))

      return {
        ...state,
        error: invalid && invalid[1],
        isDirty: true,
        isValid: !!invalid,
        value: payload || null,
      }
    },
    unset: (state: IState, action: Action<undefined>) => ({
      ...state,
      value: null,
    })
  }),
  defaultState,
  selectors: {
    error: (state: IState) => state.error,
    get: (state: IState) => state,
    isSet: (state: IState) => !!state.value,
    isValid: (state: IState) => state.isValid,
    value: (state: IState) => state.value,
  },
  transformInitialState: (initialState = {}) => ({
    ...defaultState,
    ...initialState,
  }),
})


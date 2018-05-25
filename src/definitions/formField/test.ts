import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { FormField } = Definitions.labs

const formField = FormField({
  initialState: {
    value: 'flim'
  },
  validators: [
    [(val: any) => typeof val === 'string', 'str heh'],
    [(val: any) => val.length > 4, 'not long'],
  ],
})

describe('formField', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    const { models, store } = makeStoreAndDefineState({
      space: {
        field: formField
      }
    })

    const { actions, selectors } = models.space

    const state = {
      error: null,
      isDirty: false,
      isValid: false,
      value: 'flim',
    }

    expect(selectors.field.get(store.getState())).toEqual(state)
  })

  it('receives action', () => {
    const { models, store } = makeStoreAndDefineState({
      space: {
        field: formField
      }
    })

    const { actions, selectors } = models.space

    store.dispatch(actions.field.set('foobar'))

    expect(selectors.field.value(store.getState())).toEqual('foobar')
  })
})

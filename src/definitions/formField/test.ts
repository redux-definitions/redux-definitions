import { clearAllReducers, Definitions } from 'index'
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
    const { space, getState } = makeStoreAndDefineState({
      space: formField
    })

    const { actions, selectors } = space

    const state = {
      error: null,
      isDirty: false,
      isValid: false,
      value: 'flim',
    }

    expect((getState() as any).space).toEqual(state)
    expect(selectors.get(getState())).toEqual(state)
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: formField
        }
      })

      expect(space.selectors.foo.value(getState())).toEqual('flim')
    })

    it('receives action', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: formField
        }
      })

      dispatch(space.actions.foo.set('foobar'))

      expect(space.selectors.foo.value(getState())).toEqual('foobar')
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: {
            bar: formField
          }
        }
      })

      expect(space.selectors.foo.bar.value(getState())).toEqual('flim')
    })

    it('receives action', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: {
            bar: formField
          }
        }
      })

      dispatch(space.actions.foo.bar.set('foo'))
      expect(space.selectors.foo.bar.value(getState())).toEqual('foo')
    })
  })
})

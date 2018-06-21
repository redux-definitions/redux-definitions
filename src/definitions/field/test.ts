import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Field } = Definitions

describe('field', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    expect(() => makeStoreAndDefineState({
      space: Field
    })).toThrow('Redux Enterprise\n\nThis Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  })

  describe('actions', () => {
    it.only('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Field({
            initialState: 4
          })
        }
      })

      type Foo = string

      const { actions } = space

      expect(Object.keys(actions.foo)).toEqual([
        'clear',
        'set',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.get(getState())).toEqual(undefined)
      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(getState())).toEqual('bar')
    })

    it('clear', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(getState())).toEqual('bar')
      dispatch(actions.foo.clear())
      expect(selectors.foo.get(getState())).toEqual(undefined)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
        'isSet',
      ])
    })

    it('isSet', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.isSet(getState())).toEqual(true)
      dispatch(actions.foo.clear())
      expect(selectors.foo.isSet(getState())).toEqual(false)
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set('bar'))

      expect(selectors.foo.get(getState())).toEqual('bar')
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Field
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).toEqual(undefined)
    dispatch(actions.foo.set('foo'))
    expect(selectors.foo.get(getState())).toEqual('foo')
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Field
        }
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.bar.get(getState())).toEqual(undefined)
    dispatch(actions.foo.bar.set('foo'))
    expect(selectors.foo.bar.get(getState())).toEqual('foo')
  })
})

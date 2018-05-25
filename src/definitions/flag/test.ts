import { clearAllReducers, Definitions } from 'index'
import { makeStoreAndDefineState } from '../test-utils'

const { Flag } = Definitions

describe('defintion - flag', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    expect(() => makeStoreAndDefineState({
      space: Flag
    })).toThrow('Redux Enterprise\n\nThis Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions } = space

      expect(Object.keys(actions.foo)).toEqual([
        'set',
        'toggle',
        'unset',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set())
      expect(selectors.foo.get(getState())).toEqual(true)
    })

    it('unset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set())
      expect(selectors.foo.get(getState())).toEqual(true)
      dispatch(actions.foo.unset())
      expect(selectors.foo.get(getState())).toEqual(false)
    })

    it('toggle', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.toggle())
      expect(selectors.foo.get(getState())).toEqual(true)
      dispatch(actions.foo.toggle())
      expect(selectors.foo.get(getState())).toEqual(false)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
      ])
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set())

      expect(selectors.foo.get(getState())).toEqual(true)
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Flag
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).toEqual(false)
    dispatch(actions.foo.set())
    expect(selectors.foo.get(getState())).toEqual(true)
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Flag
        }
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.bar.get(getState())).toEqual(false)
    dispatch(actions.foo.bar.set())
    expect(selectors.foo.bar.get(getState())).toEqual(true)
  })
})

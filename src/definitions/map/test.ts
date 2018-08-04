import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Map } = Definitions

describe('map', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  describe('actions', () => {
    it('api', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { actions } = models.space

      expect(Object.keys(actions.foo)).toEqual([
        'clear',
        'set',
        'update'
      ])
    })

    it('set', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { actions, selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual({})
      store.dispatch(actions.foo.set({ pickle: 'rick' }))
      expect(selectors.foo.get(store.getState())).toEqual({
        pickle: 'rick'
      })
      expect(selectors.foo.get(store.getState(), 'pickle')).toEqual({
        pickle: 'rick'
      })
      expect(selectors.foo.get(store.getState(), ['pickle'])).toEqual({
        pickle: 'rick'
      })
    })

    it('clear', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { actions, selectors } = models.space


      store.dispatch(actions.foo.set({ foo: 'bar' }))
      expect(selectors.foo.get(store.getState())).toEqual({ foo: 'bar' })
      store.dispatch(actions.foo.clear())
      expect(selectors.foo.get(store.getState())).toEqual({})
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { selectors } = models.space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
        'keys'
      ])
    })

    it('get', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { actions, selectors } = models.space

      const val = { foo: 'bar', beep: 'boop' }
      store.dispatch(actions.foo.set(val))

      expect(selectors.foo.get(store.getState())).toEqual(val)
      expect(selectors.foo.get(store.getState(), 'foo')).toEqual({ foo: 'bar' })
      expect(selectors.foo.get(store.getState(), ['foo', 'beep'])).toEqual(val)
    })
  })

  describe('initialState', () => {
    it('default', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual({})
    })

    it('custom', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Map({
            initialState: {
              foo: 'bar'
            }
          })
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual({ foo: 'bar' })
    })
  })
})

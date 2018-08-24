import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Record } = Definitions

describe('record', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  describe('actions', () => {
    it('api', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record
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
          foo: Record
        }
      })

      const { actions, selectors } = models.space

      const val = { pickle: 'rick' }
      const val2 = { morty: 'wew' }
      expect(selectors.foo.get(store.getState())).toEqual({})
      store.dispatch(actions.foo.set(val))
      expect(selectors.foo.get(store.getState())).toEqual(val)
      store.dispatch(actions.foo.set(val2))
      expect(selectors.foo.get(store.getState())).toEqual(val2)
    })

    it('update', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record
        }
      })

      const { actions, selectors } = models.space

      const val = { pickle: 'rick' }
      const val2 = { morty: 'wew' }
      expect(selectors.foo.get(store.getState())).toEqual({})
      store.dispatch(actions.foo.update(val))
      expect(selectors.foo.get(store.getState())).toEqual(val)
      store.dispatch(actions.foo.update(val2))
      expect(selectors.foo.get(store.getState())).toEqual({
        ...val,
        ...val2
      })
    })

    it('clear', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record
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
          foo: Record
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
          foo: Record
        }
      })

      const { actions, selectors } = models.space

      const val = { foo: 'bar', beep: 'boop' }
      store.dispatch(actions.foo.set(val))

      expect(selectors.foo.get(store.getState())).toEqual(val)
      expect(selectors.foo.get(store.getState(), 'foo')).toEqual({ foo: 'bar' })
      expect(selectors.foo.get(store.getState(), ['foo', 'beep'])).toEqual(val)
    })

    it('keys', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record
        }
      })

      const { actions, selectors } = models.space

      const val = { foo: 'bar', beep: 'boop' }
      store.dispatch(actions.foo.set(val))

      expect(selectors.foo.keys(store.getState())).toEqual(Object.keys(val))
    })
  })

  describe('initialState', () => {
    it('default', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual({})
    })

    it('custom', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Record({
            initialState: {
              foo: 'bar'
            }
          })
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual({ foo: 'bar' })
    })

    it('invalid', () => {
      expect(() => makeStoreAndDefineState({
        space: {
          foo: Record({
            initialState: 'bar'
          })
        }
      })).toThrowError()
    })
  })
})

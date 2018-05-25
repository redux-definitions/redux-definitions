import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Flag } = Definitions

describe('defintion - flag', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  describe('actions', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions } = models.space

      expect(Object.keys(actions.foo)).toEqual([
        'set',
        'toggle',
        'unset',
      ])
    })

    it('set', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = models.space

      store.dispatch(actions.foo.set())
      expect(selectors.foo.get(store.getState())).toEqual(true)
    })

    it('unset', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = models.space

      store.dispatch(actions.foo.set())
      expect(selectors.foo.get(store.getState())).toEqual(true)
      store.dispatch(actions.foo.unset())
      expect(selectors.foo.get(store.getState())).toEqual(false)
    })

    it('toggle', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = models.space

      store.dispatch(actions.foo.toggle())
      expect(selectors.foo.get(store.getState())).toEqual(true)
      store.dispatch(actions.foo.toggle())
      expect(selectors.foo.get(store.getState())).toEqual(false)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { selectors } = models.space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
      ])
    })

    it('get', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = models.space

      const collection = [{ id: '1', name: 'foo' }]
      store.dispatch(actions.foo.set())

      expect(selectors.foo.get(store.getState())).toEqual(true)
    })
  })
})

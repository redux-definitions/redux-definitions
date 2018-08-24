import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Field } = Definitions

describe('field', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  describe('actions', () => {
    it('api', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field({
            initialState: 4
          })
        }
      })

      const { actions } = models.space

      expect(Object.keys(actions.foo)).toEqual([
        'clear',
        'set',
      ])
    })

    it('set', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual(undefined)
      store.dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(store.getState())).toEqual('bar')
    })

    it('clear', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = models.space


      store.dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(store.getState())).toEqual('bar')
      store.dispatch(actions.foo.clear())
      expect(selectors.foo.get(store.getState())).toEqual(undefined)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { selectors } = models.space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
        'isSet',
      ])
    })

    it('isSet', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = models.space

      store.dispatch(actions.foo.set('bar'))
      expect(selectors.foo.isSet(store.getState())).toEqual(true)
      store.dispatch(actions.foo.clear())
      expect(selectors.foo.isSet(store.getState())).toEqual(false)
    })

    it('get', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { actions, selectors } = models.space

      store.dispatch(actions.foo.set('bar'))

      expect(selectors.foo.get(store.getState())).toEqual('bar')
    })
  })

  describe('initialState', () => {
    it('default', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual(undefined)
    })

    it('empty string', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field({
            initialState: ''
          })
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual('')
    })

    it('0', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Field({
            initialState: 0
          })
        }
      })

      const { selectors } = models.space

      expect(selectors.foo.get(store.getState())).toEqual(0)
    })
  })
})

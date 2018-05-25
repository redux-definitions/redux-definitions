import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Index } = Definitions

describe('index', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    const { models, store } = makeStoreAndDefineState({
      space: {
        foo: Index()
      }
    })

    const { actions, selectors } = models.space

    expect(selectors.foo.get(store.getState())).toEqual([])
  })

  describe('actions', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions } = models.space

      expect(Object.keys(actions.foo)).toEqual([
        'add',
        'remove',
        'reset',
        'set',
        'toggle'
      ])
    })

    it('set', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      expect(selectors.foo.get(store.getState())).toEqual([])
      store.dispatch(actions.foo.set(set))
      expect(selectors.foo.get(store.getState())).toEqual(set)
    })

    it('toggle', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      expect(selectors.foo.get(store.getState())).toEqual([])
      store.dispatch(actions.foo.set(set))
      store.dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(store.getState())).toEqual([1,2])
      store.dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(store.getState())).toEqual(set)
    })

    describe('add', () => {
      it('add', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            foo: Index
          }
        })

        const { actions, selectors } = models.space 

        const set = [1,2,3]
        expect(selectors.foo.get(store.getState())).toEqual([])
        store.dispatch(actions.foo.set(set))
        store.dispatch(actions.foo.add(3))
        expect(selectors.foo.get(store.getState())).toEqual(set)
        store.dispatch(actions.foo.add(4))
        expect(selectors.foo.get(store.getState())).toEqual([...set, 4])
      })

      it('add batch', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            foo: Index
          }
        })

        const { actions, selectors } = models.space 

        const set = [1,2,3]
        expect(selectors.foo.get(store.getState())).toEqual([])
        store.dispatch(actions.foo.set(set))
        store.dispatch(actions.foo.add(3))
        expect(selectors.foo.get(store.getState())).toEqual(set)
        store.dispatch(actions.foo.add([4, 5, 6]))
        expect(selectors.foo.get(store.getState())).toEqual([...set, 4, 5, 6])
      })
    })

    describe('remove', () => {
      it('remove', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            foo: Index
          }
        })

        const { actions, selectors } = models.space 

        const set = [1,2,3]
        expect(selectors.foo.get(store.getState())).toEqual([])
        store.dispatch(actions.foo.set(set))
        store.dispatch(actions.foo.remove(4))
        expect(selectors.foo.get(store.getState())).toEqual(set)
        store.dispatch(actions.foo.remove(2))
        expect(selectors.foo.get(store.getState())).toEqual([1,3])
      })

      it('remove batch', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            foo: Index
          }
        })

        const { actions, selectors } = models.space 

        const set = [1,2,3]
        expect(selectors.foo.get(store.getState())).toEqual([])
        store.dispatch(actions.foo.set(set))
        store.dispatch(actions.foo.remove([4]))
        expect(selectors.foo.get(store.getState())).toEqual(set)
        store.dispatch(actions.foo.remove([1,2]))
        expect(selectors.foo.get(store.getState())).toEqual([3])
      })
    })

    it('reset', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      store.dispatch(actions.foo.set(set))
      expect(selectors.foo.get(store.getState())).toEqual(set)
      store.dispatch(actions.foo.reset())
      expect(selectors.foo.get(store.getState())).toEqual([])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { selectors } = models.space 

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
        'includes',
        'count'
      ])
    })

    it('includes', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      store.dispatch(actions.foo.set(set))
      expect(selectors.foo.includes(store.getState(), { id: 1 })).toEqual(true)
      expect(selectors.foo.includes(store.getState(), { id: 4 })).toEqual(false)
    })

    it('get', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      store.dispatch(actions.foo.set(set))
      expect(selectors.foo.get(store.getState())).toEqual(set)
    })

    it('count', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = models.space 

      const set = [1,2,3]
      store.dispatch(actions.foo.set(set))
      expect(selectors.foo.count(store.getState())).toEqual(3)
    })
  })
})

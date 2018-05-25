import { clearAllReducers, Definitions } from 'index'
import { makeStoreAndDefineState } from '../test-utils'

const { Index } = Definitions

describe('index', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    const { space, getState } = makeStoreAndDefineState({
      space: Index
    })

    const { actions, selectors } = space

    expect(selectors.get(getState())).toEqual([])
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions } = space

      expect(Object.keys(actions.foo)).toEqual([
        'add',
        'remove',
        'reset',
        'set',
        'toggle',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).toEqual([])
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).toEqual(set)
    })

    it('toggle', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).toEqual([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(getState())).toEqual([1,2])
      dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(getState())).toEqual(set)
    })

    it('add', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).toEqual([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.add(3))
      expect(selectors.foo.get(getState())).toEqual(set)
      dispatch(actions.foo.add(4))
      expect(selectors.foo.get(getState())).toEqual([...set, 4])
    })

    it('remove', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).toEqual([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.remove(4))
      expect(selectors.foo.get(getState())).toEqual(set)
      dispatch(actions.foo.remove(2))
      expect(selectors.foo.get(getState())).toEqual([1,3])
    })

    it('reset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).toEqual(set)
      dispatch(actions.foo.reset())
      expect(selectors.foo.get(getState())).toEqual([])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).toEqual([
        'get',
        'includes',
      ])
    })

    it('includes', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.includes(getState(), { id: 1 })).toEqual(true)
      expect(selectors.foo.includes(getState(), { id: 4 })).toEqual(false)
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).toEqual(set)
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Index
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).toEqual([])
    const set = [1, 2, 3]
    dispatch(actions.foo.set(set))
    expect(selectors.foo.get(getState())).toEqual(set)
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Index
        }
      }
    })

    const { actions, selectors } = space

    const set = [1, 2, 3]
    expect(selectors.foo.bar.get(getState())).toEqual([])
    dispatch(actions.foo.bar.set(set))
    expect(selectors.foo.bar.get(getState())).toEqual(set)
  })
})
